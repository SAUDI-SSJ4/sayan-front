import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * خدمة تحديث التوكن التلقائي
 * تقوم بتحديث التوكن كل 50 دقيقة (قبل انتهاء صلاحيته بـ 10 دقائق)
 */
class TokenRefreshService {
  constructor() {
    this.refreshInterval = null;
    this.isRefreshing = false;
    this.refreshIntervalTime = 50 * 60 * 1000; // 50 دقيقة بالميلي ثانية
    
    // إصلاح الرابط الأساسي لإزالة /website/
    const rawBaseURL = import.meta.env.VITE_APP_MODE === "development" 
      ? import.meta.env.VITE_SERVER_DEV 
      : import.meta.env.VITE_SERVER_PRO;
    
    // إزالة /website/ من الرابط إذا كانت موجودة
    this.baseURL = rawBaseURL ? rawBaseURL.replace('/website/', '/').replace('/website', '') : '';
    
    // إضافة نظام تسجيل مفصل
    this.lastRefreshTime = null;
    this.refreshCount = 0;
    this.errors = [];
    this.debugMode = import.meta.env.VITE_APP_MODE === "development";
    
    // تسجيل الرابط الأساسي للتأكد من صحته
    if (this.debugMode) {
      console.log(`[TokenRefresh] الرابط الأصلي: ${rawBaseURL}`);
      console.log(`[TokenRefresh] الرابط المُصحح: ${this.baseURL}`);
      console.log(`[TokenRefresh] رابط تحديث التوكن: ${this.baseURL}/api/v1/refresh-token`);
    }
  }

  /**
   * تسجيل رسالة تشخيصية
   */
  log(message, type = 'info', data = null) {
    if (!this.debugMode) return;
    
    const timestamp = new Date().toLocaleString('ar-SA');
    const logMessage = `[TokenRefresh ${timestamp}] ${message}`;
    
    switch (type) {
      case 'error':
        console.error(logMessage, data);
        this.errors.push({ timestamp, message, data, type });
        break;
      case 'warn':
        console.warn(logMessage, data);
        break;
      case 'success':
        console.log(`✅ ${logMessage}`, data);
        break;
      default:
        console.log(`ℹ️ ${logMessage}`, data);
    }
  }

  /**
   * الحصول على التوكن الحالي
   */
  getCurrentToken() {
    const loginType = Cookies.get("login_type");
    
    if (loginType === "academy") {
      const token = Cookies.get("academy_token");
      this.log(`الحصول على توكن الأكاديمية: ${token ? 'موجود' : 'غير موجود'}`);
      return token;
    }
    
    if (loginType === "student") {
      const token = Cookies.get("student_token");
      this.log(`الحصول على توكن الطالب: ${token ? 'موجود' : 'غير موجود'}`);
      return token;
    }
    
    this.log('نوع تسجيل الدخول غير محدد', 'warn');
    return null;
  }

  /**
   * الحصول على نوع تسجيل الدخول
   */
  getLoginType() {
    const loginType = Cookies.get("login_type");
    this.log(`نوع تسجيل الدخول: ${loginType || 'غير محدد'}`);
    return loginType;
  }

  /**
   * حفظ التوكن الجديد
   */
  saveToken(newToken) {
    const loginType = this.getLoginType();
    
    if (!newToken || typeof newToken !== 'string') {
      this.log('فشل في حفظ التوكن - التوكن غير صالح', 'error', { newToken });
      return false;
    }
    
    if (loginType === "academy") {
      // حفظ التوكن مع خيارات محددة
      Cookies.set("academy_token", newToken, { 
        expires: 1, // ينتهي خلال يوم واحد
        secure: window.location.protocol === 'https:', // آمن فقط في HTTPS
        sameSite: 'lax' // حماية CSRF
      });
      
      // التحقق من الحفظ
      const savedToken = Cookies.get("academy_token");
      if (savedToken === newToken) {
        this.log('تم حفظ توكن الأكاديمية الجديد بنجاح', 'success', { tokenLength: newToken.length });
        return true;
      } else {
        this.log('فشل في حفظ توكن الأكاديمية', 'error', { expected: newToken.length, actual: savedToken?.length || 0 });
        return false;
      }
    } else if (loginType === "student") {
      Cookies.set("student_token", newToken, { 
        expires: 1,
        secure: window.location.protocol === 'https:',
        sameSite: 'lax'
      });
      
      // التحقق من الحفظ
      const savedToken = Cookies.get("student_token");
      if (savedToken === newToken) {
        this.log('تم حفظ توكن الطالب الجديد بنجاح', 'success', { tokenLength: newToken.length });
        return true;
      } else {
        this.log('فشل في حفظ توكن الطالب', 'error', { expected: newToken.length, actual: savedToken?.length || 0 });
        return false;
      }
    } else {
      this.log('فشل في حفظ التوكن - نوع تسجيل الدخول غير محدد', 'error', { loginType });
      return false;
    }
  }

  /**
   * تحديث التوكن
   */
  async refreshToken() {
    if (this.isRefreshing) {
      this.log('تحديث التوكن قيد التنفيذ بالفعل', 'warn');
      return false;
    }

    const currentToken = this.getCurrentToken();
    const loginType = this.getLoginType();

    if (!currentToken || !loginType) {
      this.log('لا يمكن تحديث التوكن - التوكن أو نوع تسجيل الدخول مفقود', 'error');
      return false;
    }

    this.isRefreshing = true;
    this.log('بدء تحديث التوكن...', 'info', { loginType, tokenLength: currentToken.length });

    try {
      // التأكد من أن الرابط الأساسي صحيح
      const baseUrl = this.baseURL || (import.meta.env.VITE_APP_MODE === "development" 
        ? import.meta.env.VITE_SERVER_DEV 
        : import.meta.env.VITE_SERVER_PRO);
        
      // إزالة أي /website/ من الرابط
      const cleanBaseUrl = baseUrl.replace('/website/', '/').replace('/website', '');
      const requestUrl = `${cleanBaseUrl}/api/v1/refresh-token`;
      
      this.log(`إرسال طلب تحديث التوكن إلى: ${requestUrl}`);

      const response = await axios.post(
        requestUrl,
        {},
        {
          headers: {
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 30000, // 30 ثانية timeout
        }
      );

      this.log('استجابة تحديث التوكن:', 'info', {
        status: response.status,
        hasAccessToken: !!response.data?.access_token,
        responseKeys: Object.keys(response.data || {})
      });

      // طباعة الاستجابة كاملة للتشخيص
      console.log('استجابة تحديث التوكن كاملة:', response.data);

      if (response.data && response.data.access_token) {
        const saveResult = this.saveToken(response.data.access_token);
        
        if (saveResult) {
          this.lastRefreshTime = new Date();
          this.refreshCount++;
          this.log(`تم تحديث التوكن بنجاح (المرة رقم ${this.refreshCount})`, 'success', {
            newTokenLength: response.data.access_token.length,
            refreshTime: this.lastRefreshTime.toLocaleString('ar-SA'),
            saveResult: saveResult
          });
          
          // تعيين حدث خاص للإبلاغ عن تحديث التوكن
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('token-refreshed', { 
              detail: { 
                timestamp: this.lastRefreshTime,
                count: this.refreshCount
              } 
            }));
          }
          
          return true;
        } else {
          this.log('فشل في حفظ التوكن الجديد رغم نجاح الطلب', 'error', {
            tokenReceived: !!response.data.access_token,
            tokenLength: response.data.access_token?.length
          });
          return false;
        }
      } else {
        this.log('فشل في تحديث التوكن - لا يوجد access_token في الاستجابة', 'error', response.data);
        return false;
      }
    } catch (error) {
      this.log('خطأ في تحديث التوكن', 'error', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseData: error.response?.data
      });

      // إذا كان الخطأ 401 أو 403، فقد انتهت صلاحية التوكن نهائياً
      if (error.response?.status === 401 || error.response?.status === 403) {
        this.log('انتهت صلاحية التوكن نهائياً - سيتم تسجيل الخروج', 'error');
        this.clearTokens();
        this.stopAutoRefresh();
        // تم تعطيل إعادة التوجيه التلقائية لتجنب مشاكل تسجيل الخروج غير المرغوب فيه
        // يمكن للمكونات التعامل مع أخطاء المصادقة بنفسها
        // setTimeout(() => {
        //   window.location.href = '/login';
        // }, 2000);
      }
      
      return false;
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * مسح جميع التوكنز
   */
  clearTokens() {
    this.log('مسح جميع التوكنز');
    Cookies.remove("academy_token");
    Cookies.remove("student_token");
    Cookies.remove("login_type");
  }

  /**
   * التحقق من صحة التوكن الحالي
   */
  async validateCurrentToken() {
    const currentToken = this.getCurrentToken();
    const loginType = this.getLoginType();

    if (!currentToken || !loginType) {
      this.log('لا يمكن التحقق من التوكن - التوكن أو نوع تسجيل الدخول مفقود', 'warn');
      return false;
    }

    try {
      // تم حذف dashboard API - تخطي التحقق عبر API للأكاديميات أيضاً
      let validateUrl;
      if (loginType === "academy") {
        // مؤقتاً: تخطي التحقق عبر API للأكاديميات والاعتماد على وجود التوكن فقط
        this.log('تخطي التحقق عبر API للأكاديميات - التوكن موجود');
        return true;
      } else if (loginType === "student") {
        // مؤقتاً: تخطي التحقق عبر API للطلاب والاعتماد على وجود التوكن فقط
        this.log('تخطي التحقق عبر API للطلاب - التوكن موجود');
        return true;
      } else {
        this.log('نوع تسجيل دخول غير مدعوم للتحقق', 'warn', { loginType });
        return false;
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        this.log('التوكن الحالي غير صالح - يحتاج تحديث', 'warn', { status: error.response.status });
        return false;
      } else {
        // خطأ آخر - نفترض أن التوكن صالح
        this.log('خطأ في التحقق من التوكن - سنفترض أنه صالح', 'warn', { 
          message: error.message,
          status: error.response?.status 
        });
        return true;
      }
    }
  }

  /**
   * بدء التحديث التلقائي
   */
  async startAutoRefresh() {
    // التأكد من عدم وجود interval سابق
    this.stopAutoRefresh();
    
    const loginType = this.getLoginType();
    const currentToken = this.getCurrentToken();
    
    if (!currentToken || !loginType) {
      this.log('لا يمكن بدء التحديث التلقائي - التوكن أو نوع تسجيل الدخول مفقود', 'warn');
      return;
    }

    this.log(`بدء التحديث التلقائي كل ${this.refreshIntervalTime / 60000} دقيقة`, 'info');

    // التحقق من صحة التوكن الحالي أولاً
    const isTokenValid = await this.validateCurrentToken();
    
    if (!isTokenValid) {
      this.log('التوكن الحالي غير صالح - سيتم تحديثه فوراً');
      await this.refreshToken();
    } else {
      this.log('التوكن الحالي صالح - لا حاجة لتحديث فوري');
    }
    
    // تعيين التحديث التلقائي
    this.refreshInterval = setInterval(async () => {
      this.log('تنفيذ التحديث التلقائي المجدول');
      
      // التحقق من وجود التوكن قبل محاولة التحديث
      if (this.getCurrentToken()) {
        await this.refreshToken();
      } else {
        this.log('لا يوجد توكن حالي - إيقاف التحديث التلقائي', 'warn');
        this.stopAutoRefresh();
      }
    }, this.refreshIntervalTime);

    this.log('تم تعيين التحديث التلقائي بنجاح', 'success');
    
    // الاحتفاظ بوقت آخر تحديث إذا لم يكن موجوداً
    if (!this.lastRefreshTime) {
      this.lastRefreshTime = new Date();
    }
  }

  /**
   * إيقاف التحديث التلقائي
   */
  stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
      this.log('تم إيقاف التحديث التلقائي');
    }
  }

  /**
   * التحقق من حالة التوكن وبدء التحديث إذا لزم الأمر
   */
  async initialize() {
    this.log('تهيئة خدمة تحديث التوكن');
    
    const currentToken = this.getCurrentToken();
    const loginType = this.getLoginType();
    
    if (currentToken && loginType) {
      this.log('تم العثور على توكن صالح - بدء التحديث التلقائي', 'success');
      await this.startAutoRefresh();
    } else {
      this.log('لا يوجد توكن صالح - لن يتم بدء التحديث التلقائي', 'warn');
    }
  }

  /**
   * تحديث يدوي للتوكن
   */
  async manualRefresh() {
    this.log('تحديث يدوي للتوكن');
    return await this.refreshToken();
  }

  /**
   * الحصول على معلومات حالة الخدمة
   */
  getStatus() {
    // حساب الوقت المتبقي للتحديث التالي
    let nextRefreshInSeconds = null;
    let nextRefreshText = null;
    
    if (this.refreshInterval && this.lastRefreshTime) {
      // حساب الوقت المتبقي بالميلي ثانية
      const timeSinceLastRefresh = Date.now() - this.lastRefreshTime.getTime();
      const timeUntilNextRefresh = this.refreshIntervalTime - timeSinceLastRefresh;
      
      if (timeUntilNextRefresh > 0) {
        // تحويل إلى ثواني
        nextRefreshInSeconds = Math.round(timeUntilNextRefresh / 1000);
        
        // تنسيق النص (ساعات:دقائق:ثواني)
        const hours = Math.floor(nextRefreshInSeconds / 3600);
        const minutes = Math.floor((nextRefreshInSeconds % 3600) / 60);
        const seconds = nextRefreshInSeconds % 60;
        
        nextRefreshText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        // إذا كان الوقت سلبياً، فهذا يعني أن التحديث التالي سيحدث قريباً
        nextRefreshInSeconds = 0;
        nextRefreshText = "00:00:00";
      }
    }
    
    const status = {
      isActive: !!this.refreshInterval,
      isRefreshing: this.isRefreshing,
      loginType: this.getLoginType(),
      hasToken: !!this.getCurrentToken(),
      refreshInterval: this.refreshIntervalTime / 60000, // بالدقائق
      lastRefreshTime: this.lastRefreshTime,
      refreshCount: this.refreshCount,
      errors: this.errors.slice(-5), // آخر 5 أخطاء
      
      // معلومات الوقت المتبقي المحسنة
      nextRefreshInSeconds: nextRefreshInSeconds,
      nextRefreshText: nextRefreshText,
      nextRefreshIn: this.refreshInterval && this.lastRefreshTime ? 
        Math.max(0, Math.round((this.refreshIntervalTime - (Date.now() - this.lastRefreshTime.getTime())) / 60000)) : 
        null
    };

    this.log('حالة الخدمة:', 'info', status);
    return status;
  }

  /**
   * مسح سجل الأخطاء
   */
  clearErrors() {
    this.errors = [];
    this.log('تم مسح سجل الأخطاء');
  }

  /**
   * تصدير تقرير تشخيصي
   */
  getDiagnosticReport() {
    const rawBaseURL = import.meta.env.VITE_APP_MODE === "development" 
      ? import.meta.env.VITE_SERVER_DEV 
      : import.meta.env.VITE_SERVER_PRO;
      
    return {
      service: this.getStatus(),
      environment: {
        rawBaseURL: rawBaseURL,
        correctedBaseURL: this.baseURL,
        refreshTokenURL: `${this.baseURL}/api/v1/refresh-token`,
        debugMode: this.debugMode,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      },
      cookies: {
        loginType: Cookies.get("login_type"),
        hasAcademyToken: !!Cookies.get("academy_token"),
        hasStudentToken: !!Cookies.get("student_token"),
        academyTokenLength: Cookies.get("academy_token")?.length || 0,
        studentTokenLength: Cookies.get("student_token")?.length || 0
      },
      errors: this.errors
    };
  }
}

// إنشاء instance واحد للاستخدام في التطبيق
const tokenRefreshService = new TokenRefreshService();

// إتاحة الخدمة في console للتشخيص
if (typeof window !== 'undefined') {
  window.tokenRefreshService = tokenRefreshService;
}

export default tokenRefreshService; 
import axios from 'axios';
import Cookies from 'js-cookie';

// استخدام عنوان السيرفر مباشرة
const API_BASE_URL = "https://www.sayan-server.com";

// الحصول على رمز الوصول من مصادر التخزين المختلفة
export const getToken = () => {
  return Cookies.get('academy_token') || localStorage.getItem('academy_token') || sessionStorage.getItem('academy_token');
};

// حفظ رمز الوصول في جميع مصادر التخزين
export const saveToken = (token) => {
  if (token) {
    Cookies.set('academy_token', token, { sameSite: 'Lax', secure: true });
    localStorage.setItem('academy_token', token);
    sessionStorage.setItem('academy_token', token);
  }
};

// حذف رمز الوصول من جميع مصادر التخزين
export const removeToken = () => {
  Cookies.remove('academy_token');
  localStorage.removeItem('academy_token');
  sessionStorage.removeItem('academy_token');
};

// طلب تجديد رمز الوصول إذا كان منتهي الصلاحية
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// تجديد رمز الوصول
export const refreshToken = async () => {
  try {
    const token = getToken();
    
    if (!token) {
      console.error("لا يوجد رمز وصول للتجديد");
      return null;
    }
    
    const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true
    });
    
    if (response.data && response.data.access_token) {
      const newToken = response.data.access_token;
      saveToken(newToken);
      return newToken;
    }
    
    return null;
  } catch (error) {
    console.error("فشل في تجديد رمز الوصول:", error);
    return null;
  }
};

// إنشاء عميل axios مع معترض لتجديد الرمز تلقائياً
export const createAuthClient = () => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  // إضافة معترض للطلبات لإضافة رمز الوصول
  client.interceptors.request.use(
    config => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
  
  // إضافة معترض للاستجابات للتعامل مع أخطاء المصادقة
  client.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      
      // إذا كان الخطأ 401 (غير مصرح به) ولم تتم محاولة تجديد الرمز من قبل
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // إذا كان هناك عملية تجديد جارية، قم بإضافة الطلب إلى قائمة الانتظار
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return client(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;
        
        try {
          // محاولة تجديد الرمز
          const newToken = await refreshToken();
          
          if (newToken) {
            // تحديث الرمز في الطلب الأصلي وإعادة المحاولة
            processQueue(null, newToken);
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return client(originalRequest);
          } else {
            // إذا فشل تجديد الرمز، قم بتسجيل الخروج
            processQueue(new Error('فشل تجديد رمز الوصول'));
            removeToken();
            return Promise.reject(error);
          }
        } catch (refreshError) {
          processQueue(refreshError);
          removeToken();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      
      return Promise.reject(error);
    }
  );
  
  return client;
};

export const getClient = () => {
  return createAuthClient();
};

// التحقق من صلاحية الجلسة
export const checkSession = async () => {
  try {
    const client = createAuthClient();
    await client.get('/api/v1/user/profile');
    return true;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      removeToken();
      return false;
    }
    return true;
  }
};

// التحقق من توافر الرمز والتأكد من صلاحيته قبل إجراء طلبات API
export const validateTokenBeforeRequest = async () => {
  try {
    // التحقق من وجود الرمز أولاً
    const token = getToken();
    if (!token) {
      console.error('لا يوجد رمز مصادقة');
      return false;
    }

    // إضافة تأخير بسيط قبل التحقق
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // إجراء اختبار بطلب بسيط
    const client = createAuthClient();
    await client.get('/api/v1/user/profile');
    
    // إذا لم تحدث أخطاء، فالرمز صالح
    return true;
  } catch (error) {
    // في حالة الخطأ 401، حاول تجديد الرمز
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await refreshToken();
        if (newToken) {
          // تم تجديد الرمز بنجاح
          return true;
        }
      } catch (refreshError) {
        console.error('فشل تجديد الرمز:', refreshError);
      }
      
      // إذا وصلنا إلى هنا، فقد فشل التجديد
      removeToken();
      return false;
    }
    
    // أخطاء أخرى، نفترض الرمز لا يزال صالح
    return true;
  }
};

export default {
  getToken,
  saveToken,
  removeToken,
  refreshToken,
  createAuthClient,
  getClient,
  checkSession,
  validateTokenBeforeRequest,
  API_BASE_URL
}; 
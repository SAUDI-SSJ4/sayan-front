import React, { useEffect, useState } from 'react';
import tokenRefreshService from '../services/tokenRefreshService';

/**
 * مكون Provider لتهيئة خدمة تحديث التوكن
 * يجب وضعه في أعلى مستوى في التطبيق (App.jsx)
 */
const TokenRefreshProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  // تهيئة خدمة تحديث التوكن عند تحميل التطبيق
  useEffect(() => {
    // تم تعطيل تهيئة خدمة تحديث التوكن مؤقتاً لتجنب مشاكل تسجيل الخروج
    /*
    const initializeService = async () => {
      try {
        console.log('تهيئة خدمة تحديث التوكن...');
        const result = await tokenRefreshService.initialize();
        
        // وضع متغير تأكيد في الـ window للتشخيص
        if (typeof window !== 'undefined') {
          window.__tokenRefreshInitialized = true;
        }
        
        console.log('اكتملت تهيئة خدمة تحديث التوكن', result);
        setInitialized(true);
      } catch (error) {
        console.error('خطأ في تهيئة خدمة تحديث التوكن:', error);
      }
    };
    
    initializeService();

    // محاولة إعادة التهيئة بعد 5 ثوانٍ لضمان تحميل الكوكيز
    const retryTimer = setTimeout(async () => {
      const status = tokenRefreshService.getStatus();
      if (status.hasToken && !status.isActive) {
        console.log('إعادة محاولة تهيئة خدمة تحديث التوكن...');
        try {
          await tokenRefreshService.initialize();
          setInitialized(true);
        } catch (error) {
          console.error('فشل في إعادة تهيئة خدمة تحديث التوكن:', error);
        }
      }
    }, 5000);

    // تنظيف الخدمة عند إغلاق التطبيق
    return () => {
      clearTimeout(retryTimer);
      tokenRefreshService.stopAutoRefresh();
    };
    */
    setInitialized(true); // نضع هذا لتجنب مشاكل التحميل
  }, []);

  // مراقبة تغييرات الصفحة للتأكد من استمرار عمل الخدمة
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        // عندما يعود المستخدم للصفحة، تحقق من حالة التوكن
        const status = tokenRefreshService.getStatus();
        if (status.hasToken && !status.isActive) {
          console.log('إعادة تهيئة خدمة تحديث التوكن بعد عودة النافذة للمقدمة...');
          try {
            await tokenRefreshService.initialize();
          } catch (error) {
            console.error('خطأ في إعادة تهيئة خدمة تحديث التوكن:', error);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // مراقبة تغييرات التوكن في localStorage/cookies
  useEffect(() => {
    const checkCookiesRegularly = () => {
      const status = tokenRefreshService.getStatus();
      const hasToken = !!tokenRefreshService.getCurrentToken();
      
      // إذا كان هناك توكن ولكن الخدمة غير نشطة، أعد التهيئة
      if (hasToken && !status.isActive) {
        console.log('تم اكتشاف توكن جديد - إعادة تهيئة خدمة التحديث...');
        tokenRefreshService.initialize();
      }
      // إذا لم يعد هناك توكن والخدمة نشطة، أوقف التحديث
      else if (!hasToken && status.isActive) {
        console.log('توكن غير موجود - إيقاف خدمة التحديث...');
        tokenRefreshService.stopAutoRefresh();
      }
    };
    
    // تنفيذ الفحص كل 10 ثوانٍ
    const cookieCheckInterval = setInterval(checkCookiesRegularly, 10000);
    
    // معالج حدث تحديث التوكن
    const handleTokenRefreshed = (event) => {
      console.log('تم تحديث التوكن في:', event.detail.timestamp);
      setInitialized(true);
    };
    
    // الاستماع إلى حدث تحديث التوكن
    window.addEventListener('token-refreshed', handleTokenRefreshed);
    
    // تنظيف
    return () => {
      clearInterval(cookieCheckInterval);
      window.removeEventListener('token-refreshed', handleTokenRefreshed);
    };
  }, []);

  return <>{children}</>;
};

export default TokenRefreshProvider; 
import { useEffect, useState, useCallback } from 'react';
import tokenRefreshService from '../services/tokenRefreshService';

/**
 * Hook مخصص لإدارة تحديث التوكن التلقائي
 * يوفر واجهة سهلة للتحكم في خدمة تحديث التوكن
 */
export const useTokenRefresh = () => {
  const [status, setStatus] = useState(tokenRefreshService.getStatus());
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  // تحديث حالة الخدمة
  const updateStatus = useCallback(() => {
    setStatus(tokenRefreshService.getStatus());
  }, []);

  // بدء التحديث التلقائي
  const startAutoRefresh = useCallback(() => {
    tokenRefreshService.startAutoRefresh();
    updateStatus();
  }, [updateStatus]);

  // إيقاف التحديث التلقائي
  const stopAutoRefresh = useCallback(() => {
    tokenRefreshService.stopAutoRefresh();
    updateStatus();
  }, [updateStatus]);

  // تحديث يدوي
  const manualRefresh = useCallback(async () => {
    const success = await tokenRefreshService.manualRefresh();
    if (success) {
      setLastRefreshTime(new Date());
    }
    updateStatus();
    return success;
  }, [updateStatus]);

  // تهيئة الخدمة عند تحميل المكون
  useEffect(() => {
    // تم تعطيل التهيئة التلقائية مؤقتاً لتجنب مشاكل تسجيل الخروج
    // tokenRefreshService.initialize();
    updateStatus();

    // تحديث الحالة كل 30 ثانية للحصول على معلومات محدثة
    const statusInterval = setInterval(updateStatus, 30000);

    return () => {
      clearInterval(statusInterval);
    };
  }, [updateStatus]);

  // مراقبة تغييرات التوكن في الكوكيز
  useEffect(() => {
    // تم تعطيل مراقبة التوكن مؤقتاً لتجنب مشاكل تسجيل الخروج
    /*
    const checkTokenChanges = () => {
      const newStatus = tokenRefreshService.getStatus();
      if (newStatus.hasToken !== status.hasToken || newStatus.loginType !== status.loginType) {
        updateStatus();
        
        // إذا تم العثور على توكن جديد، ابدأ التحديث التلقائي
        if (newStatus.hasToken && !newStatus.isActive) {
          tokenRefreshService.initialize();
        }
        // إذا لم يعد هناك توكن، أوقف التحديث التلقائي
        else if (!newStatus.hasToken && newStatus.isActive) {
          tokenRefreshService.stopAutoRefresh();
        }
      }
    };

    // فحص التغييرات كل 5 ثوان
    const tokenCheckInterval = setInterval(checkTokenChanges, 5000);

    return () => {
      clearInterval(tokenCheckInterval);
    };
    */
  }, [status.hasToken, status.loginType, status.isActive, updateStatus]);

  return {
    // معلومات الحالة
    isActive: status.isActive,
    isRefreshing: status.isRefreshing,
    loginType: status.loginType,
    hasToken: status.hasToken,
    refreshInterval: status.refreshInterval,
    lastRefreshTime,
    
    // الوظائف
    startAutoRefresh,
    stopAutoRefresh,
    manualRefresh,
    updateStatus,
    
    // معلومات إضافية
    status: status
  };
};

export default useTokenRefresh; 
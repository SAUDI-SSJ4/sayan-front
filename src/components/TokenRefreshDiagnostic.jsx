import React, { useState, useEffect } from 'react';
import tokenRefreshService from '../services/tokenRefreshService';

/**
 * مكون تشخيص نظام تحديث التوكن
 * يظهر فقط في بيئة التطوير لمراقبة حالة النظام
 */
const TokenRefreshDiagnostic = () => {
  const [status, setStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);

  // تحديث الحالة كل 10 ثوانٍ
  useEffect(() => {
    if (!autoUpdate) return;

    const updateStatus = () => {
      setStatus(tokenRefreshService.getStatus());
    };

    updateStatus(); // تحديث فوري
    const interval = setInterval(updateStatus, 10000); // كل 10 ثوانٍ

    return () => clearInterval(interval);
  }, [autoUpdate]);

  // إخفاء المكون في بيئة الإنتاج
  if (import.meta.env.VITE_APP_MODE !== "development") {
    return null;
  }

  const handleManualRefresh = async () => {
    const result = await tokenRefreshService.manualRefresh();
    alert(result ? 'تم تحديث التوكن بنجاح' : 'فشل في تحديث التوكن');
    setStatus(tokenRefreshService.getStatus());
  };

  const handleGetDiagnostic = () => {
    const report = tokenRefreshService.getDiagnosticReport();
    console.log('تقرير تشخيص نظام تحديث التوكن:', report);
    
    // نسخ التقرير للحافظة
    navigator.clipboard.writeText(JSON.stringify(report, null, 2))
      .then(() => alert('تم نسخ التقرير للحافظة'))
      .catch(() => alert('فشل في نسخ التقرير'));
  };

  const handleClearErrors = () => {
    tokenRefreshService.clearErrors();
    setStatus(tokenRefreshService.getStatus());
  };

  if (!isVisible) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999
      }}>
        <button
          onClick={() => setIsVisible(true)}
          style={{
            padding: '8px 12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          🔧 تشخيص التوكن
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '350px',
      maxHeight: '500px',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: '#f3f4f6',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
          🔧 تشخيص نظام التوكن
        </h4>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#6b7280'
          }}
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div style={{
        padding: '16px',
        maxHeight: '400px',
        overflow: 'auto',
        fontSize: '12px'
      }}>
        {status && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ marginBottom: '8px' }}>
              <strong>الحالة العامة:</strong>
              <span style={{
                marginRight: '8px',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: status.isActive ? '#dcfce7' : '#fef2f2',
                color: status.isActive ? '#166534' : '#dc2626',
                fontSize: '11px'
              }}>
                {status.isActive ? '🟢 نشط' : '🔴 متوقف'}
              </span>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <strong>نوع المستخدم:</strong> {status.loginType || 'غير محدد'}
            </div>

            <div style={{ marginBottom: '8px' }}>
              <strong>يوجد توكن:</strong> {status.hasToken ? '✅ نعم' : '❌ لا'}
            </div>

            <div style={{ marginBottom: '8px' }}>
              <strong>قيد التحديث:</strong> {status.isRefreshing ? '🔄 نعم' : '⏸️ لا'}
            </div>

            <div style={{ marginBottom: '8px' }}>
              <strong>فترة التحديث:</strong> {status.refreshInterval} دقيقة
            </div>

            <div style={{ marginBottom: '8px' }}>
              <strong>عدد التحديثات:</strong> {status.refreshCount}
            </div>

            {status.lastRefreshTime && (
              <div style={{ marginBottom: '8px' }}>
                <strong>آخر تحديث:</strong><br />
                <span style={{ fontSize: '11px', color: '#6b7280' }}>
                  {new Date(status.lastRefreshTime).toLocaleString('ar-SA')}
                </span>
              </div>
            )}

            {status.nextRefreshIn !== null && (
              <div style={{ marginBottom: '8px' }}>
                <strong>التحديث التالي خلال:</strong> {status.nextRefreshIn} دقيقة
              </div>
            )}

            {status.nextRefreshText && (
              <div style={{ 
                marginBottom: '12px',
                padding: '8px 12px',
                backgroundColor: '#ecfdf5',
                borderRadius: '8px',
                border: '1px solid #d1fae5',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: '#059669', marginBottom: '4px' }}>
                  الوقت المتبقي للتحديث التالي
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  color: '#047857'
                }}>
                  {status.nextRefreshText}
                </div>
              </div>
            )}

            {status.errors && status.errors.length > 0 && (
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#dc2626' }}>الأخطاء ({status.errors.length}):</strong>
                <div style={{
                  maxHeight: '100px',
                  overflow: 'auto',
                  backgroundColor: '#fef2f2',
                  padding: '8px',
                  borderRadius: '4px',
                  marginTop: '4px'
                }}>
                  {status.errors.map((error, index) => (
                    <div key={index} style={{ marginBottom: '4px', fontSize: '11px' }}>
                      <strong>{error.timestamp}:</strong> {error.message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleManualRefresh}
              style={{
                flex: 1,
                padding: '6px 12px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              تحديث يدوي
            </button>
            <button
              onClick={() => {
                setAutoUpdate(!autoUpdate);
                if (!autoUpdate) setStatus(tokenRefreshService.getStatus());
              }}
              style={{
                flex: 1,
                padding: '6px 12px',
                backgroundColor: autoUpdate ? '#ef4444' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              {autoUpdate ? 'إيقاف التحديث' : 'تشغيل التحديث'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleGetDiagnostic}
              style={{
                flex: 1,
                padding: '6px 12px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              تقرير مفصل
            </button>
            <button
              onClick={handleClearErrors}
              style={{
                flex: 1,
                padding: '6px 12px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              مسح الأخطاء
            </button>
          </div>

          <button
            onClick={async () => {
              try {
                await tokenRefreshService.initialize();
                setStatus(tokenRefreshService.getStatus());
              } catch (error) {
                console.error('خطأ في إعادة تهيئة النظام:', error);
                alert('خطأ في إعادة تهيئة النظام: ' + error.message);
              }
            }}
            style={{
              width: '100%',
              padding: '6px 12px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            إعادة تهيئة النظام
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenRefreshDiagnostic; 
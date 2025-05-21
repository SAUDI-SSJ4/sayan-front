import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { showErrorToast } from '../../utils/toast';
import Cookies from 'js-cookie';

// قائمة المسارات المعروفة في التطبيق
const knownPaths = [
  '/',
  '/admin',
  '/student',
  '/academy',
  '/login',
  '/signin',
  '/Register',
  '/forget-password',
  '/cart',
  '/LaunchYourAcademy',
  '/EmployeeTrainning',
  '/Ai',
  '/SingleCourse',
  '/privacy-policy',
  '/acdemy'
];

// قائمة أنماط المسارات الديناميكية التي يجب اعتبارها صالحة
const validPathPatterns = [
  /^\/acdemy\/[^\/]+\/?$/,
  /^\/SingleCourse\/[^\/]+\/?$/,
  /^\/academy\/[^\/]+\/?$/
];

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [redirected, setRedirected] = useState(false);
  
  // التحقق مما إذا كان المسار الحالي صالحًا
  const isValidPath = () => {
    // التحقق من المسارات الثابتة
    const isKnownStaticPath = knownPaths.some(path => 
      location.pathname === path || 
      (path !== '/' && location.pathname.startsWith(path + '/'))
    );
    
    if (isKnownStaticPath) return true;
    
    // التحقق من أنماط المسارات الديناميكية
    const isKnownDynamicPath = validPathPatterns.some(pattern => 
      pattern.test(location.pathname)
    );
    
    return isKnownDynamicPath;
  };
  
  useEffect(() => {
    // تجنب تنفيذ التوجيه إذا تم تنفيذه بالفعل
    if (redirected) return;

    // التحقق مما إذا كان المسار الحالي غير صالح
    const isPathInvalid = !isValidPath();
    
    if (isPathInvalid) {
      // عرض التنبيه أعلى الشاشة بشكل واضح
      showErrorToast("الصفحة غير موجودة");
      
      // تعيين حالة التوجيه لتجنب التوجيهات المتكررة
      setRedirected(true);
      
      // تأخير التوجيه للسماح للمستخدم برؤية الرسالة
      const redirectTimer = setTimeout(() => {
        // توجيه المستخدم إلى الصفحة الرئيسية المناسبة بناءً على نوع تسجيل الدخول
        const loginType = Cookies.get('login_type');
        
        try {
          // اختيار وجهة التوجيه بناءً على نوع المستخدم
          let redirectPath = '/';
          
          if (loginType === 'student' || loginType === 'admin' || loginType === 'academy') {
            // جميع أنواع المستخدمين المسجلين يتم توجيههم إلى الصفحة الرئيسية
            redirectPath = '/';
          }
          
          // تنفيذ التوجيه
          navigate(redirectPath, { replace: true });
          console.log('تم التوجيه بنجاح إلى:', redirectPath);
        } catch (error) {
          console.error('خطأ في التوجيه:', error);
        }
      }, 2000);
      
      // تنظيف المؤقت عند إلغاء تحميل المكون
      return () => clearTimeout(redirectTimer);
    }
  }, [navigate, location.pathname, redirected]);

  // إذا كان المسار صالحًا، لا نعرض شيئًا لأن هذا المكون لن يتم تحميله
  return null;
};

export default NotFound;
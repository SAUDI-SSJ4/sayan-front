import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // تقليل مدة الانتظار

  useEffect(() => {
    // توجيه المستخدم تلقائياً بعد فترة
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGoHome(); // استدعاء الدالة مباشرة
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // تنظيف المؤقت عند مغادرة الصفحة
    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    const loginType = Cookies.get('login_type');
    let redirectPath = '/';
    
    // يمكنك تخصيص مسار التوجيه بناءً على نوع المستخدم إذا أردت
    // مثال:
    // if (loginType === 'student') redirectPath = '/student/dashboard';
    // else if (loginType === 'academy') redirectPath = '/academy';
    
    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <div className="max-w-md w-full">
        
        <h1 
          className="
            text-8xl 
            font-extrabold 
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-blue-500 
            to-purple-600
          "
        >
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          الصفحة غير موجودة
        </h2>

        <p className="mt-2 text-lg text-gray-600">
          عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.
        </p>

        <button
          onClick={handleGoHome}
          className="
            mt-8 px-8 py-3 
            bg-blue-600 text-white 
            font-semibold rounded-lg 
            shadow-md hover:bg-blue-700 
            focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-opacity-75
            transition-all duration-300
          "
        >
          العودة إلى الصفحة الرئيسية
        </button>

        <div className="mt-8 text-sm text-gray-500">
          <span>سيتم توجيهك تلقائياً خلال</span>
          <span className="font-bold mx-1">{countdown}</span>
          <span>ثوانٍ...</span>
        </div>
        
      </div>
    </div>
  );
};

export default NotFound;
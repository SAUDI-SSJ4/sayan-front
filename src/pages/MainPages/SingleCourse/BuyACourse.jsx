import React, { useState, useEffect } from "react";
import buying from "../../../assets/icons/buying.jpg";
import { Link } from "react-router-dom";
import { IoClose, IoCard, IoShield, IoCheckmarkCircle } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { postBuy } from "../../../utils/apis/client";
import { useAuth } from "../../../utils/hooks/useAuth";

const BuyACourse = ({ courseId, setshowBuyCourses }) => {
  const { user, isLoading: userLoading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    mutateAsync: buyCourse,
    isLoading: isBuying,
    isSuccess: isPaymentSuccess,
    isError: isPaymentError,
    error: paymentError,
  } = useMutation({
    mutationFn: async () => await postBuy({ course_id: courseId, source: "sayan" }),
    onSuccess: (data) => {
      const newWindow = window.open("", "_blank");
      if (newWindow && data) {
        newWindow.document.open();
        newWindow.document.write(data.data);
        newWindow.document.close();
        console.log("HTML content written to new window");
      } else {
        console.error("Failed to open payment window or missing data");
      }
    },
    onError: (err) => {
      console.error("Error during payment process:", err);
    },
  });

  useEffect(() => {
    console.log({ course_id: courseId, source: "sayan" });

    if (!userLoading && !isAuthenticated && user) {
      if (!courseId) return;
      setIsAuthenticated(true);
      buyCourse();
    }
  }, [user, userLoading, isAuthenticated, buyCourse, courseId]);

  const renderPaymentState = () => {
    if (userLoading || !isAuthenticated) {
      return (
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <IoShield className="text-blue-600 text-2xl" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-2">قم بتسجيل الدخول أولاً</h3>
          
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          
          {/* Image */}
          <div className="flex justify-center mb-6">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={buying} 
                alt="Login" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>
          
          <p className="text-gray-600 text-lg leading-relaxed px-4">
            لشراء المادة التدريبية عليك تسجيل الدخول أو إنشاء حساب أولاً.
          </p>
          
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          
          {/* Login Button */}
          <Link
            to={"/login"}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            <IoCard className="text-xl" />
            تسجيل الدخول أو إنشاء حساب
          </Link>
        </div>
      );
    }

    switch (true) {
      case isBuying:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">جاري المعالجة...</h3>
            <p className="text-gray-600">يرجى الانتظار بينما نقوم بتجهيز عملية الدفع</p>
          </div>
        );

      case isPaymentSuccess:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <IoCheckmarkCircle className="text-green-600 text-4xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">تم توجيهك إلى صفحة الدفع</h3>
            <p className="text-gray-600">تم فتح نافذة جديدة لإتمام عملية الدفع</p>
          </div>
        );

      case isPaymentError:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-red-100 p-4 rounded-full">
                <IoClose className="text-red-600 text-4xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-red-600">حدث خطأ</h3>
            <p className="text-gray-600">{paymentError?.message || "حدث خطأ أثناء عملية الدفع"}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative transform animate-scale-in border border-gray-100">
        {renderPaymentState()}
        
        {/* Close Button */}
        <button
          onClick={() => setshowBuyCourses(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
        >
          <IoClose size={24} />
        </button>
      </div>
    </div>
  );
};

export default BuyACourse;

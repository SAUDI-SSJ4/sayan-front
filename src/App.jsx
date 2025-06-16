import React, { Fragment, useEffect, useState, lazy, Suspense } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
// Load CSS only when needed
import "animate.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthGaurdRoute from "./Routes/AuthGaurdRoute";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import { Toaster } from 'react-hot-toast';
import TokenRefreshProvider from "./components/TokenRefreshProvider";
import FloatingAIAssistant from "./components/FloatingAIAssistant/FloatingAIAssistant";
import CustomThemeProvider from "./components/ThemeProvider";

// تحسين عرض البانر الرئيسي
const AppBanner = () => (
  <div
    id="sticky-banner"
    tabIndex="-1"
    className="hidden-sm banner w-full px-4 py-3 text-center border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50"
  >
    <div className="flex items-center justify-center mx-auto">
      <div className="flex items-center text-sm font-normal text-gray-700">
        <span className="inline-flex p-1.5 me-3 bg-blue-100 rounded-full w-8 h-8 items-center justify-center shrink-0">
          <svg
            className="w-4 h-4 text-blue-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
          </svg>
        </span>
        <span className="font-baloo-medium">
          🎉 مرحباً بكم في النسخة التجريبية من منصة سيان! 
          <br className="sm:hidden" />
          <span className="text-blue-700 font-semibold mx-2">شاركونا آراءكم واقتراحاتكم عبر الرقم التالي</span>
           0590406718
        </span>
      </div>
    </div>
  </div>
);

// مكون Loading محسّن
const LoadingSpinner = ({ message = "جاري التحميل..." }) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
      <p className="font-baloo-medium text-gray-700 text-lg">{message}</p>
    </div>
  </div>
);

// مكون Error Boundary للتعامل مع أخطاء التحميل
class LazyLoadErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center p-8">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">حدث خطأ في تحميل الصفحة</h2>
            <p className="text-gray-600 mb-4">يرجى إعادة تحميل الصفحة أو المحاولة مرة أخرى</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy loaded components مع تجميع أفضل
const LazyComponents = {
  // صفحات أساسية
  NotFound: lazy(() => import("./component/NotFound/NotFound")),
  Home: lazy(() => import("./pages/MainPages/Home/Home")),
  
  // صفحات الأكاديمية
  Layout1: lazy(() => import("./pages/AcadmyLayout/Layout1/layout1")),
  NewLayout: lazy(() => import("./pages/AcadmyLayout/NewLayout/NewLayout")),
  AcademySingleCourse: lazy(() => import("./pages/AcadmyLayout/Layout1/AcademySingleCourse")),
  
  // صفحات المنتجات والدورات
  AllBlogpage: lazy(() => import("./component/AcadmyLayouts/Blog/AllBlogpage/AllBlogpage")),
  AllProductsPage: lazy(() => import("./component/AcadmyLayouts/AllProductsPage/AllProductsPage")),
  AllCoursesPage: lazy(() => import("./component/AcadmyLayouts/AllCoursesPage/AllCoursesPage")),
  SingleCourse: lazy(() => import("./pages/MainPages/SingleCourse/SingleCourse")),
  
  // صفحات المعلومات
  LaunchYourAcademy: lazy(() => import("./pages/MainPages/LaunchYourAcademy/LaunchYourAcademy")),
  EmployeeTrainning: lazy(() => import("./pages/MainPages/EmployeeTrainning/EmployeeTrainning")),
  Ai: lazy(() => import("./pages/MainPages/Ai/Ai")),
  MainBlog: lazy(() => import("./pages/MainPages/Blog/MainBlog")),
  ContactUs3: lazy(() => import("./component/AcadmyLayouts/ContactUs3/ContactUs3")),
  PrivacyPolicyPage: lazy(() => import("./pages/Policy/PrivacyPolicyPage")),
  
  // صفحات التسجيل والدخول
  Signin: lazy(() => import("./pages/signin/Signin")),
  AcademyLogin: lazy(() => import("./pages/AcademyDashBoard/Login/AcademyLogin")),
  ForgetPassword: lazy(() => import("./pages/signin/ForgetPassword")),
  AcademyRegister: lazy(() => import("./pages/AcademyDashBoard/Register/Register")),
  
  // صفحات أخرى
  HomeAcademy: lazy(() => import("./pages/MainPages/AcademyHome/HomeAcademy")),
  TestPage: lazy(() => import("./TestPage")),
  CartPage: lazy(() => import("./pages/Cart/CartPage")),
  Updates: lazy(() => import("./components/Updates/Updates")),
  
  // المسارات
  AdminRoute: lazy(() => import("./Routes/adminRoutes")),
  StudentRoute: lazy(() => import("./Routes/StudentRoutes")),
  AcademyRoutes: lazy(() => import("./Routes/AcademyRoutes"))
};

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  // تحديد نوع المسار
  const getRouteType = () => {
    if (pathname.includes("/admin")) return "admin";
    if (pathname.includes("/student")) return "student";
    if (pathname.includes("/academy")) return "academy";
    return "public";
  };

  const routeType = getRouteType();

  return (
    <CustomThemeProvider>
      <NotificationProvider>
        <CartProvider>
          <TokenRefreshProvider>
            {/* Toast Notifications */}
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  fontFamily: 'Baloo Bhaijaan 2, sans-serif',
                  fontSize: '14px'
                }
              }}
            />

            {/* البانر الرئيسي */}
            <AppBanner />

            {/* المحتوى الرئيسي */}
            <div dir="rtl" className="font-baloo-regular min-h-screen bg-gray-50">
              <LazyLoadErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  {/* مسارات لوحات التحكم */}
                  {routeType === "admin" && <LazyComponents.AdminRoute />}
                  {routeType === "student" && <LazyComponents.StudentRoute />}
                  {routeType === "academy" && <LazyComponents.AcademyRoutes />}
                  
                  {/* المسارات العامة */}
                  {routeType === "public" && (
                  <Routes>
                    {/* الصفحة الرئيسية */}
                    <Route index path="/" element={<LazyComponents.Home />} />
                    
                    {/* صفحات الأكاديمية */}
                    <Route path="/acdemy/:id" element={<LazyComponents.Layout1 />} />
                    <Route 
                      path="/acdemy/:academyId/SingleCourse/:courseId" 
                      element={<LazyComponents.AcademySingleCourse />} 
                    />
                    <Route 
                      path="/acdemy/:acdemyId/AllProductsPage" 
                      element={<LazyComponents.AllProductsPage />} 
                    />
                    <Route 
                      path="/acdemy/:acdemyId/AllCoursesPage" 
                      element={<LazyComponents.AllCoursesPage />} 
                    />
                    <Route 
                      path="/acdemy/:acdemyId/ContactUs" 
                      element={<LazyComponents.ContactUs3 />} 
                    />
                    
                    {/* الدورات والمنتجات */}
                    <Route 
                      path="/SingleCourse/:courseId" 
                      element={<LazyComponents.SingleCourse />} 
                    />
                    <Route path="/cart" element={<LazyComponents.CartPage />} />
                    
                    {/* صفحات المعلومات */}
                    <Route 
                      path="/LaunchYourAcademy" 
                      element={<LazyComponents.LaunchYourAcademy />} 
                    />
                    <Route 
                      path="/EmployeeTrainning" 
                      element={<LazyComponents.EmployeeTrainning />} 
                    />
                    <Route path="/Ai" element={<LazyComponents.Ai />} />
                    <Route 
                      path="/privacy-policy" 
                      element={<LazyComponents.PrivacyPolicyPage />} 
                    />
                    
                    {/* صفحات التسجيل والدخول */}
                    <Route element={<AuthGaurdRoute />}>
                      <Route path="/login" element={<LazyComponents.AcademyLogin />} />
                      <Route path="signin" element={<LazyComponents.Signin />} />
                      <Route path="/Register" element={<LazyComponents.AcademyRegister />} />
                      <Route path="/forget-password" element={<LazyComponents.ForgetPassword />} />
                    </Route>
                    
                    {/* صفحات تطوير واختبار */}
                    <Route path="/test" element={<LazyComponents.TestPage />} />
                    <Route path="/updates" element={<LazyComponents.Updates />} />
                    
                    {/* صفحة 404 */}
                    <Route path="*" element={<LazyComponents.NotFound />} />
                  </Routes>
                )}
                </Suspense>
              </LazyLoadErrorBoundary>
            </div>

            {/* المساعد الذكي العائم */}
            <FloatingAIAssistant />
          </TokenRefreshProvider>
        </CartProvider>
      </NotificationProvider>
    </CustomThemeProvider>
  );
}

export default App;

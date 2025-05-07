import { Fragment, useEffect, useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "quill/dist/quill.snow.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "animate.css";
import "aos/dist/aos.css";
import AOS from "aos";
import AdminRoute from "./Routes/adminRoutes";
import StudentRoute from "./Routes/StudentRoutes";
import { Route, Routes, useLocation, Navigate, useNavigate } from "react-router-dom";
import Layout1 from "./pages/AcadmyLayout/Layout1/layout1";
import AllBlogpage from "./component/AcadmyLayouts/Blog/AllBlogpage/AllBlogpage";
import AllProductsPage from "./component/AcadmyLayouts/AllProductsPage/AllProductsPage";
import AllCoursesPage from "./component/AcadmyLayouts/AllCoursesPage/AllCoursesPage";
import ContactUs3 from "./component/AcadmyLayouts/ContactUs3/ContactUs3";
import AcademyRoutes from "./Routes/AcademyRoutes";
import Home from "./pages/MainPages/Home/Home";
import LaunchYourAcademy from "./pages/MainPages/LaunchYourAcademy/LaunchYourAcademy";
import EmployeeTrainning from "./pages/MainPages/EmployeeTrainning/EmployeeTrainning";
import Ai from "./pages/MainPages/Ai/Ai";
import MainBlog from "./pages/MainPages/Blog/MainBlog";
import SingleCourse from "./pages/MainPages/SingleCourse/SingleCourse";
import Signin from "./pages/signin/Signin";
import AcademyLogin from "./pages/AcademyDashBoard/Login/AcademyLogin";
import ForgetPassword from "./pages/signin/ForgetPassword";
import AcademyRegister from "./pages/AcademyDashBoard/Register/Register";
import AuthGaurdRoute from "./Routes/AuthGaurdRoute";
import HomeAcademy from "./pages/MainPages/AcademyHome/HomeAcademy";
import PrivacyPolicyPage from "./pages/Policy/PrivacyPolicyPage";
import TestPage from "./TestPage";
import CartPage from "./pages/Cart/CartPage";

import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import NewLayout from "./pages/AcadmyLayout/NewLayout/NewLayout";

import { Banner, BannerCollapseButton } from "flowbite-react";

// مكون يقوم بنقل المستخدم مع الاحتفاظ بمعلمات URL
const PaymentRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // الحصول على معلمات URL الحالية
    const searchParams = new URLSearchParams(location.search);
    console.log('تمرير معلمات الدفع:', Object.fromEntries(searchParams.entries()));
    
    // حفظ المعلومات الهامة أولاً في localStorage
    if (searchParams.get('id')) {
      localStorage.setItem('moyasar_id', searchParams.get('id'));
    }
    if (searchParams.get('invoice_id')) {
      localStorage.setItem('invoice_id', searchParams.get('invoice_id'));
    }
    if (searchParams.get('transaction_id')) {
      localStorage.setItem('transaction_id', searchParams.get('transaction_id'));
    }
    if (searchParams.get('status')) {
      localStorage.setItem('payment_status', searchParams.get('status'));
    }
    
    // توجيه المستخدم إلى صفحة نجاح الدفع مع جميع المعلمات
    navigate('/student/payment-success' + location.search, { replace: true });
  }, [location, navigate]);
  
  return (
    <div className="py-5 my-5 text-center">
      <p>جاري التوجيه لصفحة تأكيد الدفع...</p>
    </div>
  );
};

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <NotificationProvider>
      <CartProvider>
        <div
          id="sticky-banner"
          tabIndex="-1"
          className="px-4 py-3 w-full text-center bg-gray-50 border-b border-gray-200 hidden-sm banner"
        >
          <div className="flex items-center mx-auto mt-2">
            <p className="flex items-center text-sm font-normal text-gray-500">
              <span className="inline-flex justify-center items-center p-1 w-6 h-6 bg-gray-200 rounded-full me-3 shrink-0">
                <svg
                  className="w-3 h-3 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                </svg>
                <span className="sr-only">Announcement</span>
              </span>
              <span>
                نرحب بكم في النسخة التجريبية من منصة سيان وندعوكم لمشاركة كافة
                مقترحاتكم لتحسين المنصة من خلال التواصل مع الرقم التالي
              </span>
            </p>
          </div>
        </div>

        <div dir="rtl">
          {pathname.includes("/admin") ? (
            <AdminRoute />
          ) : pathname.includes("/student") ? (
            <StudentRoute />
          ) : pathname.includes("/academy") ? (
            <AcademyRoutes />
          ) : null}
          <Routes>
            {/* <Route path="/myacademy/:name/:id/:slug" element={<HomeAcademy />} /> */}

            {/* <Route path="/acdemy/:id" element={<Layout1 />} /> */}
            <Route path="/acdemy/:id" element={<Layout1 />} />

            <Route index path="/" element={<Home />} />
            <Route path="/cart" element={<Navigate to="/student/ShoppingCart" replace />} />
            <Route path="/checkout" element={<Navigate to="/student/checkout" replace />} />
            <Route path="/payment/success" element={<PaymentRedirect />} />
            <Route path="/payment/callback" element={<PaymentRedirect />} />
            <Route index path="/test" element={<TestPage />} />

            <Route path="/LaunchYourAcademy" element={<LaunchYourAcademy />} />
            <Route path="/EmployeeTrainning" element={<EmployeeTrainning />} />
            <Route path="/Ai" element={<Ai />} />
            {/* <Route path="/Blogs" element={<MainBlog />} /> */}
            <Route path="/SingleCourse/:courseId" element={<SingleCourse />} />

            {/* <Route path="/acdemy/:acdemyId" element={<Layout1 />} /> */}

            {/* <Route path="/acdemy/:acdemyId/allBlogs" element={<AllBlogpage />} /> */}
            <Route
              path="/acdemy/:acdemyId/AllProductsPage"
              element={<AllProductsPage />}
            />
            <Route
              path="/acdemy/:acdemyId/AllCoursesPage"
              element={<AllCoursesPage />}
            />
            <Route
              path="/acdemy/:acdemyId/ContactUs"
              element={<ContactUs3 />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route element={<AuthGaurdRoute />}>
              <Route path="/login" element={<AcademyLogin />} />
              <Route path="signin" element={<Signin />} />
              <Route path="/Register" element={<AcademyRegister />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
            </Route>
          </Routes>
        </div>
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;

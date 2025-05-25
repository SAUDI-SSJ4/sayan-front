import { Fragment, useEffect, useState, lazy, Suspense } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "quill/dist/quill.snow.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "animate.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthGaurdRoute from "./Routes/AuthGaurdRoute";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import { Toaster } from 'react-hot-toast';

import { Banner, BannerCollapseButton } from "flowbite-react";

// Lazy loaded components
const NotFound = lazy(() => import("./component/NotFound/NotFound"));
const Layout1 = lazy(() => import("./pages/AcadmyLayout/Layout1/layout1"));
const AllBlogpage = lazy(() => import("./component/AcadmyLayouts/Blog/AllBlogpage/AllBlogpage"));
const AllProductsPage = lazy(() => import("./component/AcadmyLayouts/AllProductsPage/AllProductsPage"));
const AllCoursesPage = lazy(() => import("./component/AcadmyLayouts/AllCoursesPage/AllCoursesPage"));
const ContactUs3 = lazy(() => import("./component/AcadmyLayouts/ContactUs3/ContactUs3"));
const Home = lazy(() => import("./pages/MainPages/Home/Home"));
const LaunchYourAcademy = lazy(() => import("./pages/MainPages/LaunchYourAcademy/LaunchYourAcademy"));
const EmployeeTrainning = lazy(() => import("./pages/MainPages/EmployeeTrainning/EmployeeTrainning"));
const Ai = lazy(() => import("./pages/MainPages/Ai/Ai"));
const MainBlog = lazy(() => import("./pages/MainPages/Blog/MainBlog"));
const SingleCourse = lazy(() => import("./pages/MainPages/SingleCourse/SingleCourse"));
const Signin = lazy(() => import("./pages/signin/Signin"));
const AcademyLogin = lazy(() => import("./pages/AcademyDashBoard/Login/AcademyLogin"));
const ForgetPassword = lazy(() => import("./pages/signin/ForgetPassword"));
const AcademyRegister = lazy(() => import("./pages/AcademyDashBoard/Register/Register"));
const HomeAcademy = lazy(() => import("./pages/MainPages/AcademyHome/HomeAcademy"));
const PrivacyPolicyPage = lazy(() => import("./pages/Policy/PrivacyPolicyPage"));
const TestPage = lazy(() => import("./TestPage"));
const CartPage = lazy(() => import("./pages/Cart/CartPage"));
const NewLayout = lazy(() => import("./pages/AcadmyLayout/NewLayout/NewLayout"));
const AcademySingleCourse = lazy(() => import("./pages/AcadmyLayout/Layout1/AcademySingleCourse"));
const AdminRoute = lazy(() => import("./Routes/adminRoutes"));
const StudentRoute = lazy(() => import("./Routes/StudentRoutes"));
const AcademyRoutes = lazy(() => import("./Routes/AcademyRoutes"));

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <NotificationProvider>
      <CartProvider>
        <Toaster />
        <div
          id="sticky-banner"
          tabIndex="-1"
          className="hidden-sm banner w-full px-4 py-3 text-center border-b border-gray-200 bg-gray-50"
        >
          <div className="flex items-center mx-auto mt-2">
            <p className="flex items-center text-sm font-normal text-gray-500">
              <span className="inline-flex p-1 me-3 bg-gray-200 rounded-full w-6 h-6 items-center justify-center shrink-0">
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
          <Suspense fallback={<div>Loading...</div>}>
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
              <Route path="/cart" element={<CartPage />} />
              <Route index path="/test" element={<TestPage />} />

              <Route path="/LaunchYourAcademy" element={<LaunchYourAcademy />} />
              <Route path="/EmployeeTrainning" element={<EmployeeTrainning />} />
              <Route path="/Ai" element={<Ai />} />
              {/* <Route path="/Blogs" element={<MainBlog />} /> */}
              <Route path="/SingleCourse/:courseId" element={<SingleCourse />} />
              <Route path="/acdemy/:academyId/SingleCourse/:courseId" element={<AcademySingleCourse />} />

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
              
              {/* مسار للصفحات غير الموجودة */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;

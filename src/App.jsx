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
import { Route, Routes, useLocation } from "react-router-dom";
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


function App() {
  const {pathname} = useLocation();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
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
      <Route path="/acdemy/:id" element={<Layout1 />} />

        <Route index path="/" element={<Home />} />
        
        <Route index path="/test" element={<TestPage />} />
      
        <Route path="/LaunchYourAcademy" element={<LaunchYourAcademy />} />
        <Route path="/EmployeeTrainning" element={<EmployeeTrainning />} />
        <Route path="/Ai" element={<Ai />} />
        <Route path="/Blogs" element={<MainBlog />} />
        <Route path="/SingleCourse/:courseId" element={<SingleCourse />} />
        <Route path="/acdemy/:acdemyId" element={<Layout1 />} />
        <Route path="/acdemy/:acdemyId/allBlogs" element={<AllBlogpage />} />
        <Route path="/acdemy/:acdemyId/AllProductsPage" element={<AllProductsPage />} />
        <Route path="/acdemy/:acdemyId/AllCoursesPage" element={<AllCoursesPage />} />
        <Route path="/acdemy/:acdemyId/ContactUs" element={<ContactUs3 />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route element={<AuthGaurdRoute />}>
          <Route path="/login" element={<AcademyLogin />} />
          <Route path="signin" element={<Signin />} />
          <Route path="/Register" element={<AcademyRegister />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

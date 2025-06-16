import { Navigate, Route, Routes } from "react-router-dom";
import LayOut from "../pages/layout/layout";
import { Fragment } from "react";
import Profile from "../pages/AcademyDashBoard/Profile/Profile";
import DigitalProducts from "../pages/AcademyDashBoard/DigitalProducts/DigitalProducts";
import AddNewProduct from "../pages/AcademyDashBoard/DigitalProducts/AddNewProduct";
import Blogs from "../pages/AcademyDashBoard/blogs/blog";
import ReportsAndStatistics from "../pages/AcademyDashBoard/ReportsAndStatistics/ReportsAndStatistics";
import AcademeyWallet from "../pages/AcademyDashBoard/Wallet/Wallet";
import AcademySales from "../pages/AcademyDashBoard/sales/sales";
import AcadmeyTrainingCourses from "../pages/AcademyDashBoard/TrainingCourses/TrainingCourses";
import AcademySingleCourse from "../pages/AcademyDashBoard/TrainingCourses/SingleCourse";
import AcademyCertficates from "../pages/AcademyDashBoard/Certficates/Certficates";
import AcademyAddNewCertficates from "../pages/AcademyDashBoard/Certficates/AddNewCertficates";
import Exams from "../pages/AcademyDashBoard/Exams/Exams";
import SingleEaxam from "../pages/AcademyDashBoard/Exams/SingleEaxam";
import SingleProduct from "../pages/AcademyDashBoard/DigitalProducts/SingleProduct/SingleProduct";
import AcademyVideos from "../pages/AcademyDashBoard/Video/Video";
import SingleVideo from "../pages/AcademyDashBoard/Video/SingleVideo";
import AddNewVideo from "../pages/AcademyDashBoard/Video/AddNewVideo";
import Categories from "../pages/AcademyDashBoard/categories/categories";
import AddNewCate from "../pages/AcademyDashBoard/categories/AddNewCate";
import StudentInfo from "../pages/AcademyDashBoard/StudentInfo/StudentInfo";
import AddNewStudnet from "../pages/AcademyDashBoard/StudentInfo/AddNewStudnet";
import StudentBagExams from "../pages/AcademyDashBoard/StudentBagExams/StudentBagExams";
import StudentBagCertifcate from "../pages/AcademyDashBoard/StudentBagCertifcate/StudentBagCertifcate";
import Comments from "../pages/AcademyDashBoard/Comments/Comments";
import AffiliateMarketing from "../pages/AcademyDashBoard/AffiliateMarketing/AffiliateMarketing";
import AddJoinFrom from "../pages/AcademyDashBoard/AffiliateMarketing/AddJoinFrom";
import FinancialTransactions from "../pages/FinancialTransactions/FinancialTransactions";
import SubscreptionPacks from "../pages/AcademyDashBoard/SubscreptionPacks/SubscreptionPacks";
import AddNewSubscreptionPacksAcademy from "../pages/AcademyDashBoard/SubscreptionPacks/AddNewSubscreptionPacks";
import AcademyDashboard from "../pages/AcademyDashBoard/HomePage/dashbaord";
import AcademySettings from "../pages/AcademyDashBoard/AcademySettings/AcademySettings";
import EditSlider from "../pages/AcademyDashBoard/AcademySettings/EditSlider";
import EditAbout from "../pages/AcademyDashBoard/AcademySettings/EditAbout";
import EditFaqs from "../pages/AcademyDashBoard/AcademySettings/EditFaqs";
import EditCallToAction from "../pages/AcademyDashBoard/AcademySettings/EditCallToAction";
import EditFooter from "../pages/AcademyDashBoard/AcademySettings/EditFooter";
import EditPartner from "../pages/AcademyDashBoard/AcademySettings/EditPartner";
import EditTemplate from "../pages/AcademyDashBoard/AcademySettings/EditTemplate";
import Admins from "../pages/AcademyDashBoard/Admins/Admins";
import Trainers from "../pages/AcademyDashBoard/Trainers/Trainers";
import AddEditTrainers from "../pages/AcademyDashBoard/Trainers/AddEditTrainers";
import AddEditProducts from "../pages/AcademyDashBoard/Products/AddEditProducts";
import Products from "../pages/AcademyDashBoard/Products/Products";
import AddEditBlog from "../pages/AcademyDashBoard/blogs/AddEditBlog";
import Cookies from "js-cookie";
import AddCoupon from "../pages/AcademyDashBoard/Copons/AddCoupon";
import Coupons from "../pages/AcademyDashBoard/Copons/Coupons";
import AddCourse from "../pages/AcademyDashBoard/Courses/AddCourse";
import EditAcademyProfile from "../pages/AcademyDashBoard/Profile/EditAcademyProfile";
import { showErrorToast } from "../utils/toast";
import HomeAcademy from "../pages/MainPages/AcademyHome/HomeAcademy";
import MainSettings from "../pages/AcademyDashBoard/AcademySettings/MainSettings";
import EditStudentOpinion from "../pages/AcademyDashBoard/AcademySettings/EditStudentOpinion";
import AddStudentOpinion from "../pages/AcademyDashBoard/AcademySettings/AddStudentOpinion";
import AddFaqs from "../pages/AcademyDashBoard/AcademySettings/AddFaqs";
import EditCourse from "../pages/AcademyDashBoard/course/manage";
import AddNewCourse from "../pages/AcademyDashBoard/course/create";
import CourseLayout from "../pages/AcademyDashBoard/course/components/CourseLayout";
const AcademyRoutes = () => {
  const loginType = Cookies.get("login_type");

  const IsAcademyAuthGaurd = ({ children }) => {
    const location = window.location.pathname;
    // تحديث التعبير المنتظم ليشمل المسار الكامل
    const isPublicAcademyPage =
      /^(\/academy\/\d+|https:\/\/sayan\.pro\/academy\/\d+)/.test(location);

    if (isPublicAcademyPage) {
      return children;
    }

    console.log(Cookies.get("login_type"));
    if (loginType === "academy") {
      return children;
    } else {
      showErrorToast("يرجى تسجيل الدخول بحساب اكاديمية");
      return <Navigate to="/login" />;
    }
  };

  return (
    <Fragment>
      <LayOut>
        <Routes>
          <Route
            path="/academy"
            element={
              <IsAcademyAuthGaurd>
                <AcademyDashboard />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Profile"
            element={
              <IsAcademyAuthGaurd>
                <Profile />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Profile/edit"
            element={
              <IsAcademyAuthGaurd>
                <EditAcademyProfile />
              </IsAcademyAuthGaurd>
            }
          />
          <Route path="/academy/course/create" element={<AddNewCourse />} />
          <Route
            path="/academy/course/:courseId/manage"
            element={<EditCourse />}
          />
          <Route
            path="/academy/DigitalProducts"
            element={
              <IsAcademyAuthGaurd>
                <DigitalProducts />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/DigitalProducts/AddNewProduct/*"
            element={
              <IsAcademyAuthGaurd>
                <AddNewProduct />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/DigitalProducts/AddNewProduct/:slug"
            element={
              <IsAcademyAuthGaurd>
                <AddNewProduct />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/*"
            element={
              <IsAcademyAuthGaurd>
                <AcademySettings />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/slider/edit"
            element={
              <IsAcademyAuthGaurd>
                <EditSlider />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/new-course"
            element={
              <IsAcademyAuthGaurd>
                <AddCourse />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/new-course/:courseId/:categoryId"
            element={
              <IsAcademyAuthGaurd>
                <AddCourse />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/main"
            element={
              <IsAcademyAuthGaurd>
                <MainSettings />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/ratesOfStudents/add"
            element={
              <IsAcademyAuthGaurd>
                <AddStudentOpinion />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/ratesOfStudents/edit/:id"
            element={
              <IsAcademyAuthGaurd>
                <EditStudentOpinion />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/about/edit"
            element={
              <IsAcademyAuthGaurd>
                <EditAbout />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/faq/edit/:id"
            element={
              <IsAcademyAuthGaurd>
                <EditFaqs />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/faq/add"
            element={
              <IsAcademyAuthGaurd>
                <AddFaqs />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/call-to-action/edit/:slug"
            element={
              <IsAcademyAuthGaurd>
                <EditCallToAction />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/call-to-action/add"
            element={
              <IsAcademyAuthGaurd>
                <EditCallToAction />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/footer/edit/:slug"
            element={
              <IsAcademyAuthGaurd>
                <EditFooter />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/footer/add"
            element={
              <IsAcademyAuthGaurd>
                <EditFooter />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/partner/edit"
            element={
              <IsAcademyAuthGaurd>
                <EditPartner />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/partner/add"
            element={
              <IsAcademyAuthGaurd>
                <EditPartner />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/settings/template/edit"
            element={
              <IsAcademyAuthGaurd>
                <EditTemplate />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Blogs"
            element={
              <IsAcademyAuthGaurd>
                <Blogs />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Product/add"
            element={
              <IsAcademyAuthGaurd>
                <AddEditProducts />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Product/edit/:id"
            element={
              <IsAcademyAuthGaurd>
                <AddEditProducts />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Products"
            element={
              <IsAcademyAuthGaurd>
                <Products />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/TrainersManagment/add"
            element={<AddEditTrainers />}
          />
          <Route
            path="/academy/TrainersManagment/edit/:id"
            element={<AddEditTrainers />}
          />
          <Route
            path="/academy/EmployeeMangment"
            element={
              <IsAcademyAuthGaurd>
                <Admins />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/TrainersManagment/add"
            element={<AddEditTrainers />}
          />
          <Route
            path="/academy/TrainersManagment/edit/:id"
            element={<AddEditTrainers />}
          />
          <Route
            path="/academy/TrainersManagment"
            element={
              <IsAcademyAuthGaurd>
                <Trainers />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Blogs/add"
            element={
              <IsAcademyAuthGaurd>
                <AddEditBlog />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Blogs/edit/:id"
            element={
              <IsAcademyAuthGaurd>
                <AddEditBlog />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/ReportsAndStatistics"
            element={
              <IsAcademyAuthGaurd>
                <ReportsAndStatistics />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Wallet"
            element={
              <IsAcademyAuthGaurd>
                <AcademeyWallet />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/sales"
            element={
              <IsAcademyAuthGaurd>
                <AcademySales />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/training-courses"
            element={
              <IsAcademyAuthGaurd>
                <AcadmeyTrainingCourses />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/SingleCourse"
            element={
              <IsAcademyAuthGaurd>
                <AcademySingleCourse />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Certficates"
            element={
              <IsAcademyAuthGaurd>
                <AcademyCertficates />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/AddNewCertficates"
            element={
              <IsAcademyAuthGaurd>
                <AcademyAddNewCertficates />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Exams/*"
            element={
              <IsAcademyAuthGaurd>
                <Exams />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/SingleExam/*"
            element={
              <IsAcademyAuthGaurd>
                <SingleEaxam academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/DigitalProducts/SingleProduct/*"
            element={
              <IsAcademyAuthGaurd>
                <SingleProduct academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Video"
            element={
              <IsAcademyAuthGaurd>
                <AcademyVideos academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/SingleVideo/*"
            element={
              <IsAcademyAuthGaurd>
                <SingleVideo academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/AddNewVideo"
            element={
              <IsAcademyAuthGaurd>
                <AddNewVideo academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Categories"
            element={
              <IsAcademyAuthGaurd>
                <Categories academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/AddNewCate"
            element={
              <IsAcademyAuthGaurd>
                <AddNewCate academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/StudentInfo"
            element={
              <IsAcademyAuthGaurd>
                <StudentInfo academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Coupons"
            element={
              <IsAcademyAuthGaurd>
                <Coupons />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Coupons/add"
            element={
              <IsAcademyAuthGaurd>
                <AddCoupon />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/addNewStudent"
            element={
              <IsAcademyAuthGaurd>
                <AddNewStudnet academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/StudentBagExams"
            element={
              <IsAcademyAuthGaurd>
                <StudentBagExams academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/StudentBagCertifcate"
            element={
              <IsAcademyAuthGaurd>
                <StudentBagCertifcate academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/Comments"
            element={
              <IsAcademyAuthGaurd>
                <Comments academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/AffiliateMarketing/*"
            element={
              <IsAcademyAuthGaurd>
                <AffiliateMarketing academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/AddJoinFrom/*"
            element={
              <IsAcademyAuthGaurd>
                <AddJoinFrom academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/FinancialTransactions/*"
            element={
              <IsAcademyAuthGaurd>
                <FinancialTransactions academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/SubscreptionPacks/*"
            element={
              <IsAcademyAuthGaurd>
                <SubscreptionPacks academy />
              </IsAcademyAuthGaurd>
            }
          />
          <Route
            path="/academy/AddNewSubscreptionPacks/*"
            element={
              <IsAcademyAuthGaurd>
                <AddNewSubscreptionPacksAcademy academy />
              </IsAcademyAuthGaurd>
            }
          />
        </Routes>
      </LayOut>
    </Fragment>
  );
};

export default AcademyRoutes;

import { Navigate, Route, Routes } from "react-router-dom";
import LayOut from "../pages/layout/layout";
import { Fragment } from "react";
import Profile from "../pages/AcademyDashBoard/Profile/Profile";
import DigitalProducts from "../pages/AcademyDashBoard/DigitalProducts/DigitalProducts";
import AddNewProduct from "../pages/AcademyDashBoard/DigitalProducts/AddNewProduct";
import Blogs from "../pages/AcademyDashBoard/blogs/blog";
import AddNewBlogAcademey from "../pages/AcademyDashBoard/blogs/AddNewBlog";
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
import EditFaq from "../pages/AcademyDashBoard/AcademySettings/EditFaq";
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
import AddNewCourseAcademy from "../pages/AcademyDashBoard/AddNewCourseAcademy/AddNewCourseAcademy";
import EditAcademyProfile from "../pages/AcademyDashBoard/Profile/EditAcademyProfile";
import toast from "react-hot-toast";
import HomeAcademy from "../pages/MainPages/AcademyHome/HomeAcademy";
import MainSettings from "../pages/AcademyDashBoard/AcademySettings/MainSettings";
import EditStudentRates from "../pages/AcademyDashBoard/AcademySettings/EditStudentRates";
const AcademyRoutes = () => {

  const loginType = Cookies.get("login_type");

  const IsAcademyAuthGaurd = ({ children }) => {
    console.log(Cookies.get("login_type"));
    if (loginType === "academy") {
      return children;
    } else {
      toast.error("يرجى تسجيل الدخول");
      return <Navigate to="/login" />;
    }
  };

  return (
    <Fragment>
      <LayOut>
        <IsAcademyAuthGaurd>
          <Routes>
            <Route path="/academy" element={<AcademyDashboard />} />
            <Route path="/academy/Profile" element={<Profile />} />
            <Route path="/academy/Profile/edit" element={<EditAcademyProfile />} />
            <Route path="/academy/DigitalProducts" element={<DigitalProducts />} />
            <Route path="/academy/DigitalProducts/AddNewProduct/*" element={<AddNewProduct />} />
            <Route path="/academy/DigitalProducts/AddNewProduct/:slug" element={<AddNewProduct />}/>
            <Route path="/academy/settings/*" element={<AcademySettings />} />
            <Route path="/academy/settings/slider/edit" element={<EditSlider />} />
            <Route path="/academy/addNewCourse" element={<AddNewCourseAcademy />} />
            <Route path="/academy/addNewCourse/:courseId/:categoryId" element={<AddNewCourseAcademy />} />
            <Route path="/academy/settings/main" element={<MainSettings />} />

            <Route path="/academy/settings/ratesOfStudents/add" element={<EditStudentRates />} />
            <Route path="/academy/settings/ratesOfStudents/edit/:slug" element={<EditStudentRates />} />
            
            <Route path="/academy/settings/about/edit" element={<EditAbout />} />
            <Route path="/academy/settings/faq/edit/:slug" element={<EditFaq />} />
            <Route path="/academy/settings/faq/add" element={<EditFaq />} />
            <Route path="/academy/settings/call-to-action/edit/:slug" element={<EditCallToAction />}/>
            <Route path="/academy/settings/call-to-action/add" element={<EditCallToAction />} />
            <Route path="/academy/settings/footer/edit/:slug" element={<EditFooter />} />
            <Route path="/academy/settings/footer/add" element={<EditFooter />} />
            <Route path="/academy/settings/partner/edit" element={<EditPartner />} />
            <Route path="/academy/settings/partner/add" element={<EditPartner />} />
            <Route path="/academy/settings/template/edit" element={<EditTemplate />} />
            <Route path="/academy/Blogs" element={<Blogs />} />
            <Route path="/academy/Product/add" element={<AddEditProducts />} />
            <Route path="/academy/Product/edit/:id" element={<AddEditProducts />} />
            <Route path="/academy/Products" element={<Products />} />
            <Route path="/academy/TrainersManagment/add" element={<AddEditTrainers />} />
            <Route path="/academy/TrainersManagment/edit/:id" element={<AddEditTrainers />} />
            <Route path="/academy/EmployeeMangment" element={<Admins />} />
            <Route path="/academy/TrainersManagment/add" element={<AddEditTrainers />} />
            <Route path="/academy/TrainersManagment/edit/:id" element={<AddEditTrainers />} />
            <Route path="/academy/TrainersManagment" element={<Trainers />} />
            <Route path="/academy/Blogs/add" element={<AddEditBlog />} />
            <Route path="/academy/Blogs/edit/:id" element={<AddEditBlog />} />
            <Route path="/academy/ReportsAndStatistics" element={<ReportsAndStatistics />} />
            <Route path="/academy/Wallet" element={<AcademeyWallet />} />
            <Route path="/academy/sales" element={<AcademySales />} />
            <Route path="/academy/TrainingCourses" element={<AcadmeyTrainingCourses />} />
            <Route path="/academy/SingleCourse" element={<AcademySingleCourse />} />
            <Route path="/academy/Certficates" element={<AcademyCertficates />} />
            <Route path="/academy/AddNewCertficates" element={<AcademyAddNewCertficates />} />
            <Route path="/academy/Exams/*" element={<Exams />} />
            <Route path="/academy/SingleExam/*" element={<SingleEaxam academy />} />
            <Route
              path="/academy/DigitalProducts/SingleProduct/*"
              element={<SingleProduct academy />}
            />
            <Route path="/academy/Video" element={<AcademyVideos academy />} />
            <Route path="/academy/SingleVideo/*" element={<SingleVideo academy />} />
            <Route path="/academy/AddNewVideo" element={<AddNewVideo academy />} />
            <Route path="/academy/Categories" element={<Categories academy />} />
            <Route path="/academy/AddNewCate" element={<AddNewCate academy />} />
            <Route path="/academy/StudentInfo" element={<StudentInfo academy />} />
            <Route path="/academy/Coupons" element={<Coupons />} />
            <Route path="/academy/Coupons/add" element={<AddCoupon />} />
            <Route path="/academy/addNewStudent" element={<AddNewStudnet academy />} />
            <Route path="/academy/StudentBagExams" element={<StudentBagExams academy />} />
            <Route
              path="/academy/StudentBagCertifcate"
              element={<StudentBagCertifcate academy />}
            />
            <Route path="/academy/Comments" element={<Comments academy />} />
            <Route path="/academy/AffiliateMarketing/*" element={<AffiliateMarketing academy />} />
            <Route path="/academy/AddJoinFrom/*" element={<AddJoinFrom academy />} />
            <Route
              path="/academy/FinancialTransactions/*"
              element={<FinancialTransactions academy />}
            />
            <Route path="/academy/SubscreptionPacks/*" element={<SubscreptionPacks academy />} />
            <Route
              path="/academy/AddNewSubscreptionPacks/*"
              element={<AddNewSubscreptionPacksAcademy academy />}
            />
          </Routes>
        </IsAcademyAuthGaurd>
      </LayOut>
    </Fragment>
  );
};

export default AcademyRoutes;

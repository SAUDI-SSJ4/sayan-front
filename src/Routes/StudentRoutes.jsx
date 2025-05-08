import Dashboard from "../pages/dashboard/dashbaord";
import Users from "../pages/userDatabase/Users";
import Profile from "../pages/Profile/Profile";
import StudentRate from "../pages/studentBag/rates";
import Subscription from "../pages/studentBag/subscibtion";
import Cart from "../pages/studentBag/cart";
import AddNewUser from "../pages/userDatabase/AddNewUser/AddNewUser";
import RolesAndPermession from "../pages/rolesAndPermession/rolesAndPermession";
import AddNewRole from "../pages/addNewRole/addNewRole";
import JoiningForms from "../pages/JoiningForms/JoiningForms";
import ShoJoinForm from "../pages/JoiningForms/ShoJoinForm/ShoJoinForm";
import FinancialTransactions from "../pages/FinancialTransactions/FinancialTransactions";
import AffiliateMarketing from "../pages/AffiliateMarketing/AffiliateMarketing";
import AffiliateMarketingSetting from "../pages/AffiliateMarketing/AffiliateMarketingSetting/AffiliateMarketingSetting";
import AcadmicMarketing from "../pages/AffiliateMarketing/AcadmicMarketing/AcadmicMarketing";
import Sales from "../pages/sales/sales";
import TrainingCourses from "../pages/TrainingCourses/TrainingCourses";
import Sessions from "../pages/Student/Sessions/Sessions";
import DigitalProducts from "../pages/DigitalProducts/DigitalProducts";
import SingleProduct from "../pages/DigitalProducts/SingleProduct/SingleProduct";
import ProductPackages from "../pages/ProductPackages/ProductPackages";
import ProductPackagesSingleProduct from "../pages/ProductPackages/SingleProduct/SingleProduct";
import Blogs from "../pages/blogs/blog";
import AddNewBlog from "../pages/blogs/AddNewBlog";
import Videos from "../pages/Video/Video";
import AddNewVideo from "../pages/Video/AddNewVideo";
import SingleVideo from "../pages/Video/SingleVideo";
import Categories from "../pages/categories/categories";
import AddNewCate from "../pages/categories/AddNewCate";
import NotifcationSend from "../pages/NotifcationSend/NotifcationSend";
import AddNewNotfication from "../pages/NotifcationSend/AddNewNotfication";
import SubscreptionPacks from "../pages/SubscreptionPacks/SubscreptionPacks";
import AddNewSubscreptionPacks from "../pages/SubscreptionPacks/AddNewSubscreptionPacks";
import SubscreptionInfoPage from "../pages/SubscreptionPacks/subscreptionInfo";

// import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
// import EditPrivacy from "../pages/PrivacyPolicy/EditPrivacy";



import Terms from "../pages/Terms/Terms";
import EditTerms from "../pages/Terms/EditTerms";
import ReportsAndStatistics from "../pages/ReportsAndStatistics/ReportsAndStatistics";
import Subscreptions from "../pages/Subscreptions/Subscreptions";
import Comments from "../pages/Comments/Comments";
import Purchases from "../pages/purchases/purchases";
import Wallet from "../pages/Wallet/Wallet";
import Exams from "../pages/Exams/Exams";
import SingleEaxam from "../pages/Exams/SingleEaxam";
import SingleCourse from "../pages/TrainingCourses/SingleCourse";
import Certficates from "../pages/Certficates/Certficates";
import AddNewCertficates from "../pages/Certficates/AddNewCertficates";
import SingleCertificate from "../pages/Certficates/SingleCertificate";
import SingleSale from "../pages/sales/SingleSale";
import AddNewSale from "../pages/sales/AddNewSale";
import Login from "../pages/login/login";
import { Navigate, Route, Routes } from "react-router-dom";
import StudentDashboard from "../pages/Student/dashboard/dashbaord";
import StudentTrainingCourses from "../pages/Student/TrainingCourses/TrainingCourses";
import NewSessionRequest from "../pages/Student/Sessions/NewSessionRequest";
import ExamContainer from "../pages/Student/exmas/ExamContainer";
import StudentCertficates from "../pages/Student/Certficates/Certficates";
import Pruchases from "../pages/Student/purchases/purhcases";
import ShoppingCart from "../pages/Student/ShoppingCart/ShoppingCart";
import Marketing from "../pages/Student/Markting/marketing";
import Transactions from "../pages/Student/Markting/transactions";
import StudentWallet from "../pages/Student/Wallet/Wallet";
import Favorate from "../pages/Student/Favorate/favorate";
import Rates from "../pages/Student/Rates/Rates";
import LayOut from "../pages/layout/layout";
import StudentProducts from "../pages/Student/StudentProducts/StudentProducts";
import CourseDetails from "../pages/TrainingCourses/CourseDetails";
import CourseExam from "../pages/TrainingCourses/Exam";
import StudentSignIn from "../pages/studentSignIn/signin";
import Checkout from "../pages/Student/Checkout/Checkout";
import PaymentSuccess from "../pages/Student/Checkout/PaymentSuccess";

const StudentRoute = () => {


  // const loginType = Cookies.get("login_type");

  // const AuthGaurd = ({ children }) => {
  //   if (loginType === "student") {
  //     return children;
  //   } else {
  //     toast.error("يرجى تسجيل الدخول");
  //     return <Navigate to="/" />;
  //   }
  // };


  return (
    <>
      <LayOut>
        <Routes>
          <Route path="student/dashboard" element={<StudentDashboard />} />
          <Route path="student/home/*" element={<Dashboard />} />
          <Route path="student/login" element={<Login />} />
          <Route path="student/signin" element={<StudentSignIn />} />
          <Route path="student/users/*" element={<Users />} />
          <Route path="student/profile" element={<Profile />} />
          <Route path="student/StudentRate" element={<StudentRate />} />
          <Route path="student/Subscription/*" element={<Subscription />} />
          <Route path="student/Cart/*" element={<Cart />} />
          <Route path="student/users/addNewUser" element={<AddNewUser />} />
          <Route path="student/RolesAndPermession" element={<RolesAndPermession />} />
          <Route path="student/AddNewRole" element={<AddNewRole />} />
          <Route path="student/JoiningForms" element={<JoiningForms />} />
          <Route path="student/ShowJoinForm" element={<ShoJoinForm />} />
          <Route path="student/FinancialTransactions" element={<FinancialTransactions />} />
          <Route path="student/AffiliateMarketing/*" element={<AffiliateMarketing />} />
          <Route path="student/AffiliateMarketingSetting" element={<AffiliateMarketingSetting />} />
          <Route path="student/AcadmicMarketing/*" element={<AcadmicMarketing />} />

          <Route path="student/Sales/*" element={<Sales />} />
          <Route path="student/TrainingCourses/*" element={<StudentTrainingCourses />} />
          <Route path="student/Sessions/*" element={<Sessions />} />
          <Route path="student/Products/*" element={<StudentProducts />} />
          <Route path="student/RequestSession/*" element={<NewSessionRequest />} />

          <Route path="student/DigitalProducts" element={<DigitalProducts />} />

          <Route path="student/DigitalProducts/SingleProduct/*" element={<SingleProduct />} />
          <Route path="/ProductPackages" element={<ProductPackages />} />
          <Route path="student/ProductPackages/SingleProduct/*" element={<ProductPackagesSingleProduct />} />
          <Route path="student/Blogs/*" element={<Blogs />} />
          <Route path="student/AddNewBlog" element={<AddNewBlog />} />
          <Route path="student/Video" element={<Videos />} />
          <Route path="student/AddNewVideo" element={<AddNewVideo />} />
          <Route path="student/SingleVideo/*" element={<SingleVideo />} />
          <Route path="student/Categories/*" element={<Categories />} />
          <Route path="student/AddNewCate/*" element={<AddNewCate />} />

          <Route path="student/NotifcationSend/*" element={<NotifcationSend />} />
          <Route path="student/AddNewNotfication/*" element={<AddNewNotfication />} />
          <Route path="student/SubscreptionPacks/*" element={<SubscreptionPacks />} />
          <Route path="student/AddNewSubscreptionPacks/*" element={<AddNewSubscreptionPacks />} />

          <Route path="student/singleSub/*" element={<SubscreptionInfoPage />} />

          {/* <Route path="student/PrivacyPolicy/*" element={<PrivacyPolicy />} /> */}
          {/* <Route path="student/EditPrivacy/*" element={<EditPrivacy />} /> */}



          <Route path="student/Terms/*" element={<Terms />} />
          <Route path="student/EditTerms/*" element={<EditTerms />} />
          <Route path="student/ReportsAndStatistics/*" element={<ReportsAndStatistics />} />
          <Route path="student/Subscreptions/*" element={<Subscreptions />} />
          <Route path="student/Comments/*" element={<Comments />} />
          <Route path="student/Purchases/*" element={<Purchases />} />
          <Route path="student/Wallet/*" element={<StudentWallet />} />
          <Route path="student/Exams/*" element={<ExamContainer />} />
          <Route path="student/SingleExam/*" element={<SingleEaxam />} />
          <Route path="student/SingleCourse/*" element={<SingleCourse />} />
          <Route path="student/courseDetails/:id*" element={<CourseDetails />} />
          <Route path="student/courseExam/*" element={<CourseExam />} />

          <Route path="student/Certficates/*" element={<StudentCertficates />} />
          <Route path="student/AddNewCertficates/*" element={<AddNewCertficates />} />
          <Route path="student/SingleCertificate/*" element={<SingleCertificate />} />
          <Route path="student/SingleSale/*" element={<SingleSale />} />
          <Route path="student/AddNewSale/*" element={<AddNewSale />} />
          <Route path="student/pruchases/*" element={<Pruchases />} />
          <Route path="student/ShoppingCart/*" element={<ShoppingCart />} />
          <Route path="student/checkout" element={<Checkout />} />
          <Route path="student/payment-success" element={<PaymentSuccess />} />
          <Route path="student/Marketing/*" element={<Marketing />} />
          <Route path="student/Transactions/*" element={<Transactions />} />
          <Route path="student/Favorate/*" element={<Favorate />} />
          <Route path="student/Rates/*" element={<Rates />} />
        </Routes>
      </LayOut>
    </>
  );
};

export default StudentRoute;

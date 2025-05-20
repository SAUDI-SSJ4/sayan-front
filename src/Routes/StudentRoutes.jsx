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
import Cookies from "js-cookie";
import { useAuth } from "../utils/hooks/useAuth";
import { MainSpinner } from "../component/UI/MainSpinner";
import { showErrorToast } from "../utils/toast";
import NotFound from "../component/NotFound/NotFound";

const StudentRoute = () => {
  const loginType = Cookies.get("login_type");
  
  // مكون حماية لصفحات الطلاب
  const StudentAuthGuard = ({ children }) => {
    // التحقق من نوع تسجيل الدخول
    if (loginType === "student") {
      return children;
    } else {
      // إذا لم يكن مسجل دخول كطالب، يتم توجيهه إلى صفحة تسجيل الدخول
      showErrorToast("يرجى تسجيل الدخول كطالب للوصول إلى هذه الصفحة");
      return <Navigate to="/login" />;
    }
  };
  
  // صفحات لا تحتاج إلى تسجيل دخول
  const publicRoutes = ["login", "signin"];
  
  // دالة للتحقق ما إذا كانت الصفحة عامة أم لا
  const isPublicRoute = (path) => {
    return publicRoutes.some(route => path.includes(route));
  };

  // دالة مساعدة لتطبيق الحماية على المسارات
  const renderRoute = (path, element) => {
    // التحقق ما إذا كان المسار عام أم محمي
    if (isPublicRoute(path)) {
      return <Route path={path} element={element} />;
    } else {
      // تطبيق الحماية على المسارات المحمية
      return <Route path={path} element={<StudentAuthGuard>{element}</StudentAuthGuard>} />;
    }
  };

  return (
    <>
      <LayOut>
        <Routes>
          {/* صفحات تسجيل الدخول والتسجيل (عامة) */}
          <Route path="login" element={<Login />} />
          <Route path="student/signin" element={<StudentSignIn />} />
          
          {/* صفحات محمية تتطلب تسجيل دخول */}
          {renderRoute("student/dashboard", <StudentDashboard />)}
          {renderRoute("student/home/*", <Dashboard />)}
          {renderRoute("student/users/*", <Users />)}
          {renderRoute("student/profile", <Profile />)}
          {renderRoute("student/StudentRate", <StudentRate />)}
          {renderRoute("student/Subscription/*", <Subscription />)}
          {renderRoute("student/Cart/*", <Cart />)}
          {renderRoute("student/users/addNewUser", <AddNewUser />)}
          {renderRoute("student/RolesAndPermession", <RolesAndPermession />)}
          {renderRoute("student/AddNewRole", <AddNewRole />)}
          {renderRoute("student/JoiningForms", <JoiningForms />)}
          {renderRoute("student/ShowJoinForm", <ShoJoinForm />)}
          {renderRoute("student/FinancialTransactions", <FinancialTransactions />)}
          {renderRoute("student/AffiliateMarketing/*", <AffiliateMarketing />)}
          {renderRoute("student/AffiliateMarketingSetting", <AffiliateMarketingSetting />)}
          {renderRoute("student/AcadmicMarketing/*", <AcadmicMarketing />)}
          {renderRoute("student/Sales/*", <Sales />)}
          {renderRoute("student/TrainingCourses/*", <StudentTrainingCourses />)}
          {renderRoute("student/Sessions/*", <Sessions />)}
          {renderRoute("student/Products/*", <StudentProducts />)}
          {renderRoute("student/RequestSession/*", <NewSessionRequest />)}
          {renderRoute("student/DigitalProducts", <DigitalProducts />)}
          {renderRoute("student/DigitalProducts/SingleProduct/*", <SingleProduct />)}
          {renderRoute("/ProductPackages", <ProductPackages />)}
          {renderRoute("student/ProductPackages/SingleProduct/*", <ProductPackagesSingleProduct />)}
          {renderRoute("student/Blogs/*", <Blogs />)}
          {renderRoute("student/AddNewBlog", <AddNewBlog />)}
          {renderRoute("student/Video", <Videos />)}
          {renderRoute("student/AddNewVideo", <AddNewVideo />)}
          {renderRoute("student/SingleVideo/*", <SingleVideo />)}
          {renderRoute("student/Categories/*", <Categories />)}
          {renderRoute("student/AddNewCate/*", <AddNewCate />)}
          {renderRoute("student/NotifcationSend/*", <NotifcationSend />)}
          {renderRoute("student/AddNewNotfication/*", <AddNewNotfication />)}
          {renderRoute("student/SubscreptionPacks/*", <SubscreptionPacks />)}
          {renderRoute("student/AddNewSubscreptionPacks/*", <AddNewSubscreptionPacks />)}
          {renderRoute("student/singleSub/*", <SubscreptionInfoPage />)}
          {renderRoute("student/Terms/*", <Terms />)}
          {renderRoute("student/EditTerms/*", <EditTerms />)}
          {renderRoute("student/ReportsAndStatistics/*", <ReportsAndStatistics />)}
          {renderRoute("student/Subscreptions/*", <Subscreptions />)}
          {renderRoute("student/Comments/*", <Comments />)}
          {renderRoute("student/Purchases/*", <Purchases />)}
          {renderRoute("student/Wallet/*", <StudentWallet />)}
          {renderRoute("student/Exams/*", <ExamContainer />)}
          {renderRoute("student/SingleExam/*", <SingleEaxam />)}
          {renderRoute("student/SingleCourse/*", <SingleCourse />)}
          {renderRoute("student/courseDetails/:id*", <CourseDetails />)}
          {renderRoute("student/courseExam/*", <CourseExam />)}
          {renderRoute("student/Certficates/*", <StudentCertficates />)}
          {renderRoute("student/AddNewCertficates/*", <AddNewCertficates />)}
          {renderRoute("student/SingleCertificate/*", <SingleCertificate />)}
          {renderRoute("student/SingleSale/*", <SingleSale />)}
          {renderRoute("student/AddNewSale/*", <AddNewSale />)}
          {renderRoute("student/pruchases/*", <Pruchases />)}
          {renderRoute("student/ShoppingCart/*", <ShoppingCart />)}
          {renderRoute("student/checkout", <Checkout />)}
          {renderRoute("student/payment-success", <PaymentSuccess />)}
          {renderRoute("student/Marketing/*", <Marketing />)}
          {renderRoute("student/Transactions/*", <Transactions />)}
          {renderRoute("student/Favorate/*", <Favorate />)}
          {renderRoute("student/Rates/*", <Rates />)}
          {/* مسار للصفحات غير الموجودة */}
          <Route path="student/*" element={<NotFound />} />
        </Routes>
      </LayOut>
    </>
  );
};

export default StudentRoute;

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
import Sessions from "../pages/Sessions/Sessions";
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
import LayOut from "../pages/layout/layout";
import LoginAdmin from "../pages/LoginAdmin/LoginAdmin";
import Cookies from "js-cookie";
import { showErrorToast } from "../utils/toast";
import NotFound from "../component/NotFound/NotFound";

const AdminRoute = () => {
  const loginType = Cookies.get("login_type");
  
  // مكون حماية لصفحات الإدارة
  const AdminAuthGuard = ({ children }) => {
    // التحقق من نوع تسجيل الدخول
    if (loginType === "admin") {
      return children;
    } else {
      // إذا لم يكن مسجل دخول كمدير، يتم توجيهه إلى صفحة تسجيل الدخول
      showErrorToast("يرجى تسجيل الدخول كمدير للوصول إلى هذه الصفحة");
      return <Navigate to="/login" />;
    }
  };
  
  // صفحات لا تحتاج إلى تسجيل دخول
  const publicRoutes = ["login"];
  
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
      return <Route path={path} element={<AdminAuthGuard>{element}</AdminAuthGuard>} />;
    }
  };

  return (
    <LayOut>
      <Routes>
        {/* صفحة تسجيل الدخول (عامة) */}
        <Route path="admin/login" element={<LoginAdmin />} />
        
        {/* صفحات محمية تتطلب تسجيل دخول */}
        {renderRoute("admin", <Dashboard />)}
        {renderRoute("admin/users/*", <Users />)}
        {renderRoute("admin/profile", <Profile />)}
        {renderRoute("admin/StudentRate", <StudentRate />)}
        {renderRoute("admin/Subscription/*", <Subscription />)}
        {renderRoute("admin/Cart/*", <Cart />)}
        {renderRoute("admin/users/addNewUser", <AddNewUser />)}
        {renderRoute("admin/RolesAndPermession", <RolesAndPermession />)}
        {renderRoute("admin/AddNewRole", <AddNewRole />)}
        {renderRoute("admin/JoiningForms", <JoiningForms />)}
        {renderRoute("admin/ShowJoinForm", <ShoJoinForm />)}
        {renderRoute("admin/FinancialTransactions", <FinancialTransactions />)}
        {renderRoute("admin/AffiliateMarketing/*", <AffiliateMarketing />)}
        {renderRoute("admin/AffiliateMarketingSetting", <AffiliateMarketingSetting />)}
        {renderRoute("admin/AcadmicMarketing/*", <AcadmicMarketing />)}
        {renderRoute("admin/Sales/*", <Sales />)}
        {renderRoute("admin/TrainingCourses/*", <TrainingCourses />)}
        {renderRoute("admin/Sessions/*", <Sessions />)}
        {renderRoute("admin/DigitalProducts", <DigitalProducts />)}
        {renderRoute("admin/DigitalProducts/SingleProduct/*", <SingleProduct />)}
        {renderRoute("admin/ProductPackages", <ProductPackages />)}
        {renderRoute("admin/ProductPackages/SingleProduct/*", <ProductPackagesSingleProduct />)}
        {renderRoute("admin/Blogs/*", <Blogs />)}
        {renderRoute("admin/AddNewBlog", <AddNewBlog />)}
        {renderRoute("admin/Video", <Videos />)}
        {renderRoute("admin/AddNewVideo", <AddNewVideo />)}
        {renderRoute("admin/SingleVideo/*", <SingleVideo />)}
        {renderRoute("admin/Categories/*", <Categories />)}
        {renderRoute("admin/AddNewCate/*", <AddNewCate />)}
        {renderRoute("admin/NotifcationSend/*", <NotifcationSend />)}
        {renderRoute("admin/AddNewNotfication/*", <AddNewNotfication />)}
        {renderRoute("admin/SubscreptionPacks/*", <SubscreptionPacks />)}
        {renderRoute("admin/AddNewSubscreptionPacks/*", <AddNewSubscreptionPacks />)}
        {renderRoute("admin/singleSub/*", <SubscreptionInfoPage />)}
        {renderRoute("admin/Terms/*", <Terms />)}
        {renderRoute("admin/EditTerms/*", <EditTerms />)}
        {renderRoute("admin/ReportsAndStatistics/*", <ReportsAndStatistics />)}
        {renderRoute("admin/Subscreptions/*", <Subscreptions />)}
        {renderRoute("admin/Comments/*", <Comments />)}
        {renderRoute("admin/Purchases/*", <Purchases />)}
        {renderRoute("admin/Wallet/*", <Wallet />)}
        {renderRoute("admin/Exams/*", <Exams />)}
        {renderRoute("admin/SingleExam/*", <SingleEaxam />)}
        {renderRoute("admin/SingleCourse/*", <SingleCourse />)}
        {renderRoute("admin/Certficates/*", <Certficates />)}
        {renderRoute("admin/AddNewCertficates/*", <AddNewCertficates />)}
        {renderRoute("admin/SingleCertificate/*", <SingleCertificate />)}
        {renderRoute("admin/SingleSale/*", <SingleSale />)}
          {renderRoute("admin/AddNewSale/*", <AddNewSale />)}
          
          {/* مسار للصفحات غير الموجودة */}
          <Route path="admin/*" element={<NotFound />} />
      </Routes>
    </LayOut>
  );
};

export default AdminRoute;

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
import { Route, Routes } from "react-router-dom";
import LayOut from "../pages/layout/layout";
import LoginAdmin from "../pages/LoginAdmin/LoginAdmin";

const AdminRoute = () => {
  return (
    <LayOut>
      <Routes>
        <Route path="admin" element={<Dashboard />} />
        <Route path="admin/login" element={<LoginAdmin />} />
        <Route path="admin/users/*" element={<Users />} />
        <Route path="admin/profile" element={<Profile />} />
        <Route path="admin/StudentRate" element={<StudentRate />} />
        <Route path="admin/Subscription/*" element={<Subscription />} />
        <Route path="admin/Cart/*" element={<Cart />} />
        <Route path="admin/users/addNewUser" element={<AddNewUser />} />
        <Route path="admin/RolesAndPermession" element={<RolesAndPermession />} />
        <Route path="admin/AddNewRole" element={<AddNewRole />} />
        <Route path="admin/JoiningForms" element={<JoiningForms />} />
        <Route path="admin/ShowJoinForm" element={<ShoJoinForm />} />
        <Route path="admin/FinancialTransactions" element={<FinancialTransactions />} />
        <Route path="admin/AffiliateMarketing/*" element={<AffiliateMarketing />} />
        <Route path="admin/AffiliateMarketingSetting" element={<AffiliateMarketingSetting />} />
        <Route path="admin/AcadmicMarketing/*" element={<AcadmicMarketing />} />
        <Route path="admin/Sales/*" element={<Sales />} />
        <Route path="admin/TrainingCourses/*" element={<TrainingCourses />} />
        <Route path="admin/Sessions/*" element={<Sessions />} />
        <Route path="admin/DigitalProducts" element={<DigitalProducts />} />
        <Route path="admin/DigitalProducts/SingleProduct/*" element={<SingleProduct />} />
        <Route path="admin/ProductPackages" element={<ProductPackages />} />
        <Route path="admin/ProductPackages/SingleProduct/*" element={<ProductPackagesSingleProduct />}/>
        <Route path="admin/Blogs/*" element={<Blogs />} />
        <Route path="admin/AddNewBlog" element={<AddNewBlog />} />
        <Route path="admin/Video" element={<Videos />} />
        <Route path="admin/AddNewVideo" element={<AddNewVideo />} />
        <Route path="admin/SingleVideo/*" element={<SingleVideo />} />
        <Route path="admin/Categories/*" element={<Categories />} />
        <Route path="admin/AddNewCate/*" element={<AddNewCate />} />
        <Route path="admin/NotifcationSend/*" element={<NotifcationSend />} />
        <Route path="admin/AddNewNotfication/*" element={<AddNewNotfication />} />
        <Route path="admin/SubscreptionPacks/*" element={<SubscreptionPacks />} />
        <Route path="admin/AddNewSubscreptionPacks/*" element={<AddNewSubscreptionPacks />} />
        <Route path="admin/singleSub/*" element={<SubscreptionInfoPage />} />
        <Route path="admin/Terms/*" element={<Terms />} />
        <Route path="admin/EditTerms/*" element={<EditTerms />} />
        <Route path="admin/ReportsAndStatistics/*" element={<ReportsAndStatistics />} />
        <Route path="admin/Subscreptions/*" element={<Subscreptions />} />
        <Route path="admin/Comments/*" element={<Comments />} />
        <Route path="admin/Purchases/*" element={<Purchases />} />
        <Route path="admin/Wallet/*" element={<Wallet />} />
        <Route path="admin/Exams/*" element={<Exams />} />
        <Route path="admin/SingleExam/*" element={<SingleEaxam />} />
        <Route path="admin/SingleCourse/*" element={<SingleCourse />} />
        <Route path="admin/Certficates/*" element={<Certficates />} />
        <Route path="admin/AddNewCertficates/*" element={<AddNewCertficates />} />
        <Route path="admin/SingleCertificate/*" element={<SingleCertificate />} />
        <Route path="admin/SingleSale/*" element={<SingleSale />} />
        <Route path="admin/AddNewSale/*" element={<AddNewSale />} />
      </Routes>
    </LayOut>
  );
};

export default AdminRoute;

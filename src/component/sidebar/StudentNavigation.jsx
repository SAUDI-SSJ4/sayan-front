import HomeIcon from "@mui/icons-material/Home";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Collection from "./Collection/collection";
import { useLocation } from "react-router-dom";
import { HiMiniBriefcase } from "react-icons/hi2";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/Wallet";
import ArticleIcon from "@mui/icons-material/Article";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import classes from "./sidebar.module.scss";
import { STUDENT_BAG_NAVIGATOR_ONE, STUDENT_BAG_NAVIGATOR_TWO } from "../../utils/constant";
import { SingleLinkOnMenu } from "../UI/Links/SingleLinkOnMenu";
import { SubLinkOnMenu } from "../UI/Links/SubLinkOnMenu";
import { useCart } from "../../context/CartContext";
import { Badge } from "flowbite-react";

const StudentNavigation = ({ setShow, mobile }) => {
  const location = useLocation();
  const { cartItems } = useCart();

  return (
    <>
      <SingleLinkOnMenu path="/student/dashboard">
        <div className={classes.mainIcon}>
          <div>
            <HomeIcon sx={{ width: "35px", height: "35px" }} />
            <span className="title-dash-link">لوحة التحكم</span>
          </div>
        </div>
      </SingleLinkOnMenu>

      <SingleLinkOnMenu path="/student/profile">
        <div className={classes.mainIcon}>
          <div>
            <PersonIcon sx={{ width: "35px", height: "35px" }} />
            <span className="title-dash-link">الملف الشخصي </span>
          </div>
        </div>
      </SingleLinkOnMenu>

      <Collection
        mainIcon={
          <HiMiniBriefcase
            className="d-flex align-items-center justify-content-center"
            style={{ width: "30px", height: "30px" }}
          />
        }
        mainTitle={"حقيبة الطلاب"}
        acitve={STUDENT_BAG_NAVIGATOR_ONE.find((path) => location.pathname === path)}
      >
        <SubLinkOnMenu path="student/TrainingCourses">
          <div className={classes.subIcon} onClick={(e) => (mobile ? setShow(false) : null)}>
            <div>
              <FiberManualRecordIcon sx={{ color: "#7E8799", width: "10px", height: "10px" }} />
            </div>
            <span className="title-dash-link">المواد التعليمية</span>
          </div>
        </SubLinkOnMenu>

        <SubLinkOnMenu path="student/Products/">
          <div className={classes.subIcon} onClick={(e) => (mobile ? setShow(false) : null)}>
            <div>
              <FiberManualRecordIcon sx={{ color: "#7E8799", width: "10px", height: "10px" }} />
            </div>
            <span className="title-dash-link">المنتجات الرقمية</span>
          </div>
        </SubLinkOnMenu>

        <div path="student/Certficates">
          <div className={classes.subIcon} onClick={(e) => (mobile ? setShow(false) : null)}>
            <div>
              <FiberManualRecordIcon sx={{ color: "#7E8799", width: "10px", height: "10px" }} />
            </div>
            <span className="title-dash-link">الشهادات</span>
            <Badge color="failure">قريباً</Badge>
          </div>
        </div>

        <SubLinkOnMenu path="student/Favorate">
          <div className={classes.subIcon} onClick={(e) => (mobile ? setShow(false) : null)}>
            <div>
              <FiberManualRecordIcon sx={{ color: "#7E8799", width: "10px", height: "10px" }} />
            </div>
            <span className="title-dash-link">قائمة المفضلة </span>
          </div>
        </SubLinkOnMenu>
      </Collection>

      <SingleLinkOnMenu path="/student/pruchases">
        <div className={classes.mainIcon}>
          <div>
            <ArticleIcon sx={{ width: "35px", height: "35px" }} />
            <span className="title-dash-link">المشتريات </span>
          </div>
        </div>
      </SingleLinkOnMenu>

      <SingleLinkOnMenu path="/student/ShoppingCart">
        <div className={classes.mainIcon}>
          <div className={classes.cartIcon}>
            <ShoppingCartIcon sx={{ width: "35px", height: "35px" }} />
            {cartItems.length > 0 && (
              <span className={classes.badge}>{cartItems.length}</span>
            )}
            <span className="title-dash-link">عربة التسوق</span>
          </div>
        </div>
      </SingleLinkOnMenu>

      <Collection
        mainIcon={<StoreIcon sx={{ width: "30px", height: "30px" }} />}
        mainTitle={"التسويق"}
        acitve={STUDENT_BAG_NAVIGATOR_TWO.find((path) => location.pathname === path)}
      >
        <div path="/student/Marketing">
          <div className={classes.subIcon} onClick={(e) => (mobile ? setShow(false) : null)}>
            <div>
              <FiberManualRecordIcon sx={{ color: "#7E8799", width: "10px", height: "10px" }} />
            </div>
            <span className="title-dash-link">التسويق بالعمولة </span>
            <Badge color="failure">قريباً</Badge>
          </div>
        </div>
      </Collection>

      {/* قسم المحفظة معطل مؤقتاً */}
      {/* <Collection
        mainIcon={<WalletIcon sx={{ width: "30px", height: "30px" }} />}
        mainTitle={"المحفظة"}
        acitve={STUDENT_BAG_NAVIGATOR_TWO.find((path) => location.pathname === path)}
      >
        <div path="/student/Wallet">
          <div className={classes.subIcon} onClick={(e) => (mobile ? setShow(false) : null)}>
            <div>
              <FiberManualRecordIcon sx={{ color: "#7E8799", width: "10px", height: "10px" }} />
            </div>
            <span className="title-dash-link"> عرض المحفظة </span>
          </div>
        </div>
        <div path="/student/Transactions">
          <div className={classes.subIcon} onClick={(e) => (mobile ? setShow(false) : null)}>
            <div>
              <FiberManualRecordIcon sx={{ color: "#7E8799", width: "10px", height: "10px" }} />
            </div>
            <span className="title-dash-link">المعاملات المالية </span>
          </div>
        </div>
      </Collection> */}

    </>
  );
};

export default StudentNavigation;

import HomeIcon from "@mui/icons-material/Home";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Collection from "./Collection/collection";
import {  useLocation } from "react-router-dom";
import { HiMiniBriefcase } from "react-icons/hi2";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/Wallet";
import ArticleIcon from "@mui/icons-material/Article";
import classes from "./sidebar.module.scss";
import { STUDENT_BAG_NAVIGATOR_ONE, STUDENT_BAG_NAVIGATOR_TWO } from "../../utils/constant";
import { SingleLinkOnMenu } from "../UI/Links/SingleLinkOnMenu";
import { SubLinkOnMenu } from "../UI/Links/SubLinkOnMenu";

import { FaCartShopping } from "react-icons/fa6";
const StudentNavigation = ({ setShow, mobile }) => {
  const location = useLocation();

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
            <span className="title-dash-link">الدورات التدريبية</span>
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

        <SubLinkOnMenu path="student/Certficates">
          <div className={classes.subIcon} onClick={(e) => (mobile ? setShow(false) : null)}>
            <div>
              <FiberManualRecordIcon sx={{ color: "#7E8799", width: "10px", height: "10px" }} />
            </div>
            <span className="title-dash-link">الشهادات</span>
          </div>
        </SubLinkOnMenu>

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

      <Collection
        mainIcon={<FaCartShopping size="30px" />}
        mainTitle={"التسويق"}
        acitve={STUDENT_BAG_NAVIGATOR_TWO.find((path) => location.pathname === path)}
      >
        <SubLinkOnMenu path="/student/Marketing">
          <div className={classes.subIcon} onClick={(e) => (mobile ? setShow(false) : null)}>
            <div>
              <FiberManualRecordIcon sx={{ color: "#7E8799", width: "10px", height: "10px" }} />
            </div>
            <span className="title-dash-link">التسويق بالعمولة </span>
          </div>
        </SubLinkOnMenu>

        <SubLinkOnMenu path="/student/Transactions">
          <div className={classes.subIcon} onClick={(e) => (mobile ? setShow(false) : null)}>
            <div>
              <FiberManualRecordIcon sx={{ color: "#7E8799", width: "10px", height: "10px" }} />
            </div>
            <span className="title-dash-link">المعاملات المالية </span>
          </div>
        </SubLinkOnMenu>
      </Collection>

      <SingleLinkOnMenu path="/student/Wallet">
        <div className={classes.mainIcon}>
          <div>
            <WalletIcon sx={{ width: "35px", height: "35px" }} />
            <span className="title-dash-link">المحفظة </span>
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

      {/* <NavLink to="/" className="text-decoration-none" onClick={() => useLogOut()}>
        <div className={`${classes.logout} ${classes.mainIcon}`}>
          <ExitToApp sx={{ width: "35px", height: "35px" }} />
          <span className="title-dash-link">تسجيل الخروج</span>
        </div>
      </NavLink> */}
    </>
  );
};

export default StudentNavigation;

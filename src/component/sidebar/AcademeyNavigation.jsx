import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Collection from "./Collection/collection";
import { NavLink, useLocation } from "react-router-dom";
import classes from "./sidebar.module.scss";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import HomeIcon from "../../assets/icons/home";
import OpenBookIcon from "../../assets/icons/OpenbookIcon";
import BagCustomIcon from "../../assets/icons/BagIcon";
import ShopCustomIcon from "../../assets/icons/ShopCustomIcon";
import WalletCustomIcon from "../../assets/icons/WalletCustomIcon";
import StaticsCustomIcon from "../../assets/icons/StaticsCustomIcon";
import AcademyIcon from "../../assets/icons/AcademyIcon";
import EmployeeMangment from "../../assets/icons/EmployeeMangement";
import ProductIcon from "../../assets/icons/ProductIcon";
import CouponIcon from "../../assets/icons/CouponIcon";
import { ButtonSoon } from "../../utils/styles";
import { Fragment, useMemo } from "react";

const AcademeyNavigation = ({ setShow, mobile }) => {
  const location = useLocation();

  const ballIcon = useMemo(
    () => (
      <FiberManualRecordIcon
        sx={{
          color: "#7E8799",
          width: "10px",
          height: "10px",
        }}
      />
    ),
    []
  );

  return (
    <Fragment>
      <NavLink
        end
        to="/academy"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <HomeIcon active={location.pathname === "/academy"} />
            <span className="title-dash-link">لوحة التحكم</span>
          </div>
        </div>
      </NavLink>
      <NavLink
        to="/academy/profile"
        end
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <AcademyIcon active={location.pathname === "/academy/profile"} />
            <span className="title-dash-link">الاكاديمية </span>
          </div>
        </div>
      </NavLink>
      <Collection
        mainIcon={
          <OpenBookIcon
            active={[
              "/academy/TrainingCourses",
              "/academy/Sessions",
              "/academy/DigitalProducts",
              "/academy/ProductPackages",
              "/academy/Exams",
              "/academy/dashboard/AddClient",
              "/academy/Video",
              "/academy/Categories",
              "/academy/SingleExam",
              "/academy/Certficates",
            ].find((path) => location.pathname === path || location.pathname.includes(path))}
          />
        }
        mainTitle={"ادارة المحتوى "}
        acitve={[
          "/academy/TrainingCourses",
          "/academy/Sessions",
          "/academy/DigitalProducts",
          "/academy/ProductPackages",
          "/academy/Exams",
          "/academy/dashboard/AddClient",
          "/academy/Video",
          "/academy/Categories",
          "/academy/SingleExam",
          "/academy/Certficates",
        ].find((path) => location.pathname === path || location.pathname.includes(path))}
      >
        <Collection
          mainIcon={
            <div
              className="d-flex justify-content-center"
              style={{ width: "35px", height: "35px" }}
            >
              {ballIcon}
            </div>
          }
          mainTitle={"المواد التعليمية  "}
          nested
        >
          <NavLink
            to="academy/TrainingCourses"
            className={({ isActive, isPending }) => {
              return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
            }}
          >
            <div
              className={classes.subIcon}
              onClick={(e) => {
                mobile ? setShow(false) : null;
              }}
            >
              <div>{ballIcon}</div>
              <span className="title-dash-link">الدورات التدريبية</span>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) => {
              return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
            }}
            to="academy/Certficates"
          >
            <div
              className={classes.subIcon}
              onClick={(e) => {
                mobile ? setShow(false) : null;
              }}
            >
              <div>{ballIcon}</div>
              <span>الشهادات</span>
            </div>
          </NavLink>
          {/* chage Link to div for time being   */}

          <div
            className={({ isActive, isPending }) => {
              return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
            }}
            to="academy/Exams"
          >
            <div
              className={classes.subIcon}
              onClick={(e) => {
                mobile ? setShow(false) : null;
              }}
            >
              <div>{ballIcon}</div>
              <span className="title-dash-link"> الاختبارات </span>
              <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
            </div>
          </div>
        </Collection>

        <div
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          // to="academy/Sessions"
        >
          {/* chage Link to div for time being   */}
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">الجلسات الحضورية </span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </div>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="academy/DigitalProducts"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">المنتجات الرقمية</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="academy/ProductPackages"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">حزم المنتجات</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="academy/Blogs"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">المدونات </span>
          </div>
        </NavLink>

        {/* chage Link to div for time being   */}
        <div
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="academy/Video"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">مكتبة الفيديو </span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </div>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="academy/Categories"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">التصنيفات </span>
          </div>
        </NavLink>
      </Collection>
      <Collection
        mainIcon={
          <BagCustomIcon
            active={[
              "/academy/StudentInfo",
              "/academy/Comments",
              "/academy/Exams",
              "/academy/Requests",
              "/academy/Cart",
              "/academy/StudentBagExams",
              "/academy/StudentBagCertifcate",
            ].find((path) => location.pathname === path)}
          />
        }
        mainTitle={"معلومات الطلاب"}
        acitve={[
          "/academy/StudentInfo",
          "/academy/Comments",
          "/academy/Exams",
          "/academy/Requests",
          "/academy/Cart",
          "/academy/StudentBagExams",
          "/academy/StudentBagCertifcate",
        ].find((path) => location.pathname === path)}
      >
        <NavLink
          to="academy/StudentInfo"
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">بيانات الطلاب</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="/academy/StudentBagExams"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">الاختبارات </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="/academy/StudentBagCertifcate"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">الشهادات </span>
          </div>
        </NavLink>
        {/* chage Link to div for time being   */}
        <div
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="academy/Comments"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">التعليقات </span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </div>
      </Collection>
      <Collection
        mainIcon={
          <BagCustomIcon
            active={[
              "/academy/settings/slider",
              "/academy/settings/about",
              "/academy/settings/faq",
              "/academy/settings/call-to-action",
              "/academy/settings/footer",
              "/academy/settings/partner",
              "/academy/settings/template",
            ].find((path) => location.pathname === path)}
          />
        }
        mainTitle={"التحكم فى الموقع"}
        acitve={[
          "/academy/settings/slider",
          "/academy/settings/about",
          "/academy/settings/faq",
          "/academy/settings/call-to-action",
          "/academy/settings/footer",
          "/academy/settings/partner",
          "/academy/settings/template",
        ].find((path) => location.pathname === path)}
      >
        <NavLink
          to="/academy/settings/slider"
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">القائمة الرئيسية</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="/academy/settings/about"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">من نحن</span>
          </div>
        </NavLink>

        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="/academy/settings/faq"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">الاسئلة الشائعة</span>
          </div>
        </NavLink>

        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="/academy/settings/call-to-action"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">ادارة الاعدادات</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="/academy/settings/footer"
        >
          <div
            className={classes.subIcon}
            // onClick={(e) => {
            //   mobile ? setShow(false) : null;
            // }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">الذيل</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="/academy/settings/partner"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">الشركاء</span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="/academy/settings/template"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">النموذج</span>
          </div>
        </NavLink>
      </Collection>
      <div
        to="academy/EmployeeMangment"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <EmployeeMangment
              active={["/academy/EmployeeMangment"].find((path) => location.pathname === path)}
            />
            <span className="title-dash-link">ادارة الموظفين </span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </div>
      </div>
      <NavLink
        to="academy/Products"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <ProductIcon
              active={["/academy/Products"].find((path) => location.pathname === path)}
            />
            <span className="title-dash-link">المنتجات</span>
          </div>
        </div>
      </NavLink>
      <div
        to="academy/Coupons"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <CouponIcon active={["/academy/Coupons"].find((path) => location.pathname === path)} />
            <span className="title-dash-link">الكوبونات</span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </div>
      </div>

      {/* <Collection
        mainIcon={
          <ShopCustomIcon
            active={[
              "/academy/JoiningForms",
              "/academy/FinancialTransactions",
              "/academy/AffiliateMarketing",
              "/academy/Sales",
            ].find((path) => location.pathname === path)}
          />
        }
        mainTitle={<span className="title-dash-link">التسويق</span>}
        acitve={[
          "/academy/SubscreptionPacks",
          "/academy/FinancialTransactions",
          "/academy/AffiliateMarketing",
          "/academy/Sales",
        ].find((path) => location.pathname === path)}
      >
        <div
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="academy/AffiliateMarketing"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">التسويق بالعمولة </span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </div>
        <div
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="academy/FinancialTransactions"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">المعاملات المالية</span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </div>
        <div
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="academy/Sales"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">العروض </span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </div>
        <div
          className={({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? `${classes.Link} LinkActive` : classes.Link;
          }}
          to="academy/SubscreptionPacks"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">باقات الاشتراك </span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </div>
      </Collection> */}

      <div
        to="academy/Coupons"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <CouponIcon active={["/academy/Coupons"].find((path) => location.pathname === path)} />
            <span className="title-dash-link">التسويق</span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </div>
      </div>

      <NavLink
        to="academy/Wallet"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <WalletCustomIcon
              active={["/academy/Wallet"].find((path) => location.pathname === path)}
            />
            <span className="title-dash-link">المحفظة </span>
          </div>
        </div>
      </NavLink>

      <NavLink
        to="academy/ReportsAndStatistics"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <StaticsCustomIcon
              active={["/academy/ReportsAndStatistics"].find((path) => location.pathname === path)}
            />
            <span className="title-dash-link">التقارير والاحصائيات </span>
            <ButtonSoon className={classes.btnSoon}>قريبا</ButtonSoon>
          </div>
        </div>
      </NavLink>
      <div className={`${classes.Bot} gap-3`}>
        <div className={classes.Icon}>
          <SmartToyIcon sx={{ fontSize: "35px", color: "white" }} />
        </div>
        <div className="main-info-sidebar-bottom">
          <h2 className="fs-6 fw-bold">
            مساعدك الذكي !
            <br />
            متصل الان
          </h2>
          <span className="fs-6 fw-medium  button-sidebar-bottom">
            تواصل
            <KeyboardBackspaceIcon />
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default AcademeyNavigation;

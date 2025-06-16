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
import { Badge } from "flowbite-react";
// icons
import { PencilRuler } from "lucide-react";

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
              "/academy/training-courses",
              "/academy/Sessions",
              "/academy/DigitalProducts",
              "/academy/ProductPackages",
              "/academy/Exams",
              "/academy/dashboard/AddClient",
              "/academy/Video",
              "/academy/Categories",
              "/academy/SingleExam",
              "/academy/Certficates",
            ].find(
              (path) =>
                location.pathname === path ||
                location.pathname.includes(path)
            )}
          />
        }
        mainTitle={"ادارة المحتوى "}
        acitve={[
          "/academy/training-courses",
          "/academy/Sessions",
          "/academy/DigitalProducts",
          "/academy/ProductPackages",
          "/academy/Exams",
          "/academy/dashboard/AddClient",
          "/academy/Video",
          "/academy/Categories",
          "/academy/SingleExam",
          "/academy/Certficates",
        ].find(
          (path) =>
            location.pathname === path || location.pathname.includes(path)
        )}
      >
       
          <NavLink
            to="/academy/training-courses"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? classes.activeSubLink
                : classes.Link
            }
          >
            <div
              className={classes.subIcon}
              onClick={() => {
                if (mobile) setShow(false);
              }}
            >
              <div>{ballIcon}</div>
              <span className="title-dash-link">الدورات التدريبية</span>
            </div>
          </NavLink>

        <div className={classes.Link}>
          <div
            className={classes.subIcon}
            onClick={() => {
              if (mobile) setShow(false);
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">الجلسات الحضورية </span>
            <Badge color="failure">قريباً</Badge>
          </div>
        </div>

        <div className={classes.Link}>
          <div
            className={classes.subIcon}
            onClick={() => {
              if (mobile) setShow(false);
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">المنتجات الرقمية</span>
            <Badge color="failure">قريباً</Badge>
          </div>
        </div>

        <div className={classes.Link}>
          <div
            className={classes.subIcon}
            onClick={() => {
              if (mobile) setShow(false);
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">حزم المنتجات</span>
            <Badge color="failure">قريباً</Badge>
          </div>
        </div>

        <div className={classes.Link}>
          <div
            className={classes.subIcon}
            onClick={() => {
              if (mobile) setShow(false);
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">المدونات </span>
            <Badge color="failure">قريباً</Badge>
          </div>
        </div>
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
        <div className={classes.Link}>
          <div className={classes.subIcon}>
            <div>{ballIcon}</div>
            <span className="title-dash-link">بيانات الطلاب</span>
            <Badge color="failure">قريباً</Badge>
          </div>
        </div>
        <div className={classes.Link}>
          <div className={classes.subIcon}>
            <div>{ballIcon}</div>
            <span className="title-dash-link">الاختبارات </span>
            <Badge color="failure">قريباً</Badge>
          </div>
        </div>
        <div className={classes.Link}>
          <div className={classes.subIcon}>
            <div>{ballIcon}</div>
            <span className="title-dash-link">الشهادات </span>
            <Badge color="failure">قريباً</Badge>
          </div>
        </div>
        <div className={classes.Link}>
          <div className={classes.subIcon}>
            <div>{ballIcon}</div>
            <span className="title-dash-link">التعليقات </span>
            <Badge color="failure">قريباً</Badge>
          </div>
        </div>
      </Collection>

      <Collection
        mainIcon={
          <PencilRuler
            strokeWidth={3}
            active={[
              "/academy/settings/slider",
              "/academy/settings/about",
              "/academy/settings/ratesOfStudents",
              "/academy/settings/faq",
              "/academy/settings/call-to-action",
              "/academy/settings/footer",
              "/academy/settings/partner",
              "/academy/settings/template",
            ].find((path) => location.pathname === path)}
          />
        }
        mainTitle={"تعديل واجهات الأكاديمية"}
        acitve={[
          "/academy/settings/main",
          "/academy/settings/slider",
          "/academy/settings/about",
          "/academy/settings/ratesOfStudents",
          "/academy/settings/faq",
          "/academy/settings/call-to-action",
          "/academy/settings/footer",
          "/academy/settings/partner",
          "/academy/settings/template",
        ].find((path) => location.pathname === path)}
      >
        <NavLink
          to="/academy/settings/main"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? classes.activeSubLink
              : classes.Link
          }
        >
          <div
            className={classes.subIcon}
            onClick={() => {
              if (mobile) setShow(false);
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">الاعدادات الرئيسية</span>
          </div>
        </NavLink>
        <NavLink
          to="/academy/settings/slider"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? classes.activeSubLink
              : classes.Link
          }
        >
          <div
            className={classes.subIcon}
            onClick={() => {
              if (mobile) setShow(false);
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">القائمة الرئيسية</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? classes.activeSubLink
              : classes.Link
          }
          to="/academy/settings/about"
        >
          <div
            className={classes.subIcon}
            onClick={() => {
              if (mobile) setShow(false);
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">من نحن</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? classes.activeSubLink
              : classes.Link
          }
          to="/academy/settings/ratesOfStudents"
        >
          <div
            className={classes.subIcon}
            onClick={() => {
              if (mobile) setShow(false);
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">تقييمات الطلاب</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? classes.activeSubLink
              : classes.Link
          }
          to="/academy/settings/faq"
        >
          <div
            className={classes.subIcon}
            onClick={() => {
              if (mobile) setShow(false);
            }}
          >
            <div>{ballIcon}</div>
            <span className="title-dash-link">الاسئلة الشائعة</span>
          </div>
        </NavLink>
      </Collection>
      <NavLink
        to="/academy/TrainersManagment"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <EmployeeMangment
              active={["/academy/TrainersManagment"].find(
                (path) => location.pathname === path
              )}
            />
            <span className="title-dash-link">ادارة المدربين </span>
          </div>
        </div>
      </NavLink>

      {/* قسم المنتجات والكوبونات معطل مؤقتاً */}
      {/* <div className={classes.mainIcon}>
        <div>
          <ProductIcon
            active={["/academy/Products"].find(
              (path) => location.pathname === path
            )}
          />
          <span className="title-dash-link">المنتجات</span>
          <Badge color="failure">قريباً</Badge>
        </div>
      </div>
      <div className={classes.mainIcon}>
        <div>
          <CouponIcon
            active={["/academy/Coupons"].find(
              (path) => location.pathname === path
            )}
          />
          <span className="title-dash-link">الكوبونات</span>
          <Badge color="failure">قريباً</Badge>
        </div>
      </div> */}

      <NavLink
        to="academy/Wallet"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <WalletCustomIcon
              active={["/academy/Wallet"].find(
                (path) => location.pathname === path
              )}
            />
            <span className="title-dash-link">المحفظة </span>
          </div>
        </div>
      </NavLink>

      <div className={classes.mainIcon}>
        <div>
          <StaticsCustomIcon
            active={["/academy/ReportsAndStatistics"].find(
              (path) => location.pathname === path
            )}
          />
          <span className="title-dash-link">التقارير والاحصائيات </span>
          <Badge color="failure">قريباً</Badge>
        </div>
      </div>
    </Fragment>
  );
};

export default AcademeyNavigation;
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import AddIcon from "@mui/icons-material/Add";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import { IoSettings } from "react-icons/io5";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useEffect, useRef, useState } from "react";
import Collection from "./Collection/collection";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import { HiMiniBriefcase } from "react-icons/hi2";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/Wallet";
import ShopIcon from "../../assets/icons/shop.svg";
import classes from "./sidebar.module.scss";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import HomeIcon from "../../assets/icons/home";
import SettingIcon from "../../assets/icons/SettingIcon";
import PeopleIcon from "../../assets/icons/PeopleIcon";
import OpenBookIcon from "../../assets/icons/OpenbookIcon";
import BagCustomIcon from "../../assets/icons/BagIcon";
import ShopCustomIcon from "../../assets/icons/ShopCustomIcon";
import WalletCustomIcon from "../../assets/icons/WalletCustomIcon";
import ProfIleCustomIcon from "../../assets/icons/ProfIleCustomIcon";
import StaticsCustomIcon from "../../assets/icons/StaticsCustomIcon";
const AdminNavigation = ({ setShow }) => {
  const location = useLocation();
  return (
    <>
      <NavLink
        to="/admin"
        end
        className={`${({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }} navbar-dashboard--info`}
      >
        <div className={classes.mainIcon}>
          <div>
            <HomeIcon active={location.pathname === "/admin"} />
            <span className="title-dash-link">لوحة التحكم</span>
          </div>
        </div>
      </NavLink>
      <Collection
        mainIcon={
          <SettingIcon
            active={[
              "/admin/NotifcationSend",
              "/admin/SubscreptionPacks",
              "/admin/PrivacyPolicy",
              "/admin/Terms",
            ].find((path) => location.pathname === path)}
          />
        }
        mainTitle={"التحكم بالنظام"}
        acitve={[
          "/admin/NotifcationSend",
          "/admin/SubscreptionPacks",
          "/admin/PrivacyPolicy",
          "/admin/Terms",
        ].find((path) => location.pathname === path)}
      >
        <NavLink
          to="admin/NotifcationSend"
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              console.log(e.currentTarget);
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">بث الاشعارات </span>
          </div>
        </NavLink>
        <NavLink
          to="admin/SubscreptionPacks"
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link"> باقات الاشتراك</span>
          </div>
        </NavLink>
        <NavLink
          to="admin/PrivacyPolicy"
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link"> سياسة الخصوصية </span>
          </div>
        </NavLink>
        <NavLink
          to="admin/Terms"
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link"> الشروط والاحكام </span>
          </div>
        </NavLink>
      </Collection>
      <Collection
        mainIcon={
          <PeopleIcon
            active={[
              "/admin/RolesAndPermession",
              "/admin/dashboard/AddClient",
              "/admin/users",
            ].find((path) => location.pathname === path)}
          />
        }
        mainTitle={"قاعدة المستخدمين"}
        acitve={[
          "/admin/RolesAndPermession",
          "/admin/dashboard/AddClient",
          "/admin/users",
        ].find((path) => location.pathname === path)}
      >
        <NavLink
          to="admin/RolesAndPermession"
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">الادوار والصلاحيات</span>
          </div>
        </NavLink>
        <div
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/AddClient"
        >
          <div
            style={{ padding: "16px" }}
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="d-flex align-items-center  gap-3 title-dash-link">
              المهام <div className="notActive"> قريبا</div>
            </span>
          </div>
        </div>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/users"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">حسابات المستخدمين </span>
          </div>
        </NavLink>
      </Collection>
      <Collection
        mainIcon={
          <OpenBookIcon
            active={[
              "/admin/TrainingCourses",
              "/admin/Sessions",
              "/admin/DigitalProducts",
              "/admin/ProductPackages",
              "/admin/Blogs",
              "/admin/Exams",
              "/admin/dashboard/AddClient",
              "/admin/Video",
              "/admin/Categories",
            ].find((path) => location.pathname === path)}
          />
        }
        mainTitle={"ادارة المحتوى "}
        acitve={[
          "/admin/TrainingCourses",
          "/admin/Sessions",
          "/admin/DigitalProducts",
          "/admin/ProductPackages",
          "/admin/Blogs",
          "/admin/Exams",
          "/admin/dashboard/AddClient",
          "/admin/Video",
          "/admin/Categories",
        ].find((path) => location.pathname === path)}
      >
        <NavLink
          to="admin/TrainingCourses"
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">الدورات التدريبية</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/Sessions"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">الجلسات الحضورية </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/DigitalProducts"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">المنتجات الرقمية </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/ProductPackages"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link"> حزم المنتجات </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/Blogs"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">المدونات </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/Exams"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">الاختبارات </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/Certficates"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">الشهادات </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/Video"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">مكتبة الفيديو </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/Categories"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">التصنيفات </span>
          </div>
        </NavLink>
      </Collection>
      <Collection
        mainIcon={
          <BagCustomIcon
            active={[
              "/admin/StudentRate",
              "/admin/Comments",
              "/admin/Subscription",
              "/admin/Purchases",
              "/admin/Cart",
            ].find((path) => location.pathname === path)}
          />
        }
        mainTitle={"حقيبة الطلاب  "}
        acitve={[
          "/admin/StudentRate",
          "/admin/Comments",
          "/admin/Subscription",
          "/admin/Purchases",
          "/admin/Cart",
        ].find((path) => location.pathname === path)}
      >
        <NavLink
          to="admin/StudentRate"
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">التقييمات</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/Comments"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">التعليقات </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/Subscription"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">الاشتراكات </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/Purchases"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">المشتريات </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/Cart"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">عربة التسوق </span>
          </div>
        </NavLink>
      </Collection>
      <Collection
        mainIcon={
          <ShopCustomIcon
            active={[
              "/admin/JoiningForms",
              "/admin/FinancialTransactions",
              "/admin/AffiliateMarketing",
              "/admin/Sales",
            ].find((path) => location.pathname === path)}
          />
        }
        mainTitle={" التسويق  "}
        acitve={[
          "/admin/JoiningForms",
          "/admin/FinancialTransactions",
          "/admin/AffiliateMarketing",
          "/admin/Sales",
        ].find((path) => location.pathname === path)}
      >
        <NavLink
          to="admin/JoiningForms"
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">نموذج الانضمام</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/FinancialTransactions"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">المعاملات المالية </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/AffiliateMarketing"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">التسويق بالعمولة </span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => {
            return isPending
              ? "pending"
              : isActive
              ? `${classes.Link} LinkActive`
              : classes.Link;
          }}
          to="admin/Sales"
        >
          <div
            className={classes.subIcon}
            onClick={(e) => {
              mobile ? setShow(false) : null;
            }}
          >
            <div>
              <FiberManualRecordIcon
                sx={{
                  color: "       #7E8799",
                  width: "10px",
                  height: "10px",
                }}
              />
            </div>
            <span className="title-dash-link">العروض </span>
          </div>
        </NavLink>
      </Collection>

      <NavLink
        to="admin/Wallet"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <WalletCustomIcon
              active={["/admin/Wallet"].find(
                (path) => location.pathname === path
              )}
            />
            <span className="title-dash-link">المحفظة </span>
          </div>
        </div>
      </NavLink>
      <NavLink
        to="admin/profile"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <ProfIleCustomIcon
              active={["/admin/profile"].find(
                (path) => location.pathname === path
              )}
            />
            <span className="title-dash-link">الملف الشخصي </span>
          </div>
        </div>
      </NavLink>
      <NavLink
        to="admin/ReportsAndStatistics"
        className={({ isActive, isPending }) => {
          return isPending ? "pending" : isActive ? classes.activeLink : "";
        }}
      >
        <div className={classes.mainIcon}>
          <div>
            <StaticsCustomIcon
              active={["/admin/ReportsAndStatistics"].find(
                (path) => location.pathname === path
              )}
            />
            <span className="title-dash-link">التقارير والاحصائيات </span>
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
            {" "}
            تواصل
            <KeyboardBackspaceIcon />
          </span>
        </div>
      </div>
    </>
  );
};

export default AdminNavigation;

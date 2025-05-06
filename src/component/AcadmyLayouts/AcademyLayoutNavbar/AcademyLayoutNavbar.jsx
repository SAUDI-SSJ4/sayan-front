import classes from "./AcademyLayoutNavbar.module.scss";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../utils/hooks/useAuth";

const AcademyLayoutNavbar = ({
  profile,
  academySettings,
  studentOpinions,
  faqs,
}) => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const { user, isLoading: isLoadingUser } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div data-aos="fade-down" className={`container`}>
      <div className={`${classes.NavBarContainer} all-navbar-layout-1`}>
        <div className={classes.NavBarRoutes}>
          <Link to={`/acdemy/${id}`} className={classes.logo}>
            <img
              src={academySettings.logo}
              alt="sayn academy logo"
              className="object-cover"
            />
          </Link>
          <div className={classes.Routes}>
            <ul>
              <li>
                <Link to="#">الرئيسية</Link>
              </li>
              <li>
                <Link to="#courses">الدورات</Link>
              </li>
              {faqs.length > 0 && (
                <li>
                  <Link to="#faqs">الاسئلة الشائعة</Link>
                </li>
              )}
              {studentOpinions.length > 0 && (
                <li>
                  <Link to="#student-opinions">أراء الطلاب</Link>
                </li>
              )}
              <li>
                <Link to="#contact">تواصل معنا</Link>{" "}
              </li>
            </ul>
          </div>
        </div>
        {isLoadingUser ? (
          <div className="flex items-center gap-4">
            <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
          </div>
        ) : user ? (
          <div className={classes.NavBarBtns}>
            <Link
              className={classes.Secondry}
              to={
                user.academy?.id === profile.id
                  ? "/academy"
                  : `/student/dashboard`
              }
            >
              لوحة التحكم
            </Link>
            {user.academy?.id === profile.id && user.academy.image && (
              <img
                src={user.academy.image}
                alt=""
                className="rounded-full w-10 h-10 object-cover"
              />
            )}
            {user.academy?.id !== profile.id && user.image && (
              <img
                src={user.image}
                alt=""
                className="rounded-full w-10 h-10 object-cover"
              />
            )}
          </div>
        ) : (
          <div className={classes.NavBarBtns}>
            <Link className={classes.Secondry} to={"/student/login"}>
              دخول
            </Link>
            <Link
              className={`${classes.Primary} button-new-account`}
              to={"/signin"}
            >
              حساب جديد
            </Link>
          </div>
        )}
        <div className={classes.MobileMenu} onClick={handleShow}>
          <MenuIcon />
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AcademyLayoutNavbar;

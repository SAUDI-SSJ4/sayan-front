import classes from "./AcademyLayoutNavbar.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../utils/hooks/useAuth";
import NewOffCanvas from "./NewOffCanvas";

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

  // Format links for the NewOffCanvas component
  const navigationLinks = [
    { 
      title: "الرئيسية", 
      path: "#",
      onClick: (e, path) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    { 
      title: "الدورات", 
      path: "#courses",
      onClick: (e, path) => {
        e.preventDefault();
        document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    ...(studentOpinions.length > 0 ? [{
      title: "أراء الطلاب",
      path: "#student-opinions",
      onClick: (e, path) => {
        e.preventDefault();
        document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
      }
    }] : []),
    ...(faqs.length > 0 ? [{
      title: "الأسئلة الشائعة",
      path: "#faqs",
      onClick: (e, path) => {
        e.preventDefault();
        document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
      }
    }] : []),
    { 
      title: "تواصل معنا", 
      path: "#contact",
      onClick: (e, path) => {
        e.preventDefault();
        document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
  ];

  const renderUserButtons = () => {
    if (isLoadingUser) {
      return (
        <div className="flex items-center gap-4">
          <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
          <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
        </div>
      );
    }

    if (user) {
      return (
        <div className={classes.NavBarBtns}>
          <Link
            className={classes.Secondry}
            to={user.academy?.id === profile.id ? "/academy" : `/student/dashboard`}
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
      );
    }

    return (
      <div className={classes.NavBarBtns}>
        <Link 
          className={classes.Secondry}
          to="/login"
        >
          دخول
        </Link>
        <Link
          className={`${classes.Primary} button-new-account`}
          to="/signin"
        >
          حساب جديد
        </Link>
      </div>
    );
  };

  const renderUserButtonsMobile = () => {
    if (isLoadingUser) {
      return (
        <div className="flex flex-col gap-4">
          <div className="w-full h-10 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="w-full h-10 bg-gray-300 animate-pulse rounded-lg"></div>
        </div>
      );
    }

    if (user) {
      return (
        <div className="flex flex-col gap-4">
          <Link
            className="w-full px-4 py-2 text-center text-gray-700 hover:text-blue-600 transition-colors rounded-lg border border-gray-200 hover:border-blue-200"
            to={user.academy?.id === profile.id ? "/academy" : `/student/dashboard`}
          >
            لوحة التحكم
          </Link>
          <div className="flex justify-center">
            {user.academy?.id === profile.id && user.academy.image && (
              <img
                src={user.academy.image}
                alt=""
                className="rounded-full w-16 h-16 object-cover"
              />
            )}
            {user.academy?.id !== profile.id && user.image && (
              <img
                src={user.image}
                alt=""
                className="rounded-full w-16 h-16 object-cover"
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        <Link 
          className="w-full px-4 py-3 text-center text-gray-700 hover:text-blue-600 transition-colors rounded-lg border border-gray-200 hover:border-blue-200"
          to="/login"
        >
          دخول
        </Link>
        <Link
          className="w-full px-4 py-3 text-center text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg"
          to="/signin"
        >
          حساب جديد
        </Link>
      </div>
    );
  };

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
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="hover:!text-[#009AFF] duration-200 transition-colors"
                    onClick={(e) => link.onClick(e, link.path)}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Desktop User Actions */}
        <div className={classes.desktopActions}>
          {renderUserButtons()}
        </div>

        {/* Mobile Menu Button */}
        <div className={classes.MobileMenu} onClick={handleShow}>
          <MenuIcon />
        </div>
      </div>

      {/* New Off-Canvas Menu */}
      <NewOffCanvas
        show={show}
        onClose={handleClose}
        logo={academySettings.logo}
        links={navigationLinks}
        renderUserButtons={renderUserButtons}
        renderUserButtonsMobile={renderUserButtonsMobile}
      />
    </div>
  );
};

export default AcademyLayoutNavbar;

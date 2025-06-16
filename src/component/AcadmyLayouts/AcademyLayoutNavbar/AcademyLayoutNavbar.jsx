import classes from "./AcademyLayoutNavbar.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../utils/hooks/useAuth";
import NewOffCanvas from "./NewOffCanvas";
import CartButton from "../../MainPages/Header/CartButton";

const AcademyLayoutNavbar = ({
  profile,
  academySettings,
  studentOpinions,
  faqs,
  academyId
}) => {
  const [show, setShow] = useState(false);
  const { user, isLoading: isLoadingUser } = useAuth();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Format links for the NewOffCanvas component
  const navigationLinks = [
    { 
      title: "البداية", 
      path: "#hero",
      onClick: (e, path) => {
        e.preventDefault();
        document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      title: "الانجازات", 
      path: "#about",
      onClick: (e, path) => {
        e.preventDefault();
        document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      title: "المواد التعليمية", 
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
      // Check if the user object has an 'academy' property to determine if they are an academy owner
      const isAcademyOwner = !!user.academy;
      const dashboardPath = isAcademyOwner ? "/academy" : "/student/dashboard";
      // Use academy image if owner, otherwise use user image
      const userImage = isAcademyOwner ? user.academy?.image : user.image;
      const userName = user.name; // Assuming user object has a name property

      return (
        <div className={classes.NavBarBtns}>
          <Link
            className={classes.Secondry}
            to={dashboardPath}
            style={{
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            لوحة التحكم
          </Link>
          {userImage && (
            <img
              src={userImage}
              alt={userName || "User Avatar"}
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
          style={{
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          دخول
        </Link>
        <Link
          className={`${classes.Primary} button-new-account`}
          to="/signin"
          style={{
            fontSize: '1rem',
            fontWeight: '600'
          }}
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
          {/* Cart Button for Mobile */}
          <div className="flex justify-center mb-4">
            <CartButton />
          </div>
          <Link
            className="w-full px-4 py-2 text-center text-gray-700 hover:text-blue-600 transition-colors rounded-lg border border-gray-200 hover:border-blue-200"
            to={user.academy?.id === profile.id ? "/academy" : `/student/dashboard`}
            style={{
              fontSize: '1rem',
              fontWeight: '600'
            }}
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
        {/* Cart Button for Mobile */}
        <div className="flex justify-center mb-4">
          <CartButton />
        </div>
        <Link 
          className="w-full px-4 py-3 text-center text-gray-700 hover:text-blue-600 transition-colors rounded-lg border border-gray-200 hover:border-blue-200"
          to="/login"
          style={{
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          دخول
        </Link>
        <Link
          className="w-full px-4 py-3 text-center text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg"
          to="/signin"
          style={{
            fontSize: '1rem',
            fontWeight: '600'
          }}
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
          <Link to={`/acdemy/${academyId}`} className={classes.logo}>
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
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: '600'
                    }}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Desktop User Actions */}
        <div className={`${classes.desktopActions} flex items-center gap-4`}>
          <CartButton />
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
        renderUserButtons={() => (
          <div className={classes.NavBarBtns}>
            {renderUserButtons()}
          </div>
        )}
        renderUserButtonsMobile={renderUserButtonsMobile}
      />
    </div>
  );
};

export default AcademyLayoutNavbar;

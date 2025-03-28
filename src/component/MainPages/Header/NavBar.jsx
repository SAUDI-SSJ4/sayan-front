import { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "rsuite";
import { HeaderNavigate } from "./HeaderNavigate";
import classes from "./NavBar.module.scss";
import image from "../../../assets/images/SayanLogo.png";
import defaultAvatar from "../../../assets/images/default-user.jpg";
import { getMenuTitle, NAVBAR_LINK } from "../../../utils/constant";
import Cookies from 'js-cookie';
import CartButton from './CartButton';
import NewOffCanvas from "./NewOffCanvas";

const NavBar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuFixed, setMenuFixed] = useState(false);
  const [show, setShow] = useState(false);
  const [path, setPath] = useState("");
  const [cookieValue, setCookieValue] = useState('');

  useEffect(() => {
    let tempPath =
      location.pathname.split("/").length === 3
        ? location.pathname
        : location.pathname.replace(/\/[^/]+\/?$/, "");
    setPath(tempPath);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeFixed = window.scrollY > 100 || window.innerWidth < 1320;
      setMenuFixed(shouldBeFixed);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    handleClose(); // Close the offcanvas after navigation
  };

  useEffect(() => {
    const cookie = Cookies.get('login_type');
    setCookieValue(cookie);
  }, []);

  // Toggle offcanvas menu
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Reusable user buttons based on authentication
  const renderUserButtons = () => (
    <div className={classes.NavBarBtns}>
      <CartButton />
      {user ? (
        <Fragment>
          <div onClick={() => navigate(`${cookieValue === 'academy' ? '/academy' : '/student/dashbord'}`)} className={classes.Secondry}>
            لوحة التحكم
          </div>
          <Avatar circle src={user.image || defaultAvatar} alt={user.name} />
        </Fragment>
      ) : (
        <Fragment>
          <div onClick={() => navigate("/student/login")} className={classes.Secondry}>
            دخول
          </div>
          <div onClick={() => navigate("/student/signin")} className={classes.Primary}>
            انضم الان
          </div>
        </Fragment>
      )}
    </div>
  );


  const renderUserButtonsMobile = () => (
    <>
      <div className="px-4">
        <div className={classes.NavBarBtns}>
          <CartButton />

          {user ? (
            <Fragment>
              <div onClick={() => navigate(`${cookieValue === 'academy' ? '/academy' : '/student/dashbord'}`)} className={classes.Secondry}>
                لوحة التحكم
              </div>
              <Avatar circle src={user.image || defaultAvatar} alt={user.name} />
            </Fragment>

          ) : (
            <Fragment>
              <div className="flex flex-col gap-2 mt-4">
                <div onClick={() => navigate("/student/login")} className="bg-blue-200 w-full px-4 py-2 rounded-md text-center hover:bg-blue-400 border-2 border-blue-400 cursor-pointer">
                  دخول
                </div>
                <div onClick={() => navigate("/student/signin")} className="bg-blue-600  px-4 py-2 rounded-md hover:bg-blue-400  border-2 hover:border-blue-300  cursor-pointer hover:text-gray-900 text-white">
                  انضم الان
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>

    </>
  );

  // Prepare links for NewOffCanvas
  const links = NAVBAR_LINK.map((path) => ({
    path,
    title: getMenuTitle(path),
    onClick: handleClick,
  }));

  return (
    <div data-aos="fade-down">
      <div className={`navbar--1 ${classes.NavBarContainer} ${isMenuFixed ? "menu-fixed" : ""}`}>
        <div className={classes.NavBarRoutes}>
          <div className={`${classes.logo} cursor-pointer`}>
            <img src={image} onClick={() => navigate("/")} alt="sayn academy logo" />
          </div>
          <div className={classes.Routes}>
            <ul>
              {NAVBAR_LINK.map((path, index) => (
                <li key={index}>
                  <HeaderNavigate
                    path={path}
                    onClick={(e) => handleClick(e, path)}
                    title={getMenuTitle(path)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {renderUserButtons()}
        <div className={classes.MobileMenu} onClick={handleShow}>
          <MenuIcon />
        </div>
      </div>

      {/* New OffCanvas Component */}
      <NewOffCanvas
        show={show}
        onClose={handleClose}
        logo={image}
        links={links}
        renderUserButtons={renderUserButtons}
        renderUserButtonsMobile={renderUserButtonsMobile}
      />
    </div>
  );
};

export default NavBar;
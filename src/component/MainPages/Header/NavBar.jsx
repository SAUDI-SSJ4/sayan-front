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
import Cookies from "js-cookie";
import CartButton from "./CartButton";

const NavBar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuFixed, setMenuFixed] = useState(false);
  const [show, setShow] = useState(false);
  const [path, setPath] = useState("");
  const [cookieValue, setCookieValue] = useState("");

  useEffect(() => {
    let tempPath =
      location.pathname.split("/").length === 3
        ? location.pathname
        : location.pathname.replace(/\/[^/]+\/?$/, "");
    setPath(tempPath);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setMenuFixed(window.scrollY > 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  useEffect(() => {
    // Retrieve the cookie by its name
    const cookie = Cookies.get("login_type");

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
          <div
            onClick={() =>
              navigate(
                `${
                  cookieValue === "academy" ? "/academy" : "/student/dashbord"
                }`
              )
            }
            className={classes.Secondry}
          >
            لوحة التحكم
          </div>
          <Avatar circle src={user.image || defaultAvatar} alt={user.name} />
        </Fragment>
      ) : (
        <Fragment>
          <div onClick={() => navigate("/login")} className={classes.Secondry}>
            دخول
          </div>
          <div onClick={() => navigate("/signin")} className={classes.Primary}>
            انضم الان
          </div>
        </Fragment>
      )}
    </div>
  );

  return (
    <div data-aos="fade-down">
      <div
        className={`navbar--1 ${classes.NavBarContainer} ${
          isMenuFixed ? "menu-fixed" : ""
        }`}
      >
        <div className={classes.NavBarRoutes}>
          <Link to="/" className={classes.logo}>
            <img src={image} alt="sayn academy logo" />
          </Link>
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

      {/* Offcanvas menu for mobile view */}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ direction: "rtl" }}>
            <div className={classes.logo}>
              <img src={image} alt="sayn academy logo" />
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ direction: "rtl" }}>
          <ul className={classes.Offcanvas}>
            {NAVBAR_LINK.map((path, index) => (
              <li key={index}>
                <NavLink
                  to={path}
                  onClick={(e) => handleClick(e, path)}
                  className={({ isActive }) =>
                    isActive ? classes.NavActive : ""
                  }
                >
                  {getMenuTitle(path)}
                </NavLink>
              </li>
            ))}
          </ul>
          {renderUserButtons()}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default NavBar;

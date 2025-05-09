import classes from "./NavBar.module.scss";
import image from "../../../assets/images/SayanLogo.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [path, setPath] = useState("");
  const location = useLocation();
  
  useEffect(() => {
    let temp = location.pathname;
    if (temp.split("/").length === 3) {
      console.log(temp);
    } else {
      temp = temp.replace(/\/[^/]+\/?$/, "");
    }
    console.log(temp);

    setPath(temp);
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // FIXED TOP NAVBAR
  const [isMenuFixed, setMenuFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isScreenWidthSmall = window.innerWidth < 1320;
      const shouldBeFixed = scrollTop > 100 && isScreenWidthSmall;
      console.log(isScreenWidthSmall);
      setMenuFixed(shouldBeFixed);

      console.log("Scroll Top:", scrollTop);
      console.log("Screen Width:", window.innerWidth);
      console.log("Should Be Fixed:", shouldBeFixed);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  

  return (
    <div data-aos="fade-down">
      <div className={`navbar--1 ${classes.NavBarContainer} ${isMenuFixed ? "menu-fixed" : ""}`}>
        <div className={classes.NavBarRoutes}>
          <div className={classes.logo}>
            <Link to="/">
              <img src={image} alt="sayn academy logo" />
            </Link>
          </div>
          <div className={classes.Routes}>
            <ul>
              <li>
                <NavLink
                  className={({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? classes.NavActive : "";
                  }}
                  to={"/"}
                >
                  الرئيسية
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? classes.NavActive : "";
                  }}
                  to={`/LaunchYourAcademy`}
                >
                  اطلق اكادميتك
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? classes.NavActive : "";
                  }}
                  to={`/Ai`}
                >
                  الذكاء الاصطناعي
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? classes.NavActive : "";
                  }}
                  to={`/EmployeeTrainning`}
                >
                  تدريب وتطوير الموظفين
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.NavBarBtns}>
          <div
            onClick={() => {
              navigate("/login");
            }}
            className={classes.Secondry}
          >
            دخول
          </div>
          <div className={classes.Primary}>انضم الان </div>
        </div>
        <div className={classes.MobileMenu} onClick={handleShow}>
          <MenuIcon />
        </div>
      </div>
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
            <li>
              <NavLink
                className={({ isActive, isPending }) => {
                  return isPending ? "pending" : isActive ? classes.NavActive : "";
                }}
                to={"/"}
              >
                الرئيسية
              </NavLink>
            </li>
            <li>
              <NavLink to={`/LaunchYourAcademy`}>اطلق اكادميتك</NavLink>
            </li>
            <li>
              <NavLink to={`/Blogs`}>المدونة</NavLink>
            </li>
            <li>
              <NavLink to={`/Ai`}>الذكاء الاصطناعي </NavLink>
            </li>
            <li>
              <NavLink to={`/EmployeeTrainning`}>تدريب وتطوير الموظفين</NavLink>
            </li>
          </ul>
          <div className={classes.NavBarBtnss} style={{ flexDirection: "column" }}>
            <div
              onClick={() => {
                navigate("/login");
              }}
              className={classes.Secondry}
            >
              دخول
            </div>
            <div className={classes.Primary}>انضم الان </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default NavBar;

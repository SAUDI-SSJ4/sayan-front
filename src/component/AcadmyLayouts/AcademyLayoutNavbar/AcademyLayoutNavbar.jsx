import classes from "./AcademyLayoutNavbar.module.scss";
// import image from "../../../assets/images/acadmeylogo.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../../axios";
import userss from "../../../assets/images/userAvatar.jpg";
import Cookies from "js-cookie";

const AcademyLayoutNavbar = ({ navSettings }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [path, setPath] = useState("");

  const token = Cookies.get("student_token");

  const { acdemyId } = useParams();

  useEffect(() => {
    setPath(acdemyId);
  }, []);

  const [profileData, setprofileData] = useState([]);
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    if (token) {
      axiosInstance
        .get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          setprofileData(data);
          setLoader(true);
        })
        .catch((error) => {
          navigate("/login");
        });
    }
  }, []);

  console.log(path);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div data-aos="fade-down" className={`container`}>
      <div className={`${classes.NavBarContainer} all-navbar-layout-1`}>
        <div className={classes.NavBarRoutes}>
          <Link to="/" className={classes.logo}>
            <img src={navSettings.template?.logo} alt="sayn academy logo" />
          </Link>
          {true && !token ? (
            <div className={classes.Routes}>
              <ul>
                <li>
                  <Link to={`/acdemy/${acdemyId}`}>الرئيسية</Link>
                </li>
                <li>
                  <Link to={`/acdemy/${acdemyId}/AllCoursesPage`}>الدورات</Link>
                </li>
                <li>
                  <Link to={`/acdemy/${acdemyId}/AllBlogs`}>المدونة</Link>
                </li>
                <li>
                  <Link to={`/acdemy/${acdemyId}/AllProductsPage`}>
                    المنتجات الرقمية
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to={`/acdemy/${acdemyId}/ContactUs`}>
                    تواصل معنا
                  </Link>{" "}
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        {token && Loader ? (
          <div className={classes.NavBarBtns}>
            <Link className={classes.Secondry} to={"/student/dashboard"}>
              لوحة التحكم
            </Link>
            <img
              style={{ width: "50px", borderRadius: "50%" }}
              src={Loader ? profileData?.data.image : userss}
              alt=""
              className={classes.avatarImage}
            />
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

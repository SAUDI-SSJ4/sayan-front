import { Link } from "react-router-dom";
import classes from "./login.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const AcademyFormContener = ({ children }) => {
  return (
    <div className={`row g-3 ${classes.LoginContainer}`}>
      <div className={`col-lg-6 col-md-12 ${classes.LoginBanner} bg-login-banner`}></div>
      <div className="col-lg-6 col-md-12 d-flex  justify-content-center">
        <div
          className="login-form--1"
          style={{
            maxWidth: "100%",
            paddingInline: "20px",
            paddingBottom: "100px",
          }}
        >
          <div className={classes.goBack}>
            <Link to="/" className="text-decoration-none">
              العودة للصفحة الرئيسية <ArrowBackIosIcon sx={{ fontSize: "14px" }} />
            </Link>
          </div>
          <div className={`${classes.LoginForm}  `}>
            <h3>تسجيل الدخول</h3>
            <p>ادخل المعلومات الخاصة بحسابك</p>
            <div className={`${classes.line}`}></div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

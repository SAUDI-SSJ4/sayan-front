import { Link } from "react-router-dom";
import classes from "./login.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "rsuite";
import logo from "../../../assets/images/logo.png";

export const AcademyFormContener = ({ showForgotPassword, children }) => {
  return (
    <div className={`row gx-3 ${classes.LoginContainer}`}>
      <div className={`col-lg-6 col-md-12 ${classes.LoginBanner} bg-login-banner`}>
        <img src={logo} className={`${classes.logo}`} />
        <ul className={` ${classes.footerList}`}>
          <li>

          </li>
          <li><Link to="/" style={{ textDecoration: 'none' }}>منصة سيان</Link></li>
          <li><Link to="/terms" style={{ textDecoration: 'none' }}>الشروط والأحكام</Link></li>
          <li><Link to="/privacy" style={{ textDecoration: 'none' }}>سياسة الخصوصية</Link></li>
          <li><Link to="/student/signin" style={{ textDecoration: 'none' }}>الانضمام كطالب</Link></li>
        </ul>
      </div>

      <div className="col-lg-6 col-md-12 d-flex justify-content-center">
        <div
          className="login-form--1"
          style={{
            maxWidth: "100%",
            minWidth: "60%",
            paddingBottom: "100px",
          }}
        >
          <div className={classes.goBack}>
            <Link to="/" className="text-decoration-none">
              العودة للصفحة الرئيسية <ArrowBackIosIcon sx={{ fontSize: "14px" }} />
            </Link>
          </div>
          <div className={`${classes.LoginForm}`}>
            <h3>{showForgotPassword ? 'إعادة تعيين كلمة المرور' : 'تسجيل الدخول'}</h3>
            <p>ادخل المعلومات الخاصة بحسابك</p>
            <div className={`${classes.divider}`}></div>
            {children}
          </div>
          <div className={classes.copyright}>
            © 2023 جميع الحقوق محفوظة لمنصة سيان
          </div>
        </div>
      </div>
    </div>
  );
};

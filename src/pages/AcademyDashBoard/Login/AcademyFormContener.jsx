import { Link } from "react-router-dom";
import classes from "./login.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "rsuite";
import { WiMoonWaningCrescent3 } from "react-icons/wi";
export const AcademyFormContener = ({ children }) => {
  return (
    <div className={`row gx-3 ${classes.LoginContainer}`}>
      <div className={`col-lg-6 col-md-12 ${classes.LoginBanner} bg-login-banner`}>
        <div>
          <ul className={` ${classes.footerList}`}>
            <li> 
              <Button>
                <WiMoonWaningCrescent3 />
              </Button>
            </li>
            <li>منصة سيان</li>
            <li>الشروط والأحكام</li>
            <li>سياسة الخصوصية</li>
            <li>الانضمام كطالب</li>
          </ul>
        </div>
      </div>


      <div className="col-lg-6 col-md-12 d-flex  justify-content-center">
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
          <div className={`${classes.LoginForm}  `}>
            <h3>تسجيل الدخول</h3>
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

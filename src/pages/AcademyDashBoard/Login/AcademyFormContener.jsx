import { Link } from "react-router-dom";
import classes from "./login.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const AcademyFormContener = ({ showForgotPassword, children }) => {
  return (
    <div className={`row gx-3 px-3 md:px-0 ${classes.LoginContainer}`}>
      <div className="col-lg-6 col-md-12 d-flex justify-content-center mx-auto">
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
              العودة للصفحة الرئيسية{" "}
              <ArrowBackIosIcon sx={{ fontSize: "14px" }} />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

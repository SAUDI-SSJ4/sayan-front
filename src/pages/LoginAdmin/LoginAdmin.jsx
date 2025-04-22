import classes from "./login.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GoogleIcon from "../../assets/icons/logo.svg";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Button as RBtn } from "rsuite";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../axios";
import { login } from "../../../redux/AuthSlice";
import toast, { Toaster } from "react-hot-toast";
import { postLoginAPI } from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import logo from "../../assets/images/logo.png";
import Cookies from "js-cookie";
import { WiMoonWaningCrescent3 } from "react-icons/wi";

const LoginAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const router = useNavigate();
  const Dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const formData = {
    email,
    password,
  };
  console.log("test test");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("بريد الكترونى خطأ")
        .required("البريد الالكترونى مطلوب"),
      password: Yup.string().required("كلمة السر مطلوبة"),
    }),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const notify = (e) => toast(e);

  const mutation = useMutation({
    mutationFn: (data) => postLoginAPI(data),
    onSuccess: (response) => {
      const { type, access_token } = response.data;
      if (!type === "academy") {
        Cookies.set("student_token", access_token);
        Cookies.set("student_login", true);
        notify("تم تسجيل الدخول بنجاح 🎉");
        return router("/student/dashboard");
      }
    },
    onError: (error) => {
      console.log(error);
      notify(error.response.data.message + "❌");
    },
  });

  const logInFunction = async () => {
    if (!formData.email || !formData.password) return;
    await mutation.mutateAsync(formData);
  };

  const handleForgotPassword = async (email) => {
    try {
      // Add your forgot password API call here
      notify("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
      setShowForgotPassword(false);
    } catch (error) {
      notify("حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور");
    }
  };

  return (
    <div className={`row gx-3 ${classes.LoginContainer}`}>
      <div
        className={`col-lg-6 col-md-12 ${classes.LoginBanner} bg-login-banner`}
      >
        <img src={logo} className={`${classes.logo}`} />
        <ul className={` ${classes.footerList}`}>
          <li>
            <RBtn>
              <WiMoonWaningCrescent3 />
            </RBtn>
          </li>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              منصة سيان
            </Link>
          </li>
          <li>
            <Link to="/terms" style={{ textDecoration: "none" }}>
              الشروط والأحكام
            </Link>
          </li>
          <li>
            <Link to="/privacy" style={{ textDecoration: "none" }}>
              سياسة الخصوصية
            </Link>
          </li>
        </ul>
      </div>
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
              العودة للصفحة الرئيسية <ArrowBackIosIcon />
            </Link>
          </div>
          {showForgotPassword ? (
            <div className={classes.forgotPasswordForm}>
              <h3>إعادة تعيين كلمة المرور</h3>
              <p>أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور</p>
              <TextField
                fullWidth
                id="resetEmail"
                name="resetEmail"
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                  },
                }}
              />
              <div className="mt-3 d-flex gap-2">
                <button
                  className={classes.SubmitBtn}
                  onClick={() => handleForgotPassword(email)}
                >
                  إرسال
                </button>
                <button
                  className={classes.cancelBtn}
                  onClick={() => setShowForgotPassword(false)}
                >
                  إلغاء
                </button>
              </div>
            </div>
          ) : (
            <div className={`${classes.LoginForm}  `}>
              <h3>تسجيل الدخول</h3>
              <p> ادخل المعلومات الخاصة بحسابك</p>
              {/**
              <button
              className={`${classes.googleBtn} button-login--1 d-flex  align-items-center  gap-3 justify-content-center  mt-3`}
            >
              الدخول باستخدام حساب جوجل <img src={GoogleIcon} />
            </button>
            <div className={`${classes.line}`}>
              <span>أو</span>
              </div>*/}
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <button
                    className={`${classes.googleBtn} button-login--1 d-flex  align-items-center  gap-3 justify-content-center  mt-3`}
                  >
                    الدخول باستخدام حساب جوجل <img src={GoogleIcon} />
                  </button>
                  <div className={`${classes.line}`}>
                    <span>أو</span>
                  </div>
                </div>
                <div className={`${classes.formGroup} `}>
                  <label htmlFor="email" className="mb-2">
                    البريد الإلكتروني <span style={{ color: "red" }}>*</span>
                  </label>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setEmail(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                      },
                    }}
                  />
                </div>
                <Toaster />
                <div className={`${classes.formGroup} `}>
                  <label htmlFor="password" className="mb-2">
                    كلمة المرور <span style={{ color: "red" }}>*</span>
                  </label>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setPassword(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {
                        borderRadius: "10px",
                      },
                    }}
                  />
                </div>

                <div
                  className={`${classes.checkboxContainer} d-flex justify-content-between align-items-center`}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        checked={formik.values.rememberMe}
                        onChange={formik.handleChange}
                        color="primary"
                      />
                    }
                    sx={{ margin: "0px" }}
                    label="تذكرني"
                  />

                  <div
                    className={`${classes.forgotPassword}`}
                    onClick={() => setShowForgotPassword(true)}
                    style={{ cursor: "pointer" }}
                  >
                    نسيت كلمة المرور؟
                  </div>
                </div>

                <button
                  className={`${classes.SubmitBtn} mt-2`}
                  style={{ display: "flex", justifyContent: "center" }}
                  onClick={() => {
                    logInFunction();
                  }}
                >
                  {loading ? (
                    <div className="loader"></div>
                  ) : (
                    <> تسجيل الدخول</>
                  )}
                </button>
              </form>
              <div className={classes.copyright}>
                © 2023 جميع الحقوق محفوظة لمنصة سيان
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;

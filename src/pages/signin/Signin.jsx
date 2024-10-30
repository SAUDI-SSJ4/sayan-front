import classes from "./login.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../axios";
import OtpVerification from "./OtpVerification";
import { toast } from "react-toastify";
import client from "../../utils/apis/client/client";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the step from URL params
  const step = searchParams.get("step") || "";

  const formData = {
    name,
    email,
    phone,
    password,
  };

  const signinSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await client.post("/register", formData);
      setSearchParams({ step: "otp" }); // Update the URL with the new step
      toast.success("تم ارسال الرمز الي بريدك الالكتروني الذي أدخلته");
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: name ? name : "",
      email: email ? email : "",
      phone: phone ? phone : "",
      password: password ? password : "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("الإسم مطلوب"),
      email: Yup.string()
        .email("بريد الكتروني خطأ")
        .required("البريد الالكتروني مطلوب"),
      phone: Yup.string().required("رقم الهاتف مطلوب"),
      password: Yup.string().required("كلمة السر مطلوبة"),
    }),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={`row g-3 ${classes.LoginContainer}`}>
      <div
        className={`col-lg-6 col-md-12 ${classes.LoginBanner} bg-login-banner`}
      ></div>
      <div className="col-lg-6 col-md-12 d-flex justify-content-center">
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
          {step !== "otp" ? (
            <div className={`${classes.LoginForm}`}>
              <h3 className="fs-6 fw-bold title-text--1">انشاء حساب</h3>
              <p>ادخل المعلومات الخاصة بحسابك لاستقبال رمز OTP</p>
              <div className={`${classes.line}`}></div>
              <form onSubmit={formik.handleSubmit}>
                <div className={`${classes.formGroup} mb-2`}>
                  <label htmlFor="name" className="mb-2 fs-6 fw-medium">
                    الإسم
                  </label>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setName(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                        border: "1px solid #E1E2E6",
                      },
                    }}
                  />
                </div>
                <div className={`${classes.formGroup} mb-2`}>
                  <label htmlFor="email" className="mb-2 fs-6 fw-medium">
                    البريد الإلكتروني
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
                        border: "1px solid #E1E2E6",
                      },
                    }}
                  />
                </div>
                <div className={`${classes.formGroup} mb-2`}>
                  <label htmlFor="phone" className="mb-2 fs-6 fw-medium">
                    رقم الهاتف
                  </label>
                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    type="number"
                    value={formik.values.phone}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setPhone(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                        border: "1px solid #E1E2E6",
                      },
                    }}
                  />
                </div>

                <div className={`${classes.formGroup} mb-2`}>
                  <label htmlFor="password" className="mb-2 fs-6 fw-medium">
                    كلمة المرور
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
                        border: "1px solid #E1E2E6",
                      },
                    }}
                  />
                </div>

                <div className={`${classes.ddd} mt-2 text-center`}>
                  <span className={`${classes.nothaveaccount}`}>
                    لديك حساب بالفعل
                  </span>{" "}
                  <Link
                    to="/login"
                    className={`${classes.forgotPassword}`}
                    style={{ cursor: "pointer" }}
                  >
                    تسجيل الدخول
                  </Link>
                </div>
                <button
                  className={`${classes.SubmitBtn} mt-2`}
                  onClick={signinSubmit}
                  disabled={loading}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {loading ? <div className="loader"></div> : <p>ارسال</p>}
                </button>
              </form>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <OtpVerification email={email} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;

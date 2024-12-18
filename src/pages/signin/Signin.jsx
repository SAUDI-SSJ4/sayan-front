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

import logo from "../../assets/images/logo.png";
import { Button } from "rsuite";
import { WiMoonWaningCrescent3 } from "react-icons/wi";
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
    <div className={`row gx-3 ${classes.LoginContainer}`}>
      <div className={`col-lg-6 col-md-12 ${classes.LoginBanner} bg-login-banner`}>
       <img src={logo} className={`${classes.logo}`} />
        <div>
          <ul className={` ${classes.footerList}`}>
            <li>
              <Button>
                <WiMoonWaningCrescent3 />
              </Button>
            </li>
            <li><Link to="/" style={{textDecoration: 'none',color:"#fff"}}>منصة سيان</Link></li>
            <li><Link to="/terms" style={{textDecoration: 'none',color:"#fff"}}>الشروط والأحكام</Link></li>
            <li><Link to="/privacy" style={{textDecoration: 'none',color:"#fff"}}>سياسة الخصوصية</Link></li>
            <li><Link to="/student/signin" style={{textDecoration: 'none',color:"#fff"}}>الانضمام كطالب</Link></li>
          </ul>
        </div>
      </div>
     
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
              <h3 >انشاء حساب</h3>
              <p>ادخل المعلومات الخاصة بحسابك لاستقبال رمز OTP</p>
              <form onSubmit={formik.handleSubmit}>
                <div className={`${classes.formGroup} mb-2`}>
                  <label htmlFor="name" className="mb-2 fs-6 fw-medium">
                    إسم الاكاديمية <span style={{color: "red"}}>*</span>
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
                        
                        height:"48px"
                      },
                    }}
                  />
                </div>
                <div className={`${classes.formGroup} mb-2`}>
                  <label htmlFor="email" className="mb-2 fs-6 fw-medium">
                    البريد الإلكتروني <span style={{color: "red"}}>*</span>
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
                        
                        height:"48px"

                      },
                    }}
                  />
                </div>
                <div className={`${classes.formGroup} mb-2`}>
                  <label htmlFor="phone" className="mb-2 fs-6 fw-medium">
                    رقم الهاتف <span style={{color: "red"}}>*</span>
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
                        
                        height:"48px"

                      },
                    }}
                  />
                </div>

                <div className={`${classes.formGroup} mb-2`}>
                  <label htmlFor="password" className="mb-2 fs-6 fw-medium">
                    كلمة المرور <span style={{color: "red"}}>*</span>
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
                        
                        height:"48px"

                      },
                    }}
                  />
                </div>
                <div className={`${classes.formGroup} `}>
                <label htmlFor="profileImage" className="mb-2">
                  شعار الاكادمية <span style={{color: "red"}}>*</span>
                </label>
                <TextField
                  fullWidth
                  id="profileImage"
                  name="profileImage"
                  placeholder="اختر شعار الاكادمية"
                  value={formik.values.profileImage?.name || ''}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          component="label"
                          variant="text" 
                          sx={{
                            backgroundColor: '#F4F7FE',
                            color: '#2B3674',
                            '&:hover': {
                              backgroundColor: '#E6EAF8'
                            }
                          }}
                        >
                          رفع
                          <input 
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.target.files[0];
                              formik.setFieldValue("profileImage", file);
                            }}
                          />
                        </Button>
                      </InputAdornment>
                    ),
                    style: {
                      borderRadius: "10px",
                      height: "48px"
                    },
                  }}
                  error={formik.touched.profileImage && Boolean(formik.errors.profileImage)}
                  helperText={formik.touched.profileImage && formik.errors.profileImage}
                />
                </div>

                <button
                  className={`${classes.SubmitBtn} mt-4`}
                  onClick={signinSubmit}
                  disabled={loading}
                  style={{ display: "flex", justifyContent: "center",color:"#fff" }}
                >
                  {loading ? <div className="loader"></div> : <span>ارسال</span>}
                </button>
                
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
              </form>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <OtpVerification email={email} />
            </div>
          )}
          <div className={classes.copyright}>
          © 2023 جميع الحقوق محفوظة لمنصة سيان
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default Signin;

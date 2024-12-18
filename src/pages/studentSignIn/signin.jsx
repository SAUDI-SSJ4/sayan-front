import classes from "./signin.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GoogleIcon from "../../assets/icons/logo.svg";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
import { Button as RBtn } from "rsuite";

import Cookies from "js-cookie";
import { WiMoonWaningCrescent3 } from "react-icons/wi";

import logo from "../../assets/images/logo.png"
import { ButtonGroup } from "@mui/material";
import SearchIcon from "../../assets/icons/SearchIcon";

const StudentSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useNavigate();
  const Dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formData = {
    email,
    password,
  };
  console.log("test test")

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("بريد الكترونى خطأ").required("البريد الالكترونى مطلوب"),
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

  return (
    <div className={`row gx-3 ${classes.LoginContainer}`}>
      <div className={`${classes.LoginBanner} col-lg-6 col-md-12  bg-login-banner`}>
       <img src={logo} className={`${classes.logo}`} />
        <div>
          <ul className={` ${classes.footerList}`}>
            <li> 
              <RBtn>
                <WiMoonWaningCrescent3 />
              </RBtn>
            </li>
            <li>منصة سيان</li>
            <li>الشروط والأحكام</li>
            <li>سياسة الخصوصية</li>
            <li>اطلق اكاديميتك</li>
          </ul>
        </div>
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
          <div className={`${classes.LoginForm}  `}>
            <h2>إنشاء حساب جديد</h2>
            <p> ادخل المعلومات الخاصة بحسابك</p>
            <form onSubmit={formik.handleSubmit}>
              <div className={`${classes.formGroup} `}>
                <label htmlFor="name" className="mb-2">
                  اسم الطالب <span style={{color: "red"}}>*</span>
                </label>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  type="text"
                  placeholder="ادخل اسم الطالب"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      height: "48px"
                    },
                  }}
                />
              </div>

              <div className={`${classes.formGroup} `}>
                <label htmlFor="phone" className="mb-2">
                  رقم الهاتف <span style={{color: "red"}}>*</span>
                </label>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone" 
                  type="tel"
                  placeholder="ادخل رقم الهاتف"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      height: "48px",
                    },
                  }}
                />
              </div>

              <div className={`${classes.formGroup} `}>
                <label htmlFor="email" className="mb-2">
                  البريد الإلكتروني <span style={{color: "red"}}>*</span>
                </label>
                <TextField
                  fullWidth
                  id="email" 
                  name="email"
                  type="email"
                  placeholder="ادخل البريد الإلكتروني"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      height: "48px",
                    },
                  }}
                />
              </div>

              <div className={`${classes.formGroup} `}>
                <label htmlFor="password" className="mb-2">
                  كلمة المرور <span style={{color: "red"}}>*</span>
                </label>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="ادخل كلمة المرور"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
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
                      height: "48px"
                    },
                  }}
                />
              </div>

              <div className={`${classes.formGroup} `}>
                <label htmlFor="profileImage" className="mb-2">
                  الصورة الشخصية <span style={{color: "red"}}>*</span>
                </label>
                <TextField
                  fullWidth
                  id="profileImage"
                  name="profileImage"
                  placeholder="اختر صورة شخصية"
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

              <Toaster />
              
              <button
                className={`${classes.SubmitBtn} mt-4`}
                style={{ display: "flex", justifyContent: "center" }}
                type="submit"
              >
                {loading ? <div className="loader"></div> : <>إنشاء حساب</>}
              </button>

              <div className={`${classes.ddd} mt-3 text-center`}>
                <span className={`${classes.nothaveaccount}`}>لديك حساب بالفعل؟</span>{" "}
                <Link
                  to="/student/login"
                  className={`${classes.forgotPassword}`}
                  style={{ cursor: "pointer" }}
                >
                  تسجيل الدخول
                </Link>
              </div>
            </form>
            <div className={classes.copyright}>
          © 2023 جميع الحقوق محفوظة لمنصة سيان
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignIn;

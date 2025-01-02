import classes from "./signin.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button as RBtn } from "rsuite";
import { WiMoonWaningCrescent3 } from "react-icons/wi";
import logo from "../../assets/images/logo.png";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../../utils/apis/client/student";
import Cookies from "js-cookie";
import { useToast } from "../../utils/hooks/useToast";
import OtpVerification from "../signin/OtpVerification";

const StudentSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isRegisterDone, setIsRegisterDone] = useState(false);



  const navigate = useNavigate();
  const { success, error } = useToast();

  // Get the step from URL params


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      image: "",
      rememberMe: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("اسم الطالب مطلوب"),
      phone: Yup.string().min(10, "رقم الهاتف يجب ان يكون 10 ارقام")
        .required("رقم الهاتف مطلوب"),
      email: Yup.string()
        .email("بريد الكتروني خطأ")
        .required("البريد الالكتروني مطلوب"),
      password: Yup.string().required("كلمة المرور مطلوبة"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("image", values.image);
      mutation.mutateAsync(formData);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const textFieldProps = {
    fullWidth: true,
    InputProps: {
      style: {
        borderRadius: "10px",
        height: "48px",
      },
    },
  };

  const mutation = useMutation({
    mutationFn: (data) => postRegister(data),
    onSuccess: ({ data }) => {
      setUserEmail(data.email);
      setIsRegisterDone(true);
      success(data.message);
    },
    onError: (error) => {
      console.log(error);
      error(error.response.data.message + "❌");
    },
  });

  return (
    <div className={`row gx-3 ${classes.LoginContainer}`}>
      <div className={`${classes.LoginBanner} col-lg-6 col-md-12 bg-login-banner`}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <ul className={classes.footerList}>
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

      <div className="col-lg-6 col-md-12 d-flex justify-content-center">
        <div className="login-form--1" style={{ maxWidth: "100%", padding: "20px", paddingBottom: "100px" }}>
          <div className={classes.goBack}>
            <Link to="/" className="text-decoration-none">
              العودة للصفحة الرئيسية <ArrowBackIosIcon />
            </Link>
          </div>
          {
            !isRegisterDone && !userEmail ? (
              <div className={classes.LoginForm}>
                <h2>إنشاء حساب جديد</h2>
                <p>ادخل المعلومات الخاصة بحسابك</p>
                <form onSubmit={formik.handleSubmit}>
                  {[
                    { id: "name", label: "اسم الطالب", placeholder: "ادخل اسم الطالب" },
                    { id: "phone", label: "رقم الهاتف", placeholder: "ادخل رقم الهاتف", type: "tel" },
                    { id: "email", label: "البريد الإلكتروني", placeholder: "ادخل البريد الإلكتروني", type: "email" },
                  ].map(({ id, label, placeholder, type = "text" }) => (
                    <div key={id} className={classes.formGroup}>
                      <label htmlFor={id} className="mb-2">
                        {label} <span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        {...textFieldProps}
                        id={id}
                        name={id}
                        type={type}
                        placeholder={placeholder}
                        value={formik.values[id]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[id] && Boolean(formik.errors[id])}
                        helperText={formik.touched[id] && formik.errors[id]}
                      />
                    </div>
                  ))}

                  <div className={classes.formGroup}>
                    <label htmlFor="password" className="mb-2">
                      كلمة المرور <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                      {...textFieldProps}
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
                        ...textFieldProps.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>

                  <div className={classes.formGroup}>
                    <label htmlFor="image" className="mb-2">
                      الصورة الشخصية <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                      {...textFieldProps}
                      id="image"
                      name="image"
                      placeholder="اختر صورة شخصية"
                      value={formik.values.image?.name || ""}
                      InputProps={{
                        ...textFieldProps.InputProps,
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              component="label"
                              variant="text"
                              sx={{
                                backgroundColor: "#F4F7FE",
                                color: "#2B3674",
                                "&:hover": {
                                  backgroundColor: "#E6EAF8",
                                },
                              }}
                            >
                              رفع
                              <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(event) => {
                                  const file = event.target.files[0];
                                  formik.setFieldValue("image", file);
                                }}
                              />
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      error={formik.touched.image && Boolean(formik.errors.image)}
                      helperText={formik.touched.image && formik.errors.image}
                    />
                  </div>

                  <div className={`${classes.copyright} p-1`}>
                    © 2023 جميع الحقوق محفوظة لمنصة سيان
                  </div>


                  <button type="submit" className={`${classes.SubmitBtn} mt-2`}
                    style={{ display: "flex", justifyContent: "center" }}>
                    {mutation.isPending ? (
                      <div className="loader"></div>
                    ) : (
                      "تسجيل الدخول"
                    )}
                  </button>


                  <div className={`${classes.ddd} mt-3 text-center`}>
                    <span className={classes.nothaveaccount}>لديك حساب بالفعل؟</span>{" "}
                    <Link to="/student/login" className={classes.forgotPassword}>
                      تسجيل الدخول
                    </Link>
                  </div>
                </form>
              </div>
            ) : (<div className="d-flex justify-content-center align-items-center">
              <OtpVerification email={userEmail} />
            </div>)
          }


        </div>
      </div>
    </div>
  );
};

export default StudentSignIn;

import classes from "./login.module.scss";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { AcademyFormContener } from "./AcademyFormContener";
import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordAPI,
  postLoginAPI,
  resetPasswordAPI,
} from "../../../utils/apis/client";
import OtpVerification from "../../signin/OtpVerification";

const AcademyLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showSendOtp, setShowSendOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const formData = {
    email,
    password,
  };

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
  const toggleConfirmPasswordPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const mutation = useMutation({
    mutationFn: (data) => postLoginAPI(data),
    onSuccess: (response) => {
      handleAccountNavgation(response.data);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "خطأ");
    },
  });

  const logInFunction = async () => {
    if (!formData.email || !formData.password) return;
    await mutation.mutateAsync(formData);
  };

  const handleAccountNavgation = ({ type, access_token }) => {
    if (type === "academy") {
      Cookies.set("academy_token", access_token, { expires: 7 });
      Cookies.set("is_login", true, { expires: 7 });
      Cookies.set("login_type", "academy", { expires: 7 });
      toast.success("تم تسجيل الدخول بنجاح 🎉");
      location.replace("/academy");
    } else {
      Cookies.set("student_token", access_token, { expires: 7 });
      Cookies.set("is_login", true, { expires: 7 });
      Cookies.set("login_type", "student", { expires: 7 });
      toast.success("تم تسجيل الدخول بنجاح 🎉");
      location.replace("/student/dashboard");
    }
  };

  const forgotPasswordMutation = useMutation({
    mutationFn: (data) => forgotPasswordAPI(data),
    onSuccess: (response) => {
      toast.success(response.data?.message);
      setShowForgotPassword(false);
      setShowSendOtp(true);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("يرجى إدخال البريد الإلكتروني");
      return;
    }

    const newFormData = new FormData();
    newFormData.append("email", email);
    try {
      await forgotPasswordMutation.mutateAsync(newFormData);
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور");
    }
  };

  const resetPasswordMutation = useMutation({
    mutationFn: (data) => resetPasswordAPI(data),
    onSuccess: (response) => {
      toast.success(response.data?.message);
      setShowResetPassword(false);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("يرجى إدخال كلمة المرور");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }
    const newFormData = new FormData();
    newFormData.append("email", email);
    newFormData.append("password", password);
    newFormData.append("password_confirmation", confirmPassword);
    newFormData.append("reset_token", resetToken);
    try {
      await resetPasswordMutation.mutateAsync(newFormData);
    } catch (error) {
      toast.error("حدث خطأ أثناء إعادة تعيين كلمة المرور");
    }
  };

  return (
    <AcademyFormContener showForgotPassword={showForgotPassword}>
      <div className={`${classes.LoginForm}`}>
        {showSendOtp ? (
          <div className={classes.OtpVerification}>
            <OtpVerification
              email={email}
              disableRedirect
              setResetToken={setResetToken}
              setShowSendOtp={setShowSendOtp}
              setShowResetPassword={setShowResetPassword}
            />
          </div>
        ) : showResetPassword ? (
          <>
            <h3>إعادة تعيين كلمة المرور</h3>
            <p>ادخل المعلومات المطلوبة</p>
            <form
              onSubmit={handleResetPassword}
              className={classes.forgotPasswordForm}
            >
              <TextField
                fullWidth
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="كلمة المرور الجديدة"
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
                sx={{
                  "& .MuiInputBase-input": {
                    textAlign: "right",
                    boxShadow: "none",
                  },
                }}
              />
              <TextField
                fullWidth
                id="confirm_password"
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder="إعادة ادخال كلمة المرور"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleConfirmPasswordPasswordVisibility}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    borderRadius: "10px",
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    textAlign: "right",
                    boxShadow: "none",
                  },
                }}
              />

              <div className="mt-3 d-flex gap-2">
                <button
                  type="submit"
                  disabled={forgotPasswordMutation.isPending}
                  className={classes.SubmitBtn}
                >
                  {mutation.isPending ? (
                    <div className="loader"></div>
                  ) : (
                    <span className={classes.BtnText}>إرسال</span>
                  )}
                </button>
                <button
                  type="button"
                  className={classes.cancelBtn}
                  onClick={() => setShowResetPassword(false)}
                >
                  إلغاء
                </button>
              </div>
            </form>
            <p className={classes.copyright}>
              © 2023 جميع الحقوق محفوظة لمنصة سيان
            </p>
          </>
        ) : (
          <>
            <h3>
              {showForgotPassword ? "إعادة تعيين كلمة المرور" : "تسجيل الدخول"}
            </h3>
            <p>ادخل المعلومات الخاصة بحسابك</p>
            <div className={`${classes.divider}`}></div>

            {showForgotPassword ? (
              <form
                onSubmit={handleForgotPassword}
                className={classes.forgotPasswordForm}
              >
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      border: "none",
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      textAlign: "right",
                      boxShadow: "none",
                    },
                  }}
                />
                <div className="mt-3 d-flex gap-2">
                  <button
                    type="submit"
                    disabled={forgotPasswordMutation.isPending}
                    className={classes.SubmitBtn}
                  >
                    {mutation.isPending ? (
                      <div className="loader"></div>
                    ) : (
                      <span className={classes.BtnText}>إرسال</span>
                    )}
                  </button>
                  <button
                    type="button"
                    className={classes.cancelBtn}
                    onClick={() => setShowForgotPassword(false)}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <div className={`${classes.formGroup} `}>
                  <label
                    htmlFor="email"
                    className="mb-2 font-bold font-use"
                    style={{ fontWeight: "bold" }}
                  >
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
                        border: "0.5px solid #E1E2E6",
                      },
                    }}
                  />
                </div>
                <div className={`${classes.formGroup}`}>
                  <label
                    htmlFor="password"
                    className="mb-2"
                    style={{ fontWeight: "bold" }}
                  >
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
                  {mutation.isPending ? (
                    <div className="loader"></div>
                  ) : (
                    <p className={classes.BtnText}> تسجيل الدخول</p>
                  )}
                </button>

                <div className={`${classes.ddd} mt-4 flex gap-2`}>
                  <span className={`${classes.nothaveaccount}`}>
                    ليس لديك حساب؟
                  </span>{" "}
                  <Link
                    to="/signin"
                    className={`${classes.forgotPassword}`}
                    style={{ cursor: "pointer" }}
                  >
                    إنشاء حساب أكاديمية
                  </Link>
                  <p>أو</p>
                  <Link
                    to="/student/signin"
                    className={`${classes.forgotPassword}`}
                    style={{ cursor: "pointer" }}
                  >
                    إنشاء حساب طالب
                  </Link>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </AcademyFormContener>
  );
};

export default AcademyLogin;

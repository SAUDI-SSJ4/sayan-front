import classes from "./signin.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../../utils/apis/client/student";
import { useToast } from "../../utils/hooks/useToast";
import OtpVerification from "../signin/OtpVerification";

const StudentSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isRegisterDone, setIsRegisterDone] = useState(false);
  console.log("email: ", userEmail);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    image: null
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { success, error } = useToast();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = "اسم الطالب مطلوب";
    if (!formData.phone) newErrors.phone = "رقم الهاتف مطلوب";
    else if (formData.phone.length < 10) newErrors.phone = "رقم الهاتف يجب ان يكون 10 ارقام";
    if (!formData.email) newErrors.email = "البريد الالكتروني مطلوب";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "بريد الكتروني خطأ";
    if (!formData.password) newErrors.password = "كلمة المرور مطلوبة";
    if (!formData.confirmPassword) newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "كلمة المرور يجب ان تكون متطابقة";
    if (!formData.image) newErrors.image = "الصورة الشخصية مطلوبة";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
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
    mutationFn: (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("image", data.image);
      return postRegister(formData);
    },
    onSuccess: ({ data }) => {
      localStorage.setItem("otpEmail", data.email);
      setUserEmail(data.email);
      setIsRegisterDone(true);
      success(data.message);
    },
    onError: (err) => {
      error(err.response?.data?.message || "حدث خطأ أثناء التسجيل");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate(formData);
    }
  };

  return (
    <div className={`row gx-3 ${classes.LoginContainer}`}>
      <div className={`${classes.LoginBanner} col-lg-6 col-md-12 bg-login-banner`}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <ul className={classes.footerList}>
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
          
          {!isRegisterDone ? (
            <div className={classes.LoginForm}>
              <h2>إنشاء حساب جديد</h2>
              <p>ادخل المعلومات الخاصة بحسابك</p>
              <form onSubmit={handleSubmit}>
                {[
                  { id: "name", label: "اسم الطالب", placeholder: "ادخل اسم الطالب" },
                  { id: "phone", label: "رقم الهاتف", placeholder: "ادخل رقم الهاتف", type: "tel" },
                  { id: "email", label: "البريد الإلكتروني", placeholder: "ادخل البريد الإلكتروني", type: "email"},
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
                      value={formData[id]}
                      onChange={handleChange}
                      error={!!errors[id]}
                      helperText={errors[id]}
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
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
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
                  <label htmlFor="confirmPassword" className="mb-2">
                    تأكيد كلمة المرور <span style={{ color: "red" }}>*</span>
                  </label>
                  <TextField
                    {...textFieldProps}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="أعد إدخال كلمة المرور"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
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
                    value={formData.image?.name || ""}
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
                              onChange={handleFileChange}
                            />
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.image}
                    helperText={errors.image}
                  />
                </div>

                <div className={`${classes.copyright} p-1`}>
                  © 2023 جميع الحقوق محفوظة لمنصة سيان
                </div>

                <button 
                  type="submit" 
                  className={`${classes.SubmitBtn} mt-2`}
                  style={{ display: "flex", justifyContent: "center" }}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <div className="loader"></div>
                  ) : (
                    "التسجيل"
                  )}
                </button>

                <div className={`${classes.ddd} mt-3 text-center`}>
                  <span className={classes.nothaveaccount}>لديك حساب بالفعل؟</span>{" "}
                  <Link to="/login" className={classes.forgotPassword}>
                    تسجيل الدخول
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <OtpVerification email={userEmail} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentSignIn;
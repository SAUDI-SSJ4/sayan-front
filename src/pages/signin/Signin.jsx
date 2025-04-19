import classes from "./login.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import OtpVerification from "./OtpVerification";

import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../../utils/apis/client/academy";
import { useToast } from "../../utils/hooks/useToast";
import logo from "../../assets/images/logo.png";
import { Button, InputAdornment } from '@mui/material';


const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isRegisterDone, setIsRegisterDone] = useState(false);


  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const { success, error } = useToast();

  const mutation = useMutation({
    mutationFn: (data) => postRegister(data),
    onSuccess: () => {
      setUserEmail(formik.values.email);
      setIsRegisterDone(true);
      success("تم ارسال الرمز الي بريدك الالكتروني الذي أدخلته");
    },
    onError: (err) => {
      error(err.response?.data?.message + "❌" || "حدث خطأ ما");
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: '',
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("العنوان مطلوب"),
      name: Yup.string().required("الإسم مطلوب"),
      email: Yup.string().email("بريد الكتروني خطأ").required("البريد الالكتروني مطلوب"),
      phone: Yup.string().required("رقم الهاتف مطلوب"),
      password: Yup.string().required("كلمة السر مطلوبة"),
      image: Yup.mixed().required("شعار الاكادمية مطلوب"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'كلمات المرور غير متطابقة')
    .required('يجب تأكيد كلمة المرور')
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("image", values.image);
      // console.log(values)
      mutation.mutate(formData);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`row gx-3 ${classes.LoginContainer}`}>
      <div className={`col-lg-6 col-md-12 ${classes.LoginBanner} bg-login-banner`}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <div>
          <ul className={classes.footerList}>
            <li>

            </li>
            <li><Link to="/" className="text-white text-decoration-none">منصة سيان</Link></li>
            <li><Link to="/terms" className="text-white text-decoration-none">الشروط والأحكام</Link></li>
            <li><Link to="/privacy" className="text-white text-decoration-none">سياسة الخصوصية</Link></li>
            <li><Link to="/student/signin" className="text-white text-decoration-none">الانضمام كطالب</Link></li>
          </ul>
        </div>
      </div>

      <div className="col-lg-6 col-md-12 d-flex justify-content-center">
        <div className="login-form--1" style={{ maxWidth: "100%", paddingInline: "20px", paddingBottom: "100px" }}>
          <div className={classes.goBack}>
            <Link to="/" className="text-decoration-none">
              العودة للصفحة الرئيسية <ArrowBackIosIcon />
            </Link>
          </div>

          {!isRegisterDone && !userEmail ? (
            <div className={classes.LoginForm}>
              <h3>انشاء حساب</h3>
              <p>ادخل المعلومات الخاصة بحسابك لاستقبال رمز OTP</p>

              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
                <div className={`${classes.formGroup} mb-2`}>
                  <label className="mb-2 font-use font-bold" htmlFor="title">إسم الاكاديمية <span style={{ color: "red" }}>*</span></label>
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    type="text"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    InputProps={{ style: { borderRadius: "10px", height: "48px" } }}
                  />
                </div>

                {/* <div className={`${classes.formGroup} mb-2`}>
                  <label className="mb-2 font-use font-bold" htmlFor="name">الاسم <span style={{ color: "red" }}>*</span></label>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    InputProps={{ style: { borderRadius: "10px", height: "48px" } }}
                  />
                </div> */}

                <div className={`${classes.formGroup} mb-2`}>
                  <label className="mb-2 font-use font-bold" htmlFor="email">البريد الإلكتروني <span style={{ color: "red" }}>*</span></label>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{ style: { borderRadius: "10px", height: "48px" } }}
                  />
                </div>

                <div className={`${classes.formGroup} mb-2`}>
                  <label className="mb-2 font-use font-bold" htmlFor="phone">رقم الهاتف <span style={{ color: "red" }}>*</span></label>
                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    type="text"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    InputProps={{ style: { borderRadius: "10px", height: "48px" } }}
                  />
                </div>

                <div className={`${classes.formGroup} mb-2`}>
                  <label className="mb-2 font-use font-bold" htmlFor="password">كلمة المرور <span style={{ color: "red" }}>*</span></label>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
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
                      style: { borderRadius: "10px", height: "48px" },
                    }}
                  />
                </div>

                <div className={`${classes.formGroup} mb-2`}>
  <label className="mb-2 font-use font-bold" htmlFor="confirmPassword">
    تأكيد كلمة المرور <span style={{ color: "red" }}>*</span>
  </label>
  <TextField
    fullWidth
    id="confirmPassword"
    name="confirmPassword"
    type={showConfirmPassword ? "text" : "password"} // Separate state for confirm password visibility
    value={formik.values.confirmPassword}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      ),
      style: { borderRadius: "10px", height: "48px" },
    }}
  />
</div>








                <div className={`${classes.formGroup} mb-2`}>
                  <label className="mb-2 font-use font-bold" htmlFor="image">شعار الاكادمية <span style={{ color: "red" }}>*</span></label>
                  <TextField
                    fullWidth
                    id="image"
                    name="image"
                    placeholder="اختر شعار الاكادمية"
                    value={formik.values.image?.name || ''}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            component="label"
                            variant="text"
                            style={{ backgroundColor: '#F4F7FE', color: '#2B3674' }}
                          >
                            رفع
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={(event) => { formik.setFieldValue("image", event.target.files[0]) }}
                            />
                          </Button>
                        </InputAdornment>
                      ),
                      style: { borderRadius: "10px", height: "48px" },
                    }}
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helperText={formik.touched.image && formik.errors.image}
                  />
                </div>

                <button
                  type="submit"
                  className={`${classes.SubmitBtn} mt-4`}
                  disabled={mutation.isPending}
                  style={{ display: "flex", justifyContent: "center", color: "#fff" }}
                >
                  {mutation.isPending ? <div className="loader"></div> : <span>ارسال</span>}
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
              <OtpVerification email={userEmail} />
            </div>
          )}
          {/* <div className={classes.copyright}>
              © 2023 جميع الحقوق محفوظة لمنصة سيان
          </div> */}
        </div>

      </div>

    </div>
  );
};

export default Signin;

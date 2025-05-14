import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../../utils/apis/client/academy";
import { useToast } from "../../utils/hooks/useToast";
import OtpVerification from "./OtpVerification";
import styles from "../../styles/auth.module.scss";

// Material UI imports
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, InputAdornment } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SchoolIcon from "@mui/icons-material/School";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isRegisterDone, setIsRegisterDone] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { success, error } = useToast();

  const mutation = useMutation({
    mutationFn: (data) => postRegister(data),
    onSuccess: () => {
      setUserEmail(formik.values.email);
      setIsRegisterDone(true);
      success("تم ارسال الرمز الي بريدك الالكتروني الذي أدخلته");
    },
    onError: (err) => {
      error(err.response?.data?.message || "حدث خطأ ما");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("الإسم مطلوب"),
      email: Yup.string()
        .email("بريد الكتروني خطأ")
        .required("البريد الالكتروني مطلوب"),
      phone: Yup.string().required("رقم الهاتف مطلوب"),
      password: Yup.string().required("كلمة السر مطلوبة"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "كلمات المرور غير متطابقة")
        .required("يجب تأكيد كلمة المرور"),
      image: Yup.mixed().required("شعار الاكادمية مطلوب"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("image", values.image);
      mutation.mutate(formData);
    },
  });

  const handleResendOtp = async () => {
    try {
      const formData = new FormData();
      formData.append("email", userEmail);
      await postRegister(formData);
      success("تم إرسال رمز جديد إلى بريدك الإلكتروني");
    } catch (err) {
      error("حدث خطأ أثناء إرسال الرمز");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.formSection}>
          <Link to="/" className={styles.backLink}>
            <ArrowBackIosIcon sx={{ fontSize: "14px" }} />
            العودة للصفحة الرئيسية
          </Link>

          {!isRegisterDone ? (
            <>
              <div className={styles.formHeader}>
                <SchoolIcon sx={{ fontSize: 40, color: "#0062FF" }} />
                <h3 className={styles.formTitle}>تسجيل حساب أكاديمية</h3>
                <p className={styles.formSubtitle}>
                  ادخل المعلومات الخاصة بالأكاديمية لاستقبال رمز التفعيل
                </p>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">
                    إسم الاكاديمية <span className={styles.required}>*</span>
                  </label>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    InputProps={{
                      style: { borderRadius: "12px" },
                    }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">
                    البريد الإلكتروني <span className={styles.required}>*</span>
                  </label>
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
                    InputProps={{
                      style: { borderRadius: "12px" },
                    }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">
                    رقم الهاتف <span className={styles.required}>*</span>
                  </label>
                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    InputProps={{
                      style: { borderRadius: "12px" },
                    }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">
                    كلمة المرور <span className={styles.required}>*</span>
                  </label>
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
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: { borderRadius: "12px" },
                    }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">
                    تأكيد كلمة المرور <span className={styles.required}>*</span>
                  </label>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: { borderRadius: "12px" },
                    }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="image">
                    شعار الاكادمية <span className={styles.required}>*</span>
                  </label>
                  <TextField
                    fullWidth
                    id="image"
                    name="image"
                    value={formik.values.image?.name || ""}
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helperText={formik.touched.image && formik.errors.image}
                    InputProps={{
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
                                formik.setFieldValue(
                                  "image",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                          </Button>
                        </InputAdornment>
                      ),
                      style: { borderRadius: "12px" },
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <div className="loader"></div>
                  ) : (
                    "إنشاء حساب الأكاديمية"
                  )}
                </button>

                <div className={styles.linkText}>
                  لديك حساب بالفعل؟{" "}
                  <Link to="/login">تسجيل الدخول</Link>
                </div>

                <div className={styles.switchAccountType}>
                  <p>هل تريد التسجيل كطالب؟</p>
                  <Link to="/student/signin" className={styles.switchLink}>
                    إنشاء حساب طالب
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <OtpVerification
              email={formik.values.email}
              onResendOtp={async () => {
                try {
                  const formData = new FormData();
                  formData.append("email", formik.values.email);
                  await postRegister(formData);
                  success("تم إرسال رمز جديد إلى بريدك الإلكتروني");
                } catch (err) {
                  error("حدث خطأ أثناء إرسال الرمز");
                }
              }}
              onBack={() => setIsRegisterDone(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;

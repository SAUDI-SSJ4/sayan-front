import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../../utils/apis/client/student";
import { useToast } from "../../utils/hooks/useToast";
import OtpVerification from "../signin/OtpVerification";
import styles from "../../styles/auth.module.scss";

// Material UI imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PersonIcon from "@mui/icons-material/Person";

const StudentSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterDone, setIsRegisterDone] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const { success, error } = useToast();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "اسم الطالب مطلوب";
    if (!formData.phone) newErrors.phone = "رقم الهاتف مطلوب";
    else if (formData.phone.length < 10)
      newErrors.phone = "رقم الهاتف يجب ان يكون 10 ارقام";
    if (!formData.email) newErrors.email = "البريد الالكتروني مطلوب";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "بريد الكتروني خطأ";
    if (!formData.password) newErrors.password = "كلمة المرور مطلوبة";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "كلمة المرور يجب ان تكون متطابقة";
    if (!formData.image) newErrors.image = "الصورة الشخصية مطلوبة";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
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
                <PersonIcon sx={{ fontSize: 40, color: "#0062FF" }} />
                <h3 className={styles.formTitle}>تسجيل حساب طالب</h3>
                <p className={styles.formSubtitle}>
                  ادخل المعلومات الخاصة بك للتسجيل كطالب
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">
                    اسم الطالب <span className={styles.required}>*</span>
                  </label>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
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
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
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
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
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
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
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
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
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
                  <label htmlFor="image">
                    الصورة الشخصية <span className={styles.required}>*</span>
                  </label>
                  <TextField
                    fullWidth
                    id="image"
                    name="image"
                    value={formData.image?.name || ""}
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
                              onChange={handleFileChange}
                            />
                          </Button>
                        </InputAdornment>
                      ),
                      style: { borderRadius: "12px" },
                    }}
                    error={!!errors.image}
                    helperText={errors.image}
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
                    "إنشاء حساب طالب"
                  )}
                </button>

                <div className={styles.linkText}>
                  لديك حساب بالفعل؟{" "}
                  <Link to="/login">تسجيل الدخول</Link>
                </div>

                <div className={styles.switchAccountType}>
                  <p>هل تريد التسجيل كأكاديمية؟</p>
                  <Link to="/signin" className={styles.switchLink}>
                    إنشاء حساب أكاديمية
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <OtpVerification
              email={formData.email}
              onResendOtp={async () => {
                try {
                  const resendData = new FormData();
                  resendData.append("email", formData.email);
                  await postRegister(resendData);
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

export default StudentSignIn;

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axiosInstance from "../../../axios";
import OtpInput from "./OtpInput";
import styles from "../../styles/auth.module.scss";
import logo from "../../assets/images/logo.png";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "";

  const otpValidationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل")
      .required("كلمة المرور الجديدة مطلوبة"),
  });

  const handleEmailSubmit = async (values) => {
    setLoading(true);
    try {
      await axiosInstance.post("/otp", { email: values.email });
      setSearchParams({ step: "otp" });
      setEmail(values.email);
      toast.success("تم إرسال رمز التحقق إلى بريدك الإلكتروني.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "فشل في إرسال رمز التحقق.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (values) => {
    setLoading(true);
    try {
      const otpCode = otp.join("");
      await axiosInstance.post("/verify", {
        otp: otpCode,
        newPassword: values.newPassword,
        email: email,
      });
      toast.success("تم إعادة تعيين كلمة المرور بنجاح.");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "فشل في التحقق من رمز التحقق.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleOtpBackspace = (index) => {
    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.banner} style={{ backgroundImage: "url('/images/forgot-password-bg.jpg')" }}>
          <div className={styles.logo}>
            <img src={logo} alt="Sayan Logo" />
          </div>
          <div className={styles.footerLinks}>
            <ul>
              <li><Link to="/">منصة سيان</Link></li>
              <li><Link to="/terms">الشروط والأحكام</Link></li>
              <li><Link to="/privacy">سياسة الخصوصية</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.formSection}>
          <Link to="/" className={styles.backLink}>
            <ArrowBackIosIcon sx={{ fontSize: "14px" }} />
            العودة للصفحة الرئيسية
          </Link>

          {step !== "otp" ? (
            <>
              <h3 className={styles.formTitle}>نسيت كلمة المرور</h3>
              <p className={styles.formSubtitle}>
                ادخل بريدك الالكتروني لارسال رمز التحقق
              </p>

              <Formik
                initialValues={{ email: email || "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("بريد الكترونى خطأ")
                    .required("البريد الالكترونى مطلوب"),
                })}
                onSubmit={handleEmailSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className={styles.formGroup}>
                      <Field
                        type="email"
                        name="email"
                        placeholder="البريد الإلكتروني"
                        className={styles.formInput}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={styles.errorText}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || isSubmitting}
                      className={styles.submitButton}
                    >
                      {loading ? (
                        <div className="loader"></div>
                      ) : (
                        "ارسال رمز التحقق"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <>
              <h3 className={styles.formTitle}>أدخل رمز التحقق</h3>
              <p className={styles.formSubtitle}>
                أدخل رمز التحقق الذي تم إرساله إلى بريدك الإلكتروني وكلمة مرور جديدة
              </p>

              <Formik
                initialValues={{ newPassword: "" }}
                validationSchema={otpValidationSchema}
                onSubmit={handleOtpSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className={styles.otpGroup}>
                      {otp.map((digit, index) => (
                        <OtpInput
                          key={index}
                          value={digit}
                          onChange={(value) => handleOtpChange(value, index)}
                          onBackspace={() => handleOtpBackspace(index)}
                          index={index}
                        />
                      ))}
                    </div>

                    <div className={styles.formGroup}>
                      <Field
                        type="password"
                        name="newPassword"
                        placeholder="كلمة المرور الجديدة"
                        className={styles.formInput}
                      />
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className={styles.errorText}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || isSubmitting}
                      className={styles.submitButton}
                    >
                      {loading ? (
                        <div className="loader"></div>
                      ) : (
                        "اعادة تعيين كلمة المرور"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEmailSubmit({ email })}
                      disabled={loading}
                      className={`${styles.submitButton} ${styles.mt2}`}
                      style={{
                        background: "transparent",
                        border: `1px solid ${styles.borderColor}`,
                        color: styles.textSecondary,
                      }}
                    >
                      اعادة ارسال رمز التحقق
                    </button>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

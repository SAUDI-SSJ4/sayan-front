import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { postVerify } from "../../utils/apis/client/student";
import OtpInput from "./OtpInput";
import styles from "../../styles/auth.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CircularProgress from "@mui/material/CircularProgress";

const OtpVerification = ({
  email,
  disableRedirect,
  setResetToken,
  setShowResetPassword,
  setShowSendOtp,
  onResendOtp,
  onBack,
}) => {
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = async () => {
    if (!canResend || isResending) return;
    
    try {
      setIsResending(true);
      if (onResendOtp) {
        await onResendOtp();
        toast.success("تم إرسال رمز جديد إلى بريدك الإلكتروني");
        setTimer(60);
        setCanResend(false);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الرمز");
    } finally {
      setIsResending(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: otpValues.join(""),
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(6, "الرمز يجب أن يكون مكون من 6 أرقام")
        .required("الرمز مطلوب"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await postVerify({ otp: values.otp, email });
        if (response.status === 200) {
          if (!disableRedirect) {
            navigate("/login");
          }
          if (response.data?.data.reset_token) {
            setResetToken(response.data?.data.reset_token);
            setShowResetPassword(true);
            setShowSendOtp(false);
          }
          toast.success("تم التأكيد بنجاح");
          localStorage.clear("otpEmail");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "حدث خطأ في التحقق من الرمز");
      }
    },
  });

  const handleOtpChange = (val, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = val;
    setOtpValues(newOtpValues);
    formik.setFieldValue("otp", newOtpValues.join(""));
  };

  const handleBackspace = (index) => {
    if (index >= 0) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);
      formik.setFieldValue("otp", newOtpValues.join(""));
    }
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>تأكيد الرمز</h3>
        <p className={styles.formSubtitle}>
          أدخل الرمز المكون من 6 أرقام الذي تم إرساله إلى
          <br />
          <strong style={{ color: "#0062FF" }}>{email}</strong>
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        {onBack && (
          <div 
            onClick={onBack} 
            className={styles.backLink} 
            style={{ 
              cursor: 'pointer', 
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              color: '#0062FF',
              fontSize: '14px',
              fontWeight: '500',
              gap: '4px'
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: "14px" }} />
            <span>العودة للصفحة الرئيسية</span>
          </div>
        )}

        <div className={styles.otpGroup}>
          {[...otpValues].reverse().map((value, index) => (
            <OtpInput
              key={index}
              value={value}
              index={otpValues.length - 1 - index}
              onChange={handleOtpChange}
              onBackspace={handleBackspace}
            />
          ))}
        </div>

        {formik.errors.otp && formik.touched.otp && (
          <div className={styles.errorText}>{formik.errors.otp}</div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={formik.isSubmitting}
          style={{
            backgroundColor: "#0062FF",
            padding: "12px 24px",
            borderRadius: "8px",
            width: "100%",
            color: "white",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
          {formik.isSubmitting ? <div className="loader"></div> : "تأكيد الرمز"}
        </button>

        <div className={styles.resendSection}>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={!canResend || isResending}
            className={`${styles.resendButton} ${isResending ? styles.resending : ''}`}
          >
            {isResending ? (
              <CircularProgress size={16} color="inherit" />
            ) : canResend ? (
              "إعادة إرسال الرمز"
            ) : (
              `إعادة الإرسال بعد ${timer} ثانية`
            )}
          </button>
        </div>

        <div className={styles.copyrightText} style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          color: '#666',
          fontSize: '14px'
        }}>
          © 2025 جميع الحقوق محفوظة لمنصة سيان
        </div>
      </form>
    </div>
  );
};

export default OtpVerification;

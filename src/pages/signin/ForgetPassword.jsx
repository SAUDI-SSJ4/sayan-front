import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import OtpInput from "./OtpInput"; // Assuming this is your OtpInput component
import axiosInstance from "../../../axios"; // Adjust this path as needed
import { toast } from "react-toastify";
import classes from "./login.module.scss";
import Button from "@mui/material/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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

  // Handle email submission
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

  // Handle OTP submission
  const handleOtpSubmit = async (values) => {
    setLoading(true);
    try {
      const otpCode = otp.join(""); // Join OTP digits into a single string
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

  // Handle OTP input changes
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  // Handle backspace in OTP input
  const handleOtpBackspace = (index) => {
    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp);
  };

  return (
    <div className={`${classes.LoginContainer}`}>
      <div className="row vh-100 g-3">
        <div className={`col-lg-6 col-md-12 ${classes.LoginBanner} bg-login-banner`}></div>
        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
          <div className={`${classes.LoginFormWrapper}`}>
            <div className={classes.goBack}>
              <Link to="/" className="text-decoration-none">
                العودة للصفحة الرئيسية <ArrowBackIosIcon />
              </Link>
            </div>

            {step != "otp" ? (
              <div className={`${classes.LoginForm}`}>
                <h3 className="fs-6 fw-bold title-text--1">نسيت كلمة المرور</h3>
                <p>ادخل بريدك الالكتروني لارسال رمز التحقق</p>
                <div className={classes.line}></div>
                <Formik
                  initialValues={{ email: email || "" }}
                  validationSchema={Yup.object({
                    email: Yup.string().email("بريد الكترونى خطأ").required("البريد الالكترونى مطلوب"),
                  })}
                  onSubmit={handleEmailSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-3">
                        <Field
                          type="email"
                          name="email"
                          placeholder="البريد الإلكتروني"
                          className="form-control"
                          aria-label="البريد الإلكتروني"
                        />
                        <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                      </div>
                      <button
                        disabled={loading || isSubmitting}
                        className={`${classes.SubmitBtn} mt-2`}
                        style={{ display: "flex", justifyContent: "center" }}
                        type="submit"
                      >
                        {loading ? <div className="loader"></div> : <p> ارسال رمز التحقق</p>}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            ) : (
              <div className={`${classes.LoginForm} w-50 mx-auto`}>
                <h3 className="fs-6 fw-bold">أدخل رمز التحقق</h3>
                <p>أدخل رمز التحقق الذي تم إرساله إلى بريدك الإلكتروني وكلمة مرور جديدة</p>
                <div className={classes.line}></div>
                <Formik
                  initialValues={{ newPassword: "" }}
                  validationSchema={otpValidationSchema}
                  onSubmit={handleOtpSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="text-center mb-3"></div>
                      <div dir="ltr" className="d-flex justify-content-center mb-3">
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
                      <div className="mb-3">
                        <Field
                          type="password"
                          name="newPassword"
                          placeholder="كلمة المرور الجديدة"
                          className="form-control"
                          aria-label="كلمة المرور الجديدة"
                          style={{ imeMode: "disabled" }}
                        />
                        <ErrorMessage name="newPassword" component="div" className="text-danger mt-1" />
                      </div>
                      <button
                        disabled={loading || isSubmitting}
                        className={`${classes.SubmitBtn} mt-2`}
                        style={{ display: "flex", justifyContent: "center" }}
                        type="submit"
                      >
                        {loading ? <div className="loader"></div> : <p> اعادة تعيين كلمة المرور</p>}
                      </button>
                    </Form>
                  )}
                </Formik>
                <Button onClick={() => handleEmailSubmit({ email })} disabled={loading} className="mt-3">
                  اعادة ارسال رمز التحقق
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

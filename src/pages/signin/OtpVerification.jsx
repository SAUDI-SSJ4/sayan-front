import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import * as Yup from "yup";
import classes from "./login.module.scss";
import OtpInput from "./OtpInput";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postVerify } from "../../utils/apis/client/student";

const OtpVerification = ({ email }) => {
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));

  const formik = useFormik({
    initialValues: {
      otp: otpValues.join(""),
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(6, "الرمز يجب أن يكون مكون من 6 أرقام")
        .required("الرمز مطلوب"),
    }),
    onSubmit: (values) => {
      formik.setSubmitting(true);
      postVerify({ otp: values.otp, email })
        .then((res) => {
          navigate("/student/login");
          toast.success("تم انشاء الحساب بنجاح");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        })
        .finally(() => {
          formik.setSubmitting(false);
        });
    },
  });

  const handleOtpChange = (val, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = val;
    setOtpValues(newOtpValues);
    formik.setFieldValue("otp", newOtpValues.join(""));
  };

  const handleBackspace = (index) => {
    if (index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
    <div className="w-50 d-flex flex-column justify-content-center align-items-start gap-3">
      <div className={`${classes.line}`}></div>
      <h3 className="fs-6 fw-bold  title-text--1">تأكيد الرمز</h3>
      <p>أدخل الرمز الذي أرسلناه إلى بريدك الإلكتروني</p>
      <form onSubmit={formik.handleSubmit}>
        <div
          dir="ltr"
          className=" d-flex justify-content-center align-items-center"
        >
          {otpValues.map((value, index) => (
            <OtpInput
              key={index}
              value={value}
              index={index}
              onChange={handleOtpChange}
              onBackspace={handleBackspace}
            />
          ))}
        </div>
        {formik.errors.otp && formik.touched.otp && (
          <div style={{ color: "red", marginTop: "8px" }}>
            {formik.errors.otp}
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={`${classes.SubmitBtn} mt-2`}
          disabled={formik.isSubmitting}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {formik.isSubmitting ? <div className="loader"></div> : "انشاء حسابي"}
        </Button>
      </form>
    </div>
  );
};

export default OtpVerification;

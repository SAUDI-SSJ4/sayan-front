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
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { AcademyFormContener } from "./AcademyFormContener";
import { useMutation } from "@tanstack/react-query";
import { postLoginAPI } from "../../../utils/apis/client";

const AcademyLogin = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      email: Yup.string().email("بريد الكترونى خطأ").required("البريد الالكترونى مطلوب"),
      password: Yup.string().required("كلمة السر مطلوبة"),
    }),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const mutation = useMutation({
    mutationFn: (data) => postLoginAPI(data),
    onSuccess: (response) => {
      handleAccountNavgation(response.data);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "خطأ");
    },
  });

  const logInFunction = async () => {
    if (!formData.email || !formData.password) return;
    await mutation.mutateAsync(formData);
  };

  const handleAccountNavgation = ({ type, access_token }) => {
    if (type === "academy") {
      Cookies.set("academy_token", access_token, { expires: 4 });
      Cookies.set("is_login", true, { expires: 4 });
      Cookies.set("login_type", 'academy', { expires: 4 });
      toast.success("تم تسجيل الدخول بنجاح 🎉");
      location.replace("/academy");
    } else {
      Cookies.set("student_token", access_token, { expires: 4 });
      Cookies.set("is_login", true, { expires: 4 });
      Cookies.set("login_type", 'student', { expires: 4 });
      toast.success("تم تسجيل الدخول بنجاح 🎉");
      location.replace("/student/dashboard");
    }
  };

  return (
    <AcademyFormContener>
      <form onSubmit={formik.handleSubmit}>
        <div className={`${classes.formGroup} `}>
          <label htmlFor="email" className="mb-2" >
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
        <Toaster />
        <div className={`${classes.formGroup}`}>
          <label htmlFor="password" className="mb-2">
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

          <a href="/forget-password" className={`${classes.forgotPassword}`}>
            نسيت كلمة المرور؟
          </a>
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

        <div className={`${classes.ddd} mt-4`}>
          <span className={`${classes.nothaveaccount}`}>ليس لديك حساب؟</span>{" "}
          <Link to="/signin" className={`${classes.forgotPassword}`} style={{ cursor: "pointer" }}>
            انشاء حساب جديد
          </Link>
        </div>
      </form>
    </AcademyFormContener>
  );
};

export default AcademyLogin;

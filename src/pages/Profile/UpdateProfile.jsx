import styles from "./UpdateProfile.module.css";
import classes from "../login/login.module.scss";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import { Avatar } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { postProfile } from "../../utils/apis/client";

function UpdateProfile({ profileData, setShowUpdate }) {
  const [previewImage, setPreviewImage] = useState(profileData?.image || null);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: profileData?.name || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("الإسم مطلوب"),
      email: Yup.string()
        .email("بريد إلكتروني خاطئ")
        .required("البريد الإلكتروني مطلوب"),
      phone: Yup.string().required("رقم الهاتف مطلوب"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      if (values.image) {
        formData.append("image", values.image);
      }
      await mutation.mutateAsync(formData);
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return postProfile(data);
    },
    onSuccess: (res) => {
      toast("تم تحديث معلوماتك بنجاح 🎉");
      location.reload();
    },
    onError: (error) => {
      console.log(error);
      toast("ooop :)");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ref = createRef();
  useEffect(() => {
    const handleKeydown = (e) => e.key === "Escape" && setShowUpdate(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (e) => {
    const { current } = ref;
    if (current === e.target) {
      console.log("Close Modal");
      setShowUpdate(false);
    }
  };

  // format username

  return (
    <div className={styles.main} ref={ref} onClick={handleOverlayClick}>
      <div
        className={`${styles.container} animate__animated animate__bounceInUp`}
      >
        <h4 className={styles.title}>تحديث معلومات حسابك</h4>
        <span className={styles.separator}></span>

        <form onSubmit={formik.handleSubmit}>
          <div className={`${classes.formGroup} mb-2`}>
            <Avatar
              alt="Profile Image"
              src={previewImage}
              sx={{ width: 65, height: 65 }}
              style={{ margin: "0 auto", cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            />
            <input
              id="image"
              className="hidden"
              name="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.image && formik.touched.image && (
              <div className="error">{formik.errors.image}</div>
            )}
          </div>

          {/* Other form fields for name, email, and phone */}
          <div className={`${classes.formGroup} mb-2`}>
            <label htmlFor="name" className="mb-2 fs-6 fw-medium">
              الإسم
            </label>
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
              InputProps={{
                style: {
                  borderRadius: "10px",
                  border: "1px solid #E1E2E6",
                },
              }}
            />
          </div>
          <div className={`${classes.formGroup} mb-2`}>
            <label htmlFor="email" className="mb-2 fs-6 fw-medium">
              البريد الإلكتروني
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
                style: {
                  borderRadius: "10px",
                  border: "1px solid #E1E2E6",
                },
              }}
            />
          </div>
          <div className={`${classes.formGroup} mb-2`}>
            <label htmlFor="phone" className="mb-2 fs-6 fw-medium">
              رقم الهاتف
            </label>
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
              InputProps={{
                style: {
                  borderRadius: "10px",
                  border: "1px solid #E1E2E6",
                },
              }}
            />
          </div>

          <Button
            className={`${classes.SubmitBtn} mt-4`}
            type="submit"
            disabled={mutation.isPending}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {mutation.isPending ? (
              <div className="loader"></div>
            ) : (
              <p style={{ margin: "0%" }}>حفظ</p>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;

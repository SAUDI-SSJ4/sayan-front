import React, { createRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Avatar, TextField, Button, CircularProgress } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

// APIs
import { postProfile } from "../../utils/apis/client";

// Define all styles inline for a single-file solution
const styles = {
  main: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "30px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    position: "relative",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "16px",
    textAlign: "center",
    color: "#333",
  },
  separator: {
    display: "block",
    width: "60px",
    height: "4px",
    backgroundColor: "#007bff",
    margin: "0 auto 24px",
    borderRadius: "2px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#555",
  },
  profileImageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 0 24px",
  },
  uploadHint: {
    marginTop: "8px",
    fontSize: "12px",
    color: "#777",
    display: "flex",
    alignItems: "center",
  },
  hidden: {
    display: "none",
  },
  submitButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    width: "100%",
    marginTop: "24px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "48px",
    "&:hover": {
      backgroundColor: "#0069d9",
    },
    "&:disabled": {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
  },
  textField: {
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
  },
  errorMessage: {
    color: "#d32f2f",
    fontSize: "12px",
    marginTop: "4px",
  },
  imagePreviewContainer: {
    position: "relative",
    marginBottom: "16px",
  },
  imagePreview: {
    cursor: "pointer",
    border: "2px solid #eee",
    transition: "all 0.2s ease",
    "&:hover": {
      border: "2px solid #007bff",
      transform: "scale(1.05)",
    },
  },
  changeImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    opacity: 0,
    transition: "opacity 0.2s",
    "&:hover": {
      opacity: 1,
    },
  },
  changeImageText: {
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
  },
  // Animation classes (will be added to style tag)
  animations: `
    @keyframes bounceInUp {
      from, 
      60%, 
      75%, 
      90%, 
      to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      }
      from {
        opacity: 0;
        transform: translate3d(0, 3000px, 0);
      }
      60% {
        opacity: 1;
        transform: translate3d(0, -20px, 0);
      }
      75% {
        transform: translate3d(0, 10px, 0);
      }
      90% {
        transform: translate3d(0, -5px, 0);
      }
      to {
        transform: translate3d(0, 0, 0);
      }
    }
    
    .bounceInUp {
      animation: bounceInUp 0.6s;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .loader {
      display: inline-block;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      animation: spin 0.8s linear infinite;
    }
  `,
};

function UpdateProfile({ profileData, setShowUpdate }) {
  const [previewImage, setPreviewImage] = useState(profileData?.image || null);
  const fileInputRef = createRef();
  const modalRef = createRef();

  // Formik configuration
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
        .email("بريد إلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      phone: Yup.string()
        .matches(
          /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
          "رقم هاتف غير صالح"
        )
        .required("رقم الهاتف مطلوب"),
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

  // API mutation setup
  const mutation = useMutation({
    mutationFn: (data) => postProfile(data),
    onSuccess: () => {
      toast.success("تم تحديث معلوماتك بنجاح 🎉", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      // Give user visual feedback before reload
      setTimeout(() => {
        location.reload();
      }, 1500);
    },
    onError: (error) => {
      console.error("Update profile error:", error);
      let errorMessage = "حدث خطأ أثناء تحديث المعلومات";
      
      // Try to extract specific error message if available
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
  });

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الصورة كبير جدًا. الحد الأقصى هو 5 ميجابايت", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        return;
      }
      
      // Validate file type
      if (!file.type.match('image.*')) {
        toast.error("يرجى اختيار ملف صورة صالح", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        return;
      }
      
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Close modal on escape key press
  useEffect(() => {
    const handleKeydown = (e) => e.key === "Escape" && setShowUpdate(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [setShowUpdate]);

  // Close modal when clicking outside content area
  const handleOverlayClick = (e) => {
    if (modalRef.current === e.target) {
      setShowUpdate(false);
    }
  };

  return (
    <div style={styles.main} ref={modalRef} onClick={handleOverlayClick}>
      <div style={styles.container} className="bounceInUp">
        <h4 style={styles.title}>تحديث معلومات حسابك</h4>
        <span style={styles.separator}></span>

        <form onSubmit={formik.handleSubmit}>
          {/* Profile Image Upload */}
          <div style={styles.profileImageContainer}>
            <div style={styles.imagePreviewContainer}>
              <Avatar
                alt="Profile Image"
                src={previewImage}
                sx={{ width: 80, height: 80 }}
                style={styles.imagePreview}
                onClick={() => fileInputRef.current.click()}
              />
              <div style={styles.changeImageOverlay} onClick={() => fileInputRef.current.click()}>
                <span style={styles.changeImageText}>تغيير</span>
              </div>
            </div>
            <div style={styles.uploadHint}>
              <CloudUpload style={{ fontSize: 16, marginLeft: 4 }} />
              انقر لتغيير الصورة
            </div>
            <input
              id="image"
              style={styles.hidden}
              name="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* Name Field */}
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
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
              variant="outlined"
              size="medium"
              sx={styles.textField}
            />
          </div>

          {/* Email Field */}
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
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
              variant="outlined"
              size="medium"
              sx={styles.textField}
            />
          </div>

          {/* Phone Field */}
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>
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
              variant="outlined"
              size="medium"
              sx={styles.textField}
            />
          </div>

          {/* Submit Button */}
          <Button
            variant="contained"
            type="submit"
            disabled={mutation.isPending || !formik.isValid || !formik.dirty}
            sx={styles.submitButton}
            fullWidth
          >
            {mutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "حفظ التغييرات"
            )}
          </Button>
        </form>
      </div>

      {/* Add necessary animations */}
      <style>{styles.animations}</style>
    </div>
  );
}

export default UpdateProfile;
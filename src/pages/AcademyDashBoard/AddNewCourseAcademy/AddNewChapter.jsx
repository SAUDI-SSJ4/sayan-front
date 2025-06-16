import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiImage, FiSave, FiX, FiCheck } from "react-icons/fi";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import style from "./AddNewCourse.module.css";
import Swal from "sweetalert2";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "العنوان يجب أن يكون 3 أحرف على الأقل")
    .max(100, "العنوان لا يجب أن يتجاوز 100 حرف")
    .required("العنوان مطلوب"),
  content: Yup.string()
    .min(10, "الوصف يجب أن يكون 10 أحرف على الأقل")
    .max(500, "الوصف لا يجب أن يتجاوز 500 حرف")
    .required("الوصف مطلوب"),
  file: Yup.mixed()
    .required("صورة الفصل مطلوبة")
    .test("fileType", "يجب أن يكون الملف صورة", (value) => {
      if (!value) return false;
      return ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"].includes(value.type);
    })
    .test("fileSize", "حجم الصورة يجب أن يكون أقل من 5MB", (value) => {
      if (!value) return false;
      return value.size <= 5242880; // 5MB
    }),
});

const AddNewChapter = () => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setIsSubmitting(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("file", values.file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await Swal.fire({
        title: "إضافة الفصل إلى المادة",
        text: "هل تريد إضافة هذا الفصل في هذه المادة",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#29e088",
        cancelButtonColor: "#ff4757",
        confirmButtonText: "إضافة",
        cancelButtonText: "إلغاء",
        customClass: {
          popup: 'rounded-lg',
          confirmButton: 'rounded-lg px-6 py-2',
          cancelButton: 'rounded-lg px-6 py-2'
        }
      });

      if (result.isConfirmed) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setUploadProgress(100);
        clearInterval(progressInterval);

        await Swal.fire({
          title: "تمت الإضافة بنجاح! 🎉",
          text: "تم إضافة الفصل إلى المادة التعليمية بنجاح",
          icon: "success",
          confirmButtonColor: "#29e088",
          confirmButtonText: "ممتاز",
          customClass: {
            popup: 'rounded-lg',
            confirmButton: 'rounded-lg px-6 py-2'
          }
        });

        // Reset form
        resetForm();
        setPreviewImage(null);
        toast.success("تم إضافة الفصل بنجاح");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("حدث خطأ أثناء إضافة الفصل");
      await Swal.fire({
        title: "حدث خطأ",
        text: "لم نتمكن من إضافة الفصل. يرجى المحاولة مرة أخرى",
        icon: "error",
        confirmButtonColor: "#ff4757",
        confirmButtonText: "حسناً"
      });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"].includes(file.type)) {
        toast.error("يرجى اختيار ملف صورة صالح");
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5242880) {
        toast.error("حجم الصورة يجب أن يكون أقل من 5MB");
        return;
      }

      setFieldValue("file", file);
      setPreviewImage(URL.createObjectURL(file));
      toast.success("تم اختيار الصورة بنجاح");
    }
  };

  const removeImage = (setFieldValue) => {
    setFieldValue("file", null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <motion.div 
      className={style.boardLap}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h4 variants={itemVariants}>
        إضافة فصل جديد
      </motion.h4>

      <Formik
        initialValues={{ title: "", content: "", file: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched, values, isSubmitting: formikSubmitting }) => (
          <Form className="d-flex flex-column align-items-center w-100">
            <motion.div variants={itemVariants} className="col-lg-8 col-md-10 col-12">
              <div className="CustomFormControl">
                <label htmlFor="title">
                  <FiSave className="me-2" />
                  عنوان الفصل
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="أدخل عنوان الفصل هنا..."
                  className={touched.title && errors.title ? "is-invalid" : ""}
                />
                <AnimatePresence>
                  {touched.title && errors.title && (
                    <motion.div 
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <FiX className="me-1" />
                      {errors.title}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="col-lg-8 col-md-10 col-12">
              <div className="CustomFormControl">
                <label htmlFor="content">
                  <FiImage className="me-2" />
                  وصف الفصل
                </label>
                <Field
                  as="textarea"
                  rows={4}
                  name="content"
                  placeholder="أدخل وصف الفصل والمحتوى المتوقع..."
                  className={touched.content && errors.content ? "is-invalid" : ""}
                />
                <AnimatePresence>
                  {touched.content && errors.content && (
                    <motion.div 
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <FiX className="me-1" />
                      {errors.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="col-lg-8 col-md-10 col-12">
              <div className="CustomFormControl">
                <label>
                  <FiUpload className="me-2" />
                  صورة الفصل
                </label>
                
                <div className="position-relative">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="border border-2 border-dashed rounded-lg p-4 position-relative"
                      style={{
                        borderColor: previewImage ? 'var(--success-color)' : 'var(--border-color)',
                        backgroundColor: previewImage ? 'var(--success-light)' : 'var(--bg-light)',
                        minHeight: '250px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <AnimatePresence mode="wait">
                        {previewImage ? (
                          <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="position-relative w-100"
                          >
                            <img
                              src={previewImage}
                              alt="Chapter preview"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "200px",
                                objectFit: "contain",
                                borderRadius: "8px"
                              }}
                            />
                            <motion.button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                              style={{ 
                                width: '32px', 
                                height: '32px',
                                transform: 'translate(50%, -50%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(setFieldValue);
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FiX size={16} />
                            </motion.button>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="placeholder"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                          >
                            <FiUpload size={48} className="text-muted mb-3" />
                            <h6 className="text-primary mb-2">اضغط لاختيار صورة الفصل</h6>
                            <p className="text-muted small mb-0">
                              يدعم: JPG, PNG, GIF, WebP (حد أقصى 5MB)
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                    />
                  </motion.div>

                  {/* Upload Progress */}
                  <AnimatePresence>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-3"
                      >
                        <div className="progress" style={{ height: '8px' }}>
                          <motion.div
                            className="progress-bar bg-success"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <small className="text-muted d-block text-center mt-1">
                          جاري الرفع... {uploadProgress}%
                        </small>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {touched.file && errors.file && (
                      <motion.div 
                        className="error-message mt-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <FiX className="me-1" />
                        {errors.file}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="col-12 text-center mt-4">
              <motion.button 
                type="submit" 
                className={style.saveBtnTwo}
                disabled={isSubmitting || formikSubmitting}
                whileHover={!isSubmitting && !formikSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting && !formikSubmitting ? { scale: 0.95 } : {}}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting || formikSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="d-flex align-items-center gap-2"
                    >
                      <Spinner animation="border" size="sm" />
                      جاري الحفظ...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="save"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="d-flex align-items-center gap-2"
                    >
                      <FiCheck />
                      حفظ الفصل
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default AddNewChapter;
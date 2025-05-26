import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiVideo, FiType, FiSave, FiX, FiCheck, FiPlay } from "react-icons/fi";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { useCreateLessonMutation } from "../../../../services/mutation";
import style from "./AddNewCourse.module.css";
import { ButtonSpinner } from "../../../component/UI/Buttons/ButtonSpinner";

// Enhanced validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "العنوان يجب أن يكون 3 أحرف على الأقل")
    .max(100, "العنوان لا يجب أن يتجاوز 100 حرف")
    .required("العنوان مطلوب"),
  content: Yup.string()
    .min(10, "الوصف يجب أن يكون 10 أحرف على الأقل")
    .max(1000, "الوصف لا يجب أن يتجاوز 1000 حرف")
    .required("الوصف مطلوب"),
  video: Yup.mixed()
    .required("فيديو الدرس مطلوب")
    .test("fileType", "يجب أن يكون الملف فيديو", (value) => {
      if (!value) return false;
      return ["video/mp4", "video/avi", "video/mov", "video/wmv", "video/webm"].includes(value.type);
    })
    .test("fileSize", "حجم الفيديو يجب أن يكون أقل من 100MB", (value) => {
      if (!value) return false;
      return value.size <= 104857600; // 100MB
    }),
});

function AddNewLesson({ CategoryID, CourseID }) {
  const mutation = useCreateLessonMutation();
  const videoInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      video: null,
      course_id: CourseID,
      category_id: CategoryID,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setUploadProgress(0);

      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("course_id", CourseID);
        formData.append("category_id", CategoryID);
        formData.append("type", "video");
        formData.append("video", values.video);

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 300);

        const result = await Swal.fire({
          title: "إضافة درس إلى الدورة",
          text: "هل تريد إضافة هذا الدرس إلى هذا القسم في هذه الدورة؟",
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

        if (!values.category_id && !values.course_id) {
          toast.error("بيانات الدورة والقسم مطلوبة");
          return;
        }

        if (result.isConfirmed) {
          try {
            await mutation.mutateAsync(formData);
            
            setUploadProgress(100);
            clearInterval(progressInterval);

            await Swal.fire({
              title: "تمت الإضافة بنجاح! 🎉",
              text: "تم إضافة الدرس بنجاح",
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
            setVideoPreview(null);
            if (videoInputRef.current) {
              videoInputRef.current.value = "";
            }
            toast.success("تم إضافة الدرس بنجاح");

          } catch (error) {
            console.error("Mutation error:", error);
            clearInterval(progressInterval);
            
            await Swal.fire({
              title: "فشل الإضافة",
              text: "حدث خطأ أثناء محاولة إضافة الدرس. يرجى المحاولة مرة أخرى.",
              icon: "error",
              confirmButtonColor: "#ff4757",
              confirmButtonText: "موافق",
              customClass: {
                popup: 'rounded-lg',
                confirmButton: 'rounded-lg px-6 py-2'
              }
            });
            toast.error("فشل في إضافة الدرس");
          }
        } else {
          clearInterval(progressInterval);
        }
      } catch (error) {
        console.error("General error:", error);
        toast.error("حدث خطأ غير متوقع");
      } finally {
        setIsSubmitting(false);
        setUploadProgress(0);
      }
    },
  });

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!["video/mp4", "video/avi", "video/mov", "video/wmv", "video/webm"].includes(file.type)) {
        toast.error("يرجى اختيار ملف فيديو صالح");
        return;
      }

      // Validate file size (100MB)
      if (file.size > 104857600) {
        toast.error("حجم الفيديو يجب أن يكون أقل من 100MB");
        return;
      }

      formik.setFieldValue("video", file);
      setVideoPreview(URL.createObjectURL(file));
      toast.success("تم اختيار الفيديو بنجاح");
    }
  };

  const removeVideo = () => {
    formik.setFieldValue("video", null);
    setVideoPreview(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const isFormFilled = () => formik.values.title && formik.values.content && formik.values.video;

  return (
    <motion.div 
      className={style.boardLap}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h4 variants={itemVariants}>
        إضافة درس جديد
      </motion.h4>
      
      <form onSubmit={formik.handleSubmit} className="row g-3 w-100 justify-content-center m-auto">
        <motion.div variants={itemVariants} className="col-lg-10 col-md-12">
          <div className="CustomFormControl">
            <label>
              <FiVideo className="me-2" />
              فيديو الدرس
            </label>
            
            <div className="position-relative">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div 
                  className="border border-2 border-dashed rounded-lg p-4 position-relative"
                  style={{
                    borderColor: videoPreview ? 'var(--success-color)' : 'var(--border-color)',
                    backgroundColor: videoPreview ? 'var(--success-light)' : 'var(--bg-light)',
                    minHeight: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => videoInputRef.current?.click()}
                >
                  <AnimatePresence mode="wait">
                    {videoPreview ? (
                      <motion.div
                        key="video-preview"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="position-relative w-100"
                      >
                        <video
                          width="100%"
                          height="250px"
                          controls
                          style={{ 
                            objectFit: "contain", 
                            borderRadius: "8px",
                            backgroundColor: "black"
                          }}
                        >
                          <source src={videoPreview} type="video/mp4" />
                          المتصفح الخاص بك لا يدعم عرض الفيديو.
                        </video>
                        
                        <motion.button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                          style={{ 
                            width: '36px', 
                            height: '36px',
                            transform: 'translate(50%, -50%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeVideo();
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiX size={18} />
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="video-placeholder"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                      >
                        <FiUpload size={60} className="text-muted mb-3" />
                        <h5 className="text-primary mb-2">اضغط لاختيار فيديو الدرس</h5>
                        <p className="text-muted mb-0">
                          يدعم: MP4, AVI, MOV, WMV, WebM (حد أقصى 100MB)
                        </p>
                        <div className="mt-3">
                          <FiPlay className="text-primary me-2" />
                          <span className="text-muted small">سيتم عرض معاينة الفيديو هنا</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <input
                  type="file"
                  accept="video/*"
                  ref={videoInputRef}
                  style={{ display: "none" }}
                  onChange={handleVideoChange}
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
                    <div className="progress" style={{ height: '10px' }}>
                      <motion.div
                        className="progress-bar bg-success"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <small className="text-muted d-block text-center mt-1">
                      جاري رفع الفيديو... {uploadProgress}%
                    </small>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {formik.touched.video && formik.errors.video && (
                  <motion.div 
                    className="error-message mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FiX className="me-1" />
                    {formik.errors.video}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="col-lg-10 col-md-12">
          <div className="CustomFormControl">
            <label htmlFor="title">
              <FiType className="me-2" />
              عنوان الدرس
            </label>
            <input
              type="text"
              placeholder="أدخل عنوان الدرس هنا..."
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.title && formik.errors.title ? "is-invalid" : ""}
            />
            <AnimatePresence>
              {formik.touched.title && formik.errors.title && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FiX className="me-1" />
                  {formik.errors.title}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="col-lg-10 col-md-12">
          <div className="CustomFormControl">
            <label htmlFor="content">
              <FiSave className="me-2" />
              وصف الدرس
            </label>
            <textarea
              rows={5}
              placeholder="أدخل وصف الدرس والأهداف التعليمية..."
              id="content"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.content && formik.errors.content ? "is-invalid" : ""}
            />
            <AnimatePresence>
              {formik.touched.content && formik.errors.content && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FiX className="me-1" />
                  {formik.errors.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="col-12 text-center mt-4">
          <AnimatePresence mode="wait">
            {isFormFilled() && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <motion.button
                  type="submit"
                  className={style.saveBtnTwo}
                  disabled={isSubmitting || mutation.isPending}
                  whileHover={!isSubmitting && !mutation.isPending ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting && !mutation.isPending ? { scale: 0.95 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting || mutation.isPending ? (
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
                        حفظ الدرس
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isFormFilled() && (
            <motion.p 
              className="text-muted mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              يرجى ملء جميع الحقول لتفعيل زر الحفظ
            </motion.p>
          )}
        </motion.div>
      </form>
    </motion.div>
  );
}

export default AddNewLesson;

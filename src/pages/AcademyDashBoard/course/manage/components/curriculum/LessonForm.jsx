import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FiVideo, FiFileText, FiUpload, FiCheck, FiAlertCircle } from "react-icons/fi";
import VideoUploader from "../../../../../../component/UI/VideoUploader";
import { useDispatch } from "react-redux";
import { useToast } from "../../../../../../utils/hooks/useToast";
import {
  createLesson,
  editLesson,
} from "../../../../../../utils/apis/client/academy";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk";
import { Button } from "react-bootstrap";
import { getCourseLessonSchema } from "../../../../../../validations/academy/course";

const LessonForm = ({ lesson, courseId, chapterId, onClose, lessonType, onLessonCreated }) => {
  const dispatch = useDispatch();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [videoDuration, setVideoDuration] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [formSubmitAttempts, setFormSubmitAttempts] = useState(0);

  const { success, error } = useToast();
  
  // تحديث إذا كان هناك فيديو أو لا
  const [hasVideoSelected, setHasVideoSelected] = useState(lesson?.video?.stream_url ? true : false);
  
  // مخطط التحقق البسيط
  const validationSchema = Yup.object({
    title: Yup.string().required("عنوان الدرس مطلوب"),
    description: Yup.string(),
  });
  
  const videoFormik = useFormik({
    initialValues: {
      title: lesson?.title || "",
      description: lesson?.video?.description || "",
      video: lesson?.video?.video|| null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Form submitted with values:", values);
      console.log("Video file:", videoFile);
      
      setIsSubmitting(true);
      setFormSubmitAttempts(prev => prev + 1);
      
      try {
        // إنشاء FormData لإرسال الملف
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('type', 'video');
        formData.append('video_title', values.title); // استخدام نفس عنوان الدرس كعنوان للفيديو
        
        // إضافة الفيديو فقط إذا كان هناك ملف جديد
        if (videoFile) {
          console.log("Appending video file to FormData:", videoFile.name, videoFile.size);
          formData.append('video', videoFile);
          
          if (videoDuration) {
            formData.append('duration', Math.round(videoDuration));
          }
        }
        
        // للتحديث، نضيف method=PUT
        if (lesson) {
          formData.append('_method', 'PUT');
        }
        
        console.log("FormData keys:", [...formData.entries()].map(entry => entry[0]));

        // طباعة بيانات الإرسال
        console.log("Sending request to", lesson ? "edit" : "create", "lesson");
        console.log("courseId:", courseId);
        console.log("chapterId:", chapterId);
        if (lesson) console.log("lessonId:", lesson.id);

        let res;
        if (lesson) {
          res = await editLesson(
            {
              courseId,
              chapterId,
              lessonId: lesson.id,
            },
            formData
          );
        } else {
          res = await createLesson(
            {
              courseId,
              chapterId,
            },
            formData
          );
        }

        console.log("API Response:", res);
        
        if (res.status) {
          setUploadSuccess(true);
          success(lesson ? "تم تعديل الدرس بنجاح" : "تم إضافة الدرس بنجاح");
          
          // تحديث القائمة
          dispatch(fetchCurrentCourseSummaryThunk(courseId));
          
          // إغلاق النافذة أو استدعاء وظيفة إنشاء الدرس
          if (onLessonCreated && res.data) {
            onLessonCreated(res.data);
          } else {
            onClose && onClose();
          }
        } else {
          error(res.message || "حدث خطأ أثناء حفظ الدرس");
        }
      } catch (err) {
        console.error("Error in lesson form submission:", err);
        error("حدث خطأ أثناء حفظ الدرس. يرجى المحاولة مرة أخرى.");
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  const handleInputFocus = (e, fieldName) => {
    if (!videoFormik.errors[fieldName]) {
      e.target.style.borderColor = '#0062ff';
      e.target.style.boxShadow = '0 0 0 3px rgba(0, 98, 255, 0.1)';
    }
  };

  const handleInputBlur = (e, fieldName) => {
    videoFormik.handleBlur(e);
    e.target.style.borderColor = videoFormik.touched[fieldName] && videoFormik.errors[fieldName] ? '#ef4444' : '#e2e8f0';
    e.target.style.boxShadow = 'none';
  };

  const handleVideoUpload = (file) => {
    console.log("Video uploaded:", file);
    setVideoFile(file);
    setHasVideoSelected(true);
    videoFormik.setFieldValue("video", "uploaded");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ 
        width: '100%',
        minHeight: 'auto'
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#e8f4fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FiVideo color="#0062ff" size={20} />
          </div>
          <h4 style={{ 
            margin: 0, 
            color: '#1a202c', 
            fontWeight: 'bold',
            fontSize: '20px'
          }}>
            {lesson ? "تعديل الدرس" : "إضافة درس فيديو جديد"}
          </h4>
        </div>
        <p style={{ 
          margin: 0, 
          color: '#718096', 
          fontSize: '14px',
          paddingRight: '52px'
        }}>
          {lesson ? "قم بتعديل بيانات الدرس أدناه" : "أضف درساً تعليمياً جديداً بالفيديو"}
        </p>
      </div>

      {uploadSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '20px',
            marginBottom: '24px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FiCheck color="white" size={16} />
          </div>
          <div>
            <p style={{ margin: 0, color: '#065f46', fontWeight: '600', fontSize: '14px' }}>
              تم رفع الفيديو بنجاح!
            </p>
            <p style={{ margin: 0, color: '#047857', fontSize: '12px' }}>
              يمكنك الآن المتابعة لإضافة درس آخر
            </p>
          </div>
        </motion.div>
      )}

      {formSubmitAttempts > 0 && !isSubmitting && !uploadSuccess && (
        <div style={{
          padding: '20px',
          marginBottom: '24px',
          backgroundColor: '#fff4e5',
          border: '1px solid #ffd8a8',
          borderRadius: '12px',
          fontSize: '14px'
        }}>
          <p style={{ margin: 0, color: '#c05621', fontWeight: '500' }}>
            تأكد من ملء جميع الحقول المطلوبة واختيار ملف الفيديو.
          </p>
        </div>
      )}

      <form onSubmit={videoFormik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* محتوى النموذج في شبكة */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '32px', 
          alignItems: 'start' 
        }}>
          {/* العمود الأيسر - المعلومات الأساسية */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* عنوان الدرس */}
            <div>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                fontWeight: '600', 
                color: '#374151',
                fontSize: '15px'
              }}>
                <FiFileText size={16} />
                عنوان الدرس
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="مثال: مقدمة في البرمجة"
                value={videoFormik.values.title}
                onChange={videoFormik.handleChange}
                onFocus={(e) => handleInputFocus(e, 'title')}
                onBlur={(e) => handleInputBlur(e, 'title')}
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  border: `2px solid ${videoFormik.touched.title && videoFormik.errors.title ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  fontSize: '15px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
              {videoFormik.touched.title && videoFormik.errors.title && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  marginTop: '8px', 
                  color: '#ef4444', 
                  fontSize: '13px' 
                }}>
                  <FiAlertCircle size={12} />
                  {videoFormik.errors.title}
                </div>
              )}
            </div>

            {/* وصف الدرس */}
            <div>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                fontWeight: '600', 
                color: '#374151',
                fontSize: '15px'
              }}>
                <FiFileText size={16} />
                وصف مختصر
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="وصف الدرس والأهداف التعليمية..."
                value={videoFormik.values.description}
                onChange={videoFormik.handleChange}
                onFocus={(e) => handleInputFocus(e, 'description')}
                onBlur={(e) => handleInputBlur(e, 'description')}
                rows={6}
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  border: `2px solid ${videoFormik.touched.description && videoFormik.errors.description ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  fontSize: '15px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '140px'
                }}
              />
              {videoFormik.touched.description && videoFormik.errors.description && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  marginTop: '8px', 
                  color: '#ef4444', 
                  fontSize: '13px' 
                }}>
                  <FiAlertCircle size={12} />
                  {videoFormik.errors.description}
                </div>
              )}
            </div>
          </div>

          {/* العمود الأيمن - رفع الفيديو */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* رفع الفيديو */}
            <div>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                fontWeight: '600', 
                color: '#374151',
                fontSize: '15px'
              }}>
                <FiUpload size={16} />
                رفع الفيديو
              </label>
              <div style={{
                border: '2px dashed #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: '#fafafa',
                transition: 'all 0.3s ease'
              }}>
                <VideoUploader
                  onVideoUpload={handleVideoUpload}
                  onDurationChange={setVideoDuration}
                  initialVideo={lesson?.video?.stream_url}
                />
              </div>
              {!hasVideoSelected && formSubmitAttempts > 0 && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  marginTop: '8px', 
                  color: '#ef4444', 
                  fontSize: '13px' 
                }}>
                  <FiAlertCircle size={12} />
                  يرجى اختيار ملف فيديو
                </div>
              )}
            </div>

            {/* معلومات إضافية */}
            {videoDuration && (
              <div style={{
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FiVideo size={16} />
                  مدة الفيديو: {Math.floor(videoDuration / 60)} دقيقة و {Math.round(videoDuration % 60)} ثانية
                </p>
              </div>
            )}
          </div>
        </div>

        {/* أزرار التحكم */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          justifyContent: 'flex-end',
          paddingTop: '24px',
          borderTop: '1px solid #e2e8f0',
          marginTop: '8px'
        }}>
          <Button
            type="button"
            variant="outline-secondary"
            onClick={onClose}
            disabled={isSubmitting}
            style={{
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '500',
              border: '2px solid #e2e8f0',
              backgroundColor: 'white',
              color: '#64748b',
              transition: 'all 0.3s ease'
            }}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            style={{
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              backgroundColor: isSubmitting ? '#94a3b8' : '#0062ff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 98, 255, 0.3)'
            }}
          >
            {isSubmitting ? (
              <>
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                جاري الحفظ...
              </>
            ) : (
              <>
                <FiCheck size={18} />
                {lesson ? "حفظ التعديلات" : "حفظ الدرس"}
              </>
            )}
          </Button>
        </div>
      </form>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default LessonForm;

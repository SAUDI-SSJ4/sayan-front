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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  const { success, error } = useToast();
  
  // تحديد ما إذا كان الدرس يحتاج فيديو أم لا
  const isInteractiveTool = lessonType === "tool";
  const needsVideo = !isInteractiveTool;
  
  // تحديث إذا كان هناك فيديو أو لا
  const [hasVideoSelected, setHasVideoSelected] = useState(
    lesson?.video?.stream_url ? true : !needsVideo
  );
  
  // مخطط التحقق البسيط
  const validationSchema = Yup.object({
    title: Yup.string().required("عنوان الدرس مطلوب"),
    description: Yup.string(),
  });
  
  const handleVideoUpload = (file) => {
    console.log("Video file received:", file?.name);
    setVideoFile(file);
    setHasVideoSelected(!!file);
    
    // إعادة تعيين حالة الرفع
    setUploadProgress(0);
    setUploadError(null);
    setUploadSuccess(false);
  };

  const formik = useFormik({
    initialValues: {
      title: lesson?.title || "",
      description: lesson?.video?.description || lesson?.description || "",
      video: lesson?.video?.video || null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Form submitted with values:", values);
      console.log("Video file:", videoFile);
      console.log("Lesson type:", lessonType);
      console.log("Is interactive tool:", isInteractiveTool);
      
      setIsSubmitting(true);
      setFormSubmitAttempts(prev => prev + 1);
      setUploadProgress(0);
      setUploadError(null);
      setUploadSuccess(false);
      
      try {
        // إنشاء FormData لإرسال الملف
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        
        // تحديد نوع الدرس
        if (isInteractiveTool) {
          formData.append('type', 'tool'); // للأدوات التفاعلية
        } else {
          formData.append('type', 'video'); // للدروس العادية
          formData.append('video_title', values.title); // استخدام نفس عنوان الدرس كعنوان للفيديو
        }
        
        // إضافة الفيديو فقط إذا كان هناك ملف جديد وكان الدرس يحتاج فيديو
        if (videoFile && needsVideo) {
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
            formData,
            (progressData) => {
              // تحديث تقدم الرفع الحقيقي
              const progress = Math.round((progressData.loaded * 100) / progressData.total);
              setUploadProgress(progress);
              console.log(`Upload Progress: ${progress}%`);
            }
          );
        } else {
          res = await createLesson(
            {
              courseId,
              chapterId,
            },
            formData,
            (progressData) => {
              // تحديث تقدم الرفع الحقيقي
              const progress = Math.round((progressData.loaded * 100) / progressData.total);
              setUploadProgress(progress);
              console.log(`Upload Progress: ${progress}%`);
            }
          );
        }

        console.log("API Response:", res);
        
        if (res.status) {
          setUploadProgress(100);
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
          setUploadProgress(0);
          
          const errorMessage = res.message || "حدث خطأ أثناء حفظ الدرس";
          setUploadError(errorMessage);
          error(errorMessage);
        }
      } catch (err) {
        console.error("Error in lesson form submission:", err);
        
        // تحديد نوع الخطأ
        let errorMessage = "حدث خطأ أثناء حفظ الدرس";
        
        if (err.name === 'NetworkError' || err.message.includes('network')) {
          errorMessage = "خطأ في الاتصال بالإنترنت. يرجى التحقق من الاتصال والمحاولة مرة أخرى.";
        } else if (err.message.includes('timeout')) {
          errorMessage = "انتهت مهلة الرفع. الفيديو قد يكون كبير جداً، يرجى المحاولة مرة أخرى.";
        } else if (err.message.includes('413') || err.message.includes('too large')) {
          errorMessage = "حجم الفيديو كبير جداً. يرجى اختيار فيديو أصغر.";
        }
        
        setUploadError(errorMessage);
        error(errorMessage);
        setUploadProgress(0);
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  const handleInputFocus = (e, fieldName) => {
    if (!formik.errors[fieldName]) {
      e.target.style.borderColor = '#0062ff';
      e.target.style.boxShadow = '0 0 0 3px rgba(0, 98, 255, 0.1)';
    }
  };

  const handleInputBlur = (e, fieldName) => {
    formik.handleBlur(e);
    e.target.style.borderColor = formik.touched[fieldName] && formik.errors[fieldName] ? '#ef4444' : '#e2e8f0';
    e.target.style.boxShadow = 'none';
  };

  // دالة للتحقق من صحة النموذج
  const isFormValid = () => {
    const hasTitle = formik.values.title.trim().length > 0;
    if (isInteractiveTool) {
      // للأدوات التفاعلية، نحتاج فقط العنوان
      return hasTitle;
    } else {
      // للدروس العادية، نحتاج العنوان والفيديو
      return hasTitle && hasVideoSelected;
    }
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
            backgroundColor: isInteractiveTool ? '#fff7ed' : '#e8f4fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {isInteractiveTool ? (
              <FiFileText color="#f59e0b" size={20} />
            ) : (
              <FiVideo color="#0062ff" size={20} />
            )}
          </div>
          <h4 style={{ 
            margin: 0, 
            color: '#1a202c', 
            fontWeight: 'bold',
            fontSize: '20px'
          }}>
            {lesson ? "تعديل الدرس" : 
             isInteractiveTool ? "إضافة درس للأداة التفاعلية" : "إضافة درس فيديو جديد"}
          </h4>
        </div>
        <p style={{ 
          margin: 0, 
          color: '#718096', 
          fontSize: '14px',
          paddingRight: '52px'
        }}>
          {lesson ? "قم بتعديل بيانات الدرس أدناه" : 
           isInteractiveTool ? "أنشئ درساً سيحتوي على أدوات تفاعلية" : "أضف درساً تعليمياً جديداً بالفيديو"}
        </p>
      </div>

      {uploadSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            padding: '24px',
            marginBottom: '24px',
            backgroundColor: '#f0fdf4',
            border: '2px solid #22c55e',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'successPulse 0.6s ease-out'
            }}>
              <FiCheck color="white" size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 4px 0', color: '#15803d', fontWeight: '700', fontSize: '18px' }}>
                ✅ تم رفع الفيديو بنجاح!
              </p>
              <p style={{ margin: 0, color: '#166534', fontSize: '14px' }}>
                {lesson ? 'تم تحديث الدرس وحفظ الفيديو الجديد' : 'تم إنشاء الدرس وحفظ الفيديو بنجاح'}
              </p>
              {videoFile && (
                <div style={{ 
                  marginTop: '8px', 
                  padding: '8px 12px', 
                  backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#15803d'
                }}>
                  📁 {videoFile.name} • {(videoFile.size / (1024 * 1024)).toFixed(1)} MB
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* عرض تقدم الرفع */}
      {isSubmitting && (uploadProgress > 0 || videoFile) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '24px',
            marginBottom: '24px',
            backgroundColor: '#f0f9ff',
            border: '2px solid #0ea5e9',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '3px solid #0ea5e9',
              borderTop: '3px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 4px 0', color: '#0c4a6e', fontWeight: '700', fontSize: '16px' }}>
                {uploadProgress === 0 ? 'جاري إعداد الرفع...' : `جاري رفع الفيديو... ${uploadProgress}%`}
              </p>
              {videoFile && (
                <p style={{ margin: 0, color: '#0369a1', fontSize: '13px' }}>
                  {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB)
                </p>
              )}
            </div>
          </div>
          
          {/* شريط التقدم المحسن */}
          <div style={{
            width: '100%',
            height: '12px',
            backgroundColor: '#e0f2fe',
            borderRadius: '6px',
            overflow: 'hidden',
            marginBottom: '12px',
            position: 'relative'
          }}>
            <div style={{
              width: `${uploadProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)',
              borderRadius: '6px',
              transition: 'width 0.3s ease',
              position: 'relative'
            }}>
              {/* تأثير لامع */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: uploadProgress > 0 ? 'shimmer 2s infinite linear' : 'none'
              }} />
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ 
              margin: 0, 
              color: '#0369a1', 
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {uploadProgress < 30 ? 'بدء الرفع...' :
               uploadProgress < 60 ? 'جاري معالجة الملف...' :
               uploadProgress < 90 ? 'يقارب على الانتهاء...' :
               uploadProgress === 100 ? 'تم الرفع بنجاح!' : 'جاري الرفع...'}
            </p>
            <span style={{ 
              color: '#0c4a6e', 
              fontSize: '14px', 
              fontWeight: '700',
              minWidth: '45px',
              textAlign: 'right'
            }}>
              {uploadProgress}%
            </span>
          </div>
          
          {uploadProgress > 0 && uploadProgress < 100 && (
            <p style={{ 
              margin: '12px 0 0 0', 
              color: '#64748b', 
              fontSize: '11px',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              ⚠️ يرجى عدم إغلاق النافذة أو تحديث الصفحة أثناء الرفع
            </p>
          )}
        </motion.div>
      )}

      {/* عرض خطأ الرفع */}
      {uploadError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '20px',
            marginBottom: '24px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <FiAlertCircle color="white" size={16} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 8px 0', color: '#dc2626', fontWeight: '600', fontSize: '14px' }}>
              فشل في رفع الفيديو
            </p>
            <p style={{ margin: 0, color: '#991b1b', fontSize: '13px', lineHeight: '1.5' }}>
              {uploadError}
            </p>
            <button
              onClick={() => setUploadError(null)}
              style={{
                marginTop: '10px',
                padding: '6px 12px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              إغلاق
            </button>
          </div>
        </motion.div>
      )}

      {formSubmitAttempts > 0 && !isSubmitting && !uploadSuccess && !uploadError && (
        <div style={{
          padding: '20px',
          marginBottom: '24px',
          backgroundColor: '#fff4e5',
          border: '1px solid #ffd8a8',
          borderRadius: '12px',
          fontSize: '14px'
        }}>
          <p style={{ margin: 0, color: '#c05621', fontWeight: '500' }}>
            {isInteractiveTool 
              ? "تأكد من ملء عنوان الدرس."
              : "تأكد من ملء جميع الحقول المطلوبة واختيار ملف الفيديو."
            }
          </p>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                value={formik.values.title}
                onChange={formik.handleChange}
                onFocus={(e) => handleInputFocus(e, 'title')}
                onBlur={(e) => handleInputBlur(e, 'title')}
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  border: `2px solid ${formik.touched.title && formik.errors.title ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  fontSize: '15px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
              {formik.touched.title && formik.errors.title && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  marginTop: '8px', 
                  color: '#ef4444', 
                  fontSize: '13px' 
                }}>
                  <FiAlertCircle size={12} />
                  {formik.errors.title}
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
                value={formik.values.description}
                onChange={formik.handleChange}
                onFocus={(e) => handleInputFocus(e, 'description')}
                onBlur={(e) => handleInputBlur(e, 'description')}
                rows={6}
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  border: `2px solid ${formik.touched.description && formik.errors.description ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  fontSize: '15px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '140px'
                }}
              />
              {formik.touched.description && formik.errors.description && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  marginTop: '8px', 
                  color: '#ef4444', 
                  fontSize: '13px' 
                }}>
                  <FiAlertCircle size={12} />
                  {formik.errors.description}
                </div>
              )}
            </div>
          </div>

          {/* العمود الأيمن - رفع الفيديو أو معلومات الأداة التفاعلية */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {needsVideo ? (
              <>
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
                  {!hasVideoSelected && formSubmitAttempts > 0 && needsVideo && (
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
              </>
            ) : (
              /* معلومات الأداة التفاعلية */
              <div style={{
                padding: '24px',
                backgroundColor: '#fff7ed',
                borderRadius: '12px',
                border: '2px solid #fed7aa',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <FiFileText color="white" size={28} />
                </div>
                <h5 style={{
                  margin: '0 0 12px 0',
                  color: '#92400e',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  درس للأداة التفاعلية
                </h5>
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
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes successPulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
};

export default LessonForm;

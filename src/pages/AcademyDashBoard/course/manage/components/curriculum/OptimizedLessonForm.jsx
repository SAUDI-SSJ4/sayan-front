import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { FiSave, FiLoader, FiVideo, FiFileText, FiActivity } from "react-icons/fi";
import { useOptimizedLessonMutations } from "../../../../../../hooks/useOptimizedLessonMutations";
import { validateFormDataVideo } from "../../../../../../utils/videoValidation";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("عنوان الدرس مطلوب"),
  type: Yup.string()
    .oneOf(["video", "exam", "tool"], "نوع الدرس غير صالح")
    .required("نوع الدرس مطلوب"),
  description: Yup.string(),
  video: Yup.mixed().when("type", {
    is: "video",
    then: (schema) => schema.nullable(),
    otherwise: (schema) => schema.nullable(),
  }),
});

const OptimizedLessonForm = ({ lesson, courseId, chapterId, onClose }) => {
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoError, setVideoError] = useState("");
  
  const lessonMutations = useOptimizedLessonMutations(courseId, chapterId);
  const isEditing = Boolean(lesson);

  const formik = useFormik({
    initialValues: {
      title: lesson?.title || lesson?.video?.title || "",
      type: lesson?.type || "video",
      description: lesson?.description || lesson?.video?.description || "",
      video: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        setVideoError("");

        // إنشاء FormData
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("type", values.type);
        
        if (values.description) {
          formData.append("description", values.description);
        }

        // التحقق من الفيديو وإضافته إذا كان موجوداً
        if (values.video && values.type === "video") {
          const videoValidation = validateFormDataVideo(formData);
          if (!videoValidation.isValid) {
            setVideoError(videoValidation.error);
            return;
          }
          formData.append("video", values.video);
        }

        // تنفيذ العملية المناسبة
        if (isEditing) {
          await lessonMutations.editLessonAsync({
            lessonId: lesson.id,
            lessonData: formData,
          });
        } else {
          await lessonMutations.createLessonAsync(formData);
        }

        // إغلاق النموذج عند النجاح
        onClose && onClose();
      } catch (error) {
        console.error("خطأ في معالجة الدرس:", error);
        
        // عرض رسالة خطأ مناسبة
        if (error.message && error.message.includes("80MB")) {
          setVideoError("حجم الفيديو يجب أن يكون أقل من 80 ميجابايت");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  // معالج تغيير الفيديو
  const handleVideoChange = useCallback((event) => {
    const file = event.target.files[0];
    setVideoError("");

    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith("video/")) {
        setVideoError("يجب اختيار ملف فيديو صالح");
        return;
      }

      // التحقق من حجم الملف (80MB)
      const maxSize = 256 * 1024 * 1024; // 80MB بالبايت
      if (file.size > maxSize) {
        setVideoError("حجم الفيديو يجب أن يكون أقل من 256 ميجابايت");
        return;
      }

      // تعيين الفيديو في النموذج
      formik.setFieldValue("video", file);

      // إنشاء معاينة للفيديو
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);

      // تنظيف URL عند إلغاء التحديد
      return () => URL.revokeObjectURL(videoUrl);
    }
  }, [formik]);

  // تنظيف معاينة الفيديو عند إلغاء التحديد
  React.useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  const isLoading = formik.isSubmitting || lessonMutations.loading.isAnyLoading;

  return (
    <div className="space-y-6">
      {/* عنوان النموذج */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {isEditing ? "تعديل الدرس" : "إضافة درس جديد"}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {isEditing 
            ? "قم بتعديل معلومات الدرس أدناه" 
            : "أدخل معلومات الدرس الجديد أدناه"
          }
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* عنوان الدرس */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            عنوان الدرس <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            placeholder="أدخل عنوان الدرس هنا..."
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              formik.touched.title && formik.errors.title
                ? "border-red-300"
                : "border-gray-300"
            } ${isLoading ? "bg-gray-50 cursor-not-allowed" : "bg-white"}`}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        {/* نوع الدرس */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            نوع الدرس <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "video", label: "درس فيديو", icon: FiVideo, color: "blue" },
              { value: "exam", label: "اختبار", icon: FiFileText, color: "green" },
              { value: "tool", label: "أداة تفاعلية", icon: FiActivity, color: "purple" },
            ].map((option) => {
              const Icon = option.icon;
              const isSelected = formik.values.type === option.value;
              
              return (
                <label
                  key={option.value}
                  className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? `border-${option.color}-500 bg-${option.color}-50`
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={option.value}
                    checked={isSelected}
                    onChange={formik.handleChange}
                    disabled={isLoading}
                    className="sr-only"
                  />
                  <Icon 
                    size={24} 
                    className={`mb-2 ${
                      isSelected ? `text-${option.color}-600` : "text-gray-400"
                    }`}
                  />
                  <span 
                    className={`text-sm font-medium ${
                      isSelected ? `text-${option.color}-900` : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.type}</p>
          )}
        </div>

        {/* وصف الدرس */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            وصف الدرس (اختياري)
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            placeholder="أدخل وصف مختصر للدرس..."
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
              formik.touched.description && formik.errors.description
                ? "border-red-300"
                : "border-gray-300"
            } ${isLoading ? "bg-gray-50 cursor-not-allowed" : "bg-white"}`}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.description}</p>
          )}
        </div>

        {/* رفع الفيديو (يظهر فقط عند اختيار نوع فيديو) */}
        {formik.values.type === "video" && (
          <div>
            <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-2">
              ملف الفيديو {!isEditing && <span className="text-red-500">*</span>}
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <FiVideo className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="video"
                    className={`relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none ${
                      isLoading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    <span>ارفع ملف فيديو</span>
                    <input
                      id="video"
                      name="video"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      disabled={isLoading}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">أو اسحب وأفلت هنا</p>
                </div>
                <p className="text-xs text-gray-500">
                  MP4, MOV, AVI حتى 80MB
                </p>
              </div>
            </div>
            
            {/* معاينة الفيديو */}
            {videoPreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">معاينة الفيديو:</p>
                <video
                  src={videoPreview}
                  controls
                  className="w-full h-48 rounded-lg shadow-sm border border-gray-200"
                  preload="metadata"
                />
              </div>
            )}
            
            {/* رسالة خطأ الفيديو */}
            {videoError && (
              <p className="text-red-600 text-sm mt-1">{videoError}</p>
            )}
          </div>
        )}

        {/* أزرار التحكم */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline-secondary"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2"
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !formik.isValid}
            className="px-6 py-2 flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin" size={16} />
                <span>{isEditing ? "جاري التعديل..." : "جاري الإضافة..."}</span>
              </>
            ) : (
              <>
                <FiSave size={16} />
                <span>{isEditing ? "تعديل الدرس" : "إضافة الدرس"}</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OptimizedLessonForm; 
import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Rate } from "rsuite";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UploadImage from "../../../../component/UI/UploadFile/UploadImage";
import {
  editAcademyOpinions,
  postAcademyOpinions,
} from "../../../../utils/apis/client/academy";
import { studentOpinionSchema } from "../../../../validations/student-opinion";
import { CircularProgress } from "@mui/material";
import { 
  CheckCircle, 
  Error, 
  Person, 
  Star, 
  Comment, 
  PhotoCamera,
  Info 
} from "@mui/icons-material";

function StudentOpinionForm({ studentOpinion }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    studentOpinion?.student_image || null
  );

  const formik = useFormik({
    initialValues: {
      student_name: studentOpinion ? studentOpinion.student_name : "",
      student_avatar: studentOpinion ? studentOpinion.student_image : "",
      rate: studentOpinion ? studentOpinion.rating : null,
      opinion: studentOpinion ? studentOpinion.comment : "",
    },
    validationSchema: studentOpinion
      ? studentOpinionSchema.partial()
      : studentOpinionSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const { student_avatar, ...reset } = values;
        const editedValues = typeof student_avatar === "object" ? values : reset;

        if (studentOpinion) {
          const res = await editAcademyOpinions(studentOpinion.id, editedValues);
          if (res.success) {
            toast.success("تم تحديث رأي الطالب بنجاح", {
              position: "top-left",
              theme: "light",
              icon: <CheckCircle />,
            });
            navigate(location.pathname.replace(/edit/, ""));
          } else {
            toast.error("حدث خطأ أثناء التحديث، يرجى المحاولة مرة أخرى");
          }
        } else {
          const res = await postAcademyOpinions(values);
          if (res.success) {
            toast.success("تم إضافة رأي الطالب بنجاح", {
              position: "top-left",
              theme: "light",
              icon: <CheckCircle />,
            });
            navigate(location.pathname.replace(/add/, ""));
          } else {
            toast.error("حدث خطأ أثناء الإضافة، يرجى المحاولة مرة أخرى");
          }
        }
      } catch (error) {
        console.error("خطأ في إرسال النموذج:", error);
        toast.error("حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const getFieldStatus = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return 'error';
    }
    if (formik.touched[fieldName] && !formik.errors[fieldName] && formik.values[fieldName]) {
      return 'success';
    }
    return 'default';
  };

  const renderFieldIcon = (fieldName, defaultIcon) => {
    const status = getFieldStatus(fieldName);
    switch (status) {
      case 'error':
        return <Error style={{ color: '#f44336', fontSize: '20px' }} />;
      case 'success':
        return <CheckCircle style={{ color: '#4caf50', fontSize: '20px' }} />;
      default:
        return defaultIcon;
    }
  };

  const handleImageChange = (value) => {
    formik.setFieldValue("student_avatar", value);
    if (value && typeof value === 'object') {
      setPreviewImage(URL.createObjectURL(value));
    } else {
      setPreviewImage(value);
    }
  };

  const getRatingText = (rating) => {
    const ratingTexts = {
      1: "ضعيف جداً",
      2: "ضعيف", 
      3: "متوسط",
      4: "جيد",
      5: "ممتاز"
    };
    return ratingTexts[rating] || "غير محدد";
  };

  return (
    <div className="student-opinion-form-container">
      <div className="form-header mb-4">
        <h3 className="form-title">
          {studentOpinion ? "تعديل رأي الطالب" : "إضافة رأي طالب جديد"}
        </h3>
        <p className="form-subtitle text-muted">
          {studentOpinion 
            ? "قم بتعديل معلومات وتقييم الطالب" 
            : "أضف رأي وتقييم طالب جديد لعرضه في الموقع"
          }
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="row g-4">
        {/* اسم الطالب */}
        <div className="col-lg-12 col-md-12">
          <div className="CustomFormControl enhanced-form-control">
            <label htmlFor="student_name" className="form-label required">
              {renderFieldIcon('student_name', <Person style={{ fontSize: '16px', marginLeft: '5px', color: '#2196f3' }} />)}
              اسم الطالب
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="مثال: أحمد محمد علي"
                id="student_name"
                name="student_name"
                value={formik.values.student_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${getFieldStatus('student_name') === 'error' ? 'is-invalid' : ''} ${getFieldStatus('student_name') === 'success' ? 'is-valid' : ''}`}
                disabled={isSubmitting}
              />
            </div>
            {formik.touched.student_name && formik.errors.student_name && (
              <div className="invalid-feedback d-block">
                <Error style={{ fontSize: '14px', marginLeft: '5px' }} />
                {String(formik.errors.student_name)}
              </div>
            )}
            <div className="field-hint">
              أدخل الاسم الكامل للطالب كما تريد ظهوره في الموقع
            </div>
          </div>
        </div>

        {/* صورة الطالب */}
        <div className="col-lg-6 col-md-12">
          <div className="CustomFormControl enhanced-form-control">
            <label htmlFor="student_avatar" className="form-label">
              <PhotoCamera style={{ fontSize: '16px', marginLeft: '5px', color: '#2196f3' }} />
              صورة الطالب
            </label>
            <div className="image-upload-wrapper">
              <UploadImage
                id="student_avatar"
                name="student_avatar"
                currentImage={formik.values.student_avatar}
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.student_avatar && formik.errors.student_avatar && (
              <div className="invalid-feedback d-block">
                <Error style={{ fontSize: '14px', marginLeft: '5px' }} />
                {String(formik.errors.student_avatar)}
              </div>
            )}
            <div className="field-hint">
              اختر صورة واضحة للطالب (اختياري)
            </div>
          </div>
        </div>

        {/* تقييم الطالب */}
        <div className="col-lg-6 col-md-12">
          <div className="CustomFormControl enhanced-form-control">
            <label htmlFor="rate" className="form-label required">
              <Star style={{ fontSize: '16px', marginLeft: '5px', color: '#2196f3' }} />
              تقييم الطالب
            </label>
            <div className="rating-wrapper">
              <Rate
                id="rate"
                value={formik.values.rate}
                onChange={(value) => {
                  formik.setFieldValue("rate", value);
                }}
                size="lg"
                color="orange"
                disabled={isSubmitting}
              />
              {formik.values.rate && (
                <span className="rating-text">
                  {getRatingText(formik.values.rate)} ({formik.values.rate}/5)
                </span>
              )}
            </div>
            {formik.touched.rate && formik.errors.rate && (
              <div className="invalid-feedback d-block">
                <Error style={{ fontSize: '14px', marginLeft: '5px' }} />
                {String(formik.errors.rate)}
              </div>
            )}
            <div className="field-hint">
              اختر تقييم الطالب من 1 إلى 5 نجوم
            </div>
          </div>
        </div>

        {/* تعليق الطالب */}
        <div className="col-lg-12 col-md-12">
          <div className="CustomFormControl enhanced-form-control">
            <label htmlFor="opinion" className="form-label required">
              {renderFieldIcon('opinion', <Comment style={{ fontSize: '16px', marginLeft: '5px', color: '#2196f3' }} />)}
              رأي وتعليق الطالب
            </label>
            <div className="textarea-wrapper">
              <textarea
                placeholder="مثال: كانت المادة مفيدة جداً وساعدتني في تطوير مهاراتي..."
                id="opinion"
                name="opinion"
                value={formik.values.opinion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${getFieldStatus('opinion') === 'error' ? 'is-invalid' : ''} ${getFieldStatus('opinion') === 'success' ? 'is-valid' : ''}`}
                rows="5"
                disabled={isSubmitting}
              />
            </div>
            {formik.touched.opinion && formik.errors.opinion && (
              <div className="invalid-feedback d-block">
                <Error style={{ fontSize: '14px', marginLeft: '5px' }} />
                {String(formik.errors.opinion)}
              </div>
            )}
            <div className="field-hint">
              اكتب رأي الطالب وتجربته مع المادة أو الخدمة
            </div>
            <div className="character-count">
              {formik.values.opinion.length} حرف
            </div>
          </div>
        </div>

        {/* أزرار الإجراءات */}
        <div className="col-12">
          <div className="form-actions d-flex justify-content-center gap-3 mt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              appearance="primary"
              className="enhanced-submit-btn"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={16} style={{ marginLeft: '8px', color: 'white' }} />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <CheckCircle style={{ fontSize: '18px', marginLeft: '5px' }} />
                  {studentOpinion ? "تحديث الرأي" : "إضافة الرأي"}
                </>
              )}
            </Button>
            
            <Button
              type="button"
              onClick={() => navigate(-1)}
              appearance="subtle"
              className="enhanced-cancel-btn"
              disabled={isSubmitting}
              size="lg"
            >
              إلغاء
            </Button>
          </div>
        </div>
      </form>

      <style jsx>{`
        .student-opinion-form-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .form-header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 2px solid #f0f0f0;
        }

        .form-title {
          color: #2c3e50;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 14px;
          line-height: 1.5;
        }

        .enhanced-form-control {
          margin-bottom: 24px;
        }

        .form-label.required::after {
          content: " *";
          color: #e74c3c;
          font-weight: bold;
        }

        .input-wrapper,
        .textarea-wrapper {
          position: relative;
        }

        .form-control {
          padding: 12px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
          background-color: #fafbfc;
          width: 100%;
        }

        .form-control:focus {
          border-color: #2196f3;
          box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
          background-color: white;
          outline: none;
        }

        .form-control.is-valid {
          border-color: #4caf50;
          background-color: #f8fff8;
        }

        .form-control.is-invalid {
          border-color: #f44336;
          background-color: #fff8f8;
        }

        .image-upload-wrapper {
          border: 2px dashed #e1e5e9;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
          background-color: #fafbfc;
        }

        .image-upload-wrapper:hover {
          border-color: #2196f3;
          background-color: #f8fbff;
        }

        .image-preview {
          margin-bottom: 15px;
        }

        .preview-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #2196f3;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .rating-wrapper {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 10px 0;
        }

        .rating-text {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .field-hint {
          font-size: 12px;
          color: #6c757d;
          margin-top: 6px;
          display: flex;
          align-items: center;
        }

        .character-count {
          font-size: 11px;
          color: #9e9e9e;
          text-align: left;
          margin-top: 4px;
        }

        .invalid-feedback {
          color: #f44336;
          font-size: 13px;
          margin-top: 6px;
          display: flex;
          align-items: center;
        }

        .enhanced-submit-btn {
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%) !important;
          border: none !important;
          padding: 12px 32px !important;
          border-radius: 8px !important;
          color: white !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          display: flex !important;
          align-items: center !important;
          transition: all 0.3s ease !important;
          min-width: 140px !important;
          justify-content: center !important;
        }

        .enhanced-submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3) !important;
        }

        .enhanced-submit-btn:disabled {
          background: #bdbdbd !important;
          cursor: not-allowed !important;
          transform: none !important;
          box-shadow: none !important;
        }

        .enhanced-cancel-btn {
          background: #f5f5f5 !important;
          border: 2px solid #e0e0e0 !important;
          padding: 12px 24px !important;
          border-radius: 8px !important;
          color: #666 !important;
          font-weight: 500 !important;
          font-size: 14px !important;
          transition: all 0.3s ease !important;
        }

        .enhanced-cancel-btn:hover:not(:disabled) {
          background: #eeeeee !important;
          border-color: #d0d0d0 !important;
          color: #333 !important;
        }

        .form-actions {
          padding-top: 20px;
          border-top: 1px solid #f0f0f0;
        }

        @media (max-width: 768px) {
          .form-actions {
            flex-direction: column;
          }
          
          .enhanced-submit-btn,
          .enhanced-cancel-btn {
            width: 100%;
            margin-bottom: 8px;
          }

          .rating-wrapper {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default StudentOpinionForm;

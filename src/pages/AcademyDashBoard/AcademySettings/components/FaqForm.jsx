import { useFormik } from "formik";
import { FaqSchema } from "../../../../validations/faq";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateFAQ,
  useUpdateFAQ,
} from "../../../../framework/accademy/academysetting-faq";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { CheckCircle, Error, Info } from "@mui/icons-material";

function FaqForm({ faq }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  let {
    postData: createData,
    isLoading: isLoadingCreateFaq,
    errors: errorsCreateFaq,
  } = useCreateFAQ();

  let {
    postData: updateData,
    isLoading: isLoadingUpdateFaq,
    errors: errorsUpdateFaq,
  } = useUpdateFAQ(faq?.id);

  const formik = useFormik({
    initialValues: {
      question: faq ? faq.question : "",
      answer: faq ? faq.answer : "",
    },
    validationSchema: FaqSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        if (faq) {
          await updateData(values);
        } else {
          await createData(values);
        }
      } catch (error) {
        console.error("خطأ في إرسال النموذج:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!isLoadingCreateFaq && !errorsCreateFaq) {
      toast.success("تم إضافة السؤال الشائع بنجاح", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: <CheckCircle />,
      });
      navigate(location.pathname.replace(`/add`, ""));
    }
  }, [isLoadingCreateFaq, errorsCreateFaq, navigate]);

  useEffect(() => {
    if (!isLoadingUpdateFaq && !errorsUpdateFaq && faq) {
      toast.success("تم تحديث السؤال الشائع بنجاح", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: <CheckCircle />,
      });
      navigate(location.pathname.replace(`/edit/${faq?.id}`, ""));
    }
  }, [isLoadingUpdateFaq, errorsUpdateFaq, navigate, faq?.id, faq]);

  const getFieldStatus = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return 'error';
    }
    if (formik.touched[fieldName] && !formik.errors[fieldName] && formik.values[fieldName]) {
      return 'success';
    }
    return 'default';
  };

  const renderFieldIcon = (fieldName) => {
    const status = getFieldStatus(fieldName);
    switch (status) {
      case 'error':
        return <Error style={{ color: '#f44336', fontSize: '20px' }} />;
      case 'success':
        return <CheckCircle style={{ color: '#4caf50', fontSize: '20px' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="faq-form-container">
      <div className="form-header mb-4">
        <h3 className="form-title">
          {faq ? "تعديل السؤال الشائع" : "إضافة سؤال شائع جديد"}
        </h3>
        <p className="form-subtitle text-muted">
          {faq 
            ? "قم بتعديل السؤال والإجابة حسب الحاجة" 
            : "أضف سؤالاً شائعاً جديداً مع إجابته المفصلة"
          }
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="row g-4">
        <div className="col-12">
          <div className="CustomFormControl enhanced-form-control">
            <label htmlFor="question" className="form-label required">
              <Info style={{ fontSize: '16px', marginLeft: '5px', color: '#2196f3' }} />
              السؤال الشائع
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="مثال: ما هي مدة المادة التعليمية"
                id="question"
                name="question"
                value={formik.values.question}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${getFieldStatus('question') === 'error' ? 'is-invalid' : ''} ${getFieldStatus('question') === 'success' ? 'is-valid' : ''}`}
                disabled={isSubmitting}
              />
              <div className="field-icon">
                {renderFieldIcon('question')}
              </div>
            </div>
            {formik.touched.question && formik.errors.question && (
              <div className="invalid-feedback d-block">
                <Error style={{ fontSize: '14px', marginLeft: '5px' }} />
                {formik.errors.question}
              </div>
            )}
            <div className="field-hint">
              اكتب سؤالاً واضحاً ومفهوماً يتكرر كثيراً من المستخدمين
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="CustomFormControl enhanced-form-control">
            <label htmlFor="answer" className="form-label required">
              <Info style={{ fontSize: '16px', marginLeft: '5px', color: '#2196f3' }} />
              الإجابة التفصيلية
            </label>
            <div className="textarea-wrapper">
              <textarea
                placeholder="اكتب إجابة شاملة ومفصلة للسؤال..."
                id="answer"
                name="answer"
                value={formik.values.answer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${getFieldStatus('answer') === 'error' ? 'is-invalid' : ''} ${getFieldStatus('answer') === 'success' ? 'is-valid' : ''}`}
                rows="6"
                disabled={isSubmitting}
              />
              <div className="field-icon">
                {renderFieldIcon('answer')}
              </div>
            </div>
            {formik.touched.answer && formik.errors.answer && (
              <div className="invalid-feedback d-block">
                <Error style={{ fontSize: '14px', marginLeft: '5px' }} />
                {formik.errors.answer}
              </div>
            )}
            <div className="field-hint">
              قدم إجابة واضحة ومفصلة تساعد المستخدمين على فهم الموضوع
            </div>
            <div className="character-count">
              {formik.values.answer.length} حرف
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="form-actions d-flex justify-content-center gap-3 mt-4">
            <button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              className="submitBtn enhanced-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={16} style={{ marginLeft: '8px', color: 'white' }} />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <CheckCircle style={{ fontSize: '18px', marginLeft: '5px' }} />
                  {faq ? "تحديث السؤال" : "إضافة السؤال"}
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cancelBtn enhanced-cancel-btn"
              disabled={isSubmitting}
            >
              إلغاء
            </button>
          </div>
        </div>
      </form>

      <style jsx>{`
        .faq-form-container {
          max-width: 800px;
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

        .field-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .textarea-wrapper .field-icon {
          top: 20px;
          transform: none;
        }

        .form-control {
          padding: 12px 45px 12px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
          background-color: #fafbfc;
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
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
          border: none;
          padding: 12px 32px;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          min-width: 140px;
          justify-content: center;
        }

        .enhanced-submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
        }

        .enhanced-submit-btn:disabled {
          background: #bdbdbd;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .enhanced-cancel-btn {
          background: #f5f5f5;
          border: 2px solid #e0e0e0;
          padding: 12px 24px;
          border-radius: 8px;
          color: #666;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .enhanced-cancel-btn:hover:not(:disabled) {
          background: #eeeeee;
          border-color: #d0d0d0;
          color: #333;
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
        }
      `}</style>
    </div>
  );
}

export default FaqForm;

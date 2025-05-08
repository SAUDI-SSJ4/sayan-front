import { useFormik } from "formik";
import { FaqSchema } from "../../../../validations/faq";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateFAQ,
  useUpdateFAQ,
} from "../../../../framework/accademy/academysetting-faq";
import { useEffect } from "react";

function FaqForm({ faq }) {
  const navigate = useNavigate();
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
    onSubmit: (values) => (faq ? updateData(values) : createData(values)),
  });
  useEffect(() => {
    if (!isLoadingCreateFaq && !errorsCreateFaq) {
      toast.success("تم اضافة الاسئله الشائعة", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(location.pathname.replace(`/add`, ""));
    }
  }, [isLoadingCreateFaq, errorsCreateFaq, navigate]);

  useEffect(() => {
    if (!isLoadingUpdateFaq && !errorsUpdateFaq && faq) {
      toast.success("تم تحديث البيانات", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(location.pathname.replace(`/edit/${faq?.id}`, ""));
    }
  }, [isLoadingUpdateFaq, errorsUpdateFaq, navigate, faq?.id, faq]);

  return (
    <form onSubmit={formik.handleSubmit} className="row">
      <div className="col-lg-6 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="question">السؤال</label>
          <input
            type="text"
            placeholder="ادخل السؤال هنا"
            id="question"
            name="question"
            value={formik.values.question}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.question && formik.errors.question && (
            <div>{formik.errors.question}</div>
          )}
        </div>
      </div>

      <div className="col-lg-12 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="answer">الايجابة</label>
          <textarea
            placeholder="ادخل الاجابة هنا"
            id="answer"
            name="answer"
            value={formik.values.answer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.answer && formik.errors.answer && (
            <div>{formik.errors.answer}</div>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="submitBtn"
        >
          {faq ? "تعديل" : "اضافة"}
        </button>
      </div>
    </form>
  );
}

export default FaqForm;

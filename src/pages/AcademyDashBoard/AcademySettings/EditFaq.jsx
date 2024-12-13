import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import {
  useSpasificFAQ,
  useUpdateFAQ,
  useCreateFAQ,
} from "../../../framework/accademy/academysetting-faq";
import { getChangedValues } from "../../../utils/helpers";

const validationSchema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

const EditSlider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nav = useParams();

  let { data: sliderData, isLoading } = useSpasificFAQ(nav.slug);
  let { postData: updateData } = useUpdateFAQ(nav.slug);
  let { postData: createData } = useCreateFAQ();

  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (sliderData) {
        const changedValues = getChangedValues(values, sliderData);
        updateData(changedValues);
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
        navigate(location.pathname.replace(`/edit/${nav.slug}`, ""));
      } else {
        createData(values);
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
    },
  });

  useEffect(() => {
    if (sliderData) {
      formik.setValues(sliderData);
    }
  }, [sliderData]);

  return isLoading ? (
    <div className="w-full h-50 d-flex justify-content-center align-items-center">
      <Spinner />
    </div>
  ) : (
    <div className="mb-5 all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}> تعديل </div>
            </div>
            <div
              className="updateBtn"
              onClick={() => navigate(location.pathname.replace("/edit", ""))}
            >
              الرجوع <KeyboardBackspaceIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="CustomCard formCard all-add-notific pb-4 pt-4">
        <form onSubmit={formik.handleSubmit} className="row">
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="question">العنوان</label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
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
              <label htmlFor="answer">الوصف</label>
              <textarea
                placeholder="ادخل النص هنا"
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
            <button type="submit" className="submitBtn">
              {sliderData ? "تحديث" : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSlider;

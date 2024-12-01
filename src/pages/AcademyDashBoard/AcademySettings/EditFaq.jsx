import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import defualt from "../../../assets/images/img.png";
import chroma from "chroma-js";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import TextEditor from "../../../component/UI/TextEditor";
import UploadFileInput from "../../../component/UI/UploadFile/UploadFileInput";
import { Toggle } from "rsuite";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSlider, useUpdateSlider } from "../../../framework/accademy/academysetting-slider";
import { Spinner } from "react-bootstrap";
import { Error } from "@mui/icons-material";
import {
  useCreateFAQ,
  useSpasificFAQ,
  useUpdateFAQ,
} from "../../../framework/accademy/academysetting-faq";





const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  content: Yup.string().required("Content  is required"),
});

const EditSlider = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let nav = useParams();


  console.log(nav.slug);

  let { data: sliderData, isLoading, errors } = useSpasificFAQ(nav.slug);
  let { data, isLoading: loader, error, postData } = useUpdateFAQ(nav.slug);
  let { data: createData, postData: postCreate } = useCreateFAQ();

  const handleSubmit = (values) => {
    if (sliderData) {
      postData(values);
      toast.success("تم تحديث البيانات ", {
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
      console.log(values);
      postCreate(values);
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
  };
  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (sliderData) {
      formik.setValues(sliderData);
    } else {
      formik.setValues({
        title: "",
        content: "",
      });
    }
  }, [sliderData]);

  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("file", acceptedFiles[0]);
  };

  return isLoading ? (
    <div className="w-full h-50 d-flex justify-content-center align-items-center">
      <Spinner className="" />
    </div>
  ) : (
    <div className="mb-5 all-info-top-header main-info-top">
      <div className="TablePageHeader ">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name ">
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
              <label htmlFor="title">العنوان </label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">الوصف</label>
              <textarea
                type="text"
                placeholder="ادخل النص هنا"
                id="content"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.content && formik.errors.content && (
                <div>{formik.errors.content}</div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="submitBtn">
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSlider;

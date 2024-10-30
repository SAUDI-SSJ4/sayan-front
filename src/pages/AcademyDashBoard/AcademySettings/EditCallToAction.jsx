import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import {
  useCreateAction,
  useSpasificActions,
  useUpdateAction,
} from "../../../framework/accademy/academysetting-calltoaction";
import { useMutation } from "@tanstack/react-query";
import { postCreateAction, postUpdateAction } from "../../../utils/apis/client/academy";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  content: Yup.string().required("Content  is required"),
});

const EditCallToAction = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const nav = useParams();
  const fileInputRef = useRef(null);
  let [change, setChange] = useState(0);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setChange(1);
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    formik.setFieldValue("image", selectedFile); // Set image in formik
  };

  const { data: sliderData, isLoading } = useSpasificActions(nav.slug);

  const createMutation = useMutation({
    mutationFn: (data) => postCreateAction(data),
    onSuccess: () => {
      toast.success("تم اضافة الاعدادات", {
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
    },
    onError: ({ response }) => {
      console.log(response);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => postUpdateAction(nav.slug, data),
    onSuccess: () => {
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
    },
    onError: ({ response }) => {
      console.log(response);
    },
  });

  const handleSubmit = (values) => {
    if (sliderData) {
      updateMutation.mutateAsync(values);
    } else {
      createMutation.mutateAsync(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: null, // Ensure image is set to null initially
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      if (file) {
        formData.append("image", file); // Append the selected file
      }
      handleSubmit(formData);
    },
  });

  useEffect(() => {
    if (nav.slug && sliderData) {
      formik.setValues(sliderData);
    }
  }, [nav.slug, sliderData]);

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
          <div className=" justify-content-center">
            <div className=" row m-auto justify-content-center">
              {formik?.values?.image != null && (
                <img
                  src={!change ? formik?.values?.image : URL.createObjectURL(formik.values.image)}
                  alt="Selected File"
                  style={{
                    maxWidth: "366px",
                    maxHeight: "212px",
                    objectFit: "contain",
                    marginTop: "10px",
                  }}
                />
              )}

              <div className="d-flex button-content--1 justify-content-center">
                <input
                  type="file"
                  name="image"
                  id="image"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div
                  style={{
                    background: "white",
                    marginTop: "25px",
                    marginBottom: "30px",
                  }}
                  className="updateBtn"
                  onClick={handleButtonClick}
                >
                  رفع الصورة
                </div>
              </div>
            </div>
          </div>
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

export default EditCallToAction;

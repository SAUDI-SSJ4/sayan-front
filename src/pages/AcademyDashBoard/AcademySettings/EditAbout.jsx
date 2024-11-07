import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useAbout, useUpdateAbout } from "../../../framework/accademy/academysetting-about";
import { useMutation } from "@tanstack/react-query";
import { getAbout, postAbout } from "../../../utils/apis/client/academy";
import { JustifyContentWrapper } from "../../../utils/styles";
import { ButtonSpinner } from "../../../component/UI/Buttons/ButtonSpinner";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  sub_title: Yup.string().required("Sub Title is required"),
  content: Yup.string().required("Content  is required"),
  feature_one: Yup.string().required("Feature  is required"),
  feature_two: Yup.string().required("Feature  is required"),
});

const EditAbout = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  let [change, setChange] = useState(0);
  const [file, setFile] = useState();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setChange(1);
    formik.setFieldValue("image", e.target.files[0]);
    setFile(e.target.files[0].file);
  };

  const mutation = useMutation({
    mutationFn: (data) => postAbout(data),
    onSuccess: () => {
      toast.success("Data updated successfully", {
        position: "top-left",
        theme: "dark",
      });
      navigate("/academy/settings/about");
    },
    onError: (error) => {
      toast.error("An error occurred", {
        position: "top-left",
        theme: "dark",
      });
    },
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("title", values.title);
      formData.append("sub_title", values.sub_title);
      formData.append("content", values.content);
      formData.append("feature_one", values.feature_one);
      formData.append("feature_two", values.feature_two);
      mutation.mutateAsync(formData);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    getAbout()
      .then((data) => {
        console.log(data);
        // formik.setValues(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

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
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="sub_title">العنوان الفرعى </label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="sub_title"
                name="sub_title"
                value={formik.values.sub_title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.sub_title && formik.errors.sub_title && (
                <div>{formik.errors.sub_title}</div>
              )}
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
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">السمة الاولى</label>
              <input
                type="text"
                placeholder="ادخل النص هنا"
                id="feature_one"
                name="feature_one"
                value={formik.values.feature_one}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.feature_one && formik.errors.feature_one && (
                <div>{formik.errors.feature_one}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">السمة الثانية</label>
              <input
                type="text"
                placeholder="ادخل النص هنا"
                id="feature_two"
                name="feature_two"
                value={formik.values.feature_two}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.feature_two && formik.errors.feature_two && (
                <div>{formik.errors.feature_two}</div>
              )}
            </div>
          </div>

          <JustifyContentWrapper className="mt-4">
            <ButtonSpinner titel="إضافة" isPending={mutation.isPending} />
          </JustifyContentWrapper>
        </form>
      </div>
    </div>
  );
};

export default EditAbout;

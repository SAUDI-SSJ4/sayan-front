import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { JustifyContentWrapper } from "../../../utils/styles";
import { ButtonSpinner } from "../../../component/UI/Buttons/ButtonSpinner";
import {
  getChangedValues,
  isValidURL,
  populateFormData,
} from "../../../utils/helpers";
import { useSetAbout } from "../../../utils/hooks/set/useSetting";
import { useAbout } from "../../../services/queries";
import { useSelector } from "react-redux";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  sub_title: Yup.string().required("Subtitle is required"),
  content: Yup.string().required("Content is required"),
  feature_one: Yup.string().required("Feature one is required"),
  feature_two: Yup.string().required("Feature two is required"),
});

const EditAbout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  let [change, setChange] = useState(0);
  const [file, setFile] = useState();
  const [aboutId, setAboutId] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setChange(1);
    formik.setFieldValue("image", selectedFile);
    setFile(selectedFile);
  };
  const profileInfo = useSelector((state) => state.academyUser.academy);
  const academyId = profileInfo?.academy?.id;
  const { data: aboutData, isLoading } = useAbout(academyId);

  useEffect(() => {
    if (aboutData?.about) {
      console.log(aboutData.about);
      setAboutId(aboutData.about.id);
      formik.setValues(aboutData.about);
    }
  }, [aboutData?.about]);

  const mutation = useSetAbout();

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: (data) => {
      mutation.mutateAsync(data);
    },
  });

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
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              <span style={{ color: "#7E8799" }}> تعديل </span>
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
          <div className="justify-content-center">
            <div className="row m-auto justify-content-center">
              <img
                src={
                  !change
                    ? formik.values.image
                    : URL.createObjectURL(formik.values.image)
                }
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
                <button
                  type="button"
                  className="updateBtn"
                  style={{
                    background: "white",
                    marginTop: "25px",
                    marginBottom: "30px",
                  }}
                  onClick={handleButtonClick}
                >
                  رفع الصورة
                </button>
              </div>
            </div>
          </div>

          {[
            {
              id: "title",
              label: "العنوان",
              placeholder: "ادخل عنوان المقال هنا",
            },
            {
              id: "sub_title",
              label: "العنوان الفرعى",
              placeholder: "ادخل عنوان المقال هنا",
            },
            {
              id: "content",
              label: "الوصف",
              placeholder: "ادخل النص هنا",
              type: "textarea",
            },
            {
              id: "feature_one",
              label: "السمة الاولى",
              placeholder: "ادخل النص هنا",
            },
            {
              id: "feature_two",
              label: "السمة الثانية",
              placeholder: "ادخل النص هنا",
            },
          ].map(({ id, label, placeholder, type = "text" }) => (
            <div
              className={`col-lg-${id === "content" ? "12" : "6"} col-md-12`}
              key={id}
            >
              <div className="CustomFormControl">
                <label htmlFor={id}>{label}</label>
                {type === "textarea" ? (
                  <textarea
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    value={formik.values[id]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                ) : (
                  <input
                    type={type}
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    value={formik.values[id]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                )}
                {formik.touched[id] && formik.errors[id] && (
                  <div>{formik.errors[id]}</div>
                )}
              </div>
            </div>
          ))}

          <JustifyContentWrapper className="mt-4">
            <ButtonSpinner titel="إضافة" isPending={mutation.isPending} />
          </JustifyContentWrapper>
        </form>
      </div>
    </div>
  );
};

export default EditAbout;

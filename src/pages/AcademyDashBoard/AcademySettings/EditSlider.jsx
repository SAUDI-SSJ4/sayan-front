import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DisplayImage,
  ImageInput,
  JustifyContentWrapper,
  SetImageButton,
} from "../../../utils/styles";
import { ButtonSpinner } from "../../../component/UI/Buttons/ButtonSpinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MainSpinner } from "../../../component/UI/MainSpinner";
import { Button } from "rsuite";
import { getChangedValues, populateFormData } from "../../../utils/helpers";
import { useToast } from "../../../utils/hooks/useToast";
import { useSetSilider } from "../../../utils/hooks/set/useSetting";
import { useSlider } from "../../../framework/accademy/academysetting-slider";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
  sub_title: Yup.string().required("العنوان الفرعي مطلوب"),
  content: Yup.string().required("المحتوى مطلوب"),
  image: Yup.mixed().required("الصورة مطلوبة"),
  first_button_title: Yup.string().required("زر رئيسي مطلوب"),
  first_button_link: Yup.string()
    .required("الرابط الرئيسي مطلوب")
    .url("يجب أن يكون رابطًا صحيحًا"),
  second_button_title: Yup.string().required("زر ثانوي مطلوب"),
  second_button_link: Yup.string()
    .required("الرابط الثانوي مطلوب")
    .url("يجب أن يكون رابطًا صحيحًا"),
});

const EditSlider = () => {
  const navigate = useNavigate();
  const profileInfo = useSelector((state) => state.academyUser.academy);
  const academyId = profileInfo?.academy?.id;
  const { data: sliderData, isLoading } = useSlider(academyId);

  return (
    <div className="mb-5 all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              <div style={{ color: "#7E8799" }}>تعديل السلايدر</div>
            </div>
            <div
              className="updateBtn"
              onClick={() => navigate(location.pathname.replace("/edit", ""))}
            >
              العودة <KeyboardBackspaceIcon />
            </div>
          </div>
        </div>
      </div>
      {isLoading && <MainSpinner css="vh-100" />}
      {!isLoading && sliderData && (
        <div className="CustomCard formCard all-add-notific pb-4 pt-4">
          <Form sliderData={sliderData} academyId={academyId} />
        </div>
      )}
    </div>
  );
};

export default EditSlider;

const Form = ({ sliderData, academyId }) => {
  const fileInputRef = useRef(null);
  const mutation = useSetSilider(academyId);
  const formik = useFormik({
    initialValues: {
      title: sliderData.slider.title,
      sub_title: sliderData.slider.sub_title,
      content: sliderData.slider.content,
      image: sliderData.slider.image,
      first_button_title: sliderData.slider.first_button_title,
      first_button_link: sliderData.slider.first_button_link,
      second_button_title: sliderData.slider.second_button_title,
      second_button_link: sliderData.slider.second_button_link,
    },
    validationSchema,
    onSubmit: async (data) => {
      const formData = new FormData();
      const imageFile =
        typeof data.image === "object" ? { image: data.image } : {};
      if (!imageFile) {
        formData.delete("image");
      }
      populateFormData(formData, data);
      mutation.mutateAsync(formData);
    },
  });

  return (
    <form className="row" onSubmit={formik.handleSubmit}>
      <JustifyContentWrapper>
        <div className="row g-3 button-content--1 m-auto justify-content-center">
          {formik?.values?.image && (
            <DisplayImage
              src={
                typeof formik.values.image === "object" &&
                formik.values.image instanceof File
                  ? URL.createObjectURL(formik.values.image)
                  : formik.values.image
              }
              alt="Slider Image"
            />
          )}
          <div className="d-flex justify-content-center">
            <ImageInput
              type="file"
              ref={fileInputRef}
              onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
            />
            <SetImageButton onClick={() => fileInputRef.current.click()}>
              تحميل الصورة
            </SetImageButton>
          </div>
        </div>
      </JustifyContentWrapper>

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
          id: "first_button_title",
          label: "عنوان الزر الأول",
          placeholder: "أدخل عنوان الزر الأول",
        },
        {
          id: "first_button_link",
          label: "رابط الزر الأول",
          placeholder: "أدخل رابط الزر الأول",
        },
        {
          id: "second_button_title",
          label: "عنوان الزر الثاني",
          placeholder: "أدخل عنوان الزر الثاني",
        },
        {
          id: "second_button_link",
          label: "رابط الزر الثاني",
          placeholder: "أدخل رابط الزر الثاني",
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
              <p className="text-red-500">{formik.errors[id]}</p>
            )}
          </div>
        </div>
      ))}

      <div className="col-lg-12 col-md-12 mt-4">
        <Button
          appearance="primary"
          disabled={mutation.isSubmitting}
          size="lg"
          type="submit"
        >
          {mutation.isLoading && <Spinner />}
          <span>حفظ التغييرات</span>
        </Button>
      </div>
    </form>
  );
};

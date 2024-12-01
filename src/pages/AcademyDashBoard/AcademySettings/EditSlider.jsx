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
import { useMutation, useQuery } from "@tanstack/react-query";
import { postSlider, getSlider } from "../../../utils/apis/client/academy";
import { ButtonSpinner } from "../../../component/UI/Buttons/ButtonSpinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MainSpinner } from "../../../component/UI/MainSpinner";
import { Button } from "rsuite";
import { isValidURL } from "../../../utils/helpers";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
  sub_title: Yup.string().required("العنوان الفرعي مطلوب"),
  content: Yup.string().required("المحتوى مطلوب"),
  image: Yup.mixed().required("الصورة مطلوبة"),
  first_button_title: Yup.string().required("زر رئيسي مطلوب"),
  first_button_link: Yup.string().required("الرابط الرئيسي مطلوب"),
  second_button_title: Yup.string().required("زر ثانوي مطلوب"),
  second_button_link: Yup.string().required("الرابط الثانوي مطلوب"),

  // video: Yup.mixed().required("الفيديو مطلوب"),
  // video_type: Yup.string().required("نوع الفيديو مطلوب"),
});

const EditSlider = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)
  const [sliderId, setSliderId] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    getSlider()
      .then((data) => {
        setSliderId(data.slider.id)
        formik.setValues(data.slider);

      })
      .catch((error) => {
        console.log(error);
      }).finally(() => setIsLoading(false));
  }, []);

  const mutation = useMutation({
    mutationFn: (data) => { postSlider(sliderId, data) },
    onSuccess: (res) => {
      console.log("print from useMutation onSuccess");
      console.log(res)
      toast.success("تم تحديث البيانات بنجاح", {
        position: "top-left",
        theme: "dark",
      });
      // navigate("/academy/settings/slider");
    },
    onError: (error) => {
      toast.error("حدث خطأ ما", {
        position: "top-left",
        theme: "dark",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      sub_title: "",
      content: "",
      image: null,
      first_button_title: "",
      first_button_link: "",
      second_button_title: "",
      second_button_link: "",
      // video: null,
      // video_type: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      if (!isValidURL(values.image)) {
        formData.append("image", values.image);
      }

      if (values.title) {
        formData.append("title", values.title);
      }

      if (values.sub_title) {
        formData.append("sub_title", values.sub_title);
      }

      if (values.content) {
        formData.append("content", values.content);
      }

      if (values.first_button_title) {
        formData.append("first_button_title", values.first_button_title);
      }

      if (values.first_button_link) {
        formData.append("first_button_link", values.first_button_link);
      }

      if (values.second_button_title) {
        formData.append("second_button_title", values.second_button_title);
      }

      if (values.second_button_link) {
        formData.append("second_button_link", values.second_button_link);
      }

      // Submit the formData using the mutation
      mutation.mutateAsync(formData);
    }
  });

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

      <div className="CustomCard formCard all-add-notific pb-4 pt-4">
        {isLoading ? (
          <MainSpinner css="vh-100" />
        ) : (
          <form className="row" onSubmit={formik.handleSubmit}>
            <JustifyContentWrapper>
              <div className="row g-3 button-content--1 m-auto justify-content-center">
                {formik?.values?.image && (
                  <DisplayImage
                    src={
                      typeof formik.values.image === "object" && formik.values.image instanceof File
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

            <div className="col-lg-6 col-md-12">
              <div className="CustomFormControl">
                <label htmlFor="title">العنوان</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل العنوان هنا"
                />
                {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="CustomFormControl">
                <label htmlFor="sub_title">العنوان الفرعي</label>
                <input
                  type="text"
                  id="sub_title"
                  name="sub_title"
                  value={formik.values.sub_title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل العنوان الفرعي هنا"
                />
                {formik.touched.sub_title && formik.errors.sub_title && (
                  <div>{formik.errors.sub_title}</div>
                )}
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="CustomFormControl">
                <label htmlFor="content">المحتوى</label>
                <textarea
                  id="content"
                  name="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل المحتوى هنا"
                />
                {formik.touched.content && formik.errors.content && (
                  <div>{formik.errors.content}</div>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="CustomFormControl">
                <label htmlFor="first_button_title">الزر الرئيسي</label>
                <input
                  type="text"
                  id="first_button_title"
                  name="first_button_title"
                  value={formik.values.first_button_title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل نص الزر الرئيسي هنا"
                />
                {formik.touched.first_button_title && formik.errors.first_button_title && (
                  <p>{formik.errors.first_button_title}</p>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="CustomFormControl">
                <label htmlFor="first_button_link">رابط الزر الرئيسي</label>
                <input
                  type="text"
                  id="first_button_link"
                  name="first_button_link"
                  value={formik.values.first_button_link}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل رابط الزر الرئيسي هنا"
                />
                {formik.touched.first_button_link && formik.errors.first_button_link && (
                  <p>{formik.errors.first_button_link}</p>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="CustomFormControl">
                <label htmlFor="second_button_title">الزر الثانوي</label>
                <input
                  type="text"
                  id="second_button_title"
                  name="second_button_title"
                  value={formik.values.second_button_title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل نص الزر الثانوي هنا"
                />
                {formik.touched.second_button_title && formik.errors.second_button_title && (
                  <div>{formik.errors.second_button_title}</div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="CustomFormControl">
                <label htmlFor="second_button_link">رابط الزر الثانوي</label>
                <input
                  type="text"
                  id="second_button_link"
                  name="second_button_link"
                  value={formik.values.second_button_link}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="أدخل رابط الزر الثانوي هنا"
                />
                {formik.touched.second_button_link && formik.errors.second_button_link && (
                  <div>{formik.errors.second_button_link}</div>
                )}
              </div>
            </div>

            <div className="col-lg-12 col-md-12 mt-4">
              <Button appearance="primary" size="lg" type="submit">
                {mutation.isLoading ? <ButtonSpinner /> : "حفظ التغييرات"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditSlider;

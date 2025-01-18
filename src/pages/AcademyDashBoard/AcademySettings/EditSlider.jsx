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

const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
  sub_title: Yup.string().required("العنوان الفرعي مطلوب"),
  content: Yup.string().required("المحتوى مطلوب"),
  image: Yup.mixed().required("الصورة مطلوبة"),
  first_button_title: Yup.string().required("زر رئيسي مطلوب"),
  first_button_link: Yup.string().required("الرابط الرئيسي مطلوب"),
  second_button_title: Yup.string().required("زر ثانوي مطلوب"),
  second_button_link: Yup.string().required("الرابط الثانوي مطلوب"),
});

const EditSlider = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [ids, setIds] = useState({ sliderId: null, academyId: null });
  const [slider, setSlider] = useState([])
  const { data: sliderData, isLoading, errors } = useSlider();

  useEffect(() => {
    if (sliderData?.slider) {
      setIds({
        sliderId: sliderData.slider.id,
        academyId: sliderData.slider.academy_id,
      });
      setSlider(sliderData.slider)
      formik.setValues(sliderData.slider);
    }

  }, [sliderData?.slider]);


  const mutation = useSetSilider(ids.sliderId , ids.academyId);

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
    },
    validationSchema,
    onSubmit: async (data) => {
      const formData = new FormData();
      const values = getChangedValues(data, slider);
      populateFormData(formData, values)
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

            {/* Form fields */}

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

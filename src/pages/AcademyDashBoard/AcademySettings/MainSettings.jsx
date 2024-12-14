import React, { useEffect, useRef, useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
=======
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isEmptyArray, useFormik } from "formik";
>>>>>>> 7570d96 (Your commit message)
import * as Yup from "yup";
import styled from "styled-components";
import { Button, Input, InputGroup } from "rsuite";
import { ContentCopy, DisplaySettings } from "@mui/icons-material";
import { MainSpinner } from "../../../component/UI/MainSpinner";
import UploadImage from "../../../component/UI/UploadFile/UploadImage";
import Cookies from "js-cookie";
<<<<<<< HEAD
import { getAcademySettings, postAcademySettings } from "../../../utils/apis/client/academy";
import { getChangedValues, isValidURL } from "../../../utils/helpers";

=======
import { getChangedValues, isValidURL, populateFormData } from "../../../utils/helpers";
import { useAcademySettings } from "../../../utils/hooks/get/useSetting";
import { useSetAcademySettings } from "../../../utils/hooks/set/useSetting";
>>>>>>> 7570d96 (Your commit message)
const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم الأكاديمية مطلوب"),
  logo: Yup.string().required("شعار الأكاديمية مطلوب"),
  favicon: Yup.string().required("الأيقونة المفضلة للأكاديمية مطلوبة"),
  primary_color: Yup.string().required("اللون الأساسي مطلوب"),
  secondary_color: Yup.string().required("اللون الثانوي مطلوب"),
});

const StyledLabel = styled.label`
  color: #2b3674;
  font-weight: bold;
  display: inline-block;
  font-size: 14px;
  padding-top: 10px;
`;

const StyledError = styled.p`
  color: #ff4747;
  font-size: 14px;
  padding-right: 10px;
`;

const ColorInput = ({ label, name, value, onChange, error }) => (
  <div>
    <StyledLabel htmlFor={name}>{label}:</StyledLabel>
    <div className="d-flex flex-row align-items-center gap-2">
      <Input
        type="color"
        style={{padding:"0", height: "34px", width: "34px", border: "1px solid #777", borderRadius: "5px" }}
        value={value}
        onChange={onChange}
      />
      <InputGroup>
        <Input disabled value={value} />
        <InputGroup.Button>
          <ContentCopy style={{ width: "1.2rem", height: "1.2rem" }} />
        </InputGroup.Button>
      </InputGroup>
    </div>
    {error && <StyledError>{error}</StyledError>}
  </div>
);

const MainSettings = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const academyId = Cookies.get("academy_id");

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await getAcademySettings();
      const template = data.template;
      setInitialValues({
        name: template.name,
        primary_color: template.primary_color,
        secondary_color: template.secondary_color,
        logo: template.logo,
        favicon: template.favicon,
      });
      formik.setValues({ ...template });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const mutation = useMutation({
    mutationFn: (data) => postAcademySettings(academyId, data),
    onSuccess: () => {
      toast.success("تم تحديث البيانات بنجاح", { position: "top-left", theme: "dark" });
      window.location.reload();
    },
    onError: () => {
      toast.error("حدث خطأ ما", { position: "top-left", theme: "dark" });
    },
  });
=======
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({})
  const [academyId, setAcademyId] = useState(Cookies.get("academy_id"))
  function isThereAChange(data) {
    return data.name !== initialValues.name || data.logo !== initialValues.logo || data.favicon !== initialValues.favicon || data.primary_color !== initialValues.primary_color || data.secondary_color !== initialValues.secondary_color;
  }

  const { data:AcademySettingsData = []  } = useAcademySettings()

  useEffect(() => {
    if (AcademySettingsData?.template) {
      setAcademyId(AcademySettingsData.template.id)
      setInitialValues({
        name: AcademySettingsData.template.name,
        primary_color: AcademySettingsData.template.primary_color,
        secondary_color: AcademySettingsData.template.secondary_color,
        logo: AcademySettingsData.template.logo,
        favicon: AcademySettingsData.template.favicon
      })
      formik.setValues({
        name: AcademySettingsData.template.name,
        primary_color: AcademySettingsData.template.primary_color,
        secondary_color: AcademySettingsData.template.secondary_color,
        logo: AcademySettingsData.template.logo,
        favicon: AcademySettingsData.template.favicon
      })
    }

  }, [AcademySettingsData?.template]);


  const mutation = useSetAcademySettings(academyId);
>>>>>>> 7570d96 (Your commit message)

  const formik = useFormik({
    initialValues,
    validationSchema,
<<<<<<< HEAD
    onSubmit: (values) => {
      const newValues = getChangedValues(values, initialValues);
      const formData = new FormData();

      Object.keys(newValues).forEach((key) => {
        if (key === "logo" || key === "favicon") {
          if (!isValidURL(newValues[key])) formData.append(key, newValues[key]);
        } else {
          formData.append(key, newValues[key]);
        }
      });

=======
    onSubmit: (data) => {
      if (!AcademySettingsData?.template) return;
      const formData = new FormData();
      const values = getChangedValues(data, AcademySettingsData?.template);
      populateFormData(formData, values)
>>>>>>> 7570d96 (Your commit message)
      mutation.mutateAsync(formData);
    },
  });

  const renderField = (label, name, Component) => (
    <div className="col-lg-6 col-md-12">
      <div className="CustomFormControl">
        <StyledLabel htmlFor={name}>{label}:</StyledLabel>
        <Component
          currentImage={formik.values[name]}
          onChange={(value) => formik.setFieldValue(name, value)}
        />
        {formik.touched[name] && formik.errors[name] && (
          <StyledError>{formik.errors[name]}</StyledError>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-5 all-info-top-header main-info-top">
        <div className="TablePageHeader">
          <div className="HeaderContainer">
            <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
              <div className="d-flex align-items-center name">
                <DisplaySettings sx={{ color: "#A3AED0" }} />
                <div style={{ color: "#7E8799" }}>الاعدادات الرئيسية</div>
              </div>
            </div>
          </div>
        </div>

        <div className="CustomCard formCard all-add-notific pb-4 pt-4">
          {isLoading ? (
            <MainSpinner css="vh-100" />
          ) : (
<<<<<<< HEAD
            <form className="row " onSubmit={formik.handleSubmit}>
              <div className="col-lg-12 col-md-12">
                <div className="CustomFormControl">
                  <StyledLabel htmlFor="name">اسم الأكاديمية :</StyledLabel>
                  <Input
=======
            <form className="row" onSubmit={formik.handleSubmit}>

              <div className="col-lg-12 col-md-12">
                <div className="CustomFormControl">
                  <label htmlFor="name">اسم الأكاديمية :</label>
                  <input
>>>>>>> 7570d96 (Your commit message)
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
<<<<<<< HEAD
                    placeholder="أدخل اسم الأكاديمية"
=======
                    placeholder="أدخل  اسم الأكاديمية"
>>>>>>> 7570d96 (Your commit message)
                  />
                  {formik.touched.name && formik.errors.name && (
                    <StyledError>{formik.errors.name}</StyledError>
                  )}
                </div>
              </div>

<<<<<<< HEAD
              {renderField("شعار الأكاديمية", "logo", UploadImage)}
              {renderField("الأيقونة المفضلة للأكاديمية", "favicon", UploadImage)}
              <div className="col-lg-6 col-md-12 mt-4">
              <ColorInput
                label="اللون الأساسي"
                name="primary_color"
                value={formik.values.primary_color}
                onChange={(value) => formik.setFieldValue("primary_color", value)}
                error={formik.touched.primary_color && formik.errors.primary_color}
                />
                </div>
                <div className="col-lg-6 col-md-12 mt-4">


              <ColorInput
                label="اللون الثانوي"
                name="secondary_color"
                value={formik.values.secondary_color}
                onChange={(value) => formik.setFieldValue("secondary_color", value)}
                error={formik.touched.secondary_color && formik.errors.secondary_color}
                />
                </div>

              <div className="d-flex align-items-center gap-4 mt-4">
                {formik.dirty && (
                  <>
                    <Button size="lg" type="submit" appearance="primary">
                      حفظ التغييرات
                    </Button>
                    <Button size="lg" onClick={() => formik.resetForm()}>
                      إلغاء
                    </Button>
                  </>
                )}
=======
              <div className="col-lg-6 col-md-12">
                <div className="CustomFormControl">
                  <StyledLabel htmlFor="logo" className="form-label">
                    شعار الأكاديمية :
                  </StyledLabel>
                  {
                    formik.values.logo &&
                    <UploadImage
                      currentImage={formik.values.logo}
                      onChange={(value) => formik.setFieldValue("logo", value)}
                    />
                  }
                  {formik.touched.logo && formik.errors.logo && (
                    <StyledError>{formik.errors.logo}</StyledError>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="CustomFormControl">
                  <StyledLabel htmlFor="favicon" className="form-label">
                    الأيقونة المفضلة للأكاديمية :
                  </StyledLabel>
                  {
                    formik.values.favicon && <UploadImage
                      currentImage={formik.values.favicon}
                      onChange={(value) => formik.setFieldValue("favicon", value)}
                    />
                  }
                  {formik.touched.favicon && formik.errors.favicon && (
                    <StyledError>{formik.errors.favicon}</StyledError>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="CustomFormControl">
                  <ColorInput
                    label="اللون الأساسي"
                    name="primary_color"
                    value={formik.values.primary_color}
                    onChange={(value) => formik.setFieldValue("primary_color", value)}
                    error={formik.touched.primary_color && formik.errors.primary_color}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="CustomFormControl">
                  <ColorInput
                    label="اللون الثانوي"
                    name="secondary_color"
                    value={formik.values.secondary_color}
                    onChange={(value) => formik.setFieldValue("secondary_color", value)}
                    error={formik.touched.secondary_color && formik.errors.secondary_color}
                  />
                </div>
              </div>


              <div className="d-flex align-items-center gap-4 mt-4">
                {
                  isThereAChange(formik.values) ? (<>
                    <Button size="lg" type="submit" appearance="primary">
                      حفظ التغييرات
                    </Button>
                    <Button size="lg" onClick={() => formik.setValues(initialValues)}>إلغاء</Button>
                  </>
                  ) : null
                }
>>>>>>> 7570d96 (Your commit message)
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
=======
const ColorInput = ({ label, name, value, onChange, error }) => (
  <div>
    <StyledLabel htmlFor={name}>{label}:</StyledLabel>
    <div className="d-flex flex-row align-items-center gap-2">
      <Input
        type="color"
        style={{ height: "34px", width: "34px", border: "1px solid #777", padding: '5px', borderRadius: "5px" }}
        value={value}
        onChange={onChange}
      />
      <InputGroup>
        <Input disabled value={value} />
        <InputGroup.Button>
          <ContentCopy style={{ width: "1.2rem", height: "1.2rem" }} />
        </InputGroup.Button>
      </InputGroup>
    </div>
    {error && <StyledError>{error}</StyledError>}
  </div>
);

>>>>>>> 7570d96 (Your commit message)
export default MainSettings;

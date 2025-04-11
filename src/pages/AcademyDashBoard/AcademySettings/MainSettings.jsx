import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isEmptyArray, useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Button, Input, InputGroup } from "rsuite";
import { ContentCopy, DisplaySettings } from "@mui/icons-material";
import { MainSpinner } from "../../../component/UI/MainSpinner";
import UploadImage from "../../../component/UI/UploadFile/UploadImage";
import Cookies from "js-cookie";
import { getChangedValues, isValidURL, populateFormData } from "../../../utils/helpers";
import { useSetAcademySettings } from "../../../utils/hooks/set/useSetting";
import { useSettings } from "../../../services/queries";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم الأكاديمية مطلوب"),
  logo: Yup.string().required("شعار الأكاديمية مطلوب"),
  favicon: Yup.string().required("الأيقونة الأكاديمية مطلوبة"),
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
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({})
  const [academyId, setAcademyId] = useState(Cookies.get("academy_id"))
  function isThereAChange(data) {
    return data.name !== initialValues.name || data.logo !== initialValues.logo || data.favicon !== initialValues.favicon || data.primary_color !== initialValues.primary_color || data.secondary_color !== initialValues.secondary_color;
  }

  const { data:AcademySettingsData = []  } = useSettings()

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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data) => {
      if (!AcademySettingsData?.template) return;
      const formData = new FormData();
      const values = getChangedValues(data, AcademySettingsData?.template);
      populateFormData(formData, values)
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
            <form className="row" onSubmit={formik.handleSubmit}>

              <div className="col-lg-12 col-md-12">
                <div className="CustomFormControl">
                  <label htmlFor="name">اسم الأكاديمية :</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="أدخل  اسم الأكاديمية"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <StyledError>{formik.errors.name}</StyledError>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="CustomFormControl">
                  <StyledLabel htmlFor="logo" className="form-label">
                    شعار الأكاديمية :
                  </StyledLabel>
                  
                
                    <UploadImage
                      currentImage={formik.values.logo}
                      onChange={(value) => formik.setFieldValue("logo", value)}
                    />
                  
                  {formik.touched.logo && formik.errors.logo && (
                    <StyledError>{formik.errors.logo}</StyledError>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="CustomFormControl">
                  <StyledLabel htmlFor="favicon" className="form-label">
                  ايقونة الأكاديمية :
                  </StyledLabel>
           
            <UploadImage
                      currentImage={formik.values.favicon}
                      onChange={(value) => formik.setFieldValue("favicon", value)}
                    />
              
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
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSettings;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Button, Input, InputGroup } from "rsuite";
import { ContentCopy, DisplaySettings } from "@mui/icons-material";
import { MainSpinner } from "../../../component/UI/MainSpinner";
import UploadImage from "../../../component/UI/UploadFile/UploadImage";
import Cookies from "js-cookie";
import { getAcademySettings, postAcademySettings } from "../../../utils/apis/client/academy";
import { getChangedValues, isValidURL } from "../../../utils/helpers";

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

  const formik = useFormik({
    initialValues,
    validationSchema,
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
            <form className="row " onSubmit={formik.handleSubmit}>
              <div className="col-lg-12 col-md-12">
                <div className="CustomFormControl">
                  <StyledLabel htmlFor="name">اسم الأكاديمية :</StyledLabel>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="أدخل اسم الأكاديمية"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <StyledError>{formik.errors.name}</StyledError>
                  )}
                </div>
              </div>

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
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSettings;

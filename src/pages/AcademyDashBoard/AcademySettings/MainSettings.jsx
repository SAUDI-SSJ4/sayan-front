import React, { useEffect, useRef,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Button, Input, InputGroup } from "rsuite";
import { ContentCopy, DisplaySettings, PeopleAlt, KeyboardBackspace } from "@mui/icons-material";
import { DisplayImage, ImageInput, JustifyContentWrapper, SetImageButton } from "../../../utils/styles";
import { postAcademySettings, getAcademySettings } from "../../../utils/apis/client/academy";

import { MainSpinner } from "../../../component/UI/MainSpinner";
import UploadImage from "../../../component/UI/UploadFile/UploadImage";
import Cookies from "js-cookie";
import { isValidURL } from "../../../utils/helpers";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("اسم الأكاديمية مطلوب"),
  logo: Yup.string().required("شعار الأكاديمية مطلوب"),
  favicon: Yup.string().required("الأيقونة المفضلة للأكاديمية مطلوبة"), 
  primary_color: Yup.string().required("اللون الأساسي مطلوب"),
  secondary_color: Yup.string().required("اللون الثانوي مطلوب"),
});

const StyledLabel = styled.label`
  color: #2B3674;
  font-weight: bold;
  display: inline-block;
  width: fit-content;
  font-size: 14px;
  padding-top: 10px;
`;

const StyledError = styled.p`
  color: #FF4747;
  font-size: 14px;
  padding-right: 10px;
`;

const MainSettings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading ,setIsLoading] = useState(false)
  const [initialValues ,setInitialValues] = useState({})
  const [academyId ,setAcademyId] = useState(Cookies.get("academy_id"))
  function isThereAChange(data) {
    return data.name !== initialValues.name || data.logo !== initialValues.logo || data.favicon !== initialValues.favicon || data.primary_color !== initialValues.primary_color || data.secondary_color !== initialValues.secondary_color;
  }
  useEffect(() => {
    setIsLoading(true)
    getAcademySettings()
      .then((data) => {
        setAcademyId(data.template.id)
        setInitialValues({  
          name: data.template.name, 
          primary_color: data.template.primary_color, 
          secondary_color: data.template.secondary_color,
          logo: data.template.logo,
          favicon: data.template.favicon
        })
        formik.setValues({  
          name: data.template.name, 
          primary_color: data.template.primary_color, 
          secondary_color: data.template.secondary_color,
          logo: data.template.logo,
          favicon: data.template.favicon
        })
      })
      .catch((error) => {
        console.log(error);
    }).finally(() => setIsLoading(false));
  }, []);



  const mutation = useMutation({
    mutationFn: (data) => postAcademySettings(academyId,data),
    onSuccess: () => {
      toast.success("تم تحديث البيانات بنجاح", {
        position: "top-left",
        theme: "dark",
      });
      window.location.reload();
    },
    onError: (error) => {
      toast.error("حدث خطأ ما", {
        position: "top-left",
        theme: "dark",
      });
      console.log(error)
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      console.log(values)

      if (values.name) {
        console.log("Appending name:", values.name);
        formData.append("name", values.name);
      }
      
      if (!isValidURL(values.logo)) {
        formData.append("logo", values.logo);
      }
      
      if (!isValidURL(values.favicon)) {
        formData.append("favicon", values.favicon);
      }
      
      if (values.primary_color) {
        formData.append("primary_color", values.primary_color);
      }
      
      if (values.secondary_color) {
        formData.append("secondary_color", values.secondary_color);
      }
      console.log(formData);
      mutation.mutateAsync(formData)

     
    },
  });

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
                  الأيقونة المفضلة للأكاديمية :
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
                  <Button size="lg" onClick={()=>formik.setValues(initialValues)}>إلغاء</Button>
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

const ColorInput = ({ label, name, value, onChange, error }) => (
  <div>
    <StyledLabel htmlFor={name}>{label}:</StyledLabel>
    <div className="d-flex flex-row align-items-center gap-2">
      <Input
        type="color"
        style={{ height: "34px", width: "34px", border: "1px solid #777", padding:'5px', borderRadius: "5px" }}
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

export default MainSettings;

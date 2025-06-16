import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {  JustifyContentWrapper } from "../../../utils/styles";
import { ButtonSpinner } from "../../../component/UI/Buttons/ButtonSpinner";
import { getChangedValues, populateFormData } from "../../../utils/helpers";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  content: Yup.string().required("Content  is required"),
});

const EditFooter = () => {

  let [change, setChange] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  let location = useLocation();
  let nav = useParams();
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient()

  // تم حذف footer API - استخدام بيانات فارغة مؤقتاً
  const { data: footerData = { footer: { title: "", content: "", image: "" } }, isLoading = false } = useQuery({
    queryKey: ["Footer"],
    queryFn: () => Promise.resolve({ footer: { title: "", content: "", image: "" } }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });


  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: (data) => {
      // تم إلغاء footer API - عرض رسالة تنبيه
      toast.info("تم إلغاء ميزة تحديث Footer مؤقتاً", { position: "top-left" });
    },
  });


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('image', file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };


  
  useEffect(() => {
    if (footerData?.footer) {
      formik.setValues(footerData?.footer);
    } else {
      formik.setValues({
        title: "",
        content: "",
      });
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [footerData?.footer, previewUrl]);



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
        <div className="justify-content-center">
        <div className="row m-auto justify-content-center">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Selected File"
              style={{
                maxWidth: '366px',
                maxHeight: '212px',
                objectFit: 'contain',
                marginTop: '10px',
              }}
            />
          )}
          <div className="d-flex button-content--1 justify-content-center">
            <input
              type="file"
              name="image"
              id="image"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*"
            />
            <div
              style={{
                background: 'white',
                marginTop: '25px',
                marginBottom: '30px',
                cursor: 'pointer',
              }}
              className="updateBtn"
              onClick={handleButtonClick}
            >
              رفع الصورة
            </div>
          </div>
        </div>
      </div>
      {formik.errors.image && formik.touched.image && (
        <div className="error">{formik.errors.image}</div>
      )}
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
              <label htmlFor="title">فيس بوك</label>
              <input
                type="text"
                placeholder="ادخل النص هنا"
                id="facebook"
                name="facebook"
                value={formik.values.facebook}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.facebook && formik.errors.facebook && (
                <div>{formik.errors.facebook}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">تويتر</label>
              <input
                type="text"
                placeholder="ادخل النص هنا"
                id="twitter"
                name="twitter"
                value={formik.values.twitter}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.twitter && formik.errors.twitter && (
                <div>{formik.errors.twitter}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">انستجرام</label>
              <input
                type="text"
                placeholder="ادخل النص هنا"
                id="instagram"
                name="instagram"
                value={formik.values.instagram}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.instagram && formik.errors.instagram && (
                <div>{formik.errors.instagram}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">لينكد ان </label>
              <input
                type="text"
                placeholder="ادخل النص هنا"
                id="linkedin"
                name="linkedin"
                value={formik.values.linkedin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.linkedin && formik.errors.linkedin && (
                <div>{formik.errors.linkedin}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">يوتيوب</label>
              <input
                type="text"
                placeholder="ادخل النص هنا"
                id="youtube"
                name="youtube"
                value={formik.values.youtube}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.youtube && formik.errors.youtube && (
                <div>{formik.errors.youtube}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">سناب شات</label>
              <input
                type="text"
                placeholder="ادخل النص هنا"
                id="snapchat"
                name="snapchat"
                value={formik.values.snapchat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.snapchat && formik.errors.snapchat && (
                <div>{formik.errors.snapchat}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">ايميل</label>
              <input
                type="text"
                placeholder="ادخل النص هنا"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">رقم الهاتف</label>
              <input
                type="text"
                placeholder="ادخل النص هنا"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && <div>{formik.errors.phone}</div>}
            </div>
          </div>
          <JustifyContentWrapper className="mt-4">
            <ButtonSpinner titel="إضافة" isPending={isPending} />
          </JustifyContentWrapper>
        </form>
      </div>
    </div>
  );
};

export default EditFooter;

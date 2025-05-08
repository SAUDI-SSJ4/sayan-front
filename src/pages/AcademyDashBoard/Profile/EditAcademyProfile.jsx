// تصحيح استيراد ملف النمط
import classes from './EditAcademyProfile.module.scss';
import React, { useState, useRef } from "react";
import { useFormik, Field, ErrorMessage, FormikProvider, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { academy_client } from "../../../utils/apis/client.config";
const EditAcademyProfile = () => {
  const profileInfo = useSelector((state) => state.academyUser.academy);
  const academy = profileInfo.academy ?? {};

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(academy.image || "");
  const [coverPreview, setCoverPreview] = useState(academy.cover || "");
  const [licencePreview, setLicencePreview] = useState(academy.licence || "");
  const navigate = useNavigate();

  const imageInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const licenceInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: academy.name || "",
      email: academy.email || "",
      user_name: academy.user_name || "",
      phone: academy.phone || "",
      support_phone: academy.support_phone || "",
      about: academy.about || "",
      address: academy.address || "",
      facebook: academy.facebook || "",
      twitter: academy.twitter || "",
      linkedin: academy.linkedin || "",
      instagram: academy.instagram || "",
      image: null,
      cover: null,
      licence: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("اسم الأكاديمية مطلوب"),
      email: Yup.string().email("البريد الإلكتروني غير صالح").nullable(),
      user_name: Yup.string().nullable(),
      phone: Yup.string().nullable(),
      support_phone: Yup.string().nullable(),
      about: Yup.string().nullable(),
      address: Yup.string().nullable(),
      facebook: Yup.string().nullable(),
      twitter: Yup.string().nullable(),
      linkedin: Yup.string().nullable(),
      instagram: Yup.string().nullable(),
      image: Yup.mixed()
        .nullable()
        .test(
          "fileSize",
          "حجم الصورة كبير جدًا",
          (value) => !value || (value && value.size <= 2 * 1024 * 1024)
        ), // 2MB
      cover: Yup.mixed()
        .nullable()
        .test(
          "fileSize",
          "حجم الصورة كبير جدًا",
          (value) => !value || (value && value.size <= 2 * 1024 * 1024)
        ), // 2MB
      licence: Yup.mixed()
        .nullable()
        .test(
          "fileSize",
          "حجم الصورة كبير جدًا",
          (value) => !value || (value && value.size <= 2 * 1024 * 1024)
        ),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("user_name", values.user_name);
      formData.append("phone", values.phone);
      formData.append("support_phone", values.support_phone);
      formData.append("about", values.about);
      formData.append("address", values.address);
      formData.append("facebook", values.facebook);
      formData.append("twitter", values.twitter);
      formData.append("linkedin", values.linkedin);
      formData.append("instagram", values.instagram);
      formData.append("gender", "male");

      if (values.image) formData.append("image", values.image);
      if (values.cover) formData.append("cover", values.cover);
      if (values.licence) formData.append("licence", values.licence);

      try {
        await academy_client.post("/settings", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("تم تحديث المعلومات بنجاح");
        navigate("/academy/Profile");
      } catch (error) {
        toast.error(error.response?.data?.message || "حدث خطأ أثناء التحديث");
      } finally {
        setIsSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  // handlers
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    }
  };

  const handleCoverChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      formik.setFieldValue("cover", file);
    }
  };

  const handleLicenceChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setLicencePreview(URL.createObjectURL(file));
      formik.setFieldValue("licence", file);
    }
  };

  return (
    <div>
      <HeaderAcademy title="تحديث المعلومات" />
      <div className="mt-5 bg-white p-4 rounded">
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="row">
              {/* الاسم */}
              <div className="col-6">
                <div className={classes.CustomFormControl}>
                  <label htmlFor="name">اسم الأكاديمية</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="ادخل اسم الأكاديمية"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500">{formik.errors.name}</p>
                  )}
                </div>
              </div>
              {/* البريد */}
              <div className="col-6">
                <div className={classes.CustomFormControl}>
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ادخل البريد الإلكتروني"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500">{formik.errors.email}</p>
                  )}
                </div>
              </div>
              {/* الهاتف */}
              <div className="col-6">
                <div className={classes.CustomFormControl}>
                  <label htmlFor="phone">رقم الهاتف</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="ادخل رقم الهاتف"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500">{formik.errors.phone}</p>
                  )}
                </div>
              </div>
              {/* العنوان */}
              <div className="col-6">
                <div className={classes.CustomFormControl}>
                  <label htmlFor="address">العنوان</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="ادخل العنوان"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-red-500">{formik.errors.address}</p>
                  )}
                </div>
              </div>
              {/* فيسبوك */}
              <div className="col-6">
                <div className={classes.CustomFormControl}>
                  <label htmlFor="facebook">فيسبوك</label>
                  <input
                    type="text"
                    id="facebook"
                    name="facebook"
                    placeholder="رابط صفحة الفيسبوك"
                    value={formik.values.facebook}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.facebook && formik.errors.facebook && (
                    <p className="text-red-500">{formik.errors.facebook}</p>
                  )}
                </div>
              </div>
              {/* تويتر */}
              <div className="col-6">
                <div className={classes.CustomFormControl}>
                  <label htmlFor="twitter">تويتر</label>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    placeholder="رابط حساب تويتر"
                    value={formik.values.twitter}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.twitter && formik.errors.twitter && (
                    <p className="text-red-500">{formik.errors.twitter}</p>
                  )}
                </div>
              </div>
              {/* لينكدإن */}
              <div className="col-6">
                <div className={classes.CustomFormControl}>
                  <label htmlFor="linkedin">لينكد إن</label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    placeholder="رابط حساب لينكد إن"
                    value={formik.values.linkedin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.linkedin && formik.errors.linkedin && (
                    <p className="text-red-500">{formik.errors.linkedin}</p>
                  )}
                </div>
              </div>
              {/* انستغرام */}
              <div className="col-6">
                <div className={classes.CustomFormControl}>
                  <label htmlFor="instagram">إنستغرام</label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    placeholder="رابط حساب إنستغرام"
                    value={formik.values.instagram}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.instagram && formik.errors.instagram && (
                    <p className="text-red-500">{formik.errors.instagram}</p>
                  )}
                </div>
              </div>
              {/* الصور */}
              <div className="col-12">
                <div className="row">
                  {/* صورة الأكاديمية */}
                  <div className="col-12 col-md-4 mb-3">
                    <div className={classes.imageUploadContainer}>
                      {imagePreview && (
                        <img src={imagePreview} alt="صورة الأكاديمية" />
                      )}
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-danger"
                      />
                      <div className="d-flex justify-content-center mt-2">
                        <input
                          type="file"
                          name="image"
                          ref={imageInputRef}
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                        />
                        <div
                          className={classes.uploadButton}
                          onClick={() => imageInputRef.current.click()}
                        >
                          رفع صورة الأكاديمية
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* صورة الغلاف */}
                  <div className="col-12 col-md-4 mb-3">
                    <div className={classes.imageUploadContainer}>
                      {coverPreview && (
                        <img src={coverPreview} alt="صورة الغلاف" />
                      )}
                      <ErrorMessage
                        name="cover"
                        component="div"
                        className="text-danger"
                      />
                      <div className="d-flex justify-content-center mt-2">
                        <input
                          type="file"
                          name="cover"
                          ref={coverInputRef}
                          style={{ display: "none" }}
                          onChange={handleCoverChange}
                        />
                        <div
                          className={classes.uploadButton}
                          onClick={() => coverInputRef.current.click()}
                        >
                          رفع صورة الغلاف
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* صورة الرخصة */}
                  <div className="col-12 col-md-4 mb-3">
                    <div className={classes.imageUploadContainer}>
                      {licencePreview && (
                        <img src={licencePreview} alt="صورة الرخصة" />
                      )}
                      <ErrorMessage
                        name="licence"
                        component="div"
                        className="text-danger"
                      />
                      <div className="d-flex justify-content-center mt-2">
                        <input
                          type="file"
                          name="licence"
                          ref={licenceInputRef}
                          style={{ display: "none" }}
                          onChange={handleLicenceChange}
                        />
                        <div
                          className={classes.uploadButton}
                          onClick={() => licenceInputRef.current.click()}
                        >
                          رفع الرخصة
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* زر الحفظ */}
              <div className="col-12 mb-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "جاري التحديث..." : "تحديث"}
                </button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default EditAcademyProfile;
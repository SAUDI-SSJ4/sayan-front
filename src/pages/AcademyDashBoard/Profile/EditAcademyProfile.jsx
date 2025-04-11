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
      formData.append("licence", values.licence);
      formData.append("gender", "male");

      // Append files if they exist
      if (values.image) {
        formData.append("image", values.image);
      }
      if (values.cover) {
        formData.append("cover", values.cover);
      }
      if (values.licence) {
        formData.append("licence", values.licence);
      }

      try {
        await academy_client.post("/settings", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("تم تحديث المعلومات بنجاح");
        navigate("/academy/Profile");
      } catch (error) {
        toast.error(error.response?.data?.message || "حدث خطأ أثناء التحديث");
      } finally {
        setIsSubmitting(false);
      }
    },
    enableReinitialize: true, // Ensure Formik reinitializes when initialValues change
  });

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

  const handleImageButtonClick = () => {
    imageInputRef.current.click();
  };

  const handleCoverButtonClick = () => {
    coverInputRef.current.click();
  };

  const handleLicenceButtonClick = () => {
    licenceInputRef.current.click();
  };

  return (
    <div>
      <HeaderAcademy
        title="تحديث المعلومات"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 28 29"
            fill="none"
          >
            <circle
              opacity="0.5"
              cx="16.8"
              cy="8.65547"
              r="2.8"
              fill="#7E8799"
            />
            <ellipse
              opacity="0.5"
              cx="17.7331"
              cy="18.9211"
              rx="4.66667"
              ry="2.8"
              fill="#7E8799"
            />
            <circle cx="11.2021" cy="8.65521" r="3.73333" fill="#7E8799" />
            <ellipse
              cx="11.2013"
              cy="18.9208"
              rx="6.53333"
              ry="3.73333"
              fill="#7E8799"
            />
          </svg>
        }
      />
      <div className=" mt-5 bg-white p-4 rounded">
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-6 mb-3">
                <label htmlFor="name" className="form-label">
                  اسم الأكاديمية
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="email" className="form-label">
                  البريد الإلكتروني
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              {/* <div className="col-6 mb-3">
                <label htmlFor="user_name" className="form-label">
                  اسم المستخدم
                </label>
                <Field
                  id="user_name"
                  name="user_name"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="user_name"
                  component="div"
                  className="text-danger"
                />
              </div> */}
              <div className="col-6 mb-3">
                <label htmlFor="phone" className="form-label">
                  رقم الهاتف
                </label>
                <Field
                  id="phone"
                  name="phone"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-6 mb-3">
                <label htmlFor="address" className="form-label">
                  العنوان
                </label>
                <Field
                  id="address"
                  name="address"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="facebook" className="form-label">
                  فيسبوك
                </label>
                <Field
                  id="facebook"
                  name="facebook"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="facebook"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="twitter" className="form-label">
                  تويتر
                </label>
                <Field
                  id="twitter"
                  name="twitter"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="twitter"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="linkedin" className="form-label">
                  لينكد إن
                </label>
                <Field
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="linkedin"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="instagram" className="form-label">
                  إنستغرام
                </label>
                <Field
                  id="instagram"
                  name="instagram"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="instagram"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="flex flex-wrap gap-4 ">
                <div className="col-12 col-md-4 border border-black border-opacity-10 rounded p-2 mb-3">
                  {/* <label htmlFor="image" className="form-label">
                    صورة الأكاديمية
                  </label> */}

                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "contain",
                        marginTop: "10px",
                        borderRadius: "8px"
                      }}
                    />
                  )}
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-danger"
                  />
                  <div className="d-flex justify-content-center">
                    <input
                      type="file"
                      name="image"
                      ref={imageInputRef}
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <div
                      style={{
                        background: "white",
                        marginTop: "25px",
                        marginBottom: "30px"
                      }}
                      className="updateBtn"
                      onClick={handleImageButtonClick}
                    >
                      رفع صورة الأكاديمية
                    </div>
                  </div>

                </div>
                <div className="col-12 col-md-4 border border-black border-opacity-10 rounded p-2 mb-3">
                  {/* <label htmlFor="cover" className="form-label">
                    الغلاف
                  </label> */}
                  {coverPreview && (
                    <img
                      src={coverPreview}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "contain",
                        marginTop: "10px",
                        borderRadius: "8px"
                      }}
                    />
                  )}
                  <ErrorMessage
                    name="cover"
                    component="div"
                    className="text-danger"
                  />
                  <div className="d-flex justify-content-center">
                    <input
                      type="file"
                      name="cover"
                      ref={coverInputRef}
                      style={{ display: "none" }}
                      onChange={handleCoverChange}
                    />
                    <div
                      style={{
                        background: "white",
                        marginTop: "25px",
                        marginBottom: "30px"
                      }}
                      className="updateBtn"
                      onClick={handleCoverButtonClick}
                    >
                      رفع صورة الغلاف
                    </div>
                  </div>
                  
                </div>
                <div className="col-12 col-md-4 border border-black border-opacity-10 rounded p-2 mb-3">
                  {/* <label htmlFor="licence" className="form-label">
                    الرخصة{" "}
                  </label> */}
                  {licencePreview && (
                    <img
                      src={licencePreview}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "contain",
                        marginTop: "10px",
                        borderRadius: "8px"
                      }}
                    />
                  )}
                  <ErrorMessage
                    name="licence"
                    component="div"
                    className="text-danger"
                  />


                  <div className="d-flex justify-content-center">
                    <input
                      type="file"
                      name="licence"
                      ref={licenceInputRef}
                      style={{ display: "none" }}
                      onChange={handleLicenceChange}
                    />
                    <div
                      style={{
                        background: "white",
                        marginTop: "25px",
                        marginBottom: "30px"
                      }}
                      className="updateBtn"
                      onClick={handleLicenceButtonClick}
                    >
                      رفع الرخصة
                    </div>
                  </div>
                  
                </div>
              </div>
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
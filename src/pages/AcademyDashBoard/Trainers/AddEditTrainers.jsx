import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Loader as RSuiteLoader } from "rsuite";
import { UploadCloud, CheckCircle, XCircle, User } from 'lucide-react';

import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import { academy_client } from "../../../utils/apis/client.config";

// مكون رفع الصورة
const ImageDropzone = ({ field, form, setFile, currentImageUrl }) => {
  const [preview, setPreview] = useState(currentImageUrl || null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFile(file);
        form.setFieldValue(field.name, file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      }
    },
    [form, field.name, setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/gif': [] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    form.setFieldValue(field.name, null);
    setPreview(null);
  };

  return (
    <div className="form-group">
      <div
        {...getRootProps()}
        className={`dropzone p-0 border rounded-3 text-center cursor-pointer bg-light mb-2 position-relative
          ${isDragActive ? "border-primary bg-primary-light" : "border-dashed border-secondary"}
          ${preview ? "border-success" : ""}`}
        style={{ minHeight: "165px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}
      >
        <input {...getInputProps()} id={field.name} />
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="img-thumbnail mb-2" style={{ maxHeight: "120px", objectFit: "cover" }} />
            <button type="button" className="btn btn-sm btn-outline-danger px-3" onClick={removeFile}>
              <XCircle size={16} className="ms-1" /> إزالة الصورة
            </button>
          </>
        ) : (
          <>
            <UploadCloud size={48} className="mb-2 text-muted" />
            <p className="mb-1 px-3">
              اسحب الصورة هنا أو انقر للاختيار
            </p>
            <small className="text-muted">(PNG, JPG, GIF حتى 5MB)</small>
          </>
        )}
      </div>
      <div>
        <button type="button" className="btn btn-outline-primary w-100" onClick={() => document.getElementById(field.name)?.click()}>
          رفع الصورة الشخصية
        </button>
      </div>
      <ErrorMessage name={field.name} component="div" className="text-danger mt-1" />
    </div>
  );
};

export default function AddEditTrainers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });
  const [pageLoading, setPageLoading] = useState(isEditMode);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // جلب بيانات الموظف في حالة التعديل
  useEffect(() => {
    if (isEditMode) {
      setPageLoading(true);
      academy_client
        .get(`/trainer/${id}`)
        .then((response) => {
          const trainerData = response?.data?.data;
          setInitialValues({
            name: trainerData?.name || "",
            email: trainerData?.email || "",
            phone: trainerData?.phone || "",
            image: trainerData?.image || null,
          });
        })
        .catch((error) => {
          toast.error("فشل في تحميل بيانات المدرب.");
          navigate("/academy/TrainersManagment");
        })
        .finally(() => setPageLoading(false));
    }
  }, [id, isEditMode, navigate]);

  // مخطط التحقق من الصحة
  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب").min(3, "الاسم قصير جداً"),
    email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
    phone: Yup.string().required("رقم الهاتف مطلوب")
      .matches(/^[\s\d+-]{10,15}$/, "رقم الهاتف غير صالح (يجب أن يكون 10-15 رقمًا ويمكن أن يحتوي على + أو - أو مسافات)"),
    image: Yup.mixed()
      .nullable()
      .test("fileSize", "حجم الملف كبير جدا (الحد الأقصى 5MB)",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024))
      .test("fileType", "نوع الملف غير مدعوم (PNG, JPG, GIF فقط)",
        (value) => !value || (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)))
      .when([], {
        is: () => !isEditMode,
        then: (schema) => schema.required("الصورة الشخصية مطلوبة"),
        otherwise: (schema) => schema.nullable(),
      }),
  });

  const handleSubmit = async (values) => {
    setFormSubmitting(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    if (selectedFile instanceof File) formData.append("image", selectedFile);

    const requestConfig = { headers: { "Content-Type": "multipart/form-data" } };

    try {
      let response;
      if (isEditMode) {
        response = await academy_client.put(`/trainer/${id}`, formData, requestConfig);
        toast.success("تم تحديث المدرب بنجاح!");
      } else {
        response = await academy_client.post("/trainer", formData, requestConfig);
        toast.success("تمت إضافة المدرب بنجاح!");
      }
      navigate("/academy/TrainersManagment");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "حدث خطأ ما. يرجى المحاولة مرة أخرى.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // رمز للعنوان
  const TrainerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 28 29" fill="none">
      <circle opacity="0.5" cx="16.8" cy="8.65547" r="2.8" fill="#7E8799"/>
      <ellipse opacity="0.5" cx="17.7331" cy="18.9211" rx="4.66667" ry="2.8" fill="#7E8799"/>
      <circle cx="11.2021" cy="8.65521" r="3.73333" fill="#7E8799"/>
      <ellipse cx="11.2013" cy="18.9208" rx="6.53333" ry="3.73333" fill="#7E8799"/>
    </svg>
  );

  if (pageLoading) {
    return (
      <div>
        <HeaderAcademy title="تحميل بيانات المدرب..." icon={<User size={30} />} />
        <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
          <RSuiteLoader size="lg" content="جاري التحميل..." vertical />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-5" dir="rtl">
      <HeaderAcademy
        title={isEditMode ? "تعديل بيانات المدرب" : "إضافة المدرب جديد"}
        icon={<TrainerIcon />}
      />
      <div className="container mt-4">
        <div className>
          <div className="card-body p-4 p-lg-5">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, dirty, isValid, setFieldValue, values }) => (
                <Form noValidate>
                  <div className="row mb-4">
                    {/* صورة الموظف */}
                    <div className="col-md-12 d-flex flex-column align-items-center justify-content-center mb-4">
                      <Field
                        name="image"
                        component={ImageDropzone}
                        setFile={setSelectedFile}
                        currentImageUrl={isEditMode ? initialValues.image : null}
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    {/* الاسم */}
                    <div className>
                      <label htmlFor="name" className="form-label">اسم المدرب</label>
                      <Field
                        name="name"
                        type="text"
                        className="form-control form-control-lg"
                        id="name"
                      />
                      <ErrorMessage name="name" component="div" className="text-danger mt-1 small" />
                    </div>
                  </div>
                  <div className="row mb-4">
                    {/* الهاتف */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">رقم الهاتف</label>
                      <Field
                        name="phone"
                        type="tel"
                        className="form-control form-control-lg"
                        id="phone"
                      />
                      <ErrorMessage name="phone" component="div" className="text-danger mt-1 small" />
                    </div>
                    {/* البريد الإلكتروني */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">البريد الالكتروني</label>
                      <Field
                        name="email"
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                      />
                      <ErrorMessage name="email" component="div" className="text-danger mt-1 small" />
                    </div>
                  </div>
                  {/* الأكشن */}
                  <div className="d-flex justify-content-end gap-2 pt-3">
                    <button
                      className="btn btn-primary px-4" 
                      disabled={formSubmitting || !dirty || !isValid}
                    >
                      {formSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm ms-2" role="status"></span>
                          جاري الحفظ...
                        </>
                      ) : (
                        isEditMode ? <><CheckCircle size={18} className="ms-1"/> تعديل المدرب</> : <><CheckCircle size={18} className="ms-1"/> إضافة مدرب</>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
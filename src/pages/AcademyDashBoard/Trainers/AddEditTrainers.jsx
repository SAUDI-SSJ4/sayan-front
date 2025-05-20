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

  useEffect(() => {
    // Update preview if currentImageUrl changes
    if (currentImageUrl) {
      setPreview(currentImageUrl);
    }
  }, [currentImageUrl]);

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
    accept: { 'image/jpeg': [], 'image/png': [], 'image/jpg': [], 'image/gif': [] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    form.setFieldValue(field.name, null);
    setPreview(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200
          ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-blue-400"}
          ${preview ? "border-green-400" : ""}`}
      >
        <input {...getInputProps()} id={field.name} />
        {preview ? (
          <div className="space-y-4">
            <img 
              src={preview} 
              alt="Preview" 
              className="mx-auto h-40 w-40 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <XCircle className="w-4 h-4 ml-2" />
              إزالة الصورة
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-gray-600">
              <span className="font-medium text-blue-600">اضغط للرفع</span> أو اسحب وأفلت
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 5MB</p>
          </div>
        )}
      </div>
      <ErrorMessage 
        name={field.name} 
        component="div" 
        className="mt-2 text-sm text-red-600" 
      />
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
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      academy_client
        .get(`/trainer/${id}`)
        .then((response) => {
          const trainerData = response?.data?.data;
          console.log("Trainer data received:", trainerData);
          setInitialValues({
            name: trainerData?.name || "",
            email: trainerData?.email || "",
            phone: trainerData?.phone || "",
            image: trainerData?.image || null,
          });
        })
        .catch((error) => {
          toast.error("فشل في تحميل بيانات المدرب");
          navigate("/academy/TrainersManagment");
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode, navigate]);

  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب").min(3, "الاسم قصير جداً"),
    email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(/^[\s\d+-]{10,15}$/, "رقم الهاتف غير صالح (يجب أن يكون 10-15 رقمًا)"),
    image: Yup.mixed()
      .test("fileType", "الصورة مطلوبة ويجب أن تكون ملف صورة صالح",
        (value) => {
          if (isEditMode && !value) return true; // Allow no file in edit mode
          if (!isEditMode && !value) return false; // Require file in add mode
          
          if (value instanceof File) {
            return ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type);
          }
          
          return typeof value === 'string' && value.startsWith('http'); // Valid URL in edit mode
        })
      .test("fileSize", "حجم الملف كبير جدا (الحد الأقصى 5MB)",
        (value) => {
          if (!value || typeof value === 'string') return true;
          return value instanceof File && value.size <= 5 * 1024 * 1024;
        }),
  });

  const handleSubmit = async (values) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
        if (values.image instanceof File) {
      formData.append("image", values.image);
    } else if (selectedFile instanceof File) {
      formData.append("image", selectedFile);
    }

    try {
      if (isEditMode) {
        await academy_client.put(`/trainer/${id}`, formData);
        toast.success("تم تحديث المدرب بنجاح");
      } else {
        await academy_client.post("/trainer", formData);
        toast.success("تمت إضافة المدرب بنجاح");
      }
      navigate("/academy/TrainersManagment");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "حدث خطأ ما";
      toast.error(errorMessage);
      console.error("Submit error:", error?.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderAcademy title="تحميل..." icon={<User className="w-8 h-8" />} />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-[2000px] mx-auto">
        <HeaderAcademy
          title={isEditMode ? "تعديل بيانات المدرب" : "إضافة مدرب جديد"}
          icon={<User className="w-8 h-8" />}
        />
        
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ isValid, dirty }) => (
                  <Form className="space-y-8 max-w-5xl mx-auto">
                    {/* صورة المدرب */}
                    <div className="space-y-4">
                      <label className="block text-lg font-medium text-gray-700 text-center">
                        الصورة الشخصية
                      </label>
                      <Field
                        name="image"
                        component={ImageDropzone}
                        setFile={setSelectedFile}
                        currentImageUrl={isEditMode ? initialValues.image : null}
                      />
                    </div>

                    {/* معلومات المدرب */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          اسم المدرب
                        </label>
                        <Field
                          name="name"
                          type="text"
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                        />
                        <ErrorMessage name="name" component="div" className="text-sm text-red-600" />
                      </div>

                      <div className="space-y-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          البريد الإلكتروني
                        </label>
                        <Field
                          name="email"
                          type="email"
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                        />
                        <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
                      </div>

                      <div className="space-y-4 md:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          رقم الهاتف
                        </label>
                        <Field
                          name="phone"
                          type="tel"
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                        />
                        <ErrorMessage name="phone" component="div" className="text-sm text-red-600" />
                      </div>
                    </div>

                    {/* أزرار الإجراءات */}
                    <div className="flex justify-end space-x-4 rtl:space-x-reverse pt-6">
                      <button
                        type="button"
                        onClick={() => navigate("/academy/TrainersManagment")}
                        className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        disabled={submitting || (isEditMode ? !isValid : (!dirty || !isValid))}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <span className="loader ml-2"></span>
                            جاري الحفظ...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="ml-2 h-5 w-5" />
                            {isEditMode ? "تحديث المدرب" : "إضافة المدرب"}
                          </>
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
    </div>
  );
}
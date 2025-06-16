import React, { useState, useRef } from "react";
import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { academy_client } from "../../../utils/apis/client.config";

const EditAcademyProfile = () => {
  const profileInfo = useSelector((state) => state.academyUser.academy);
  const academy = profileInfo?.academy ?? {};

  // طباعة بيانات الأكاديمية للتحقق
  console.log("Academy Data for Debug:", academy);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(academy.image || "");
  const [coverPreview, setCoverPreview] = useState(academy.cover || "");
  const navigate = useNavigate();

  const imageInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: academy.name || "",
      email: academy.email || "",
      user_name: academy.user_name || "",
      support_phone: academy.support_phone || academy.phone || "", // استخدام support_phone كحقل أساسي
      address: academy.address || "",
      facebook: academy.facebook || "",
      twitter: academy.twitter || "",
      instagram: academy.instagram || "",
      image: null,
      cover: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("اسم الأكاديمية مطلوب"),
      email: Yup.string().email("البريد الإلكتروني غير صالح").nullable(),
      user_name: Yup.string().nullable(),
      support_phone: Yup.string().matches(/^[0-9+-\s()]*$/, "رقم الهاتف غير صالح").nullable(),
      address: Yup.string().nullable(),
      facebook: Yup.string().nullable(),
      twitter: Yup.string().nullable(),
      instagram: Yup.string().nullable(),
      image: Yup.mixed().nullable()
        .test("fileSize", "حجم الصورة يجب أن يكون أقل من 2 ميجا", (value) => !value || (value && value.size <= 2 * 1024 * 1024))
        .test("fileType", "نوع الملف غير مدعوم", (value) => !value || (value && ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(value.type))),
      cover: Yup.mixed().nullable()
        .test("fileSize", "حجم صورة الغلاف يجب أن يكون أقل من 2 ميجا", (value) => !value || (value && value.size <= 2 * 1024 * 1024))
        .test("fileType", "نوع الملف غير مدعوم", (value) => !value || (value && ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(value.type))),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const formData = new FormData();

      // إضافة جميع الحقول مع مراعاة القيم الفارغة
      Object.keys(values).forEach(key => {
        // إضافة الملفات
        if (values[key] instanceof File) {
          formData.append(key, values[key]);
        } 
        // الحقول النصية - نرسل حتى القيم الفارغة
        else if (values[key] !== null && values[key] !== undefined) {
          formData.append(key, values[key]);
        }
        // إضافة قيم فارغة للحقول الاختيارية المفقودة
        else if (['facebook', 'twitter', 'instagram', 'address', 'email', 'support_phone', 'user_name'].includes(key)) {
          formData.append(key, '');
        }
      });

      // نسخة للطباعة فقط
      const formDataForDebug = {};
      formData.forEach((value, key) => {
        formDataForDebug[key] = value instanceof File ? `[File: ${value.name}]` : value;
      });
      console.log('FormData being sent:', formDataForDebug);

      try {
        console.log('=== DEBUG: Starting form submission ===');
        console.log('Form values:', values);
        console.log('Academy data before update:', academy);
        
        const response = await academy_client.post("/settings", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        console.log('=== DEBUG: Server Response ===');
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        console.log('Response headers:', response.headers);
        
        // التحقق من البيانات المُحدثة
        if (response.data) {
          console.log('Updated academy data from server:', response.data);
          if (response.data.support_phone) {
            console.log('✅ support_phone updated to:', response.data.support_phone);
          } else {
            console.log('❌ support_phone not found in response');
          }
        }
        
        toast.success("تم تحديث معلومات الأكاديمية بنجاح!");
        navigate("/academy/Profile");
      } catch (error) {
        console.log('=== DEBUG: Error occurred ===');
        console.error('Error details:', error);
        console.error('Error response:', error.response);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        
        const errorMessage = error.response?.data?.message || "حدث خطأ ما أثناء تحديث المعلومات.";
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  const handleFileChange = (event, fieldName, setPreview) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        formik.setFieldError(fieldName, "حجم الملف يجب أن يكون أقل من 2 ميجا");
        return;
      }
      if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)) {
        formik.setFieldError(fieldName, "نوع الملف غير مدعوم");
        return;
      }
      setPreview(URL.createObjectURL(file));
      formik.setFieldValue(fieldName, file);
      formik.setFieldTouched(fieldName, true, false);
    }
  };

  const FormField = ({ name, label, type = "text", placeholder, as = "input", rows }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={rows}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            formik.touched[name] && formik.errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            formik.touched[name] && formik.errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      )}
      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-xs text-red-600">{formik.errors[name]}</p>
      )}
    </div>
  );

  const ImageField = ({ name, label, preview, inputRef, setPreview }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {preview ? (
            <img src={preview} alt={label} className="mx-auto h-32 w-auto rounded-md object-contain mb-2" />
          ) : (
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={name}
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>ارفع ملف</span>
              <input
                id={name}
                name={name}
                type="file"
                className="sr-only"
                ref={inputRef}
                accept="image/*"
                onChange={(e) => handleFileChange(e, name, setPreview)}
              />
            </label>
            <p className="pl-1">أو اسحب وأفلت</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP حتى 2 ميجا</p>
        </div>
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-xs text-red-600">{formik.errors[name]}</p>
      )}
    </div>
  );


  return (
    <div className="min-h-screen bg-white">
      <HeaderAcademy title="تعديل ملف الأكاديمية" />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <h2 className="text-xl font-semibold text-blue-600 border-b border-blue-200 pb-3 mb-6">الصور التعريفية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageField name="image" label="شعار الأكاديمية" preview={imagePreview} inputRef={imageInputRef} setPreview={setImagePreview} />
                <ImageField name="cover" label="صورة الغلاف" preview={coverPreview} inputRef={coverInputRef} setPreview={setCoverPreview} />
              </div>

              <h2 className="text-xl font-semibold text-blue-600 border-b border-blue-200 pb-3 mb-6 mt-8">المعلومات الأساسية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FormField name="name" label="اسم الأكاديمية" placeholder="اسم الأكاديمية" />
                <FormField name="email" label="البريد الإلكتروني" type="email" placeholder="contact@academy.com" />
                <FormField name="support_phone" label="رقم الهاتف الرئيسي" placeholder="05xxxxxxxxx" />
                <FormField name="address" label="العنوان" placeholder="المدينة، الحي، الشارع" />
              </div>

              <h2 className="text-xl font-semibold text-blue-600 border-b border-blue-200 pb-3 mb-6 mt-8">روابط التواصل الاجتماعي</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FormField name="facebook" label="فيسبوك" placeholder="https://facebook.com/youracademy" />
                <FormField name="twitter" label="تويتر" placeholder="https://twitter.com/youracademy" />
                <FormField name="instagram" label="إنستغرام" placeholder="https://instagram.com/youracademy" />
              </div>

              <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2.5 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150
                    ${isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري الحفظ...
                    </span>
                  ) : (
                    'حفظ التغييرات'
                  )}
                </button>
              </div>
            </Form>
          </FormikProvider>
        
      </div>
    </div>
  );
};

export default EditAcademyProfile;
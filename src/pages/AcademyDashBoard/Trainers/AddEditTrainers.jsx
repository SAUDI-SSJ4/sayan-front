import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Loader as RSuiteLoader } from "rsuite";
import { UploadCloud, CheckCircle, XCircle, User } from "lucide-react";

import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import { academy_client } from "../../../utils/apis/client.config";

// مكون رفع الصورة
const ImageDropzone = ({ field, form, setFile, currentImageUrl }) => {
  const [preview, setPreview] = useState(currentImageUrl || null);
  const isMounted = useRef(true);

  useEffect(() => {
    // استعادة المرجع عند التحميل
    isMounted.current = true;
    
    // تحديث المعاينة إذا تغير عنوان URL للصورة الحالية
    if (currentImageUrl) {
      setPreview(currentImageUrl);
    }
    
    // تنظيف عند إزالة المكون
    return () => {
      isMounted.current = false;
    };
  }, [currentImageUrl]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && isMounted.current) {
        // التحقق من نوع الملف
        if (!file.type.match('image/jpeg|image/png|image/jpg|image/gif')) {
          form.setFieldError(field.name, 'يجب أن يكون الملف صورة من نوع JPEG، PNG، JPG، or GIF');
          return;
        }
        
        setFile(file);
        form.setFieldValue(field.name, file);
        
        // استخدام FileReader للمعاينة
        const reader = new FileReader();
        reader.onloadend = () => {
          if (isMounted.current) {
            setPreview(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [form, field.name, setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/gif": [],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    form.setFieldValue(field.name, null);
    setPreview(null);
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        {...getRootProps()}
        className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200
          ${
            isDragActive
              ? "bg-blue-50 border-blue-400"
              : "border-gray-300 hover:border-blue-400"
          }
          ${preview ? "border-green-400" : ""}`}
      >
        <input {...getInputProps()} id={field.name} />
        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="object-cover mx-auto w-40 h-40 rounded-lg"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <XCircle className="ml-2 w-4 h-4" />
              إزالة الصورة
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <UploadCloud className="mx-auto w-12 h-12 text-gray-400" />
            <div className="text-gray-600">
              <span className="font-medium text-blue-600">اضغط للرفع</span> أو
              اسحب وأفلت
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
  const isMounted = useRef(true);

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
    // استعادة قيمة المرجع عند تثبيت المكون
    isMounted.current = true;
    
    if (isEditMode) {
      setLoading(true);
      academy_client
        .get(`/trainer/${id}`)
        .then((response) => {
          if (!isMounted.current) return;
          
          const trainerData = response?.data?.data;
          setInitialValues({
            name: trainerData?.name || "",
            email: trainerData?.email || "",
            phone: trainerData?.phone || "",
            image: trainerData?.image || null,
          });
        })
        .catch((error) => {
          if (!isMounted.current) return;
          
          toast.error("فشل في تحميل بيانات المدرب");
          navigate("/academy/TrainersManagment");
        })
        .finally(() => {
          if (isMounted.current) {
            setLoading(false);
          }
        });
    }
    
    // تنظيف عند إزالة المكون
    return () => {
      isMounted.current = false;
    };
  }, [id, isEditMode, navigate]);

  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب").min(3, "الاسم قصير جداً"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(
        /^[\s\d+-]{10,15}$/,
        "رقم الهاتف غير صالح (يجب أن يكون 10-15 رقمًا)"
      ),
    image: Yup.mixed()
      .test("fileType", "الصورة مطلوبة ويجب أن تكون ملف صورة صالح", (value) => {
        if (isEditMode && !value) return true; // Allow no file in edit mode
        if (!isEditMode && !value) return false; // Require file in add mode

        if (value instanceof File) {
          return ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
            value.type
          );
        }

        return typeof value === "string" && value.startsWith("http"); // Valid URL in edit mode
      })
      .test("fileSize", "حجم الملف كبير جدا (الحد الأقصى 5MB)", (value) => {
        if (!value || typeof value === "string") return true;
        return value instanceof File && value.size <= 5 * 1024 * 1024;
      }),
  });

  const handleSubmit = async (values) => {
    // لا تفعل شيئًا إذا كان المكون غير مثبت
    if (!isMounted.current) return;
    
    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    
    // إضافة صورة فقط عند وجودها كملف فعلي
    if (values.image instanceof File) {
      formData.append("image", values.image);
    } else if (selectedFile instanceof File) {
      formData.append("image", selectedFile);
    } else {
      // لا نضيف حقل الصورة إذا لم يتم تحديد صورة جديدة
    }

    try {
      let response;
      
      if (isEditMode) {
        response = await academy_client.post(`/trainer/${id}`, formData);
        if (isMounted.current) {
          toast.success("تم تحديث المدرب بنجاح");
        }
      } else {
        response = await academy_client.post("/trainer", formData);
        if (isMounted.current) {
          toast.success("تمت إضافة المدرب بنجاح");
        }
      }
      
      // تأكد من أن المكون لا يزال مثبتًا قبل الانتقال
      if (isMounted.current) {
        // استخدام setTimeout لمنع الإلغاء المفاجئ للتنقل
        setTimeout(() => {
          // تحقق مرة أخرى إذا كان المكون لا يزال موجودًا
          if (isMounted.current) {
            navigate("/academy/TrainersManagment");
          }
        }, 500);
      }
    } catch (error) {
      // لا تفعل شيئًا إذا تم إلغاء المكون
      if (!isMounted.current) return;
      
      const errorResponse = error?.response?.data;
      
      if (errorResponse?.errors) {
        // عرض أخطاء التحقق بشكل تفصيلي
        const validationErrors = Object.values(errorResponse.errors).flat();
        validationErrors.forEach(err => toast.error(err));
      } else {
        const errorMessage = errorResponse?.message || "حدث خطأ ما. يرجى المحاولة مرة أخرى";
        toast.error(errorMessage);
      }
    } finally {
      // تعيين حالة التقديم إلى false فقط إذا كان المكون لا يزال موجودًا
      if (isMounted.current) {
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderAcademy title="تحميل..." icon={<User className="w-8 h-8" />} />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-12 h-12 rounded-full border-b-2 border-blue-600 animate-spin"></div>
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
          <div className="overflow-hidden bg-white rounded-xl shadow-md">
            <div className="p-8">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ isValid, dirty }) => (
                  <Form className="mx-auto space-y-8 max-w-5xl">
                    {/* صورة المدرب */}
                    <div className="space-y-4">
                      <label className="block text-lg font-medium text-center text-gray-700">
                        الصورة الشخصية
                      </label>
                      <Field
                        name="image"
                        component={ImageDropzone}
                        setFile={setSelectedFile}
                        currentImageUrl={
                          isEditMode ? initialValues.image : null
                        }
                      />
                    </div>

                    {/* معلومات المدرب */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      <div className="space-y-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          اسم المدرب
                        </label>
                        <Field
                          name="name"
                          type="text"
                          className="block w-full text-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-sm text-red-600"
                        />
                      </div>

                      <div className="space-y-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          البريد الإلكتروني
                        </label>
                        <Field
                          name="email"
                          type="email"
                          className="block w-full text-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-sm text-red-600"
                        />
                      </div>

                      <div className="space-y-4 md:col-span-2">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          رقم الهاتف
                        </label>
                        <Field
                          name="phone"
                          type="tel"
                          className="block w-full text-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-sm text-red-600"
                        />
                      </div>
                    </div>

                    {/* أزرار الإجراءات */}
                    <div className="flex justify-end pt-6 space-x-4 rtl:space-x-reverse">
                      <button
                        type="button"
                        onClick={() => navigate("/academy/TrainersManagment")}
                        className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 bg-white rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        disabled={
                          submitting ||
                          (isEditMode ? !isValid : !dirty || !isValid)
                        }
                        className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <span className="ml-2 loader"></span>
                            جاري الحفظ...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="ml-2 w-5 h-5" />
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

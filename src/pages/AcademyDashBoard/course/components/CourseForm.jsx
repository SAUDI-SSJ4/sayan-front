import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { fetchCategoriesThunk } from "../../../../../redux/CategorySlice";
import { fetchTrainerThunk } from "../../../../../redux/TrainerSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Alert } from "react-bootstrap";
import { getCourseSchema } from "../../../../validations/academy/course";
import { useMutation } from "@tanstack/react-query";
import {
  createCourseAPI,
  updateCourseAPI,
} from "../../../../utils/apis/client/academy";
import { useNavigate } from "react-router-dom";
import AddBasicInfo from "./AddBasicInfo";
import Loader from "../../../../components/Loader";
import Cookies from "js-cookie";

function getInitialValues(course) {
  const initialValues = {
    image: null,
    short_video: null,
    title: course?.title || "",
    type: course?.type || "recorded",
    trainer_id: course?.trainer_id || "",
    category_id: course?.category_id || "",
    price: course?.price || "",
    level: course?.level || "",
    content: course?.content || "",
    short_content: course?.short_content || "",
    learn: course?.learn || "",
    requirments: course?.requirments || "",
  };
  
  return initialValues;
}

function CourseForm({ course }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // States for upload progress
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const {
    trainers,
    isLoading: trainersIsLoading,
    error: trainersError,
  } = useSelector((state) => state.trainers);

  const {
    categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  // دالة للتحقق من المدرب (مع إضافة logs للتطوير)
  const checkTrainer = (values) => {
    console.log("قيمة المدرب المرسلة:", values.trainer_id);
    console.log("نوع البيانات:", typeof values.trainer_id);
    
    if (!values.trainer_id || values.trainer_id === '' || values.trainer_id === 0) {
      console.log("المدرب غير محدد ❌");
      return false;
    }
    console.log("المدرب محدد ✅");
    return true;
  };

  // دالة التحقق الشاملة من جميع البيانات المطلوبة
  const validateAllRequiredFields = (values) => {
    const errors = [];
    
    // التحقق من العنوان
    if (!values.title || values.title.trim() === '') {
      errors.push('العنوان مطلوب');
    }
    
    // التحقق من المدرب (أهم شيء حسب طلب المستخدم)
    if (!values.trainer_id || values.trainer_id === '' || values.trainer_id === 0) {
      errors.push('المدرب مطلوب ولا يمكن ترك هذا الحقل فارغاً');
    }
    
    // التحقق من الفئة
    if (!values.category_id || values.category_id === '' || values.category_id === 0) {
      errors.push('فئة المادة مطلوبة');
    }
    
    // التحقق من نوع الدورة
    if (!values.type || values.type.trim() === '') {
      errors.push('نوع الدورة مطلوب');
    }
    
    // التحقق من السعر
    if (values.price === '' || values.price === null || values.price === undefined) {
      errors.push('السعر مطلوب');
    } else if (isNaN(values.price) || parseFloat(values.price) < 0) {
      errors.push('السعر يجب أن يكون رقماً صحيحاً وموجباً');
    }
    
    // التحقق من المستوى
    if (!values.level || values.level.trim() === '') {
      errors.push('مستوى الطالب مطلوب');
    }
    
    // التحقق من الوصف
    if (!values.content || values.content.trim() === '') {
      errors.push('وصف المادة مطلوب');
    }
    
    // التحقق من المحتوى المختصر
    if (!values.short_content || values.short_content.trim() === '') {
      errors.push('المحتوى المختصر مطلوب');
    }
    
    // التحقق من المهارات المكتسبة
    if (!values.learn || values.learn.trim() === '') {
      errors.push('المهارات المكتسبة مطلوبة');
    }
    
    // التحقق من المتطلبات
    if (!values.requirments || values.requirments.trim() === '') {
      errors.push('متطلبات المادة مطلوبة');
    }
    
    // للمواد الجديدة: التحقق من الصورة والفيديو
    if (!course?.id) {
      if (!values.image) {
        errors.push('صورة المادة مطلوبة');
      }
      if (!values.short_video) {
        errors.push('فيديو تعريفي مطلوب');
      }
    }
    
    return errors;
  };

  const addCourseMutation = useMutation({
    mutationFn: async (formData) => {
      setIsUploading(true);
      setUploadProgress(0);
      
      return await createCourseAPI(formData, (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setUploadProgress(progress);
      });
    },
  });
  
  const updateCourseMutation = useMutation({
    mutationFn: async (formData) => {
      setIsUploading(true);
      setUploadProgress(0);
      
      return await updateCourseAPI(course?.id, formData, (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setUploadProgress(progress);
      });
    },
  });

  const formik = useFormik({
    initialValues: getInitialValues(course),
    validationSchema: getCourseSchema(course),
    onSubmit: async (values) => {
      // التحقق الشامل من جميع البيانات المطلوبة
      const validationErrors = validateAllRequiredFields(values);
      
      if (validationErrors.length > 0) {
        // التحقق من المدرب أولاً (لأنه الأهم)
        const hasTrainerError = validationErrors.some(error => error.includes('المدرب'));
        
        if (hasTrainerError) {
          toast.error("🚨 تنبيه: لا يمكن حفظ أو تحديث المادة بدون تحديد المدرب!\n\nيرجى اختيار المدرب أولاً ثم إكمال باقي البيانات.", {
            autoClose: 6000,
            style: {
              textAlign: 'right',
              direction: 'rtl',
              fontSize: '15px',
              fontWeight: 'bold',
              backgroundColor: '#fee2e2',
              borderRight: '4px solid #dc2626'
            }
          });
        } else {
          // عرض جميع الأخطاء في رسالة واحدة
          const errorMessage = validationErrors.join('\n• ');
          toast.error(`⚠️ يرجى إكمال البيانات المطلوبة:\n\n• ${errorMessage}`, {
            autoClose: 8000,
            style: {
              textAlign: 'right',
              direction: 'rtl',
              fontSize: '14px',
              lineHeight: '1.5'
            }
          });
        }
        return;
      }

      // التحقق من توكن الأكاديمية قبل الإرسال
      const academyToken = Cookies.get('academy_token');
      if (!academyToken) {
        toast.error("جلسة الأكاديمية منتهية. يرجى تسجيل الدخول مرة أخرى");
        navigate('/login');
        return;
      }

      // تحقق نهائي قبل إرسال البيانات (التأكد مرة أخيرة من المدرب)
      if (!values.trainer_id || values.trainer_id === '' || values.trainer_id === 0) {
        toast.error("🛑 خطأ: لا يمكن المتابعة بدون تحديد المدرب!", {
          autoClose: 5000,
          style: {
            textAlign: 'right',
            direction: 'rtl',
            backgroundColor: '#fef2f2',
            borderRight: '4px solid #ef4444',
            fontWeight: 'bold'
          }
        });
        return;
      }

      const formData = new FormData();

      if (course?.id) {
        formData.append("_method", "PUT");
      }

      // إرسال جميع الحقول بما في ذلك الحقول الفارغة (عدا الملفات)
      Object.entries(values).forEach(([key, value]) => {
        // للتحديث: تجاهل الملفات الفارغة فقط
        if (course?.id && (key === "image" || key === "short_video") && !value) {
          return;
        }
        
        // إرسال جميع القيم حتى لو كانت فارغة أو null
        if (value !== null && value !== undefined) {
          formData.append(key, value === '' ? '' : value);
        } else {
          // حتى القيم null نرسلها كسلسلة فارغة
          formData.append(key, '');
        }
      });

      try {
        let res;
        if (course?.id) {
          res = await updateCourseMutation.mutateAsync(formData);
        } else {
          res = await addCourseMutation.mutateAsync(formData);
        }

        if (res.status) {
          toast.success(res.message || (course?.id ? "تم تحديث المادة بنجاح" : "تم إنشاء المادة بنجاح"));
          
          if (!course?.id) {
            navigate(`/academy/course/${res.data.id}/manage`);
            formik.resetForm();
          }
        } else {
          // معالجة أخطاء التحقق من البيانات
          if (res.errors && typeof res.errors === 'object') {
            const errorMessages = [];
            Object.keys(res.errors).forEach(field => {
              const fieldErrors = res.errors[field];
              if (Array.isArray(fieldErrors)) {
                fieldErrors.forEach(error => {
                  errorMessages.push(`• ${error}`);
                });
              }
            });
            
            if (errorMessages.length > 0) {
              toast.error(
                `⚠️ ${res.message || 'فشل في حفظ البيانات'}:\n\n${errorMessages.join('\n')}`,
                {
                  autoClose: 8000,
                  style: {
                    textAlign: 'right',
                    direction: 'rtl'
                  }
                }
              );
            } else {
              toast.error(res.message || "حدث خطأ أثناء العملية");
            }
          } else {
            toast.error(res.message || "حدث خطأ أثناء العملية");
          }
        }
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("انتهت جلسة الأكاديمية. يرجى تسجيل الدخول مرة أخرى");
          navigate('/login');
        } else if (error.response?.data) {
          // معالجة أخطاء التحقق من البيانات في catch
          const responseData = error.response.data;
          
          if (responseData.errors && typeof responseData.errors === 'object') {
            const errorMessages = [];
            Object.keys(responseData.errors).forEach(field => {
              const fieldErrors = responseData.errors[field];
              if (Array.isArray(fieldErrors)) {
                fieldErrors.forEach(err => {
                  errorMessages.push(`• ${err}`);
                });
              }
            });
            
            if (errorMessages.length > 0) {
              toast.error(
                `⚠️ ${responseData.message || 'فشل في حفظ البيانات'}:\n\n${errorMessages.join('\n')}`,
                {
                  autoClose: 8000,
                  style: {
                    textAlign: 'right',
                    direction: 'rtl'
                  }
                }
              );
            } else {
              toast.error(responseData.message || "حدث خطأ أثناء رفع البيانات");
            }
          } else {
            toast.error(responseData.message || "حدث خطأ أثناء رفع البيانات");
          }
        } else {
          toast.error(error.message || "حدث خطأ أثناء رفع البيانات");
        }
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
  });

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
    dispatch(fetchTrainerThunk());
  }, [dispatch]);

  if (trainersIsLoading || categoriesIsLoading) {
    return <Loader />;
  }

  if (trainersError || categoriesError) {
    return (
      <Alert variant="danger">
        <Alert.Heading>خطأ في تحميل البيانات</Alert.Heading>
        <p>
          {trainersError && `خطأ في تحميل المدربين: ${trainersError}`}
          {categoriesError && `خطأ في تحميل الفئات: ${categoriesError}`}
        </p>
      </Alert>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <AddBasicInfo 
        formik={formik} 
        course={course} 
        uploadProgress={uploadProgress}
        isUploading={isUploading}
      />
    </form>
  );
}

export default CourseForm;

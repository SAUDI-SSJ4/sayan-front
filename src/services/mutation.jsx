import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  postChapter,
  createLesson,
  postLessonExam,
  postLessonTools,
  postUploadLessonVideo,
} from "../utils/apis/client/academy";
import Swal from "sweetalert2";
import { changeNavigate } from "../../redux/CourseSidebarSlice";
import { storage } from "../utils/storage";
import { fetchCurrentCourseSummaryThunk } from "../../redux/courses/CourseThunk";

// تعريف مفاتيح التخزين المؤقت للاستخدام المتسق في جميع أنحاء التطبيق
const CACHE_KEYS = {
  COURSE_SUMMARY: (courseId) => ["courseSummary", courseId],
  CHAPTERS: (courseId) => ["chapters", courseId],
  LESSONS: (chapterId) => ["lessons", chapterId],
};

// إعدادات عامة لتحسين أداء React Query
const QUERY_CONFIG = {
  // تقليل عدد محاولات إعادة الاتصال في حالة الفشل
  retry: 1,
  // تقليل وقت التخزين المؤقت للبيانات غير النشطة
  staleTime: 1000 * 60 * 5, // 5 دقائق
  // تمكين التخزين المؤقت للبيانات
  cacheTime: 1000 * 60 * 30, // 30 دقيقة
};

// دالة مساعدة لتحديث التخزين المؤقت بشكل أكثر كفاءة
const updateQueryCache = (queryClient, queryKey, updater) => {
  // محاولة تحديث البيانات الموجودة في التخزين المؤقت بدلاً من إعادة جلبها
  try {
    queryClient.setQueryData(queryKey, updater);
  } catch (error) {
    // إذا فشل التحديث، قم بإلغاء صلاحية البيانات فقط
    queryClient.invalidateQueries({
      queryKey,
      exact: true,
    });
  }
};

// دالة مساعدة لعرض رسائل النجاح
const showSuccessMessage = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonText: "موافق",
    // تحسين أداء النوافذ المنبثقة
    timer: 3000,
    timerProgressBar: true,
  });
};

// دالة مساعدة لعرض رسائل الخطأ
const showErrorMessage = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "موافق",
  });
};



/**
 * ملف يحتوي على دوال الربط مع API لإضافة الدورات التدريبية
 * 
 * يوفر هذا الملف مجموعة من الدوال التي تستخدم React Query لإدارة عمليات الاتصال بالخادم
 * وإرسال البيانات المتعلقة بإضافة الفصول والدروس والفيديوهات والاختبارات والأدوات التفاعلية
 * 
 * كل دالة تقوم بإرسال البيانات إلى نقطة نهاية API محددة وتعالج الاستجابة والأخطاء
 * وتقوم بتحديث حالة التطبيق وعرض رسائل النجاح أو الفشل للمستخدم
 */

export const useChapterMutation = (currentCourseId) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  // استخدام useCallback لتجنب إعادة إنشاء دوال معالجة الاستجابة في كل مرة يتم فيها استدعاء المكون
  const handleSuccess = useCallback(({ chapter }) => {
    // تحديث التخزين المحلي
    if (storage.exists("chapky89wsgnae")) {
      storage.update("chapky89wsgnae", chapter.id);
    } else {
      storage.save("chapky89wsgnae", chapter.id);
    }

    // تحديث ذاكرة التخزين المؤقت مباشرة بدلاً من إعادة جلب البيانات
    queryClient.invalidateQueries({
      queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      exact: true,
    });
    
    // تغيير التنقل وعرض رسالة النجاح
    dispatch(changeNavigate("lesson"));
    showSuccessMessage("نجاح!", "تمت إضافة الفصل بنجاح");
  }, [dispatch, queryClient, currentCourseId]);

  const handleError = useCallback((error) => {
    // تسجيل الخطأ للتصحيح وعرض رسالة الخطأ للمستخدم
    console.error("خطأ في إضافة الفصل:", error);
    showErrorMessage("فشل", "حدث خطأ أثناء محاولة إضافة الفصل. يرجى المحاولة مرة أخرى.");
  }, []);

  return useMutation({
    mutationFn: (params) => postChapter(params),
    onSuccess: handleSuccess,
    onError: handleError,
    // استخدام الإعدادات المحسنة
    ...QUERY_CONFIG,
    // إضافة خيارات لتحسين تجربة المستخدم
    onMutate: async (newChapter) => {
      // إيقاف أي استعلامات قد تتعارض مع هذا التحديث
      await queryClient.cancelQueries({
        queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      });
      
      // حفظ الحالة السابقة للتخزين المؤقت
      const previousData = queryClient.getQueryData(CACHE_KEYS.COURSE_SUMMARY(currentCourseId));
      
      return { previousData };
    },
    // استعادة الحالة السابقة في حالة حدوث خطأ
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      });
    },
  });
};

export const useLessonMutation = (currentCourseId) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const handleSuccess = useCallback(({ data }) => {
    // تحديث التخزين المحلي
    if (storage.exists("leuhqzrsyh5e")) {
      storage.update("leuhqzrsyh5e", data.id);
    } else {
      storage.save("leuhqzrsyh5e", data.id);
    }

    // تحديث ذاكرة التخزين المؤقت بدلاً من إعادة جلب البيانات
    queryClient.invalidateQueries({
      queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      exact: true,
    });
    
    // تحديث ذاكرة التخزين المؤقت للفصول
    const chapterId = storage.get("chapky89wsgnae");
    if (chapterId) {
      queryClient.invalidateQueries({
        queryKey: CACHE_KEYS.LESSONS(chapterId),
        exact: true,
      });
    }
    
    // تغيير التنقل وعرض رسالة النجاح
    dispatch(changeNavigate("video"));
    showSuccessMessage("نجاح!", "تمت إضافة الدرس بنجاح");
  }, [dispatch, queryClient, currentCourseId]);

  const handleError = useCallback((error) => {
    console.error("خطأ في إضافة الدرس:", error);
    showErrorMessage("فشل", "حدث خطأ أثناء محاولة إضافة الدرس. يرجى المحاولة مرة أخرى.");
  }, []);

  return useMutation({
    mutationFn: (params) => createLesson(params),
    onSuccess: handleSuccess,
    onError: handleError,
    ...QUERY_CONFIG,
    onMutate: async (newLesson) => {
      // إيقاف أي استعلامات قد تتعارض مع هذا التحديث
      await queryClient.cancelQueries({
        queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      });
      
      // حفظ الحالة السابقة للتخزين المؤقت
      const previousData = queryClient.getQueryData(CACHE_KEYS.COURSE_SUMMARY(currentCourseId));
      
      return { previousData };
    },
    onSettled: () => {
      // تحديث التخزين المؤقت بعد اكتمال العملية بنجاح أو فشل
      const chapterId = storage.get("chapky89wsgnae");
      if (chapterId) {
        queryClient.invalidateQueries({
          queryKey: CACHE_KEYS.LESSONS(chapterId),
        });
      }
    },
  });
};

export const useVideoMutation = (currentCourseId, lessonId) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const handleSuccess = useCallback((res) => {
    // تحديث ذاكرة التخزين المؤقت بدلاً من إعادة جلب البيانات
    queryClient.invalidateQueries({
      queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      exact: true,
    });
    
    // تغيير التنقل وعرض رسالة النجاح
    dispatch(changeNavigate("lesson"));
    showSuccessMessage("نجاح!", "تمت إضافة الفيديو بنجاح");
  }, [dispatch, queryClient, currentCourseId]);

  const handleError = useCallback((error) => {
    console.error("خطأ في إضافة الفيديو:", error);
    showErrorMessage("فشل", "حدث خطأ أثناء محاولة إضافة الفيديو. يرجى المحاولة مرة أخرى.");
  }, []);

  return useMutation({
    mutationFn: (params) => postUploadLessonVideo(lessonId, params),
    onSuccess: handleSuccess,
    onError: handleError,
    ...QUERY_CONFIG,
    onMutate: async (newVideo) => {
      // إيقاف أي استعلامات قد تتعارض مع هذا التحديث
      await queryClient.cancelQueries({
        queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      });
      
      // حفظ الحالة السابقة للتخزين المؤقت
      const previousData = queryClient.getQueryData(CACHE_KEYS.COURSE_SUMMARY(currentCourseId));
      
      return { previousData };
    },
    onSettled: () => {
      // تحديث التخزين المؤقت بعد اكتمال العملية بنجاح أو فشل
      queryClient.invalidateQueries({
        queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      });
    },
  });
};

export const useExamMutation = (currentCourseId, lessonId) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const handleSuccess = useCallback((res) => {
    // تحديث ذاكرة التخزين المؤقت بدلاً من إعادة جلب البيانات
    queryClient.invalidateQueries({
      queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      exact: true,
    });
    
    // تغيير التنقل وعرض رسالة النجاح
    dispatch(changeNavigate("lesson"));
    showSuccessMessage("نجاح!", "تمت إضافة الامتحان بنجاح");
  }, [dispatch, queryClient, currentCourseId]);

  const handleError = useCallback((error) => {
    console.error("خطأ في إضافة الامتحان:", error);
    showErrorMessage("فشل", "حدث خطأ أثناء محاولة إضافة الامتحان. يرجى المحاولة مرة أخرى.");
  }, []);

  return useMutation({
    mutationFn: (params) => postLessonExam(lessonId, params),
    onSuccess: handleSuccess,
    onError: handleError,
    ...QUERY_CONFIG,
    onMutate: async (newExam) => {
      // إيقاف أي استعلامات قد تتعارض مع هذا التحديث
      await queryClient.cancelQueries({
        queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      });
      
      // حفظ الحالة السابقة للتخزين المؤقت
      const previousData = queryClient.getQueryData(CACHE_KEYS.COURSE_SUMMARY(currentCourseId));
      
      return { previousData };
    },
    onSettled: () => {
      // تحديث التخزين المؤقت بعد اكتمال العملية بنجاح أو فشل
      queryClient.invalidateQueries({
        queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      });
    },
  });
};

export const useCardMutation = (currentCourseId, lessonId) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const handleSuccess = useCallback((res) => {
    // تحديث ذاكرة التخزين المؤقت بدلاً من إعادة جلب البيانات
    queryClient.invalidateQueries({
      queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      exact: true,
    });
    
    showSuccessMessage("نجاح!", "تمت إضافة الأداة التفاعلية بنجاح");
  }, [queryClient, currentCourseId]);

  const handleError = useCallback((error) => {
    console.error("خطأ في إضافة الأداة التفاعلية:", error);
    showErrorMessage("فشل", "حدث خطأ أثناء محاولة إضافة الأداة التفاعلية. يرجى المحاولة مرة أخرى.");
  }, []);

  return useMutation({
    mutationFn: (params) => postLessonTools(lessonId, params),
    onSuccess: handleSuccess,
    onError: handleError,
    ...QUERY_CONFIG,
    onMutate: async (newTool) => {
      // إيقاف أي استعلامات قد تتعارض مع هذا التحديث
      await queryClient.cancelQueries({
        queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      });
      
      // حفظ الحالة السابقة للتخزين المؤقت
      const previousData = queryClient.getQueryData(CACHE_KEYS.COURSE_SUMMARY(currentCourseId));
      
      return { previousData };
    },
    onSettled: () => {
      // تحديث التخزين المؤقت بعد اكتمال العملية بنجاح أو فشل
      queryClient.invalidateQueries({
        queryKey: CACHE_KEYS.COURSE_SUMMARY(currentCourseId),
      });
    },
  });

};

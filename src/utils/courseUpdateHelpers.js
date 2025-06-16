/**
 * مساعدات لإدارة التحديثات المحلية للدورات
 * هذا الملف يحتوي على دوال مساعدة لتحديث بيانات الدورات محلياً
 * بدلاً من إعادة جلبها من السيرفر في كل مرة
 */

import { 
  addChapterLocally, 
  updateChapterLocally, 
  deleteChapterLocally,
  addLessonLocally, 
  updateLessonLocally, 
  deleteLessonLocally,
  updateCourseInfoLocally 
} from '../../redux/courses/CourseSlice';

/**
 * تحديث فصل بعد إنشائه أو تعديله
 * @param {Function} dispatch - دالة dispatch من Redux
 * @param {Object} chapterData - بيانات الفصل
 * @param {string} courseId - معرف الدورة
 * @param {boolean} isEdit - هل هو تعديل أم إنشاء جديد
 */
export const updateChapterInStore = (dispatch, chapterData, courseId, isEdit = false) => {
  if (isEdit) {
    dispatch(updateChapterLocally({
      chapterId: chapterData.id,
      updatedData: {
        ...chapterData,
        updated_at: new Date().toISOString()
      }
    }));
  } else {
    dispatch(addChapterLocally({
      ...chapterData,
      lessons: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
  }
};

/**
 * حذف فصل من المتجر المحلي
 * @param {Function} dispatch - دالة dispatch من Redux
 * @param {string} chapterId - معرف الفصل
 */
export const removeChapterFromStore = (dispatch, chapterId) => {
  dispatch(deleteChapterLocally(chapterId));
};

/**
 * تحديث درس بعد إنشائه أو تعديله
 * @param {Function} dispatch - دالة dispatch من Redux
 * @param {Object} lessonData - بيانات الدرس
 * @param {string} chapterId - معرف الفصل
 * @param {boolean} isEdit - هل هو تعديل أم إنشاء جديد
 */
export const updateLessonInStore = (dispatch, lessonData, chapterId, isEdit = false) => {
  if (isEdit) {
    dispatch(updateLessonLocally({
      chapterId,
      lessonId: lessonData.id,
      updatedData: {
        ...lessonData,
        updated_at: new Date().toISOString()
      }
    }));
  } else {
    dispatch(addLessonLocally({
      chapterId,
      newLesson: {
        ...lessonData,
        tools: lessonData.tools || [],
        exams: lessonData.exams || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }));
  }
};

/**
 * حذف درس من المتجر المحلي
 * @param {Function} dispatch - دالة dispatch من Redux
 * @param {string} chapterId - معرف الفصل
 * @param {string} lessonId - معرف الدرس
 */
export const removeLessonFromStore = (dispatch, chapterId, lessonId) => {
  dispatch(deleteLessonLocally({ chapterId, lessonId }));
};

/**
 * تحديث أدوات الدرس في المتجر المحلي
 * @param {Function} dispatch - دالة dispatch من Redux
 * @param {string} chapterId - معرف الفصل
 * @param {string} lessonId - معرف الدرس
 * @param {Array} tools - قائمة الأدوات المحدثة
 */
export const updateLessonToolsInStore = (dispatch, chapterId, lessonId, tools) => {
  dispatch(updateLessonLocally({
    chapterId,
    lessonId,
    updatedData: {
      tools,
      updated_at: new Date().toISOString()
    }
  }));
};

/**
 * تحديث اختبارات الدرس في المتجر المحلي
 * @param {Function} dispatch - دالة dispatch من Redux
 * @param {string} chapterId - معرف الفصل
 * @param {string} lessonId - معرف الدرس
 * @param {Array} exams - قائمة الاختبارات المحدثة
 */
export const updateLessonExamsInStore = (dispatch, chapterId, lessonId, exams) => {
  dispatch(updateLessonLocally({
    chapterId,
    lessonId,
    updatedData: {
      exams,
      updated_at: new Date().toISOString()
    }
  }));
};

/**
 * تحديث معلومات الدورة الأساسية
 * @param {Function} dispatch - دالة dispatch من Redux
 * @param {Object} courseData - بيانات الدورة المحدثة
 */
export const updateCourseInStore = (dispatch, courseData) => {
  dispatch(updateCourseInfoLocally({
    ...courseData,
    updated_at: new Date().toISOString()
  }));
};

/**
 * دالة مساعدة لمعالجة استجابة API وتحديث المتجر
 * @param {Function} dispatch - دالة dispatch من Redux
 * @param {Object} apiResponse - استجابة API
 * @param {Object} updateConfig - إعدادات التحديث
 * @param {Function} successCallback - دالة النجاح
 * @param {Function} errorCallback - دالة الخطأ
 */
export const handleApiResponseAndUpdateStore = async (
  dispatch, 
  apiResponse, 
  updateConfig, 
  successCallback, 
  errorCallback
) => {
  try {
    if (apiResponse.status) {
      // تحديث المتجر المحلي
      const { type, data, chapterId, lessonId, isEdit } = updateConfig;
      
      switch (type) {
        case 'chapter':
          updateChapterInStore(dispatch, data, updateConfig.courseId, isEdit);
          break;
        case 'lesson':
          updateLessonInStore(dispatch, data, chapterId, isEdit);
          break;
        case 'lesson-tools':
          updateLessonToolsInStore(dispatch, chapterId, lessonId, data);
          break;
        case 'lesson-exams':
          updateLessonExamsInStore(dispatch, chapterId, lessonId, data);
          break;
        case 'course':
          updateCourseInStore(dispatch, data);
          break;
        default:
          console.warn('نوع تحديث غير معروف:', type);
      }
      
      // استدعاء دالة النجاح
      if (successCallback) {
        successCallback(apiResponse);
      }
    } else {
      // استدعاء دالة الخطأ
      if (errorCallback) {
        errorCallback(apiResponse.message || 'حدث خطأ غير معروف');
      }
    }
  } catch (error) {
    console.error('خطأ في معالجة استجابة API:', error);
    if (errorCallback) {
      errorCallback(error.message || 'حدث خطأ غير متوقع');
    }
  }
};

/**
 * دالة مساعدة لإنشاء كائن إعدادات التحديث
 * @param {string} type - نوع التحديث
 * @param {Object} data - البيانات
 * @param {Object} options - خيارات إضافية
 * @returns {Object} كائن إعدادات التحديث
 */
export const createUpdateConfig = (type, data, options = {}) => {
  return {
    type,
    data,
    ...options
  };
};

/**
 * دالة مساعدة للتحقق من صحة البيانات قبل التحديث
 * @param {string} type - نوع التحديث
 * @param {Object} data - البيانات
 * @returns {boolean} هل البيانات صحيحة
 */
export const validateUpdateData = (type, data) => {
  switch (type) {
    case 'chapter':
      return data && data.title && data.title.trim().length > 0;
    case 'lesson':
      return data && data.title && data.title.trim().length > 0;
    case 'lesson-tools':
      return Array.isArray(data);
    case 'lesson-exams':
      return Array.isArray(data);
    case 'course':
      return data && typeof data === 'object';
    default:
      return false;
  }
};

/**
 * دالة مساعدة لتنظيف البيانات قبل الإرسال
 * @param {Object} data - البيانات الأصلية
 * @returns {Object} البيانات المنظفة
 */
export const sanitizeData = (data) => {
  const cleaned = { ...data };
  
  // إزالة الخصائص غير المرغوب فيها
  delete cleaned.created_at;
  delete cleaned.updated_at;
  delete cleaned.id; // سيتم إضافته من الاستجابة
  
  // تنظيف النصوص
  if (cleaned.title) {
    cleaned.title = cleaned.title.trim();
  }
  if (cleaned.content) {
    cleaned.content = cleaned.content.trim();
  }
  if (cleaned.description) {
    cleaned.description = cleaned.description.trim();
  }
  
  return cleaned;
}; 
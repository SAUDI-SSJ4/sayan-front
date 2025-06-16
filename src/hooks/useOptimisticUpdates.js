import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

/**
 * Hook لإدارة التحديثات المحلية (Optimistic Updates)
 * يسمح بتحديث البيانات محلياً بدلاً من إعادة تحميل كامل الصفحة
 */
export const useOptimisticUpdates = (courseId) => {
  const queryClient = useQueryClient();
  
  // مفاتيح التخزين المؤقت
  const CACHE_KEYS = {
    COURSE_SUMMARY: ["courseSummary", courseId],
    COURSE_DATA: ["courseData", courseId],
    CHAPTERS: ["chapters", courseId],
  };

  /**
   * تحديث فصل محدد في البيانات المحلية
   */
  const updateChapterOptimistically = useCallback((chapterId, updatedChapter) => {
    // تحديث بيانات Course Summary في Redux
    queryClient.setQueryData(CACHE_KEYS.COURSE_SUMMARY, (oldData) => {
      if (!oldData?.chapters) return oldData;

      return {
        ...oldData,
        chapters: oldData.chapters.map((chapter) =>
          chapter.id === chapterId 
            ? { ...chapter, ...updatedChapter }
            : chapter
        ),
      };
    });

    // تحديث بيانات Course Data في مكونات أخرى
    queryClient.setQueryData(CACHE_KEYS.COURSE_DATA, (oldData) => {
      if (!oldData?.data?.categories) return oldData;

      return {
        ...oldData,
        data: {
          ...oldData.data,
          categories: oldData.data.categories.map((category) =>
            category.id === chapterId 
              ? { ...category, ...updatedChapter }
              : category
          ),
        },
      };
    });
  }, [queryClient, CACHE_KEYS]);

  /**
   * إضافة فصل جديد إلى البيانات المحلية
   */
  const addChapterOptimistically = useCallback((newChapter) => {
    // تحديث Course Summary
    queryClient.setQueryData(CACHE_KEYS.COURSE_SUMMARY, (oldData) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        chapters: [...(oldData.chapters || []), newChapter],
      };
    });

    // تحديث Course Data
    queryClient.setQueryData(CACHE_KEYS.COURSE_DATA, (oldData) => {
      if (!oldData?.data) return oldData;

      return {
        ...oldData,
        data: {
          ...oldData.data,
          categories: [...(oldData.data.categories || []), {
            ...newChapter,
            lessons: [],
          }],
        },
      };
    });
  }, [queryClient, CACHE_KEYS]);

  /**
   * حذف فصل من البيانات المحلية
   */
  const removeChapterOptimistically = useCallback((chapterId) => {
    // تحديث Course Summary
    queryClient.setQueryData(CACHE_KEYS.COURSE_SUMMARY, (oldData) => {
      if (!oldData?.chapters) return oldData;

      return {
        ...oldData,
        chapters: oldData.chapters.filter((chapter) => chapter.id !== chapterId),
      };
    });

    // تحديث Course Data
    queryClient.setQueryData(CACHE_KEYS.COURSE_DATA, (oldData) => {
      if (!oldData?.data?.categories) return oldData;

      return {
        ...oldData,
        data: {
          ...oldData.data,
          categories: oldData.data.categories.filter((category) => category.id !== chapterId),
        },
      };
    });
  }, [queryClient, CACHE_KEYS]);

  /**
   * تحديث درس محدد في البيانات المحلية
   */
  const updateLessonOptimistically = useCallback((chapterId, lessonId, updatedLesson) => {
    // تحديث Course Summary
    queryClient.setQueryData(CACHE_KEYS.COURSE_SUMMARY, (oldData) => {
      if (!oldData?.chapters) return oldData;

      return {
        ...oldData,
        chapters: oldData.chapters.map((chapter) =>
          chapter.id === chapterId
            ? {
                ...chapter,
                lessons: chapter.lessons?.map((lesson) =>
                  lesson.id === lessonId 
                    ? { ...lesson, ...updatedLesson }
                    : lesson
                ) || [],
              }
            : chapter
        ),
      };
    });

    // تحديث Course Data
    queryClient.setQueryData(CACHE_KEYS.COURSE_DATA, (oldData) => {
      if (!oldData?.data?.categories) return oldData;

      return {
        ...oldData,
        data: {
          ...oldData.data,
          categories: oldData.data.categories.map((category) =>
            category.id === chapterId
              ? {
                  ...category,
                  lessons: category.lessons?.map((lesson) =>
                    lesson.id === lessonId 
                      ? { 
                          ...lesson, 
                          ...updatedLesson,
                          // تحديث content إذا كان موجوداً
                          content: lesson.content ? { ...lesson.content, ...updatedLesson.content } : updatedLesson.content
                        }
                      : lesson
                  ) || [],
                }
              : category
          ),
        },
      };
    });
  }, [queryClient, CACHE_KEYS]);

  /**
   * إضافة درس جديد إلى البيانات المحلية
   */
  const addLessonOptimistically = useCallback((chapterId, newLesson) => {
    // تحديث Course Summary
    queryClient.setQueryData(CACHE_KEYS.COURSE_SUMMARY, (oldData) => {
      if (!oldData?.chapters) return oldData;

      return {
        ...oldData,
        chapters: oldData.chapters.map((chapter) =>
          chapter.id === chapterId
            ? {
                ...chapter,
                lessons: [...(chapter.lessons || []), newLesson],
              }
            : chapter
        ),
      };
    });

    // تحديث Course Data
    queryClient.setQueryData(CACHE_KEYS.COURSE_DATA, (oldData) => {
      if (!oldData?.data?.categories) return oldData;

      return {
        ...oldData,
        data: {
          ...oldData.data,
          categories: oldData.data.categories.map((category) =>
            category.id === chapterId
              ? {
                  ...category,
                  lessons: [...(category.lessons || []), {
                    ...newLesson,
                    content: {
                      title: newLesson.title || "درس جديد",
                      description: newLesson.description || "",
                      src: newLesson.video?.stream_url || null,
                      video: newLesson.video?.stream_url || null,
                      exam: newLesson.type === 'exam' ? newLesson.exam : null,
                      questions: newLesson.type === 'exam' ? newLesson.questions || [] : [],
                      tools: newLesson.tools || [],
                      cards: newLesson.tools ? newLesson.tools.map(tool => ({
                        id: tool.id,
                        title: tool.title,
                        description: tool.description || tool.content,
                        content: tool.content,
                        image: tool.image,
                        color: tool.color,
                        order: tool.order,
                        sequence: tool.sequence,
                        year: tool.year,
                        front: tool.title,
                        back: tool.description || tool.content,
                        isFlipped: false
                      })) : []
                    }
                  }],
                }
              : category
          ),
        },
      };
    });
  }, [queryClient, CACHE_KEYS]);

  /**
   * حذف درس من البيانات المحلية
   */
  const removeLessonOptimistically = useCallback((chapterId, lessonId) => {
    // تحديث Course Summary
    queryClient.setQueryData(CACHE_KEYS.COURSE_SUMMARY, (oldData) => {
      if (!oldData?.chapters) return oldData;

      return {
        ...oldData,
        chapters: oldData.chapters.map((chapter) =>
          chapter.id === chapterId
            ? {
                ...chapter,
                lessons: chapter.lessons?.filter((lesson) => lesson.id !== lessonId) || [],
              }
            : chapter
        ),
      };
    });

    // تحديث Course Data
    queryClient.setQueryData(CACHE_KEYS.COURSE_DATA, (oldData) => {
      if (!oldData?.data?.categories) return oldData;

      return {
        ...oldData,
        data: {
          ...oldData.data,
          categories: oldData.data.categories.map((category) =>
            category.id === chapterId
              ? {
                  ...category,
                  lessons: category.lessons?.filter((lesson) => lesson.id !== lessonId) || [],
                }
              : category
          ),
        },
      };
    });
  }, [queryClient, CACHE_KEYS]);

  /**
   * إعادة تعيين البيانات من الخادم عند الحاجة
   */
  const invalidateAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: CACHE_KEYS.COURSE_SUMMARY });
    queryClient.invalidateQueries({ queryKey: CACHE_KEYS.COURSE_DATA });
    queryClient.invalidateQueries({ queryKey: CACHE_KEYS.CHAPTERS });
  }, [queryClient, CACHE_KEYS]);

  /**
   * تحديث البيانات بأمان مع التعامل مع الأخطاء
   */
  const safeUpdate = useCallback((updateFn, fallbackFn) => {
    try {
      updateFn();
    } catch (error) {
      console.warn("فشل في التحديث المحلي، العودة للتحديث من الخادم:", error);
      if (fallbackFn) {
        fallbackFn();
      } else {
        invalidateAll();
      }
    }
  }, [invalidateAll]);

  return {
    // دوال تحديث الفصول
    updateChapter: updateChapterOptimistically,
    addChapter: addChapterOptimistically,
    removeChapter: removeChapterOptimistically,
    
    // دوال تحديث الدروس
    updateLesson: updateLessonOptimistically,
    addLesson: addLessonOptimistically,
    removeLesson: removeLessonOptimistically,
    
    // دوال مساعدة
    invalidateAll,
    safeUpdate,
  };
}; 
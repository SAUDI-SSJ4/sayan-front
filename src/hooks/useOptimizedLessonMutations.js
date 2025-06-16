import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { 
  createLesson, 
  editLesson, 
  deleteLesson,
  createExam,
  postLessonTools 
} from "../utils/apis/client/academy";
import { useOptimisticUpdates } from "./useOptimisticUpdates";
import { useToast } from "../utils/hooks/useToast";

/**
 * Hook محسن لإدارة الدروس مع التحديثات المحلية
 */
export const useOptimizedLessonMutations = (courseId, chapterId) => {
  const { success, error } = useToast();
  const optimisticUpdates = useOptimisticUpdates(courseId);
  const queryClient = useQueryClient();

  /**
   * إنشاء درس جديد
   */
  const createLessonMutation = useMutation({
    mutationFn: (lessonData) => createLesson({ courseId, chapterId }, lessonData),
    onMutate: async (newLessonData) => {
      // إيقاف أي استعلامات متعارضة
      await queryClient.cancelQueries({ queryKey: ["courseSummary", courseId] });

      // إنشاء درس مؤقت للتحديث المحلي
      const tempLesson = {
        id: `temp-${Date.now()}`, // معرف مؤقت
        title: newLessonData.get?.('title') || newLessonData.title || "درس جديد",
        type: newLessonData.get?.('type') || newLessonData.type || "video",
        chapter_id: chapterId,
        order: Date.now(), // ترتيب مؤقت
        created_at: new Date().toISOString(),
        video: null,
        tools: [],
        exams: [],
        isLoading: true, // إشارة أن الدرس قيد التحميل
      };

      // تحديث محلي فوري
      optimisticUpdates.safeUpdate(() => {
        optimisticUpdates.addLesson(chapterId, tempLesson);
      });

      return { tempLesson };
    },
    onSuccess: (response, variables, context) => {
      const realLesson = response.data || response;
      
      // استبدال الدرس المؤقت بالدرس الحقيقي
      optimisticUpdates.safeUpdate(() => {
        // إزالة الدرس المؤقت
        optimisticUpdates.removeLesson(chapterId, context.tempLesson.id);
        
        // إضافة الدرس الحقيقي
        optimisticUpdates.addLesson(chapterId, {
          ...realLesson,
          isLoading: false,
        });
      });

      success("تم إنشاء الدرس بنجاح");
    },
    onError: (err, variables, context) => {
      console.error("خطأ في إنشاء الدرس:", err);
      
      // إزالة الدرس المؤقت في حالة الخطأ
      if (context?.tempLesson) {
        optimisticUpdates.safeUpdate(() => {
          optimisticUpdates.removeLesson(chapterId, context.tempLesson.id);
        });
      }
      
      error("فشل في إنشاء الدرس");
    },
  });

  /**
   * تعديل درس موجود
   */
  const editLessonMutation = useMutation({
    mutationFn: ({ lessonId, lessonData }) => 
      editLesson({ courseId, chapterId, lessonId }, lessonData),
    onMutate: async ({ lessonId, lessonData }) => {
      await queryClient.cancelQueries({ queryKey: ["courseSummary", courseId] });

      // حفظ البيانات السابقة للاستعادة عند الخطأ
      const previousData = queryClient.getQueryData(["courseSummary", courseId]);

      // تحديث محلي فوري
      const updatedFields = {
        title: lessonData.get?.('title') || lessonData.title,
        type: lessonData.get?.('type') || lessonData.type,
        description: lessonData.get?.('description') || lessonData.description,
        isLoading: true,
      };

      optimisticUpdates.safeUpdate(() => {
        optimisticUpdates.updateLesson(chapterId, lessonId, updatedFields);
      });

      return { previousData, lessonId, updatedFields };
    },
    onSuccess: (response, { lessonId }, context) => {
      const updatedLesson = response.data || response;
      
      // تحديث البيانات بالاستجابة الحقيقية
      optimisticUpdates.safeUpdate(() => {
        optimisticUpdates.updateLesson(chapterId, lessonId, {
          ...updatedLesson,
          isLoading: false,
        });
      });

      success("تم تحديث الدرس بنجاح");
    },
    onError: (err, variables, context) => {
      console.error("خطأ في تحديث الدرس:", err);
      
      // استعادة البيانات السابقة
      if (context?.previousData) {
        queryClient.setQueryData(["courseSummary", courseId], context.previousData);
      }
      
      error("فشل في تحديث الدرس");
    },
  });

  /**
   * حذف درس
   */
  const deleteLessonMutation = useMutation({
    mutationFn: (lessonId) => deleteLesson({ courseId, chapterId, lessonId }),
    onMutate: async (lessonId) => {
      await queryClient.cancelQueries({ queryKey: ["courseSummary", courseId] });

      const previousData = queryClient.getQueryData(["courseSummary", courseId]);

      // حذف محلي فوري
      optimisticUpdates.safeUpdate(() => {
        optimisticUpdates.removeLesson(chapterId, lessonId);
      });

      return { previousData, lessonId };
    },
    onSuccess: () => {
      success("تم حذف الدرس بنجاح");
    },
    onError: (err, lessonId, context) => {
      console.error("خطأ في حذف الدرس:", err);
      
      // استعادة البيانات السابقة
      if (context?.previousData) {
        queryClient.setQueryData(["courseSummary", courseId], context.previousData);
      }
      
      error("فشل في حذف الدرس");
    },
  });

  /**
   * إضافة اختبار لدرس
   */
  const addExamMutation = useMutation({
    mutationFn: ({ lessonId, examData }) => createExam(lessonId, examData),
    onMutate: async ({ lessonId, examData }) => {
      await queryClient.cancelQueries({ queryKey: ["courseSummary", courseId] });

      const tempExam = {
        id: `temp-exam-${Date.now()}`,
        title: examData.get?.('title') || examData.title || "اختبار جديد",
        questions: examData.questions || [],
        lesson_id: lessonId,
        isLoading: true,
      };

      // تحديث الدرس لإضافة الاختبار
      optimisticUpdates.safeUpdate(() => {
        optimisticUpdates.updateLesson(chapterId, lessonId, {
          type: 'exam',
          exams: [tempExam],
        });
      });

      return { tempExam, lessonId };
    },
    onSuccess: (response, { lessonId }, context) => {
      const realExam = response.data || response;
      
      optimisticUpdates.safeUpdate(() => {
        optimisticUpdates.updateLesson(chapterId, lessonId, {
          exams: [{ ...realExam, isLoading: false }],
        });
      });

      success("تم إضافة الاختبار بنجاح");
    },
    onError: (err, { lessonId }, context) => {
      console.error("خطأ في إضافة الاختبار:", err);
      
      // إزالة الاختبار المؤقت
      if (context?.tempExam) {
        optimisticUpdates.safeUpdate(() => {
          optimisticUpdates.updateLesson(chapterId, lessonId, {
            exams: [],
          });
        });
      }
      
      error("فشل في إضافة الاختبار");
    },
  });

  /**
   * إضافة أدوات تفاعلية لدرس
   */
  const addToolsMutation = useMutation({
    mutationFn: ({ lessonId, toolsData }) => postLessonTools(lessonId, toolsData),
    onMutate: async ({ lessonId, toolsData }) => {
      await queryClient.cancelQueries({ queryKey: ["courseSummary", courseId] });

      const tempTool = {
        id: `temp-tool-${Date.now()}`,
        title: toolsData.get?.('title') || toolsData.title || "أداة جديدة",
        type: toolsData.get?.('type') || toolsData.type || "flipping_card",
        lesson_id: lessonId,
        isLoading: true,
      };

      optimisticUpdates.safeUpdate(() => {
        optimisticUpdates.updateLesson(chapterId, lessonId, {
          type: 'tool',
          tools: [tempTool],
        });
      });

      return { tempTool, lessonId };
    },
    onSuccess: (response, { lessonId }, context) => {
      const realTool = response.data || response;
      
      optimisticUpdates.safeUpdate(() => {
        optimisticUpdates.updateLesson(chapterId, lessonId, {
          tools: [{ ...realTool, isLoading: false }],
        });
      });

      success("تم إضافة الأداة التفاعلية بنجاح");
    },
    onError: (err, { lessonId }, context) => {
      console.error("خطأ في إضافة الأداة التفاعلية:", err);
      
      if (context?.tempTool) {
        optimisticUpdates.safeUpdate(() => {
          optimisticUpdates.updateLesson(chapterId, lessonId, {
            tools: [],
          });
        });
      }
      
      error("فشل في إضافة الأداة التفاعلية");
    },
  });

  /**
   * دالة مساعدة للحصول على حالة التحميل
   */
  const getLoadingState = useCallback(() => {
    return {
      isCreating: createLessonMutation.isPending,
      isEditing: editLessonMutation.isPending,
      isDeleting: deleteLessonMutation.isPending,
      isAddingExam: addExamMutation.isPending,
      isAddingTools: addToolsMutation.isPending,
      isAnyLoading: [
        createLessonMutation.isPending,
        editLessonMutation.isPending,
        deleteLessonMutation.isPending,
        addExamMutation.isPending,
        addToolsMutation.isPending,
      ].some(Boolean),
    };
  }, [
    createLessonMutation.isPending,
    editLessonMutation.isPending,
    deleteLessonMutation.isPending,
    addExamMutation.isPending,
    addToolsMutation.isPending,
  ]);

  return {
    // Mutations
    createLesson: createLessonMutation.mutate,
    editLesson: editLessonMutation.mutate,
    deleteLesson: deleteLessonMutation.mutate,
    addExam: addExamMutation.mutate,
    addTools: addToolsMutation.mutate,
    
    // Async mutations
    createLessonAsync: createLessonMutation.mutateAsync,
    editLessonAsync: editLessonMutation.mutateAsync,
    deleteLessonAsync: deleteLessonMutation.mutateAsync,
    addExamAsync: addExamMutation.mutateAsync,
    addToolsAsync: addToolsMutation.mutateAsync,
    
    // حالة التحميل
    loading: getLoadingState(),
    
    // دوال مساعدة
    reset: () => {
      createLessonMutation.reset();
      editLessonMutation.reset();
      deleteLessonMutation.reset();
      addExamMutation.reset();
      addToolsMutation.reset();
    },
    
    // إعادة تحديث البيانات من الخادم عند الحاجة
    refreshData: () => optimisticUpdates.invalidateAll(),
  };
}; 
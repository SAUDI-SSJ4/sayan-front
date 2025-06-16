import React, { useState, useEffect, useMemo } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiChevronDown, 
  FiLayers, 
  FiBookOpen,
  FiPlayCircle,
  FiLayout,
  FiRefreshCw,
  FiLoader,
  FiPlus
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk.js";
import EditChapter from "./EditChapter";
import DeleteChapter from "./DeleteChapter";
import LessonsList from "./LessonsList";
import AddNewChapter from "./AddNewChapter";
import { useOptimisticUpdates } from "../../../../../../hooks/useOptimisticUpdates";
import { useOptimizedLessonMutations } from "../../../../../../hooks/useOptimizedLessonMutations";

/**
 * مكون محسن لإدارة المنهج مع التحديثات المحلية
 */
function OptimizedCurriculum({ course }) {
  const dispatch = useDispatch();
  const { courseSummary, isLoading, isError } = useSelector((state) => state.course);
  const [expandedChapter, setExpandedChapter] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [localUpdates, setLocalUpdates] = useState(new Map());

  const courseId = course?.data?.id || course?.id;
  const optimisticUpdates = useOptimisticUpdates(courseId);

  // استخدام البيانات من Redux إذا كانت متوفرة، وإلا استخدام البيانات الممررة
  const currentCourse = courseSummary?.data || course?.data || courseSummary || course;

  // حساب البيانات مع التحديثات المحلية
  const enhancedCourse = useMemo(() => {
    if (!currentCourse) return null;

    const chapters = currentCourse.chapters || [];
    
    // تطبيق التحديثات المحلية على البيانات
    const enhancedChapters = chapters.map(chapter => {
      const localChapterUpdate = localUpdates.get(`chapter-${chapter.id}`);
      
      // إنشاء نسخة جديدة من الفصل
      const baseChapter = { ...chapter };
      const enhancedChapter = localChapterUpdate 
        ? { ...baseChapter, ...localChapterUpdate } 
        : baseChapter;
      
      // تطبيق التحديثات المحلية على الدروس
      if (chapter.lessons && Array.isArray(chapter.lessons)) {
        enhancedChapter.lessons = chapter.lessons.map(lesson => {
          const localLessonUpdate = localUpdates.get(`lesson-${lesson.id}`);
          return localLessonUpdate 
            ? { ...lesson, ...localLessonUpdate } 
            : { ...lesson };
        });
      }
      
      return enhancedChapter;
    });
    
    return {
      ...currentCourse,
      chapters: enhancedChapters,
    };
  }, [currentCourse, localUpdates]);

  useEffect(() => {
    // إذا كان لدينا courseId ولكن لا توجد بيانات في Redux، قم بجلب البيانات
    if (courseId && !courseSummary) {
      dispatch(fetchCurrentCourseSummaryThunk(courseId));
    }
  }, [course, courseSummary, dispatch, courseId]);

  // معالج التحديث اليدوي
  const handleRefresh = async () => {
    if (courseId) {
      setIsRefreshing(true);
      try {
        await dispatch(fetchCurrentCourseSummaryThunk(courseId));
        setLocalUpdates(new Map()); // مسح التحديثات المحلية بعد التحديث
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  // معالج توسيع/تقليص الفصل
  const handleChapterToggle = (chapterId) => {
    setExpandedChapter(expandedChapter === chapterId ? false : chapterId);
  };

  // تحديث محلي للفصل
  const updateChapterLocally = (chapterId, updates) => {
    setLocalUpdates(prev => {
      const newMap = new Map(prev);
      newMap.set(`chapter-${chapterId}`, { 
        ...newMap.get(`chapter-${chapterId}`), 
        ...updates,
        isUpdating: true,
      });
      return newMap;
    });

    // إزالة مؤشر التحديث بعد فترة
    setTimeout(() => {
      setLocalUpdates(prev => {
        const newMap = new Map(prev);
        const current = newMap.get(`chapter-${chapterId}`);
        if (current) {
          newMap.set(`chapter-${chapterId}`, { ...current, isUpdating: false });
        }
        return newMap;
      });
    }, 1000);
  };

  // تحديث محلي للدرس
  const updateLessonLocally = (lessonId, updates) => {
    setLocalUpdates(prev => {
      const newMap = new Map(prev);
      newMap.set(`lesson-${lessonId}`, { 
        ...newMap.get(`lesson-${lessonId}`), 
        ...updates,
        isUpdating: true,
      });
      return newMap;
    });

    // إزالة مؤشر التحديث بعد فترة
    setTimeout(() => {
      setLocalUpdates(prev => {
        const newMap = new Map(prev);
        const current = newMap.get(`lesson-${lessonId}`);
        if (current) {
          newMap.set(`lesson-${lessonId}`, { ...current, isUpdating: false });
        }
        return newMap;
      });
    }, 1000);
  };

  // عرض حالة التحميل
  if (isLoading && !enhancedCourse) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <FiLoader className="animate-spin mx-auto text-4xl text-blue-500 mb-4" />
          <p className="text-gray-600">جاري تحميل منهج المادة...</p>
        </div>
      </div>
    );
  }

  // عرض حالة الخطأ
  if (isError && !enhancedCourse) {
    return (
      <div className="text-center p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">خطأ في تحميل المنهج</h3>
          <p className="text-red-600 mb-4">حدث خطأ أثناء تحميل منهج المادة. يرجى المحاولة مرة أخرى.</p>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isRefreshing ? (
              <FiLoader className="animate-spin mr-2" />
            ) : (
              <FiRefreshCw className="mr-2" />
            )}
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  const chapters = enhancedCourse?.chapters || [];

  return (
    <div className="space-y-6">
      {/* رأس المنهج */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FiBookOpen className="text-2xl text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">منهج المادة</h2>
            <p className="text-sm text-gray-600">
              {chapters.length} فصل • {chapters.reduce((total, chapter) => total + (chapter.lessons?.length || 0), 0)} درس
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            <FiRefreshCw className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            تحديث
          </button>
        </div>
      </div>

      {/* قائمة الفصول */}
      <div className="space-y-4">
        <AnimatePresence>
          {chapters.map((chapter, index) => {
            const isExpanded = expandedChapter === chapter.id;
            const isUpdating = localUpdates.get(`chapter-${chapter.id}`)?.isUpdating;
            
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <Accordion 
                  expanded={isExpanded} 
                  onChange={() => handleChapterToggle(chapter.id)}
                  elevation={0}
                  sx={{ 
                    boxShadow: 'none',
                    '&:before': { display: 'none' }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<FiChevronDown />}
                    sx={{
                      backgroundColor: isUpdating ? '#f0f9ff' : 'transparent',
                      borderLeft: isUpdating ? '4px solid #3b82f6' : 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#f8fafc'
                      }
                    }}
                  >
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FiLayers className="text-blue-600" size={16} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {chapter.title || `الفصل ${index + 1}`}
                            {isUpdating && (
                              <FiLoader className="inline-block ml-2 animate-spin text-blue-500" size={14} />
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {chapter.lessons?.length || 0} درس
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                        <EditChapter 
                          chapter={chapter} 
                          courseId={courseId}
                          onUpdate={(updates) => updateChapterLocally(chapter.id, updates)}
                        />
                        <DeleteChapter 
                          courseId={courseId} 
                          chapterId={chapter.id}
                          onDelete={() => {
                            // إزالة الفصل من البيانات المحلية فوراً
                            optimisticUpdates.removeChapter(chapter.id);
                          }}
                        />
                      </div>
                    </div>
                  </AccordionSummary>
                  
                  <AccordionDetails sx={{ padding: 0 }}>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <OptimizedLessonsList
                        lessons={chapter.lessons || []}
                        chapterId={chapter.id}
                        courseId={courseId}
                        onLessonUpdate={(lessonId, updates) => updateLessonLocally(lessonId, updates)}
                      />
                    </motion.div>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* إضافة فصل جديد */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: chapters.length * 0.1 }}
        >
          <AddNewChapter 
            courseId={courseId}
            onAdd={(newChapter) => {
              // إضافة الفصل الجديد للبيانات المحلية فوراً
              optimisticUpdates.addChapter(newChapter);
            }}
          />
        </motion.div>
      </div>

      {/* رسالة عدم وجود فصول */}
      {chapters.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300">
            <FiBookOpen className="mx-auto text-5xl text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد فصول بعد</h3>
            <p className="text-gray-600 mb-6">ابدأ بإنشاء أول فصل في دورتك التدريبية</p>
            <AddNewChapter 
              courseId={courseId}
              variant="primary"
              onAdd={(newChapter) => {
                optimisticUpdates.addChapter(newChapter);
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

/**
 * مكون محسن لقائمة الدروس
 */
const OptimizedLessonsList = ({ lessons, chapterId, courseId, onLessonUpdate }) => {
  const lessonMutations = useOptimizedLessonMutations(courseId, chapterId);

  return (
    <LessonsList
      lessons={lessons}
      chapterId={chapterId}
      courseId={courseId}
      mutations={lessonMutations}
      onUpdate={onLessonUpdate}
    />
  );
};

export default OptimizedCurriculum; 
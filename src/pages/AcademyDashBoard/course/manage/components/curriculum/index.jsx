import React, { useState, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiChevronDown, 
  FiLayers, 
  FiBookOpen,
  FiPlayCircle,
  FiLayout,
  FiRefreshCw
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk";
import EditChapter from "./EditChapter";
import DeleteChapter from "./DeleteChapter";
import LessonsList from "./LessonsList";
import AddNewChapter from "./AddNewChapter";

function Curriculum({ 
  course
}) {
  const dispatch = useDispatch();
  const { courseSummary, isLoading, isError } = useSelector((state) => state.course);
  const [expandedChapter, setExpandedChapter] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // استخدام البيانات من Redux إذا كانت متوفرة، وإلا استخدام البيانات الممررة
  const currentCourse = courseSummary?.data || course?.data || courseSummary || course;

  console.log("Curriculum - courseSummary:", courseSummary);
  console.log("Curriculum - currentCourse:", currentCourse);

  useEffect(() => {
    // إذا كان لدينا courseId ولكن لا توجد بيانات في Redux، قم بجلب البيانات
    const courseId = course?.data?.id || course?.id;
    if (courseId && !courseSummary) {
      dispatch(fetchCurrentCourseSummaryThunk(courseId));
    }
  }, [course, courseSummary, dispatch]);

  const handleRefresh = async () => {
    const courseId = currentCourse?.id;
    if (courseId) {
      setIsRefreshing(true);
      try {
        await dispatch(fetchCurrentCourseSummaryThunk(courseId));
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  const handleAccordionChange = (chapterId) => (event, isExpanded) => {
    setExpandedChapter(isExpanded ? chapterId : false);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ display: 'inline-block', marginBottom: '16px' }}
        >
          <FiRefreshCw size={48} />
        </motion.div>
        <p>جاري تحميل بيانات المقرر...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
        <FiLayout size={48} style={{ marginBottom: '16px' }} />
        <p style={{ marginBottom: '16px' }}>حدث خطأ أثناء تحميل بيانات المقرر</p>
        <button
          onClick={handleRefresh}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0062ff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!currentCourse || !currentCourse.id) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
        <FiLayout size={48} style={{ marginBottom: '16px' }} />
        <p>لا توجد بيانات للمقرر</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '24px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)'
      }}>
        <div style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          filter: 'blur(10px)'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FiBookOpen size={28} />
            </div>
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold' }}>
                محتوى دورة: {currentCourse.title || 'بلا عنوان'}
              </h3>
              <p style={{ margin: 0, opacity: 0.85, fontSize: '14px' }}>
                {currentCourse.chapters?.length || 0} فصل • {currentCourse.chapters?.reduce((total, chapter) => total + (chapter.lessons?.length || 0), 0) || 0} درس
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                cursor: isRefreshing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isRefreshing ? 0.6 : 1
              }}
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
              >
                <FiRefreshCw size={18} />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentCourse.chapters && currentCourse.chapters.length > 0 ? (
          <AnimatePresence>
            {currentCourse.chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <ChapterItem
                  chapter={chapter}
                  index={index}
                  courseId={currentCourse.id}
                  isExpanded={expandedChapter === chapter.id}
                  onChange={handleAccordionChange(chapter.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: 'center',
              padding: '50px 20px',
              backgroundColor: '#fdfdff',
              borderRadius: '16px',
              border: '2px dashed #d1d5db',
              color: '#6b7280'
            }}
          >
            <FiLayout size={56} style={{ marginBottom: '20px', color: '#9ca3af' }} />
            <h4 style={{ marginBottom: '8px', fontWeight: '600', fontSize: '18px' }}>
              لا توجد فصول دراسية حتى الآن
            </h4>
            <p style={{ marginBottom: '24px', fontSize: '14px', lineHeight: 1.6 }}>
              ابدأ ببناء محتوى دورتك عن طريق إضافة فصل دراسي جديد. يمكنك تنظيم الدروس والاختبارات داخل كل فصل.
            </p>
          </motion.div>
        )}

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ alignSelf: 'flex-start', marginTop: currentCourse.chapters && currentCourse.chapters.length > 0 ? '16px' : '0' }}
        >
          <AddNewChapter courseId={currentCourse.id} />
        </motion.div>
      </div>
    </div>
  );
}

function ChapterItem({ 
  chapter, 
  index, 
  courseId, 
  isExpanded, 
  onChange
}) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      border: isExpanded ? '2px solid #0062ff' : '1px solid #e2e8f0',
      boxShadow: isExpanded ? '0 6px 12px rgba(0, 98, 255, 0.15)' : '0 3px 6px rgba(0,0,0,0.04)',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <Accordion 
        expanded={isExpanded} 
        onChange={onChange}
        disableGutters
        elevation={0}
        sx={{
          '&.Mui-expanded': { margin: 0 },
          '&:before': { display: 'none' },
          backgroundColor: 'transparent'
        }}
      >
        <AccordionSummary
          expandIcon={
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: isExpanded ? '#0062ff' : '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FiChevronDown size={18} color={isExpanded ? 'white' : '#4b5563'}/>
            </motion.div>
          }
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
          sx={{
            padding: '16px 20px',
            minHeight: '72px',
            cursor: 'pointer',
            '& .MuiAccordionSummary-content': {
              margin: '0 !important',
              alignItems: 'center'
            },
            '&:hover': {
              backgroundColor: '#f9fafb'
            }
          }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1, minWidth: 0 }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: isExpanded ? '#0062ff1A' : '#e8f4fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#0062ff',
                fontSize: '18px',
                transition: 'all 0.3s ease'
              }}>
                {index + 1}
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <FiLayers color={isExpanded ? '#0062ff' : '#4b5563'} size={18} />
                  <h5 style={{ 
                    margin: 0, 
                    color: isExpanded ? '#0052cc' : '#1e293b', 
                    fontWeight: '600',
                    fontSize: '17px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    transition: 'color 0.3s ease'
                  }}>
                    {chapter.title || "الفصل بدون عنوان"}
                  </h5>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ 
                    color: '#64748b', 
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <FiPlayCircle size={14} />
                    {chapter.lessons?.length || 0} درس
                  </span>
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <EditChapter 
                chapter={chapter} 
                courseId={courseId} 
              />
              <DeleteChapter courseId={courseId} chapterId={chapter.id} />
            </div>
          </div>
        </AccordionSummary>
        
        <AccordionDetails sx={{ padding: '0' }}>
          <div style={{
            backgroundColor: '#f8fafc',
          }}>
            <LessonsList
              lessons={chapter.lessons}
              chapterId={chapter.id}
              courseId={courseId}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Curriculum;

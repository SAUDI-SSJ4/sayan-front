import React, { useMemo } from "react";
import { FiFileText, FiVideo, FiEdit2, FiTrash2, FiActivity } from "react-icons/fi";
import EditLesson from "./EditLesson";
import DeleteLesson from "./DeleteLesson";
import AddCurriculum from "./AddCurriculum";
import { motion } from "framer-motion";

function LessonsList({ lessons, chapterId, courseId }) {
  console.log("LessonsList - Received lessons:", lessons);
  console.log("LessonsList - Chapter ID:", chapterId);
  
  // ترتيب الدروس حسب تاريخ التعديل (الأحدث أولاً)
  const sortedLessons = useMemo(() => {
    if (!lessons || lessons.length === 0) return [];
    
    return [...lessons].sort((a, b) => {
      // الحصول على تاريخ التعديل أو تاريخ الإنشاء
      const dateA = new Date(a.updated_at || a.created_at || 0);
      const dateB = new Date(b.updated_at || b.created_at || 0);
      
      // ترتيب تنازلي (الأحدث أولاً)
      return dateB.getTime() - dateA.getTime();
    });
  }, [lessons]);
  
  return (
    <div style={{
      backgroundColor: '#f8fafc',
      padding: '16px',
      borderRadius: '12px', 
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {sortedLessons && sortedLessons.length > 0 ? (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sortedLessons.map((lesson, index) => (
            <LessonItem
              key={lesson.id || index}
              lesson={lesson}
              index={index}
              chapterId={chapterId}
              courseId={courseId}
            />
          ))}
        </ul>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '30px 20px',
          color: '#94a3b8',
          border: '2px dashed #e2e8f0',
          borderRadius: '8px',
          backgroundColor: '#f8fafc'
        }}>
          <FiVideo size={32} style={{ marginBottom: '12px' }} />
          <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>لا توجد دروس في هذا الفصل بعد.</p>
        </div>
      )}
      <AddCurriculum 
        chapterId={chapterId} 
        courseId={courseId} 
      />
    </div>
  );
}

export default LessonsList;

const LessonItem = ({ lesson, index, courseId, chapterId }) => {
  const getLessonIcon = (type) => {
    switch (type) {
      case "video":
        return <FiVideo size={18} color="#2563eb" />;
      case "exam":
        return <FiFileText size={18} color="#10b981" />;
      case "interactive_tool":
      case "tool":
        return <FiActivity size={18} color="#8b5cf6" />;
      default:
        return <FiFileText size={18} color="#718096" />;
    }
  };

  const lessonTitle = lesson?.video?.title || lesson?.title || "درس غير مسمى";
  
  const lessonTypeDescription = 
    lesson.type === "video" ? "درس فيديو" :
    lesson.type === "exam" ? `اختبار (${lesson.exams?.length || 0} سؤال)` :
    (lesson.type === "tool" || lesson.type === "interactive_tool") ? 
      `أداة تفاعلية (${lesson.tools?.length || 0} بطاقة)` :
    "محتوى تعليمي";

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: '12px 16px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        transition: 'all 0.2s ease'
      }}
      whileHover={{ borderColor: '#0062ff', boxShadow: '0 2px 8px rgba(0, 98, 255, 0.1)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexGrow: 1, minWidth: 0 }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          backgroundColor: 
            lesson.type === "video" ? '#e0f2fe' : 
            lesson.type === "exam" ? '#d1fae5' :
            (lesson.type === "tool" || lesson.type === "interactive_tool") ? '#ede9fe' :
            '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {getLessonIcon(lesson.type)}
        </div>
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          <h6 style={{ margin: 0, fontWeight: '600', color: '#1e293b', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {lessonTitle}
          </h6>
          <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>
            {lessonTypeDescription}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <EditLesson
          lesson={lesson}
          chapterId={chapterId}
          courseId={courseId}
        />
        <DeleteLesson
          courseId={courseId}
          chapterId={chapterId}
          lessonId={lesson.id}
        />
      </div>
    </motion.li>
  );
};

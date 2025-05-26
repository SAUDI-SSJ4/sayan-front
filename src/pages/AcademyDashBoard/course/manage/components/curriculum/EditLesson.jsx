import * as React from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import LessonForm from "./LessonForm";
import AddNewExam from "./AddNewExam";
import InteractiveToolForm from "./InteractiveToolForm";

const getModalStyle = (lessonType) => {
  // تحديد حجم النافذة بناءً على نوع الدرس
  let width = '90vw';
  let maxWidth = '800px';
  let height = 'auto';
  let maxHeight = '90vh';

  if (lessonType === 'tool' || lessonType === 'interactive_tool') {
    // للأدوات التفاعلية نحتاج مساحة أكبر
    maxWidth = '1200px';
    maxHeight = '95vh';
  } else if (lessonType === 'exam') {
    // للامتحانات
    maxWidth = '900px';
  } else {
    // للدروس العادية (فيديو)
    maxWidth = '700px';
  }

  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width,
    maxWidth,
    height,
    maxHeight,
    bgcolor: "background.paper",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    borderRadius: "16px",
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    // تحسين الظهور على الشاشات الصغيرة
    '@media (max-width: 768px)': {
      width: '95vw',
      maxWidth: '95vw',
      maxHeight: '95vh',
      margin: '10px',
    }
  };
};

export default function EditLesson({ lesson, chapterId, courseId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderEditForm = () => {
    if (lesson?.type === 'exam') {
      return <AddNewExam courseId={courseId} chapterId={chapterId} exam={lesson} onClose={handleClose} />;
    } else if (lesson?.type === 'tool' || lesson?.type === 'interactive_tool') {
      return <InteractiveToolForm courseId={courseId} chapterId={chapterId} lesson={lesson} onClose={handleClose} />;
    } else {
      return <LessonForm courseId={courseId} chapterId={chapterId} lesson={lesson} onClose={handleClose} />;
    }
  };

  return (
    <>
      <Button 
        variant="text" 
        className="!min-w-10"
        onClick={handleOpen}
      >
        <FiEdit2 size={16} />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <Box sx={getModalStyle(lesson?.type)}>
          {/* شريط العنوان مع زر الإغلاق */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px 16px',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#fafafa',
            borderRadius: '16px 16px 0 0'
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a202c'
            }}>
              {lesson?.type === 'exam' ? 'تعديل الامتحان' : 
               lesson?.type === 'tool' || lesson?.type === 'interactive_tool' ? 'تعديل الأداة التفاعلية' : 
               'تعديل الدرس'}
            </h3>
            <Button
              variant="text"
              onClick={handleClose}
              sx={{
                minWidth: 'auto',
                padding: '8px',
                borderRadius: '8px',
                color: '#64748b',
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                  color: '#334155'
                }
              }}
            >
              <FiX size={20} />
            </Button>
          </div>
          
          {/* محتوى النافذة */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px',
            backgroundColor: 'white'
          }}>
            {renderEditForm()}
          </div>
        </Box>
      </Modal>
    </>
  );
}

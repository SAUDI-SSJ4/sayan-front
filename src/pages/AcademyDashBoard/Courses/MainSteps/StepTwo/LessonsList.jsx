import React, { useState, useMemo } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import { 
  ExpandMore as ExpandMoreIcon,
  PlayCircleOutline as VideoIcon,
  Quiz as ExamIcon,
  Extension as ToolIcon,
  Article as ArticleIcon,
  CheckCircle as CompletedIcon,
  AccessTime as DurationIcon,
} from "@mui/icons-material";
import style from "../../AddNewCourse.module.css";
import {
  useCourseSummary
} from "../../../../../services/queries";
import { useDispatch } from "react-redux";
import {
  updateLatestLesson
} from "../../../../../../redux/courses/CourseSlice";

const LessonsList = ({ courseId }) => {
  const { courseSummary, isLoading, isError } = useCourseSummary(courseId);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const dispatch = useDispatch();

  const chapters = useMemo(() => courseSummary?.chapters || [], [courseSummary]);

  // دالة لتحديد نوع الدرس وإرجاع الأيقونة واللون المناسب
  const getLessonTypeInfo = (lesson) => {
    if (lesson.video && lesson.video.length > 0) {
      return {
        type: "فيديو",
        icon: <VideoIcon sx={{ fontSize: 18 }} />,
        color: "#e74c3c",
        bgColor: "#ffeaea",
        borderColor: "#e74c3c"
      };
    } else if (lesson.exam && lesson.exam.length > 0) {
      return {
        type: "اختبار",
        icon: <ExamIcon sx={{ fontSize: 18 }} />,
        color: "#f39c12",
        bgColor: "#fff8e1",
        borderColor: "#f39c12"
      };
    } else if (lesson.tools && lesson.tools.length > 0) {
      return {
        type: "أداة تفاعلية",
        icon: <ToolIcon sx={{ fontSize: 18 }} />,
        color: "#9b59b6",
        bgColor: "#f3e5f5",
        borderColor: "#9b59b6"
      };
    } 
  };

  // دالة لحساب مدة الدرس
  const getLessonDuration = (lesson) => {
    if (lesson.video && lesson.video.length > 0 && lesson.video[0].duration) {
      const duration = lesson.video[0].duration;
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return null;
  };

  // دالة لحساب عدد العناصر في الدرس
  const getLessonItemsCount = (lesson) => {
    let count = 0;
    if (lesson.video) count += lesson.video.length;
    if (lesson.exam) count += lesson.exam.length;
    if (lesson.tools) count += lesson.tools.length;
    return count;
  };

  if (isLoading) {
    return (
      <div className={`${style.sidebar} ${style.left}`}>
        <div className={style.sidebarContent}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px',
            flexDirection: 'column',
            gap: 2
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #0062ff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <Typography sx={{ color: '#666', fontSize: '14px' }}>
              جاري تحميل محتوى المادة...
            </Typography>
          </Box>
        </div>
      </div>
    );
  }

  if (isError || !courseSummary) {
    return (
      <div className={`${style.sidebar} ${style.left}`}>
        <div className={style.sidebarContent}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px',
            flexDirection: 'column',
            gap: 2,
            color: '#e74c3c'
          }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
              خطأ في تحميل البيانات
            </Typography>
            <Typography sx={{ fontSize: '14px', textAlign: 'center' }}>
              تعذر تحميل محتوى المادة. يرجى المحاولة مرة أخرى.
            </Typography>
          </Box>
        </div>
      </div>
    );
  }

  const handleChapterClick = (chapterId) => {
    setSelectedChapterId(selectedChapterId === chapterId ? null : chapterId);
    setSelectedLessonId(null);
  };

  const handleLessonClick = (lessonId, chapterId) => {
    setSelectedLessonId(lessonId);
    setSelectedChapterId(chapterId);
    dispatch(updateLatestLesson({ chapterId, lessonId }));
  };

  const RenderLessonList = ({ lessons, chapterId }) => {
    if (!lessons || lessons.length === 0) {
      return (
        <Box sx={{ 
          padding: "16px 20px",
          textAlign: 'center',
          color: '#999',
          fontStyle: 'italic'
        }}>
          <Typography sx={{ fontSize: '14px' }}>
            لا توجد دروس في هذا الفصل بعد
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ padding: "8px 16px" }}>
        {[...lessons]
          .sort((a, b) => {
            const dateA = new Date(a.updated_at || a.created_at || 0);
            const dateB = new Date(b.updated_at || b.created_at || 0);
            return dateB.getTime() - dateA.getTime();
          })
          .map((lesson, index) => {
          const typeInfo = getLessonTypeInfo(lesson);
          const duration = getLessonDuration(lesson);
          const itemsCount = getLessonItemsCount(lesson);
          const isSelected = selectedLessonId === lesson.id;

          return (
            <Box
              key={lesson.id}
              onClick={() => handleLessonClick(lesson.id, chapterId)}
              sx={{
                marginBottom: "8px",
                padding: "12px 16px",
                borderRadius: "12px",
                border: `2px solid ${isSelected ? typeInfo.borderColor : '#e9ecef'}`,
                backgroundColor: isSelected ? typeInfo.bgColor : '#fff',
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: 'relative',
                overflow: 'hidden',
                "&:hover": {
                  backgroundColor: typeInfo.bgColor,
                  borderColor: typeInfo.borderColor,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 12px ${typeInfo.color}20`
                }
              }}
            >
              {/* شريط جانبي ملون */}
              <Box sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                backgroundColor: typeInfo.color,
                opacity: isSelected ? 1 : 0.3,
                transition: 'opacity 0.3s ease'
              }} />

              {/* رقم الدرس */}
              <Box sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: typeInfo.color,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {index + 1}
              </Box>

              {/* محتوى الدرس */}
              <Box sx={{ paddingRight: '32px' }}>
                {/* عنوان الدرس */}
                <Typography sx={{
                  fontWeight: isSelected ? 'bold' : '600',
                  color: isSelected ? typeInfo.color : '#2c3e50',
                  fontSize: '14px',
                  marginBottom: '8px',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {lesson.title}
                </Typography>

                {/* معلومات الدرس */}
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  flexWrap: 'wrap'
                }}>
                  {/* نوع الدرس */}
                  <Chip
                    icon={typeInfo.icon}
                    label={typeInfo.type}
                    size="small"
                    sx={{
                      backgroundColor: typeInfo.bgColor,
                      color: typeInfo.color,
                      border: `1px solid ${typeInfo.color}30`,
                      fontSize: '11px',
                      height: '24px',
                      '& .MuiChip-icon': {
                        color: typeInfo.color
                      }
                    }}
                  />

                  {/* مدة الفيديو */}
                  {duration && (
                    <Chip
                      icon={<DurationIcon sx={{ fontSize: 14 }} />}
                      label={duration}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '11px',
                        height: '24px',
                        color: '#666'
                      }}
                    />
                  )}

                  {/* عدد العناصر */}
                  {itemsCount > 0 && (
                    <Typography sx={{
                      fontSize: '11px',
                      color: '#999',
                      marginLeft: 'auto'
                    }}>
                      {itemsCount} عنصر
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* أيقونة الإكمال */}
              {isSelected && (
                <Box sx={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px'
                }}>
                  <CheckCircle sx={{
                    fontSize: 16,
                    color: '#27ae60'
                  }} />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <div className={`${style.sidebar} ${style.left}`}>
      <div className={style.sidebarContent}>
        {/* عنوان القسم */}
        <Box sx={{
          padding: '20px 16px',
          borderBottom: '2px solid #e9ecef',
          backgroundColor: '#f8f9fa'
        }}>
          <Typography sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2c3e50',
            textAlign: 'center'
          }}>
            محتوى المادة
          </Typography>
          <Typography sx={{
            fontSize: '12px',
            color: '#7f8c8d',
            textAlign: 'center',
            marginTop: '4px'
          }}>
            {chapters.length} فصل • {chapters.reduce((total, chapter) => total + (chapter.lessons?.length || 0), 0)} درس
          </Typography>
        </Box>

        {/* قائمة الفصول */}
        <div className={style.chaptersList}>
          {chapters.map((chapter, chapterIndex) => {
            const lessonsCount = chapter.lessons?.length || 0;
            const isExpanded = selectedChapterId === chapter.id;

            return (
              <Accordion
                key={chapter.id}
                expanded={isExpanded}
                onChange={() => handleChapterClick(chapter.id)}
                sx={{
                  boxShadow: "none",
                  borderBottom: "1px solid #e9ecef",
                  "&:before": {
                    display: "none",
                  },
                  "&.Mui-expanded": {
                    margin: 0
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#0062ff' }} />}
                  aria-controls={`panel${chapter.id}-content`}
                  id={`panel${chapter.id}-header`}
                  sx={{
                    backgroundColor: isExpanded ? "#f0f7ff" : "#fff",
                    minHeight: "64px",
                    borderLeft: isExpanded ? "4px solid #0062ff" : "4px solid transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#f8f9fa"
                    },
                    "&.Mui-expanded": {
                      minHeight: "64px",
                    },
                    "& .MuiAccordionSummary-content": {
                      margin: "16px 0",
                      alignItems: 'center'
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    {/* رقم الفصل */}
                    <Avatar sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: isExpanded ? '#0062ff' : '#e9ecef',
                      color: isExpanded ? 'white' : '#666',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      marginLeft: '12px'
                    }}>
                      {chapterIndex + 1}
                    </Avatar>

                    {/* معلومات الفصل */}
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{
                        fontWeight: "bold",
                        color: isExpanded ? "#0062ff" : "#2c3e50",
                        fontSize: '15px',
                        lineHeight: 1.3
                      }}>
                        {chapter.title}
                      </Typography>
                      <Typography sx={{
                        fontSize: '12px',
                        color: '#7f8c8d',
                        marginTop: '2px'
                      }}>
                        {lessonsCount} {lessonsCount === 1 ? 'درس' : 'دروس'}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ 
                  padding: "0",
                  backgroundColor: '#fafbfc'
                }}>
                  <RenderLessonList lessons={chapter.lessons || []} chapterId={chapter.id} />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>

      {/* إضافة الأنيميشن للتحميل */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LessonsList; 
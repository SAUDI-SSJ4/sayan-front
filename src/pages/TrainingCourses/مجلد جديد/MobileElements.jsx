import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton, Typography, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Videotype from "../../../assets/icons/videoType.svg?react";
import Examtype from "../../../assets/icons/examType.svg?react";
import FlippingCardIcon from "../../../assets/icons/flippingCard.svg?react";
import TimelineIcon from "../../../assets/icons/timeline.svg?react";

// Hook للكشف عن الجوال والتابلت
export const useMobileDetection = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobileOrTablet;
};

// أيقونة نوع الدرس
const getTypeIcon = (type) => {
  switch (type) {
    case 'video':
      return <Videotype width={24} height={24} />;
    case 'exam':
      return <Examtype width={24} height={24} />;
    case 'flipping_cards':
    case 'tool':
      return <FlippingCardIcon width={24} height={24} />;
    case 'timeline':
      return <TimelineIcon width={24} height={24} />;
    default:
      return <Videotype width={24} height={24} />;
  }
};

// مودال الدروس للجوال والتابلت
export const MobileLessonsModal = ({ 
  isOpen, 
  onClose, 
  categories = [], 
  selectedLesson, 
  onLessonClick 
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'flex-end',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          style={{
            width: '100%',
            maxHeight: '85vh',
            backgroundColor: 'white',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            position: 'relative',
          }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              padding: '20px 24px 16px',
              borderBottom: '1px solid #f0f0f0',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" style={{ fontWeight: 600, fontSize: '18px' }}>
              📚 قائمة الدروس
            </Typography>
            <IconButton
              onClick={onClose}
              style={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                width: '40px',
                height: '40px',
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          {/* Content */}
          <div
            style={{
              maxHeight: 'calc(85vh - 80px)',
              overflowY: 'auto',
              padding: '0',
              background: 'linear-gradient(145deg, #f8f9fa, #ffffff)',
            }}
          >
            {categories.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#666',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📖</div>
                <Typography variant="h6" style={{ marginBottom: '8px', color: '#333' }}>
                  لا توجد دروس متاحة
                </Typography>
                <Typography variant="body2" style={{ color: '#666' }}>
                  سيتم إضافة المحتوى قريباً
                </Typography>
              </div>
            ) : (
              categories.map((category, categoryIndex) => (
                <div key={category.id} style={{ marginBottom: '16px' }}>
                  {/* Category Header */}
                  <div
                    style={{
                      padding: '16px 24px',
                      backgroundColor: '#f8f9ff',
                      borderLeft: '4px solid #667eea',
                      margin: '0 16px',
                      borderRadius: '8px',
                      marginTop: categoryIndex === 0 ? '16px' : '8px',
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontWeight: 600,
                        color: '#2c3e50',
                        fontSize: '16px',
                        marginBottom: '4px',
                      }}
                    >
                      {category.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      style={{
                        color: '#7f8c8d',
                        fontSize: '12px',
                      }}
                    >
                      {category.lessons?.length || 0} درس
                    </Typography>
                  </div>

                  {/* Lessons List */}
                  <List style={{ padding: '8px 16px 0' }}>
                    {category.lessons?.map((lesson, lessonIndex) => (
                      <ListItem
                        key={lesson.id}
                        disablePadding
                        style={{ marginBottom: '4px' }}
                      >
                        <ListItemButton
                          onClick={() => {
                            onLessonClick(lesson, category);
                          }}
                          selected={selectedLesson?.id === lesson.id}
                          style={{
                            borderRadius: '12px',
                            padding: '16px',
                            backgroundColor: selectedLesson?.id === lesson.id 
                              ? 'rgba(102, 126, 234, 0.1)' 
                              : 'white',
                            border: selectedLesson?.id === lesson.id
                              ? '2px solid #667eea'
                              : '1px solid #e9ecef',
                            boxShadow: selectedLesson?.id === lesson.id
                              ? '0 4px 12px rgba(102, 126, 234, 0.15)'
                              : '0 2px 8px rgba(0, 0, 0, 0.04)',
                            transition: 'all 0.2s ease',
                            transform: selectedLesson?.id === lesson.id
                              ? 'translateY(-1px)'
                              : 'translateY(0)',
                          }}
                        >
                          <div
                            style={{
                              marginLeft: '12px',
                              padding: '8px',
                              borderRadius: '8px',
                              backgroundColor: selectedLesson?.id === lesson.id 
                                ? 'rgba(102, 126, 234, 0.15)' 
                                : 'rgba(102, 126, 234, 0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {getTypeIcon(lesson.type)}
                          </div>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body1"
                                style={{
                                  fontWeight: selectedLesson?.id === lesson.id ? 600 : 500,
                                  color: selectedLesson?.id === lesson.id ? '#667eea' : '#2c3e50',
                                  fontSize: '15px',
                                  lineHeight: '1.4',
                                }}
                              >
                                {lesson.type === "exam" && lesson.content?.exam?.title
                                  ? lesson.content.exam.title
                                  : lesson?.content?.title || lesson?.title}
                              </Typography>
                            }
                            secondary={
                              lesson.description && (
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: '#7f8c8d',
                                    fontSize: '13px',
                                    marginTop: '4px',
                                    lineHeight: '1.3',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                  }}
                                >
                                  {lesson.description}
                                </Typography>
                              )
                            }
                          />
                          {selectedLesson?.id === lesson.id && (
                            <div
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#667eea',
                                marginRight: '8px',
                                boxShadow: '0 0 8px rgba(102, 126, 234, 0.4)',
                              }}
                            />
                          )}
                        </ListItemButton>
                      </ListItem>
                    )) || (
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              style={{
                                color: '#95a5a6',
                                textAlign: 'center',
                                fontStyle: 'italic',
                                padding: '20px',
                              }}
                            >
                              لا توجد دروس في هذه الفئة
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                  </List>

                  {categoryIndex < categories.length - 1 && (
                    <Divider style={{ margin: '16px 24px' }} />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Bottom Safe Area */}
          <div style={{ height: '20px', backgroundColor: 'white' }} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 
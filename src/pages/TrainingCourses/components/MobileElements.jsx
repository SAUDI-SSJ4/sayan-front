import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton, Typography, List, ListItem, ListItemButton, ListItemText, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

// مودال الدروس للجوال والتابلت - قائمة جانبية
export const MobileLessonsModal = ({ 
  isOpen, 
  onClose, 
  categories = [], 
  selectedLesson, 
  onLessonClick 
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    if (isOpen && categories.length > 0) {
      // فتح الفئة الأولى تلقائياً
      setExpandedCategory(categories[0]?.id);
    }
  }, [isOpen, categories]);

  if (!isOpen) return null;

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

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
          alignItems: 'stretch',
          backdropFilter: 'blur(4px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          style={{
            width: '85%',
            maxWidth: '400px',
            height: '100%',
            backgroundColor: 'white',
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid #eee',
              background: 'white',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <Typography variant="h6" style={{ fontWeight: 600, fontSize: '18px', color: '#2b3674' }}>
              📚 قائمة الدروس
            </Typography>
            <IconButton
              onClick={onClose}
              style={{
                color: '#666',
                backgroundColor: '#f8f9fa',
                width: '40px',
                height: '40px',
                '&:hover': {
                  backgroundColor: '#e9ecef',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              backgroundColor: '#ffffff',
              padding: '8px',
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
                <Accordion
                  key={category.id}
                  expanded={expandedCategory === category.id}
                  onChange={() => handleCategoryToggle(category.id)}
                  style={{
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    borderRadius: '12px',
                    marginBottom: '8px',
                    border: '1px solid #eee',
                    overflow: 'hidden',
                    '&:before': {
                      display: 'none',
                    }
                  }}
                  disableGutters
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: '#2b3674' }} />}
                    style={{
                      backgroundColor: '#ffffff',
                      borderBottom: expandedCategory === category.id ? '1px solid #eee' : 'none',
                      padding: '8px 16px',
                      minHeight: '56px',
                      '&.Mui-expanded': {
                        minHeight: '56px',
                      }
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      width: '100%',
                      paddingRight: '16px'
                    }}>
                      <Typography
                        style={{
                          fontSize: '14px',
                          color: '#2b3674',
                          fontWeight: 650,
                          margin: 0,
                          flex: 1,
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          lineHeight: 1.4,
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography
                        style={{
                          color: '#6b7280',
                          fontSize: '12px',
                          background: '#f3f4f6',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          minWidth: 'fit-content',
                          flexShrink: 0,
                        }}
                      >
                        {category.lessons?.length || 0}
                      </Typography>
                    </div>
                  </AccordionSummary>
                  
                  <AccordionDetails
                    style={{
                      padding: '8px',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    {category.lessons?.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          onLessonClick(lesson, category);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '16px',
                          marginBottom: '8px',
                          cursor: 'pointer',
                          border: '1px solid #eee',
                          borderRadius: '8px',
                          transition: 'all 0.3s ease',
                          background: selectedLesson?.id === lesson.id ? '#0062ff' : 'white',
                          color: selectedLesson?.id === lesson.id ? 'white' : '#2b3674',
                          transform: selectedLesson?.id === lesson.id ? 'translateX(-2px)' : 'translateX(0)',
                          borderColor: selectedLesson?.id === lesson.id ? '#0062ff' : '#eee',
                          '&:hover': {
                            background: selectedLesson?.id === lesson.id ? '#0056e0' : '#f8f9fa',
                            borderColor: selectedLesson?.id === lesson.id ? '#0056e0' : '#0062ff',
                            transform: 'translateX(-2px)',
                          }
                        }}
                      >
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          flexShrink: 0,
                          filter: selectedLesson?.id === lesson.id ? 'brightness(0) invert(1)' : 'none'
                        }}>
                          {getTypeIcon(lesson.type)}
                        </div>
                        <Typography
                          style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: 1.4,
                            color: 'inherit',
                            flex: 1,
                          }}
                        >
                          {lesson.title}
                        </Typography>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 
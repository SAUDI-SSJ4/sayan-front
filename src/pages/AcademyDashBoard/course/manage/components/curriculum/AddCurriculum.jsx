import React, { useState } from "react";
import { Button } from "@mui/material";
import { 
  FiPlus, 
  FiVideo, 
  FiFileText, 
  FiLayers, 
  FiRotateCw,
  FiX,
  FiCheck,
  FiEye
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import CurriculumModal from "./CurriculumModal";
import LessonForm from "./LessonForm";
import AddNewExam from "./AddNewExam";
import InteractiveToolForm from "./InteractiveToolForm";

function AddCurriculum({ chapterId, courseId, onAddCurriculumItem }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [curriculumType, setCurriculumType] = useState(null);
  const [activeStep, setActiveStep] = useState('selection'); // selection, content, lesson, tools
  const [createdLesson, setCreatedLesson] = useState(null); // الدرس المُنشأ حديثاً للأدوات التفاعلية
  const [cardData, setCardData] = useState({
    color: "#007bff",
    image: "https://via.placeholder.com/400x200",
    title: "عنوان البطاقة",
    description: "محتوى البطاقة يظهر هنا.",
  });
  const [flippingCards, setFlippingCards] = useState([]);
  const [hiddenCards, setHiddenCards] = useState([]);

  const curriculumOptions = [
    {
      id: "lesson",
      title: "درس فيديو",
      description: "إضافة درس تعليمي بالفيديو",
      icon: <FiVideo size={24} />,
      color: "#0062ff",
      bgColor: "#e8f4fd"
    },
    {
      id: "exam", 
      title: "اختبار",
      description: "إنشاء اختبار تقييمي",
      icon: <FiFileText size={24} />,
      color: "#10b981",
      bgColor: "#f0fdf4"
    },
    {
      id: "interactiveTool",
      title: "أداة تفاعلية", 
      description: "إضافة بطاقات تفاعلية مخفية",
      icon: <FiEye size={24} />,
      color: "#f59e0b",
      bgColor: "#fffbeb"
    },
  ];

  const handleSelectCurriculum = (type) => {
    setCurriculumType(type);
    if (type === 'interactiveTool') {
      setActiveStep('lesson'); // للأدوات التفاعلية، ابدأ بإنشاء الدرس
    } else {
      setActiveStep('content');
    }
  };

  const handleBack = () => {
    if (activeStep === 'tools' && curriculumType === 'interactiveTool') {
      setActiveStep('lesson');
    } else if (activeStep === 'lesson' && curriculumType === 'interactiveTool') {
      setActiveStep('selection');
      setCurriculumType(null);
      setCreatedLesson(null);
    } else if (activeStep === 'content') {
      setActiveStep('selection');
      setCurriculumType(null);
    } else {
      setOpenMenu(false);
      setCurriculumType(null);
      setActiveStep('selection');
      setCreatedLesson(null);
    }
  };

  const handleClose = () => {
    setOpenMenu(false);
    setCurriculumType(null);
    setActiveStep('selection');
    setCreatedLesson(null);
  };

  // دالة للانتقال من إنشاء الدرس إلى إضافة الأدوات
  const handleLessonCreated = (lesson) => {
    console.log("Lesson created successfully:", lesson);
    setCreatedLesson(lesson);
    setActiveStep('tools');
  };

  // دالة لإغلاق النافذة بعد إنجاز العملية
  const handleToolsCompleted = () => {
    handleClose();
    if (onAddCurriculumItem) {
      onAddCurriculumItem();
    }
  };

  const renderContent = () => {
    if (activeStep === 'selection') {
      return <CurriculumSelection options={curriculumOptions} onSelect={handleSelectCurriculum} />;
    }

    // للأدوات التفاعلية - خطوة إنشاء الدرس
    if (activeStep === 'lesson' && curriculumType === 'interactiveTool') {
      return (
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <h5 style={{ color: '#374151', marginBottom: '8px' }}>الخطوة 1: إنشاء الدرس</h5>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              أنشئ الدرس أولاً، ثم ستتمكن من إضافة الأدوات التفاعلية إليه
            </p>
          </div>
          <LessonForm 
            chapterId={chapterId} 
            courseId={courseId}
            lessonType="tool"
            onLessonCreated={handleLessonCreated}
            onClose={handleClose}
          />
        </div>
      );
    }

    // للأدوات التفاعلية - خطوة إضافة الأدوات
    if (activeStep === 'tools' && curriculumType === 'interactiveTool' && createdLesson) {
      return (
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <h5 style={{ color: '#374151', marginBottom: '8px' }}>الخطوة 2: إضافة الأدوات التفاعلية</h5>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              أضف البطاقات والأدوات التفاعلية للدرس: <strong>{createdLesson.title}</strong>
            </p>
          </div>
          <InteractiveToolForm
            lesson={createdLesson}
            courseId={courseId}
            chapterId={chapterId}
            onClose={handleToolsCompleted}
          />
        </div>
      );
    }

    switch (curriculumType) {
      case "lesson":
        return (
          <div style={{ padding: '20px' }}>
            <LessonForm chapterId={chapterId} courseId={courseId} onClose={handleClose} />
          </div>
        );
      case "exam":
        return (
          <div style={{ padding: '20px' }}>
            <AddNewExam courseId={courseId} chapterId={chapterId} onClose={handleClose} />
          </div>
        );
      default:
        return <CurriculumSelection options={curriculumOptions} onSelect={handleSelectCurriculum} />;
    }
  };

  const getActiveOption = () => {
    return curriculumOptions.find(option => option.id === curriculumType);
  };

  const getStepTitle = () => {
    if (activeStep === 'selection') {
      return {
        title: "اختيار نوع المحتوى",
        description: "اختر نوع المحتوى الذي تريد إضافته لهذا الفصل"
      };
    }
    
    if (curriculumType === 'interactiveTool') {
      if (activeStep === 'lesson') {
        return {
          title: "إنشاء درس للأداة التفاعلية",
          description: "الخطوة 1: إنشاء الدرس الذي ستحتوي على الأدوات التفاعلية"
        };
      } else if (activeStep === 'tools') {
        return {
          title: "إضافة الأدوات التفاعلية",
          description: "الخطوة 2: إضافة البطاقات والأدوات التفاعلية للدرس"
        };
      }
    }
    
    const option = getActiveOption();
    return {
      title: option?.title || "إضافة محتوى",
      description: option?.description || ""
    };
  };

  const stepInfo = getStepTitle();

  return (
    <div>
      {!openMenu && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="contained"
            type="button"
            form="none"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpenMenu(true);
            }}
            startIcon={<FiPlus size={18} />}
            sx={{
              background: 'linear-gradient(135deg, #29e088 0%, #10b981 100%)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: '0 4px 10px rgba(41, 224, 136, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #20c974 0%, #0e9f65 100%)',
                boxShadow: '0 5px 14px rgba(41, 224, 136, 0.4)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            إضافة محتوى للدرس
          </Button>
        </motion.div>
      )}
      
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1300,
              padding: '20px'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '80vh',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{
                padding: '24px',
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {activeStep !== 'selection' && curriculumType ? (
                      <>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          backgroundColor: getActiveOption()?.bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {React.cloneElement(getActiveOption()?.icon, { 
                            color: getActiveOption()?.color 
                          })}
                        </div>
                        <div>
                          <h4 style={{ margin: 0, color: '#1a202c', fontWeight: 'bold' }}>
                            {stepInfo.title}
                          </h4>
                          <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                            {stepInfo.description}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          backgroundColor: '#e8f4fd',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <FiLayers color="#0062ff" size={24} />
                        </div>
                        <div>
                          <h4 style={{ margin: 0, color: '#1a202c', fontWeight: 'bold' }}>
                            {stepInfo.title}
                          </h4>
                          <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                            {stepInfo.description}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {activeStep === 'content' && (
                      <Button
                        variant="outlined"
                        onClick={handleBack}
                        sx={{
                          minWidth: '40px',
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          color: '#718096'
                        }}
                      >
                        ←
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      onClick={handleClose}
                      sx={{
                        minWidth: '40px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        color: '#718096'
                      }}
                    >
                      <FiX size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{
                flex: 1,
                overflow: 'auto',
                backgroundColor: 'white'
              }}>
                <CurriculumModal
                  setOpenMenu={setOpenMenu}
                  setCurriculumType={setCurriculumType}
                  curriculumType={curriculumType}
                  step={activeStep}
                  setStep={setActiveStep}
                  onBack={handleBack}
                >
                  {renderContent()}
                </CurriculumModal>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// مكون اختيار نوع المحتوى
const CurriculumSelection = ({ options, onSelect }) => {
  return (
    <div style={{ padding: '12px 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        {options.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(option.id)}
            style={{
              padding: '24px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease-out',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = option.color;
              e.currentTarget.style.boxShadow = `0 4px 15px ${option.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: option.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              transition: 'all 0.2s ease-out'
            }}>
              {React.cloneElement(option.icon, { color: option.color, size: 28 })}
            </div>
            
            <h5 style={{
              margin: '0 0 8px 0',
              color: '#1a202c',
              fontWeight: 'bold',
              fontSize: '16px'
            }}>
              {option.title}
            </h5>
            
            <p style={{
              margin: 0,
              color: '#718096',
              fontSize: '13px',
              lineHeight: '1.6'
            }}>
              {option.description}
            </p>
            
            <div style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: option.color,
              color: 'white',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              display: 'inline-block',
              transition: 'all 0.2s ease-out'
            }}>
              اختيار وإضافة
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AddCurriculum;

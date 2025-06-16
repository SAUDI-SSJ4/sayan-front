import React, { useRef, useEffect, useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiVideo, 
  FiUsers, 
  FiEdit3, 
  FiFileText, 
  FiPlus,
  FiEye,
  FiLayers,
  FiClock,
  FiTrendingUp,
  FiEdit,
  FiTrash2,
  FiSettings,
  FiBook,
  FiPlayCircle,
  FiX,
  FiCheck
} from "react-icons/fi";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

import videotype from "../../../assets/icons/videotype.png";
import examtype from "../../../assets/icons/examtype.png";
import style from "./AddNewCourse.module.css";
import vact1 from "../../../assets/icons/Vector.svg";
import vact2 from "../../../assets/icons/Vector (1).svg";
import vact3 from "../../../assets/icons/Vector (2).svg";
import vact4 from "../../../assets/icons/dd.svg";
import vact5 from "../../../assets/icons/Widget 4.svg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../../component/MainPages/FAQ/Accordion";
import AddNewLesson from "./AddNewLesson";
import AddNewChapter from "./AddNewChapter";
import { useCreateLessonMutation } from "../../../../services/mutation";
import AddNewExam from "./AddNewExam";
import { useParams } from "react-router-dom";
import { ButtonSoon } from "../../../utils/styles";
import { formatLongText } from "../../../utils/helpers";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
  content: Yup.string().required("الوصف مطلوب"),
  video: Yup.string().required("الفيديو الخاص بالدرس مطلوب"),
});

// Import the real Curriculum component and its forms
import Curriculum from "../course/manage/components/curriculum/index.jsx";
// Removed imports for forms that are now handled by modals:
// import ChapterForm from "../course/manage/components/curriculum/ChapterForm.jsx";
// import LessonForm from "../course/manage/components/curriculum/LessonForm.jsx";
// import AddNewExam from "../course/manage/components/curriculum/AddNewExam.jsx";
// Placeholder for other forms if needed, e.g., for interactive tools
// import AddFlippingCardForm from "../course/manage/components/curriculum/AddFlippingCardForm.jsx"; 
// import AddHiddenCardsForm from "../course/manage/components/curriculum/AddHiddenCardsForm.jsx";

// Sample data structure - this will eventually be replaced by fetched course data
const initialCourseData = {
  id: "sampleCourse123", // Added for context
  title: "دورة تطوير الويب الشاملة",
  chapters: [
    {
      id: "chapter1", // Changed to string ID for consistency
      title: "الفصل الأول: مقدمة",
      lessons: [
        { id: "lesson1a", type: "video", title: "درس تقديمي", video: { title: "مقدمة المادة" } },
        { id: "lesson1b", type: "exam", title: "اختبار تقييمي" }
      ]
    },
    {
      id: "chapter2", // Changed to string ID
      title: "الفصل الثاني: التطبيق العملي",
      lessons: [
        { id: "lesson2a", type: "video", title: "التطبيق الأول", video: { title: "بناء التطبيق" } }
      ]
    }
  ]
};

function AddNewCourseSteperTwo() {
  const { courseId: routeCourseIdFromParams } = useParams(); 
  const [courseData, setCourseData] = useState(initialCourseData); 

  const [activeSection, setActiveSection] = useState("curriculum"); 

  // TODO: useEffect to fetch real course data based on routeCourseIdFromParams and setCourseData
  // For now, if routeCourseIdFromParams exists, we can assume it might be used to load data
  useEffect(() => {
    if (routeCourseIdFromParams) {
      console.log("Course ID from route:", routeCourseIdFromParams);
      // Placeholder: fetch course data using routeCourseIdFromParams
      // setCourseData(fetchedData);
      // For now, we ensure the initialCourseData uses a dynamic ID if needed or logs it
      if (courseData.id !== routeCourseIdFromParams && routeCourseIdFromParams) {
        // This is a bit simplistic; real data fetching would occur here.
        // setCourseData(prev => ({ ...prev, id: routeCourseIdFromParams }));
      }
    }
  }, [routeCourseIdFromParams, courseData.id]);

  // This function could be passed to forms if they need to trigger a global data refresh
  // or forms could dispatch a Redux action.
  const refreshCourseData = (updatedCourseData) => {
    console.log("Refreshing course data with:", updatedCourseData);
    // This is a placeholder. In a real app, you might fetch new data or merge updates.
    setCourseData(updatedCourseData || initialCourseData); // or fetch based on courseData.id
    // toast.success("تم تحديث بيانات الدورة!");
  };

  const sidebarButtons = [
    {
      id: "course-info",
      icon: <FiSettings />,
      label: "معلومات المادة",
      description: "تعديل بيانات المادة الأساسية",
      color: "#0062ff"
    },
    {
      id: "curriculum", 
      icon: <FiBook />,
      label: "المقرر",
      description: "إدارة فصول ودروس المادة",
      color: "#29e088"
    }
  ];

  // Ensure the Curriculum component receives the correct course structure.
  const currentCourseForCurriculum = courseData || { id: routeCourseIdFromParams || initialCourseData.id, chapters: [] };

  return (
    <div className={style.mainSec}> {/* Ensure style.mainSec is defined in your CSS module */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        minHeight: 'calc(100vh - 100px)',
        padding: '20px'
      }}>
        
        {/* Right Column - Navigation */}
        <div style={{
          flex: '0 0 280px',
          minWidth: '280px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Softer shadow
            border: '1px solid #e2e8f0',
            height: '100%' // Make it full height of the row
          }}>
            <h6 style={{ 
              color: '#0062ff', 
              fontWeight: 'bold', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '18px' // Slightly larger heading
            }}>
              <FiLayers size={20}/>
              إدارة المادة
            </h6>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sidebarButtons.map((button) => (
                <button
                  key={button.id}
                  className={`btn w-100 ${
                    activeSection === button.id ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                  onClick={() => setActiveSection(button.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '15px',
                    borderRadius: '10px', // Slightly more rounded
                    textAlign: 'right',
                    border: activeSection === button.id ? `2px solid ${button.color}` : '2px solid #e2e8f0',
                    transition: 'all 0.3s ease' // Smooth transition
                  }}
                >
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '8px', // Squarish icon background
                    backgroundColor: activeSection === button.id ? button.color : `${button.color}20`, // Use color with alpha
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    {React.cloneElement(button.icon, { 
                      size: 18, // Slightly larger icon
                      color: activeSection === button.id ? 'white' : button.color 
                    })}
                  </div>
                  <div style={{ flexGrow: 1, textAlign: 'right' }}>
                    <div style={{ 
                      fontWeight: 'bold',
                      color: activeSection === button.id ? 'white' : '#333' // Darker text for inactive
                    }}>
                      {button.label}
                    </div>
                    <small style={{ 
                      color: activeSection === button.id ? 'rgba(255,255,255,0.85)' : '#718096'
                    }}>
                      {button.description}
                    </small>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header */}
            <div style={{ 
              borderBottom: '1px solid #e2e8f0', 
              padding: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px',
                  backgroundColor: activeSection === "curriculum" ? `${sidebarButtons.find(b => b.id === "curriculum").color}20` : `${sidebarButtons.find(b => b.id === "course-info").color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {activeSection === "course-info" ? <FiSettings color={sidebarButtons.find(b=>b.id==="course-info").color} size={24} /> : <FiBook color={sidebarButtons.find(b=>b.id==="curriculum").color} size={24}/>}
                </div>
                <div>
                  <h5 style={{ margin: 0, color: '#1a202c', fontWeight: 'bold', fontSize: '20px' }}>
                    {activeSection === "course-info" ? "معلومات المادة التدريبية" : "فصول ودروس المادة"}
                  </h5>
                  <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                    {activeSection === "course-info" ? "قم بتعديل البيانات الأساسية للدورة" : "إدارة المحتوى التعليمي"}
                  </p>
                </div>
              </div>
              {/* Add Action Button if needed, e.g., a global "Save Course" button */}
            </div>

            {/* Content Area */}
            <div style={{ 
              padding: '20px', 
              flexGrow: 1,
              overflowY: 'auto' 
            }}>
              {activeSection === "course-info" && (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#718096' }}>
                  <FiSettings size={64} color="#0062ff" style={{ marginBottom: '16px' }} />
                  <h5 style={{ color: '#0062ff', marginBottom: '12px' }}>معلومات المادة التدريبية</h5>
                  <p style={{ marginBottom: '24px' }}>
                    سيتم عرض نموذج تعديل معلومات المادة هنا قريباً.
                  </p>
                  <button className="btn btn-primary" onClick={() => toast.info("نموذج معلومات المادة قيد التطوير")}>
                    <FiEdit style={{ marginRight: '8px' }} />
                    تعديل معلومات المادة (قيد الإنشاء)
                  </button>
                </div>
              )}
              {activeSection === "curriculum" && (
                 <Curriculum 
                    course={currentCourseForCurriculum}
                 />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddNewCourseSteperTwo;

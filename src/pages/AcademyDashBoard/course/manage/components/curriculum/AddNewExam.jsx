import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiFileText, 
  FiHelpCircle, 
  FiPlus, 
  FiTrash2, 
  FiCheck, 
  FiAlertCircle,
  FiEdit3,
  FiTarget,
  FiList
} from "react-icons/fi";
import {
  createExam,
  createLesson,
  editLesson,
  getExamById,
} from "../../../../../../utils/apis/client/academy";
import { useToast } from "../../../../../../utils/hooks/useToast";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";
import { user_token } from "../../../../../../utils/apis/client.config";

/**
 * مكون تعديل/إضافة الاختبارات
 * 
 * تحديث: تم تحسين النظام ليستخدم بيانات الأسئلة من استجابة API بشكل أفضل
 * يدعم البنية الجديدة:
 * {
 *   "status": true,
 *   "data": {
 *     "id": "exam_id",
 *     "title": "عنوان الاختبار",
 *     "questions": [
 *       {
 *         "id": "question_id",
 *         "title": "نص السؤال",
 *         "options": [
 *           {
 *             "id": "option_id",
 *             "text": "نص الخيار",
 *             "is_correct": true/false
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * }
 * 
 * الميزات الجديدة:
 * 1. تحسين جلب بيانات الأسئلة من API
 * 2. الاحتفاظ بمعرفات الأسئلة والخيارات عند التحديث
 * 3. معالجة أكثر تفصيلاً للبيانات المستلمة
 * 4. لوج أفضل للمعلومات للتشخيص
 */

const AddNewExam = ({ courseId, chapterId, exam, onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [actualExamData, setActualExamData] = useState(null);
  const [isLoadingExamData, setIsLoadingExamData] = useState(false);
  const [currentStep, setCurrentStep] = useState(exam ? 2 : 1); // 1: إنشاء درس، 2: إضافة الأسئلة
  const [lessonData, setLessonData] = useState(exam || null);
  const [lessonTitle, setLessonTitle] = useState(exam?.title || "");
  const [examQuestions, setExamQuestions] = useState([
    {
      title: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
      ]
    }
  ]);
  const { success, error: toastError } = useToast();

  useEffect(() => {
    console.log("==========================================");
    console.log("تشخيص بيانات الاختبار (يرجى فتح Console للمزيد من المعلومات)");
    console.log("==========================================");
    console.log("Received exam object:", exam);
    console.log("Object type:", typeof exam);
    console.log("Lesson ID:", exam?.id);
    console.log("Lesson type:", exam?.type);
    console.log("Lesson title:", exam?.title);
    console.log("Has exam.questions?", !!exam?.questions, 
                exam?.questions ? `(count: ${exam.questions.length})` : "");
    console.log("Has exam.exams?", !!exam?.exams,
                exam?.exams ? `(count: ${exam.exams.length})` : "");
    console.log("Current step:", currentStep);
    console.log("==========================================");
    
    // طباعة تفاصيل البيانات للتشخيص
    if (exam) {
      if (exam.questions && exam.questions.length > 0) {
        console.log("First question from exam.questions:", exam.questions[0]);
      }
      if (exam.exams && exam.exams.length > 0) {
        console.log("First exam from exam.exams:", exam.exams[0]);
      }
    }
    
    // إذا كان هذا تعديل لاختبار موجود، نحتاج لجلب بيانات الاختبار الفعلية
    if (exam && exam.id && exam.type === 'exam') {
      console.log("درس من نوع اختبار - جاري جلب بيانات الاختبار...");
      fetchActualExamData();
    } else {
      // للاختبارات الجديدة أو البيانات المباشرة
      console.log("اختبار جديد أو بيانات مباشرة - استخدام البيانات المتوفرة");
      setActualExamData(exam);
    }
  }, [exam]);

  /**
   * جلب بيانات الاختبار الفعلية من الخادم
   */
  const fetchActualExamData = async () => {
    if (!exam?.id) return;
    
    setIsLoadingExamData(true);
    try {
      console.log("Fetching actual exam data for lesson:", exam.id);
      
      // في صفحة التعديل، نحن نعلم أن لدينا درس من نوع exam
      // لذلك يمكننا استخدام lesson_id مباشرة كـ id للدرس
      const lessonId = exam.id;
      
      // نبحث عن exam_id
      let examId = null;
      
      // محاولة العثور على exam_id في أي مكان ممكن
      if (exam.questions && exam.questions.length > 0 && exam.questions[0].exam_id) {
        examId = exam.questions[0].exam_id;
        console.log("Found exam_id from lesson.questions[0].exam_id:", examId);
      } else if (exam.exam_id) {
        examId = exam.exam_id;
        console.log("Found exam_id from lesson.exam_id:", examId);
      } else if (exam.exams && exam.exams.length > 0 && exam.exams[0].exam_id) {
        examId = exam.exams[0].exam_id;
        console.log("Found exam_id from lesson.exams[0].exam_id:", examId);
      } else if (exam.exams && exam.exams.length > 0 && exam.exams[0].id) {
        examId = exam.exams[0].id;
        console.log("Found exam_id from lesson.exams[0].id:", examId);
      }
      
      // إذا لم نجد exam_id، نطبع محتويات الدرس للتشخيص
      if (!examId) {
        console.warn("Could not find exam_id in lesson data. Lesson content:", exam);
        console.warn("Using lesson.id as fallback for exam_id");
        examId = lessonId; // استخدام معرف الدرس كـ fallback
      }
      
      console.log(`Making API call to get exam: GET /lessons/${lessonId}/exams/${examId}`);
      const response = await getExamById(lessonId, examId);
      console.log("API Response for exam data:", response);
      
      // التحقق من صحة البيانات
      if (response && response.status && response.data) {
        console.log("Successfully received exam data with structure:", Object.keys(response.data));
        
        // هنا المشكلة: في بعض الأحيان تكون البيانات المطلوبة في response.data نفسه
        const examData = response.data;
        
        // لنتحقق من وجود الأسئلة
        if (examData.questions && Array.isArray(examData.questions) && examData.questions.length > 0) {
          console.log(`Found ${examData.questions.length} questions in API response`);
          console.log("First question:", examData.questions[0]);
          
          // عرض الخيارات للسؤال الأول للتشخيص
          if (examData.questions[0].options && examData.questions[0].options.length > 0) {
            console.log(`First question has ${examData.questions[0].options.length} options`);
            console.log("Options:", examData.questions[0].options);
            } else {
            console.warn("First question has no options!");
          }
          
          // إذا لم يكن هناك عنوان للاختبار، استخدم عنوان الدرس
          if (!examData.title && exam.title) {
            examData.title = exam.title;
            console.log("Using lesson title for exam:", examData.title);
          }
          
          setActualExamData(examData);
        } else {
          console.warn("No questions array found in API response or empty questions array");
          
          // نحاول إنشاء بنية بيانات متوافقة
          const fallbackData = {
            id: examId,
            title: exam.title || "اختبار جديد",
            questions: []
          };
          
          console.log("Using fallback data structure:", fallbackData);
          setActualExamData(fallbackData);
        }
      } else {
        console.error("Invalid API response:", response);
        // استخدام البيانات الأصلية كـ fallback
        setActualExamData(exam);
      }
    } catch (error) {
      console.error("Error fetching exam data:", error);
      console.error("Error details:", error.response?.data || error.message);
      toastError("فشل في جلب بيانات الاختبار");
      // استخدام البيانات الأصلية كـ fallback
      setActualExamData(exam);
    } finally {
      setIsLoadingExamData(false);
    }
  };
  
  // إنشاء درس الاختبار
  const handleCreateExamLesson = async () => {
    if (!lessonTitle.trim()) {
      toastError("يرجى إدخال عنوان الاختبار");
      return;
    }
    
    // التحقق من وجود سؤال واحد على الأقل مع خيارات صالحة
    const validQuestions = examQuestions.filter(q => {
      if (!q.title || q.title.trim() === '') return false;
      const validOptions = q.options.filter(opt => opt.text && opt.text.trim() !== '');
      const hasCorrectAnswer = validOptions.some(opt => opt.isCorrect);
      return validOptions.length >= 2 && hasCorrectAnswer;
    });
    
    if (validQuestions.length === 0) {
      toastError("يجب إضافة سؤال واحد على الأقل مع خيارين وإجابة صحيحة");
      return;
    }
    
    setIsLoading(true);
    try {
      // إنشاء درس جديد من نوع اختبار
      const lessonFormData = new FormData();
      lessonFormData.append('type', 'exam');
      lessonFormData.append('title', lessonTitle);
      
      const response = await createLesson(
        {
          chapterId,
          courseId,
        },
        lessonFormData
      );
      
      console.log("Create lesson response:", response);

      if (response.status && response.data?.id) {
        const lessonId = response.data.id;
        
        // إنشاء الاختبار مع الأسئلة
        try {
          const examFormData = new FormData();
          examFormData.append('title', lessonTitle);
          examFormData.append('duration', '1');
          examFormData.append('description', 'اختبار');
          
          // إضافة الأسئلة الصالحة
          validQuestions.forEach((q, questionIndex) => {
            examFormData.append(`questions[${questionIndex}][title]`, q.title);
            examFormData.append(`questions[${questionIndex}][type]`, 'multiple_choice');
            examFormData.append(`questions[${questionIndex}][score]`, '1');
            
            const validOptions = q.options.filter(opt => opt.text && opt.text.trim() !== '');
            validOptions.forEach((opt, optionIndex) => {
              examFormData.append(`questions[${questionIndex}][options][${optionIndex}][text]`, opt.text.trim());
              examFormData.append(`questions[${questionIndex}][options][${optionIndex}][is_correct]`, opt.isCorrect ? '1' : '0');
            });
          });
          
          const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
          const examUrl = `${baseURL}/api/v1/academies/lessons/${lessonId}/exams`;
          
          console.log(`Creating exam for lesson ${lessonId} with URL: ${examUrl}`);
          console.log("Exam FormData entries:");
          for (let pair of examFormData.entries()) {
            console.log(`  ${pair[0]}: ${pair[1]}`);
          }
          
          const examResponse = await axios.post(
            examUrl,
            examFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${user_token()}`,
              },
            }
          );
          
          console.log("Create exam response:", examResponse.data);
          
          if (examResponse.data.status) {
            setLessonData(response.data);
            success("تم إنشاء درس الاختبار والاختبار مع الأسئلة بنجاح");
            dispatch(fetchCurrentCourseSummaryThunk(courseId));
            onClose && onClose();
        } else {
            throw new Error(examResponse.data.message || "فشل في إنشاء الاختبار");
          }
        } catch (examError) {
          console.error("Error creating exam:", examError);
          console.error("Error details:", examError.response?.data || examError.message);
          toastError(examError.response?.data?.message || examError.message || "فشل في إنشاء الاختبار");
        }
      } else {
        throw new Error(response.message || "فشل في إنشاء درس الاختبار");
      }
    } catch (error) {
      console.error("Error creating exam lesson:", error);
      toastError(error.message || "حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (exam && exam.questions) {
    console.log("AddNewExam - Existing exam questions (new structure):", exam.questions);
    exam.questions.forEach((q, index) => {
      console.log(`Question ${index + 1}:`, {
        id: q.id,
        title: q.title,
        question: q.question,
        description: q.description,
        fullObject: q
      });
    });
  }

  // عرض حالة التحميل أثناء جلب بيانات الاختبار
  if (isLoadingExamData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          textAlign: 'center'
        }}
      >
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #0062ff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }} />
        <h3 style={{ 
          margin: '0 0 8px 0', 
          color: '#1a202c', 
          fontSize: '18px',
          fontWeight: '600' 
        }}>
          جاري تحميل بيانات الاختبار...
        </h3>
        <p style={{ 
          margin: 0, 
          color: '#64748b', 
          fontSize: '14px' 
        }}>
          يرجى الانتظار قليلاً
        </p>
      </motion.div>
    );
  }

  // عرض الخطوة الأولى - إنشاء درس الاختبار
  const renderCreateLessonStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ 
          width: '100%',
          minHeight: 'auto'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          {/* العنوان */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FiFileText color="white" size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, color: '#0c4a6e', fontWeight: '600', fontSize: '18px' }}>
                إنشاء اختبار جديد
              </h3>
              <p style={{ margin: 0, color: '#0369a1', fontSize: '14px' }}>
                إنشاء درس الاختبار مع الأسئلة
              </p>
            </div>
          </div>

          {/* مدخلات العنوان */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '2px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <label style={{ 
              display: 'block',
              marginBottom: '12px',
              fontWeight: '600', 
              color: '#374151',
              fontSize: '15px'
            }}>
              عنوان الاختبار
            </label>
            <input
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              placeholder="مثال: اختبار الوحدة الأولى"
              style={{
                width: '100%',
                padding: '16px 18px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '15px',
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#0062ff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 98, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* قسم الأسئلة */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '2px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600', 
                color: '#374151',
                fontSize: '15px',
                margin: 0
              }}>
                <FiHelpCircle size={18} />
                أسئلة الاختبار
              </label>
              <button
                type="button"
                onClick={() => setExamQuestions([...examQuestions, {
                  title: "",
                  options: [
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false }
                  ]
                }])}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <FiPlus size={14} />
                إضافة سؤال
              </button>
            </div>

            {/* قائمة الأسئلة */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {examQuestions.map((question, questionIndex) => (
                <div key={questionIndex} style={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  {/* رأس السؤال */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px',
                        fontWeight: '500', 
                        color: '#374151',
                        fontSize: '14px'
                      }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#e0f2fe',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          color: '#0284c7'
                        }}>
                          {questionIndex + 1}
                        </div>
                        نص السؤال
                      </label>
                      <input
                        type="text"
                        value={question.title}
                        onChange={(e) => {
                          const newQuestions = [...examQuestions];
                          newQuestions[questionIndex].title = e.target.value;
                          setExamQuestions(newQuestions);
                        }}
                        placeholder="أدخل نص السؤال هنا..."
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          fontSize: '14px',
                          backgroundColor: '#f8fafc',
                          outline: 'none'
                        }}
                      />
                    </div>
                    {examQuestions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newQuestions = examQuestions.filter((_, i) => i !== questionIndex);
                          setExamQuestions(newQuestions);
                        }}
                        style={{
                          marginRight: '12px',
                          marginTop: '24px',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: '#fef2f2',
                          border: '1px solid #fecaca',
                          color: '#ef4444',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FiTrash2 size={12} />
                      </button>
                    )}
                  </div>

                  {/* خيارات السؤال */}
                  <div>
                    <label style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '12px',
                      fontWeight: '500', 
                      color: '#374151',
                      fontSize: '13px'
                    }}>
                      <FiTarget size={14} />
                      خيارات الإجابة
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '16px',
                          backgroundColor: option.isCorrect ? '#f0fdf4' : '#f8fafc',
                          border: `2px solid ${option.isCorrect ? '#bbf7d0' : '#e2e8f0'}`,
                          borderRadius: '12px',
                          minHeight: '60px',
                          transition: 'all 0.2s ease',
                          boxShadow: option.isCorrect ? '0 4px 12px rgba(16, 185, 129, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: option.isCorrect ? '#10b981' : '#e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: option.isCorrect ? 'white' : '#64748b',
                            minWidth: '32px'
                          }}>
                            {String.fromCharCode(65 + optionIndex)}
                          </div>
                          <input
                            type="text"
                            value={option.text}
                            onChange={(e) => {
                              const newQuestions = [...examQuestions];
                              newQuestions[questionIndex].options[optionIndex].text = e.target.value;
                              setExamQuestions(newQuestions);
                            }}
                            placeholder={`أدخل نص الخيار ${String.fromCharCode(65 + optionIndex)}`}
                            style={{
                              flex: 1,
                              padding: '12px 16px',
                              border: 'none',
                              borderRadius: '8px',
                              fontSize: '15px',
                              backgroundColor: 'white',
                              outline: 'none',
                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                              minHeight: '44px'
                            }}
                          />
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            minWidth: 'fit-content'
                          }}>
                            <input
                              type="checkbox"
                              checked={option.isCorrect}
                              onChange={(e) => {
                                const newQuestions = [...examQuestions];
                                const isChecked = e.target.checked;
                                
                                // للأسئلة متعددة الاختيارات، يمكن اختيار إجابة واحدة صحيحة فقط
                                if (isChecked) {
                                  newQuestions[questionIndex].options.forEach((opt, i) => {
                                    if (i !== optionIndex) {
                                      opt.isCorrect = false;
                                    }
                                  });
                                }
                                newQuestions[questionIndex].options[optionIndex].isCorrect = isChecked;
                                setExamQuestions(newQuestions);
                              }}
                              style={{
                                width: '20px',
                                height: '20px',
                                accentColor: '#10b981',
                                cursor: 'pointer'
                              }}
                            />
                            <span style={{
                              fontSize: '12px',
                              color: '#64748b',
                              fontWeight: '500'
                            }}>
                              صحيح
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* صندوق معلومات */}
          <div style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <div style={{
              minWidth: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#0ea5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              marginTop: '2px'
            }}>
              <FiHelpCircle size={14} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#0c4a6e', fontWeight: '500', fontSize: '14px' }}>
                متطلبات إنشاء الاختبار
              </p>
              <p style={{ margin: '4px 0 0 0', color: '#0369a1', fontSize: '13px', lineHeight: '1.5' }}>
                • يجب إدخال عنوان للاختبار<br/>
                • يجب إضافة سؤال واحد على الأقل<br/>
                • كل سؤال يحتاج خيارين على الأقل مع إجابة صحيحة واحدة
              </p>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            gap: '12px', 
            marginTop: '16px'
          }}>
            <Button
              type="button"
              variant="outline-secondary"
              onClick={onClose}
              disabled={isLoading}
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '500',
                border: '2px solid #e2e8f0',
                backgroundColor: 'white',
                color: '#64748b',
                transition: 'all 0.3s ease'
              }}
            >
              إلغاء
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleCreateExamLesson}
              disabled={isLoading || !lessonTitle.trim()}
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                backgroundColor: isLoading ? '#94a3b8' : '#0062ff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 98, 255, 0.3)'
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  جاري الإنشاء...
                </>
              ) : (
                <>
                  <FiCheck size={18} />
                  إنشاء الاختبار
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  // عرض الخطوة المناسبة
  if (currentStep === 1) {
    return renderCreateLessonStep();
  }

  // عرض حالة التحميل أثناء جلب بيانات الاختبار
  if (isLoadingExamData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          textAlign: 'center'
        }}
      >
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #0062ff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }} />
        <h3 style={{ 
          margin: '0 0 8px 0', 
          color: '#1a202c', 
          fontSize: '18px',
          fontWeight: '600' 
        }}>
          جاري تحميل بيانات الاختبار...
        </h3>
        <p style={{ 
          margin: 0, 
          color: '#64748b', 
          fontSize: '14px' 
        }}>
          يرجى الانتظار قليلاً
        </p>
      </motion.div>
    );
  }

  // تحديث initialValues لاستخدام lessonData إذا كان هذا إنشاء جديد
  const initialValues = {
    title: actualExamData?.title || lessonData?.title || "",
    questions: actualExamData?.questions?.map(q => {
      // معلومات تشخيصية
      console.log("======= معالجة السؤال =======");
      console.log("السؤال ID:", q.id);
      console.log("عنوان السؤال:", q.title);
      console.log("النوع:", q.type);
      
      // التحقق من وجود الخيارات
      const hasOptions = q.options && Array.isArray(q.options) && q.options.length > 0;
      console.log("هل يحتوي على خيارات؟", hasOptions);
      
      // معالجة الخيارات
      let questionOptions = [];
      
      if (hasOptions) {
        // الخيارات موجودة مباشرة في السؤال
        console.log(`معالجة ${q.options.length} خيارات`);
        questionOptions = q.options.map(opt => {
          // معلومات تشخيصية
          console.log(`- خيار: "${opt.text}" | صحيح: ${opt.is_correct ? 'نعم' : 'لا'}`);
      
      return {
            id: opt.id || null,
            text: opt.text || "",
            isCorrect: opt.is_correct === true || opt.is_correct === 1 || opt.is_correct === "1"
          };
        });
      } else {
        console.warn("لا توجد خيارات للسؤال! إنشاء خيارات فارغة");
      }
      
      // التأكد من وجود 4 خيارات
      while (questionOptions.length < 4) {
        questionOptions.push({
          id: null,
          text: "",
          isCorrect: false
        });
      }
      
      // إنشاء بنية السؤال النهائية
      const finalQuestion = {
        id: q.id || null,
        title: q.title || "",
        options: questionOptions.slice(0, 4) // الحد الأقصى 4 خيارات
      };
      
      // تأكيد البيانات النهائية
      console.log("السؤال النهائي:", finalQuestion.title);
      console.log("عدد الخيارات:", finalQuestion.options.length);
      console.log("======= نهاية معالجة السؤال =======");
      
      return finalQuestion;
    }) || [{ 
      // سؤال افتراضي جديد إذا لم تكن هناك أسئلة
      title: "", 
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
      ]
    }],
  };
  
  console.log("=== FINAL RESULT ===");
  console.log("AddNewExam - Initial form values:", initialValues);
  console.log("Questions count:", initialValues.questions.length);
  initialValues.questions.forEach((q, index) => {
    console.log(`Question ${index + 1} title:`, q.title);
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("العنوان مطلوب"),
    questions: Yup.array().of(
      Yup.object({
        title: Yup.string().required("عنوان السؤال مطلوب"),
        options: Yup.array().of(
          Yup.object({
            text: Yup.string(),
            isCorrect: Yup.boolean()
          })
        ).test('valid-options', 'يجب إدخال خيارين على الأقل مع نص', function(options) {
          // التحقق من وجود خيارين على الأقل بنص
          const validOptions = options.filter(opt => opt.text && opt.text.trim() !== '');
          return validOptions.length >= 2;
        }).test('at-least-one-correct', 'يجب اختيار إجابة صحيحة واحدة على الأقل من الخيارات المكتوبة', function(options) {
          // التحقق من وجود إجابة صحيحة واحدة على الأقل من الخيارات التي تحتوي على نص
          const validOptions = options.filter(opt => opt.text && opt.text.trim() !== '');
          return validOptions.some(option => option.isCorrect);
        })
      })
    ).min(1, "يجب إضافة سؤال واحد على الأقل"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.log("AddNewExam - Submitting form with values:", values);
    try {
      const formData = new FormData();
      
      // إضافة عنوان الاختبار للنموذج
      formData.append('title', values.title);
      
      // تحضير الأسئلة بتنسيق مناسب للAPI
      values.questions.forEach((q, questionIndex) => {
        // تخطي الأسئلة الفارغة
        if (!q.title || q.title.trim() === '') {
          console.log(`Skipping empty question at index ${questionIndex}`);
          return;
        }
        
        // إضافة بيانات السؤال
        formData.append(`questions[${questionIndex}][title]`, q.title);
        formData.append(`questions[${questionIndex}][type]`, 'multiple_choice');
        formData.append(`questions[${questionIndex}][score]`, '1'); // درجة افتراضية
        
        // إضافة معرف السؤال إذا كان موجوداً (للتحديث)
        if (q.id) {
          formData.append(`questions[${questionIndex}][id]`, q.id);
        }
        
        // تصفية الخيارات الفارغة
        const validOptions = q.options.filter(opt => opt.text && opt.text.trim() !== '');
        
        // التأكد من وجود خيارات صالحة
        if (validOptions.length < 2) {
          console.warn(`Question ${questionIndex + 1} has less than 2 valid options`);
        }
        
        // إضافة الخيارات
        validOptions.forEach((opt, optionIndex) => {
          formData.append(`questions[${questionIndex}][options][${optionIndex}][text]`, opt.text.trim());
          formData.append(`questions[${questionIndex}][options][${optionIndex}][is_correct]`, opt.isCorrect ? '1' : '0');
          
          // إضافة معرف الخيار إذا كان موجوداً (للتحديث)
          if (opt.id) {
            formData.append(`questions[${questionIndex}][options][${optionIndex}][id]`, opt.id);
          }
        });
      });

      if (actualExamData && actualExamData.id) { // تحديث اختبار موجود
        console.log(`Updating existing exam: lesson_id=${exam.id}, exam_id=${actualExamData.id}`);

        const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
        const updateUrl = `${baseURL}/api/v1/academies/lessons/${exam.id}/exams/${actualExamData.id}`;
        
        // إضافة _method=PUT للتوافق مع Laravel
        formData.append('_method', 'PUT');
        
        console.log("FormData entries for update:");
        for (let pair of formData.entries()) {
          console.log(`  ${pair[0]}: ${pair[1]}`);
        }
        
        const { data } = await axios.post(
          updateUrl,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user_token()}`,
            },
          }
        );
        
        console.log("Update exam response:", data);
        if (data.status) {
          success("تم تعديل الاختبار بنجاح");
          dispatch(fetchCurrentCourseSummaryThunk(courseId));
          onClose && onClose();
        } else {
          throw new Error(data.message || "فشل في تعديل الاختبار");
        }
      } else { // إنشاء اختبار جديد
        console.log("Creating new exam questions for existing lesson");
        
        // استخدام معرف الدرس الذي تم إنشاؤه في الخطوة الأولى
        const lessonId = lessonData?.id;
        
        if (!lessonId) {
          throw new Error("لم يتم العثور على معرف الدرس");
        }

        // إنشاء أسئلة الاختبار
          const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
        const examQuestionsUrl = `${baseURL}/api/v1/academies/lessons/${lessonId}/exams`;

        console.log("FormData entries for new exam questions:");
        for (let pair of formData.entries()) {
          console.log(`  ${pair[0]}: ${pair[1]}`);
        }

          const { data } = await axios.post(
          examQuestionsUrl,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${user_token()}`,
              },
            }
          );
          
        console.log("Create exam questions response:", data);
          if (data.status) {
            success("تمت إضافة الاختبار بنجاح");
            dispatch(fetchCurrentCourseSummaryThunk(courseId));
            onClose && onClose();
          } else {
            throw new Error(data.message || "فشل في إنشاء أسئلة الاختبار");
        }
      }
    } catch (error) {
      console.error("Error creating/updating exam:", error);
      toastError(error.message || "حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ 
        width: '100%',
        minHeight: 'auto'
      }}
    >
      {/* شريط مراحل الإنشاء */}
      <div style={{
        display: 'flex',
        marginBottom: '24px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          flex: 1,
          padding: '12px',
          backgroundColor: '#0284c7',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          1. إنشاء درس الاختبار ✓
        </div>
        <div style={{
          flex: 1,
          padding: '12px',
          backgroundColor: '#0284c7',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: '500',
          marginRight: '8px'
        }}>
          2. إضافة الأسئلة
        </div>
      </div>

      {/* معلومات الدرس */}
      <div style={{
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#0ea5e9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <FiFileText size={20} />
        </div>
        <div>
          <h4 style={{ margin: 0, color: '#0c4a6e', fontWeight: '600', fontSize: '16px' }}>
            {lessonData?.title || initialValues.title}
          </h4>
          <p style={{ margin: '4px 0 0 0', color: '#0369a1', fontSize: '13px' }}>
            درس اختبار • {lessonData?.id ? `معرف الدرس: ${lessonData.id.substring(0, 8)}...` : 'جاري الإنشاء'}
          </p>
        </div>
      </div>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, setFieldValue }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* حالة التحميل */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '20px',
                  marginBottom: '24px',
                  backgroundColor: '#e0f2fe',
                  border: '1px solid #0284c7',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #0284c7',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <p style={{ margin: 0, color: '#0c4a6e', fontWeight: '600', fontSize: '15px' }}>
                  جاري حفظ الاختبار...
                </p>
              </motion.div>
            )}
            
            {/* حالة بيانات الاختبار */}
            {(actualExamData || initialValues.questions.length > 0) ? (
              <div style={{
                padding: '16px',
                marginBottom: '24px',
                backgroundColor: '#f0fdf4',
                border: '1px solid #22c55e',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#22c55e',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>✓</div>
              </div>
            ) : (
              <div style={{
                padding: '16px',
                marginBottom: '24px',
                backgroundColor: '#fef2f2',
                border: '1px solid #ef4444',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>!</div>
                <div>
                  <p style={{ margin: 0, color: '#991b1b', fontWeight: '600', fontSize: '15px' }}>
                    مشكلة في تحميل بيانات الاختبار
                  </p>
                  <p style={{ margin: '4px 0 0 0', color: '#991b1b', fontSize: '13px' }}>
                    افتح Console المتصفح (F12) لمزيد من المعلومات
                  </p>
                </div>
              </div>
            )}

            {/* عنوان الاختبار */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '600', 
                  color: '#374151',
                  fontSize: '16px',
                  margin: 0
                }}>
                  <FiFileText size={18} />
                عنوان الاختبار
              </label>
              </div>
              <Field
                name="title"
                type="text"
                placeholder="مثال: اختبار الوحدة الأولى"
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  border: `2px solid ${touched.title && errors.title ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  fontSize: '15px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0062ff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 98, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = touched.title && errors.title ? '#ef4444' : '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {actualExamData && actualExamData.id && actualExamData.id !== exam?.id && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  marginTop: '8px', 
                  color: '#059669', 
                  fontSize: '13px',
                  backgroundColor: '#ecfdf5',
                  padding: '8px 12px',
                  borderRadius: '8px'
                }}>
                </div>
              )}
              {exam && exam.title && values.title !== exam.title && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  marginTop: '8px', 
                  color: '#0369a1', 
                  fontSize: '13px',
                  backgroundColor: '#e0f2fe',
                  padding: '8px 12px',
                  borderRadius: '8px'
                }}>
                  <FiAlertCircle size={12} />
                  عنوان الدرس: "{exam.title}"
            </div>
              )}
              {touched.title && errors.title && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  marginTop: '8px', 
                  color: '#ef4444', 
                  fontSize: '13px' 
                }}>
                  <FiAlertCircle size={12} />
                  {errors.title}
                </div>
              )}
          </div>

            {/* قسم الأسئلة */}
          <FieldArray name="questions">
            {({ push, remove }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* رأس قسم الأسئلة */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    backgroundColor: '#f0f9ff',
                    border: '2px solid #bae6fd',
                    borderRadius: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#0284c7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <FiHelpCircle color="white" size={20} />
                      </div>
                      <div>
                        <h5 style={{ margin: 0, color: '#0c4a6e', fontWeight: '600', fontSize: '18px' }}>
                          أسئلة الاختبار
                        </h5>
                        <p style={{ margin: 0, color: '#0369a1', fontSize: '14px' }}>
                          {values.questions.length} سؤال • اختيار من متعدد
                        </p>
                      </div>
                    </div>
                    <motion.button
                    type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      push({
                        title: "",
                        options: [
                          { text: "", isCorrect: false },
                          { text: "", isCorrect: false },
                          { text: "", isCorrect: false },
                          { text: "", isCorrect: false },
                        ],
                      })
                    }
                      style={{
                        padding: '12px 20px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      <FiPlus size={16} />
                    إضافة سؤال جديد
                    </motion.button>
                </div>

                  {/* قائمة الأسئلة */}
                  <AnimatePresence>
                {values.questions.map((question, index) => (
                      <motion.div
                    key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          backgroundColor: 'white',
                          border: '2px solid #e2e8f0',
                          borderRadius: '16px',
                          padding: '24px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        {/* رأس السؤال */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '20px'
                        }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ 
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '12px',
                              fontWeight: '600', 
                              color: '#374151',
                              fontSize: '15px'
                            }}>
                              <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#e0f2fe',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: '#0284c7'
                              }}>
                                {index + 1}
                              </div>
                              نص السؤال
                        </label>
                        <Field
                          name={`questions[${index}].title`}
                          type="text"
                              placeholder="أدخل نص السؤال هنا..."
                              style={{
                                width: '100%',
                                padding: '16px 18px',
                                border: `2px solid ${touched.questions?.[index]?.title && errors.questions?.[index]?.title ? '#ef4444' : '#e2e8f0'}`,
                                borderRadius: '12px',
                                fontSize: '15px',
                                backgroundColor: 'white',
                                transition: 'all 0.3s ease',
                                outline: 'none'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#0062ff';
                                e.target.style.boxShadow = '0 0 0 3px rgba(0, 98, 255, 0.1)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = touched.questions?.[index]?.title && errors.questions?.[index]?.title ? '#ef4444' : '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                              }}
                            />
                            {touched.questions?.[index]?.title && errors.questions?.[index]?.title && (
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '6px', 
                                marginTop: '8px', 
                                color: '#ef4444', 
                                fontSize: '13px' 
                              }}>
                                <FiAlertCircle size={12} />
                              {errors.questions[index].title}
                            </div>
                          )}
                      </div>
                          <motion.button
                        type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        onClick={() => remove(index)}
                            style={{
                              marginRight: '16px',
                              marginTop: '32px',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              backgroundColor: '#fef2f2',
                              border: '2px solid #fecaca',
                              color: '#ef4444',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <FiTrash2 size={16} />
                          </motion.button>
                    </div>

                        {/* خيارات السؤال */}
                    <div>
                          <label style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '16px',
                            fontWeight: '600', 
                            color: '#374151',
                            fontSize: '15px'
                          }}>
                            <FiTarget size={16} />
                            خيارات الإجابة (حدد الإجابة الصحيحة)
                      </label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                      {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '16px',
                                backgroundColor: option.isCorrect ? '#f0fdf4' : '#f8fafc',
                                border: `2px solid ${option.isCorrect ? '#bbf7d0' : '#e2e8f0'}`,
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                                minHeight: '64px',
                                boxShadow: option.isCorrect ? '0 4px 12px rgba(16, 185, 129, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                              }}>
                                <div style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  backgroundColor: option.isCorrect ? '#10b981' : '#e2e8f0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '14px',
                                  fontWeight: 'bold',
                                  color: option.isCorrect ? 'white' : '#64748b',
                                  minWidth: '32px'
                                }}>
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                          <Field
                            name={`questions[${index}].options[${optionIndex}].text`}
                            type="text"
                                  placeholder={`أدخل نص الخيار ${String.fromCharCode(65 + optionIndex)}`}
                                  style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    backgroundColor: 'white',
                                    outline: 'none',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    minHeight: '44px'
                                  }}
                          />
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            minWidth: 'fit-content'
                          }}>
                            <Field
                              name={`questions[${index}].options[${optionIndex}].isCorrect`}
                              type="checkbox"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      accentColor: '#10b981',
                                      cursor: 'pointer'
                                    }}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                // للأسئلة متعددة الاختيارات، يمكن اختيار إجابة واحدة صحيحة فقط
                                if (isChecked) {
                                  values.questions[index].options.forEach((opt, i) => {
                                    if (i !== optionIndex) {
                                      setFieldValue(`questions[${index}].options[${i}].isCorrect`, false);
                                    }
                                  });
                                }
                                setFieldValue(`questions[${index}].options[${optionIndex}].isCorrect`, isChecked);
                              }}
                            />
                            <span style={{
                              fontSize: '12px',
                              color: '#64748b',
                              fontWeight: '500'
                            }}>
                              صحيح
                            </span>
                          </div>
                        </div>
                      ))}
                          </div>
                       {touched.questions?.[index]?.options && typeof errors.questions?.[index]?.options === 'string' && (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '6px', 
                              marginTop: '12px', 
                              color: '#ef4444', 
                              fontSize: '13px' 
                            }}>
                              <FiAlertCircle size={12} />
                            {errors.questions[index].options}
                          </div>
                        )}
                    </div>
                      </motion.div>
                ))}
                  </AnimatePresence>
              </div>
            )}
          </FieldArray>

            {/* أزرار التحكم */}
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'flex-end',
              paddingTop: '24px',
              borderTop: '1px solid #e2e8f0',
              marginTop: '8px'
            }}>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={onClose}
                disabled={isLoading}
                style={{
                  padding: '14px 28px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '500',
                  border: '2px solid #e2e8f0',
                  backgroundColor: 'white',
                  color: '#64748b',
                  transition: 'all 0.3s ease'
                }}
              >
                إلغاء
              </Button>
              <Button
              type="submit"
                variant="primary"
              disabled={isLoading}
                style={{
                  padding: '14px 28px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  backgroundColor: isLoading ? '#94a3b8' : '#0062ff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 98, 255, 0.3)'
                }}
              >
                {isLoading ? (
                  <>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      border: '2px solid #ffffff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <FiCheck size={18} />
                    {actualExamData ? "حفظ التعديلات" : "حفظ الاختبار"}
                  </>
                )}
              </Button>
          </div>
        </Form>
      )}
    </Formik>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default AddNewExam;

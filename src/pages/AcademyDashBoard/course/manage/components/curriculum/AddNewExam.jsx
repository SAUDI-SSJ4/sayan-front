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
} from "../../../../../../utils/apis/client/academy";
import { useToast } from "../../../../../../utils/hooks/useToast";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";
import { user_token } from "../../../../../../utils/apis/client.config";

const AddNewExam = ({ courseId, chapterId, exam, onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { success, error: toastError } = useToast();

  useEffect(() => {
    console.log("AddNewExam - Received exam prop:", exam);
    if (exam && exam.exams) {
      console.log("AddNewExam - Existing exam questions (exam.exams):", exam.exams);
    }
  }, [exam]);

  const initialValues = {
    title: exam?.title || "",
    questions: exam?.exams?.map(q => {
      console.log("Processing exam question:", q);
      
      // معالجة البيانات الموجودة - قد تكون answers أو options
      let questionOptions = [];
      
      if (q.answers) {
        // إذا كانت البيانات في حقل answers
        if (typeof q.answers === 'string') {
          try {
            const parsedAnswers = JSON.parse(q.answers);
            console.log("Parsed answers:", parsedAnswers);
            // تحويل array من strings إلى array من objects
            questionOptions = parsedAnswers.map((answerText, index) => ({
              text: answerText,
              isCorrect: false // سيتم تحديد الصحيح لاحقاً
            }));
          } catch (e) {
            console.warn("Failed to parse answers JSON:", q.answers);
            questionOptions = [];
          }
        } else if (Array.isArray(q.answers)) {
          questionOptions = q.answers.map(ans => ({
            text: ans.text || ans,
            isCorrect: ans.is_correct || ans.isCorrect || false
          }));
        }
      } else if (q.options) {
        // إذا كانت البيانات في حقل options
        questionOptions = Array.isArray(q.options) ? q.options.map(opt => ({
          text: opt.text || opt,
          isCorrect: opt.is_correct || opt.isCorrect || false
        })) : [];
      }
      
      // معالجة correct_answer
      let correctAnswerIndices = [];
      if (q.correct_answer) {
        console.log("Processing correct_answer:", q.correct_answer, "Type:", typeof q.correct_answer);
        
        if (typeof q.correct_answer === 'string') {
          try {
            const parsedCorrectAnswer = JSON.parse(q.correct_answer);
            console.log("Parsed correct_answer:", parsedCorrectAnswer);
            correctAnswerIndices = Array.isArray(parsedCorrectAnswer) ? parsedCorrectAnswer : [parsedCorrectAnswer];
          } catch (e) {
            console.warn("Failed to parse correct_answer JSON:", q.correct_answer, "Error:", e.message);
            // إذا فشل التحليل، جرب كرقم مباشر
            const numValue = parseInt(q.correct_answer);
            if (!isNaN(numValue)) {
              correctAnswerIndices = [numValue];
              console.log("Fallback: parsed as number:", numValue);
            } else {
              console.warn("Could not parse correct_answer as number either");
            }
          }
        } else if (Array.isArray(q.correct_answer)) {
          correctAnswerIndices = q.correct_answer;
          console.log("correct_answer is already an array:", correctAnswerIndices);
        } else if (typeof q.correct_answer === 'number') {
          correctAnswerIndices = [q.correct_answer];
          console.log("correct_answer is a number:", q.correct_answer);
        }
      } else {
        console.log("No correct_answer found for question");
      }
      
      console.log("Final correctAnswerIndices:", correctAnswerIndices);
      
      // تحديد الإجابات الصحيحة بناءً على المؤشرات
      correctAnswerIndices.forEach(index => {
        // التأكد من أن المؤشر صالح (ضمن النطاق المتاح)
        const validIndex = parseInt(index);
        if (!isNaN(validIndex) && validIndex >= 0 && validIndex < questionOptions.length && questionOptions[validIndex]) {
          questionOptions[validIndex].isCorrect = true;
          console.log(`Marked option ${validIndex} as correct:`, questionOptions[validIndex].text);
        } else {
          console.warn(`Invalid correct answer index ${index} (parsed as ${validIndex}) for question with ${questionOptions.length} options`);
        }
      });
      
      console.log("Final question options:", questionOptions);
      
      // التأكد من وجود 4 خيارات على الأقل
      while (questionOptions.length < 4) {
        questionOptions.push({ text: "", isCorrect: false });
      }
      
      return {
        id: q.id || null,
        title: q.title || q.question || "",
        options: questionOptions.slice(0, 4) // الحد الأقصى 4 خيارات
      };
    }) || [{ 
      title: "", 
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
      ]
    }],
  };
  
  console.log("AddNewExam - Initial form values:", initialValues);

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
      // Populate formData with title and questions (common for all scenarios)
      formData.append('title', values.title);
      values.questions.forEach((q, questionIndex) => {
        formData.append(`questions[${questionIndex}][title]`, q.title);
        formData.append(`questions[${questionIndex}][type]`, 'multiple_choice');
        formData.append(`questions[${questionIndex}][score]`, '1'); // درجة افتراضية
        
        const validOptions = q.options.filter(opt => opt.text && opt.text.trim() !== '');
        validOptions.forEach((opt, optionIndex) => {
          formData.append(`questions[${questionIndex}][options][${optionIndex}][text]`, opt.text.trim());
          formData.append(`questions[${questionIndex}][options][${optionIndex}][is_correct]`, opt.isCorrect ? '1' : '0');
        });
        
        const correctAnswerIndex = validOptions.findIndex(opt => opt.isCorrect);
        if (correctAnswerIndex !== -1) {
          formData.append(`questions[${questionIndex}][correct_answer]`, correctAnswerIndex.toString());
        }
      });

      if (exam && exam.id) { // exam here is the lesson object being edited
        console.log("AddNewExam - Attempting to update exam for lesson ID:", exam.id, "Lesson object:", exam);

        const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
        let updateUrl;

        // Try to find a specific exam_id from the first question's data.
        // This assumes that if an exam has a dedicated ID, it's available here.
        const specificExamIdFromQuestions = exam.exams && exam.exams.length > 0 ? exam.exams[0].exam_id : null;

        if (specificExamIdFromQuestions) {
          // We have a specific exam_id from the questions.
          // This means we're updating a specific exam entity that has its own ID.
          // API: PUT /lessons/{lesson_id}/exams/{exam_id}
          updateUrl = `${baseURL}/api/v1/academies/lessons/${exam.id}/exams/${specificExamIdFromQuestions}`;
          formData.append('_method', 'PUT'); // This route expects PUT, send via POST + _method
          console.log(`Updating specific exam entity ${specificExamIdFromQuestions} for lesson ${exam.id}. URL: ${updateUrl}. Method: POST with _method=PUT.`);
        } else {
          // No specific exam_id found in questions.
          // This implies we are updating the exam content directly associated with the lesson.
          // API: POST /lessons/{lesson_id}/exams
          updateUrl = `${baseURL}/api/v1/academies/lessons/${exam.id}/exams`;
          // Do NOT append _method=PUT. It's a direct POST as supported by the server for this route.
          console.log(`Updating exam content for lesson ${exam.id}. URL: ${updateUrl}. Method: POST.`);
        }
        
        console.log("AddNewExam - FormData entries (before sending):");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        
        const { data } = await axios.post( // Always use axios.post; _method in formData handles PUT if needed
          updateUrl,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user_token()}`,
            },
          }
        );
        
        console.log("AddNewExam - Update exam response:", data);
        if (data.status) {
          success("تم تعديل الاختبار بنجاح");
          dispatch(fetchCurrentCourseSummaryThunk(courseId));
          onClose && onClose();
        } else {
          throw new Error(data.message || "فشل في تعديل الاختبار");
        }
      } else {
        // إنشاء اختبار جديد
        console.log("AddNewExam - Creating new exam");
        const lessonFormData = new FormData(); // FormData for the lesson shell
        lessonFormData.append('type', 'exam');
        lessonFormData.append('title', values.title);
        
        const resLesson = await createLesson(
          {
            chapterId,
            courseId,
          },
          lessonFormData
        );
        console.log("AddNewExam - Create lesson response:", resLesson);

        if (resLesson.status && resLesson.data?.id) { // Lesson shell created successfully
          const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
          const examQuestionsUrl = `${baseURL}/api/v1/academies/lessons/${resLesson.data.id}/exams`;

          // Create a new FormData specifically for questions
          const questionsOnlyFormData = new FormData();
          values.questions.forEach((q, questionIndex) => {
            questionsOnlyFormData.append(`questions[${questionIndex}][title]`, q.title);
            questionsOnlyFormData.append(`questions[${questionIndex}][type]`, 'multiple_choice');
            questionsOnlyFormData.append(`questions[${questionIndex}][score]`, '1');
            
            const validOptions = q.options.filter(opt => opt.text && opt.text.trim() !== '');
            validOptions.forEach((opt, optionIndex) => {
              questionsOnlyFormData.append(`questions[${questionIndex}][options][${optionIndex}][text]`, opt.text.trim());
              questionsOnlyFormData.append(`questions[${questionIndex}][options][${optionIndex}][is_correct]`, opt.isCorrect ? '1' : '0');
            });
            const correctAnswerIndex = validOptions.findIndex(opt => opt.isCorrect);
            if (correctAnswerIndex !== -1) {
              questionsOnlyFormData.append(`questions[${questionIndex}][correct_answer]`, correctAnswerIndex.toString());
            }
          });

          console.log("AddNewExam - FormData for new exam questions (sending to questions endpoint):");
          for (let pair of questionsOnlyFormData.entries()) {
              console.log(pair[0] + ': ' + pair[1]);
          }

          const { data } = await axios.post(
            examQuestionsUrl,
            questionsOnlyFormData, // Use the new FormData containing only questions
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${user_token()}`,
              },
            }
          );
          
          console.log("AddNewExam - Create exam questions response:", data);
          if (data.status) {
            success("تمت إضافة الاختبار بنجاح");
            dispatch(fetchCurrentCourseSummaryThunk(courseId));
            onClose && onClose();
          } else {
            throw new Error(data.message || "فشل في إنشاء أسئلة الاختبار");
          }
        } else {
          throw new Error(resLesson.message || "فشل في إنشاء درس الاختبار");
        }
      }
    } catch (error) {
      console.error("AddNewExam - Error creating/updating exam:", error);
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
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                backgroundColor: option.isCorrect ? '#f0fdf4' : '#f8fafc',
                                border: `2px solid ${option.isCorrect ? '#bbf7d0' : '#e2e8f0'}`,
                                borderRadius: '12px',
                                transition: 'all 0.3s ease'
                              }}>
                                <div style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  backgroundColor: option.isCorrect ? '#10b981' : '#e2e8f0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                  color: option.isCorrect ? 'white' : '#64748b'
                                }}>
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                                <Field
                                  name={`questions[${index}].options[${optionIndex}].text`}
                                  type="text"
                                  placeholder={`خيار ${String.fromCharCode(65 + optionIndex)}`}
                                  style={{
                                    flex: 1,
                                    padding: '8px 12px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    outline: 'none'
                                  }}
                                />
                                <Field
                                  name={`questions[${index}].options[${optionIndex}].isCorrect`}
                                  type="checkbox"
                                  style={{
                                    width: '18px',
                                    height: '18px',
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
                    {exam ? "حفظ التعديلات" : "حفظ الاختبار"}
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

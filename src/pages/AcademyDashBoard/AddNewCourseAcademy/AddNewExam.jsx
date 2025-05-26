import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, 
  FiTrash2, 
  FiEdit3, 
  FiCheck, 
  FiX, 
  FiHelpCircle,
  FiList,
  FiType,
  FiTarget,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { useCreateExamMutation } from "../../../../services/mutation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import style from "./AddNewCourse.module.css";
import { ButtonSpinner } from "../../../component/UI/Buttons/ButtonSpinner";
import { useToast } from "../../../utils/hooks/useToast";
import { createExam, createLesson } from "../../../utils/apis/client/academy";

function AddNewExam({ CategoryID, courseId, chapterId }) {
  const mutation = useCreateExamMutation();
  const questionTypes = ["text", "choose", "boolean"];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success } = useToast();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const questionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const formik = useFormik({
    initialValues: {
      course_id: courseId,
      category_id: CategoryID,
      question_type: ["choose"],
      question: [""],
      answers: [["", "", "", ""]],
      correct_answer: [""],
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        const formData = new FormData();
        formData.append("course_id", values.course_id);
        formData.append("category_id", values.category_id);
        formData.append("type", "exam");

        values.question.forEach((q, idx) => {
          formData.append(`question[${idx}]`, q);
        });

        values.question_type.forEach((qt, idx) => {
          formData.append(`question_type[${idx}]`, qt);
        });

        values.answers.forEach((ans, idx) => {
          ans.forEach((answer, ansIdx) => {
            formData.append(`answers[${idx}][${ansIdx}]`, answer);
          });
        });

        values.correct_answer.forEach((correctAns, idx) => {
          formData.append(`correct_answer[${idx}]`, correctAns);
        });

        const result = await Swal.fire({
          title: "إضافة اختبار جديد",
          text: `هل تريد إضافة هذا الاختبار المكون من ${values.question.length} أسئلة؟`,
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#29e088",
          cancelButtonColor: "#ff4757",
          confirmButtonText: "إضافة",
          cancelButtonText: "إلغاء",
          customClass: {
            popup: 'rounded-lg',
            confirmButton: 'rounded-lg px-6 py-2',
            cancelButton: 'rounded-lg px-6 py-2'
          }
        });

        if (result.isConfirmed) {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));

          await Swal.fire({
            title: "تمت الإضافة بنجاح! 🎉",
            text: "تم إضافة الاختبار بنجاح",
            icon: "success",
            confirmButtonColor: "#29e088",
            confirmButtonText: "ممتاز",
            customClass: {
              popup: 'rounded-lg',
              confirmButton: 'rounded-lg px-6 py-2'
            }
          });

          success("تمت إضافة الاختبار بنجاح");
          
          // Reset form
          formik.resetForm();
          setCurrentQuestionIndex(0);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("حدث خطأ أثناء إضافة الاختبار");
        
        await Swal.fire({
          title: "حدث خطأ",
          text: "لم نتمكن من إضافة الاختبار. يرجى المحاولة مرة أخرى",
          icon: "error",
          confirmButtonColor: "#ff4757",
          confirmButtonText: "حسناً"
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const addQuestion = () => {
    const newQuestions = [...formik.values.question, ""];
    const newAnswers = [...formik.values.answers, ["", "", "", ""]];
    const newCorrectAnswers = [...formik.values.correct_answer, ""];
    const newQuestionTypes = [...formik.values.question_type, "choose"];

    formik.setFieldValue("question", newQuestions);
    formik.setFieldValue("answers", newAnswers);
    formik.setFieldValue("correct_answer", newCorrectAnswers);
    formik.setFieldValue("question_type", newQuestionTypes);
    
    setCurrentQuestionIndex(newQuestions.length - 1);
    toast.success("تم إضافة سؤال جديد");
  };

  const removeQuestion = (indexToRemove) => {
    if (formik.values.question.length <= 1) {
      toast.error("يجب أن يحتوي الاختبار على سؤال واحد على الأقل");
      return;
    }

    const newQuestions = formik.values.question.filter((_, idx) => idx !== indexToRemove);
    const newAnswers = formik.values.answers.filter((_, idx) => idx !== indexToRemove);
    const newCorrectAnswers = formik.values.correct_answer.filter((_, idx) => idx !== indexToRemove);
    const newQuestionTypes = formik.values.question_type.filter((_, idx) => idx !== indexToRemove);

    formik.setFieldValue("question", newQuestions);
    formik.setFieldValue("answers", newAnswers);
    formik.setFieldValue("correct_answer", newCorrectAnswers);
    formik.setFieldValue("question_type", newQuestionTypes);

    // Adjust current index if needed
    if (currentQuestionIndex >= newQuestions.length) {
      setCurrentQuestionIndex(Math.max(0, newQuestions.length - 1));
    } else if (currentQuestionIndex >= indexToRemove) {
      setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
    }

    toast.success("تم حذف السؤال");
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case "text": return "نصي";
      case "choose": return "اختيار من متعدد";
      case "boolean": return "صح أم خطأ";
      default: return "غير محدد";
    }
  };

  const isQuestionComplete = (index) => {
    const question = formik.values.question[index];
    const questionType = formik.values.question_type[index];
    const correctAnswer = formik.values.correct_answer[index];
    
    if (!question || !questionType || !correctAnswer) return false;
    
    if (questionType === "choose") {
      const answers = formik.values.answers[index];
      return answers && answers.every(answer => answer.trim() !== "");
    }
    
    return true;
  };

  const currentQuestion = formik.values.question[currentQuestionIndex] || "";
  const currentQuestionType = formik.values.question_type[currentQuestionIndex] || "choose";
  const currentAnswers = formik.values.answers[currentQuestionIndex] || ["", "", "", ""];
  const currentCorrectAnswer = formik.values.correct_answer[currentQuestionIndex] || "";

  return (
    <motion.div 
      className="d-flex w-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`${style.boardLap} w-100`}>
        <motion.h4 variants={itemVariants}>
          إضافة اختبار جديد
        </motion.h4>

        <form onSubmit={formik.handleSubmit} className="row m-auto h-100 justify-content-between">
          {/* Questions Navigation */}
          <motion.div variants={itemVariants} className="col-12 mb-4">
            <div className="d-flex justify-content-between align-items-center p-3 rounded-lg" 
                 style={{ backgroundColor: 'var(--bg-light)', border: '1px solid var(--border-color)' }}>
              
              <div className="d-flex align-items-center gap-2">
                <FiHelpCircle className="text-primary" size={20} />
                <span className="fw-bold text-primary">الأسئلة ({formik.values.question.length})</span>
              </div>

              <motion.button
                type="button"
                className="btn btn-success d-flex align-items-center gap-2"
                onClick={addQuestion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlus size={16} />
                إضافة سؤال
              </motion.button>
            </div>

            {/* Question Tabs */}
            <div className="d-flex gap-2 mt-3 flex-wrap">
              {formik.values.question.map((_, index) => (
                <motion.button
                  key={index}
                  type="button"
                  className={`btn ${currentQuestionIndex === index ? 'btn-primary' : 'btn-outline-primary'} position-relative`}
                  onClick={() => navigateToQuestion(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ minWidth: '60px' }}
                >
                  {index + 1}
                  {isQuestionComplete(index) && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                      <FiCheck size={10} />
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Current Question Form */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              variants={questionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="col-12"
            >
              <div className="border rounded-lg p-4" style={{ backgroundColor: 'var(--bg-white)' }}>
                {/* Question Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <FiEdit3 className="text-primary" />
                    السؤال {currentQuestionIndex + 1}
                  </h5>
                  
                  <div className="d-flex gap-2">
                    {/* Navigation Buttons */}
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => navigateToQuestion(Math.max(0, currentQuestionIndex - 1))}
                      disabled={currentQuestionIndex === 0}
                    >
                      <FiChevronRight />
                    </button>
                    
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => navigateToQuestion(Math.min(formik.values.question.length - 1, currentQuestionIndex + 1))}
                      disabled={currentQuestionIndex === formik.values.question.length - 1}
                    >
                      <FiChevronLeft />
                    </button>

                    {/* Delete Question Button */}
                    {formik.values.question.length > 1 && (
                      <motion.button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeQuestion(currentQuestionIndex)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiTrash2 size={14} />
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Question Input */}
                <div className="CustomFormControl mb-3">
                  <label className="d-flex align-items-center gap-2">
                    <FiType className="text-primary" />
                    نص السؤال
                  </label>
                  <input
                    type="text"
                    placeholder={`أدخل نص السؤال ${currentQuestionIndex + 1}...`}
                    value={currentQuestion}
                    onChange={(e) => {
                      const newQuestions = [...formik.values.question];
                      newQuestions[currentQuestionIndex] = e.target.value;
                      formik.setFieldValue("question", newQuestions);
                    }}
                    className={!currentQuestion.trim() ? "is-invalid" : ""}
                  />
                  {!currentQuestion.trim() && (
                    <div className="error-message">
                      <FiX className="me-1" />
                      نص السؤال مطلوب
                    </div>
                  )}
                </div>

                {/* Question Type Selection */}
                <div className="CustomFormControl mb-3">
                  <label className="d-flex align-items-center gap-2">
                    <FiList className="text-primary" />
                    نوع السؤال
                  </label>
                  <select
                    value={currentQuestionType}
                    onChange={(e) => {
                      const newQuestionTypes = [...formik.values.question_type];
                      newQuestionTypes[currentQuestionIndex] = e.target.value;
                      formik.setFieldValue("question_type", newQuestionTypes);
                      
                      // Reset answers when type changes
                      const newCorrectAnswers = [...formik.values.correct_answer];
                      newCorrectAnswers[currentQuestionIndex] = "";
                      formik.setFieldValue("correct_answer", newCorrectAnswers);
                    }}
                  >
                    <option value="">اختر نوع السؤال</option>
                    {questionTypes.map((type, i) => (
                      <option key={i} value={type}>
                        {getQuestionTypeLabel(type)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Answer Options */}
                {currentQuestionType === "choose" && (
                  <div className="mb-3">
                    <label className="d-flex align-items-center gap-2 mb-3">
                      <FiTarget className="text-primary" />
                      خيارات الإجابة
                    </label>
                    <div className="row g-2">
                      {currentAnswers.map((answer, ansIdx) => (
                        <div key={ansIdx} className="col-md-6">
                          <div className="CustomFormControl">
                            <input
                              type="text"
                              placeholder={`الخيار ${ansIdx + 1}`}
                              value={answer}
                              onChange={(e) => {
                                const newAnswers = [...formik.values.answers];
                                newAnswers[currentQuestionIndex][ansIdx] = e.target.value;
                                formik.setFieldValue("answers", newAnswers);
                              }}
                              className={!answer.trim() ? "is-invalid" : ""}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Text Answer Input */}
                {currentQuestionType === "text" && (
                  <div className="CustomFormControl mb-3">
                    <label className="d-flex align-items-center gap-2">
                      <FiCheck className="text-success" />
                      الإجابة الصحيحة
                    </label>
                    <input
                      type="text"
                      placeholder="أدخل الإجابة الصحيحة..."
                      value={currentCorrectAnswer}
                      onChange={(e) => {
                        const newCorrectAnswers = [...formik.values.correct_answer];
                        newCorrectAnswers[currentQuestionIndex] = e.target.value;
                        formik.setFieldValue("correct_answer", newCorrectAnswers);
                      }}
                      className={!currentCorrectAnswer.trim() ? "is-invalid" : ""}
                    />
                  </div>
                )}

                {/* Correct Answer Selection */}
                {currentQuestionType === "choose" && (
                  <div className="CustomFormControl mb-3">
                    <label className="d-flex align-items-center gap-2">
                      <FiCheck className="text-success" />
                      الإجابة الصحيحة
                    </label>
                    <select
                      value={currentCorrectAnswer}
                      onChange={(e) => {
                        const newCorrectAnswers = [...formik.values.correct_answer];
                        newCorrectAnswers[currentQuestionIndex] = e.target.value;
                        formik.setFieldValue("correct_answer", newCorrectAnswers);
                      }}
                      className={!currentCorrectAnswer ? "is-invalid" : ""}
                    >
                      <option value="">اختر الإجابة الصحيحة</option>
                      {currentAnswers.map((answer, ansIdx) => (
                        <option key={ansIdx} value={ansIdx} disabled={!answer.trim()}>
                          {answer.trim() || `الخيار ${ansIdx + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Boolean Answer Selection */}
                {currentQuestionType === "boolean" && (
                  <div className="CustomFormControl mb-3">
                    <label className="d-flex align-items-center gap-2">
                      <FiCheck className="text-success" />
                      الإجابة الصحيحة
                    </label>
                    <select
                      value={currentCorrectAnswer}
                      onChange={(e) => {
                        const newCorrectAnswers = [...formik.values.correct_answer];
                        newCorrectAnswers[currentQuestionIndex] = e.target.value;
                        formik.setFieldValue("correct_answer", newCorrectAnswers);
                      }}
                      className={!currentCorrectAnswer ? "is-invalid" : ""}
                    >
                      <option value="">اختر الإجابة الصحيحة</option>
                      <option value="1">صح</option>
                      <option value="0">خطأ</option>
                    </select>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="col-12 py-4 text-center">
            <motion.button
              type="submit"
              className={style.saveBtnTwo}
              disabled={isSubmitting || !formik.values.question.every((_, idx) => isQuestionComplete(idx))}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="d-flex align-items-center gap-2"
                  >
                    <Spinner animation="border" size="sm" />
                    جاري الحفظ...
                  </motion.div>
                ) : (
                  <motion.div
                    key="save"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="d-flex align-items-center gap-2"
                  >
                    <FiCheck />
                    حفظ الاختبار ({formik.values.question.length} أسئلة)
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {!formik.values.question.every((_, idx) => isQuestionComplete(idx)) && (
              <motion.p 
                className="text-warning mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                يرجى إكمال جميع الأسئلة لتفعيل زر الحفظ
              </motion.p>
            )}
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}

export default AddNewExam;

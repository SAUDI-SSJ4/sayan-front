import React, { useState } from 'react';
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import style from "./AddNewCourse.module.css";
// Validation Schema
const examInfoSchema = Yup.object().shape({
  title: Yup.string().required('عنوان الاختبار مطلوب'),
  chapter: Yup.string().required('الفصل مطلوب'),
  certificateId: Yup.string(),
  passingRatio: Yup.number()
    .min(1, 'نسبة النجاح يجب أن تكون بين 1 و 100')
    .max(100, 'نسبة النجاح يجب أن تكون بين 1 و 100')
    .required('نسبة النجاح مطلوبة'),
  totalQuestions: Yup.number()
    .min(1, 'عدد الأسئلة يجب أن يكون على الأقل 1')
    .required('عدد الأسئلة مطلوب')
});

const questionSchema = Yup.object().shape({
  question: Yup.string().required('نص السؤال مطلوب'),
  type: Yup.string().oneOf(['multi', 'single', 'boolean']).required('نوع السؤال مطلوب'),
  answers: Yup.array().of(
    Yup.object().shape({
      text: Yup.string().required('نص الإجابة مطلوب'),
      isCorrect: Yup.boolean()
    })
  ),
  correctAnswer: Yup.mixed().required('يجب تحديد الإجابة الصحيحة')
});

const MultiStepExamCreation = ({ExamData, setExamData}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [examLink, setExamLink] = useState('');
  const [questions, setQuestions] = useState([]);
  
  // Exam Info Form
  const examInfoFormik = useFormik({
    initialValues: {
      title: '',
      chapter: '',
      certificateId: '',
      passingRatio: 60,
      totalQuestions: 10,
      examDuration: 60, // Default 60 minutes
    },
    validationSchema: examInfoSchema,
    onSubmit: (values) => {
      // const generatedLink = `/exams/${uuidv4()}`;
      // setExamLink(generatedLink);
      setExamData({...values, questions: []})
      setCurrentStep(2);
    }
  });

  // Question Form
  const questionFormik = useFormik({
    initialValues: {
      question: '',
      type: 'single',
      answers: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ],
      correctAnswer: null
    },
    // validationSchema: questionSchema,
    onChange: (values) => {
      console.log(values);
      
    },
    onSubmit: (values) => {
      setQuestions([...questions, values]);
      setExamData({...ExamData, questions: questions})
      // Reset form for next question
      questionFormik.resetForm();
    }
  });

  const renderExamInfoStep = () => (
    <form>
      <div className="col-12">
        <div className="CustomFormControl col-12">
          <label>عنوان الاختبار</label>
          <input
            type="text"
            placeholder="أدخل عنوان الاختبار"
            name="title"
            value={examInfoFormik.values.title}
            onChange={examInfoFormik.handleChange}
            className="form-control"
            required
          />
          {examInfoFormik.touched.title && examInfoFormik.errors.title && (
            <div className="text-danger">{examInfoFormik.errors.title}</div>
          )}
        </div>

        <div className="CustomFormControl col-12">
          <label>الفصل</label>
          <input
            type="text"
            placeholder="أدخل اسم الفصل"
            name="chapter"
            value={examInfoFormik.values.chapter}
            onChange={examInfoFormik.handleChange}
            className="form-control"
            required
          />
          {examInfoFormik.touched.chapter && examInfoFormik.errors.chapter && (
            <div className="text-danger">{examInfoFormik.errors.chapter}</div>
          )}
        </div>

        <div className="CustomFormControl col-12">
          <label>رقم الشهادة (اختياري)</label>
          <input
            type="text"
            placeholder="أدخل رقم الشهادة"
            name="certificateId"
            value={examInfoFormik.values.certificateId}
            onChange={examInfoFormik.handleChange}
            className="form-control"
          />
        </div>

        <div className="CustomFormControl col-12">
          <label>نسبة النجاح (%)</label>
          <input
            type="number"
            placeholder="أدخل نسبة النجاح"
            name="passingRatio"
            value={examInfoFormik.values.passingRatio}
            onChange={examInfoFormik.handleChange}
            className="form-control"
            required
            min="1"
            max="100"
          />
          {examInfoFormik.touched.passingRatio && examInfoFormik.errors.passingRatio && (
            <div className="text-danger">{examInfoFormik.errors.passingRatio}</div>
          )}
        </div>

        <div className="CustomFormControl col-12">
          <label>عدد الأسئلة</label>
          <input
            type="number"
            placeholder="أدخل عدد الأسئلة"
            name="totalQuestions"
            value={examInfoFormik.values.totalQuestions}
            onChange={examInfoFormik.handleChange}
            className="form-control"
            required
            min="1"
          />
          {examInfoFormik.touched.totalQuestions && examInfoFormik.errors.totalQuestions && (
            <div className="text-danger">{examInfoFormik.errors.totalQuestions}</div>
          )}
        </div>

        <div className="CustomFormControl col-12">
          <label>مدة الاختبار (بالدقائق)</label>
          <input
            type="number"
            placeholder="أدخل مدة الاختبار بالدقائق"
            name="examDuration"
            value={examInfoFormik.values.examDuration}
            onChange={examInfoFormik.handleChange}
            className="form-control"
            required
            min="10"
          />
          {examInfoFormik.touched.examDuration && examInfoFormik.errors.examDuration && (
            <div className="text-danger">{examInfoFormik.errors.examDuration}</div>
          )}
        </div>

        <div className="CustomFormControl col-12 text-center">
          <button 
            type="button" 
            onClick={examInfoFormik.handleSubmit}
            className="btn btn-primary"
          >
            التالي
          </button>
        </div>
      </div>
    </form>
  );

  const renderQuestionsStep = () => {
    const handleAnswerChange = (index, field, value) => {
      const updatedAnswers = [...questionFormik.values.answers];
      updatedAnswers[index][field] = value;
      questionFormik.setFieldValue('answers', updatedAnswers);
    };
  
    const handleSubmitQuestion = (e) => {
      e.preventDefault();
      questionFormik.handleSubmit();
    };
  
    return (
      <div className="container mt-4">
        <h4>إضافة الأسئلة</h4>
        <form onSubmit={handleSubmitQuestion}>
          <div className="mb-3">
            <label>نص السؤال</label>
            <input
              type="text"
              placeholder="أدخل نص السؤال"
              name="question"
              value={questionFormik.values.question}
              onChange={questionFormik.handleChange}
              className="form-control"
              required
            />
            {questionFormik.touched.question && questionFormik.errors.question && (
              <div className="text-danger">{questionFormik.errors.question}</div>
            )}
          </div>
  
          <div className="mb-3">
            <label>نوع السؤال</label>
            <select
              name="type"
              value={questionFormik.values.type}
              onChange={questionFormik.handleChange}
              className="form-select"
            >
              <option value="single">اختيار واحد</option>
              <option value="multi">اختيارات متعددة</option>
              <option value="boolean">صواب أو خطأ</option>
            </select>
            {questionFormik.touched.type && questionFormik.errors.type && (
              <div className="text-danger">{questionFormik.errors.type}</div>
            )}
          </div>
  
          <div className="mb-3">
            <label>الإجابات</label>
            {questionFormik.values.answers.map((answer, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  placeholder={`إجابة ${index + 1}`}
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
                  className="form-control"
                />
                <div className="input-group-text">
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={index}
                    onChange={() => questionFormik.setFieldValue('correctAnswer', index)}
                    checked={questionFormik.values.correctAnswer === index}
                  />
                </div>
              </div>
            ))}
          </div>
  
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              إضافة السؤال
            </button>
          </div>
        </form>
  
        
      </div>
    );
  };
  


  // Keep the rest of the component implementation from the previous artifact
  // (Question creation step, sidebar, etc.)

  return (
    <div className="container">
      <div className="row">
      <div className="d-flex w-100">
      <div className={`${style.boardLap} w-100 bg-body  rounded`}>
          {currentStep === 1 && renderExamInfoStep()}

          {currentStep === 2 && renderQuestionsStep()}
          
          {/* Add question creation step here */}
        </div>
        </div>
      </div>
    </div>
  );
};




export default MultiStepExamCreation;
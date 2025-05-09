import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../../../AddNewCourse.module.css";
import { Panel, Button } from "rsuite";
import { useSelector } from "react-redux";
import { latestLesson } from "../../../../../../../redux/courses/CourseSlice";
import { storage } from "../../../../../../utils/storage";
import { useExamMutation } from "../../../../../../services/mutation";
import { useToast } from "../../../../../../utils/hooks/useToast";
import { formatLongText, hasLessonContent } from "../../../../../../utils/helpers";
import { Text } from "../../../../../../utils/styles";

const examInfoSchema = Yup.object().shape({
  title: Yup.string().required("عنوان الاختبار مطلوب"),
});

const questionSchema = Yup.object().shape({
  question: Yup.string().required("نص السؤال مطلوب"),
  question_type: Yup.string()
    .oneOf(["choose", "single", "boolean"])
    .required("نوع السؤال مطلوب"),
  answers: Yup.array().of(
    Yup.object().shape({
      text: Yup.string().required("نص الإجابة مطلوب"),
      isCorrect: Yup.boolean(),
    })
  )
});

export const AddNewExam = () => {
  const [examData, setExamData] = useState({ title: "", questions: [] });
  const [currentStep, setCurrentStep] = useState(1);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(-1);

  const { error } = useToast();

  const chapterId = storage.get('chapky89wsgnae')
  const lessonId = storage.get('leuhqzrsyh5e')
  const currentCourseId = storage.get("cousjvqpkbr3m")
  const getlatestLesson = useSelector((state) => latestLesson(state, chapterId, lessonId));

  const mutation = useExamMutation(currentCourseId, lessonId)

  const examInfoFormik = useFormik({
    initialValues: { title: "" },
    validationSchema: examInfoSchema,
    onSubmit: (values) => {
      setExamData({ ...examData, title: values.title });
      setCurrentStep(2);
    },
  });

  const questionFormik = useFormik({
    initialValues: {
      question: "",
      question_type: "",
      correct_answer: null,
      answers: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
      ],
    },
    validationSchema: questionSchema,
    onSubmit: async (values) => {
      const finalValues = { ...values };


      console.log(finalValues)

      if (values.question_type === 'boolean') {
        finalValues.answers = [
          { text: "صح", isCorrect: false },
          { text: "خطأ", isCorrect: false }
        ];

        finalValues.answers[values.correct_answer].isCorrect = true;

      } else if (values.question_type === 'single') {
        finalValues.answers = finalValues.answers.map((answer, index) => ({
          ...answer,
          isCorrect: index === values.correct_answer
        }));
      } else if (values.question_type === 'choose') {
        if (Array.isArray(values.answers) && Array.isArray(finalValues.answers)) {
          finalValues.answers = finalValues.answers.map((answer, index) => ({
            ...answer,
            isCorrect: values.answers[index]?.isCorrect ?? false,
          }));

          values.correct_answer = finalValues.answers
            .reduce((correctIndices, answer, index) => {
              if (answer.isCorrect) correctIndices.push(index);
              return correctIndices;
            }, []);
        }
      }

      if (editingQuestionIndex !== -1) {
        const updatedQuestions = [...examData.questions];
        updatedQuestions[editingQuestionIndex] = finalValues;
        setExamData({
          ...examData,
          questions: updatedQuestions,
        });
        setEditingQuestionIndex(-1);
      } else {
        setExamData({
          ...examData,
          questions: [...examData.questions, finalValues],
        });
      }

      values.title = examData.title;
      values.type = "exam";


      if (!chapterId || !lessonId) {
        error("يرجى تحديد الدرس والفصل");
        return;
      }

      if (hasLessonContent(getlatestLesson, ['exam'])) {
        await mutation.mutateAsync(values);
      } else {
        error("قم بأنشاء درس جديد")
      }



      questionFormik.resetForm();
    },
  });


  const handleEditQuestion = (questionIndex) => {
    setEditingQuestionIndex(questionIndex);
    questionFormik.setValues(examData.questions[questionIndex]);
  };

  const handleDeleteQuestion = (questionIndex) => {
    const updatedQuestions = examData.questions.filter((_, index) => index !== questionIndex);
    setExamData({
      ...examData,
      questions: updatedQuestions,
    });
  };

  const handleTypeChange = (e) => {
    const questionType = e.target.value;
    questionFormik.setFieldValue('question_type', questionType);

    let initialAnswers;
    if (questionType === 'boolean') {
      initialAnswers = [
        { text: "صح", isCorrect: false },
        { text: "خطأ", isCorrect: false }
      ];
    } else {
      initialAnswers = [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
      ];
    }

    questionFormik.setValues({
      ...questionFormik.values,
      question_type: questionType,
      answers: initialAnswers,
      correct_answer: null
    });
  };



  const renderExamInfoStep = () => (
    <div className={style.boardLap}>
      <Text size="20px" color="#575757" weight="600">
        <storage>Lesson : </storage>{getlatestLesson && formatLongText(getlatestLesson.title, 15)}</Text>
      <h5 style={{ color: "#2B3674", fontWeight: "600" }}>اضافة اختبار جديد</h5>

      <form onSubmit={examInfoFormik.handleSubmit} className="row g-3 w-80 justify-content-center m-auto">
        <div className="justify-content-center">
          <div className="col-lg-11 col-md-12">
            <div className={style.formControl}>
              <label
                htmlFor="title"
                className={style.label}
              >
                عنوان الاختبار
              </label>
              <input
                type="text"
                placeholder="ادخل عنوان الاختبار هنا"
                id="title"
                name="title"
                value={examInfoFormik.values.title}
                onChange={examInfoFormik.handleChange}
                onBlur={examInfoFormik.handleBlur}
                className={style.input}
              />
              {examInfoFormik.touched.title && examInfoFormik.errors.title && (
                <div className={style.error}>{examInfoFormik.errors.title}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <Button type="submit" style={{
            padding: '15px 30px',
            fontSize: '18px',
            width: '100%'
          }} appearance="primary">التالي</Button>
        </div>

      </form>
    </div>
  );

  const renderExamPreview = () => (
    <div className="container  mt-4">
      <div className="d-flex flex-column gap-4">
        <div className="text-end">
          <h4 style={{ color: "#2B3674", fontWeight: "600", marginBottom: "2rem" }}>معاينة الاختبار</h4>
          <h5 style={{ color: '#2b3674' }}>{examData.title}</h5>

        </div>

        {examData.questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="p-4 mb-3 border rounded-lg"
            style={{
              backgroundColor: questionIndex === editingQuestionIndex ? '#fcfcfe' : '#fff',
              borderColor: '#e9ecef',
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p style={{ color: '#2b3674', fontSize: '16px', fontWeight: '600', margin: 0 }}>السؤال {questionIndex + 1} :</p>
              <div className="d-flex gap-2">
                <Button
                  appearance="ghost"
                  color="blue"
                  size="sm"
                  onClick={() => handleEditQuestion(questionIndex)}
                >
                  تعديل
                </Button>
                <Button
                  appearance="ghost"
                  color="red"
                  size="sm"
                  onClick={() => handleDeleteQuestion(questionIndex)}
                >
                  حذف
                </Button>
              </div>
            </div>

            <div className="mb-3">
              <p style={{
                fontSize: '16px',
                fontWeight: '400',
                textAlign: 'right'
              }}>
                {question.question}
              </p>
            </div>

            <div className="mb-3 d-flex align-items-center justify-content-start gap-2">
              <p style={{ color: '#2b3674', margin: '0' }}>نوع السؤال</p>
              <span style={{
                padding: '6px 12px',
                borderRadius: '15px',
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                {question.question_type === 'single' ? 'اختيار واحد' :
                  question.question_type === "choose" ? 'اختيارات متعددة' : 'صواب أو خطأ'}
              </span>
            </div>

            <div>
              <h5 style={{ color: '#2b3674', marginBottom: '1rem' }}>الإجابات</h5>
              <div className="d-flex flex-column gap-2">
                {question.answers.map((answer, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '12px 20px',
                      borderRadius: '8px',
                      backgroundColor: answer.isCorrect ? '#e8f5e9' : '#f8f9fa',
                      border: `1px solid ${answer.isCorrect ? '#4caf50' : '#e9ecef'}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: answer.isCorrect ? '#4caf50' : '#e0e0e0',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px'
                    }}>
                      {index + 1}
                    </div>
                    <span style={{
                      color: answer.isCorrect ? '#2e7d32' : '#2b3674',
                      flex: 1
                    }}>
                      {answer.text}
                    </span>
                    {answer.isCorrect && (
                      <span style={{
                        fontSize: '12px',
                        color: '#4caf50',
                        backgroundColor: '#e8f5e9',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        border: '1px solid #4caf50'
                      }}>
                        إجابة صحيحة
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuestionForm = () => {
    const isValid = () => {
      const { question, answers, question_type } = questionFormik.values;
      if (!question) return false;

      if (question_type === 'choose') {
        const hasSelectedAnswer = answers.some(answer => answer.isCorrect);
        const allAnswersHaveText = answers.every(answer => answer.text.trim());
        return hasSelectedAnswer && allAnswersHaveText;
      } else {
        const hasCorrectAnswer = questionFormik.values.correct_answer !== null;
        const allAnswersHaveText = question_type === 'boolean' ? true : answers.every(answer => answer.text.trim());
        return hasCorrectAnswer && allAnswersHaveText;
      }
    };

    return (
      <form className="w-100 " onSubmit={questionFormik.handleSubmit} style={{ margin: '0 10px' }}>
        <div className="mb-3">
          <label>نص السؤال</label>
          <input
            type="text"
            name="question"
            value={questionFormik.values.question}
            onChange={questionFormik.handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>نوع السؤال</label>
          <select
            name="question_type"
            value={questionFormik.values.question_type}
            onChange={handleTypeChange}
            className="form-select"
          >
            <option value="single">اختيار واحد</option>
            <option value="choose">اختيارات متعددة</option>
            <option value="boolean">صواب أو خطأ</option>
          </select>
        </div>
        <div className="mb-3">
          <label>الإجابات</label>
          {questionFormik.values.answers.map((answer, index) => (
            <div key={index} className="input-group mb-2"  >
              {questionFormik.values.question_type !== 'boolean' && (
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => {
                    const newAnswers = [...questionFormik.values.answers];
                    newAnswers[index].text = e.target.value;
                    questionFormik.setFieldValue("answers", newAnswers);
                  }}
                  className="form-control"
                  placeholder={`إجابة ${index + 1}`}
                  required
                />
              )}
              <div className="input-group-text">
                {questionFormik.values.question_type === "choose" ? (
                  <input
                    type="checkbox"
                    name={`answer-${index}`}
                    checked={answer.isCorrect}
                    onChange={(e) => {
                      const newAnswers = [...questionFormik.values.answers];
                      newAnswers[index].isCorrect = e.target.checked;
                      questionFormik.setFieldValue("answers", newAnswers);
                    }}
                  />
                ) : (
                  <input
                    type="radio"
                    name="correct_answer"
                    value={index}
                    onChange={() => {
                      questionFormik.setFieldValue("correct_answer", index);
                      const newAnswers = questionFormik.values.answers.map((ans, idx) => ({
                        ...ans,
                        isCorrect: idx === index
                      }));
                      questionFormik.setFieldValue("answers", newAnswers);
                    }}
                    checked={questionFormik.values.correct_answer === index}
                  />
                )}
                {questionFormik.values.question_type === 'boolean' && (
                  <span style={{ marginLeft: '8px' }}>{answer.text}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button
          type="submit"
          appearance="primary"
          block
          disabled={!isValid()}
        >
          {editingQuestionIndex !== -1 ? 'تعديل السؤال' : 'إضافة السؤال'}
        </Button>
        {editingQuestionIndex !== -1 && (
          <Button
            appearance="subtle"
            block
            onClick={() => {
              setEditingQuestionIndex(-1);
              questionFormik.resetForm();
            }}
            style={{ marginTop: '10px' }}
          >
            إلغاء التعديل
          </Button>
        )}
      </form>
    );
  };

  return (
    <div className="flex">
      <div className={`${style.content}`}>
        {currentStep === 1 && renderExamInfoStep()}
        {currentStep === 2 && renderExamPreview()}
      </div>
      <div className={`${style.sidebar} ${style.right}`}>
        {currentStep === 2 && (
          <div className="col-12 m-auto p-4">
            <div className="CustomFormControl col-12">
              <label className="h5">
                {editingQuestionIndex !== -1 ? 'تعديل السؤال' : 'إضافة سؤال جديد'}
              </label>
              {renderQuestionForm()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



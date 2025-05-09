import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useCreateExamMutation } from "../../../../services/mutation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import style from "./AddNewCourse.module.css";
import { ButtonSpinner } from "../../../component/UI/Buttons/ButtonSpinner";

const validationSchema = Yup.object().shape({
  // Add validation if needed
});

function AddNewExam({ CategoryID, CourseID }) {
  const mutation = useCreateExamMutation();
  const questionTypes = ["text", "choose", "boolean"];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const formik = useFormik({
    initialValues: {
      course_id: CourseID,
      category_id: CategoryID,
      question_type: ["choose"],
      question: [""],
      answers: [["", "", "", ""]],
      correct_answer: [""],
    },
    validationSchema,
    onSubmit: (values) => {
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

      Swal.fire({
        title: "اضافة الاختبار الي الدورة",
        text: "هل تريد اضافة هذا الاختبار الي هذا الدرس في هذة الدورة",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "اضافة",
        cancelButtonText: "لا",
      }).then((result) => {
        console.log(values.question.length <= 0)
        if(values.question.length === 0 || values.question.some((q) => q.trim() === "") ||!values.course_id || !values.category_id){ 
          Swal.fire({
            title: "فشل",
            text: "يجب عليك تعبئة جميع الحقول",
            icon: "error",
            confirmButtonText: "موافق",
          })
          return ;
        }
        if (result.isConfirmed) {
          mutation
            .mutateAsync(formData)
            .then(() => {
              Swal.fire({
                title: "نجاح!",
                text: "تمت إضافة الاختبار بنجاح",
                icon: "success",
                confirmButtonText: "موافق",
              });
            })
            .catch(() => {
              Swal.fire({
                title: "فشل",
                text: "حدث خطأ أثناء محاولة إضافة الاختبار. يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "موافق",
              });
            });
        }
      });
    },
  });

  const addQuestion = () => {
    formik.setFieldValue("question", [...formik.values.question, ""]);
    formik.setFieldValue("answers", [
      ...formik.values.answers,
      ["", "", "", ""],
    ]);
    formik.setFieldValue("correct_answer", [
      ...formik.values.correct_answer,
      "",
    ]);
    formik.setFieldValue("question_type", [
      ...formik.values.question_type,
      "choose",
    ]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const removeQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="d-flex w-100">
      <div className={`${style.boardLap} w-100 bg-body  rounded`}>
        <h4>إضافة إختبار </h4>
        <form
          onSubmit={formik.handleSubmit}
          className="row m-auto h-100 justify-content-between"
        >
          <div className="d-flex justify-content-between align-items-center border-bottom ">
            <div className="fw-bold">السؤال {currentQuestionIndex + 1}</div>
            <div className="w-25 addBtn text-nowrap" onClick={addQuestion}>
              <AddCircleIcon /> إضافة سؤال
            </div>
          </div>

          {/* Render only the current question */}
          <div key={currentQuestionIndex}>
            <div className="CustomFormControl col-12">
              <input
                type="text"
                placeholder={`السؤال ${currentQuestionIndex + 1}`}
                id={`question_${currentQuestionIndex}`}
                name={`question[${currentQuestionIndex}]`}
                value={formik.values.question[currentQuestionIndex]}
                onChange={formik.handleChange}
              />
            </div>

            <div className="CustomFormControl col-12">
              <select
                id={`question_type_${currentQuestionIndex}`}
                name={`question_type[${currentQuestionIndex}]`}
                value={formik.values.question_type[currentQuestionIndex]}
                onChange={formik.handleChange}
              >
                <option value="">اختر نوع السؤال</option>
                {questionTypes.map((type, i) => (
                  <option key={i} value={type}>
                    {type === "text"
                      ? "نصي"
                      : type === "choose"
                      ? "اختيار من متعدد"
                      : type === "boolean"
                      ? "صح ام خطأ"
                      : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Render answer inputs based on question type */}
            {formik.values.question_type[currentQuestionIndex] === "choose" ? (
              <>
                {formik.values.answers[currentQuestionIndex].map(
                  (answer, ansIdx) => (
                    <div key={ansIdx} className="CustomFormControl col-12">
                      <input
                        type="text"
                        placeholder={`الاجابة رقم ${ansIdx + 1}`}
                        value={
                          formik.values.answers[currentQuestionIndex][ansIdx]
                        }
                        onChange={(e) => {
                          const newAnswers = [...formik.values.answers];
                          newAnswers[currentQuestionIndex][ansIdx] =
                            e.target.value;
                          formik.setFieldValue("answers", newAnswers);
                        }}
                      />
                    </div>
                  )
                )}
              </>
            ) : formik.values.question_type[currentQuestionIndex] === "text" ? (
              <div className="CustomFormControl col-12">
                <input
                  type="text"
                  placeholder="الإجابة الصحيحة"
                  id={`correct_answer_${currentQuestionIndex}`}
                  name={`correct_answer[${currentQuestionIndex}]`}
                  value={formik.values.correct_answer[currentQuestionIndex]}
                  onChange={formik.handleChange}
                />
              </div>
            ) : null}

            {/* Correct answer input for multiple choice */}
            {formik.values.question_type[currentQuestionIndex] === "choose" && (
              <div className="CustomFormControl col-12">
                <select
                  id={`correct_answer_${currentQuestionIndex}`}
                  name={`correct_answer[${currentQuestionIndex}]`}
                  value={formik.values.correct_answer[currentQuestionIndex]}
                  onChange={formik.handleChange}
                >
                  <option value="">اختر الإجابة الصحيحة</option>
                  {formik.values.answers[currentQuestionIndex].map(
                    (answer, ansIdx) => (
                      <option key={ansIdx} value={ansIdx}>
                        الإجابة رقم {ansIdx + 1}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
            {formik.values.question_type[currentQuestionIndex] ===
              "boolean" && (
              <div className="CustomFormControl col-12">
                <select
                  id={`correct_answer_${currentQuestionIndex}`}
                  name={`correct_answer[${currentQuestionIndex}]`}
                  value={formik.values.correct_answer[currentQuestionIndex]}
                  onChange={formik.handleChange}
                >
                  <option value="">اختر الإجابة الصحيحة</option>
                  <option value="1">صح</option>
                  <option value="0">خطأ</option>
                </select>
              </div>
            )}

            {/* Button to remove current question and go back to previous */}
            {currentQuestionIndex > 0 && (
              <button
                type="button"
                onClick={removeQuestion}
                className={style.deletebtn}
              >
                حذف السؤال
              </button>
            )}
            <div className="col-12 py-4 text-center align-content-end">
            <ButtonSpinner bgColor="#6ada31" isPending={mutation.isPending} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewExam;

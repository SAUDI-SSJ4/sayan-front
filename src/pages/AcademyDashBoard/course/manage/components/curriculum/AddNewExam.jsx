import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
  createExam,
  createLesson,
} from "../../../../../../utils/apis/client/academy";
import { useToast } from "../../../../../../utils/hooks/useToast";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk";
import { useDispatch } from "react-redux";

const AddNewExam = ({ courseId, chapterId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    title: "",
    description: "",
    duration: "",
    questions: [{ title: "", description: "", score: "", correctAnswer: "" }],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("العنوان مطلوب"),
    description: Yup.string().required("الوصف مطلوب"),
    duration: Yup.number()
      .required("المدة مطلوبة")
      .positive("يجب أن تكون المدة رقمًا موجبًا"),
    questions: Yup.array().of(
      Yup.object({
        title: Yup.string().required("عنوان السؤال مطلوب"),
        description: Yup.string().required("وصف السؤال مطلوب"),
        score: Yup.number()
          .required("الدرجة مطلوبة")
          .positive("يجب أن تكون الدرجة رقمًا موجبًا"),
        correctAnswer: Yup.string().required("الإجابة الصحيحة مطلوبة"),
      })
    ),
  });
  const { success } = useToast();
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const resLesson = await createLesson(
        {
          chapterId,
          courseId,
        },
        {
          type: "exam",
          title: "اختبار",
        }
      );
      if (resLesson.status) {
        const formattedQuestions = values.questions.map((question, index) => ({
          [`questions[${index}][title]`]: question.title,
          [`questions[${index}][description]`]: question.description,
          [`questions[${index}][type]`]: "text",
          [`questions[${index}][score]`]: question.score,
          [`questions[${index}][correct_answer]`]: question.correctAnswer,
        }));
        const resExam = await createExam(resLesson.data.id, {
          title: values.title,
          description: values.description,
          duration: values.duration,
          ...Object.assign({}, ...formattedQuestions),
        });
        if (resExam.status) {
          success("تمت إضافة الاختبار بنجاح");
          dispatch(fetchCurrentCourseSummaryThunk(courseId));
        }
      }
    } catch (error) {
      console.error("Error creating exam:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form className="space-y-6 p-6 bg-white rounded-lg shadow-md">
          <h4 className="text-xl font-semibold">اضافة اختبار جديد</h4>

          {isLoading && <p className="text-blue-500">جاري التحميل...</p>}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                العنوان
              </label>
              <Field
                name="title"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="أدخل العنوان"
              />
              {touched.title && errors.title && (
                <div className="text-red-500 text-sm">{errors.title}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                الوصف
              </label>
              <Field
                name="description"
                as="textarea"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="أدخل الوصف"
              />
              {touched.description && errors.description && (
                <div className="text-red-500 text-sm">{errors.description}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                المدة (بالدقائق)
              </label>
              <Field
                name="duration"
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="أدخل المدة"
              />
              {touched.duration && errors.duration && (
                <div className="text-red-500 text-sm">{errors.duration}</div>
              )}
            </div>
          </div>

          <FieldArray name="questions">
            {({ push, remove }) => (
              <div className="space-y-4">
                <h5 className="text-lg font-medium">الأسئلة</h5>
                {values.questions.map((question, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-300 rounded-md space-y-2"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        عنوان السؤال
                      </label>
                      <Field
                        name={`questions[${index}].title`}
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="أدخل عنوان السؤال"
                      />
                      {touched.questions?.[index]?.title &&
                        errors.questions?.[index]?.title && (
                          <div className="text-red-500 text-sm">
                            {errors.questions[index].title}
                          </div>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        الوصف
                      </label>
                      <Field
                        name={`questions[${index}].description`}
                        as="textarea"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="أدخل وصف السؤال"
                      />
                      {touched.questions?.[index]?.description &&
                        errors.questions?.[index]?.description && (
                          <div className="text-red-500 text-sm">
                            {errors.questions[index].description}
                          </div>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        الدرجة
                      </label>
                      <Field
                        name={`questions[${index}].score`}
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="أدخل الدرجة"
                      />
                      {touched.questions?.[index]?.score &&
                        errors.questions?.[index]?.score && (
                          <div className="text-red-500 text-sm">
                            {errors.questions[index].score}
                          </div>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        الإجابة الصحيحة
                      </label>
                      <Field
                        name={`questions[${index}].correctAnswer`}
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="أدخل الإجابة الصحيحة"
                      />
                      {touched.questions?.[index]?.correctAnswer &&
                        errors.questions?.[index]?.correctAnswer && (
                          <div className="text-red-500 text-sm">
                            {errors.questions[index].correctAnswer}
                          </div>
                        )}
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600"
                    >
                      حذف السؤال
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    push({
                      title: "",
                      description: "",
                      score: "",
                      correctAnswer: "",
                    })
                  }
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
                >
                  إضافة سؤال جديد
                </button>
              </div>
            )}
          </FieldArray>

          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-md shadow-sm ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white`}
            disabled={isLoading}
          >
            {isLoading ? "جاري الحفظ..." : "حفظ الاختبار"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddNewExam;

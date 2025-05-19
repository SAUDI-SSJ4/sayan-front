import React from "react";
import { Button } from "react-bootstrap";
import {
  editChapter,
  postChapter,
} from "../../../../../../utils/apis/client/academy";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useToast } from "../../../../../../utils/hooks/useToast";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
});

function ChapterForm({ chapter, courseId }) {
  const dispatch = useDispatch();
  const { success } = useToast();

  const formik = useFormik({
    initialValues: {
      title: chapter?.title || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (chapter) {
        const res = await editChapter(
          { courseId, chapterId: chapter.id },
          {
            title: values.title,
            _method: "PUT",
          }
        );
        if (res.status) {
          success("تم تعديل الفصل بنجاح");
          dispatch(fetchCurrentCourseSummaryThunk(courseId));
        }
      } else {
        const res = await postChapter(courseId, {
          title: values.title,
          is_published: 1,
        });
        if (res.status) {
          success("تم اضافة فصل جديد بنجاح");
          dispatch(fetchCurrentCourseSummaryThunk(courseId));
        }
      }
    },
  });

  return (
    <>
      <h4 className="text-2xl font-semibold text-gray-800 mb-4">
        {chapter ? "تعديل الفصل" : "اضافة فصل جديد"}
      </h4>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <label htmlFor="title" className="block font-semibold text-gray-700">
            العنوان
          </label>
          <input
            type="text"
            placeholder="ادخل عنوان الفصل هنا"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {formik.touched.title && formik.errors.title && (
          <div className="mt-2 text-sm text-red-500">{formik.errors.title}</div>
        )}
        <Button type="submit" className="h-10" disabled={formik.isSubmitting}>
          {chapter ? "تعديل" : "اضف"}
        </Button>
      </form>
    </>
  );
}

export default ChapterForm;

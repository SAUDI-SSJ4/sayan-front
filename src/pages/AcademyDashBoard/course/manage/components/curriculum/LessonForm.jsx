import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import VideoUploader from "../../../../../../component/UI/VideoUploader";
import { useDispatch } from "react-redux";
import { useToast } from "../../../../../../utils/hooks/useToast";
import {
  createLesson,
  editLesson,
} from "../../../../../../utils/apis/client/academy";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk";
import { Button } from "react-bootstrap";
import { getCourseLessonSchema } from "../../../../../../validations/academy/course";

const LessonForm = ({ lesson, courseId, chapterId }) => {
  const dispatch = useDispatch();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [videoDuration, setVideoDuration] = useState(null);

  const { success } = useToast();
  const videoFormik = useFormik({
    initialValues: {
      title: lesson?.title || "",
      video: null,
      video_title: "",
      description: "",
    },
    validationSchema: getCourseLessonSchema(lesson),
    onSubmit: async (values) => {
      const uploadVideo = videoDuration
        ? {
            video: values.video,
            duration: Math.round(videoDuration),
          }
        : {};
      const PUT_REQUEST = lesson ? { _method: "PUT" } : {};

      const data = {
        ...values,
        type: "video",
        ...uploadVideo,
        ...PUT_REQUEST,
      };
      try {
        if (lesson) {
          const res = await editLesson(
            {
              courseId,
              chapterId,
              lessonId: lesson.id,
            },
            data
          );
          if (res.status) {
            uploadVideo && setUploadSuccess(true);
            success("تم تعديل الدرس بنجاح");
            dispatch(fetchCurrentCourseSummaryThunk(courseId));
          }
        } else {
          const res = await createLesson(
            {
              courseId,
              chapterId,
            },
            data
          );
          if (res.status) {
            setUploadSuccess(true);
            success("تم اضافة الدرس بنجاح");
            videoFormik.resetForm();
            dispatch(fetchCurrentCourseSummaryThunk(courseId));
          }
        }
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    },
  });

  return (
    <div className="space-y-6">
      <h4 className="text-2xl font-semibold text-gray-800">
        {lesson ? "تعديل الدرس" : "اضافة درس جديد"}
      </h4>

      {uploadSuccess && (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
          تم رفع الفيديو بنجاح!
        </div>
      )}

      <form onSubmit={videoFormik.handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="font-medium text-gray-700">
            عنوان الدرس
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="ادخل عنوان الدرس هنا"
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={videoFormik.values.title}
            onChange={videoFormik.handleChange}
          />
          {videoFormik.touched.title && videoFormik.errors.title && (
            <div className="text-sm text-red-500">
              {videoFormik.errors.title}
            </div>
          )}
        </div>

        <div>
          <VideoUploader
            setFieldValue={videoFormik.setFieldValue}
            getVideoDuration={(duration) => setVideoDuration(duration)}
          />
          {videoFormik.touched.video && videoFormik.errors.video && (
            <div className="text-sm text-red-500">
              {videoFormik.errors.video}
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="video_title" className="font-medium text-gray-700">
            عنوان الفيديو
          </label>
          <input
            type="text"
            id="video_title"
            name="video_title"
            placeholder="أدخل عنوان الفيديو"
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={videoFormik.values.video_title}
            onChange={videoFormik.handleChange}
          />
          {videoFormik.touched.video_title &&
            videoFormik.errors.video_title && (
              <div className="text-sm text-red-500">
                {videoFormik.errors.video_title}
              </div>
            )}
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="font-medium text-gray-700">
            وصف الفيديو
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="أدخل وصف الفيديو"
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={videoFormik.values.description}
            onChange={videoFormik.handleChange}
          />
          {videoFormik.touched.description &&
            videoFormik.errors.description && (
              <div className="text-sm text-red-500">
                {videoFormik.errors.description}
              </div>
            )}
        </div>

        <Button
          type="submit"
          disabled={videoFormik.isSubmitting}
          className="h-10 w-full"
        >
          {lesson ? "تعديل" : "اضف"}
        </Button>
      </form>
    </div>
  );
};

export default LessonForm;

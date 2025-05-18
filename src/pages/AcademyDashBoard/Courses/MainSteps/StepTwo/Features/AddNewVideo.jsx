import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../../../AddNewCourse.module.css";
import VideoUploader from "../../../../../../component/UI/VideoUploader";
import { useDispatch } from "react-redux";
import { ButtonSpinner } from "../../../../../../component/UI/Buttons/ButtonSpinner";
import { useToast } from "../../../../../../utils/hooks/useToast";

import { createLesson } from "../../../../../../utils/apis/client/academy";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk";

// Validation Schema
const videoUploadSchema = Yup.object().shape({
  title: Yup.string().required("عنوان الفيديو مطلوب"),
  video: Yup.mixed().required("ملف الفيديو مطلوب"),
  lessonTitle: Yup.string().required("عنوان الدرس مطلوب"),
  description: Yup.string().required("وصف الفيديو مطلوب"),
});

const AddNewVideo = ({ courseId, chapterId }) => {
  const dispatch = useDispatch();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [videoDuration, setVideoDuration] = useState(null);

  const { success, error } = useToast();

  const videoFormik = useFormik({
    initialValues: {
      title: "",
      video: null,
      lessonTitle: "",
    },
    validationSchema: videoUploadSchema,
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("title", values.lessonTitle);
      formData.append("video", values.video);
      formData.append("type", "video");
      formData.append("video_title", values.title);
      formData.append("description", values.description);
      if (videoDuration) {
        formData.append("duration", Math.round(videoDuration));
      }
      try {
        const res = await createLesson(
          {
            courseId,
            chapterId,
          },
          formData
        );
        if (res.status) {
          setUploadSuccess(true);
          success("تم اضافة الدرس بنجاح");
          videoFormik.resetForm();
          dispatch(fetchCurrentCourseSummaryThunk(courseId));
        }
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    },
  });

  return (
    <>
      <div className={`${style.content} space-y-4 p-4`}>
        <h4 style={{ color: "#2B3674", fontWeight: "600" }}>اضافة درس جديد</h4>

        <div className="col-lg-11 col-md-12">
          <div className={style.formControl}>
            <label htmlFor="lessonTitle" className={style.label}>
              عنوان الدرس
            </label>
            <input
              type="text"
              placeholder="ادخل عنوان الدرس هنا"
              id="lessonTitle"
              name="lessonTitle"
              className={style.input}
              value={videoFormik.values.lessonTitle}
              onChange={videoFormik.handleChange}
            />
            {videoFormik.touched.lessonTitle &&
              videoFormik.errors.lessonTitle && (
                <div className={style.error}>
                  {videoFormik.errors.lessonTitle}
                </div>
              )}
          </div>
        </div>
        <div>
          {uploadSuccess && (
            <div className="alert alert-success">تم رفع الفيديو بنجاح!</div>
          )}
          <form onSubmit={videoFormik.handleSubmit}>
            <div className="CustomFormControl col-12">
              <VideoUploader
                setFieldValue={videoFormik.setFieldValue}
                getVideoDuration={(duration) => setVideoDuration(duration)}
              />
              {videoFormik.touched.video && videoFormik.errors.video && (
                <div className="text-danger">{videoFormik.errors.video}</div>
              )}
            </div>
            <div className="CustomFormControl col-12">
              <label>عنوان الفيديو</label>
              <input
                type="text"
                placeholder="أدخل عنوان الفيديو"
                name="title"
                value={videoFormik.values.title}
                onChange={videoFormik.handleChange}
                className="form-control"
                required
              />
              {videoFormik.touched.title && videoFormik.errors.title && (
                <div className="text-danger">{videoFormik.errors.title}</div>
              )}
            </div>
            <div className="CustomFormControl col-12">
              <label htmlFor="description">وصف الفيديو</label>
              <input
                type="text"
                placeholder="أدخل وصف الفيديو"
                name="description"
                id="description"
                value={videoFormik.values.description}
                onChange={videoFormik.handleChange}
                className="form-control"
                required
              />
              {videoFormik.touched.description &&
                videoFormik.errors.description && (
                  <div className="text-danger">
                    {videoFormik.errors.description}
                  </div>
                )}
            </div>

            <div className="col-12 d-flex justify-content-center mt-3 ">
              <div className="col-lg-6 col-md-12 offset-lg-3 offset-md-0 m-1 text-center w-100">
                <ButtonSpinner
                  titel="انشاء"
                  isDisabled={videoFormik.isSubmitting}
                  isLoading={videoFormik.isSubmitting}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className={`${style.sidebar} ${style.right}`}>
        {/*         
        <div className={style.sideSettings}>
          <VideoEditorSideBar />
        </div> 
        */}
      </div>
    </>
  );
};

export default AddNewVideo;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../../../AddNewCourse.module.css";
import VideoUploader from "../../../../../../component/UI/VideoUploader";
import { useSelector } from "react-redux";
import { latestLesson } from "../../../../../../../redux/courses/CourseSlice";
import { storage } from "../../../../../../utils/storage"
import { useVideoMutation } from "../../../../../../services/mutation";
import { formatLongText, hasLessonContent } from "../../../../../../utils/helpers";
import { ButtonSpinner } from "../../../../../../component/UI/Buttons/ButtonSpinner";
import { useToast } from "../../../../../../utils/hooks/useToast";
import { Text } from "../../../../../../utils/styles";

/**
 * مكون إضافة فيديو جديد للدرس
 * 
 * يتيح للمستخدم رفع فيديو تعليمي جديد للدرس المحدد في الدورة التدريبية
 * ويقوم بإرسال البيانات والملف إلى الخادم عبر API
 * 
 * يستخدم مكون VideoUploader لرفع الفيديو ويتطلب وجود درس محدد مسبقاً
 */

// Validation Schema
const videoUploadSchema = Yup.object().shape({
  title: Yup.string().required("عنوان الفيديو مطلوب"),
  video: Yup.mixed().required("ملف الفيديو مطلوب"),
  description: Yup.string().required("وصف الفيديو مطلوب"),
});

const AddNewVideo = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { success, error } = useToast()

  const chapterId = storage.get('chapky89wsgnae')
  const lessonId = storage.get('leuhqzrsyh5e')
  const getlatestLesson = useSelector((state) => latestLesson(state, chapterId, lessonId));

  const currentCourseId = storage.get("cousjvqpkbr3m")

  const mutation = useVideoMutation(currentCourseId, lessonId)

  const videoFormik = useFormik({
    initialValues: {
      title: "",
      description: "",
      video: null,
    },
    validationSchema: videoUploadSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("video", values.video);
      formData.append("type", "video");

      try {
        if (hasLessonContent(getlatestLesson, ['video'])) {
          await mutation.mutateAsync(formData);
          setUploadSuccess(true);
          videoFormik.resetForm();
        } else {
          error("قم بأنشاء درس جديد")
        }

      } catch (error) {
        console.error("Error uploading video:", error);
      }
    },
  });

  return (
    <>
      <div className={`${style.content}`}>
        <div className={style.addNewVideoContainer}>
          <Text size="20px" color="#575757" weight="600">
            <storage>Lesson : </storage>{getlatestLesson && formatLongText(getlatestLesson.title, 15)}</Text>
          <h5>إضافة فيديو جديد</h5>
          {uploadSuccess && (
            <div className="alert alert-success">تم رفع الفيديو بنجاح!</div>
          )}
          <form onSubmit={videoFormik.handleSubmit}>
            <div className="CustomFormControl col-12">
              <VideoUploader setFieldValue={videoFormik.setFieldValue} />
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
              <label>وصف الفيديو</label>
              <textarea
                placeholder="أدخل وصف الفيديو"
                name="description"
                value={videoFormik.values.description}
                onChange={videoFormik.handleChange}
                className="form-control"
                required
              ></textarea>
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
                  titel="رفع الفيديو"
                  isPending={mutation.isPending}
                  isDisabled={mutation.isLoading} />
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

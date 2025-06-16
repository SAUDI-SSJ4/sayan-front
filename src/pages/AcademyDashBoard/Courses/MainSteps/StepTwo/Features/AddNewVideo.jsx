import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Message } from "rsuite";
import VideoUploader from "../../../../../../component/UI/VideoUploader";
import Swal from "sweetalert2";

import style from "../../../AddNewCourse.module.css";
import { useSelector } from "react-redux";
import { latestLesson } from "../../../../../../../redux/courses/CourseSlice";
import { storage } from "../../../../../../utils/storage";
import { useLessonMutation } from "../../../../../../services/mutation";
import { useToast } from "../../../../../../utils/hooks/useToast";
import { hasLessonContent, formatLongText } from "../../../../../../utils/helpers";
import { Text } from "../../../../../../utils/styles";

/**
 * مكون إضافة فيديو جديد للدرس
 * 
 * يتيح للمستخدم رفع فيديو جديد للدرس المحدد في الدورة التدريبية
 * مع إمكانية إدخال معلومات إضافية عن الفيديو مثل العنوان والوصف
 * ويقوم بإرسال البيانات إلى الخادم عبر API
 * 
 * يتطلب وجود درس محدد مسبقاً ويتكون من خطوتين:
 * 1. إدخال معلومات الفيديو (العنوان، الوصف)
 * 2. رفع ملف الفيديو
 */

const videoInfoSchema = Yup.object().shape({
  videoTitle: Yup.string().required("عنوان الفيديو مطلوب"),
  videoDescription: Yup.string(),
});

const videoFileSchema = Yup.object().shape({
  videoFile: Yup.mixed().required("ملف الفيديو مطلوب"),
});

export const AddNewVideo = () => {
  const [videoData, setVideoData] = useState({ title: "", description: "" });
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);

  const { error } = useToast();

  const chapterId = storage.get("chapky89wsgnae");
  const lessonId = storage.get("leuhqzrsyh5e");
  const getlatestLesson = useSelector((state) =>
    latestLesson(state, chapterId, lessonId)
  );
  const currentCourseId = storage.get("cousjvqpkbr3m");

  const mutation = useLessonMutation(currentCourseId, chapterId, lessonId);

  const videoInfoFormik = useFormik({
    initialValues: {
      videoTitle: "",
      videoDescription: "",
    },
    validationSchema: videoInfoSchema,
    onSubmit: (values) => {
      setVideoData({
        ...videoData,
        title: values.videoTitle,
        description: values.videoDescription,
      });
      setCurrentStep(2);
    },
  });

  const handleVideoUpload = (file) => {
    setVideoFile(file);
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();

    try {
      videoFileSchema.validateSync({ videoFile });
    } catch (validationError) {
      Swal.fire("خطأ", validationError.message, "error");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("video_title", videoData.title);
    formData.append("description", videoData.description);
    formData.append("title", getlatestLesson.title);
    formData.append("duration", Math.round(videoDuration));

    if (!chapterId || !lessonId) {
      error("يرجى تحديد الدرس والفصل");
      return;
    }

    if (!hasLessonContent(getlatestLesson, ["video"])) {
      error("لا يمكنك إضافة محتوى لهذا الدرس لأنه يحتوي على محتوى بالفعل");
      return;
    }

    await mutation.mutateAsync(formData);
    setUploadSuccess(true);
    setVideoFile(null);
    setVideoDuration(null);
    videoInfoFormik.resetForm();
    setCurrentStep(1);
  };

  const renderVideoInfoStep = () => (
    <div className={style.boardLap}>
      <Text size="20px" color="#575757" weight="600">
        <storage>Lesson : </storage>
        {getlatestLesson && formatLongText(getlatestLesson.title, 15)}
      </Text>
      <h5 style={{ color: "#2B3674", fontWeight: "600" }}>
        اضافة فيديو جديد للدرس
      </h5>
      <form
        onSubmit={videoInfoFormik.handleSubmit}
        className="row g-3 w-80 justify-content-center m-auto"
      >
        <div className="justify-content-center">
          <div className="col-lg-11 col-md-12">
            <div className={style.formControl}>
              <label htmlFor="videoTitle" className={style.label}>
                عنوان الفيديو
              </label>
              <input
                type="text"
                placeholder="ادخل عنوان الفيديو هنا"
                id="videoTitle"
                name="videoTitle"
                value={videoInfoFormik.values.videoTitle}
                onChange={videoInfoFormik.handleChange}
                onBlur={videoInfoFormik.handleBlur}
                className={style.input}
              />
              {videoInfoFormik.touched.videoTitle &&
                videoInfoFormik.errors.videoTitle && (
                  <div className={style.error}>
                    {videoInfoFormik.errors.videoTitle}
                  </div>
                )}
            </div>
          </div>
          <div className="col-lg-11 col-md-12">
            <div className={style.formControl}>
              <label htmlFor="videoDescription" className={style.label}>
                وصف الفيديو
              </label>
              <textarea
                rows="4"
                placeholder="ادخل وصف الفيديو هنا"
                id="videoDescription"
                name="videoDescription"
                value={videoInfoFormik.values.videoDescription}
                onChange={videoInfoFormik.handleChange}
                onBlur={videoInfoFormik.handleBlur}
                className={style.textarea}
              />
              {videoInfoFormik.touched.videoDescription &&
                videoInfoFormik.errors.videoDescription && (
                  <div className={style.error}>
                    {videoInfoFormik.errors.videoDescription}
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <Button
            type="submit"
            appearance="primary"
            size="lg"
            style={{ width: "100%", padding: "15px 0px" }}
          >
            التالي
          </Button>
        </div>
      </form>
    </div>
  );

  const renderVideoUploadStep = () => (
    <div className={style.boardLap}>
      <Text size="20px" color="#575757" weight="600">
        <storage>Lesson : </storage>
        {getlatestLesson && formatLongText(getlatestLesson.title, 15)}
      </Text>
      <h5 style={{ color: "#2B3674", fontWeight: "600" }}>
        رفع فيديو جديد للدرس
      </h5>
      {uploadSuccess && <Message type="success">تم رفع الفيديو بنجاح!</Message>}

      <form
        onSubmit={handleVideoSubmit}
        className="row g-3 w-80 justify-content-center m-auto"
      >
        <VideoUploader
          onVideoUpload={handleVideoUpload}
          onDurationChange={setVideoDuration}
        />

        <div className="col-lg-6 col-md-12">
          <Button
            type="submit"
            appearance="primary"
            size="lg"
            style={{ width: "100%", padding: "15px 0px" }}
            disabled={mutation.isPending || !videoFile}
          >
            {mutation.isPending ? "جاري الرفع..." : "رفع الفيديو"}
          </Button>
        </div>
        <div className="col-lg-6 col-md-12">
          <Button
            onClick={() => setCurrentStep(1)}
            appearance="ghost"
            size="lg"
            style={{ width: "100%", padding: "15px 0px" }}
          >
            الرجوع
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <div className={`${style.content} text-center`}>
        {currentStep === 1 && renderVideoInfoStep()}
        {currentStep === 2 && renderVideoUploadStep()}
      </div>
      <div className={`${style.sidebar} ${style.right}`}></div>
    </>
  );
}; 
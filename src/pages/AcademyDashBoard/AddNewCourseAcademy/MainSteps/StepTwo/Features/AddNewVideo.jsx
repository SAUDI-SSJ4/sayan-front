import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../../../AddNewCourse.module.css";
import VideoEditor from "../../../../../../component/UI/VideoEditor";
import { Button } from "rsuite";

// Validation Schema
const videoUploadSchema = Yup.object().shape({
  title: Yup.string().required("عنوان الفيديو مطلوب"),
  description: Yup.string().required("وصف الفيديو مطلوب"),
  file: Yup.mixed().required("ملف الفيديو مطلوب"),
  duration: Yup.number()
    .min(1, "مدة الفيديو يجب أن تكون على الأقل دقيقة واحدة")
    .required("مدة الفيديو مطلوبة"),
});

const AddNewVideo = ({ courseData, setCourseData }) => {
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const videoFormik = useFormik({
    initialValues: {
      title: "",
      description: "",
      file: null,
      duration: "",
    },
    validationSchema: videoUploadSchema,
    onSubmit: (values) => {
      console.log("Uploaded Video Data:", values);
      setCourseData({
        ...courseData,
        videos: [...(courseData.videos || []), values],
      });
      setUploadSuccess(true);
      videoFormik.resetForm();
    },
  });

  const handleFileChange = (event) => {
    videoFormik.setFieldValue("file", event.currentTarget.files[0]);
  };

  return (
    <>
      <div className={`${style.content}`}>
          <div className={style.addNewVideoContainer} >
            <h4>إضافة فيديو جديد</h4>
            {uploadSuccess && (
              <div className="alert alert-success">تم رفع الفيديو بنجاح!</div>
            )}
            <form onSubmit={videoFormik.handleSubmit}>
              <div className="CustomFormControl col-12">
                {/* <label>رفع ملف الفيديو</label>
                <input
                  type="file"
                  name="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="form-control"
                  required
                /> */}
                <VideoEditor setFieldValue={videoFormik.setFieldValue} />

                {/* {videoFormik.touched.file && videoFormik.errors.file && (
                  <div className="text-danger">{videoFormik.errors.file}</div>
                )} */}
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
                <div className="col-lg-6 col-md-12 offset-lg-3 offset-md-0 m-1 text-center">
                  <Button
                    type="submit"
                    style={{
                      padding: "15px 30px",
                      fontSize: "18px",
                      width: "100%",
                    }}
                    appearance="primary"
                  >
                    رفع الفيديو
                  </Button>
                </div>
              </div>
            </form>
          </div>
        
      </div>

       <div className={`${style.sidebar} ${style.right} `}>
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

import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useCreateLessonMutation } from "../../../../services/mutation";
import style from "./AddNewCourse.module.css";
import { ButtonSpinner } from "../../../component/UI/Buttons/ButtonSpinner";

// Validation schema using Yup
const FILE_SIZE = 48 * 1024 * 1024; // 48 MB
const SUPPORTED_FORMATS = ["video/mp4"];
const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
  content: Yup.string().required("الوصف مطلوب"),
  video: Yup.mixed()
    .required("الفديو الخاص بالدرس مطلوب")
    .test(
      "fileSize",
      "الحجم الأقصى للفيديو هو 48 ميجابايت",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "صيغة الفيديو غير مدعومة. فقط mp4 مسموح.",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

function AddNewLesson({ CategoryID, CourseID }) {
  const mutation = useCreateLessonMutation();
  const videoInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      video: null,
      course_id: CourseID,
      category_id: CategoryID,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("course_id", CourseID);
      formData.append("category_id", CategoryID);
      formData.append("type", "video");
      formData.append("video", values.video);

      Swal.fire({
        title: "اضافة درس الي الدورة",
        text: "هل تريد اضافة هذا الدرس الي هذا القسم في هذة الدورة",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "اضافة",
        cancelButtonText: "لا",
      }).then((result) => {
        console.log(formData);
        if (!values.category_id && !values.course_id) {
          console.log(values.course_id);
          return;
        }
        if (result.isConfirmed) {
          mutation
            .mutateAsync(formData)
            .then(() => {
              Swal.fire({
                title: "نجاح!",
                text: "تمت إضافة الدرس بنجاح",
                icon: "success",
                confirmButtonText: "موافق",
              });
              resetForm();
            })
            .catch(() => {
              Swal.fire({
                title: "فشل",
                text: "حدث خطأ أثناء محاولة إضافة الدرس. يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "موافق",
              });
            });
        }
      });
    },
  });

  const handleVideoChange = (e) => {
    formik.setFieldValue("video", e.target.files[0]);
  };

  const isFormFilled = () => formik.values.title && formik.values.content && formik.values.video;

  return (
    <div className={style.boardLap}>
      <h4>إضافة درس جديد</h4>
      <form onSubmit={formik.handleSubmit} className="row g-3 w-80 justify-content-center m-auto">
        <div className="justify-content-center">
          <div className="row g-3 button-content--1 m-auto justify-content-center">
            {formik.values.video && (
              <video
                width="366px"
                height="212px"
                controls
                style={{ objectFit: "contain", marginTop: "10px" }}
              >
                <source src={URL.createObjectURL(formik.values.video)} type="video/" />
                Your browser does not support the video tag.
              </video>
            )}

            <div className="d-flex justify-content-center">
              <input
                type="file"
                accept="video/*"
                ref={videoInputRef}
                style={{ display: "none" }}
                onChange={handleVideoChange}
              />
              <div
                style={{
                  background: "white",
                  marginTop: "25px",
                  marginBottom: "30px",
                }}
                className="updateBtn"
                onClick={() => videoInputRef.current.click()}
              >
                رفع فيديو الدورة التدريبية
              </div>
            </div>
          </div>

          <div className="col-lg-11 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">العنوان</label>
              <input
                type="text"
                placeholder="ادخل عنوان الدورة هنا"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
            </div>
          </div>
          <div className="col-lg-11 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="content">الوصف</label>
              <textarea
                rows={5}
                placeholder="ادخل النص هنا"
                id="content"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.content && formik.errors.content && (
                <div>{formik.errors.content}</div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 text-center">
          {isFormFilled() && <ButtonSpinner bgColor="#6ada31" isPending={mutation.isPending} />}
        </div>
      </form>
    </div>
  );
}
//mutation
export default AddNewLesson;

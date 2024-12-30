import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useCreateLessonMutation } from "../../../../../../../services/mutation";
import style from "../../../AddNewCourse.module.css";
import { ButtonSpinner } from "../../../../../../component/UI/Buttons/ButtonSpinner";
import { Button } from "rsuite";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
  content: Yup.string().required("الوصف مطلوب"),
  video: Yup.mixed().required("الفديو الخاص بالدرس مطلوب")
});

function AddNewLesson({ CategoryID, CourseID }) {

  console.log("ids")
  console.log(CategoryID, CourseID)
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
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      formik.setFieldValue("video", selectedFile);
    }
  };

  const isFormFilled = () => formik.values.title && formik.values.content && formik.values.video;


  return (
    <div className={style.boardLap}>
      <h4>إضافة درس جديد</h4>
      <form onSubmit={formik.handleSubmit} className="row g-3 w-80 justify-content-center m-auto">
        <div className="justify-content-center">



          <div className="col-lg-11 col-md-12">
            <div className={style.formControl}>
              <label
                htmlFor="title"
                className={style.label}
              >
                العنوان
              </label>
              <input
                type="text"
                placeholder="ادخل عنوان الدرس هنا"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={style.input}
              />
              {formik.touched.title && formik.errors.title && (
                <div className={style.error}>{formik.errors.title}</div>
              )}
            </div>
          </div>
         
        
        </div>
        <div className="col-lg-6 col-md-12" >
          <Button type="submit" style={{
            padding: '15px 30px',
            fontSize: '18px',
            width: '100%'
          }} appearance="primary">اضافة</Button>
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

import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import style from "../../../AddNewCourse.module.css";
import { ButtonSpinner } from "../../../../../../component/UI/Buttons/ButtonSpinner";
import { Button } from "rsuite";
import { useLessonMutation } from "../../../../../../services/mutation";
import { storage } from "../../../../../../utils/storage";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
});

function AddNewLesson({ categoryId, courseId }) {

  const currentCourseId = storage.get("cousjvqpkbr3m")

  const mutation = useLessonMutation(currentCourseId);
  const chapterId = storage.get("chapky89wsgnae")

  const formik = useFormik({
    initialValues: {
      title: "",
      course_id: courseId,
      category_id: categoryId,
      chapter_id: chapterId,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
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
        if (!categoryId || !courseId || !chapterId) {
          return;
        }
        if (result.isConfirmed) {
          console.log("result.isConfirmed")
          mutation.mutateAsync({
            title: values.title,
            course_id: courseId,
            category_id: categoryId,
            chapter_id: chapterId,
          }).then(() => {
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

  return (
    <>
      <div className={`${style.content} container text-center `} style={{ padding: "60px 40px" }}>
        <h4 style={{ color: "#2B3674", fontWeight: "600" }}>اضافة درس جديد</h4>

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
            <Button type="submit"
              appearance="primary"
              size="lg"
              style={{ width: "100%", padding: '15px 0px' }}
              disabled={mutation.isPending || !formik.values.title}
            >اضافة</Button>
          </div>
        </form>
      </div>
      <div className={`${style.sidebar} ${style.right}`}>
      </div>
    </>
  );
}
//mutation
export default AddNewLesson;

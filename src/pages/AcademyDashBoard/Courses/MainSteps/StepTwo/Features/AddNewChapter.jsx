import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../../../AddNewCourse.module.css";
import Swal from "sweetalert2";
import { Button } from "rsuite";
import { useToast } from "../../../../../../utils/hooks/useToast";
import { postChapter } from "../../../../../../utils/apis/client/academy";
import { useDispatch } from "react-redux";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
});

const AddNewChapter = ({ categoryId, courseId }) => {
  const { error } = useToast();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
    onSubmit: (values) => {
      Swal.fire({
        title: "اضافة الفصل الي الدورة",
        text: "هل تريد اضافة هذا الدرس الي هذا الفصل في هذة الدورة",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "اضافة",
        cancelButtonText: "لا",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (!courseId) {
            error("الرجاء اختيار الدورة");
            return;
          }

          const res = await postChapter({
            title: values.title,
            courseId: courseId,
            is_published: 1,
          });
          if (res.status) {
            dispatch(fetchCurrentCourseSummaryThunk(courseId));
          }
        } else {
          formik.resetForm();
          return;
        }
      });
    },
  });

  return (
    <>
      <div
        className={`${style.content} container text-center `}
        style={{ padding: "60px 40px" }}
      >
        <h4 style={{ color: "#2B3674", fontWeight: "600" }}>اضافة فصل جديد</h4>

        <form
          onSubmit={formik.handleSubmit}
          className="row g-3 w-80 justify-content-center m-auto"
        >
          <div className="justify-content-center">
            <div className="col-lg-11 col-md-12">
              <div className={style.formControl}>
                <label htmlFor="title" className={style.label}>
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
                  className={style.input}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className={style.error}>{formik.errors.title}</div>
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
              // disabled={mutation.isPending || !formik.values.title}
            >
              اضافة
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewChapter;

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../../../AddNewCourse.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "rsuite";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
});

const AddNewChapter = () => {
  const [isFormFilled, setIsFormFilled] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsFormFilled(true);
      Swal.fire({
        title: "اضافة الفصل الي الدورة",
        text: "هل تريد اضافة هذا الدرس الي هذا الفصل في هذة الدورة",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "اضافة",
        cancelButtonText: "لا",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post("/academy/create/lesson", {
            title: values.title,
          })
            .then(() => {
              Swal.fire({
                title: "نجاح!",
                text: "تمت إضافة الفصل بنجاح",
                icon: "success",
                confirmButtonText: "موافق",
              });
              resetForm();
              setIsFormFilled(false);
            })
            .catch(() => {
              Swal.fire({
                title: "فشل",
                text: "حدث خطأ أثناء محاولة إضافة الفصل. يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "موافق",
              });
              setIsFormFilled(false);
            });
        } else {
          setIsFormFilled(false);
        }
      });
    },
  });

  return (
    <div className={style.boardLap}>
      <h4>عنوان الفصل الجديد</h4>

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

        <div className="col-lg-6 col-md-12" >
          <Button
            type="submit"
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              width: '100%'
            }}
            appearance="primary"
          >
            اضافة
          </Button>
          {isFormFilled && <ButtonSpinner bgColor="#6ada31" isPending={true} />}
        </div>
      </form>
    </div>
  );
};

export default AddNewChapter;
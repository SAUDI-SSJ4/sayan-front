import React from "react";
import { useFormik } from "formik";
import { Button, Rate } from "rsuite";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UploadImage from "../../../../component/UI/UploadFile/UploadImage";
import {
  editAcademyOpinions,
  postAcademyOpinions,
} from "../../../../utils/apis/client/academy";
import { studentOpinionSchema } from "../../../../validations/student-opinion";

function StudentOpinionForm({ studentOpinion }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      student_name: studentOpinion ? studentOpinion.student_name : "",
      student_avatar: studentOpinion ? studentOpinion.student_image : "",
      rate: studentOpinion ? studentOpinion.rating : null,
      opinion: studentOpinion ? studentOpinion.comment : "",
    },
    validationSchema: studentOpinion
      ? studentOpinionSchema.partial()
      : studentOpinionSchema,
    onSubmit: (values) => {
      const { student_avatar, ...reset } = values;
      const editedValues = typeof student_avatar === "object" ? values : reset;

      studentOpinion
        ? editAcademyOpinions(studentOpinion.id, editedValues)
            .then((res) => {
              if (res.success) {
                toast.success("تم تحديث تعليق بنجاح", {
                  position: "top-left",
                  theme: "dark",
                });
                navigate(location.pathname.replace(/edit/, ""));
              } else {
                console.log(res);
                toast.error("حدث خطأ ما ربما اسم العنصر موجود بالفعل");
              }
            })
            .catch((error) => {
              console.log(error);
            })
        : postAcademyOpinions(values).then((res) => {
            if (res.success) {
              toast.success("تم اضافة تعليق بنجاح", {
                position: "top-left",
                theme: "dark",
              });
              navigate(location.pathname.replace(/add/, ""));
            } else {
              console.log(res);
              toast.error("حدث خطأ ما ربما اسم العنصر موجود بالفعل");
            }
          });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="row">
      <div className="col-lg-12 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="student_name">اسم الطالب </label>
          <input
            type="text"
            placeholder="ادخل اسم الطالب هنا"
            id="student_name"
            name="student_name"
            value={formik.values.student_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.student_name && formik.errors.student_name && (
            <p className="text-red-500">{String(formik.errors.student_name)}</p>
          )}
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="student_avatar">صورة الطالب </label>
          <UploadImage
            id="student_avatar"
            name="student_avatar"
            currentImage={formik.values.student_avatar}
            onChange={(value) => formik.setFieldValue("student_avatar", value)}
            onBlur={formik.handleBlur}
          />
          {formik.touched.student_avatar && formik.errors.student_avatar && (
            <p className="text-red-500">
              {String(formik.errors.student_avatar)}
            </p>
          )}
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="rate">تقييم الطالب </label>
          <Rate
            id="rate"
            value={formik.values.rate}
            onChange={(value) => {
              formik.setFieldValue("rate", value);
            }}
          />
          {formik.touched.rate && formik.errors.rate && (
            <p className="text-red-500">{String(formik.errors.rate)}</p>
          )}
        </div>
      </div>

      <div className="col-lg-12 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="opinion">تعليق الطالب </label>
          <textarea
            placeholder="ادخل تعليق الطالب هنا"
            id="opinion"
            name="opinion"
            value={formik.values.opinion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.opinion && formik.errors.opinion && (
            <p className="text-red-500">{String(formik.errors.opinion)}</p>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          appearance="primary"
          className="submitBtn"
        >
          {studentOpinion ? "تعديل" : "اضافة"}
        </Button>
      </div>
    </form>
  );
}

export default StudentOpinionForm;

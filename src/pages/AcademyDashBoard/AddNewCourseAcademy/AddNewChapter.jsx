import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import videotype from "../../../assets/icons/videotype.png";
import examtype from "../../../assets/icons/examtype.png";

import style from "./AddNewCourse.module.css";
import vact1 from "../../../assets/icons/Vector.svg";
import vact2 from "../../../assets/icons/Vector (1).svg";
import vact3 from "../../../assets/icons/Vector (2).svg";
import vact4 from "../../../assets/icons/dd.svg";
import vact5 from "../../../assets/icons/Widget 4.svg";
import icon from "../../../assets/icons/icon.png";
import defualt from "../../../assets/images/img.png";
import Swal from "sweetalert2";
import axios from "axios";


const validationSchema = Yup.object().shape({
    title: Yup.string().required("العنوان مطلوب"),
    content: Yup.string().required("الوصف مطلوب"),
    file: Yup.string().required("الصورة الخاص بالفصل مطلوب"),
  });

const AddNewChapter = () => {
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    
    const handleSubmit = (values) => {
        console.log(values);
        const formData = new FormData();
        // Append the form fields and files
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("file", values.file);
        Swal.fire({
          title: "اضافة الفصل الي الدورة",
          text: "هل تريد اضافة هذا الفصل في هذة الدورة",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "اضافة",
          cancelButtonText: "لا",
        }).then((result) => {
          if (result.isConfirmed) {
          console.log(formData)
           
            Swal.fire({
              title: " تمت اضافة الفصل بنجاح",
              text: "تم اضافة الفصل الي الدورة التدريبة بنجاح 🎉",
              icon: "success",
            });
          }
        });
        console.log(values);
    }
  

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue("file", file);
    // Update the preview image state
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  return (
    <div className={style.boardLap}>
    <h4>عنوان الفصل الجديد</h4>

    <Formik
      initialValues={{ title: "", content: "", file: null }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form className="d-flex flex-column align-items-center w-100">
          <div className="col-12">
            <div className="CustomFormControl">
              <label htmlFor="title">العنوان</label>
              <Field
                type="text"
                name="title"
                placeholder="ادخل عنوان الدورة هنا"
                className={
                  touched.title && errors.title ? "is-invalid" : ""
                }
              />
              {touched.title && errors.title ? (
                <div className="error-message">{errors.title}</div>
              ) : null}
            </div>
          </div>

          <div className="col-12">
            <div className="CustomFormControl">
              <label htmlFor="content">الوصف</label>
              <Field
                as="textarea"
                rows={5}
                name="content"
                placeholder="ادخل النص هنا"
                className={
                  touched.content && errors.content ? "is-invalid" : ""
                }
              />
              {touched.content && errors.content ? (
                <div className="error-message">{errors.content}</div>
              ) : null}
            </div>
          </div>


          <button type="submit" className={style.saveBtnTwo}>
            حفظ
          </button>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default AddNewChapter
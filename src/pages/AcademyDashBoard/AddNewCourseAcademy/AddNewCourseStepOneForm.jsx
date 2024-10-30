import React, { useState, useRef } from "react";
import style from "./AddNewCourse.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import defualt from "../../../assets/images/img.png";
import chroma from "chroma-js";
import Select from "react-select";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { getAllcategories, getTrainer } from "../../../utils/apis/client/academy";
import { useCreateCourseMutation } from "../../../../services/mutation";
import { useNavigate } from "react-router-dom";
import { ButtonSpinner } from "../../../component/UI/Buttons/ButtonSpinner";

const typeOptions = [
  { value: "recorded", label: "تفاعلية", color: "#673ab7" },
  { value: "live", label: "مباشرة", color: "#f44336" },
  { value: "attend", label: "حضورية", color: "#8bc34a" },
];

const studentLevelOptions = [
  { value: "beginner", label: "مبتدئ", color: "#5243AA" },
  { value: "intermediate", label: "متوسط", color: "#FF8B00" },
  { value: "advanced", label: "متقدم", color: "#00875A" },
];

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    borderRadius: "10px",
    border: `1px solid #EDEFF2`,
    padding: "5px",
    boxShadow: "none",
  }),
  option: (styles, { data, isFocused, isSelected }) => {
    const color = chroma(data.color || "#0e85ff");
    return {
      ...styles,
      backgroundColor: isSelected ? color.css() : isFocused ? color.alpha(0.1).css() : undefined,
      color: isSelected ? "white" : color.css(),
    };
  },
};

const FILE_SIZE = 48 * 1024 * 1024; // 48 MB
const SUPPORTED_FORMATS = ["video/mp4"];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
  content: Yup.string().required("الوصف مطلوب"),
  short_content: Yup.string().required("الملخص مطلوب"),
  trainer_id: Yup.string().required("المدرب مطلوب"),
  price: Yup.number().required("السعر مطلوب").min(0, "يجب أن يكون السعر أكبر من 0"),
  level: Yup.string().required("مستوى الطالب مطلوب"),
  learn: Yup.string().required("المهارات المكتسبة مطلوبة"),
  type: Yup.string().required(" نوع الدورة مطلوبة"),
  requirments: Yup.string().required("المتطلبات مطلوبة"),
  image: Yup.mixed().required("صورة الدورة مطلوبة"),
  short_video: Yup.mixed()
    .required("فيديو الدورة مطلوب")
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

export const AddNewCourseStepOneForm = ({
  setNextStep,
  setStepper,
  setCourseDataId,
  setCourseDataCategoryId,
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const mutation = useCreateCourseMutation();

  const navigateWithIds = (courseId, categoryId) => {
    navigate(`/academy/addNewCourse/${courseId}/${categoryId}`, { replace: true });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      short_content: "",
      requirments: "",
      learn: "",
      short_video: null,
      type: "",
      price: "",
      level: "",
      category_id: "",
      trainer_id: "",
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("short_content", values.short_content);
      formData.append("learn", values.learn);
      formData.append("level", values.level);
      formData.append("price", values.price);
      formData.append("requirments", values.requirments);
      formData.append("type", values.type);
      formData.append("category_id", values.category_id);
      formData.append("trainer_id", values.trainer_id);
      formData.append("image", values.image);
      formData.append("short_video", values.short_video);

      Swal.fire({
        title: "اضافة الدورة",
        text: "هل تريد اضافة هذة الدورة",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "اضافة",
        cancelButtonText: "لا",
      }).then(async (result) => {
        if (result.isConfirmed) {
          mutation
            .mutateAsync(formData)
            .then(({ data }) => {
              setNextStep(true);
              setStepper(1)
              setCourseDataId(data.data.id);
              setCourseDataCategoryId(values?.category_id);
              navigateWithIds(data?.data?.id, values?.category_id);
              Swal.fire({
                title: "نجاح!",
                text: "تمت إضافة الدورة بنجاح",
                icon: "success",
                confirmButtonText: "موافق",
              });
              setNextStep(true);
            })
            .catch((error) => {
              setNextStep(false);
              Swal.fire({
                title: "فشل",
                text: "حدث خطأ أثناء محاولة إضافة الدورة. يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "موافق",
              });
            });
        }
      });
    },
  });

  const handleFileChange = (e) => formik.setFieldValue("image", e.target.files[0]);

  const handleVideoChange = (e) => formik.setFieldValue("short_video", e.target.files[0]);

  const { data: courseCatigories = [], isError: isCategoryError } = useQuery({
    queryKey: ["getAllcategories"],
    queryFn: () => getAllcategories(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });

  const { data: courseTrainer = [], isError: isTrainerError } = useQuery({
    queryKey: ["getTrainer"],
    queryFn: () => getTrainer(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });

  const isFormFilled = () => {
    if (
      formik.values.title &&
      formik.values.content &&
      formik.values.short_video &&
      formik.values.requirments &&
      formik.values.category_id &&
      formik.values.trainer_id &&
      formik.values.image &&
      formik.values.type &&
      formik.values.price &&
      formik.values.level &&
      formik.values.learn
    ) {
      return true;
    }
    return false;
  };

  return (
    <form onSubmit={formik.handleSubmit} className="row g-3 w-80 justify-content-center m-auto">
      <div className=" justify-content-center">
        <div className=" row g-3 button-content--1 m-auto justify-content-center">
          <img
            src={formik.values.image ? URL.createObjectURL(formik.values.image) : defualt}
            alt="Course"
            style={{
              maxWidth: "366px",
              maxHeight: "212px",
              objectFit: "contain",
              marginTop: "10px",
            }}
          />

          <div className="d-flex justify-content-center">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div
              style={{
                background: "white",
                marginTop: "25px",
                marginBottom: "30px",
              }}
              className="updateBtn"
              onClick={() => fileInputRef.current.click()}
            >
              رفع صورة الدورة التدريبية
            </div>
          </div>
        </div>
      </div>
      <div className="justify-content-center">
        <div className="row g-3 button-content--1 m-auto justify-content-center">
          {formik.values.short_video && (
            <video
              width="366px"
              height="212px"
              controls
              style={{
                objectFit: "contain",
                marginTop: "10px",
              }}
            >
              <source src={URL.createObjectURL(formik.values.short_video)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <div className="d-flex justify-content-center">
            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const selectedVideo = e.target.files[0];
                formik.setFieldValue("short_video", selectedVideo);
                handleVideoChange(e);
              }}
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
      </div>

      <div className="col-lg-6 col-md-12">
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

      <div className="col-lg-6 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="type">نوع الدورة</label>
          <Select
            options={typeOptions}
            styles={colourStyles}
            onChange={(option) => formik.setFieldValue("type", option.value)}
          />
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
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
          {formik.touched.content && formik.errors.content && <div>{formik.errors.content}</div>}
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="short_content">المحتوى المختصر</label>
          <textarea
            rows={5}
            placeholder="ادخل النص هنا"
            id="short_content"
            name="short_content"
            value={formik.values.short_content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.short_content && formik.errors.short_content && (
            <div>{formik.errors.short_content}</div>
          )}
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="trainer_id">المدرب</label>
          <Select
            options={courseTrainer.map((trainer) => ({
              value: trainer.id,
              label: trainer.name,
            }))}
            styles={colourStyles}
            onChange={(option) => formik.setFieldValue("trainer_id", option ? option.value : "")}
            value={courseTrainer
              .map((trainer) => ({
                value: trainer.id,
                label: trainer.name,
              }))
              .find((trainer) => trainer.value === formik.values.trainer_id)}
            placeholder="اختر مدرباً"
          />
          {formik.touched.trainer_id && formik.errors.trainer_id && (
            <div>{formik.errors.trainer_id}</div>
          )}
          {isTrainerError && <div>Failed to load trainers</div>}
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="category_id">الفئة</label>
          <Select
            options={courseCatigories.map((category) => ({
              value: category.id,
              label: category.title,
            }))}
            styles={colourStyles}
            onChange={(option) => formik.setFieldValue("category_id", option ? option.value : "")}
            value={courseCatigories
              .map((category) => ({
                value: category.id,
                label: category.title,
              }))
              .find((category) => category.value === formik.values.category_id)}
            placeholder="اختر فئة"
          />
          {formik.touched.category_id && formik.errors.category_id && (
            <div>{formik.errors.category_id}</div>
          )}
          {isCategoryError && <div>Failed to load categories</div>}
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="price">السعر</label>
          <input
            type="number"
            placeholder="ادخل السعر هنا"
            id="price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && <div>{formik.errors.price}</div>}
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="level">مستوى الطالب</label>
          <Select
            options={studentLevelOptions}
            styles={colourStyles}
            onChange={(option) => formik.setFieldValue("level", option.value)}
          />
          {formik.touched.level && formik.errors.level && <div>{formik.errors.level}</div>}
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="learn">المهارات المكتسبة</label>
          <textarea
            rows={5}
            placeholder="ادخل النص هنا"
            id="learn"
            name="learn"
            value={formik.values.learn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.learn && formik.errors.learn && <div>{formik.errors.learn}</div>}
        </div>
      </div>

      <div className="col-lg-6 col-md-12">
        <div className="CustomFormControl">
          <label htmlFor="requirments">المتطلبات</label>
          <textarea
            rows={5}
            placeholder="ادخل النص هنا"
            id="requirments"
            name="requirments"
            value={formik.values.requirments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.requirments && formik.errors.requirments && (
            <div>{formik.errors.requirments}</div>
          )}
        </div>
      </div>
      {isFormFilled() && (
        <div className="col-12">
          <ButtonSpinner isPending={mutation.isPending} />
        </div>
      )}
    </form>
  );
};

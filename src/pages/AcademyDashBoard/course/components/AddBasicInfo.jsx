import React, { useRef } from "react";
import CourseImageUpload from "./CourseImageUpload";
import CourseVideoUpload from "./CourseVideoUpload";
import CustomInput from "./CustomInput";
import CustomTextarea from "./CustomTextarea";
import CustomSelect from "./CustomSelect";
import chroma from "chroma-js";
import { useSelector } from "react-redux";

const courseTypes = [{ value: "recorded", label: "تفاعلية", color: "#673ab7" }];

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
      backgroundColor: isSelected
        ? color.css()
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isSelected ? "white" : color.css(),
    };
  },
};
function AddBasicInfo({ formik, course }) {
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const { trainers } = useSelector((state) => state.trainers);

  const { categories } = useSelector((state) => state.categories);

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue("short_video", e.target.files[0]);
    }
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue("image", e.target.files[0]);
    }
  };
  return (
    <div className="row g-3 justify-content-center m-0%">
      <div className="col-lg-6 col-md-12 justify-content-center">
        <CourseImageUpload
          image={formik.values.image}
          courseImage={course?.image}
          onImageChange={handleImageChange}
          fileInputRef={fileInputRef}
          error={formik.errors.image}
          touched={formik.touched.title}
        />
      </div>
      <div className="col-lg-6 col-md-12 justify-content-center">
        <CourseVideoUpload
          video={formik.values.short_video}
          onVideoChange={handleVideoChange}
          videoInputRef={videoInputRef}
          error={formik.errors.short_video}
          touched={formik.touched.short_video}
        />
      </div>
      <div className="col-lg-6 col-md-12">
        <CustomInput
          label="العنوان"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.title}
          touched={formik.touched.title}
          placeholder="ادخل عنوان الدورة هنا"
        />
      </div>
      <div className="col-lg-6 col-md-12">
        <CustomSelect
          label="نوع الدورة"
          options={courseTypes}
          styles={colourStyles}
          onChange={(option) => formik.setFieldValue("type", option.value)}
          value={
            courseTypes.find((t) => t.value === formik.values.type) || null
          }
          placeholder="اختر نوع الدورة"
        />
      </div>
      <div className="col-lg-3 col-md-6">
        <CustomSelect
          label="المدرب"
          options={trainers.map((trainer) => ({
            value: trainer.id,
            label: trainer.name,
          }))}
          styles={colourStyles}
          onChange={(option) =>
            formik.setFieldValue("trainer_id", option ? option.value : "")
          }
          value={
            trainers
              .map((trainer) => ({
                value: trainer.id,
                label: trainer.name,
              }))
              .find((trainer) => trainer.value === formik.values.trainer_id) ||
            null
          }
          placeholder="اختر مدرباً"
          error={formik.errors.trainer_id}
          touched={formik.touched.trainer_id}
        />
      </div>
      <div className="col-lg-3 col-md-6">
        <CustomSelect
          label="الفئة"
          options={categories.map((category) => ({
            value: category.id,
            label: category.title,
          }))}
          styles={colourStyles}
          onChange={(option) =>
            formik.setFieldValue("category_id", option ? option.value : "")
          }
          value={
            categories
              .map((category) => ({
                value: category.id,
                label: category.title,
              }))
              .find(
                (category) => category.value === formik.values.category_id
              ) || null
          }
          placeholder="اختر فئة"
          error={formik.errors.category_id}
          touched={formik.touched.category_id}
        />
      </div>
      <div className="col-lg-3 col-md-6">
        <CustomInput
          label="السعر - ريال"
          id="price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.price}
          touched={formik.touched.price}
          placeholder="ادخل السعر هنا"
        />
      </div>
      <div className="col-lg-3 col-md-6">
        <CustomSelect
          label="مستوى الطالب"
          options={studentLevelOptions}
          styles={colourStyles}
          onChange={(option) => formik.setFieldValue("level", option.value)}
          value={
            studentLevelOptions.find((l) => l.value === formik.values.level) ||
            null
          }
          placeholder="اختر مستوى الطالب"
          error={formik.errors.level}
          touched={formik.touched.level}
        />
      </div>
      <div className="col-lg-6 col-md-12">
        <CustomTextarea
          label="الوصف"
          id="content"
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.content}
          touched={formik.touched.content}
          placeholder="ادخل النص هنا"
        />
      </div>
      <div className="col-lg-6 col-md-12">
        <CustomTextarea
          label="المحتوى المختصر"
          id="short_content"
          name="short_content"
          value={formik.values.short_content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.short_content}
          touched={formik.touched.short_content}
          placeholder="ادخل النص هنا"
        />
      </div>
      <div className="col-lg-6 col-md-12">
        <CustomTextarea
          label="المهارات المكتسبة"
          id="learn"
          name="learn"
          value={formik.values.learn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.learn}
          touched={formik.touched.learn}
          placeholder="ادخل النص هنا"
        />
      </div>
      <div className="col-lg-6 col-md-12">
        <CustomTextarea
          label="المتطلبات"
          id="requirments"
          name="requirments"
          value={formik.values.requirments}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.requirments}
          touched={formik.touched.requirments}
          placeholder="ادخل النص هنا"
        />
      </div>
    </div>
  );
}

export default AddBasicInfo;

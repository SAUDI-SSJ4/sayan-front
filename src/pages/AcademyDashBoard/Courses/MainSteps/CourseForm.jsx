/* eslint-disable react/display-name */
import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import defualt from "../../../../assets/images/img.png";
import chroma from "chroma-js";
import Select from "react-select";
import { useMutation } from "@tanstack/react-query";
import { createCourseAPI } from "../../../../utils/apis/client/academy";
import {
  isCourseFieldComplete,
  populateFormData,
} from "../../../../utils/helpers";
import { useToast } from "../../../../utils/hooks/useToast";
import { storage } from "../../../../utils/storage";
import {
  changeState,
  setLoadingForCreateCourse,
} from "../../../../../redux/courses/CourseSlice";
import { useDispatch } from "react-redux";
import { fetchCurrentCourseSummaryThunk } from "../../../../../redux/courses/CourseThunk";

const typeOptions = [{ value: "recorded", label: "تفاعلية", color: "#673ab7" }];

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

const FILE_SIZE = 48 * 1024 * 1024; // 48 MB
const SUPPORTED_FORMATS = ["video/mp4"];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
  content: Yup.string().required("الوصف مطلوب"),
  short_content: Yup.string().required("الملخص مطلوب"),
  trainer_id: Yup.string().required("المدرب مطلوب"),
  price: Yup.number()
    .required("السعر مطلوب")
    .min(0, "يجب أن يكون السعر أكبر من 0"),
  level: Yup.string().required("مستوى الطالب مطلوب"),
  learn: Yup.string().required("المهارات المكتسبة مطلوبة"),
  type: Yup.string().required("نوع الدورة مطلوب"),
  requirments: Yup.string().required("المتطلبات مطلوبة"),
  image: Yup.mixed().required("صورة الدورة مطلوبة"),
  short_video: Yup.mixed().required("فيديو الدورة مطلوب"),
});

export const CourseForm = forwardRef(
  ({ setStepper, categories, trainers }, ref) => {
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const dispatch = useDispatch();
    const { success } = useToast();

    const mutation = useMutation({
      mutationFn: async (formData) => await createCourseAPI(formData),
    });

    const handleFileChange = (e) => {
      const file = e.currentTarget.files[0];
      if (file) formik.setFieldValue("image", file);
    };

    const handleVideoChange = (e) => {
      const video = e.currentTarget.files[0];
      if (video) formik.setFieldValue("short_video", video);
    };

    const formik = useFormik({
      initialValues: {
        title: "",
        content: "",
        short_content: "",
        trainer_id: "",
        price: 0,
        level: "",
        learn: "",
        type: "",
        requirments: "",
        category_id: "",
        image: null,
        short_video: null,
      },
      validationSchema,
      onSubmit: async (values) => {
        const formData = new FormData();
        populateFormData(formData, values);
        dispatch(setLoadingForCreateCourse(true));
        mutation
          .mutateAsync(formData)
          .then(({ data }) => {
            const { id: courseId, category_id: categoryId } = data;
            success("تم إضافة الكورس بنجاح");
            localStorage.setItem("courseId", courseId);
            storage.save("cahrst1x7teq", categoryId);
            dispatch(fetchCurrentCourseSummaryThunk(courseId));
            localStorage.setItem("__courseStepper", 1);
            setStepper(1);
          })
          .catch((error) => {
            console.error("Error creating course:", error);
            localStorage.setItem("__courseStepper", 0);
            setStepper(0);
          })
          .finally(() => {
            dispatch(setLoadingForCreateCourse(false));
          });
      },
    });

    useImperativeHandle(ref, () => ({
      submitForm: formik.submitForm,
    }));

    useEffect(() => {
      const savedStepper = localStorage.getItem("__courseStepper");
      if (savedStepper) {
        setStepper(Number(savedStepper));
      }
    }, [setStepper]);

    useEffect(() => {
      if (isCourseFieldComplete(formik)) dispatch(changeState(false));
    }, [formik.values]);

    return (
      <form
        onSubmit={formik.handleSubmit}
        className="row g-3 justify-content-center m-0%"
      >
        <div className="col-lg-6 col-md-12 justify-content-center">
          <div className=" row g-3 button-content--1 m-auto justify-content-center">
            <img
              src={
                formik.values.image
                  ? URL.createObjectURL(formik.values.image)
                  : defualt
              }
              alt="Course"
              style={{
                width: "359px",
                height: "199px",
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
                  marginTop: "20px",
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
        <div className="col-lg-6 col-md-12 justify-content-center">
          <div className="row g-3 button-content--1 m-auto justify-content-center">
            <div>
              <video
                src={
                  formik.values.short_video &&
                  URL.createObjectURL(formik.values.short_video)
                }
                controls
                style={{
                  objectFit: "full",
                  width: "600px",
                  height: "200px",
                  overflow: "hidden",
                  borderRadius: "12px",
                }}
                controlsList="nodownload"
              >
                Your browser does not support the video tag.
              </video>
            </div>
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
                  marginTop: "15px",
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
            {formik.touched.title && formik.errors.title && (
              <div>{formik.errors.title}</div>
            )}
          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="CustomFormControl">
            <label htmlFor="type">نوع الدورة</label>
            <Select
              options={typeOptions}
              styles={colourStyles}
              onChange={(option) => formik.setFieldValue("type", option.value)}
              placeholder="اختر نوع الدورة"
            />
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="CustomFormControl">
            <label htmlFor="trainer_id">المدرب</label>
            <Select
              options={trainers.map((trainer) => ({
                value: trainer.id,
                label: trainer.name,
              }))}
              styles={colourStyles}
              onChange={(option) =>
                formik.setFieldValue("trainer_id", option ? option.value : "")
              }
              value={trainers
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
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="CustomFormControl">
            <label htmlFor="category_id">الفئة</label>
            <Select
              options={categories.map((category) => ({
                value: category.id,
                label: category.title,
              }))}
              styles={colourStyles}
              onChange={(option) =>
                formik.setFieldValue("category_id", option ? option.value : "")
              }
              value={categories
                .map((category) => ({
                  value: category.id,
                  label: category.title,
                }))
                .find(
                  (category) => category.value === formik.values.category_id
                )}
              placeholder="اختر فئة"
            />
            {formik.touched.category_id && formik.errors.category_id && (
              <div>{formik.errors.category_id}</div>
            )}
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="CustomFormControl">
            <label htmlFor="price">السعر - ريال</label>
            <input
              placeholder="ادخل السعر هنا"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price && (
              <div>{formik.errors.price}</div>
            )}
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="CustomFormControl">
            <label htmlFor="level">مستوى الطالب</label>
            <Select
              options={studentLevelOptions}
              styles={colourStyles}
              onChange={(option) => formik.setFieldValue("level", option.value)}
              placeholder="اختر مستوى الطالب"
            />
            {formik.touched.level && formik.errors.level && (
              <div>{formik.errors.level}</div>
            )}
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
            {formik.touched.content && formik.errors.content && (
              <div>{formik.errors.content}</div>
            )}
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
            {formik.touched.learn && formik.errors.learn && (
              <div>{formik.errors.learn}</div>
            )}
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
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>
    );
  }
);

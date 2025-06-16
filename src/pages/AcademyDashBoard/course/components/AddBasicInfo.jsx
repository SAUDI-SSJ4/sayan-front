import React, { useRef } from "react";
import CourseImageUpload from "./CourseImageUpload";
import CourseVideoUpload from "./CourseVideoUpload";
import CustomInput from "./CustomInput";
import CustomTextarea from "./CustomTextarea";
import CustomSelect from "./CustomSelect";
import chroma from "chroma-js";
import { useSelector } from "react-redux";
import { FiUsers, FiBook, FiDollarSign, FiAward, FiFileText, FiList, FiClipboard, FiImage } from "react-icons/fi";
import { Button, Spinner } from "react-bootstrap";

const courseTypes = [{ value: "recorded", label: "تفاعلية", color: "#4F46E5" }];
const studentLevelOptions = [
  { value: "beginner", label: "مبتدئ", color: "#4F46E5" },
  { value: "intermediate", label: "متوسط", color: "#0EA5E9" },
  { value: "advanced", label: "متقدم", color: "#10B981" },
];

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    borderRadius: "8px",
    border: `1px solid #E2E8F0`,
    padding: "3px",
    boxShadow: "none",
    fontSize: "14px",
    minHeight: "42px",
    "&:hover": {
      borderColor: "#CBD5E1",
    },
  }),
  option: (styles, { data, isFocused, isSelected }) => {
    const color = chroma(data.color || "#4F46E5");
    return {
      ...styles,
      backgroundColor: isSelected
        ? color.css()
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isSelected ? "white" : color.darken().css(),
      padding: "10px 12px",
      fontSize: "14px",
      cursor: "pointer",
      "&:active": {
        backgroundColor: color.alpha(0.2).css(),
      },
    };
  },
  placeholder: (styles) => ({
    ...styles,
    color: "#94A3B8",
    fontSize: "14px",
  }),
  singleValue: (styles) => ({
    ...styles,
    fontSize: "14px",
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  }),
};

function AddBasicInfo({ formik, course, uploadProgress = 0, isUploading = false }) {
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const { trainers } = useSelector((state) => state.trainers);
  const { categories } = useSelector((state) => state.categories);
  
  // التأكد من أن المصفوفات ليست null أو undefined
  const safeTrainers = trainers || [];
  const safeCategories = categories || [];

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
    <div className="p-2 p-md-4">
      <div className="bg-white rounded-3 shadow-sm p-3 p-md-4 mb-4">
        <h5 className="fw-bold mb-3 text-primary d-flex align-items-center">
          <span className="rounded-circle bg-primary bg-opacity-10 p-2 me-2 d-flex align-items-center justify-content-center" style={{ width: 35, height: 35 }}>
            <FiFileText className="text-primary" />
          </span>
          المعلومات الأساسية للدورة
        </h5>
        
        <div className="row g-4 mt-1">
          {/* صورة ومقطع فيديو الدورة */}
          <div className="col-12">
            <div className="bg-light bg-opacity-50 rounded-3 p-3 mb-2">
              <h6 className="fw-semibold mb-3 d-flex align-items-center">
                <FiImage className="me-2 text-primary" />
                صورة وفيديو المادة
              </h6>
              
              <div className="row g-4">
                <div className="col-lg-6">
                  <CourseImageUpload
                    image={formik.values.image}
                    courseImage={course?.image}
                    onImageChange={handleImageChange}
                    fileInputRef={fileInputRef}
                    error={formik.errors.image}
                    touched={formik.touched.image}
                  />
                </div>
                
                <div className="col-lg-6">
                  <CourseVideoUpload
                    video={formik.values.short_video}
                    courseVideo={course?.short_video}
                    onVideoChange={handleVideoChange}
                    videoInputRef={videoInputRef}
                    error={formik.errors.short_video}
                    touched={formik.touched.short_video}
                    uploadProgress={uploadProgress}
                    isUploading={isUploading}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* معلومات الدورة الأساسية */}
          <div className="col-12">
            <div className="bg-light bg-opacity-50 rounded-3 p-3 mb-4">
              <h6 className="fw-semibold mb-3 d-flex align-items-center">
                <FiBook className="me-2 text-primary" />
                معلومات المادة
              </h6>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <CustomInput
                    label="عنوان المادة"
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.title}
                    touched={formik.touched.title}
                    placeholder="أدخل عنوان المادة هنا"
                  />
                </div>
                
                <div className="col-md-6">
                  <CustomSelect
                    label="نوع المادة"
                    options={courseTypes}
                    styles={colourStyles}
                    onChange={(option) => formik.setFieldValue("type", option.value)}
                    value={
                      courseTypes.find((t) => t.value === formik.values.type) || null
                    }
                    placeholder="اختر نوع المادة"
                    error={formik.errors.type}
                    touched={formik.touched.type}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* معلومات التصنيف والسعر */}
          <div className="col-12">
            <div className="bg-light bg-opacity-50 rounded-3 p-3 mb-4">
              <h6 className="fw-semibold mb-3 d-flex align-items-center">
                <FiAward className="me-2 text-primary" />
                التصنيف والمستوى
              </h6>
              
              <div className="row g-3">
                <div className="col-md-6 col-lg-3">
                  <CustomSelect
                    label="المدرب"
                    icon={<FiUsers className="text-muted" />}
                    options={safeTrainers.map((trainer) => ({
                      value: trainer.id,
                      label: trainer.name,
                    }))}
                    styles={colourStyles}
                    onChange={(option) =>
                      formik.setFieldValue("trainer_id", option ? option.value : "")
                    }
                    value={
                      safeTrainers
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
                
                <div className="col-md-6 col-lg-3">
                  <CustomSelect
                    label="الفئة"
                    icon={<FiList className="text-muted" />}
                    options={safeCategories.map((category) => ({
                      value: category.id,
                      label: category.title,
                    }))}
                    styles={colourStyles}
                    onChange={(option) =>
                      formik.setFieldValue("category_id", option ? option.value : "")
                    }
                    value={
                      safeCategories
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
                
                <div className="col-md-6 col-lg-3">
                  <CustomInput
                    icon={<FiDollarSign />}
                    type="number"
                    name="price"
                    label="السعر"
                    placeholder="أدخل سعر المادة"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.price}
                    touched={formik.touched.price}
                  />
                </div>
                
                <div className="col-md-6 col-lg-3">
                  <CustomSelect
                    label="مستوى الطالب"
                    icon={<FiAward className="text-muted" />}
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
              </div>
            </div>
          </div>
          
          {/* وصف الدورة */}
          <div className="col-12">
            <div className="bg-light bg-opacity-50 rounded-3 p-3 mb-4">
              <h6 className="fw-semibold mb-3 d-flex align-items-center">
                <FiClipboard className="me-2 text-primary" />
                الوصف والمحتوى
              </h6>
              
              <div className="row g-3">
                <div className="col-lg-6">
                  <CustomTextarea
                    label="الوصف التفصيلي"
                    id="content"
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.content}
                    touched={formik.touched.content}
                    placeholder="أدخل وصف المادة التفصيلي هنا"
                    rows={5}
                  />
                </div>
                
                <div className="col-lg-6">
                  <CustomTextarea
                    label="المحتوى المختصر"
                    id="short_content"
                    name="short_content"
                    value={formik.values.short_content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.short_content}
                    touched={formik.touched.short_content}
                    placeholder="أدخل ملخص مختصر للدورة"
                    rows={5}
                  />
                </div>
                
                <div className="col-lg-6">
                  <CustomTextarea
                    label="المهارات المكتسبة"
                    id="learn"
                    name="learn"
                    value={formik.values.learn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.learn}
                    touched={formik.touched.learn}
                    placeholder="أدخل المهارات التي سيكتسبها الطالب"
                    rows={4}
                  />
                </div>
                
                <div className="col-lg-6">
                  <CustomTextarea
                    label="المتطلبات"
                    id="requirments"
                    name="requirments"
                    value={formik.values.requirments}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.requirments}
                    touched={formik.touched.requirments}
                    placeholder="أدخل المتطلبات الأساسية للدورة"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* زر الحفظ داخل مربع البيانات */}
        <div className="mt-4 pt-3 border-top">
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              variant="primary"
              disabled={formik.isSubmitting || isUploading}
              className="px-5 py-2 d-flex align-items-center"
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              {formik.isSubmitting || isUploading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {isUploading ? 'جاري الرفع...' : 'جاري الحفظ...'}
                </>
              ) : (
                course?.id ? "تحديث المادة" : "إنشاء المادة"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBasicInfo;

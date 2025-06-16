import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import addcourse from "../../../assets/icons/Button.svg";
import steper1 from "../../../assets/icons/steper1 (1).svg";
import steper2 from "../../../assets/icons/steper2.svg";
import CourseForm from "./MainSteps/CourseForm";
import CourseFeatuers from "./MainSteps/StepTwo/CourseFeatuers";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../../utils/helpers";
import { fetchCategoriesThunk } from "../../../../redux/CategorySlice";
import { fetchTrainerThunk } from "../../../../redux/TrainerSlice";
import { storage } from "../../../utils/storage";
import { getAcademyCoursesThunk } from "../../../../redux/courses/CourseThunk";
import { Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { ContinueButton } from "../../../utils/styles";
import style from "./AddNewCourse.module.css";

const AddCourse = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const { isDisabled, isCreateCourseLoading } = useSelector(
    (state) => state.course
  );

  const {
    trainers,
    isLoading: isTrainersLoading,
    error: trainersError,
  } = useSelector((state) => state.trainers);

  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  // تنظيف التخزين المؤقت عند تحميل الصفحة
  useEffect(() => {
    // تنظيف التخزين المؤقت من البيانات السابقة
    setIsInitialized(true);

    // استرجاع البيانات الأساسية المطلوبة
    loadInitialData();

    // تعيين صفحة الخطوة الأولى
  }, []);

  const clearStorageData = () => {
    // حذف بيانات الدورة السابقة
    storage.delete("cahrst1x7teq");
    storage.delete("chapky89wsgnae");
    storage.delete("cousjvqpkbr3m");
    storage.delete("leuhqzrsyh5e");
    localStorage.setItem("__courseStepper", 0);
  };

  const loadInitialData = async () => {
    try {
      // تحميل البيانات الأساسية بشكل متوازي
      await Promise.all([
        !isEmpty(categories)
          ? Promise.resolve()
          : dispatch(fetchCategoriesThunk()).unwrap(),
        !isEmpty(trainers)
          ? Promise.resolve()
          : dispatch(fetchTrainerThunk()).unwrap(),
      ]);
    } catch (error) {
      toast.error("حدث خطأ أثناء تحميل البيانات الأساسية");
      console.error("Error loading initial data:", error);
    }
  };

  const handleContinue = () => {
    if (isDisabled) {
      toast.warn("يرجى إكمال جميع الحقول المطلوبة");
      return;
    }

    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  const handleFinishCreateCourse = async () => {
    try {
      toast.info("جاري إنشاء المادة...");
      await dispatch(getAcademyCoursesThunk()).unwrap();
      toast.success("تم إنشاء المادة بنجاح!");
      clearStorageData();
      navigate("/academy/training-courses");
    } catch (error) {
      toast.error("حدث خطأ أثناء إنشاء المادة");
      console.error("Error creating course:", error);
    }
  };

  if (!isInitialized) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" style={{ color: "#0fe8e8" }} />
        <span className="mr-2 fw-bold" style={{ color: "#2b3674" }}>
          جاري تهيئة صفحة إضافة دورة جديدة...
        </span>
      </div>
    );
  }

  return (
    <div className="add-course-container">
      {/* Page Header */}
      <div className="TablePageHeader" style={{ marginBottom: "24px" }}>
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon border-0" style={{ marginLeft: "12px" }}>
                <img src={addcourse} alt="Add Course" />
              </div>
              <div
                style={{
                  color: "#2b3674",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                إضافة دورة تدريبية جديدة
              </div>
            </div>
            <Link
              to="/academy/training-courses"
              style={{
                border: "1px solid #0fe8e8",
                color: "#0fe8e8",
                padding: "10px 15px",
                fontSize: "16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
            >
              <span style={{ marginLeft: "5px" }}>رجوع</span>{" "}
              <ArrowBack style={{ fontSize: "20px" }} />
            </Link>
          </div>
        </div>
      </div>
      {/* Errors Display */}
      {(trainersError || categoriesError) && (
        <Alert
          variant="danger"
          className="mb-4"
          style={{ borderRadius: "8px" }}
        >
          <div className="fw-bold mb-2" style={{ fontSize: "16px" }}>
            حدث خطأ أثناء تحميل البيانات
          </div>
          <p style={{ fontSize: "14px", margin: 0 }}>
            {trainersError && "تعذر تحميل قائمة المدربين. "}
            {categoriesError && "تعذر تحميل قائمة الفئات. "}
            يرجى المحاولة مرة أخرى لاحقاً.
          </p>
        </Alert>
      )}
      {/* Stepper 1: Course Info */}
      {step === 1 && (
        <div className="mb-5 all-info-top-header main-info-top">
          <div className="CustomCard formCard all-add-notific pb-4 pt-4 flex-column justify-content-center">
            <div className={style.steperProg}>
              <div />
              <div className={style.steperProgImg}>
                <img src={steper1} alt="Stepper" />
                <div className={style.steperProgtext}>
                  <span>معلومات المادة</span>
                  <span>باني الاقسام</span>
                  <span>اطلاق المادة</span>
                </div>
              </div>
              <ContinueButton
                bgColor={isDisabled ? "#7E8799" : "#0062ff"}
                disabled={isDisabled}
                onClick={handleContinue}
              >
                <span style={{ marginLeft: "15px" }}>استمرار</span>
                <span>
                  {isCreateCourseLoading && (
                    <Spinner animation="border" size="sm" />
                  )}
                </span>
              </ContinueButton>
            </div>
            <CourseForm
              setStep={setStep}
              categories={categories ?? []}
              trainers={trainers || []}
              ref={formRef}
            />
          </div>
        </div>
      )}
      {/* Stepper 2: Course Sections */}
      {step === 2 && (
        <div className="mb-5 all-info-top-header main-info-top">
          <div
            className="bg-white border-2 formCard all-add-notific pb-4 pt-4 flex-column justify-content-center"
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            {/* Progress Indicator */}
            <div
              style={{
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "35px 70px 5px",
              }}
            >
              <div />
              <div
                style={{
                  color: "#a3aed0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <img src={steper2} alt="Stepper" />
                <div
                  style={{
                    marginTop: "15px",
                    padding: "10px 0px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ marginLeft: "12px", marginRight: "12px" }}>
                    معلومات المادة
                  </span>
                  <span
                    style={{
                      fontWeight: "600",
                      color: "#2b3674",
                      marginLeft: "12px",
                      marginRight: "12px",
                    }}
                  >
                    باني الاقسام
                  </span>
                  <span style={{ marginLeft: "12px", marginRight: "12px" }}>
                    اطلاق المادة
                  </span>
                </div>
              </div>
              <button
                onClick={handleFinishCreateCourse}
                style={{
                  backgroundColor: "#0062ff",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <span
                  style={{ marginLeft: isCreateCourseLoading ? "15px" : "0" }}
                >
                  اتمام
                </span>
                {isCreateCourseLoading && (
                  <Spinner animation="border" size="sm" />
                )}
              </button>
            </div>

            {/* Course Features */}
            <CourseFeatuers categories={categories} trainers={trainers} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;

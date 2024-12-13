import React, { useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import addcourse from "../../../assets/icons/Button.svg";
import steper1 from "../../../assets/icons/steper1 (1).svg";
import steper2 from "../../../assets/icons/steper2.svg";
import style from "./AddNewCourse.module.css";
import AddNewCourseSteperTwo from "./AddNewCourseSteperTwo";
import { ContinueButton, ProgsaveButton } from "../../../utils/styles";
import { AddNewCourseStepOneForm } from "./AddNewCourseStepOneForm";

function AddNewCourseAcademy() {
  const navigate = useNavigate();
  const { courseId, categoryId } = useParams();
  const [stepper, setStepper] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  const [courseDataId, setCourseDataId] = useState(null);
  const [courseDataCategoryId, setCourseDataCategoryId] = useState(null);

  const disActiveNExtStep = () => setNextStep(false);


  console.log(stepper)

  return (
    <div>
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon border-0">
                <img src={addcourse} alt="Add Course" />
              </div>
              <div style={{ color: "#7E8799" }}>اضافة دورة تدريبية جديدة</div>
            </div>
            <Link to={"/academy/TrainingCourses"} className={style.backBtn}>
              رجوع <ArrowBack />
            </Link>
          </div>
        </div>
      </div>

      {stepper === 0 && (
        <div className="mb-5 all-info-top-header main-info-top">
          <div className="CustomCard formCard all-add-notific pb-4 pt-4 flex-column justify-content-center">
            <div className={style.steperProg}>
              <Link to={"/academy/addNewCourse"}>
                <ProgsaveButton onClick={nextStep && disActiveNExtStep}>حفظ كمسودة</ProgsaveButton>
              </Link>

              <div className={style.steperProgImg}>
                <img src={steper1} alt="Stepper" />
                <div className={style.steperProgtext}>
                  <span>معلومات الدورة</span>
                  <span>باني الاقسام</span>
                  <span>اطلاق الدورة</span>
                </div>
              </div>


                <ContinueButton bgColor="#0062ff" onClick={() => setStepper(1)}>
                  استمرار
                </ContinueButton>
              
              {/* {courseId && categoryId ? (
                <ContinueButton bgColor="#0062ff" onClick={() => setStepper(1)}>
                  استمرار
                </ContinueButton>
              ) : (
                <ContinueButton bgColor="#8e8e93" disabled>
                  استمرار
                </ContinueButton>
              )} */}
            </div>
            <AddNewCourseStepOneForm
              setNextStep={setNextStep}
              setStepper={setStepper}
              setCourseDataId={setCourseDataId}
              setCourseDataCategoryId={setCourseDataCategoryId}
            />
          </div>
        </div>
      )}

      {stepper === 1 && (
        <div className="mb-5 all-info-top-header main-info-top">
          <div className="bg-white border-2 formCard all-add-notific pb-4 pt-4 flex-column justify-content-center">
            <div className={style.steperProg}>
              <ProgsaveButton
                onClick={() => {
                  setStepper(0);
                  disActiveNExtStep();
                }}
              >
                حفظ كمسودة
              </ProgsaveButton>
              <div className={style.steperProgImg}>
                <img src={steper2} alt="Stepper" />
                <div className={style.steperProgtext}>
                  <span>معلومات الدورة</span>
                  <span>باني الاقسام</span>
                  <span>اطلاق الدورة</span>
                </div>
              </div>
              <ContinueButton
                bgColor="#0062ff"
                onClick={() => navigate("/academy/TrainingCourses")}
              >
                اتمام
              </ContinueButton>
            </div>
            <AddNewCourseSteperTwo
              CourseDataId={courseDataId}
              CourseDataCategoryId={courseDataCategoryId}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNewCourseAcademy;

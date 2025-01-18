import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import addcourse from "../../../assets/icons/Button.svg";
import steper1 from "../../../assets/icons/steper1 (1).svg";
import steper2 from "../../../assets/icons/steper2.svg";
import style from "./AddNewCourse.module.css";
import { ContinueButton } from "../../../utils/styles";
import { CourseForm } from "./MainSteps/CourseForm";
import CourseFeatuers from "./MainSteps/StepTwo/CourseFeatuers";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../../utils/helpers";
import { fetchCategoriesThunk } from "../../../../redux/CategorySlice";
import { fetchTrainerThunk } from "../../../../redux/TrainerSlice";
import { storage } from "../../../utils/storage";
import { getAllcategories } from "../../../utils/apis/client/academy";

function AddCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stepper, setStepper] = useState(0);
  const isDisabled = useSelector((state) => state.course.isDisabled);

  const handleFinishCreateCourse = () => {
    localStorage.setItem("__courseStepper", 0);
    storage.delete("cahrst1x7teq")
    storage.delete("chapky89wsgnae")
    storage.delete("cousjvqpkbr3m")
    storage.delete("leuhqzrsyh5e")
    navigate("/academy/training-courses")
  }

  const { trainers, isLoading: isTrainersLoading, error } = useSelector((state) => state.trainers);

  const { categories, isLoading: isCategoriesLoading } = useSelector((state) => state.categories);
  


  useEffect(() => {
    if (!isCategoriesLoading && (categories === null || isEmpty(categories))) {
      console.log("I call api thunk for categories");
      dispatch(fetchCategoriesThunk());
    }
  
    if (!isTrainersLoading && (trainers === null || isEmpty(trainers))) {
      console.log("I call api thunk for trainers");
      dispatch(fetchTrainerThunk());
    }
  }, [dispatch]);
  



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
            <Link to="/academy/training-courses" className={style.backBtn}>
              رجوع <ArrowBack />
            </Link>
          </div>
        </div>
      </div>

      {stepper === 0 && (
        <div className="mb-5 all-info-top-header main-info-top">
          <div className="CustomCard formCard all-add-notific pb-4 pt-4 flex-column justify-content-center">
            <div className={style.steperProg}>
              <div />
              <div className={style.steperProgImg}>
                <img src={steper1} alt="Stepper" />
                <div className={style.steperProgtext}>
                  <span>معلومات الدورة</span>
                  <span>باني الاقسام</span>
                  <span>اطلاق الدورة</span>
                </div>
              </div>
              <ContinueButton bgColor="#0062ff" disabled={isDisabled}>
                استمرار
              </ContinueButton>
            </div>
            <CourseForm
              setStepper={setStepper}
              categories={categories ?? []}
              trainers={trainers|| []}
            />
          </div>
        </div>
      )}

      {stepper === 1 && (
        <div className="mb-5 all-info-top-header main-info-top">
          <div className="bg-white border-2 formCard all-add-notific pb-4 pt-4 flex-column justify-content-center">
            <div className={style.steperProg}>
              <div />
              <div className={style.steperProgImg}>
                <img src={steper2} alt="Stepper" />
                <div className={style.steperProgtext}>
                  <span>معلومات الدورة</span>
                  <span>باني الاقسام</span>
                  <span>اطلاق الدورة</span>
                </div>
              </div>
              <ContinueButton bgColor="#0062ff" onClick={handleFinishCreateCourse}>
                اتمام
              </ContinueButton>
            </div>
            <CourseFeatuers

              categories={categories}
              trainers={trainers}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCourse;


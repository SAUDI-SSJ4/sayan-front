import React, { useRef, useEffect, useState } from "react";
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
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../../component/MainPages/FAQ/Accordion";
import AddNewLesson from "./AddNewLesson";
import AddNewChapter from "./AddNewChapter";
import { useCreateLessonMutation } from "../../../../services/mutation";
import AddNewExam from "./AddNewExam";
import { useParams } from "react-router-dom";
import { ButtonSoon } from "../../../utils/styles";
import { formatLongText } from "../../../utils/helpers";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
  content: Yup.string().required("الوصف مطلوب"),
  video: Yup.string().required("الفديو الخاص بالدرس مطلوب"),
});

function AddNewCourseSteperTwo() {
  const { courseId, categoryId } = useParams();
  const [CatFunctionalty, setCatFunctionalty] = useState([]);
  const [addNewLesson, setAddNewLesson] = useState(1);
  const [CategoryDetails, setCategoryDetails] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={style.mainSec}>
      <div className={style.container}>
        <div className={`${style.sidexld} d-flex`}>
          <div className={style.sideBarNav}>
            <div className={`${style.sideup} d-flex flex-column`}>
              <div className="d-flex align-items-center justify-content-between ">
                <div className={`${style.iconTextNotCursor} disabled`}>
                  <img src={vact1} alt="icon" />
                  <p className="text-nowrap text-center">اضافة فيديو </p>
                </div>
                <ButtonSoon>قريبا</ButtonSoon>
              </div>

              <div className="d-flex align-items-center justify-content-between ">
                <div className={`${style.iconTextNotCursor} disabled`}>
                  <img src={vact2} alt="icon" />
                  <p className="text-nowrap text-center">اضافة اداة تفاعلية</p>
                </div>
                <ButtonSoon>قريبا</ButtonSoon>
              </div>

              <div className="d-flex align-items-center justify-content-between ">
                <div className={style.iconText} onClick={() => setAddNewLesson(2)}>
                  <img src={vact3} alt="icon" />
                  <p>اضافة اختبار</p>
                </div>
              </div>
            </div>

            <div className={style.sidedown}>
              <div className="d-flex align-items-center justify-content-between ">
                <div className={style.iconText} onClick={() => setAddNewLesson(1)}>
                  <img src={vact4} alt="icon" />
                  <p>اضافة درس</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div
                  className={style.iconTextNotCursor}
                  // onClick={() => setAddNewLesson(0)}
                >
                  <img src={vact5} alt="icon" />
                  <p>اضافة فصل جديد</p>
                </div>
                <ButtonSoon>قريبا</ButtonSoon>
              </div>
            </div>
          </div>
          <div className={style.sideSecLap}>
            {CatFunctionalty?.data?.categories?.map((e, i) => (
              <Accordion
                style={{
                  padding: "10px",
                  margin: "10px",
                }}
                onClick={() => {
                  setCategoryDetails(e);
                  setAddNewLesson(2);
                }}
                key={i}
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}
              >
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#292D32",
                      fontWeight: "600",
                    }}
                    className="fs-6 fw-bold  title-text--1"
                  >
                    {formatLongText(e.title, 10)}
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#585C61",
                      fontWeight: "400",
                      padding: "10px !important",
                      margin: "10px !important",
                      backgroundColor: "red !important",
                    }}
                    className="fs-6 fw-medium text-content--1"
                  >
                    {e.lessons.map((lesson, index) => (
                      <div
                        className={style.lessons}
                        key={index}
                        onClick={(ed) => {
                          console.log(ed);
                        }}
                      >
                        <img
                          src={lesson.type === "video" ? videotype : examtype}
                          alt="lesson type"
                        />
                        {lesson?.video?.title}
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
        {addNewLesson === 0 ? (
          <AddNewChapter CategoryID={courseId} CourseID={categoryId} />
        ) : addNewLesson === 3 ? (
          <div className={style.categoryShow}>
            <h4 className="mb-4">عرض بيانات القسم</h4>
            <span></span>
            <p>العنوان : </p>
            <h4 className="mb-4">{CategoryDetails?.title}</h4>
            <p>الوصف : </p>
            <h4 className="mb-4">{CategoryDetails?.content}</h4>
            <p>الصورة : </p>
            <div className={style.catImage}>
              <img src={CategoryDetails?.image} alt="" />
            </div>
            <p>عدد الدروس : </p>
            <h4 className="mb-4">{CategoryDetails?.lessons.length}</h4>
            <button className={`${style.saveBtnTwo} fs-6 mt-1`} onClick={() => setAddNewLesson(1)}>
              اضافة درس جديد
            </button>
          </div>
        ) : addNewLesson === 1 ? (
          <AddNewLesson CategoryID={courseId} CourseID={categoryId} />
        ) : addNewLesson === 2 ? (
          <AddNewExam CategoryID={courseId} CourseID={categoryId} />
        ) : (
          <div>test fucking this shit</div>
        )}
      </div>
    </div>
  );
}

export default AddNewCourseSteperTwo;

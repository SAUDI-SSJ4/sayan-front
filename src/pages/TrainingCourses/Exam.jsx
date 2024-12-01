import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import classes from "./SingleCourse.module.scss";
import videotype from "../../assets/icons/videotype.png";
import examtype from "../../assets/icons/examtype.png";
import dooot from "../../assets/icons/Indentifier.png";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import { Spinner } from "react-bootstrap";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../component/MainPages/FAQ/Accordion";
import CourseStar from "../../assets/icons/CourseStar";
import CourseOutLine from "../../assets/icons/CourseOutLine";
import ContentCourse from "../../assets/icons/ContentCourse";
import AboutCourse from "../../assets/icons/AboutCourse";

const CourseExam = ({ courseExam }) => {
  // const { id } = useParams();

  // const [CourseData, setCourseData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [active, setActive] = useState(0);
  // const token = localStorage.getItem("token");
  // const [courseChoosenLesson, setcourseChoosenLesson] = useState([]);
  // const [courseChoosenCategory, setcourseChoosenCategory] = useState([]);
  // const [courseChoosenVideo, setcourseChoosenVideo] = useState([]);
  // const [courseChoosenExam, setcourseChoosenExam] = useState([]);
  console.log(courseExam);
  // useEffect(() => {
  //   axiosInstance
  //     .get(`/mycourse/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setCourseData(res.data);
  //       // setcourseChoosenCategory(res.data.data.categories[0]);
  //       // setcourseChoosenLesson(res.data.data.categories[0].lessons[0].video);
  //       // setcourseChoosenVideo(
  //       //   res.data.data.categories[0].lessons[0].video.video
  //       // );
  //       // setcourseChoosenExam(res.data.data.categories[0].lessons[0]);

  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching course data:", error);
  //       setLoading(false);
  //     });
  // }, [id, token]);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // if (loading) {
  //   return <Spinner animation="border" />;
  // }

  // if (!CourseData) {
  //   return <div>Error loading course data</div>;
  // }

  return (
    <div className="all-info-top-header main-info-top mb-5 acadmy-single-course">
      <div className="TablePageHeader ">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name ">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}>الاختبار</div>
          </div>
          <div className="updateBtn">
            الرجوع <KeyboardBackspaceIcon />
          </div>
        </div>
      </div>

      <div className={`${classes.contentLes}`}>
        <div className={`${classes.lessonsListandCategoryParent} row`}>
          <div className={`${classes.lessonsListandCategory} col-12 col-xl-4`}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 1 }}
              className={classes.Card}
            >
              {/**
                <div>
                {CourseData?.data?.categories.map((e, i) => (
                  <Accordion
                    onClick={() => {
                      setcourseChoosenCategory(e);
                      // setcourseChoosenLesson(e[0]?.lesson?.video);
                    }}
                    key={i}
                    expanded={expanded === `panel${i}`}
                    onChange={handleChange(`panel${i}`)}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <p
                        style={{
                          fontSize: "22px",
                          color: "#292D32",
                          fontWeight: "800",
                        }}
                        className="fs-6 fw-bold  title-text--1"
                      >
                        {e.title}
                      </p>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        style={{
                          fontSize: "18px",
                          color: "#585C61",
                          fontWeight: "400",
                        }}
                        className="fs-6 fw-medium text-content--1"
                      >
                        {e.lessons.map((lesson, index) => (
                          <div
                            className={classes.lessons}
                            key={index}
                            onClick={() => {
                              setcourseChoosenLesson(lesson?.video);
                              setcourseChoosenVideo(lesson?.video?.video);
                              setcourseChoosenExam(lesson);
                            }}
                          >
                            <img
                              src={
                                lesson.type === "video" ? videotype : examtype
                              }
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
                */}
            </motion.div>
          </div>
          <div className={`${classes.lessonsVideo} col-12 col-xl-8`}>
            <div className={`${classes.title}`}>
              <h4>sfff</h4>
              <div className={`${classes.lesson}`}>
                <h6>fsff</h6>
                <img src={dooot} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseExam;

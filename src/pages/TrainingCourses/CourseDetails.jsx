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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
import CourseExam from "./Exam";
import Cookies from "js-cookie";
const CourseDetails = () => {
  const { id } = useParams();

  const [CourseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const token = Cookies.get("student_token")
  const [courseChoosenLesson, setcourseChoosenLesson] = useState([]);
  const [courseChoosenCategory, setcourseChoosenCategory] = useState([]);
  const [courseChoosenVideo, setcourseChoosenVideo] = useState([]);
  const [courseChoosenExam, setcourseChoosenExam] = useState([]);
  const [selectedAnswerChoose, setSelectedAnswerChoose] = useState(null);
  const [selectedAnswerText, setSelectedAnswerText] = useState(null);
  const [selectedAnswerboolean, setSelectedAnswerboolean] = useState(null);
  const [errorMessageChoose, setErrorMessageChoose] = useState("");
  const [errorMessageText, setErrorMessageText] = useState("");
  const [errorMessageBoolean, setErrorMessageBoolean] = useState("");
  useEffect(() => {
    axiosInstance
      .get(`/mycourse/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourseData(res.data);
        // setcourseChoosenCategory(res.data.data.categories[0]);
        // setcourseChoosenLesson(res.data.data.categories[0].lessons[0].video);
        // setcourseChoosenVideo(
        //   res.data.data.categories[0].lessons[0].video.video
        // );
        // setcourseChoosenExam(res.data.data.categories[0].lessons[0]);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
        setLoading(false);
      });
  }, [id, token]);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (!CourseData) {
    return <div>Error loading course data</div>;
  }

  // State to hold the selected answer for each question

  // Function to handle selecting an answer
  const handleAnswerChoose = (ans) => {
    setSelectedAnswerChoose(ans);
    setErrorMessageChoose(""); // Clear any previous error message
  };

  // Function to handle button click and print the answer
  const handleSubmitChoose = () => {
    if (selectedAnswerChoose) {
      console.log(selectedAnswerChoose);
    } else {
      setErrorMessageChoose("يجب عليك اختيار إجابة قبل المتابعة.");
    }
  };

  const handleAnswerText = (ans) => {
    setSelectedAnswerText(ans);
    setErrorMessageText(""); // Clear any previous error message
  };

  // Function to handle button click and print the answer
  const handleSubmitText = () => {
    if (selectedAnswerText) {
      console.log(selectedAnswerText);
    } else {
      setErrorMessageText("يجب عليك اختيار إجابة قبل المتابعة.");
    }
  };

  const handleAnswerBoolean = (ans) => {
    setSelectedAnswerboolean(ans);
    setErrorMessageBoolean(""); // Clear any previous error message
  };

  // Function to handle button click and print the answer
  const handleSubmitBoolean = () => {
    if (selectedAnswerboolean) {
      console.log(selectedAnswerboolean);
    } else {
      setErrorMessageBoolean("يجب عليك اختيار إجابة قبل المتابعة.");
    }
  };

  return (
    <div className="all-info-top-header main-info-top mb-5 acadmy-single-course">
      <div className="TablePageHeader ">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name ">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}> الدورات التدريبية</div>
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
            </motion.div>
          </div>
          <div className={`${classes.lessonsVideo} col-12 col-xl-8`}>
            <div className={`${classes.title}`}>
              <h4>{courseChoosenCategory?.title}</h4>
              <div className={`${classes.lesson}`}>
                <h6>{courseChoosenLesson?.title}</h6>
                <img src={dooot} alt="" />
              </div>
            </div>

            {courseChoosenExam.type === "exam" ? (
              <>
                <button onClick={() => console.log(courseChoosenExam)}>
                  test
                </button>
                <h4>اختبار عنوان الدورة التدريبية</h4>
                <p className="d-block">وصف الاختبار</p>
                <div className="d-none">
                  <CourseExam courseExam={courseChoosenExam} />
                </div>
                <p className="d-block">(الوصف)</p>
                <button className={classes.startExam}>
                  بدء الاختبار
                  <ArrowBackIcon />
                </button>
                <span className={classes.sepppx}></span>
                <div className={classes.Quastions}>
                  {courseChoosenExam?.exam?.map((e, i) => {
                    return (
                      <div key={i}>
                        {e.question_type === "choose" && (
                          <div className={classes.chooseQuestion}>
                            <div className="d-flex flex-wrap justify-content-between align-items-center">
                              <h5 className="p-2">
                                {e.question}؟{" "}
                                <span style={{ color: "red" }}>*</span>
                              </h5>
                              <p>
                                سؤال اختيار احادي (يجب اختيار اجابة صحيحة واحدة
                                فقط)
                              </p>
                            </div>
                            <div>
                              {e.answers?.map((ans, ind) => (
                                <div
                                  key={ind}
                                  className={classes.chooseQuestionAnswer}
                                  onClick={() =>
                                    document
                                      .getElementById(`answer-${e.id}-${ind}`)
                                      .click()
                                  }
                                >
                                  <input
                                    type="radio"
                                    name={`question-${e.id}`}
                                    id={`answer-${e.id}-${ind}`}
                                    value={ans}
                                    checked={selectedAnswerChoose === ans} // Radio button is checked if selectedAnswer matches
                                    onChange={() => handleAnswerChoose(ans)}
                                  />
                                  <label htmlFor={`answer-${e.id}-${ind}`}>
                                    {ans}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={handleSubmitChoose}
                              className={classes.submitAnswer}
                            >
                              حفظ واستمرار
                              <ArrowBackIcon />
                            </button>

                            {errorMessageChoose && (
                              <p style={{ color: "red" }}>
                                {errorMessageChoose}
                              </p>
                            )}
                            <span className={classes.sepppx}></span>
                          </div>
                        )}
                        {e.question_type === "text" && (
                          <div className={classes.chooseQuestion}>
                            <div className="d-flex flex-wrap justify-content-between align-items-center">
                              <h5 className="p-2">
                                {e.question}؟{" "}
                                <span style={{ color: "red" }}>*</span>
                              </h5>
                              <p>
                                سؤال مقالي (يرجى كتابة إجابة تفصيلية ومُدَعمة
                                بالأمثلة إن أمكن)
                              </p>
                            </div>
                            <div>
                              <textarea
                                name={`question-${e.id}`}
                                id={`answer-${e.id}`}
                                value={selectedAnswerText} // Textarea value bound to selectedAnswer
                                onChange={(e) =>
                                  handleAnswerText(e.target.value)
                                } // Handling textarea input changes
                                className={classes.textareaInput} // You can style this as you wish
                                rows="8" // Adjust rows as needed
                                placeholder="اكتب إجابتك هنا..."
                              />
                            </div>
                            <button
                              onClick={handleSubmitText}
                              className={classes.submitAnswer}
                            >
                              حفظ واستمرار
                              <ArrowBackIcon />
                            </button>

                            {errorMessageText && (
                              <p style={{ color: "red" }}>{errorMessageText}</p>
                            )}
                            <span className={classes.sepppx}></span>
                          </div>
                        )}
                        {e.question_type !== "choose" &&
                          e.question_type !== "text" && (
                            <div className={classes.chooseQuestion}>
                              <div className="d-flex flex-wrap justify-content-between align-items-center">
                                <h5 className="p-2">
                                  {e.question}؟{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </h5>
                                <p>
                                  سؤال تحديد (اختر إما صح أو خطأ بناءً على صحة
                                  العبارة)
                                </p>
                              </div>
                              <div>
                                {["صح", "خطأ"].map((ans, ind) => (
                                  <div
                                    key={ind}
                                    className={classes.chooseQuestionAnswer}
                                    onClick={() =>
                                      document
                                        .getElementById(`answer-${e.id}-${ind}`)
                                        .click()
                                    }
                                  >
                                    <input
                                      type="radio"
                                      name={`question-${e.id}`}
                                      id={`answer-${e.id}-${ind}`}
                                      value={ans}
                                      checked={selectedAnswerboolean === ans} // Radio button is checked if selectedAnswer matches
                                      onChange={() => handleAnswerBoolean(ans)}
                                    />
                                    <label htmlFor={`answer-${e.id}-${ind}`}>
                                      {ans}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <button
                                onClick={handleSubmitBoolean}
                                className={classes.submitAnswer}
                              >
                                حفظ واستمرار
                                <ArrowBackIcon />
                              </button>

                              {errorMessageBoolean && (
                                <p style={{ color: "red" }}>
                                  {errorMessageBoolean}
                                </p>
                              )}
                              <span className={classes.sepppx}></span>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className={`${classes.videoMedia}`}>
                  <video width="100%" controls controlsList="nodownload">
                    <source src={courseChoosenVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className={classes.Course}>
                  <div className={`${classes.Tabs} flex-wrap`}>
                    <div
                      className={active == 0 ? classes.Active : ""}
                      onClick={() => setActive(0)}
                    >
                      <AboutCourse active={active == 0} />
                      نبذة
                    </div>

                    <div
                      className={active == 1 ? classes.Active : ""}
                      onClick={() => setActive(1)}
                    >
                      <ContentCourse active={active == 1} />
                      أسئلة واجوبة
                    </div>
                  </div>
                  <AnimatePresence mode="sync">
                    {active == 0 ? (
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 1 }}
                        className={classes.Card}
                      >
                        <h2
                          style={{
                            fontSize: "20px",
                            color: "black",
                            fontWeight: "bold",
                            marginTop: "0px ",
                          }}
                        >
                          نظرة عامة:
                        </h2>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "rgba(0,0,0,0.6)",
                            marginTop: "20px ",
                          }}
                        >
                          testtsdfasdiofnsnf
                        </p>
                        <h2
                          style={{
                            fontSize: "20px",
                            color: "black",
                            fontWeight: "bold",
                            marginTop: "30px ",
                          }}
                        ></h2>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "rgba(0,0,0,0.6)",
                            marginTop: "20px ",
                          }}
                        >
                          asnvlafulnfaf short
                        </p>
                      </motion.div>
                    ) : active == 1 ? (
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 1 }}
                        className={classes.Card}
                      >
                        <h2
                          style={{
                            fontSize: "20px",
                            color: "black",
                            fontWeight: "bold",
                            marginTop: "0px ",
                          }}
                        >
                          ماذا سوف تتعلم:
                        </h2>
                        <p>tesst</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

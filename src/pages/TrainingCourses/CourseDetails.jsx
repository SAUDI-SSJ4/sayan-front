import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import classes from "./SingleCourse.module.scss";
import videotype from "../../assets/icons/videotype.png";
import examtype from "../../assets/icons/examtype.png";
import dooot from "../../assets/icons/Indentifier.png";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../component/MainPages/FAQ/Accordion";
import AboutCourse from "../../assets/icons/AboutCourse";
import ContentCourse from "../../assets/icons/ContentCourse";
import CourseExam from "./Exam";
import CustomAccordion from "./components/CustomAccordion";
import Videotype from "../../assets/icons/videoType.svg?react";
import Examtype from "../../assets/icons/examType.svg?react";
import { formatLongText } from "../../utils/helpers";
import CustomVideoPlayer from "./components/CustomVideoPlayer";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [chosenCategory, setChosenCategory] = useState(null);
  const [chosenLesson, setChosenLesson] = useState(null);
  const [chosenVideo, setChosenVideo] = useState(null);
  const [chosenExam, setChosenExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examAnswers, setExamAnswers] = useState({});
  const [examResults, setExamResults] = useState(null);
  const [showError, setShowError] = useState(false);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", content: question },
    ]);

    setIsLoading(true);

    // Simulated AI response about learning programming
    const aiResponse = `لتعلم البرمجة بشكل فعال وسريع، أنصحك باتباع هذه الخطوات:

1. ابدأ بلغة برمجة سهلة مثل Python أو JavaScript
2. ركز على الأساسيات أولاً (المتغيرات، الشروط، الحلقات)
3. طبق ما تتعلمه من خلال مشاريع صغيرة
4. اقضِ ساعتين يومياً على الأقل في الممارسة
5. استخدم منصات التعلم التفاعلية مثل Codecademy
6. شارك في مجتمعات المبرمجين وتعلم من خبراتهم

تذكر: التعلم السريع يحتاج إلى ممارسة مستمرة والتركيز على التطبيق العملي أكثر من النظري.`;

    setTimeout(() => {
      setIsLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", content: aiResponse },
      ]);
    }, 1000);

    setQuestion("");
  };

  const handleLessonClick = (lesson, category) => {
    setSelectedLesson(lesson);
    if (lesson.type === "video") {
      setChosenVideo(lesson.video);
      setChosenExam(null);
    } else if (lesson.type === "exam") {
      setChosenVideo(null);
      setChosenExam(lesson.video);
    }
    setChosenLesson(lesson);
    setChosenCategory(category);
  };

  useEffect(() => {
    const fetchTempCourse = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const tempCourseData = {
          id: id,
          title: "دورة البرمجة الشاملة",
          description: "دورة شاملة في أساسيات البرمجة وتطوير الويب",
          data: {
            categories: [
              {
                title: "مقدمة في البرمجة",
                lessons: [
                  {
                    type: "video",
                    content: {
                      title: "ما هي البرمجة؟",
                      src: "https://www.sayan-server.com/courses/videos/academy//mPMpsr4Lj1roFRKA94Oa.mp4",
                      description: "مقدمة في عالم البرمجة",
                    },
                  },
                  {
                    type: "video",
                    content: {
                      title: "تاريخ البرمجة",
                      src: "https://www.sayan-server.com/courses/videos/academy//mPMpsr4Lj1roFRKA94Oa.mp4",
                      description: "نظرة تاريخية على تطور البرمجة",
                    },
                  },
                  {
                    type: "exam",
                    content: {
                      title: "اختبار أساسيات البرمجة",
                      questions: [
                        {
                          id: 1,
                          question: "ما هو مفهوم البرمجة؟",
                          options: [
                            "عملية كتابة التعليمات للحاسوب",
                            "تصميم واجهات المستخدم",
                            "إدارة قواعد البيانات",
                          ],
                          correctAnswer: "عملية كتابة التعليمات للحاسوب",
                        },
                      ],
                    },
                  },
                  {
                    type: "flippingCard",
                    content: {
                      title: "مصطلحات البرمجة",
                      cards: [
                        {
                          front: "Algorithm",
                          back: "خوارزمية: مجموعة من الخطوات لحل مشكلة معينة",
                          image: "https://placehold.co/400x300?text=Algorithm",
                          color: "#FFD700",
                        },
                        {
                          front: "Variable",
                          back: "متغير: وعاء لتخزين البيانات في البرنامج",
                          image: "https://placehold.co/400x300?text=Variable",
                          color: "#4CAF50",
                        },
                        {
                          front: "Function",
                          back: "دالة: مجموعة من التعليمات لأداء مهمة محددة",
                          image: "https://placehold.co/400x300?text=Function",
                          color: "#2196F3",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                title: "جافا سكريبت المتقدمة",
                lessons: [
                  {
                    type: "video",
                    content: {
                      title: "ميزات ES6",
                      src: "https://www.sayan-server.com/courses/videos/academy//mPMpsr4Lj1roFRKA94Oa.mp4",
                      description: "تعلم ميزات جافا سكريبت الحديثة",
                    },
                  },
                  {
                    type: "exam",
                    content: {
                      title: "اختبار ممارسة جافا سكريبت",
                      questions: [
                        {
                          id: 2,
                          question: "ما هي ميزات ES6؟",
                          options: [
                            "Arrow functions",
                            "let و const",
                            "Destructuring",
                          ],
                          correctAnswer: "Arrow functions",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                title: "أساسيات تطوير الويب",
                lessons: [
                  {
                    type: "video",
                    content: {
                      title: "نظرة عامة على HTML وCSS",
                      src: "https://www.sayan-server.com/courses/videos/academy//mPMpsr4Lj1roFRKA94Oa.mp4",
                      description: "مقدمة في HTML و CSS",
                    },
                  },
                  {
                    type: "video",
                    content: {
                      title: "بناء أول صفحة ويب لك",
                      src: "https://www.sayan-server.com/courses/videos/academy//mPMpsr4Lj1roFRKA94Oa.mp4",
                      description:
                        "تعلم كيفية إنشاء صفحة ويب بسيطة باستخدام HTML وCSS",
                    },
                  },
                  {
                    type: "exam",
                    content: {
                      title: "اختبار HTML/CSS",
                      questions: [
                        {
                          id: 3,
                          question: "ما هو HTML؟",
                          options: [
                            "لغة ترميز النص التشعبي",
                            "لغة برمجة",
                            "قاعدة بيانات",
                          ],
                          correctAnswer: "لغة ترميز النص التشعبي",
                        },
                        {
                          id: 4,
                          question: "ما هو CSS؟",
                          options: [
                            "لغة ترميز النص التشعبي",
                            "لغة برمجة",
                            "قاعدة بيانات",
                            "لغة التصميم",
                          ],
                          correctAnswer: "لغة التصميم",
                        },
                      ],
                    },
                  },
                  {
                    type: "timeline",
                    content: {
                      title: "تطور تقنيات الويب",
                      cards: [
                        {
                          order: 1,
                          title: "ولادة شبكة الويب العالمية",
                          description:
                            "تم اختراع شبكة الويب العالمية من قبل تيم بيرنرز لي",
                          color: "#FF6B6B",
                          image: "https://via.placeholder.com/150?text=WWW",
                        },
                        {
                          order: 2,
                          title: "إطلاق أول متصفح ويب رسومي",
                          description:
                            "تم إطلاق Mosaic، أول متصفح ويب رسومي شعبي",
                          color: "#4CAF50",
                          image: "https://via.placeholder.com/150?text=Mosaic",
                        },
                        {
                          order: 3,
                          title: "ظهور JavaScript",
                          description:
                            "تم إنشاء JavaScript بواسطة Brendan Eich في Netscape",
                          color: "#2196F3",
                          image:
                            "https://via.placeholder.com/150?text=JavaScript",
                        },
                        {
                          order: 4,
                          title: "ظهور تصميم الويب المتجاوب",
                          description:
                            "بدأ مفهوم تصميم الويب المتجاوب في الانتشار",
                          color: "#9C27B0",
                          image:
                            "https://via.placeholder.com/150?text=Responsive",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        };
        setCourseData(tempCourseData);
        // Set initial states
        const firstCategory = tempCourseData.data.categories[0];
        const firstLesson = firstCategory.lessons[0];
        setChosenCategory(firstCategory);
        setChosenLesson(firstLesson);
        setSelectedLesson(firstLesson);
        if (firstLesson.type === "video") {
          setChosenVideo(firstLesson.video);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error setting up temporary course:", error);
        setLoading(false);
      }
    };
    fetchTempCourse();
  }, [id]);

  useEffect(() => {
    setExamStarted(false);
    setExamAnswers({});
    setExamResults(null);
    setShowError(false);
  }, [chosenLesson]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setShowError(false);
    setExamAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmitExam = () => {
    const questions = chosenLesson?.content?.questions || [];
    const answeredCount = Object.keys(examAnswers).length;

    if (answeredCount < questions.length) {
      setShowError(true);
      const firstUnanswered = questions.findIndex(
        (_, index) => !examAnswers[index]
      );
      document.getElementById(`question-${firstUnanswered}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    const results = {
      correctAnswers: questions.reduce(
        (count, q, index) =>
          count + (examAnswers[index] === q.correctAnswer ? 1 : 0),
        0
      ),
      totalQuestions: questions.length,
    };

    results.score = Math.round(
      (results.correctAnswers / results.totalQuestions) * 100
    );
    setExamResults(results);
  };

  const resetExam = () => {
    setExamStarted(false);
    setExamAnswers({});
    setExamResults(null);
    setShowError(false);
  };

  if (loading) return <Spinner animation="border" />;
  if (!courseData) return <div>Error loading course data</div>;

  return (
    <div className="all-info-top-header main-info-top mb-5 acadmy-single-course">
      <div className="TablePageHeader">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name">
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

      <div
        className={`${classes.dashboard} ${classes.lessonsListandCategoryParent}`}
      >
        <div className={`${classes.sidebar} ${classes.left}`}>
          <CustomAccordion
            data={courseData.data.categories}
            defaultExpanded={expanded}
            onPanelChange={handleAccordionChange}
            renderSummary={(category, i) => (
              <p className={classes.accordionSummary}>
                {formatLongText(category.title, 15)}
                <span className={classes.lessonCount}>
                  ({i + 1}/{category.lessons.length})
                </span>
              </p>
            )}
            renderDetails={(category) => (
              <div className={classes.accordionDetails}>
                {category.lessons.map((lesson, index) => (
                  <div
                    key={index}
                    onClick={() => handleLessonClick(lesson, category)}
                    className={`${classes.lessonItem} ${
                      selectedLesson === lesson ? classes.selectedLesson : ""
                    }`}
                  >
                    {lesson.type === "video" ? (
                      <Videotype
                        alt="lesson type"
                        className={`${classes.lessonType} ${
                          selectedLesson === lesson
                            ? classes.lessonTypeActive
                            : ""
                        }`}
                      />
                    ) : (
                      <Examtype
                        alt="lesson type"
                        className={`${classes.lessonType} ${
                          selectedLesson === lesson
                            ? classes.lessonTypeActive
                            : ""
                        }`}
                      />
                    )}
                    <span>{lesson?.content?.title}</span>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
        {/* <div className={`${classes.content} ${classes.lessonsVideo}`}>
          <div className={classes.title}>
            <h4>{chosenCategory?.title}</h4>
            <div className={classes.lesson}>
              <img src={dooot} alt="" />
              <h6>{chosenLesson?.content?.title}</h6>
            </div>
          </div>
          {chosenLesson?.type === "exam" ? (
            <motion.div
              className={classes.examContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {!examStarted ? (
                <motion.button
                  className={classes.startExam}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExamStarted(true)}
                >
                  بدء الاختبار
                  <ArrowBackIcon />
                </motion.button>
              ) : examResults ? (
                <motion.div
                  className={classes.resultsContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={classes.scoreCard}>
                    <div className={classes.scoreCircle}>
                      <span className={classes.scoreNumber}>
                        {examResults.score}%
                      </span>
                    </div>
                    <p>
                      لقد أجبت على {examResults.correctAnswers} من أصل{" "}
                      {examResults.totalQuestions} أسئلة بشكل صحيح
                    </p>
                    <p
                      className={
                        examResults.score >= 70
                          ? classes.successText
                          : classes.errorText
                      }
                    >
                      {examResults.score >= 70
                        ? "تهانينا! لقد اجتزت الاختبار بنجاح"
                        : "حاول مرة أخرى للحصول على درجة أعلى"}
                    </p>
                  </div>
                  <motion.button
                    className={classes.startExam}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetExam}
                  >
                    إعادة الاختبار
                    <ArrowBackIcon />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  className={classes.Quastions}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {chosenLesson?.content?.questions?.map((question, index) => (
                    <motion.div
                      key={index}
                      id={`question-${index}`}
                      className={`${classes.questionBlock} ${
                        showError && !examAnswers[index]
                          ? classes.unanswered
                          : ""
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h5 data-number={index + 1}>
                        {question.question}؟
                        {showError && !examAnswers[index] && (
                          <span className={classes.errorText}>* مطلوب</span>
                        )}
                      </h5>
                      {question.options.map((answer, ansIndex) => (
                        <div
                          key={ansIndex}
                          className={`${classes.chooseQuestionAnswer} }`}
                          onClick={() => handleAnswerChange(index, answer)}
                        >
                          <input
                            type="radio"
                            id={`q${index}a${ansIndex}`}
                            name={`question${index}`}
                            checked={examAnswers[index] === answer}
                            readOnly
                          />
                          <label>{answer}</label>
                        </div>
                      ))}
                    </motion.div>
                  ))}
                  <motion.button
                    className={classes.startExam}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitExam}
                  >
                    تسليم الاختبار
                    <ArrowBackIcon />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ) : chosenLesson?.type === "flippingCard" ? (
            <motion.div
              className={classes.flippingCardsContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {chosenLesson?.content?.cards?.map((card, index) => (
                <motion.div
                  key={index}
                  className={classes.flipCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`${classes.flipCardInner} ${
                      card.isFlipped ? classes.isFlipped : ""
                    }`}
                    onClick={() => {
                      const updatedCards = [...chosenLesson.content.cards];
                      updatedCards[index] = {
                        ...card,
                        isFlipped: !card.isFlipped,
                      };
                      setChosenLesson((prev) => ({
                        ...prev,
                        content: { ...prev.content, cards: updatedCards },
                      }));
                    }}
                    style={{
                      "--card-color": card.color || "#0062ff",
                    }}
                  >
                    <div className={classes.flipCardFront}>
                      <h3>{card.front}</h3>
                      {card.image && (
                        <img
                          src={card.image}
                          alt={card.front}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/placeholder.png";
                          }}
                        />
                      )}
                    </div>
                    <div className={classes.flipCardBack}>
                      <p>{card.back}</p>
                      {card.image && (
                        <img
                          src={card.image}
                          alt={card.front}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/placeholder.png";
                          }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : chosenLesson?.type === "timeline" ? (
            <motion.div
              className={classes.timelineContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={classes.timelineList}>
                {chosenLesson?.content?.cards?.map((card, index) => (
                  <motion.div
                    key={index}
                    className={`${classes.timelineItem} ${
                      selectedTimelineItem === index ? classes.active : ""
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedTimelineItem(index)}
                    style={{
                      "--timeline-color": card.color || "#0062ff",
                    }}
                  >
                    <div className={classes.timelineDot} />
                    <div className={classes.timelineTitle}>{card.title}</div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className={`${classes.timelineDetails} ${
                  selectedTimelineItem !== null ? classes.visible : ""
                }`}
                initial={false}
                animate={{
                  opacity: selectedTimelineItem !== null ? 1 : 0,
                  x: selectedTimelineItem !== null ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
              >
                {selectedTimelineItem !== null && (
                  <motion.div
                    className={classes.timelineCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      "--timeline-color":
                        chosenLesson?.content?.cards[selectedTimelineItem]
                          .color || "#0062ff",
                    }}
                  >
                    <div className={classes.cardYear}>
                      {chosenLesson?.content?.cards[selectedTimelineItem].year}
                    </div>
                    <div className={classes.cardTitle}>
                      {chosenLesson?.content?.cards[selectedTimelineItem].title}
                    </div>
                    <div className={classes.cardDescription}>
                      {
                        chosenLesson?.content?.cards[selectedTimelineItem]
                          .description
                      }
                    </div>
                    {chosenLesson?.content?.cards[selectedTimelineItem]
                      .image && (
                      <img
                        src={
                          chosenLesson.content.cards[selectedTimelineItem].image
                        }
                        alt={
                          chosenLesson.content.cards[selectedTimelineItem].title
                        }
                        className={classes.cardImage}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/placeholder.png";
                        }}
                      />
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <div className={classes.videoContent}>
              <div className={classes.Course}>
                <CustomVideoPlayer video={chosenVideo} />

                <div className={`${classes.Tabs} flex-wrap`}>
                  <div
                    className={active === 0 ? classes.Active : ""}
                    onClick={() => setActive(0)}
                  >
                    <AboutCourse active={active === 0} />
                    نبذة
                  </div>
                  <div
                    className={active === 1 ? classes.Active : ""}
                    onClick={() => setActive(1)}
                  >
                    <ContentCourse active={active === 1} />
                    أسئلة واجوبة
                  </div>
                </div>
                <AnimatePresence mode="sync">
                  {active === 0 && (
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 100, opacity: 0 }}
                      transition={{ duration: 1 }}
                      className={classes.Card}
                    >
                      <h2>نظرة عامة:</h2>
                      <p>{chosenLesson?.content?.description}</p>
                    </motion.div>
                  )}
                  {active === 1 && (
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 100, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={classes.Card}
                    >
                      <h2 className={classes.qaTitle}>الأسئلة والأجوبة</h2>
                      <div className={classes.qaSection}>
                        <div className={classes.chatContainer}>
                          <div className={classes.messagesContainer}>
                            {messages.map((message, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1,
                                  ease: "easeOut",
                                }}
                                className={`${classes.message} ${
                                  message.type === "user"
                                    ? classes.userMessage
                                    : classes.aiMessage
                                }`}
                              >
                                <p>{message.content}</p>
                              </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                          </div>
                          <div className={classes.inputContainer}>
                            <textarea
                              className={classes.questionInput}
                              placeholder="اكتب سؤالك هنا..."
                              value={question}
                              onChange={(e) => setQuestion(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleAskQuestion();
                                }
                              }}
                              rows="1"
                            />
                            <motion.button
                              className={classes.sendButton}
                              onClick={handleAskQuestion}
                              disabled={!question.trim() || isLoading}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {isLoading ? (
                                <Spinner animation="border" size="sm" />
                              ) : (
                                "إرسال"
                              )}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CourseDetails;

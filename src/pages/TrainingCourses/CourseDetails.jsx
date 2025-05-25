import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import { apiCall } from "../../utils/auth";
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
import toast from "react-hot-toast";

const baseUrl = "https://www.sayan-server.com"; // Moved outside the function

const CourseDetails = () => {
  const { id: courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [chosenCategory, setChosenCategory] = useState(null);
  const [chosenLesson, setChosenLesson] = useState(null);
  // const [chosenVideo, setChosenVideo] = useState(null); // No longer needed - using chosenLesson.content.videoId
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

  const handleLessonClick = (lesson, chapter) => {
    setSelectedLesson(lesson);
    setChosenLesson(lesson);
    setChosenCategory(chapter);

    // Determine content type and set chosen video/exam
    if (lesson.type === "video") {
      // setChosenVideo(lesson.content?.videoId); // No longer needed - using chosenLesson.content.videoId directly
      setChosenExam(null);
    } else if (lesson.type === "exam") {
      // setChosenVideo(null); // No longer needed
      setChosenExam(lesson.content); // Assuming lesson.content contains exam details
          } else if (lesson.type === "flippingCard") {
        // setChosenVideo(null); // No longer needed
        setChosenExam(null);
      // Update chosenLesson content to include isFlipped state if needed for flipping cards
      setChosenLesson(prev => ({ ...prev, content: { ...lesson.content, cards: lesson.content.cards.map(card => ({ ...card, isFlipped: false })) } }));
          } else if (lesson.type === "timeline") {
        // setChosenVideo(null); // No longer needed
        setChosenExam(null);
      setSelectedTimelineItem(null); // Reset timeline selection on lesson change
    }
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const apiUrl = `${baseUrl}/website/mycourse/${courseId}`;

        // استخدام apiCall بدلاً من fetch مباشرة - سيتم التحقق من التوكن تلقائياً
        const response = await apiCall(apiUrl, {
          method: 'GET'
        });

        const result = await response.json();
        const fetchedData = result.data; // Adjust based on your API response structure

        // Initialize the first chapter and lesson using 'chapters' array
        if (fetchedData && fetchedData.chapters) {
          const updatedChapters = fetchedData.chapters.map(chapter => {
            // Check if chapter has lessons, if not, add dummy lessons
            if (!chapter.lessons || chapter.lessons.length === 0) {
              return {
                ...chapter,
                lessons: [
                  {
                    id: 'dummy-exam-hard-' + chapter.id, // Unique ID for dummy lesson
                    title: 'اختبار صعب جداً - ' + chapter.title, // Dummy title
                    type: 'exam',
                    content: { // Dummy hard exam content (10 questions)
                      title: 'اختبار صعب على ' + chapter.title,
                      description: 'هذا اختبار تجريبي صعب للفصل.',
                      questions: [
                        { question: 'من اكتشف الجاذبية؟', options: ['نيوتن', 'أينشتاين', 'جاليليو', 'تيسلا'], correctAnswer: 'نيوتن' },
                        { question: 'ما هي عاصمة اليابان؟', options: ['سيول', 'بكين', 'طوكيو', 'بانكوك'], correctAnswer: 'طوكيو' },
                        { question: 'في أي عام انتهت الحرب العالمية الثانية؟', options: ['1939', '1945', '1918', '1950'], correctAnswer: '1945' },
                        { question: 'ما هو العنصر الكيميائي رمزه Au؟', options: ['فضة', 'نحاس', 'ذهب', 'حديد'], correctAnswer: 'ذهب' },
                        { question: 'أطول نهر في العالم هو؟', options: ['الأمازون', 'النيل', 'المسيسيبي', 'يانغتسي'], correctAnswer: 'الأمازون' },
                        { question: 'كم عدد الكواكب في نظامنا الشمسي؟', options: ['8', '9', '10', '7'], correctAnswer: '8' },
                        { question: 'من كتب مسرحية هاملت؟', options: ['شكسبير', 'موزارت', 'بيتهوفن', 'دا فينشي'], correctAnswer: 'شكسبير' },
                        { question: 'ما هي أعلى قمة جبلية في العالم؟', options: ['كي2', 'كانتشنجونغا', 'لوم', 'إفرست'], correctAnswer: 'إفرست' },
                        { question: 'ما هو أسرع حيوان بري؟', options: ['الأسد', 'الفهد', 'الغزال', 'الحصان'], correctAnswer: 'الفهد' },
                        { question: 'ما هو لون الدم في الأخطبوط؟', options: ['أحمر', 'أزرق', 'شفاف', 'أخضر'], correctAnswer: 'أزرق' },
                      ],
                    },
                  },
                  {
                    id: 'dummy-flipping-card-detailed-' + chapter.id, // Unique ID
                    title: 'بطاقات تفاعلية مفصلة - ' + chapter.title, // Dummy title
                    type: 'flippingCard',
                    content: { // Dummy detailed flipping card content
                      title: 'تعلم المفاهيم الهامة',
                      cards: [
                        { front: 'ما هو الرياكت؟', back: 'مكتبة جافاسكريبت لبناء واجهات المستخدم.', description: 'وصف تفصيلي للرياكت.', image: 'https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png', color: '#61DAFB' },
                        { front: 'ما هو النود جي اس؟', back: 'بيئة تشغيل جافاسكريبت خارج المتصفح.', description: 'وصف تفصيلي للنود جي اس.', image: 'https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png', color: '#339933' },
                        { front: 'ما هي قاعدة البيانات؟', back: 'مجموعة منظمة من البيانات.', description: 'وصف تفصيلي لقواعد البيانات.', image: 'https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png', color: '#FF7000' },
                      ],
                    },
                  },
                  {
                    id: 'dummy-timeline-events-' + chapter.id, // Unique ID
                    title: 'خط زمني للأحداث الرئيسية - ' + chapter.title, // Dummy title
                    type: 'timeline',
                    content: { // Dummy timeline content with more events
                      title: 'أحداث تاريخية رئيسية',
                      cards: [
                        { title: 'تأسيس روما', description: 'أسطورة تأسيس مدينة روما.', color: '#DB4437' },
                        { title: 'سقوط الإمبراطورية الرومانية الغربية', description: 'نهاية الحكم الروماني في الغرب.', color: '#0F9D58' },
                        { title: 'عصر النهضة يبدأ في إيطاليا', description: 'فترة من التغير الثقافي والفني والعلمي.', color: '#F4B400'},
                         { title: 'الثورة الفرنسية', description: 'فترة تحول سياسي واجتماعي كبير في فرنسا.', color: '#42A5F5'},
                         { title: 'اختراع الإنترنت', description: 'نقطة تحول في تاريخ الاتصالات والمعلومات.', color: '#7E57C2'},
                      ],
                    },
                  },
                ],
              };
            }
            return chapter;
          });
          fetchedData.chapters = updatedChapters; // Update chapters with dummy lessons
        }

        setCourseData(fetchedData);

        // Initialize the first chapter and lesson using 'chapters' array
        if (fetchedData && fetchedData.chapters && fetchedData.chapters.length > 0) {
          const firstChapter = fetchedData.chapters[0];
          if (firstChapter.lessons && firstChapter.lessons.length > 0) {
            const firstLesson = firstChapter.lessons[0];
             setChosenCategory(firstChapter);
        setChosenLesson(firstLesson);
        setSelectedLesson(firstLesson);

             // Set initial video/exam based on the first lesson type
        if (firstLesson.type === "video") {
                // setChosenVideo(firstLesson.content?.videoId); // No longer needed - using chosenLesson.content.videoId directly
             } else if (firstLesson.type === "exam") {
                setChosenExam(firstLesson.content); // Assuming lesson.content has exam data
             } else if (firstLesson.type === "flippingCard") {
               // Initialize flipping card state
                setChosenLesson(prev => ({ ...prev, content: { ...firstLesson.content, cards: firstLesson.content.cards.map(card => ({ ...card, isFlipped: false })) } }));
             } else if (firstLesson.type === "timeline") {
                // Initialize timeline state if needed
                 // setSelectedTimelineItem(null); // Already reset on lesson change
             }
          } else {
             setChosenCategory(firstChapter);
             // Handle case with chapter but no lessons - dummy lessons added above will be used
             console.warn(`Chapter '${firstChapter.title}' had no lessons, dummy lessons added.`);
             // Optionally select the first dummy lesson
             if(firstChapter.lessons && firstChapter.lessons.length > 0) {
                 const firstDummyLesson = firstChapter.lessons[0];
                 setChosenLesson(firstDummyLesson);
                 setSelectedLesson(firstDummyLesson);
                  if (firstDummyLesson.type === "exam") {
                    setChosenExam(firstDummyLesson.content);
                 } else if (firstDummyLesson.type === "flippingCard") {
                    setChosenLesson(prev => ({ ...prev, content: { ...firstDummyLesson.content, cards: firstDummyLesson.content.cards.map(card => ({ ...card, isFlipped: false })) } }));
                 } else if (firstDummyLesson.type === "timeline") {
                    // No specific state needed on initial load for timeline beyond setting chosenLesson/selectedLesson
                 }
             }
          }
        } else {
           // Handle case with no chapters or data
           console.warn("No chapters or data found for this course.");
           toast.info("لا توجد محتويات لهذه الدورة حالياً.");
        }

      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("فشل في تحميل تفاصيل الدورة: " + error.message);
        // Optionally clear course data on error: setCourseData(null);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
       fetchCourseDetails();
    }

  }, [courseId]); // Rerun effect if courseId changes

  useEffect(() => {
    setExamStarted(false);
    setExamAnswers({});
    setExamResults(null);
    setShowError(false);
  }, [chosenLesson]); // Reset exam state when chosenLesson changes

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
    setChosenLesson(prevLesson => {
      return { ...prevLesson, content: { ...prevLesson.content, cards: prevLesson.content.cards.map(card => ({ ...card, isFlipped: false })) } };
    });
  };

  const handleFlipCard = (cardIndex) => {
     if (!chosenLesson || chosenLesson.type !== 'flippingCard' || !chosenLesson.content || !chosenLesson.content.cards) return;

     setChosenLesson(prevLesson => {
        const updatedCards = prevLesson.content.cards.map((card, index) => {
           if(index === cardIndex) {
              return { ...card, isFlipped: !card.isFlipped };
           }
           return card;
        });
        return { ...prevLesson, content: { ...prevLesson.content, cards: updatedCards } };
     });
  };

  if (loading) return <Spinner animation="border" />;
  if (!courseData) return <div>تعذر تحميل بيانات الدورة.</div>;
  if (!courseData.chapters || courseData.chapters.length === 0) return <div>لا توجد محتويات لهذه الدورة حالياً.</div>;

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
        className={`${classes.dashboard} ${classes.chapters}`}
      >
        <div className={`${classes.sidebar} ${classes.left}`}>
          <CustomAccordion
            data={courseData.chapters}
            defaultExpanded={expanded}
            onPanelChange={handleAccordionChange}
            renderSummary={(chapter, i) => (
              <p className={classes.accordionSummary}>
                {formatLongText(chapter.title, 50)}
                <span className={classes.lessonCount}>
                  ({chapter.lessons.length})
                </span>
              </p>
            )}
            renderDetails={(chapter) => (
              <div className={classes.accordionDetails}>
                {chapter.lessons.map((lesson, index) => (
                  <div
                    key={index}
                    onClick={() => handleLessonClick(lesson, chapter)}
                    className={`${classes.lessonItem} ${ selectedLesson === lesson ? classes.selectedLesson : "" }`}
                  >
                    {lesson.type === "video" && <Videotype alt="lesson type" className={`${classes.lessonType} ${ selectedLesson === lesson ? classes.lessonTypeActive : "" }`} />}
                    {lesson.type === "exam" && <Examtype alt="lesson type" className={`${classes.lessonType} ${ selectedLesson === lesson ? classes.lessonTypeActive : "" }`} />}
                    {lesson.type === "flippingCard" && <span>🃏</span>}
                    {lesson.type === "timeline" && <span>⏳</span>}

                    <span>{lesson?.content?.title || lesson?.title}</span>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
        <div className={`${classes.content} ${classes.lessonsVideo}`}>
          {chosenLesson ? (
            <>
          <div className={classes.title}>
            <h4>{chosenCategory?.title}</h4>
            <div className={classes.lesson}>
              <img src={dooot} alt="" />
                  <h6>{chosenLesson?.content?.title || chosenLesson?.title}</h6>
                </div>
              </div>
              
              {chosenLesson.type === "video" && (chosenLesson?.content?.videoId || chosenLesson?.video) ? (
                <div className={classes.videoContent}>
                  <div className={classes.Course}>
                    <CustomVideoPlayer video={chosenLesson?.content?.videoId || chosenLesson?.video} />
                    {/* DEBUG: Log video data */}
                    {console.log('CourseDetails: chosenLesson:', chosenLesson)}
                    {console.log('CourseDetails: videoId being passed:', chosenLesson?.content?.videoId || chosenLesson?.video)}

                    <div className={`${classes.Tabs}`}>
                      <div
                        className={active === 0 ? classes.Active : ""}
                        onClick={() => setActive(0)}
                      >
                        <AboutCourse active={active === 0} />
                        مؤقت
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
              ) : chosenLesson.type === "exam" && chosenExam ? (
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
              ) : chosenLesson.type === "flippingCard" && chosenLesson.content?.cards ? (
            <motion.div
              className={classes.flippingCardsContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
                    {chosenLesson.content.cards.map((card, index) => (
                <motion.div
                  key={index}
                  className={classes.flipCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                         onClick={() => handleFlipCard(index)}
                        style={{
                          "--card-color": card.color || "#0062ff",
                        }}
                >
                  <div
                          className={`${classes.flipCardInner} ${ card.isFlipped ? classes.isFlipped : "" }`}
                          
                    style={{
                      "--card-color": card.color || "#0062ff",
                    }}
                  >
                    <div className={classes.flipCardFront}>
                      <h3>{card.front}</h3>
                      {/* Removed image from front */}
                    </div>
                    <div className={classes.flipCardBack}>
                      <p>{card.back}</p>
                      {card.image && ( /* Display image only on back */
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
              ) : chosenLesson.type === "timeline" && chosenLesson.content?.cards ? (
            <motion.div
              className={classes.timelineContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={classes.timelineList}>
                      {chosenLesson.content.cards.map((card, index) => (
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
                      {selectedTimelineItem !== null && chosenLesson.content.cards[selectedTimelineItem] && (
                  <motion.div
                    className={classes.timelineCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      "--timeline-color":
                              chosenLesson.content.cards[selectedTimelineItem]
                          .color || "#0062ff",
                    }}
                  >
                    <div className={classes.cardTitle}>
                            {chosenLesson.content.cards[selectedTimelineItem].title}
                    </div>
                    <div className={classes.cardDescription}>
                      {
                              chosenLesson.content.cards[selectedTimelineItem]
                          .description
                      }
                    </div>
                          {chosenLesson.content.cards[selectedTimelineItem]
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
                 <div className="text-center p-4">الرجاء اختيار درس من القائمة الجانبية.</div>
              )}

            </>
          ) : (
            <div className="text-center p-4">الرجاء اختيار درس من القائمة الجانبية لبدء العرض.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

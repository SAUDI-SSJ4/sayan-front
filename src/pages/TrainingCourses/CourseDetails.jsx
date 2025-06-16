import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MenuIcon from "@mui/icons-material/Menu";
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
import FlippingCardIcon from "../../assets/icons/flippingCard.svg?react";
import TimelineIcon from "../../assets/icons/timeline.svg?react";
import { formatLongText } from "../../utils/helpers";
import CustomVideoPlayer from "./components/CustomVideoPlayer";
import website_client from "../../utils/apis/client/client";
import { useMobileDetection, MobileLessonsModal } from "./components/MobileElements";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [chosenCategory, setChosenCategory] = useState(null);
  const [chosenLesson, setChosenLesson] = useState(null);
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
  const [showQAModal, setShowQAModal] = useState(false);
  // Mobile/Tablet states
  const isMobileOrTablet = useMobileDetection();
  const [showMobileLessonsModal, setShowMobileLessonsModal] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // وظيفة الرجوع للصفحة السابقة
  const handleBackClick = () => {
    navigate(-1); // الرجوع للصفحة السابقة
  };

  // Fetch course data from API
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await website_client.get(`/mycourse/${id}`);
        
        if (response.data) {
          const apiData = response.data;
          
          // Transform API data to match component structure
          const transformedData = {
            ...apiData.course,
            data: {
              categories: (apiData.chapters || []).sort((a, b) => (a.order_number || 0) - (b.order_number || 0))
                .map(chapter => ({
                  id: chapter.id,
                  title: chapter.title || 'فصل بدون عنوان',
                  lessons: (apiData.lessons || []).filter(lesson => lesson.chapter_id === chapter.id)
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map(lesson => {
                      try {
                        // Find associated exams for this lesson
                        const lessonExams = (apiData.exams || []).filter(exam => exam.lesson_id === lesson.id);
                        
                        return {
                          id: lesson.id,
                          type: lesson.type || 'video',
                          title: lesson.title || 'درس بدون عنوان',
                          description: lesson.video?.description || lesson.title || 'لا يوجد وصف',
                          content: {
                            title: lesson.title || 'درس بدون عنوان',
                            description: lesson.video?.description || lesson.title || 'لا يوجد وصف',
                            src: lesson.video?.stream_url || null,
                            video: lesson.video?.stream_url || null,
                            // اختبار كامل يحتوي على أسئلة متعددة
                            exam: lesson.type === 'exam' && lessonExams.length > 0 ? 
                              lessonExams[0] : null,
                            // الأسئلة مباشرة للاختبار
                            questions: lesson.type === 'exam' && lessonExams.length > 0 ? 
                              lessonExams[0].questions.map(question => ({
                                id: question.id,
                                question: question.title || 'سؤال بدون نص',
                                description: question.description,
                                type: question.type,
                                score: question.score,
                                options: (question.options || []).map(option => ({
                                  id: option.id,
                                  text: option.text,
                                  isCorrect: option.is_correct
                                })),
                                correctAnswer: question.options?.find(opt => opt.is_correct)?.text || null
                              })) : [],
                            // الأدوات التفاعلية
                            tools: lesson.tools || [],
                            // البطاقات للأدوات التفاعلية (flipping cards و timeline)
                            cards: lesson.tools ? lesson.tools.map(tool => ({
                              id: tool.id,
                              title: tool.title,
                              description: tool.description || tool.content,
                              content: tool.content,
                              image: tool.image,
                              color: tool.color,
                              order: tool.order,
                              sequence: tool.sequence,
                              year: tool.year,
                              front: tool.title,
                              back: tool.description || tool.content,
                              isFlipped: false
                            })) : []
                          },
                          video: lesson.video || null,
                          exams: lessonExams || [],
                          tools: lesson.tools || []
                        };
                      } catch (lessonError) {
                        console.error("Error transforming lesson:", lessonError, lesson);
                        return {
                          id: lesson.id,
                          type: 'video',
                          title: lesson.title || 'درس بدون عنوان',
                          description: 'خطأ في تحميل بيانات الدرس',
                          content: {
                            title: lesson.title || 'درس بدون عنوان',
                            description: 'خطأ في تحميل بيانات الدرس',
                            src: null,
                            video: null,
                            exam: null,
                            questions: [],
                            tools: []
                          },
                          video: null,
                          exams: [],
                          tools: []
                        };
                      }
                    })
                }))
            }
          };
          
          console.log('Transformed data:', transformedData);
          setCourseData(transformedData);
          
          // Set initial states if course has categories and lessons
          if (transformedData?.data?.categories?.length > 0) {
            const firstCategory = transformedData.data.categories[0];
            const firstLesson = firstCategory.lessons?.[0];
            
            if (firstLesson) {
              setChosenCategory(firstCategory);
              setChosenLesson(firstLesson);
              setSelectedLesson(firstLesson);
            }
          }
        } else {
          setError("فشل في تحميل بيانات المادة - لا توجد بيانات");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        console.error("Error details:", {
          message: error.message,
          response: error.response,
          status: error.response?.status,
          data: error.response?.data
        });
        
        if (error.response?.status === 404) {
          setError("المادة غير موجودة");
        } else if (error.response?.status === 401) {
          setError("يجب تسجيل الدخول للوصول إلى هذه المادة");
        } else if (error.response?.status === 403) {
          setError("ليس لديك صلاحية للوصول إلى هذه المادة");
        } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
          setError("خطأ في الاتصال بالشبكة. الرجاء المحاولة مرة أخرى");
        } else {
          setError(error.response?.data?.message || error.message || "حدث خطأ في تحميل المادة");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id]);

  // Handle video source change when lesson changes
  useEffect(() => {
    if (chosenLesson && videoRef.current) {
      videoRef.current.load();
    }
  }, [chosenLesson]);

  const handleQuickQuestion = (questionText) => {
    setQuestion(questionText);
    handleAskQuestion(questionText);
  };

  const handleAskQuestion = async (questionText = question) => {
    if (!questionText.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", content: questionText, timestamp: new Date() },
    ]);

    setIsLoading(true);

    // Enhanced AI response based on lesson content
    const lessonContext = chosenLesson?.content?.description || chosenLesson?.description || "";
    const lessonTitle = chosenLesson?.content?.title || chosenLesson?.title || "";
    
    let aiResponse = "";
    
    if (questionText.includes("النقاط الرئيسية") || questionText.includes("الأساسيات")) {
      aiResponse = `بناءً على محتوى الدرس "${lessonTitle}"، إليك النقاط الرئيسية:

1. ${lessonContext ? lessonContext.substring(0, 100) + "..." : "المفاهيم الأساسية للموضوع"}
2. التطبيق العملي والممارسة
3. الأمثلة والتمارين التفاعلية
4. ربط المعلومات بالواقع العملي

هل تريد التوسع في أي من هذه النقاط؟`;
    } else if (questionText.includes("شرح") || questionText.includes("أبسط")) {
      aiResponse = `سأشرح لك الموضوع بطريقة مبسطة:

الدرس "${lessonTitle}" يركز على تعليمك المفاهيم بشكل تدريجي. 

تخيل الأمر كبناء منزل:
🏗️ نبدأ بالأساسات (المفاهيم الأساسية)
🧱 ثم نضع الطوب (التفاصيل والأمثلة)  
🏠 وأخيراً نكمل البناء (التطبيق العملي)

هل هناك جزء معين تريد شرحاً أكثر تفصيلاً له؟`;
    } else if (questionText.includes("تطبيق") || questionText.includes("ممارسة")) {
      aiResponse = `للتطبيق العملي لما تعلمته في "${lessonTitle}":

📝 **خطوات التطبيق:**
1. راجع المفاهيم الأساسية أولاً
2. ابدأ بأمثلة بسيطة
3. تدرج إلى مشاريع أكثر تعقيداً
4. اطلب المساعدة عند الحاجة

💡 **نصيحة:** الممارسة اليومية لمدة 30 دقيقة أفضل من جلسة طويلة مرة واحدة.

هل تريد اقتراحات لتمارين عملية محددة؟`;
    } else {
      aiResponse = `شكراً لسؤالك حول "${lessonTitle}".

${lessonContext ? `بناءً على محتوى الدرس: ${lessonContext.substring(0, 150)}...` : ""}

إليك بعض النصائح المفيدة:
• راجع الفيديو مرة أخرى إذا لم تفهم نقطة معينة
• اكتب ملاحظات أثناء المشاهدة
• طبق ما تعلمته فوراً
• لا تتردد في طرح المزيد من الأسئلة

هل يمكنك توضيح سؤالك أكثر لأتمكن من مساعدتك بشكل أفضل؟`;
    }

    setTimeout(() => {
      setIsLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", content: aiResponse, timestamp: new Date() },
      ]);
    }, 1500);

    setQuestion("");
  };

  const clearChat = () => {
    setMessages([]);
  };

  const handleLessonClick = (lesson, category) => {
    setSelectedLesson(lesson);
    setChosenLesson(lesson);
    setChosenCategory(category);
    
    // إغلاق مودال الدروس في الجوال/التابلت
    if (isMobileOrTablet) {
      setShowMobileLessonsModal(false);
    }
    
    // Reset states
    setChosenExam(null);
    
    if (lesson.type === "exam") {
      setChosenExam(lesson.content);
    }
  };

  useEffect(() => {
    setExamStarted(false);
    setExamAnswers({});
    setExamResults(null);
    setShowError(false);
    setSelectedTimelineItem(null);
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
        (count, question, index) => {
          const selectedAnswer = examAnswers[index];
          const correctOption = question.options?.find(option => option.isCorrect);
          return count + (selectedAnswer === correctOption?.text ? 1 : 0);
        },
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="text-center">
          <h4 className="text-danger">{error}</h4>
          {error.includes("تسجيل الدخول") && (
            <button 
              className="btn btn-primary mt-3 me-2" 
              onClick={() => window.location.href = '/login'}
            >
              تسجيل الدخول
            </button>
          )}
          <button 
            className="btn btn-secondary mt-3" 
            onClick={() => window.location.reload()}
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="text-center">
          <h4>لم يتم العثور على المادة</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="all-info-top-header main-info-top mb-5 acadmy-single-course">
      <div className="TablePageHeader">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name">
            {/* زر القائمة للجوال والتابلت */}
            {isMobileOrTablet && (
              <motion.button
                className={classes.mobileLessonsButton}
                onClick={() => setShowMobileLessonsModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MenuIcon />
              </motion.button>
            )}
            
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}>
              {courseData?.title || "الدورات التدريبية"}
              {chosenLesson && (
                <>
                  <span style={{ margin: "0 10px", color: "#A3AED0" }}>•</span>
                  <span style={{ color: "#0062ff", fontWeight: "600" }}>
                    {chosenLesson?.content?.title || chosenLesson?.title}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="updateBtn" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
            الرجوع <KeyboardBackspaceIcon />
          </div>
        </div>
      </div>

      <div
        className={`${classes.dashboard} ${classes.lessonsListandCategoryParent}`}
      >
        {/* إخفاء الأكورديون في الجوال والتابلت */}
        {!isMobileOrTablet && (
          <div className={`${classes.sidebar} ${classes.left}`}>
            {courseData?.data?.categories?.length > 0 ? (
              <CustomAccordion
                data={courseData.data.categories}
                defaultExpanded={expanded}
                onPanelChange={handleAccordionChange}
                renderSummary={(category, i) => (
                  <p className={classes.accordionSummary}>
                    <span className={classes.categoryTitle}>
                      {category.title}
                    </span>
                    <span className={classes.lessonCount}>
                      ({i + 1}/{category.lessons?.length || 0})
                    </span>
                  </p>
                )}
                renderDetails={(category) => (
                  <div className={classes.accordionDetails}>
                    {category.lessons?.map((lesson, index) => (
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
                        ) : lesson.type === "exam" ? (
                          <Examtype
                            alt="lesson type"
                            className={`${classes.lessonType} ${
                              selectedLesson === lesson
                                ? classes.lessonTypeActive
                                : ""
                            }`}
                          />
                        ) : lesson.type === "tool" && lesson.content?.tools?.some(tool => tool.image) ? (
                          <FlippingCardIcon
                            alt="flipping card lesson"
                            className={`${classes.lessonType} ${
                              selectedLesson === lesson
                                ? classes.lessonTypeActive
                                : ""
                            }`}
                          />
                        ) : lesson.type === "tool" && lesson.content?.tools?.some(tool => tool.order !== undefined || tool.sequence !== undefined) ? (
                          <TimelineIcon
                            alt="timeline lesson"
                            className={`${classes.lessonType} ${
                              selectedLesson === lesson
                                ? classes.lessonTypeActive
                                : ""
                            }`}
                          />
                        ) : lesson.type === "tool" ? (
                          <Videotype
                            alt="tool lesson"
                            className={`${classes.lessonType} ${
                              selectedLesson === lesson
                                ? classes.lessonTypeActive
                                : ""
                            }`}
                          />
                        ) : (
                          <Videotype
                            alt="lesson type"
                            className={`${classes.lessonType} ${
                              selectedLesson === lesson
                                ? classes.lessonTypeActive
                                : ""
                            }`}
                          />
                        )}
                        <span>
                          {lesson.type === "exam" && lesson.content?.exam?.title
                            ? lesson.content.exam.title
                            : lesson?.content?.title || lesson?.title}
                        </span>
                      </div>
                    )) || <p>لا توجد دروس في هذه الفئة</p>}
                  </div>
                )}
              />
            ) : (
              <motion.div 
                className="text-center p-4" 
                style={{
                  background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                  borderRadius: '15px',
                  border: '2px dashed #ff6b6b',
                  boxShadow: '0 6px 20px rgba(255, 107, 107, 0.15)',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  filter: 'blur(25px)'
                }} />
                
                <motion.div 
                  style={{ 
                    fontSize: '42px', 
                    marginBottom: '12px',
                    filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))'
                  }}
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: [0.8, 1.1, 1],
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{ 
                    scale: { duration: 0.6 },
                    rotate: { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  📚
                </motion.div>
                
                <motion.h5 
                  style={{ 
                    marginBottom: '8px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  محتوى المادة قيد التنظيم 📖
                </motion.h5>
                
                <motion.p 
                  style={{ 
                    opacity: 0.9,
                    fontSize: '13px',
                    textAlign: 'center',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    margin: 0
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  سيتم تنظيم الفصول والدروس قريباً
                </motion.p>
              </motion.div>
            )}
          </div>
        )}
        <div className={`${classes.content} ${classes.lessonsVideo} ${isMobileOrTablet ? classes.fullWidthContent : ''}`}>
          {!chosenLesson ? (
            <div className="text-center p-5">
              <h4>اختر درساً من القائمة الجانبية لبدء التعلم</h4>
              {courseData?.data?.categories?.length === 0 && (
                <p className="text-muted mt-3">هذه المادة لا تحتوي على محتوى حالياً</p>
              )}
            </div>
          ) : chosenLesson?.type === "exam" ? (
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
                  {chosenLesson?.content?.questions?.length > 0 ? (
                    <div className={classes.questionsGrid}>
                      {chosenLesson.content.questions.map((question, index) => (
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
                            {question.question}
                            {question.description && (
                              <p className={classes.questionDescription}>{question.description}</p>
                            )}
                            {showError && !examAnswers[index] && (
                              <span className={classes.errorText}>* مطلوب</span>
                            )}
                          </h5>
                          {question.options?.length > 0 ? (
                            question.options.map((option, ansIndex) => (
                              <div
                                key={ansIndex}
                                className={`${classes.chooseQuestionAnswer}`}
                                onClick={() => handleAnswerChange(index, option.text)}
                              >
                                <input
                                  type="radio"
                                  id={`q${index}a${ansIndex}`}
                                  name={`question${index}`}
                                  checked={examAnswers[index] === option.text}
                                  readOnly
                                />
                                <label htmlFor={`q${index}a${ansIndex}`}>{option.text}</label>
                              </div>
                            ))
                          ) : (
                            <p>لا توجد خيارات لهذا السؤال</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div 
                      className="text-center p-5" 
                      style={{ 
                        backgroundColor: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)', 
                        borderRadius: '18px', 
                        border: '2px dashed #9c27b0',
                        boxShadow: '0 8px 25px rgba(156, 39, 176, 0.15)',
                        margin: '20px 0',
                        minHeight: '280px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Background decoration */}
                      <div style={{
                        position: 'absolute',
                        top: '-30px',
                        left: '-30px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        filter: 'blur(30px)'
                      }} />
                      <div style={{
                        position: 'absolute',
                        bottom: '-40px',
                        right: '-40px',
                        width: '130px',
                        height: '130px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.08)',
                        filter: 'blur(40px)'
                      }} />
                      
                      <motion.div 
                        style={{ 
                          fontSize: '56px', 
                          marginBottom: '18px',
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                        }}
                        initial={{ scale: 0.8, rotateZ: 0 }}
                        animate={{ 
                          scale: [0.8, 1.1, 1],
                          rotateZ: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          scale: { duration: 0.8 },
                          rotateZ: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        📝
                      </motion.div>
                      
                      <motion.h4 
                        style={{ 
                          marginBottom: '10px',
                          fontSize: '22px',
                          fontWeight: 'bold',
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        الاختبار قيد الإعداد 📋
                      </motion.h4>
                      
                      <motion.p 
                        style={{ 
                          opacity: 0.9,
                          fontSize: '16px',
                          lineHeight: '1.6',
                          maxWidth: '380px',
                          textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          textAlign: 'center'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        نعمل حالياً على إعداد أسئلة تفاعلية لاختبار فهمك للدرس
                        <br />
                        <span style={{ fontSize: '14px', opacity: 0.8 }}>
                          🎯 سيكون متاحاً قريباً لتقييم مستواك
                        </span>
                      </motion.p>
                      
                      <motion.div
                        style={{
                          marginTop: '18px',
                          padding: '10px 20px',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: '500',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                      >
                        💪 استمر في التعلم من الدروس الأخرى
                      </motion.div>
                    </motion.div>
                  )}
                  {chosenLesson?.content?.questions?.length > 0 && (
                    <motion.button
                      className={classes.startExam}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmitExam}
                    >
                      تسليم الاختبار
                      <ArrowBackIcon />
                    </motion.button>
                  )}
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
                      "--timeline-color-rgb": card.color ? 
                        card.color.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ') : 
                        "0, 98, 255",
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
                  x: selectedTimelineItem !== null ? 0 : 30,
                }}
                transition={{ duration: 0.5 }}
              >
                {selectedTimelineItem !== null && (
                  <motion.div
                    className={classes.timelineCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      "--timeline-color":
                        chosenLesson?.content?.cards[selectedTimelineItem]
                          .color || "#0062ff",
                      "--timeline-color-rgb": chosenLesson?.content?.cards
                        .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                        [selectedTimelineItem]?.color ? 
                        chosenLesson.content.cards
                          .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                          [selectedTimelineItem].color.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ') : 
                        "0, 98, 255",
                    }}
                  >
                    <div className={classes.cardYear}>
                      {chosenLesson?.content?.cards
                        .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                        [selectedTimelineItem]?.year || 
                       chosenLesson?.content?.cards
                        .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                        [selectedTimelineItem]?.order ||
                       chosenLesson?.content?.cards
                        .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                        [selectedTimelineItem]?.sequence ||
                       `المرحلة ${selectedTimelineItem + 1}`}
                    </div>
                    <div className={classes.cardTitle}>
                      {chosenLesson?.content?.cards
                        .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                        [selectedTimelineItem]?.title}
                    </div>
                    <div className={classes.cardDescription}>
                      {chosenLesson?.content?.cards
                        .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                        [selectedTimelineItem]?.description}
                    </div>
                    {chosenLesson?.content?.cards
                      .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                      [selectedTimelineItem]?.image && (
                      <img
                        src={
                          chosenLesson.content.cards
                            .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                            [selectedTimelineItem].image
                        }
                        alt={
                          chosenLesson.content.cards
                            .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                            [selectedTimelineItem].title
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
          ) : chosenLesson?.type === "tool" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: "0",
                backgroundColor: "transparent",
                margin: "20px 0"
              }}
            >
              {/* التحقق من نوع الأدوات وعرضها بالشكل المناسب */}
              {chosenLesson?.content?.tools?.some(tool => tool.image) ? (
                // عرض البطاقات المنقلبة إذا كانت تحتوي على صور
                <motion.div
                  className={classes.flippingCardsContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {chosenLesson.content.tools.map((tool, index) => (
                    <motion.div
                      key={index}
                      className={classes.flipCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={`${classes.flipCardInner} ${
                          tool.isFlipped ? classes.isFlipped : ""
                        }`}
                        onClick={() => {
                          const updatedTools = [...chosenLesson.content.tools];
                          updatedTools[index] = {
                            ...tool,
                            isFlipped: !tool.isFlipped,
                          };
                          setChosenLesson((prev) => ({
                            ...prev,
                            content: { ...prev.content, tools: updatedTools },
                          }));
                        }}
                        style={{
                          "--card-color": tool.color || "#667eea",
                        }}
                      >
                        <div className={classes.flipCardFront}>
                          <h3>{tool.title}</h3>
                          <p className={classes.frontHint}>انقر للمزيد</p>
                        </div>
                        <div className={classes.flipCardBack}>
                          <h4>{tool.title}</h4>
                          <p>{tool.description}</p>
                          {tool.image && (
                            <div className={classes.imageContainer}>
                              <img
                                src={tool.image}
                                alt={tool.title}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/images/placeholder.png";
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : chosenLesson?.content?.tools?.some(tool => tool.order !== undefined || tool.sequence !== undefined) ? (
                // عرض التايم لاين إذا كانت تحتوي على ترتيب
                <motion.div
                  className={classes.timelineContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={classes.timelineList}>
                    {chosenLesson.content.tools
                      .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                      .map((tool, index) => (
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
                          "--timeline-color": tool.color ? 
                            `linear-gradient(135deg, ${tool.color} 0%, ${tool.color}dd 100%)` : 
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        }}
                      >
                        <div className={classes.timelineDot} />
                        <div className={classes.timelineTitle}>{tool.title}</div>
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
                      x: selectedTimelineItem !== null ? 0 : 30,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {selectedTimelineItem !== null && (
                      <motion.div
                        className={classes.timelineCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          "--timeline-color":
                            chosenLesson?.content?.tools
                              .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                              [selectedTimelineItem]?.color ? 
                              `linear-gradient(135deg, ${chosenLesson.content.tools
                                .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                                [selectedTimelineItem].color} 0%, ${chosenLesson.content.tools
                                .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                                [selectedTimelineItem].color}dd 100%)` :
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        }}
                      >
                        <div className={classes.cardYear}>
                          {chosenLesson?.content?.tools
                            .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                            [selectedTimelineItem]?.year || 
                           chosenLesson?.content?.tools
                            .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                            [selectedTimelineItem]?.order ||
                           chosenLesson?.content?.tools
                            .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                            [selectedTimelineItem]?.sequence ||
                           `المرحلة ${selectedTimelineItem + 1}`}
                        </div>
                        <div className={classes.cardTitle}>
                          {chosenLesson?.content?.tools
                            .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                            [selectedTimelineItem]?.title}
                        </div>
                        <div className={classes.cardDescription}>
                          {chosenLesson?.content?.tools
                            .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                            [selectedTimelineItem]?.description}
                        </div>
                        {chosenLesson?.content?.tools
                          .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                          [selectedTimelineItem]?.image && (
                          <img
                            src={
                              chosenLesson.content.tools
                                .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                                [selectedTimelineItem].image
                            }
                            alt={
                              chosenLesson.content.tools
                                .sort((a, b) => (a.order || a.sequence || 0) - (b.order || b.sequence || 0))
                                [selectedTimelineItem].title
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
                // العرض الافتراضي للأدوات العادية
                <div 
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px"
                  }}
                >
                  {chosenLesson?.content?.tools?.map((tool, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "20px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        border: `3px solid ${tool.color || "#007bff"}`,
                      }}
                    >
                      <div>
                        <h4 
                          style={{
                            color: tool.color || "#007bff",
                            marginBottom: "10px",
                            fontSize: "18px",
                            fontWeight: "bold"
                          }}
                        >
                          {tool.title}
                        </h4>
                        <p 
                          style={{
                            color: "#666",
                            lineHeight: "1.6",
                            margin: 0
                          }}
                        >
                          {tool.description}
                        </p>
                      </div>
                    </motion.div>
                  )) || (
                    <motion.div 
                      className="text-center p-5" 
                      style={{ 
                        backgroundColor: 'linear-gradient(135deg, #f1f3f4 0%, #e8eaed 100%)', 
                        borderRadius: '16px', 
                        border: '2px dashed #ffc107',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                        margin: '20px 0',
                        minHeight: '250px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Background decoration */}
                      <div style={{
                        position: 'absolute',
                        top: '-40px',
                        right: '-40px',
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.15)',
                        filter: 'blur(35px)'
                      }} />
                      
                      <motion.div 
                        style={{ 
                          fontSize: '48px', 
                          marginBottom: '16px',
                          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))'
                        }}
                        initial={{ scale: 0.8 }}
                        animate={{ 
                          scale: [0.8, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          scale: { duration: 0.8 },
                          rotate: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        🛠️
                      </motion.div>
                      
                      <motion.h4 
                        style={{ 
                          marginBottom: '8px',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        الأدوات التفاعلية قيد الإعداد 🔧
                      </motion.h4>
                      
                      <motion.p 
                        style={{ 
                          opacity: 0.9,
                          fontSize: '14px',
                          lineHeight: '1.5',
                          maxWidth: '350px',
                          textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          textAlign: 'center'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        نعمل على إضافة أدوات تفاعلية رائعة لتحسين تجربة التعلم
                        <br />
                        <span style={{ fontSize: '12px', opacity: 0.8 }}>
                          ⚡ ستكون متاحة قريباً لتعزيز فهمك
                        </span>
                      </motion.p>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <div className={classes.videoContent}>
              <div className={classes.Course}>
                {(() => {
                  const token = Cookies.get("student_token");
                  let videoUrl = chosenLesson?.video?.stream_url || chosenLesson?.content?.src || chosenLesson?.content?.video;
                  
                  // Check if the URL already has query params
                  if (videoUrl && token) {
                    const url = new URL(videoUrl);
                    if (!url.searchParams.has('token')) {
                       url.searchParams.append('token', token);
                    }
                    if (!url.searchParams.has('t')) {
                       url.searchParams.append('t', Date.now());
                    }
                    videoUrl = url.toString();
                  }
                  
                  return videoUrl ? (
                    <div className="video-container" style={{ 
                      maxWidth: '100%', 
                      margin: '0 auto',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '8px'
                    }}>
                      <video
                        ref={videoRef}
                        key={videoUrl} // Use the full URL as key to force re-render
                        style={{ 
                          width: '100%', 
                          maxHeight: '600px',
                          objectFit: 'contain',
                          backgroundColor: '#000'
                        }} 
                        controls 
                        controlsList="nodownload"
                        playsInline
                        onError={(e) => console.error('Video Error:', e, 'URL:', videoUrl)}
                      >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <motion.div 
                      className="text-center p-5" 
                      style={{ 
                        backgroundColor: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                        borderRadius: '20px', 
                        border: '2px dashed #bee5eb',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                        margin: '20px 0',
                        minHeight: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Background decoration */}
                      <div style={{
                        position: 'absolute',
                        top: '-50px',
                        right: '-50px',
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        filter: 'blur(40px)'
                      }} />
                      <div style={{
                        position: 'absolute',
                        bottom: '-30px',
                        left: '-30px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        filter: 'blur(30px)'
                      }} />
                      
                      {/* Content */}
                      <motion.div 
                        style={{ 
                          fontSize: '64px', 
                          marginBottom: '20px',
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                        }}
                        initial={{ scale: 0.8, rotateY: 0 }}
                        animate={{ 
                          scale: 1,
                          rotateY: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          scale: { duration: 0.6 },
                          rotateY: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        🎬
                      </motion.div>
                      
                      <motion.h3 
                        style={{ 
                          marginBottom: '12px',
                          fontSize: '24px',
                          fontWeight: 'bold',
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        المحتوى قيد التحضير ✨
                      </motion.h3>
                      
                      <motion.p 
                        style={{ 
                          opacity: 0.9,
                          fontSize: '16px',
                          lineHeight: '1.6',
                          maxWidth: '400px',
                          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        يعمل فريقنا بجد لإعداد محتوى رائع لهذا الدرس. سيكون متاحاً قريباً! 
                        <br />
                        <span style={{ fontSize: '14px', opacity: 0.8 }}>
                          💡 يمكنك الانتقال إلى الدروس الأخرى في الوقت الحالي
                        </span>
                      </motion.p>
                      
                      <motion.div
                        style={{
                          marginTop: '20px',
                          padding: '12px 24px',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: '25px',
                          fontSize: '14px',
                          fontWeight: '500',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                      >
                        🚀 ترقب التحديثات القادمة
                      </motion.div>
                    </motion.div>
                  );
                })()}

                {/* AI Assistant Button - Moved below video with same design */}
                <motion.button
                  className={classes.floatingQAButton}
                  onClick={() => setShowQAModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: 'static',
                    margin: '20px 0',
                    marginRight: 'auto',
                    display: 'flex',
                    width: 'fit-content'
                  }}
                >
                  <SmartToyIcon />
                  <span>مساعد التعلم الذكي</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Lessons Modal */}
      <MobileLessonsModal 
        isOpen={showMobileLessonsModal}
        onClose={() => setShowMobileLessonsModal(false)}
        categories={courseData?.data?.categories || []}
        selectedLesson={chosenLesson}
        onLessonClick={handleLessonClick}
      />

      {/* Q&A Modal */}
      <AnimatePresence>
        {showQAModal && (
          <motion.div
            className={classes.qaModalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQAModal(false)}
          >
            <motion.div
              className={classes.qaModal}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={classes.qaHeader}>
                <div className={classes.qaHeaderContent}>
                  <SmartToyIcon className={classes.aiIcon} />
                  <h3>مساعد التعلم الذكي</h3>
                </div>
                <div className={classes.qaHeaderActions}>
                  {messages.length > 0 && (
                    <button 
                      className={classes.clearChatBtn}
                      onClick={clearChat}
                      title="مسح المحادثة"
                    >
                      مسح
                    </button>
                  )}
                  <button 
                    className={classes.closeBtn}
                    onClick={() => setShowQAModal(false)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {messages.length === 0 && (
                <div className={classes.welcomeMessage}>
                  <h4>كيف يمكنني مساعدتك؟</h4>
                  <p>اسأل أي سؤال حول الدرس</p>
                </div>
              )}

              <div className={classes.quickQuestions}>
                <div className={classes.quickQuestionsGrid}>
                  <button onClick={() => handleQuickQuestion("ما هي النقاط الرئيسية في هذا الدرس؟")}>
                    النقاط الرئيسية
                  </button>
                  <button onClick={() => handleQuickQuestion("هل يمكن شرح هذا بطريقة أبسط؟")}>
                    شرح مبسط
                  </button>
                  <button onClick={() => handleQuickQuestion("كيف يمكنني تطبيق ما تعلمته؟")}>
                    كيفية التطبيق
                  </button>
                  <button onClick={() => handleQuickQuestion("ما هي أفضل الممارسات؟")}>
                    أفضل الممارسات
                  </button>
                </div>
              </div>

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
                      <div className={classes.messageContent}>
                        <p>{message.content}</p>
                        <span className={classes.messageTime}>
                          {message.timestamp?.toLocaleTimeString('ar-SA', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      className={`${classes.message} ${classes.aiMessage}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className={classes.typingIndicator}>
                        <span>جاري الكتابة</span>
                        <div className={classes.typingDots}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
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
                    onClick={() => handleAskQuestion()}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetails;



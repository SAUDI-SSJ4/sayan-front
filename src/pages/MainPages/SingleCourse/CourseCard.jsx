import React, { useState, useEffect } from "react";
import Style from "./SingleCourse.module.scss";
import ContentCourse from "../../../assets/icons/ContentCourse";
import CourseOutLine from "../../../assets/icons/CourseOutLine";
import CourseStar from "../../../assets/icons/CourseStar";
import fi_4626794 from "../../../assets/icons/fi_4626794.png";
import fi_860780 from "../../../assets/icons/fi_860780.png";
import AboutCourse from "../../../assets/icons/AboutCourse";
import BuyACourse from "./BuyACourse";
import { Link } from "react-router-dom";
import {
  handleRateStare,
  isObject,
  handleLevels,
} from "../../../utils/helpers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MainSpinner } from "../../../component/UI/MainSpinner";
import { ShoppingCart, PlayCircleOutline } from "@mui/icons-material";
import { useCart } from "../../../context/CartContext";
import toast from "react-hot-toast";
import { getStudentCourses } from "../../../utils/apis/client";
import Cookies from "js-cookie";

export const CourseCard = ({
  active,
  setActive,
  showBuyCourses,
  courseData,
  setshowBuyCourses,
  isLoading,
  academySettings,
}) => {
  const { addToCart, cartItems } = useCart();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isCheckingPurchase, setIsCheckingPurchase] = useState(true);

  // حماية الوصول لجميع الكائنات المطلوبة
  const course = isObject(courseData?.course) ? courseData.course : null;
  const academy = course?.academy && isObject(course.academy) ? course.academy : null;

  // التحقق مما إذا كان الطالب قد اشترى الدورة بالفعل
  useEffect(() => {
    const checkIfPurchased = async () => {
      const token = Cookies.get("student_token");
      if (!token || !course?.id) {
        setIsCheckingPurchase(false);
        return;
      }

      try {
        const myCourses = await getStudentCourses();
        setPurchasedCourses(myCourses || []);
        
        // التحقق مما إذا كانت الدورة الحالية موجودة في قائمة الدورات المشتراة
        const courseIsPurchased = Array.isArray(myCourses) && 
          myCourses.some(purchasedCourse => purchasedCourse.id === course.id);
        
        setIsPurchased(courseIsPurchased);
      } catch (error) {
        console.error("خطأ في التحقق من الدورات المشتراة:", error);
      } finally {
        setIsCheckingPurchase(false);
      }
    };

    checkIfPurchased();
  }, [course?.id]);

  const handleAddToCart = () => {
    // التحقق من وجود الطالب (تسجيل الدخول)
    const token = Cookies.get('student_token');
    if (!token) {
      toast.error("يجب تسجيل الدخول كطالب أولاً");
      return;
    }

    if (!course) {
      toast.error("بيانات المادة ناقصة");
      return;
    }

    // التحقق مما إذا كانت الدورة مضافة بالفعل في العربة
    const isAlreadyInCart = cartItems.some(item => item.item_id === course.id);
    if (isAlreadyInCart) {
      toast.info("هذه المادة مضافة بالفعل في عربة التسوق");
      return;
    }

    const courseItem = {
      id: course.id,
      title: course.title,
      price: course.price,
      image: course.image,
    };
    addToCart(courseItem);
    toast.success("تمت إضافة المادة إلى عربة التسوق");
  };

  const handleViewCourse = () => {
    // توجيه المستخدم إلى صفحة الدورة التدريبية
    window.location.href = `/student/Coursedetails/${course.id}`;
  };

  if (isLoading || isCheckingPurchase) {
    return <MainSpinner />;
  }

  return (
    <React.Fragment>
      {/* قسم عنوان الدورة والتقييم */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex flex-col gap-2">
          {/* عنوان الدورة */}
          <div>
            <h1 className="text-lg font-bold leading-tight academy-primary-text">
              {course?.title || "اسم المادة غير متوفر"}
            </h1>
          </div>
          
          {/* التقييم */}
          {course?.stars !== undefined && course?.stars !== null && (
            <div className="flex items-center">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${index < Math.floor(course?.stars || 0) ? 'text-yellow-300' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {showBuyCourses && (
        <BuyACourse
          courseId={course?.id}
          setshowBuyCourses={setshowBuyCourses}
        />
      )}
      <div className="row flex flex-wrap">
        <div className="col-lg-9 col-md-12 col-12 mt-3">
          <div className={Style.Course}>
            {course?.short_video ? (
              <div className="video-container" style={{ 
                maxWidth: '100%', 
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px'
              }}>
                <video 
                  style={{ 
                    width: '100%', 
                    maxHeight: '600px',
                    objectFit: 'contain',
                    backgroundColor: '#000'
                  }} 
                  controls 
                  controlsList="nodownload"
                  playsInline
                >
                  <source src={course.short_video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <p style={{ textAlign: 'center', padding: '20px' }}>الفيديو التعريفي غير متوفر</p>
            )}

            <div className={`${Style.Tabs} flex-wrap`}>
              <div
                className={active == 0 ? Style.Active : ""}
                onClick={() => setActive(0)}
              >
                <AboutCourse active={active == 0} />
                نبذة
              </div>

              <div
                className={active == 1 ? Style.Active : ""}
                onClick={() => setActive(1)}
              >
                <ContentCourse active={active == 1} />
                المحتوى
              </div>
              <div
                className={active == 2 ? Style.Active : ""}
                onClick={() => setActive(2)}
              >
                <CourseOutLine active={active == 2} />
                ماذا سوف يتعلم الطالب
              </div>
              <div
                className={active == 3 ? Style.Active : ""}
                onClick={() => setActive(3)}
              >
                <CourseStar active={active == 3} />
                تجربة الطلاب
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-12 col-12 mt-3 ">
          <div className={Style.detials}>
            <div className={Style.Price}>
              {isPurchased ? (
                <div style={{ color: academySettings?.primary_color || '#0062ff', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px' }}>
                  تم شراء هذه المادة مسبقاً
                </div>
              ) : (
                Number.isFinite(course?.price) ? `${course.price} ر.س.` : '---'
              )}
            </div>
            {isPurchased ? (
              <div 
                className={Style.JoinBtn} 
                onClick={handleViewCourse}
                style={{ backgroundColor: academySettings?.primary_color || '#0062ff' }}
              >
                عرض المادة التعليمية <PlayCircleOutline />
              </div>
            ) : (
              <div className={Style.JoinBtn} onClick={handleAddToCart}>
                اضافة الى العربة <ShoppingCart />
              </div>
            )}
            <div className="mt-4">
              <div className={Style.Line}>
                <img src={fi_4626794} alt="Level" />
                {handleLevels(course?.level)}
              </div>
              <div className={Style.Line}>
                <img src={fi_860780} alt="Lessons" />
                {course?.lessons_count ?? 0} دروس تعليمية
              </div>
            </div>
          </div>
          <div className={`${Style.detials} mt-3 text-center`}>
            <Link
              className="d-flex flex-column align-items-center text-decoration-none"
              to={
                academy?.id
                  ? `/acdemy/${academy.id}`
                  : "#"
              }
              tabIndex={academy?.id ? 0 : -1}
              style={academy?.id ? {} : { pointerEvents: "none", color: "#bbb" }}
            >
              <div className="mb-3">
                <img
                  src={academy?.image}
                  alt="Academy"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "15px",
                    objectFit: "cover",
                    border: `3px solid ${academySettings?.primary_color || '#0062ff'}`,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                  }}
                />
              </div>
              <h1 className>
                <div className>
                  <div className="text-center" style={{ fontSize: '22px' }}>
                    أكاديمية {academy?.name || "اسم الأكاديمية غير متوفر"}
                  </div>
                </div>
              </h1>
            </Link>
          </div>
          </div>
        </div>
    </React.Fragment>
  );
};
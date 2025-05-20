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
      toast.error("بيانات الدورة ناقصة");
      return;
    }

    // التحقق مما إذا كانت الدورة مضافة بالفعل في العربة
    const isAlreadyInCart = cartItems.some(item => item.item_id === course.id);
    if (isAlreadyInCart) {
      toast.info("هذه الدورة مضافة بالفعل في عربة التسوق");
      return;
    }

    const courseItem = {
      id: course.id,
      title: course.title,
      price: course.price,
      image: course.image,
    };
    addToCart(courseItem);
    toast.success("تمت إضافة الدورة إلى عربة التسوق");
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
      <div className={Style.CourseTitle}>
        <h2 className="p-0 m-0">
          {course?.title || "اسم الدورة غير متوفر"}
        </h2>
        <h4>
          {handleRateStare(course?.rated)}
        </h4>
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
                <div style={{ color: '#0062ff', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px' }}>
                  تم شراء هذه الدورة مسبقاً
                </div>
              ) : (
                Number.isFinite(course?.price) ? `${course.price} ر.س.` : '---'
              )}
            </div>
            {isPurchased ? (
              <div 
                className={Style.JoinBtn} 
                onClick={handleViewCourse}
                style={{ backgroundColor: '#0062ff' }}
              >
                عرض الدورة التدريبية <PlayCircleOutline />
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
              className="mt-4 d-flex justify-content-evenly align-items-center text-decoration-none"
              to={
                academy?.id
                  ? `/acdemy/${academy.id}`
                  : "#"
              }
              tabIndex={academy?.id ? 0 : -1}
              style={academy?.id ? {} : { pointerEvents: "none", color: "#bbb" }}
            >
              <img
                src={academy?.image}
                alt="Academy"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <h4>
                {academy?.name || "اسم الأكاديمية غير متوفر"}
              </h4>
            </Link>
            <span>
              {course?.created_at
                ? new Date(course.created_at).toLocaleDateString("ar-EG", { month: "short", day: "2-digit", year: "numeric" })
                : "تاريخ غير متوفر"}
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
import React from "react";
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
import { ShoppingCart } from "@mui/icons-material";
import { useCart } from "../../../context/CartContext";
import toast from "react-hot-toast";

export const CourseCard = ({
  active,
  setActive,
  showBuyCourses,
  courseData,
  setshowBuyCourses,
  isLoading,
}) => {
  const { addToCart } = useCart();

  if (isLoading) {
    return <MainSpinner />;
  }

  const handleAddToCart = () => {
    const course = {
      id: courseData.course.id,
      title: courseData.course.title,
      price: courseData.course.price,
      image: courseData.course.image,
    };
    addToCart(course);
    toast.success("تمت إضافة الدورة إلى عربة التسوق");
  };

  return (
    <React.Fragment>
      <div className={Style.CourseTitle}>
        <h2 className="p-0 m-0">
          {isObject(courseData?.course) && courseData.course.title}
        </h2>
        <h4>
          {isObject(courseData?.course) &&
            handleRateStare(courseData.course.rated)}
        </h4>
      </div>
      {showBuyCourses && (
        <BuyACourse
          courseId={isObject(courseData?.course) && courseData.course.id}
          setshowBuyCourses={setshowBuyCourses}
        />
      )}
      <div className="row flex">
        <div className="col-lg-9 col-md-12 col-12 mt-3">
          <div className={Style.Course}>
            {isObject(courseData?.course) && courseData.course.short_video ? (
              <video width="100%" controls controlsList="nodownload">
                <source src={courseData.course.short_video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Video not available</p>
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
              {isObject(courseData?.course) && courseData.course.price} ر.س.
            </div>
            <div className={Style.JoinBtn} onClick={handleAddToCart}>
              اضافة الى العربة <ShoppingCart />
            </div>
            <div className="mt-4">
              <div className={Style.Line}>
                <img src={fi_4626794} alt="Level" />
                {isObject(courseData?.course) &&
                  handleLevels(courseData.course.level)}
              </div>
              <div className={Style.Line}>
                <img src={fi_860780} alt="Lessons" />
                {isObject(courseData?.course) &&
                  courseData.course.lessons_count}{" "}
                دروس تعليمية
              </div>
            </div>
          </div>
          <div className={`${Style.detials} mt-3 text-center`}>
            <Link
              className="mt-4 d-flex justify-content-evenly align-items-center text-decoration-none"
              to={`/acdemy/${
                isObject(courseData?.course) && courseData.course.academy.id
              }`}
            >
              <img
                src={
                  isObject(courseData?.course) &&
                  courseData.course.academy.image
                }
                alt="Academy"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
              <h4>
                {isObject(courseData?.course) && courseData.course.academy.name}
              </h4>
            </Link>
            <span>Jan.01.2024</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

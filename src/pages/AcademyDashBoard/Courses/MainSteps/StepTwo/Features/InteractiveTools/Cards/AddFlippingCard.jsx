import React from "react";
import FlippingCard from "../../../../../../../../component/UI/FlippingCard";
import FlippingCardSideBar from "../../../../../SideBars/FlippingCardSideBar";
import style from "../../../../../AddNewCourse.module.css";
import { storage } from "../../../../../../../../utils/storage";
import { useSelector } from "react-redux";
import { latestLesson } from "../../../../../../../../../redux/CourseSlice";
const AddFlippingCard = ({
  flippingCards,
  setFlippingCards,
  cardData,
  setCardData,
}) => {

  const chapterId = storage.get('chapky89wsgnae')
  const lessonId = storage.get('leuhqzrsyh5e')
  const currentCourseId = storage.get("cousjvqpkbr3m")
  const getlatestLesson = useSelector((state) => latestLesson(state, chapterId, lessonId));

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div
          style={{
            position: "sticky",
            top: "20px",
            padding: "60px 40px",
          }}
          className="container"
        >
          <h3> الدرس :{getlatestLesson && getlatestLesson.title}</h3>
          <h4 style={{ textAlign: "center", marginBottom: "2rem", color: "#2b3674" }}>
            إنشاء بطاقة مخصصة
          </h4>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h5 style={{ color: "#2b3674" }}>معاينة البطاقة:</h5>
            <FlippingCard cardData={cardData} />
          </div>
        </div>
      </div>
      <div className={`${style.sidebar} ${style.right}`}>
        <FlippingCardSideBar
          cardData={cardData}
          setCardData={setCardData}
          flippingCards={flippingCards}
          setFlippingCards={setFlippingCards}
          latestLessonId={getlatestLesson.id || null}
        />
      </div>
    </div>
  );
};

export default AddFlippingCard;

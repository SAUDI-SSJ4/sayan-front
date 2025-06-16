import React from "react";
import FlippingCard from "../../../../../../../../component/UI/FlippingCard";
import FlippingCardSideBar from "../../../../../SideBars/FlippingCardSideBar";
import style from "../../../../../AddNewCourse.module.css";
import { Text } from "../../../../../../../../utils/styles";
const AddFlippingCard = ({
  flippingCards,
  setFlippingCards,
  cardData,
  setCardData,
  courseId,
  chapterId,
}) => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className="container">
          <Text size="20px" color="#575757" weight="600">
            <storage>Lesson : </storage>
          </Text>
          <h4
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "#2b3674",
            }}
          >
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
          courseId={courseId}
          chapterId={chapterId}
        />
      </div>
    </div>
  );
};

export default AddFlippingCard; 
import React, { useState } from "react";
import HiddenCardsSideBar from "../../../../../SideBars/HiddenCardsSideBar";
import style from "../../../../../AddNewCourse.module.css";
// Placeholder for CardHidden component, please import or define it
// import CardHidden from "../../../../../../../component/UI/CardHidden";

const AddHiddenCards = ({ courseId, chapterId }) => {
  const [cards, setCards] = useState([]);
  const [cardData, setCardData] = useState({
    title: "عنوان البطاقة المخفية",
    content: "محتوى البطاقة المخفية",
    image: null, // Or a default image path
    color: "#3498db",
  });

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className="container">
          <h4
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "#2b3674",
            }}
          >
            إنشاء بطاقات مخفية
          </h4>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h5 style={{ color: "#2b3674" }}>معاينة البطاقات (مثال):</h5>
            {/* Placeholder for displaying CardHidden components */}
            {/* cards.map((card, index) => <CardHidden key={index} cardData={card} />) */}
            <p>معاينة البطاقة المخفية ستظهر هنا.</p>
          </div>
        </div>
      </div>
      <div className={`${style.sidebar} ${style.right}`}>
        <HiddenCardsSideBar
          cardData={cardData}
          setCardData={setCardData}
          cards={cards}
          setCards={setCards}
          courseId={courseId}
          chapterId={chapterId}
        />
      </div>
    </div>
  );
};

export default AddHiddenCards; 
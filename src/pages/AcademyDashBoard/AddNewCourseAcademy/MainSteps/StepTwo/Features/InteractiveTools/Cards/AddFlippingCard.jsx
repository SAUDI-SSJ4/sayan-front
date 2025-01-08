import React, { useState } from "react";
import { Form, Button, Input } from "rsuite";
import FlippingCard from "../../../../../../../../component/UI/FlippingCard";
import FlippingCardSideBar from "../../../../../SideBars/FlippingCardSideBar";
import style from "../../../../../AddNewCourse.module.css";
const AddFlippingCard = ({
  flippingCards,
  setFlippingCards,
  cardData,
  setCardData,
}) => {
  return (
    <>
     <div className={style.content}>
      <div
        style={{
          position: "sticky",
          top: "20px",
          padding:"60px 40px",
        }}
        className="container"
        >
          <h3 style={{ textAlign: "center", marginBottom: "2rem", color:"#2b3674" }}>
            إنشاء بطاقة مخصصة
          </h3>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h5 style={{color:"#2b3674"}}>معاينة البطاقة:</h5>
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
            />
      </div>
    </>
  );
};

export default AddFlippingCard;

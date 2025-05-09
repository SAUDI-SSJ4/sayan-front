import React, { useState } from 'react';
import HiddenCard from '../../../../../../../../component/UI/HiddenCard';
import HiddenCardsSideBar from '../../../../../SideBars/HiddenCardsSideBar';
import style from '../../../../../AddNewCourse.module.css';

const AddHiddenCards = ({ hiddenCards, setHiddenCards, cardData, setCardData }) => {


  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className='container ' style={{ padding: "60px 40px" }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2b3674' }}>إنشاء بطاقة مخصصة</h3>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h5 style={{ color: '#2b3674' }}>معاينة البطاقة:</h5>
            <HiddenCard cardData={cardData} />
          </div>
        </div>
      </div>

      <div className={`${style.sidebar} ${style.right}`}>
        <HiddenCardsSideBar cardData={cardData} setCardData={setCardData} hiddenCards={hiddenCards} setHiddenCards={setHiddenCards} />
      </div>
    </div>
  );
};

export default AddHiddenCards;

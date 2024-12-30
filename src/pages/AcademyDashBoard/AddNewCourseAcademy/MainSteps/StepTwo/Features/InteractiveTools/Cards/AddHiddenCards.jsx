import React, { useState } from 'react';
import HiddenCard from '../../../../../../../../component/UI/HiddenCard';
import HiddenCardsSideBar from '../../../../../SideBars/HiddenCardsSideBar';
import style from '../../../../../AddNewCourse.module.css';

const AddHiddenCards = ({hiddenCards, setHiddenCards,cardData,setCardData}) => {
 

  return (
    <div className='d-flex flex-row p-5 mt-4'>

    <div className='container col-8 p-5 mt-4'>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>إنشاء بطاقة مخصصة</h3>
      

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h5>معاينة البطاقة:</h5>
        <HiddenCard cardData={cardData} />
      </div>
    </div>
    
    <div className={`${style.sidexld} col-4  d-flex`}>
          <div className={style.sideSettings}>
          <HiddenCardsSideBar cardData={cardData} setCardData={setCardData} hiddenCards={hiddenCards} setHiddenCards={setHiddenCards} />
         
          </div>
        </div>
    </div>
  );
};

export default AddHiddenCards;

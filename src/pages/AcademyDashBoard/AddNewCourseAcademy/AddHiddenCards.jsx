import React, { useState } from 'react';
import { Form, Button, Input } from 'rsuite';
import FlippingCard from '../../../component/UI/FlippingCard';
import ColorPickerWithPreview from '../../../component/UI/Inputs/ColorPicker';
import HiddenCard from '../../../component/UI/HiddenCard';
import HiddenCardsSideBar from './SideBars/HiddenCardsSideBar';

const AddHiddenCards = ({hiddenCards, setHiddenCards,cardData}) => {
 

  return (
    <div>

    <div className='container col-12 p-5 mt-4'>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>إنشاء بطاقة مخصصة</h3>
      

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h5>معاينة البطاقة:</h5>
        <HiddenCard cardData={cardData} />
      </div>
    </div>
    
    <div className={`${style.sidexld} d-flex`}>
          <div className={style.sideSettings}>
          <HiddenCardsSideBar cardData={cardData} setCardData={setCardData} hiddenCards={hiddenCards} setHiddenCards={setHiddenCards} />
         
          </div>
        </div>
    </div>
  );
};

export default AddHiddenCards;

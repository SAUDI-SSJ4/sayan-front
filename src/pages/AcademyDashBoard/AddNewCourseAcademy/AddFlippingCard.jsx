import React, { useState } from 'react';
import { Form, Button, Input } from 'rsuite';
import FlippingCard from '../../../component/UI/FlippingCard';
import ColorPickerWithPreview from '../../../component/UI/Inputs/ColorPicker';

const AddFlippingCard = ({flippingCards, setFlippingCards,cardData}) => {
  

  return (
    <div>

    <div >

    <div 
      style={{
        position: 'sticky',
        top: '20px',
        width: '100%',
      }} 
      className='container p-5'
      >
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>إنشاء بطاقة مخصصة</h3>
      


      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h5>معاينة البطاقة:</h5>
        <FlippingCard cardData={cardData} />
      </div>
    </div>
      </div>
      <div className={`${style.sidexld} d-flex`}>
          <div className={style.sideSettings}>
          <FlippingCardSideBar cardData={cardData} setCardData={setCardData} flippingCards={flippingCards} setFlippingCards={setFlippingCards} />
          </div>

        </div>
        </div>
  );
};

export default AddFlippingCard;

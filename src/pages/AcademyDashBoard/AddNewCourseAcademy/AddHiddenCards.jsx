import React, { useState } from 'react';
import { Form, Button, Input } from 'rsuite';
import FlippingCard from '../../../component/UI/FlippingCard';
import ColorPickerWithPreview from '../../../component/UI/Inputs/ColorPicker';
import HiddenCard from '../../../component/UI/HiddenCard';

const AddHiddenCards = ({hiddenCards, setHiddenCards,cardData}) => {
 

  return (
    <div className='container col-12 p-5 mt-4'>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>إنشاء بطاقة مخصصة</h3>
      

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h5>معاينة البطاقة:</h5>
        <HiddenCard cardData={cardData} />
      </div>
    </div>
  );
};

export default AddHiddenCards;

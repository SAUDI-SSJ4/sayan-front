import React, { useState } from 'react';
import { Form, Button, Input } from 'rsuite';
import FlippingCard from '../../../component/UI/FlippingCard';
import ColorPickerWithPreview from '../../../component/UI/Inputs/ColorPicker';

const AddFlippingCard = ({flippingCards, setFlippingCards}) => {
  const [cardData, setCardData] = useState({
    color: "#007bff",
    imageUrl: "https://via.placeholder.com/400x200",
    title: "عنوان البطاقة",
    content: "محتوى البطاقة يظهر هنا.",
  });

  const handleChange = (field, value) => {
    console.log(value)
    setCardData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleSubmit = () => {
    console.log(cardData)
    setFlippingCards([...flippingCards, cardData])
    setCardData({
      color: "#007bff",
      imageUrl: "https://via.placeholder.com/400x200",
      title: "عنوان البطاقة",
      content: "محتوى البطاقة يظهر هنا.",
    })
  }

  return (
    <div className='container col-12 p-5 mt-4'>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>إنشاء بطاقة مخصصة</h3>
      <Form  className='w-100'>
        <Form.Group className='CustomFormControl' >
          <Form.ControlLabel>عنوان البطاقة</Form.ControlLabel>
          <Input
          className='w-100'
            placeholder="أدخل عنوان البطاقة"
            value={cardData.title}
            onChange={(value) => handleChange('title', value)}
          />
        </Form.Group>

        <Form.Group className='CustomFormControl'>
          <Form.ControlLabel>رابط الصورة</Form.ControlLabel>
          <Input
            placeholder="أدخل رابط الصورة"
            value={cardData.imageUrl}
            onChange={(value) => handleChange('imageUrl', value)}
          />
        </Form.Group>

        <Form.Group className='CustomFormControl'>
          <Form.ControlLabel>محتوى البطاقة</Form.ControlLabel>
          <Input
            placeholder="أدخل محتوى البطاقة"
            value={cardData.content}
            onChange={(value) => handleChange('content', value)}
          />
        </Form.Group>

        <Form.Group className='CustomFormControl'>
          <ColorPickerWithPreview label={"لون البطاقة"} name={"لون البطاقة"} value={cardData.color} onChange={(value) => handleChange('color', value)} />
        </Form.Group>
        <div className='d-flex justify-content-center'>
          <Button className='btn btn-primary' onClick={handleSubmit}>انشاء البطاقة</Button>
        </div>
      </Form>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h5>معاينة البطاقة:</h5>
        <FlippingCard cardData={cardData} />
      </div>
    </div>
  );
};

export default AddFlippingCard;

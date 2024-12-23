import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'rsuite';
import { AiFillEye } from 'react-icons/ai';
import FlippingCard from '../../../../component/UI/FlippingCard';
import ColorPickerWithPreview from '../../../../component/UI/Inputs/ColorPicker';

const FlippingCardSideBar = ({ flippingCards, setFlippingCards,cardData, setCardData }) => {
  const [showPreview, setShowPreview] = useState(false);

  const toggleModal = () => setShowPreview(!showPreview);


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
    <div
      style={{ padding: '2rem', minWidth: '350px', margin: 'auto', color:'#2b3674' }}
      className="container col-12 p-5 mt-4"
    >

      <h4>إعدادات الأداة</h4>
      <div className="d-flex flex-column gap-2 border-bottom">
        <div className="d-flex justify-content-between p-2">
          <div>نوع الأداة:</div>
          <div>بطاقات مقلوبة</div>
        </div>
        <div>
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
        </div>


        <div className="d-flex justify-content-between p-2">
          <div>عدد البطاقات:</div>
          <div>{flippingCards?.length}</div>
        </div>
      </div>
      <div
        className="d-flex justify-content-start gap-2 align-items-center p-2 cursor-pointer"
        onClick={toggleModal}
        style={{cursor:'pointer'}}
      >
        معاينة الأداة <AiFillEye />
      </div>

      {/* Preview Modal */}
      <Modal open={showPreview} onClose={toggleModal} size="lg" centered>
        <Modal.Header>
          <Modal.Title>معاينة الأداة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {flippingCards.length > 0 ? (
              flippingCards.map((card, index) => (
               <FlippingCard key={index} cardData={card} />
              ))
            ) : (
              <p>لا توجد بطاقات للعرض.</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleModal} appearance="subtle">
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FlippingCardSideBar;

import React, { useState } from 'react';
import { Modal, Button, Form, Input, Dropdown } from 'rsuite';
import { AiFillEye } from 'react-icons/ai';
import FlippingCard from '../../../../component/UI/FlippingCard';
import ColorPickerWithPreview from '../../../../component/UI/Inputs/ColorPicker';
import { Delete } from '@mui/icons-material';
import { useCardMutation } from '../../../../services/mutation';
import { storage } from '../../../../utils/storage';
import { hasLessonContent } from '../../../../utils/helpers';
import { latestLesson } from '../../../../../redux/CourseSlice';
import { useSelector } from 'react-redux';
import { useToast } from '../../../../utils/hooks/useToast';

const FlippingCardSideBar = ({ flippingCards, setFlippingCards, cardData, setCardData, latestLessonId }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showPreview1, setShowPreview1] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);

  const toggleModal = () => setShowPreview(!showPreview);

  const handleChange = (field, value) => {
    setCardData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const currentCourseId = storage.get("cousjvqpkbr3m")

  const chapterId = storage.get('chapky89wsgnae')
  const lessonId = storage.get('leuhqzrsyh5e')
  const getlatestLesson = useSelector((state) => latestLesson(state, chapterId, lessonId));

  const mutation = useCardMutation(currentCourseId, latestLessonId)

  const { succes, error } = useToast()
  const handleSubmit = async () => {
    setFlippingCards([...flippingCards, cardData])
    // setCardData({
    //   color: "#007bff",
    //   image: "https://via.placeholder.com/400x200",
    //   title: "عنوان البطاقة",
    //   description: "محتوى البطاقة يظهر هنا.",
    // });
    setSelectedCardIndex(-1);

    cardData.order = 1;
    cardData.type = "tool";

    if (hasLessonContent(getlatestLesson, ['tool'])) {
      await mutation.mutateAsync(cardData);
    } else {
      error("قم بأنشاء درس جديد")
    }
  }

  const resetForm = () => {
    setCardData({
      color: "#007bff",
      image: "https://via.placeholder.com/400x200",
      title: "عنوان البطاقة",
      description: "محتوى البطاقة يظهر هنا.",
    });
    setSelectedCardIndex(-1);
  }

  const handleFileChange = (e) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      if (file) {
        handleChange('image', file);
      }
    }
  };



  return (
    <div
      style={{ width: '100%', margin: 'auto', color: '#2b3674' }}
      className="container col-12 p-2 mt-4"
    >


      <h4>إعدادات الأداة</h4>
      <div className="d-flex flex-column gap-2 border-bottom">
        <div className="d-flex justify-content-between p-2">
          <div>نوع الأداة:</div>
          <div>بطاقات مقلوبة</div>
        </div>
        <div>
          <div className='w-100'>
            <div className="d-flex row justify-content-center mt-4">
              {flippingCards.map((card, index) => (
                <div key={index} className="col-10 p-2" style={{
                  border: selectedCardIndex === index ? 'rgb(0, 123, 255)' : 'none',
                  backgroundColor: selectedCardIndex === index ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }} onClick={() => {
                  setCardData(card);
                  setSelectedCardIndex(index);
                  setShowPreview1(true);
                }} >
                  <FlippingCard
                    cardData={card}

                  />
                  {selectedCardIndex === index && (
                    <Button
                      appearance="ghost"
                      color='red'
                      onClick={() => {
                        setFlippingCards(
                          flippingCards.filter((c) => c !== card)
                        );
                        setShowPreview1(false);
                      }}
                    >
                      <Delete />
                      حذف
                    </Button>
                  )}
                </div>
              ))}
            </div>

          </div>

          <Form className='w-100'>
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
              <Form.ControlLabel>صورة البطاقة</Form.ControlLabel>
              <Input
                type="file"
                onChange={(e) => handleFileChange(e)}
              />
            </Form.Group>

            <Form.Group className='CustomFormControl'>
              <Form.ControlLabel>محتوى البطاقة</Form.ControlLabel>
              <Input
                placeholder="أدخل محتوى البطاقة"
                value={cardData.description}
                onChange={(value) => handleChange('description', value)}
              />
            </Form.Group>

            <Form.Group className='CustomFormControl'>
              <ColorPickerWithPreview label={"لون البطاقة"} name={"لون البطاقة"} value={cardData.color} onChange={(value) => handleChange('color', value)} />
            </Form.Group>
            <div className='d-flex justify-content-center gap-2'>
              {selectedCardIndex !== -1 ? (
                <>
                  <Button className='btn btn-primary' onClick={() => {
                    const updatedCards = [...flippingCards];
                    updatedCards[selectedCardIndex] = { ...cardData };
                    setFlippingCards(updatedCards);
                    resetForm();
                  }}>تحديث البطاقة</Button>
                  <Button className='btn btn-secondary' onClick={resetForm}>إلغاء</Button>
                </>
              ) : (
                <Button className='btn btn-primary' onClick={handleSubmit}>انشاء البطاقة</Button>
              )}
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
        style={{ cursor: 'pointer' }}
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

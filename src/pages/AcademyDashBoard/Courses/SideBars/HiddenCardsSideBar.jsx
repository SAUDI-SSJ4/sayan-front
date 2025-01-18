import React, { useState } from 'react';
import { Modal, Button, Stack, Panel, Form, Input, Uploader } from 'rsuite';
import { AiFillEye } from 'react-icons/ai';
import HiddenCard from '../../../../component/UI/HiddenCard';
import ColorPickerWithPreview from '../../../../component/UI/Inputs/ColorPicker';
import { useCardMutation } from '../../../../services/mutation';
import { storage } from '../../../../utils/storage';
import { hasLessonContent } from '../../../../utils/helpers';
import { useToast } from '../../../../utils/hooks/useToast';
import { useSelector } from 'react-redux';
import { latestLesson } from '../../../../../redux/CourseSlice';

const HiddenCardsSideBar = ({ hiddenCards, setHiddenCards, cardData, setCardData }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (field, value) => {
    if (field === 'order') {
      const newOrder = parseInt(value);
      const existingCardWithOrder = hiddenCards.find(card => card.order === newOrder);
      if (existingCardWithOrder) {
        const updatedCards = hiddenCards.map(card => {
          if (card.order === newOrder)
            return { ...card, order: hiddenCards.length + 1 };
          return card;
        });
        setHiddenCards(updatedCards);
      }
      setCardData(prevData => ({ ...prevData, order: newOrder }));
    } else {
      setCardData(prevData => ({ ...prevData, [field]: value }));
    }
  };

  const currentCourseId = storage.get("cousjvqpkbr3m")
  const latestLessonId = storage.get("leuhqzrsyh5e")
  const chapterId = storage.get('chapky89wsgnae')

  const getlatestLesson = useSelector((state) => latestLesson(state, chapterId, latestLessonId));

  const { error } = useToast()

  const mutation = useCardMutation(currentCourseId, latestLessonId)

  const handleSubmit = async () => {
    setHiddenCards([...hiddenCards, cardData])
    cardData.type = "tool";

    if (hasLessonContent(getlatestLesson, ['tool'])) {
      await mutation.mutateAsync(cardData);
    } else {
      error("قم بأنشاء درس جديد")
    }

  }



  const toggleModal = () => setShowPreview(!showPreview);

  const [displayCard, setDisplayCard] = useState(null);


  const handleFileChange = (fileList) => {
    if (fileList.length > 0) {
      const file = fileList[fileList.length - 1].file;
      if (file) {
        const image = URL.createObjectURL(file); // Create a URL for the selected file
        handleChange('image', image); // Store the image URL in the state
      }
    }
  };

  return (
    <div
      className="container col-12 p-4 mt-4"
    >
      <h4>إعدادات الأداة</h4>
      <div className="d-flex flex-column gap-2 border-bottom">
        <div className="d-flex justify-content-between p-2">
          <div>نوع الأداة:</div>
          <div>الاداة التعليمية </div>
        </div>
        <div>
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

            <Form.ControlLabel>صورة البطاقة</Form.ControlLabel>
            <Form.Group className='CustomFormControl'>
              <Input
                type='file'
                // value={cardData.image}
                onChange={(fileList) => handleFileChange(fileList)}
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
              <Form.ControlLabel>ترتيب البطاقة</Form.ControlLabel>
              <Input
                as="select"
                placeholder="اختر ترتيب البطاقة"
                value={cardData.order}
                onChange={(value) => handleChange('order', value)}
              >
                {Array.from({ length: hiddenCards.length + 1 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Input>
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
          <div>{hiddenCards?.length}</div>
        </div>
      </div>
      <div
        className="d-flex justify-content-start gap-2 align-items-center p-2"
        style={{ cursor: 'pointer' }}
        onClick={toggleModal}
      >
        معاينة الأداة <AiFillEye />
      </div>

      {/* Preview Modal */}
      <Modal open={showPreview} onClose={toggleModal} size="lg" centered>
        <Modal.Header>
          <Modal.Title>معاينة الأداة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Stack
              direction="column"
              style={{
                gap: '2rem',
                padding: '1rem',
                position: 'relative',
              }}
              className="timeline-stack"
            >
              {hiddenCards.length > 0 ? (
                hiddenCards.sort((a, b) => a.order - b.order).map((card, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: card.color,
                        color: '#fff',
                        borderRadius: '50%',
                        flexShrink: 0,
                        marginRight: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      {card.order}
                      {index !== 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '15px',
                            left: '50%',
                            width: '2px',
                            height: 'calc(100% - 15px)',
                            transform: 'translateX(-50%)',
                          }}
                        ></div>
                      )}
                    </div>
                    <Panel
                      bordered
                      bodyFill
                      style={{
                        flex: 1,
                        cursor: 'pointer',
                        padding: '1rem',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                      }}
                      onClick={() => setDisplayCard(card)}
                      className="timeline-card"
                    >
                      <h6 style={{ marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        {card.title}
                      </h6>
                      <p style={{ color: '#666', fontSize: '0.7rem' }}>اضغط لعرض المزيد</p>
                    </Panel>
                  </div>
                ))
              ) : (
                <p style={{ color: '#666', textAlign: 'center', margin: '1rem 0' }}>لا توجد بطاقات للعرض.</p>
              )}
            </Stack>
            <HiddenCard cardData={displayCard} />
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

export default HiddenCardsSideBar;

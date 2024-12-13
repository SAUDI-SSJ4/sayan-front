import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';
import { AiFillEye } from 'react-icons/ai';
import FlippingCard from '../../../../component/UI/FlippingCard';

const FlippingCardSideBar = ({ flippingCards, setFlippingCards }) => {
  const [showPreview, setShowPreview] = useState(false);

  const toggleModal = () => setShowPreview(!showPreview);

  return (
    <div
      style={{ padding: '2rem', minWidth: '350px', margin: 'auto' }}
      className="container col-12 p-5 mt-4"
    >
      <h4>إعدادات الأداة</h4>
      <div className="d-flex flex-column gap-2 border-bottom">
        <div className="d-flex justify-content-between p-2">
          <div>نوع الأداة:</div>
          <div>بطاقات مقلوبة</div>
        </div>
        <div className="d-flex justify-content-between p-2">
          <div>عدد البطاقات:</div>
          <div>{flippingCards?.length}</div>
        </div>
      </div>
      <div
        className="d-flex justify-content-start gap-2 align-items-center p-2 cursor-pointer"
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

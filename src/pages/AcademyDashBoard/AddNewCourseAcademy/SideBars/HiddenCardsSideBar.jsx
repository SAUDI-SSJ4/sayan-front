import React, { useState } from 'react';
import { Modal, Button, Stack, Panel } from 'rsuite';
import { AiFillEye } from 'react-icons/ai';
import FlippingCard from '../../../../component/UI/FlippingCard';
import HiddenCard from '../../../../component/UI/HiddenCard';

const HiddenCardsSideBar = ({ hiddenCards, setHiddenCards }) => {
  const [showPreview, setShowPreview] = useState(false);

  const toggleModal = () => setShowPreview(!showPreview);
    const [displayCard, setDisplayCard] = useState(null);
  return (
    <div
      style={{ padding: '2rem', minWidth: '350px', margin: 'auto' }}
      className="container col-12 p-5 mt-4"
    >
      <h4>إعدادات الأداة</h4>
      <div className="d-flex flex-column gap-2 border-bottom">
        <div className="d-flex justify-content-between p-2">
          <div>نوع الأداة:</div>
          <div>الاداة التعليمية </div>
        </div>
        <div className="d-flex justify-content-between p-2">
          <div>عدد البطاقات:</div>
          <div>{hiddenCards?.length}</div>
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
          <div style={{ display: 'flex', flexDirection:"row", flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
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
        hiddenCards.map((card, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            {/* Timeline Marker */}
            <div
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: card.color,
                borderRadius: '50%',
                flexShrink: 0,
                marginRight: '1rem',
                position: 'relative',
              }}
            >
              {/* Connecting Line */}
              {index !== hiddenCards.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    left: '50%',
                    width: '2px',
                    height: 'calc(100% - 15px)',
                    backgroundColor: '#007bff',
                    transform: 'translateX(-50%)',
                  }}
                ></div>
              )}
            </div>

            {/* Timeline Content */}
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
        <HiddenCard  cardData={displayCard} />
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

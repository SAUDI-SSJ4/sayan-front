import React, { useState } from "react";
import {
  Modal,
  Button,
  Placeholder,
  Radio,
  Form,
  Input,
  RadioGroup,
} from "rsuite";

const AddNewInteractiveTool = ({ addNewLesson, setAddNewLesson, open, handleClose }) => {
  const [step, setStep] = useState(1); // تحديد الخطوة الحالية
  const [selectedTool, setSelectedTool] = useState(null); // تخزين الأداة المختارة
  const [toolParams, setToolParams] = useState(""); // تخزين معلمات الأداة

  // التعامل مع اختيار الأداة
  const handleToolSelection = (value) => {
    
    setAddNewLesson(value);
    setSelectedTool(value);
    // setStep(2); // الانتقال إلى الخطوة التالية (إدخال المعلمات)
    handleClose();
};

  // التعامل مع إرسال النموذج
  const handleFormSubmit = () => {
    console.log("تم إرسال النموذج:", { selectedTool, toolParams });
    handleClose(); // إغلاق النموذج بعد الإرسال
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>نموذج متعدد الخطوات</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <div>
            <h5>اختر الأداة</h5>
            <div
              style={{
                display: "flex",
                gap: "2rem",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "1rem",
              }}
            >
              <div
                onClick={() => handleToolSelection("flippingCard")}
                style={{
                    border: "1px solid #b0b0b0",
                    borderRadius: "4px",
                    padding: "1rem",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor:"white",
                    color: "#505050",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                       ,
                    transition: "all 0.3s ease",
                    width: "100%",
                  }}
              >
                <strong>بطاقة مقلوبة</strong>
              </div>
              <div
                onClick={() => handleToolSelection("hiddenCards")}
                style={{
                  border: "1px solid #b0b0b0",
                  borderRadius: "4px",
                  padding: "1rem",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor:"white",
                  color: "#505050",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                     ,
                  transition: "all 0.3s ease",
                  width: "100%",
                }}
              >
                <strong>أداة التعليمية</strong>
              </div>
            </div>
          </div>
        )}

        {/* {step === 2 && selectedTool === "flippingCard" && (
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.ControlLabel>أدخل معلمات بطاقة مقلوبة</Form.ControlLabel>

              <Input
                value={toolParams}
                onChange={setToolParams}
                placeholder="أدخل معلمات البطاقة المقلوبة"
              />
            </Form.Group>
            <Modal.Footer>
              <Button onClick={handleFormSubmit} appearance="primary">
                إرسال
              </Button>
              <Button onClick={handleClose} appearance="subtle">
                إلغاء
              </Button>
            </Modal.Footer>
          </Form>
        )} */}

        {/* {step === 2 && selectedTool === "otherTool" && (
          <div>
            <h5>معلمات الأداة الأخرى</h5>
            <Placeholder.Paragraph rows={3} />
            <Modal.Footer>
              <Button onClick={handleClose} appearance="primary">
                موافق
              </Button>
              <Button onClick={handleClose} appearance="subtle">
                إلغاء
              </Button>
            </Modal.Footer>
          </div>
        )} */}
      </Modal.Body>
    </Modal>
  );
};

export default AddNewInteractiveTool;

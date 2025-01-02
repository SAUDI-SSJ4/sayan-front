import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import style from "../../../../AddNewCourse.module.css"
import Brush from "../../../../../../../assets/icons/Brush.svg?react";
import FlippingCardIcon from "../../../../../../../assets/icons/flippingCard.svg?react";
import ListingIcon from "../../../../../../../assets/icons/listingIcon.svg?react";
import { Button } from "rsuite";

const AddNewInteractiveTool = ({ addNewLesson, setAddNewLesson, open, handleClose }) => {
  const [step, setStep] = useState(1); // تحديد الخطوة الحالية
  const [selectedTool, setSelectedTool] = useState(null); // تخزين الأداة المختارة
  const [toolParams, setToolParams] = useState(""); // تخزين معلمات الأداة

  // التعامل مع اختيار الأداة
  const handleToolSelection = (value) => {
    
    setSelectedTool(value);
    // setStep(2); // الانتقال إلى الخطوة التالية (إدخال المعلمات)
   
};


  // التعامل مع إرسال النموذج
  const handleFormSubmit = () => {
    console.log("تم إرسال النموذج:", { selectedTool, toolParams });
    setAddNewLesson(selectedTool);

    handleClose(); // إغلاق النموذج بعد الإرسال
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box className={`${style.modal}`} >
        <div className="d-flex flex-row align-items-start gap-4">
        <Brush/>
        <h2 className={`${style.modalTitle}`} id="modal-modal-title">
          اضافة اداة تفاعلية
        </h2>
        </div>
        <Box >
          {step === 1 && (
            <div
            style={{
              display: "flex",
              gap: "1rem",
              flexDirection:"column",
              justifyContent: "space-between",
              
              alignItems: "start",
              margin: "1rem",
            }}
            >
              <h5 className={`${style.modalSubTitle}`}>حدد الاداة التي تريد اضافتها للدرس<span style={{ color:"#e44"}}>*</span></h5>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "0rem 0.5rem",
                }}
              >
                <div
                  onClick={() => handleToolSelection("flippingCard")}
               className={`${style.toolCard} ${selectedTool === "flippingCard" ? style.selectedTool : ""}`}
                >
                  <FlippingCardIcon/>
                  <p>بطاقة مقلوبة</p>
                </div>
                <div
                  onClick={() => handleToolSelection("hiddenCards")}
                  className={`${style.toolCard} ${selectedTool === "hiddenCards" ? style.selectedTool : ""}`}
                  >
                  <ListingIcon/>
                  <p>أداة التعليمية</p>
                </div>
              </div>
            </div>
          )}
        </Box>
        <Box sx={{
          display:'flex'
          , gap:'1rem'
        }}>
        <Button onClick={handleFormSubmit} appearance="primary">
          انشاء
        </Button>
        <Button onClick={handleClose}>
          الرجوع
        </Button>
      </Box>
      </Box>
     
    </Modal>
  );
};

export default AddNewInteractiveTool;

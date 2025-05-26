import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import style from "../../../../AddNewCourse.module.css"
import Brush from "../../../../../../../assets/icons/Brush.svg?react";
import FlippingCardIcon from "../../../../../../../assets/icons/flippingCard.svg?react";
import ListingIcon from "../../../../../../../assets/icons/listingIcon.svg?react";
import { Button } from "rsuite";

const AddNewInteractiveTool = ({ changeNavigate, open, handleClose }) => {
  const [selectedTool, setSelectedTool] = useState(null);

  const handleFormSubmit = () => {
    changeNavigate(selectedTool);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={style.modal}>
        <div className="d-flex align-items-center gap-4">
          <Brush />
          <h2 className={style.modalTitle}>اضافة اداة تفاعلية</h2>
        </div>
        <Box>
          <h5 className={`${style.modalSubTitle} m-2`}>
            حدد الاداة التي تريد اضافتها للدرس<span style={{ color: "#e44" }}>*</span>
          </h5>
          <div className="d-flex gap-4">
            <div
              onClick={() => setSelectedTool("flippingCard")}
              className={`${style.toolCard} ${selectedTool === "flippingCard" ? style.selectedTool : ""
                }`}
            >
              <FlippingCardIcon />
              <p>بطاقة مقلوبة</p>
            </div>
            <div
              onClick={() => setSelectedTool("hiddenCards")}
              className={`${style.toolCard} ${selectedTool === "hiddenCards" ? style.selectedTool : ""
                }`}
            >
              <ListingIcon />
              <p>أداة تعليمية</p>
            </div>
          </div>
        </Box>
        <div className="d-flex gap-3 m-2">
          <Button appearance="primary" onClick={handleFormSubmit}>انشاء</Button>
          <Button onClick={handleClose}>الرجوع</Button>
        </div>
      </Box>
    </Modal>
  );
};


export default AddNewInteractiveTool; 
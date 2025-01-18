import { motion, AnimatePresence } from "framer-motion";
import classes from "./DigitalProductsCard.module.scss";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";
const DigitalProductsCard = ({ image, active, user, onClick, onCheck,checked }) => {
const router = useNavigate()
  return (
    <div className={`${classes.Card} card-digital`}>
        <div
          className={`${classes.CardCheck} ${checked && classes.Checked}`}
          onClick={ onCheck}
        >
          <AnimatePresence>
            {checked && (
              <motion.div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircleIcon sx={{ width: "30px", height: "30px" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      <div className={classes.CardImage} onClick={()=>router('/ProductPackages/SingleProduct/')}>
    
        <img src={image} />
   
      </div>
      <div className={classes.CardBody}>
        <h2>{user?.name}</h2>
       <div className={classes.Price}>
<div>
120.00 ر.س.
</div>
       </div>
        <div
          style={{
            gap: "10px",
            alignItems: "center",
            position: "relative",
            display: "flex",
            marginTop: "30px",
          }}
        >
          <img
            src={user.image}
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              right: "0",
              borderRadius: "50%",
            }}
          />
          <div style={{ width: "40px", height: "40px" }}></div>

          <span>{user.name}</span>
        </div>
      </div>
    </div>
  );
};

export default DigitalProductsCard;

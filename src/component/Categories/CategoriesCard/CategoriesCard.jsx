import { motion, AnimatePresence } from "framer-motion";
import classes from "./CategoriesCard.module.scss";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useState } from "react";
import icon from "./../../../assets/icons/isd.svg";
import user from "./../../../assets/images/Ellipse.png";
import saveMark from "./../../../assets/icons/Bookmark.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
const CategoriesCard = ({
  image,
  active,
  onClick,
  onCheck,
  checked,
  title,
  content
}) => {
  const router = useNavigate();
  return (
    <div style={{ height: "100%" }}>
      <div
        style={{ minHeight: "300px" }}
        className={`VideoCard ${classes.Card}`}
      >
        <div
          className={`${classes.CardCheck} ${checked && classes.Checked}`}
          onClick={onCheck}
        >
          <AnimatePresence>
            {checked && (
              <motion.div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
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
        <div className="VideoCardIcon">
          <img src={icon} />
          <h4>{title}</h4>
        </div>
        <h5>{content}</h5>
        <div style={{ width: "100%" }}>
          <div
            style={{
              gap: "10px",
              alignItems: "center",
              position: "relative",
              display: "flex",
              marginTop: "30px"
            }}
          >
            <img
              src={user}
              style={{
                width: "40px",
                height: "40px",
                position: "absolute",
                right: "0",
                borderRadius: "50%"
              }}
            />
            <div style={{ width: "40px", height: "40px" }}></div>

            <span>اكاديمية ضوء </span>
          </div>
        </div>
        <div className="bookMark">
          <img src={saveMark} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;

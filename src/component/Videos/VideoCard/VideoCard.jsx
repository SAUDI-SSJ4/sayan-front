import { motion, AnimatePresence } from "framer-motion";
import classes from "./VideoCard.module.scss";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import playBtn from "../../../assets/icons/PlayButton.svg";
import { useNavigate } from "react-router-dom";
const VideoCard = ({ image, active, user, onClick, onCheck, checked,acadmey }) => {
  const router=useNavigate();
  const handleCheck = (e)=>{
    e.stopPropagation();
    onCheck();
  }
  return (
    <div className={`${classes.Card} card-video--1`} onClick={()=> acadmey ? router('/academy/SingleVideo')  : router('/admin/SingleVideo')}>
      <div className={classes.CardImage}>
        <img src={playBtn}  className={classes.PlayBtn} onClick={()=>{ acadmey ? router('/academy/SingleVideo')  : router('/admin/SingleVideo')}}/>
        <img src={image} />
        <div
          className={`${classes.CardCheck} ${checked && classes.Checked}`}
          onClick={handleCheck}
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
                <CheckOutlinedIcon sx={{ width: "100%", height: "100%" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className={classes.CardBody}>
        <span>Jan.01.2024</span>
        <h2>{user?.name}</h2>
        <p>
          Loream Ipsum is that the Loream Ipsum is that the Loream Ipsum is that
          the Loream Ipsum.
        </p>

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

export default VideoCard;

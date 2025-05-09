import { motion, AnimatePresence } from "framer-motion";
import classes from "./SessionsCard.module.scss";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
const SessionsCard = ({
  image,
  active,
  user,
  onClick,
  onCheck,
  checked,
  notAdmin
}) => {
  return (
    <div className={`${classes.Card} card-sessions m-0`}>
      <div className={classes.CardImage}>
        <img src={image} className="w-100 h-100 object-fit-cover" />
        {notAdmin ? null : (
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
                  <CheckOutlinedIcon sx={{ width: "100%", height: "100%" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <div className={classes.CardBody}>
        <h2 className="title-top-sessions fs-6 fw-medium">{user?.name}</h2>
        <div className={`d-flex gap-1 flex-wrap gap-3  ${classes.Tags}`}>
          <div className="ispending">مسودة</div>
          <div className="Ended">مجانية</div>
          {active ? (
            <div className="notActive">غير تفاعلية</div>
          ) : (
            <div className="yesActive">تفاعلية</div>
          )}
        </div>
        <div className="timetags">
          <div>
            <CalendarMonthIcon sx={{ fontSize: "20px" }} />
            <span> Jan.01</span>
          </div>
          <div>
            <ScheduleIcon sx={{ fontSize: "20px" }} />
            <span> 5:00 م</span>
          </div>
        </div>
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
            src={user.image}
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              right: "0",
              borderRadius: "50%"
            }}
          />
          <div style={{ width: "40px", height: "40px" }}></div>

          <span className="title-text--1">{user.name}</span>
        </div>
      </div>
    </div>
  );
};

export default SessionsCard;

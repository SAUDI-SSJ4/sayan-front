import { motion, AnimatePresence } from "framer-motion";
import classes from "./TrainingCoursesCard.module.scss";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const TrainerTag= styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 10px;
  color: #7e8799;

`

const TrainingCoursesCardAcademy = ({
  active,
  name,
  onCheck,
  course,
  checked,
  notAdmin,
  acadmey
}) => {
  const router = useNavigate();
  useEffect(() => {
    console.log("course",course);
  });
  return (
    <div className={classes.Card}>
      <div className={classes.CardImage}>
        <img src={course.image} />
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
      <div
        className={classes.CardBody}
        onClick={() =>
          acadmey ? router("/academy/SingleCourse") : router("/SingleCourse")
        }
      >
        <h2>{course.title}</h2>
        <div className={`d-flex gap-1 flex-wrap ${classes.Tags}`}>
         {!course.status?<div className="ispending fs-6 fw-medium text-content--1">مسودة</div>:null}
          {course.price==0? (<div className="Ended fs-6 fw-medium text-content--1">مجانية</div>):null}
          {course.type=="recorded" ? (
            <div className="notActive fs-6 fw-medium text-content--1">
              غير تفاعلية
            </div>
          ) : (
            <div className="yesActive fs-6 fw-medium text-content--1">
              تفاعلية
            </div>
          )}
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
          <strong className="fs-6 fw-medium text-content--1">المدرب:</strong>
          {/* <img
            src={course.image}
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              right: "0",
              borderRadius: "50%"
            }}
          /> */}
          {/* <div style={{ width: "40px", height: "40px" }}></div> */}

          <TrainerTag className="fs-6 fw-medium text-content--1">{course.trainer}</TrainerTag>
        </div>
      </div>
    </div>
  );
};

export default TrainingCoursesCardAcademy;

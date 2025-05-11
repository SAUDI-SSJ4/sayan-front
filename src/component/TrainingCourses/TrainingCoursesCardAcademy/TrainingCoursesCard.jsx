import { motion, AnimatePresence } from "framer-motion";
import classes from "./TrainingCoursesCard.module.scss";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatLongText } from "../../../utils/helpers";
import { Text } from "../../../utils/styles";
import defaultProduct from '../../../assets/images/courses/default-product.png'
import avatar from '../../../assets/avatars/avatar_1.jpg'
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmDeleteCourse } from "../../Models/ConfirmDeleteCourse";

const TrainingCoursesCardAcademy = ({
  active,
  name,
  onCheck,
  course,
  checked,
  notAdmin,
  acadmey
}) => {

  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const navigate = useNavigate();


  const handleDeleteCourse = (courseId) => {
    setOpen(true)
    setCourseId(courseId)
  }

  return (
    <div className={classes.Card}>
      {open && <ConfirmDeleteCourse open={open} setOpen={setOpen} courseId={courseId}/>}
      <div className={classes.CardImage}>
        <img src={course.image || defaultProduct} />
      </div>
      <div className={classes.CardBody}>
        <div className={classes.CardTitleContainer}>
          <h2 onClick={() => acadmey ? navigate("/academy/SingleCourse") : navigate(`/SingleCourse/${course.id}`)}>{formatLongText(course.title, 26)}</h2>
          <div className={`d-flex gap-1 flex-wrap ${classes.Tags}`}>
            {!course.status ? <div className="ispending fs-6 fw-medium text-content--1">مسودة</div> : null}
            {course.price == 0 ? (<div className="Ended fs-6 fw-medium text-content--1">مجانية</div>) : null}
            {course.status ? (
              <div className="yesActive fs-6 fw-medium text-content--1">
                تفاعلية
              </div>
            ) : (
              <div className="notActive fs-6 fw-medium text-content--1">
                غير تفاعلية
              </div>
            )}
          </div>
        </div>
        <div className={classes.TrainerContainer}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={avatar || "/path/to/default-avatar.jpg"}
              alt={course.trainer_name || "Trainer"}
              className={classes.TrainerImage}
            />

            <div className={classes.TrainerTitle}>
              <p>المدرب:</p>
              <p className={classes.TrainerName}>
                {formatLongText(course.trainer_name || "Unknown Trainer", 20)}
              </p>
            </div>
          </div>
          <div className={classes.TrainerDeleteIcon} onClick={() => handleDeleteCourse(course.id)}>
            <DeleteIcon className={classes.TrainerIcon} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrainingCoursesCardAcademy;

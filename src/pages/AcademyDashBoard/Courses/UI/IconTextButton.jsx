import React from "react";
import styles from "../AddNewCourse.module.css";
const IconTextButton = ({ isActive, onClick, icon: Icon, text, isAllwo }) => {
  return (
    <div className={`${"d-flex align-items-center justify-content-between"}`}>
      <div
        className={`${styles.iconText} ${isAllwo ? styles.allwo : styles.notAllwo}  ${isActive ? styles.activeButton : ""}`}
        onClick={onClick}

      >
        <Icon alt="icon" />

        <p className={isAllwo ? styles.allwo : styles.notAllwo}>{text}</p>
      </div>
    </div>
  );
};

export default IconTextButton;

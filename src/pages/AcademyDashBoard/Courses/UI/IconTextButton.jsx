import React from "react";
import styles from "../AddNewCourse.module.css";
const IconTextButton = ({ isActive, onClick, icon: Icon, text }) => {
  return (
    <button
      className={`${"d-flex align-items-center justify-content-between"}`}
    >
      <div
        className={`${styles.iconText} ${isActive ? styles.activeButton : ""}`}
        onClick={onClick}
      >
        <Icon alt="icon" />
        <p>{text}</p>
      </div>
    </button>
  );
};

export default IconTextButton;

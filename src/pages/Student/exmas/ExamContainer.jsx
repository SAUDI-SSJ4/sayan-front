import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useRef, useState } from "react";

import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import classes from "./SingleEaxam.module.scss";


import StudentTryTable from "./StudentExam";
const ExamContainer = () => {
  const router = useNavigate();
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader ">
        <div className="HeaderContainer">
         <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
           <div className="d-flex align-items-center name ">
             <div className="icon">
               <PeopleAltIcon sx={{ color: "#A3AED0" }} />
             </div>
             <div style={{ color: "#7E8799" }}>الاختبارات </div>
           </div>
         </div>
       
        
        </div>
      </div>
      <div className={classes.mainCard}>
    <StudentTryTable  />
      </div>
    </div>
  );
};

export default ExamContainer;

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useRef, useState } from "react";

import { NavLink, Route, Routes } from "react-router-dom";
import SingleVideoInfo from "../../../component/Videos/SingleVideo/SingleVideo";
import SingleVideoTable from "../../../component/Videos/SingleVideo/SingleVideoTable";
import StudentTryTable from "../../../component/Videos/VideoTable/StudentTryTable";

const SingleVideo = () => {
  const fileInputRef = useRef(null);

  return (
    <div className="mb-5 all-info-top-header main-info-top">
      <div className="TablePageHeader ">
        <div className="HeaderContainer">
         <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
           <div className="d-flex align-items-center name ">
             <div className="icon">
               <PeopleAltIcon sx={{ color: "#A3AED0" }} />
             </div>
             <div style={{ color: "#7E8799" }}> مكتبة الفيديو</div>
           </div>
           <div className="userTabs">
             <ul className="flex-wrap gap-3">
               <NavLink
                 to={"/academy/SingleVideo"}
                 end
                 className={({ isActive }) => {
                   return isActive ? " tablePage active" : "tablePage";
                 }}
               >
                 معلومات الفيديو
               </NavLink>
               <NavLink
                 to={"/academy/SingleVideo/Table"}
                 className={({ isActive }) => {
                   return isActive ? " tablePage active" : "tablePage";
                 }}
               >
                 تجربة الطلاب
               </NavLink>
             </ul>
           </div>
           <div className="updateBtn">
             الرجوع <KeyboardBackspaceIcon />
           </div>
         </div>
        </div>
      </div>
      <div className="  pb-4 pt-4">
        <Routes>
          <Route path="/" element={<SingleVideoInfo />} />
          <Route path="/Table" element={<StudentTryTable />} />
        </Routes>
      </div>
    </div>
  );
};

export default SingleVideo;

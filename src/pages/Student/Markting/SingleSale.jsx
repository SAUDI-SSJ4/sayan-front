import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useRef, useState } from "react";

import { NavLink, Route, Routes } from "react-router-dom";
import SingleOfferInfo from "../../component/Sales/SingleOffer/SingleOffer";
import SingleOfferTable from "../../component/Sales/SingleOffer/SingleOfferTable";
import StudentTryTable from "../../component/Videos/VideoTable/StudentTryTable";


const SingleSale = () => {
  const fileInputRef = useRef(null);


  
 

  return (
    <div className="mb-5">
      <div className="TablePageHeader ">
      <div className="HeaderContainer">
      <div className="d-flex align-items-center name ">
          <div className="icon">
            <PeopleAltIcon sx={{ color: "#A3AED0" }} />
          </div>
          <div style={{ color: "#7E8799" }}> العرض </div>
        </div>
        <div className="userTabs">
          <ul>
            <NavLink
              to={"/admin/SingleSale"}
              end
              className={({ isActive }) => {
                return isActive ? " tablePage active" : "tablePage";
              }}
            >
            معلومات الكوبون
            </NavLink>
            <NavLink
              to={"/admin/SingleSale/Table"}
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
      <div className="  pb-4 pt-4" >
     <Routes>
        <Route path="/" element={<SingleOfferInfo />} />
        <Route path="/Table" element={<StudentTryTable />} />

     </Routes>
     
      </div>
    </div>
  );
};

export default SingleSale;

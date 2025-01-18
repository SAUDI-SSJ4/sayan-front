import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useState } from "react";
import SalesCards from "../../../component/Sales/SalesCard/SalesCards";
import PruchaseTable from "./PruchaseTable";
const Transactions = () => {
  const [TableOrNot, setTableOrNot] = useState(true);
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
       <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
           <div className="d-flex align-items-center name">
             <div className="icon">
               <PeopleAltIcon sx={{ color: "#A3AED0" }} />
             </div>
             <div style={{ color: "#7E8799" }}> المعاملات المالية</div>
           </div>
       </div>
         
        </div>
      </div>
     <Routes></Routes>
     <PruchaseTable/>
    </div>
  );
};

export default Transactions;

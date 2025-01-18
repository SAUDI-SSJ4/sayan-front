import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useState } from "react";
import SalesCards from "../../component/Sales/SalesCard/SalesCards";
import { mockUsers } from "../../component/Sales/mock";
import SalesCard from "../../component/Sales/SalesCard/SalesCard";
const data = mockUsers(8);

const Sales = () => {
  const [TableOrNot, setTableOrNot] = useState(true);
  return (
    <div className="all-info-top-header header-top--2">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}> العروض </div>
            </div>
            <div className="userTabs">
              <ul>
                <NavLink
                  to={"/admin/AcadmicMarketing"}
                  end
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  الكوبونات (243)
                </NavLink>
                <NavLink
                  to={"/admin/AcadmicMarketing/AffiliateMarketingSetting"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  العروض
                </NavLink>
              </ul>
            </div>
            <Link to={"/admin/AffiliateMarketingSetting"} className="addBtn">
              <AddCircleIcon />
              انشاء كوبون جديد
            </Link>
          </div>
        </div>
      </div>
      <SearchAndShowBar setTableOrNot={setTableOrNot} TableOrNot={TableOrNot} />
      <Routes></Routes>
      <div className="all-marketing-card">
        <div className="row g-3  CustomCard   mt-3">
          {data.map((item, index) => (
            <div className="col-12  col-md-6">
              <div className="w-100">
                {" "}
                <SalesCard />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sales;

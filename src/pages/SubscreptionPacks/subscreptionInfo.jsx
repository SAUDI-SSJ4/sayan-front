import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useRef, useState } from "react";

import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import SubscreptionInfo from "../../component/SubscreptionPacks/SubscreptionInfo";
import SubTable from "../../component/SubscreptionPacks/table/SubTable";

const SubscreptionInfoPage = () => {
  const fileInputRef = useRef(null);
  const router = useNavigate();
  return (
    <div className="all-info-top-header all-card-sub-info mb-5">
      <div className="TablePageHeader ">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name ">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}>باقة الاشتراك </div>
            </div>
            <div className="userTabs">
              <ul className="flex-wrap gap-3">
                <NavLink
                  to={"/admin/singleSub"}
                  end
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  معلومات باقة الاشتراك
                </NavLink>
                <NavLink
                  to={"/admin/singleSub/userSub"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  المستخدمين
                </NavLink>
              </ul>
            </div>
            <div className="updateBtn" onClick={() => router("/s")}>
              الرجوع <KeyboardBackspaceIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="CustomCard  cv pb-4 pt-4">
        <div className="container">
          <Routes>
            <Route path="/" element={<SubscreptionInfo />} />
            <Route path="/userSub" element={<SubTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SubscreptionInfoPage;

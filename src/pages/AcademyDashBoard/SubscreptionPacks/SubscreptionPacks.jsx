import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import SubscreptionPacksCard from "../../../component/SubscreptionPacks/SubscreptionPacksCard";
import SubTable from "../../../component/SubscreptionPacks/table/SubTable";
import AcademySubscreptionPacksCard from "../../../component/AcademyDashboard/SubscreptionPacksCard";

const SubscreptionPacks = () => {
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}>باقات الاشتراك</div>
            </div>
            <div className="userTabs">
              {/**
                <ul className="flex-wrap gap-3">
                <NavLink
                  to={"/academy/SubscreptionPacks"}
                  end
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  باقات الاشتراك
                </NavLink>
                <NavLink
                  to={"/academy/SubscreptionPacks/userSub"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  اشتراكات المستخدمين
                </NavLink>
              </ul>
                */}
            </div>
            {/**<Link to={"/academy/AddNewSubscreptionPacks"} className="addBtn">
              <AddCircleIcon />
              اضافة باقة جديدة
            </Link> */}
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<AcademySubscreptionPacksCard />} />
        <Route path="/userSub" element={<SubTable />} />
      </Routes>
    </div>
  );
};

export default SubscreptionPacks;

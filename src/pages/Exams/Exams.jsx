import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExmasTable from "../../component/Exams/ExmasTable";

const Exams = () => {
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}>الاختبارات </div>
            </div>
            <div className="userTabs">
              <ul className="flex-wrap gap-3">
                <NavLink
                  to={"/admin/Exams"}
                  end
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  احصائيات الاختبارات
                </NavLink>
                <NavLink
                  to={"/admin/Exams/statistics"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  احصائيات اختبرني
                </NavLink>
              </ul>
            </div>
            <Link to={"/admin/AddNewSubscreptionPacks"} className="addBtn">
              <AddCircleIcon />
              انشاء اختبار جديد
            </Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<ExmasTable />} />
        <Route path="/statistics" element={<ExmasTable />} />
      </Routes>
    </div>
  );
};

export default Exams;

import CustomizedTable from "../../component/table/table";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AcadmyTable from "../../component/table/acadmyTable/AcadmeyTabel";
import EmploeeTable from "../../component/table/EmploeeTable/EmploeeTable";
import SubscreptionPacksCard from "../../component/SubscreptionPacks/SubscreptionPacksCard";
import SubTable from "../../component/SubscreptionPacks/table/SubTable";

const SubscreptionPacks = () => {
  return (
    <div className="all-info-top-header">
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
              <ul className="flex-wrap gap-3">
                <NavLink
                  to={"/admin/SubscreptionPacks"}
                  end
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  باقات الاشتراك
                </NavLink>
                <NavLink
                  to={"/admin/SubscreptionPacks/userSub"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  اشتراكات المستخدمين
                </NavLink>
              </ul>
            </div>
            <Link to={"/admin/AddNewSubscreptionPacks"} className="addBtn">
              <AddCircleIcon />
              اضافة باقة جديدة
            </Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<SubscreptionPacksCard />} />
        <Route
          path="/userSub"
          element={
            <div
              data-aos="fade-up"
              style={{
                padding: "20px",
                background: "white",
                border: " 1px solid #edeff2",
                borderRadius: "10px"
              }}
            >
              <SubTable />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default SubscreptionPacks;

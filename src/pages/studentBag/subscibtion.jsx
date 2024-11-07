import CustomizedTable from "../../component/table/table";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { NavLink, Route, Routes } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AcadmyTable from "../../component/table/acadmyTable/AcadmeyTabel";
import EmploeeTable from "../../component/table/EmploeeTable/EmploeeTable";
import StudentRateTable from "../../component/studentBage/StudentRateTable/StudentRateTable";
import SubscriptionTable from "../../component/studentBage/Subscription/SubscriptionTable";

const Subscription = () => {
  return (
    <div className="all-tab-top">
      <div className="sub-info-content all-info-top-header main-info-top">
        <div className="TablePageHeader">
          <div
            className="HeaderContainer"
            style={{ position: "relative", justifyContent: "flex-start" }}
          >
            <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
              <div className="d-flex align-items-center name">
                <div className="icon">
                  <PeopleAltIcon sx={{ color: "#A3AED0" }} />
                </div>
                <div style={{ color: "#7E8799" }}>الاشتراكات</div>
              </div>
              <div
                className="userTabs"
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)"
                }}
              >
                <ul className="flex-wrap gap-3">
                  <NavLink
                    to={"/admin/Subscription"}
                    end
                    className={({ isActive }) => {
                      return isActive ? " tablePage active" : "tablePage";
                    }}
                  >
                    الاشتراكات (349)
                  </NavLink>
                  <NavLink
                    to={"/admin/Subscription/platform"}
                    className={({ isActive }) => {
                      return isActive ? " tablePage active" : "tablePage";
                    }}
                  >
                    اشتراكات المنصة
                  </NavLink>
                  <NavLink
                    to={"/admin/Subscription/acadmy"}
                    className={({ isActive }) => {
                      return isActive ? " tablePage active" : "tablePage";
                    }}
                  >
                    اشتراكات الاكاديميات التعليمية
                  </NavLink>
                </ul>
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<SubscriptionTable />} />
          <Route path="/acadmy" element={<SubscriptionTable />} />
          <Route
            path="/platform"
            element={
              <div>
                <SubscriptionTable />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Subscription;

import CustomizedTable from "../../component/table/table";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { NavLink, Route, Routes } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AcadmyTable from "../../component/table/acadmyTable/AcadmeyTabel";
import EmploeeTable from "../../component/table/EmploeeTable/EmploeeTable";
import StudentRateTable from "../../component/studentBage/StudentRateTable/StudentRateTable";
import SubscreptionsTable from "../../component/Subscreptions/SubscreptionsTable";
import { useEffect } from "react";
import axiosInstance from "../../../axios";
const Subscreptions = () => {
  useEffect(() => {
    axiosInstance.get("subscriptions").then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div
          className="HeaderContainer flex-wrap"
          style={{ justifyContent: "flex-start", position: "relative" }}
        >
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}>التقييمات</div>
            </div>
            <div
              className="userTabs"
              style={{
                display: "flex",
                transform: "translateX(-50%)",
                position: "absolute",
                left: "50%"
              }}
            >
              <ul className="flex-wrap gap-4">
                <NavLink
                  to={"/admin/Subscreptions"}
                  end
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  الاشتراكات (349)
                </NavLink>
                <NavLink
                  to={"/admin/Subscreptions/acadmy"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  اشتراكات المنصة
                </NavLink>
                <NavLink
                  to={"/admin/Subscreptions/userSub"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  اشتراكات الاكاديميات التعليمية
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <SubscreptionsTable />
    </div>
  );
};

export default Subscreptions;

import CustomizedTable from "../../component/table/table";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "./users.module.scss";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AcadmyTable from "../../component/table/acadmyTable/AcadmeyTabel";
import EmploeeTable from "../../component/table/EmploeeTable/EmploeeTable";
import AddNewUser from "./AddNewUser/AddNewUser";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import AdminUsersTable from "../../component/table/AdminUsersTable/AdminUsersTable";
const Users = () => {
  const [userType, setUserType] = useState("all");

  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}>قاعدة المستخدمين</div>
            </div>
            <div className="userTabs">
              <ul className="flex-wrap gap-3">
                <NavLink
                  to={"/admin/users"}
                  end
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  المستخدمين
                </NavLink>
                <NavLink
                  onClick={() => setUserType("Academy")}
                  to={"/admin/users/Academy"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  الاكاديميات التعليمية
                </NavLink>
                <NavLink
                  onClick={() => setUserType("student")}
                  to={"/admin/users/student"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  الطلاب
                </NavLink>
                <NavLink
                  to={"/admin/users/Emploee"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  الموظفين
                </NavLink>
              </ul>
            </div>
            <Link to={"/admin/users/addNewUser"} className="addBtn">
              <AddCircleIcon />
              إضافة مستخدم جديد
            </Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route
          path="/"
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
              <CustomizedTable />
            </div>
          }
        />
        <Route path="/Academy" element={<AcadmyTable />} />
        <Route
          path="/student"
          element={
            <div>
              <AdminUsersTable />
            </div>
          }
        />
        <Route path="/Emploee" element={<EmploeeTable />} />
      </Routes>
    </div>
  );
};

export default Users;

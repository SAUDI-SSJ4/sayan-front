import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useRef, useState } from "react";

import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import classes from "./SingleEaxam.module.scss";

import SingleExamComponent from "../../component/Exams/SingleExam";
import StudentTryTable from "../../component/Exams/StudentTryTable";
import ShowExam from "../../component/Exams/ShowExam";
const SingleEaxam = () => {
  const router = useNavigate();
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader ">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name ">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}>الاختبارات </div>
            </div>
            <div className="userTabs">
              <ul className="flex-wrap gap-3">
                <NavLink
                  to={"/admin/SingleExam/exam"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  معلومات الاختبار الذكي
                </NavLink>
                <NavLink
                  to={"/admin/SingleExam/StudentTry"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  تجربة الطلاب
                </NavLink>
              </ul>
            </div>
            <div className="updateBtn" onClick={() => router("/admin/Exams")}>
              الرجوع <KeyboardBackspaceIcon />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.mainCard}>
        <Routes>
          <Route
            path={"/exam"}
            element={<SingleExamComponent classes={classes} />}
          />
          <Route path={"/StudentTry"} element={<StudentTryTable />} />
          <Route path={"exam/ShowExam"} element={<ShowExam />} />
          <Route path={"/StudentTry/try"} element={<ShowExam wrong />} />
        </Routes>
      </div>
      
    </div>
  );
};

export default SingleEaxam;

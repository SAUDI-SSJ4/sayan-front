import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useEffect, useState } from "react";
import TrainingCoursesCardContainer from "../../component/TrainingCourses/TrainingCoursesCard/TrainingCoursesCardContainer";
import TrainingCoursesTable from "../../component/TrainingCourses/TrainingCoursesTable/TrainingCoursesTable";
import axiosInstance from "../../../axios";
const StudentTrainingCourses = () => {
  const [TableOrNot, setTableOrNot] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [data, setData] = useState([]);
  const [course, Setcourse] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axiosInstance.get("admin/course").then((res) => {
      Setcourse(res.data.data);
      console.log(res.data.data);
      setLoading(false);
    });
  }, []);
  const checkAllHandler = () => {
    setCheckedKeys((perv) => {
      if (
        perv?.length === data?.length &&
        (perv?.length !== 0 || data?.length !== 0)
      ) {
        return [];
      } else {
        return [...data];
      }
    });
  };
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}> الدورات التدريبية </div>
            </div>
            <div className="userTabs">
              <ul className="flex-wrap gap-3">
                <NavLink
                  to={"/admin/TrainingCourses"}
                  end
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  الدورات (2214)
                </NavLink>
                <NavLink
                  to={"/admin/TrainingCourses/AffiliateMarketingSetting"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  الدورات المباشرة
                </NavLink>
                <NavLink
                  to={"/admin/TrainingCourses/AffiliateMarketingSetting"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  الدورات غير المباشرة
                </NavLink>
              </ul>
            </div>
            <Link to={"/admin/AffiliateMarketingSetting"} className="addBtn">
              <AddCircleIcon />
              إضافة دورة جديدة
            </Link>
          </div>
        </div>
      </div>

      <div>testf32</div>
    </div>
  );
};

export default StudentTrainingCourses;

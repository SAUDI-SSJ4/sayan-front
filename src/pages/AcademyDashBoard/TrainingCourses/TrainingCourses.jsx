import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link, NavLink } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useEffect, useState } from "react";
import { Error } from "@mui/icons-material";
import { Spinner } from "react-bootstrap";
import { useAllCourses } from "../../../framework/accademy/courses";
import CoursesDataTaple from "./CoursesDataTaple";
import { useQuery } from "@tanstack/react-query";
import { getCourse } from "../../../utils/apis/client/academy";
const AcadmeyTrainingCourses = () => {
  const {
    data: faqData,
    isLoading,
    errors,
  } = useQuery({
    queryKey: ["ACourses"],
    queryFn: () => getCourse(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });

  const [TableOrNot, setTableOrNot] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);

  if (errors) return <Error />;
  if (isLoading)
    return (
      <>
        <div className="w-full h-50 d-flex justify-content-center align-items-center">
          <Spinner className="" />
        </div>
      </>
    );

  return (
    <>
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

              {/* <div className="userTabs">
                <ul className="flex-wrap gap-3">
                  <NavLink
                    to={"/academy/TrainingCourses"}
                    end
                    className={({ isActive }) => {
                      return isActive ? " tablePage active" : "tablePage";
                    }}
                  >
                    الدورات (2214)
                  </NavLink>
                  <NavLink
                    to={"/academy/TrainingCourses/AffiliateMarketingSetting"}
                    className={({ isActive }) => {
                      return isActive ? " tablePage active" : "tablePage";
                    }}
                  >
                    الدورات المباشرة
                  </NavLink>
                  <NavLink
                    to={"/academy/TrainingCourses/AffiliateMarketingSetting"}
                    className={({ isActive }) => {
                      return isActive ? " tablePage active" : "tablePage";
                    }}
                  >
                    الدورات غير المباشرة
                  </NavLink>
                </ul>
              </div> */}

              <Link to={"/academy/addNewCourse"} className="addBtn">
                <AddCircleIcon />
                إضافة دورة جديدة
              </Link>
            </div>
          </div>
        </div>
        {/**it's not working */}
        <SearchAndShowBar
          checkedKeys={checkedKeys}
          data={faqData?.data}
          setCheckedKeys={setCheckedKeys}
          setTableOrNot={setTableOrNot}
          // checkAllHandler={checkAllHandler}
          TableOrNot={TableOrNot}
        />
      </div>
      <CoursesDataTaple CoursesData={faqData?.data} />
    </>
  );
};

export default AcadmeyTrainingCourses;

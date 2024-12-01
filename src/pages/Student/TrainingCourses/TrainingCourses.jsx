import { useState } from "react";
import { Link } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useQuery } from "@tanstack/react-query";
import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import TrainingCoursesCardContainer from "../../../component/TrainingCourses/TrainingCoursesCard/TrainingCoursesCardContainer";
import { getStudentCourses } from "../../../utils/apis/client";
import { CourseTabs } from "./CourseTabs";

const TrainingCourses = () => {

  const [checkedKeys, setCheckedKeys] = useState([]);
  const [data, setData] = useState([]);

  const { data: studentCourses = [], isLoading, isFetched } = useQuery({
    queryKey: ["studentCourses"],
    queryFn: getStudentCourses,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 1000,
  });

  const handleCheckAll = () => {
    setCheckedKeys((prevCheckedKeys) => {
      return prevCheckedKeys.length === data.length
        ? []
        : [...data];
    });
  };

  return (
    <div className="all-info-top-header">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div className="text-muted">الدورات التدريبية</div>
            </div>
            <CourseTabs />
            <Link to="/student/AffiliateMarketingSetting" className="addBtn">
              <AddCircleIcon />
              إضافة دورة جديدة
            </Link>
          </div>
        </div>
      </div>
      {/* <SearchAndShowBar
        checkedKeys={checkedKeys}
        data={data}
        setCheckedKeys={setCheckedKeys}
        setTableOrNot={setIsTableView}
        checkAllHandler={handleCheckAll}
        TableOrNot={isTableView}
        notAdmin
      /> */}
      <TrainingCoursesCardContainer
        setData={setData}
        rowData={studentCourses}
        checkedKeys={checkedKeys}
        isLoading={isLoading}
        isFetched={isFetched}
        notAdmin
        setCheckedKeys={setCheckedKeys}
      />
    </div>
  );
};

export default TrainingCourses;

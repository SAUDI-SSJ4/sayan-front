import { useState } from "react";
import { Link } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useQuery } from "@tanstack/react-query";
import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import TrainingCoursesCardContainer from "../../../component/TrainingCourses/TrainingCoursesCard/TrainingCoursesCardContainer";
import { getStudentCourses } from "../../../utils/apis/client";
import { CourseTabs } from "./CourseTabs";
import CoursesContainer from "./features/CoursesContainer";

const TrainingCourses = () => {

  const [checkedKeys, setCheckedKeys] = useState([]);
  const [data, setData] = useState([]);

  // const { data: studentCourses = [], isLoading, isFetched } = useQuery({
  //   queryKey: ["studentCourses"],
  //   queryFn: getStudentCourses,
  //   retry: 2,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   cacheTime: 1000,
  // });
  const isLoading = false;
  const isFetched = true;

const studentCourses = [
  {
    id: 1,
    title: "مقدمة في البرمجة",
    instructor: "أحمد محمد",
    duration: "8 أسابيع",
    level: "مبتدئ",
    rating: 4.5,
    enrolled: 120,
    price: 199.99,
    favorite: false,
  },
  {
    id: 2,
    title: "تطوير تطبيقات الويب المتقدمة",
    instructor: "كمال علي",
    duration: "12 أسابيع",
    level: "متوسط",
    rating: 4.8,
    enrolled: 85,
    price: 299.99,
    favorite: false,
  },
  {
    id: 3,
    title: "الذكاء الاصطناعي وتعلم الآلة",
    instructor: "محمود حسن",
    duration: "10 أسابيع",
    level: "متقدم",
    rating: 4.7,
    enrolled: 60,
    price: 349.99,
    favorite: false,
  },
];



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
      {/* <TrainingCoursesCardContainer
        setData={setData}
        rowData={studentCourses}
        checkedKeys={checkedKeys}
        isLoading={isLoading}
        isFetched={isFetched}
        notAdmin
        setCheckedKeys={setCheckedKeys}
      /> */}
      <CoursesContainer 
        isLoading={isLoading}
        courses={studentCourses}
      />
      
    </div>
  );
};

export default TrainingCourses;

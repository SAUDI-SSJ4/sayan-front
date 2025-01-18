import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link, NavLink } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useState } from "react";
import { Error } from "@mui/icons-material";
import { Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getCourse } from "../../../utils/apis/client/academy";
import CoursesDataTaple from "./CoursesDataTaple";
import { Button, Col, FlexboxGrid, Panel, Tag } from "rsuite";
import styled from "styled-components";
import TrainingCoursesCardAcademy from "../../../component/TrainingCourses/TrainingCoursesCardAcademy/TrainingCoursesCard";
import AcademyDeleteModal from "../../../component/UI/DeleteModal/AcademyDeleteModal";
import { useCourses } from "../../../services/queries";


const AcadmeyTrainingCourses = () => {


  const [TableOrNot, setTableOrNot] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCheck = (key) => {
    setCheckedKeys((prev) => {
      if (prev.includes(key)) {
        // Remove the key if it's already checked
        return prev.filter((item) => item !== key);
      } else {
        // Add the key if it's not checked
        return [...prev, key];
      }
    });
  };

  const isChecked = (key) => checkedKeys.includes(key);
  const [searchQuery, setSearchQuery] = useState("");
const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"


const { data: CoursesData, isLoading, errors } = useCourses();

  const filteredCourses = CoursesData?.data

  .filter((course) => {
    if (activeTab === "all") return true;
    return course.type === activeTab;
  })
  .filter((course) => {
    // Case-insensitive search on course title
    return course.title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const sortedCourses = filteredCourses?.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title); // Sort alphabetically ascending
    } else {
      return b.title.localeCompare(a.title); // Sort alphabetically descending
    }
  });
  
  const checkAllHandler=()=>{
    if(filteredCourses?.length===checkedKeys?.length){
      setCheckedKeys([])
      return
    }
    setCheckedKeys(filteredCourses.map((course) => course.id))

  }
  const isAllSelected = filteredCourses?.length === checkedKeys?.length && filteredCourses?.length > 0

  if (errors) return <Error />;
  if (isLoading)
    return (
      <div className="w-full h-50 d-flex justify-content-center align-items-center">
        <Spinner className="" />
      </div>
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

              <div className="userTabs">
                <ul className="flex-wrap gap-3">
                  <li
                    className={`tablePage ${activeTab === "all" ? "active" : ""}`}
                    onClick={() => setActiveTab("all")}
                  >
                    الدورات ({CoursesData?.data.length || 0})
                  </li>
                  <li
                    className={`tablePage ${activeTab === "live" ? "active" : ""}`}
                    onClick={() => setActiveTab("live")}
                  >
                    الدورات المباشرة
                  </li>
                  <li
                    className={`tablePage ${activeTab === "recorded" ? "active" : ""}`}
                    onClick={() => setActiveTab("recorded")}
                  >
                    الدورات غير المباشرة
                  </li>
                </ul>
              </div>

              <Link to={"/academy/new-course"} className="addBtn">
                <AddCircleIcon />
                إضافة دورة جديدة
              </Link>
            </div>
          </div>
        </div>

        <SearchAndShowBar
           checkedKeys={checkedKeys}
           data={sortedCourses}
           setCheckedKeys={setCheckedKeys}
           setTableOrNot={setTableOrNot}
           checkAllHandler={() => checkAllHandler()}
           TableOrNot={TableOrNot}
           isAllSelected={isAllSelected}
           ShowEditAndDelete={ checkedKeys.length > 0} // Show only when TableOrNot is false and there are selected items
           searchQuery={searchQuery}
           setSearchQuery={setSearchQuery}
           sortOrder={sortOrder}
           showDeleteModal={showDeleteModal}
           setDeleteModal={setShowDeleteModal}
           setSortOrder={setSortOrder}
        />
        <AcademyDeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={() => console.log("confirm", checkedKeys)} />
      </div>

      {!TableOrNot ? (
       <FlexboxGrid justify="start" align="top" className="mt-4">
       {sortedCourses?.map((course) => (
        <FlexboxGrid.Item
          key={course.id}
          as={Col}
          colspan={24} // 100% on small screens
          sm={12}      // 2 per row on small devices
          md={8}       // 4 per row on large devices
          className="mb-3"
        >
          <TrainingCoursesCardAcademy 
          image={course.image}
  name={course.title}
  course={course}
  onCheck={()=>handleCheck(course.id)}
  checked={isChecked(course.id)}
  notAdmin={false}
  />
        </FlexboxGrid.Item>
       )
      )}
    </FlexboxGrid>
      ) : (
        <CoursesDataTaple CoursesData={sortedCourses} />
      )}
    </>
  );
};

export default AcadmeyTrainingCourses;

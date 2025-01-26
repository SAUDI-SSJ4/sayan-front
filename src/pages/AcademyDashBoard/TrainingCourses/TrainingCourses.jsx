import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link, NavLink } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useEffect, useMemo, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getAcademyCoursesThunk } from "../../../../redux/courses/CourseThunk";
import { useAuth } from "../../../utils/hooks/useAuth";


const AcadmeyTrainingCourses = () => {

  const dispatch = useDispatch()
  const [tableOrNot, setTableOrNot] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");

  const { user } = useAuth()
  const { academyCourses } = useSelector((state) => state.course)


  useEffect(() => {
    setisLoading(true)
    if (academyCourses.length == 0) {
      dispatch(getAcademyCoursesThunk()).unwrap()
    }
    setisLoading(false)
  }, [])


  const handleCheck = (key) => {
    setCheckedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };


  const isChecked = (key) => checkedKeys.includes(key);


  const checkAllHandler = () => {
    if (isAllSelected) {
      setCheckedKeys([]);
    } else {
      setCheckedKeys(filteredCourses.map((course) => course.id));
    }
  };


  const filteredCourses = useMemo(() => {
    const courses = academyCourses || [];
    return courses
      .filter((course) => (activeTab === "all" ? true : course.type === activeTab))
      .filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [academyCourses, activeTab, searchQuery]);


  const sortedCourses = useMemo(() => {
    return filteredCourses?.sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }, [filteredCourses, sortOrder]);

  const isAllSelected = filteredCourses?.length === checkedKeys?.length && filteredCourses?.length > 0;

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
                    الدورات ({academyCourses?.length || 0})
                  </li>
                  {/* <li
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
                  </li> */}
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
          TableOrNot={tableOrNot}
          isAllSelected={isAllSelected}
          ShowEditAndDelete={checkedKeys.length > 0}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOrder={sortOrder}
          showDeleteModal={showDeleteModal}
          setDeleteModal={setShowDeleteModal}
          setSortOrder={setSortOrder}
        />
        <AcademyDeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={() => console.log("confirm", checkedKeys)} />
      </div>

      {!tableOrNot ? (
        <FlexboxGrid justify="start" align="top" className="mt-4">
          {sortedCourses?.map((course) => (
            <FlexboxGrid.Item
              key={course.id}
              as={Col}
              colspan={24}
              sm={12}
              md={8}
              className="mb-3"
            >
              <TrainingCoursesCardAcademy
                name={course.title}
                course={course}
                onCheck={() => handleCheck(course.id)}
                checked={isChecked(course.id)}
                notAdmin={false}
                acadmey={user.academy || false}
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

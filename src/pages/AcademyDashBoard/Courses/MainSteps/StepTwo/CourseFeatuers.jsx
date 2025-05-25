import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddNewInteractiveTool from "./Features/InteractiveTools/AddNewInteractiveTool";
import {
  changeNavigate,
  changeOpenInteractive,
} from "../../../../../../redux/CourseSidebarSlice";
import Sidebar from "./Features/Sidebar";
import CourseForm from "../../../course/components/CourseForm";
import Curriculum from "../../../course/manage/components/curriculum";

const CourseFeatures = ({ course }) => {
  const dispatch = useDispatch();

  // Redux state
  const { navigate, openInteractive } = useSelector(
    (state) => state.courseSidebarSlice
  );
  const renderContent = useCallback(() => {
    switch (navigate) {
      case "basic-info":
        return <CourseForm course={course} />;
      case "curriculum":
        return <Curriculum course={course} />;
      default:
        return null;
    }
  }, [course, navigate]);

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">{renderContent()}</div>

        <AddNewInteractiveTool
          open={openInteractive}
          handleClose={() => dispatch(changeOpenInteractive(false))}
          changeNavigate={(tool) => dispatch(changeNavigate(tool))}
        />
      </div>
    </>
  );
};

export default CourseFeatures;

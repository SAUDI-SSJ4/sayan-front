import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddNewInteractiveTool from "./Features/InteractiveTools/AddNewInteractiveTool";
import {
  changeNavigate,
  changeOpenInteractive,
} from "../../../../../../redux/CourseSidebarSlice";
import AddNewChapter from "./Features/AddNewChapter";
import { AddNewVideo } from "./Features/AddNewVideo";
import { AddNewExam } from "./Features/AddNewExam";
import AddNewLesson from "./Features/AddNewLesson";
import LessonsList from "./LessonsList";
import Sidebar from "./Features/Sidebar";
import CourseForm from "../../../course/components/CourseForm";
import AddFlippingCard from "./Features/InteractiveTools/Cards/AddFlippingCard";
import AddHiddenCards from "./Features/InteractiveTools/Cards/AddHiddenCards";
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
      case "lessons":
        return <LessonsList courseId={course?.id} />;
      case "chapters":
        return <AddNewChapter courseId={course?.id} />;
      case "video":
        return <AddNewVideo />;
      case "exam":
        return <AddNewExam />;
      case "lesson":
        return <AddNewLesson courseId={course?.id} />;
      case "flippingCard":
        return <AddFlippingCard courseId={course?.id} />;
      case "hiddenCards":
        return <AddHiddenCards courseId={course?.id} />;
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

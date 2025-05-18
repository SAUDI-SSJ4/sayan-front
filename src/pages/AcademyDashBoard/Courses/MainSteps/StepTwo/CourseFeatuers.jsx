import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import style from "../../AddNewCourse.module.css";
import AddNewLesson from "./Features/AddNewLesson";
import AddNewChapter from "./Features/AddNewChapter";
import AddNewVideo from "./Features/AddNewVideo";
import { LessonsList } from "./LessonsList";
import AddHiddenCards from "./Features/InteractiveTools/Cards/AddHiddenCards";
import AddFlippingCard from "./Features/InteractiveTools/Cards/AddFlippingCard";
import { formatLongText } from "../../../../../utils/helpers";
import AddNewInteractiveTool from "./Features/InteractiveTools/AddNewInteractiveTool";
import {
  changeNavigate,
  changeOpenInteractive,
} from "../../../../../../redux/CourseSidebarSlice";
import Sidebar from "./Features/Sidebar";
import { AddNewExam } from "./Features/AddNewExam";
import CourseSteps from "../../../course/components/CourseSteps";

const CourseFeatures = ({ course }) => {
  const dispatch = useDispatch();

  // Redux state
  const { navigate, openInteractive } = useSelector(
    (state) => state.courseSidebarSlice
  );
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  // Local state
  const [flippingCards, setFlippingCards] = useState([]);
  const [hiddenCards, setHiddenCards] = useState([]);
  const [cardData, setCardData] = useState({
    color: "#007bff",
    image: "https://via.placeholder.com/400x200",
    title: "عنوان البطاقة",
    description: "محتوى البطاقة يظهر هنا.",
  });

  const renderContent = useCallback(() => {
    const commonProps = {
      courseId: course.id,
      chapterId: currentChapter?.id,
    };

    switch (navigate) {
      case "chapter":
        return <AddNewChapter {...commonProps} course={course} />;
      case "lesson":
        return <AddNewLesson {...commonProps} />;
      case "exam":
        return <AddNewExam {...commonProps} />;
      case "video":
        return <AddNewVideo {...commonProps} />;
      case "flippingCard":
        return (
          <AddFlippingCard
            setCardData={setCardData}
            cardData={cardData}
            flippingCards={flippingCards}
            setFlippingCards={setFlippingCards}
          />
        );
      case "hiddenCards":
        return (
          <AddHiddenCards
            setCardData={setCardData}
            cardData={cardData}
            hiddenCards={hiddenCards}
            setHiddenCards={setHiddenCards}
            currentLesson={currentLesson}
            courseId={course.id}
          />
        );
      default:
        return <AddNewChapter {...commonProps} />;
    }
  }, [
    course,
    currentChapter?.id,
    navigate,
    cardData,
    flippingCards,
    hiddenCards,
    currentLesson,
  ]);

  return (
    <>
      <CourseSteps course={course} />
      <div className="flex">
        <Sidebar />

        <LessonsList
          course={course}
          currentChapter={currentChapter}
          setCurrentChapter={setCurrentChapter}
          setCurrentLesson={setCurrentLesson}
          currentLesson={currentLesson}
        />

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

import React, { useEffect, useState, useMemo, useCallback } from "react";
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
      case "basic-info":
        return <CourseForm course={course} />;
      case "curriculum":
        return <Curriculum course={course} />;
      // case "lesson":
      //   return <AddNewLesson {...commonProps} />;
      // case "exam":
      //   return <AddNewExam {...commonProps} />;
      // case "video":
      //   return <AddNewVideo {...commonProps} />;
      // case "flippingCard":
      //   return (
      //     <AddFlippingCard
      //       setCardData={setCardData}
      //       cardData={cardData}
      //       flippingCards={flippingCards}
      //       setFlippingCards={setFlippingCards}
      //     />
      //   );
      // case "hiddenCards":
      //   return (
      //     <AddHiddenCards
      //       setCardData={setCardData}
      //       cardData={cardData}
      //       hiddenCards={hiddenCards}
      //       setHiddenCards={setHiddenCards}
      //       currentLesson={currentLesson}
      //       courseId={course.id}
      //     />
      //   );

      default:
        return null;
    }
  }, [course, currentChapter?.id, navigate]);

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

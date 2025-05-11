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
import { storage } from "../../../../../utils/storage";
import { AddNewExam } from "./Features/AddNewExam";
import Alert from "react-bootstrap/Alert";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../redux/courses/CourseThunk";

const CourseFeatures = () => {
  const courseId = localStorage.getItem("courseId");
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  // Redux state
  const { navigate, openInteractive } = useSelector(
    (state) => state.courseSidebarSlice
  );
  const { courseSummary, isError, isLoading } = useSelector(
    (state) => state.course
  );

  // Local state
  const [chapterId, setChapterId] = useState(null);
  const [flippingCards, setFlippingCards] = useState([]);
  const [hiddenCards, setHiddenCards] = useState([]);
  const [cardData, setCardData] = useState({
    color: "#007bff",
    image: "https://via.placeholder.com/400x200",
    title: "عنوان البطاقة",
    description: "محتوى البطاقة يظهر هنا.",
  });

  // Constants

  const currentCategoryId = useMemo(
    () => storage.get("cahrst1x7teq"),
    [categoryId]
  );
  const storageChapterId = useMemo(
    () =>
      storage.get("chapky89wsgnae") || courseSummary?.chapters?.[0]?.id || null,
    [courseSummary]
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCurrentCourseSummaryThunk(courseId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (storageChapterId) {
      setChapterId(storageChapterId);
    }
  }, [storageChapterId]);

  const renderContent = useCallback(() => {
    const commonProps = {
      categoryId: currentCategoryId,
      courseId,
      chapterId,
    };

    switch (navigate) {
      case "chapter":
        return <AddNewChapter {...commonProps} />;
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
          />
        );
      default:
        return <AddNewChapter {...commonProps} />;
    }
  }, [
    currentCategoryId,
    courseId,
    chapterId,
    navigate,
    cardData,
    flippingCards,
    hiddenCards,
  ]);

  const handleDisableCourse = () => {
    if (isError) return;
    return isLoading ? (
      "Loading..."
    ) : (
      <Alert variant="info" className="d-none d-lg-block text-center">
        <strong>Course:</strong>{" "}
        {courseSummary &&
          formatLongText(courseSummary?.title || "No Title", 50)}
      </Alert>
    );
  };

  return (
    <div className={style.dashboard}>
      <div className={`${style.sidebar} ${style.left} ${style.first}`}>
        <Sidebar chapterId={chapterId} />
      </div>

      <div className={`${style.sidebar} ${style.left} ${style.second}`}>
        {handleDisableCourse()}
        <LessonsList course={courseSummary} />
      </div>

      <div>{renderContent()}</div>

      <AddNewInteractiveTool
        open={openInteractive}
        handleClose={() => dispatch(changeOpenInteractive(false))}
        changeNavigate={(tool) => dispatch(changeNavigate(tool))}
      />
    </div>
  );
};

export default CourseFeatures;

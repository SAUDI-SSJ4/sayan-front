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
import { changeNavigate, changeOpenInteractive } from "../../../../../../redux/CourseSidebarSlice";
import Sidebar from "./Features/Sidebar";
import { storage } from "../../../../../utils/storage";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../redux/CourseSlice";
import {AddNewExam} from "./Features/AddNewExam"

const CourseFeatures = () => {
  const { courseId, categoryId } = useParams();
  const dispatch = useDispatch();

  // Redux state
  const { navigate, openInteractive } = useSelector((state) => state.courseSidebarSlice);
  const { courseSummary, isError, isLoading } = useSelector((state) => state.course);

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
  const currentCourseId = useMemo(() => storage.get("cousjvqpkbr3m"), [courseId]);
  const currentCategoryId = useMemo(() => storage.get("cahrst1x7teq"), [categoryId]);

  const storageChapterId = useMemo(
    () => storage.get("chapky89wsgnae") || courseSummary?.chapters?.[0]?.id || null,
    [courseSummary]
  );

  useEffect(() => {
    if (!isLoading && !courseSummary) {
      dispatch(fetchCurrentCourseSummaryThunk(currentCourseId));
    }
  }, [dispatch, isLoading, courseSummary, currentCourseId]);

  useEffect(() => {
    if (storageChapterId) {
      setChapterId(storageChapterId);
    }
  }, [storageChapterId]);



  const renderContent = useCallback(() => {
    const commonProps = { categoryId: currentCategoryId, courseId: currentCourseId, chapterId };

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
  }, [navigate, currentCategoryId, currentCourseId, chapterId, cardData, flippingCards, hiddenCards]);

  return (
    <div className={style.dashboard}>
      <div className={`${style.sidebar} ${style.left} ${style.first}`}>
        <Sidebar chapterId={chapterId} />
      </div>

      <div className={`${style.sidebar} ${style.left} ${style.second}`}>
        <h4 className="text-center mt-3">
          {isLoading
            ? "Loading..."
            : !isLoading && !isError && formatLongText(courseSummary?.title || "No Title", 50)}
        </h4>
        <LessonsList courses={courseSummary || []} />
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

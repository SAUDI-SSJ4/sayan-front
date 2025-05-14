import React, { useEffect, useState } from "react";
import CustomAccordion from "../../UI/CustomAccordion";
import DeleteButton from "../../UI/DeleteButton";
import Videotype from "../../../../../assets/icons/videoType.svg?react";
import Examtype from "../../../../../assets/icons/examType.svg?react";
import { formatLongText } from "../../../../../utils/helpers";
import style from "../../AddNewCourse.module.css";
import { useToast } from "../../../../../utils/hooks/useToast";
import { ChapterTitle } from "../../../../../utils/styles";
import { ConfirmDeleteCourseItem } from "../../../../../component/Models/ConfirmDeleteCourseItem";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { storage } from "../../../../../utils/storage";
import {
  latestLesson,
  updateLatestLesson,
} from "../../../../../../redux/courses/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "lucide-react";
import { deleteChapter } from "../../../../../utils/apis/client/academy";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../redux/courses/CourseThunk";

export const LessonsList = ({ course }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [courseItem, setCourseItem] = useState({});
  const [currentChapterId, setCurrentChapterId] = useState(
    storage.get("chapky89wsgnae")
  );
  const [currentLessonId, setCurrentLessonId] = useState(
    storage.get("leuhqzrsyh5e")
  );

  const [selectedLessonContent, setSelectedLessonContent] = useState(null);

  const handleAccordionChange = (panel, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleLessonClick = (content) => {
    setSelectedLessonContent(content);
  };

  const handleChangeLesson = (chapterId, lessonId) => {
    storage.update("chapky89wsgnae", chapterId);
    storage.update("leuhqzrsyh5e", lessonId);
    setCurrentChapterId(chapterId);
    setCurrentLessonId(lessonId);
    dispatch(updateLatestLesson({ chapterId, lessonId }));
  };

  useEffect(() => {
    // Sync state with storage in case it changes elsewhere
    const syncState = () => {
      setCurrentChapterId(storage.get("chapky89wsgnae"));
      setCurrentLessonId(storage.get("leuhqzrsyh5e"));
    };
    window.addEventListener("storage", syncState);
    return () => window.removeEventListener("storage", syncState);
  }, []);

  const countLessonContent = (lesson) => {
    if (lesson.type === "video") {
      return lesson?.video?.length;
    }

    if (lesson.type === "exam") {
      return lesson?.exam?.length;
    }

    if (lesson.type === "tool") {
      return lesson?.tool?.length;
    }
  };

  const LessonDetails = ({
    chapterId,
    lesson,
    selectedLessonContent,
    handleLessonClick,
    type,
  }) => {
    let items = [];

    if (type === "video") {
      items = lesson?.video;
    }

    if (type === "exam") {
      items = lesson?.exam;
    }

    if (type === "tool") {
      items = lesson?.tool;
    }

    const handleDelete = (lessonId, itemId, type) => {
      setOpen(true);
      setCourseItem({
        chapterId: chapterId,
        lessonId: lessonId,
        itemId: itemId,
        type: type,
      });
    };
    return (
      <>
        {items?.map((item, index) => (
          <div
            key={index}
            style={{
              fontSize: "14px",
              color: "#585C61",
              fontWeight: "600",
              padding: "0px",
              margin: "10px",
            }}
          >
            <div
              onClick={() => handleLessonClick(item)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "15px",
                marginBottom: "5px",
                cursor: "pointer",
                backgroundColor:
                  selectedLessonContent === item ? "#007bff" : "#fff",
                color: selectedLessonContent === item ? "#fff" : "#2b3674",
                border:
                  selectedLessonContent === item
                    ? "2px solid #007bff"
                    : "1px solid #ddd",
                borderRadius: "15px",
              }}
              className="lesson-item"
            >
              {selectedLessonContent === item && (
                <DeleteButton
                  onClick={() => handleDelete(item.lesson_id, item.id, type)}
                />
              )}
              <>
                {type === "video" ? (
                  <Videotype
                    alt="lesson type"
                    className={`${style.lessonType} ${
                      selectedLessonContent === item
                        ? style.lessonTypeActive
                        : ""
                    }`}
                  />
                ) : (
                  <Examtype
                    alt="lesson type"
                    className={`${style.lessonType} ${
                      selectedLessonContent === item
                        ? style.lessonTypeActive
                        : ""
                    }`}
                  />
                )}
                <span>{item?.title || "No title available"}</span>
              </>
            </div>
          </div>
        ))}

        {open && (
          <ConfirmDeleteCourseItem
            open={open}
            setOpen={setOpen}
            courseItem={courseItem}
          />
        )}
      </>
    );
  };

  const handleDeleteChapter = async (chapterId) => {
    const res = await deleteChapter({
      courseId: course?.id,
      chapterId: chapterId,
    });
    if (res.status) {
      dispatch(fetchCurrentCourseSummaryThunk(course?.id));
    }
  };

  const handleDisableChapter = (chapter) => {
    if (!chapter) return;
    return (
      <div className="flex items-center gap-4">
        <ChapterTitle onClick={() => alert(chapter.id)}>
          <strong>Chapter:</strong>{" "}
          {formatLongText(chapter?.title || "No Title", 50)}
        </ChapterTitle>
        <button onClick={() => handleDeleteChapter(chapter.id)}>
          <Trash />
        </button>
      </div>
    );
  };

  return (
    <>
      {course &&
        course.chapters?.map((chapter, chapterIndex) => (
          <div key={chapter.id || chapterIndex}>
            {handleDisableChapter(chapter)}
            {chapter.lessons?.map((lesson, lessonIndex) => (
              <CustomAccordion
                key={lesson.id || lessonIndex}
                data={[lesson]}
                defaultExpanded={expanded}
                onPanelChange={handleAccordionChange}
                renderSummary={() => (
                  <p className={style.LessonCard}>
                    <span>
                      {currentLessonId !== lesson.id ? (
                        <CheckCircleOutlinedIcon
                          className={style.title}
                          onClick={() =>
                            handleChangeLesson(chapter.id, lesson.id)
                          }
                        />
                      ) : (
                        <CheckCircleIcon
                          className={style.title}
                          style={{ color: "#00951b" }}
                        />
                      )}

                      {selectedLessonContent === lesson && <DeleteButton />}
                      {formatLongText(lesson.title, 15)}
                    </span>
                    <span className={style.count}>
                      ({lessonIndex + 1}/{countLessonContent(lesson)})
                    </span>
                  </p>
                )}
                renderDetails={() => (
                  <LessonDetails
                    chapterId={chapter.id}
                    lesson={lesson}
                    selectedLessonContent={selectedLessonContent}
                    handleLessonClick={handleLessonClick}
                    type={lesson.type}
                  />
                )}
              />
            ))}
          </div>
        ))}
    </>
  );
};

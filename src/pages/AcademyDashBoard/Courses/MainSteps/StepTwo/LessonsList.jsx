import React, { useState } from "react";
import CustomAccordion from "../../UI/CustomAccordion";
import DeleteButton from "../../UI/DeleteButton";
import Videotype from "../../../../../assets/icons/videoType.svg?react";
import Examtype from "../../../../../assets/icons/examType.svg?react";
import Tooltype from "../../../../../assets/icons/tool-svgrepo-com.svg";
import { formatLongText } from "../../../../../utils/helpers";
import style from "../../AddNewCourse.module.css";
import { useToast } from "../../../../../utils/hooks/useToast";

export const LessonsList = ({ courses }) => {
  const { error } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [selectedLessonContent, setSelectedLessonContent] = useState(null);

  const handleAccordionChange = (panel, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleLessonClick = (content) => {
    setSelectedLessonContent(content);
  };


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
  }

  const LessonDetails = ({ lesson, selectedLessonContent, handleLessonClick, type }) => {
    let items = [];

    if (type === "video") {
      items = lesson?.video
    }

    if (type === "exam") {
      items = lesson?.exam
    }

    if (type === "tool") {
      items = lesson?.tool
    }


    //tool

    return (
      <>
        {items?.map((item, index) => (
          <div
            key={index}
            style={{ fontSize: "14px", color: "#585C61", fontWeight: "600", padding: "0px", margin: "10px" }}
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
                backgroundColor: selectedLessonContent === item ? "#007bff" : "#fff",
                color: selectedLessonContent === item ? "#fff" : "#2b3674",
                border: selectedLessonContent === item
                  ? "2px solid #007bff"
                  : "1px solid #ddd",
                borderRadius: "15px",
              }}
              className="lesson-item"
            >
              {selectedLessonContent === item && <DeleteButton />}
              <>
                {type === "video" ? (
                  <Videotype
                    alt="lesson type"
                    className={`${style.lessonType} ${selectedLessonContent === item ? style.lessonTypeActive : ""
                      }`}
                  />
                ) : (
                  <Examtype
                    alt="lesson type"
                    className={`${style.lessonType} ${selectedLessonContent === item ? style.lessonTypeActive : ""
                      }`}
                  />
                )}
                <span>{item?.title || "No title available"}</span>
              </>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {courses && courses.chapters?.map((chapter, chapterIndex) => (
        <div key={chapter.id || chapterIndex}>
          <h5>Chapter: {chapter.title}</h5>
          {chapter.lessons?.map((lesson, lessonIndex) => (
            <CustomAccordion
              key={lesson.id || lessonIndex}
              data={[lesson]}
              defaultExpanded={expanded}
              onPanelChange={handleAccordionChange}
              renderSummary={() => (
                <p
                  style={{
                    fontSize: "14px",
                    color: "#2b3674",
                    fontWeight: "650",
                    margin: "0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5px",
                    width: "100%",
                  }}
                >
                  {selectedLessonContent === lesson && <DeleteButton />}
                  {formatLongText(lesson.title, 15)}
                  <span style={{ color: "#6B7280", fontSize: "14px", gap: "5px" }}>
                    ({lessonIndex + 1}/{countLessonContent(lesson)})
                  </span>
                </p>
              )}
              renderDetails={() => (
                <LessonDetails
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

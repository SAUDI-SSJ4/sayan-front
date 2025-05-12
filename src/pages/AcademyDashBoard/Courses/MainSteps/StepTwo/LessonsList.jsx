import React from "react";
import Videotype from "../../../../../assets/icons/videoType.svg?react";
import Examtype from "../../../../../assets/icons/examType.svg?react";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import { deleteChapter } from "../../../../../utils/apis/client/academy";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../redux/courses/CourseThunk";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const LessonsList = ({ course, currentChapter, setCurrentChapter }) => {
  const dispatch = useDispatch();
  const handleDeleteChapter = async (chapterId) => {
    const res = await deleteChapter({
      courseId: course?.id,
      chapterId: chapterId,
    });
    if (res.status) {
      dispatch(fetchCurrentCourseSummaryThunk(course?.id));
    }
  };
  return course.chapters.map((chapter) => (
    <Accordion key={chapter.id}>
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            style={{
              color: currentChapter?.id === chapter.id ? "#fff" : "#000",
            }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{
          background: currentChapter?.id === chapter.id ? "#0062ff" : "none",
          color: currentChapter?.id === chapter.id ? "#fff" : "#000",
        }}
        onClick={() => setCurrentChapter(chapter)}
      >
        <Typography component="span" className="flex items-center gap-2">
          <button onClick={() => handleDeleteChapter(chapter.id)}>
            <Trash2
              style={{
                color: currentChapter?.id === chapter.id ? "#fff" : "red",
              }}
              className="w-4 h-4"
            />
          </button>
          <h4 className="m-0 truncate text-base">{chapter?.title}</h4>
          <strong
            style={{
              color: currentChapter?.id === chapter.id ? "#fff" : "#5A6A85",
            }}
          >
            (1:2)
          </strong>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {chapter.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center gap-2 p-2 border-b border-gray-200"
          >
            {lesson.type === "video" ? (
              <Videotype alt="lesson type" />
            ) : (
              <Examtype alt="lesson type" />
            )}
            <span>{lesson?.title || "No title available"}</span>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  ));
};

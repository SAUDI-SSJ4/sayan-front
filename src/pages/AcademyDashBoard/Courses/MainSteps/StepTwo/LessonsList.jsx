import React from "react";
import Videotype from "../../../../../assets/icons/videoType.svg?react";
import Examtype from "../../../../../assets/icons/examType.svg?react";
import { useDispatch } from "react-redux";
import { ChevronDownIcon, Trash2 } from "lucide-react";
import { deleteChapter } from "../../../../../utils/apis/client/academy";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../redux/courses/CourseThunk";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
export const LessonsList = ({
  course,
  currentChapter,
  setCurrentChapter,
  currentLesson,
  setCurrentLesson,
}) => {
  return (
    <ul className="border-x border-[#EDEFF2] p-3 flex flex-col gap-4 m-0">
      {course.chapters.map((chapter) => (
        <li key={chapter.id} onClick={() => setCurrentChapter(chapter)}>
          <Accordion className="shadow-none">
            <AccordionSummary
              expandIcon={
                <ChevronDownIcon
                  size={24}
                  className="bg-[#0062FF] p-1 rounded-full text-white"
                />
              }
              className={`!flex !gap-10 !bg-white border border-[#EDEFF2] hover:!bg-[#EAEFF4] !rounded-[10px]  transition-colors duration-200 ${
                chapter.id === currentChapter?.id ? "!bg-[#EAEFF4]" : ""
              }`}
            >
              <Typography
                component="span"
                className="flex items-center gap-2 flex-1"
              >
                <DeleteChapter courseId={course.id} chapterId={chapter.id} />
                <h4 className="m-0 truncate max-w-20 text-[#2B3674] text-base">
                  {chapter.title}
                </h4>
                <strong className="text-[#5A6A85]">(1:2)</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className="flex flex-col gap-2 m-0 p-0">
                {chapter.lessons.map((lesson, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      className={`flex items-center gap-2 h-10 w-full hover:bg-[#EAEFF4] px-2 border border-[#EDEFF2] rounded-md transition-colors duration-200 ${
                        currentLesson?.id === lesson.id ? "bg-[#EAEFF4]" : ""
                      }`}
                      onClick={() => setCurrentLesson(lesson)}
                    >
                      {lesson.type === "video" ? (
                        <Videotype alt="lesson type" />
                      ) : (
                        <Examtype alt="lesson type" />
                      )}
                      <span>{lesson.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </li>
      ))}
    </ul>
  );
};

const DeleteChapter = ({ courseId, chapterId }) => {
  const dispatch = useDispatch();

  const handleDeleteChapter = async (chapterId) => {
    Swal.fire({
      title: "حذف الفصل",
      text: "هل تريد حذف هذا الفصل",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "حذف",
      cancelButtonText: "لا",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteChapter({
          courseId,
          chapterId: chapterId,
        });
        if (res.status) {
          dispatch(fetchCurrentCourseSummaryThunk(courseId));
        }
      }
    });
  };
  return (
    <button onClick={() => handleDeleteChapter(chapterId)}>
      <Trash2 className="w-4 h-4 text-red-500" />
    </button>
  );
};

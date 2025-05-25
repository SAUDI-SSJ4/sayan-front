import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ChevronDown, FileIcon } from "lucide-react";
import EditChapter from "./EditChapter";
import DeleteChapter from "./DeleteChapter";
import LessonsList from "./LessonsList";
import AddNewChapter from "./AddNewChapter";

function Curriculum({ course }) {
  return (
    <div className="space-y-2">
      {course.chapters.length > 0 && (
        <ul className="m-0 p-0 flex flex-col gap-2">
          {course.chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <ChapterItem
                key={chapter.id}
                chapter={chapter}
                index={index}
                courseId={course.id}
              />
            </li>
          ))}
        </ul>
      )}
      <AddNewChapter courseId={course.id} />
    </div>
  );
}

export default Curriculum;
function ChapterItem({ chapter, index, courseId }) {
  return (
    <Accordion className="shadow-none">
      <AccordionSummary
        expandIcon={<ChevronDown />}
        aria-controls="panel1-content"
        id="panel1-header"
        className="bg-white border border-[#edeff2] !rounded-md"
      >
        <div className="flex items-center gap-2">
          <label className="font-semibold">الفصل {index + 1} :</label>
          <FileIcon size={16} />
          <h5 className="m-0 p-0">{chapter.title}</h5>
          <div className="flex items-center">
            <EditChapter chapter={chapter} courseId={courseId} />
            <DeleteChapter courseId={courseId} chapterId={chapter.id} />
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <LessonsList
          lessons={chapter.lessons}
          chapterId={chapter.id}
          courseId={courseId}
        />
      </AccordionDetails>
    </Accordion>
  );
}

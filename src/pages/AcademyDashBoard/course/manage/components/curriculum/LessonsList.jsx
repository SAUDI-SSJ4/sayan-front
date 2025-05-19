import React from "react";
import AddNewLesson from "./AddNewLesson";
import { FileIcon } from "lucide-react";
import EditLesson from "./EditLesson";
import DeleteLesson from "./DeleteLesson";

function LessonsList({ lessons, chapterId, courseId }) {
  return (
    <div className="bg-[#f4f7fe] p-4 rounded-md space-y-4 ">
      {lessons.length > 0 && (
        <ul className="m-0 p-0 flex flex-col gap-2">
          {lessons.map((lesson, index) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              index={index}
              chapterId={chapterId}
              courseId={courseId}
            />
          ))}
        </ul>
      )}
      <AddNewLesson chapterId={chapterId} courseId={courseId} />
    </div>
  );
}

export default LessonsList;

const LessonItem = ({ lesson, index, courseId, chapterId }) => {
  return (
    <li className="flex items-center gap-2 bg-white p-4 rounded-md">
      <div className="flex items-center gap-2">
        <label className="font-semibold">الدرس {index + 1} :</label>
        <FileIcon size={16} />
        <h6 className="m-0 p-0">{lesson.title}</h6>
        <div className="flex items-center">
          <EditLesson
            lesson={lesson}
            chapterId={chapterId}
            courseId={courseId}
          />
          <DeleteLesson courseId={courseId} chapterId={chapterId} />
        </div>
      </div>
    </li>
  );
};

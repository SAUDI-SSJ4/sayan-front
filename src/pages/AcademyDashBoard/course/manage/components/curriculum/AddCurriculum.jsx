import React, { useState } from "react";
import { Button } from "@mui/material";
import { PlusIcon } from "lucide-react";
import CurriculumModal from "./CurriculumModal";
import LessonForm from "./LessonForm";
import AddNewExam from "./AddNewExam";
import AddFlippingCard from "../../../../Courses/MainSteps/StepTwo/Features/InteractiveTools/Cards/AddFlippingCard";
import AddHiddenCards from "../../../../Courses/MainSteps/StepTwo/Features/InteractiveTools/Cards/AddHiddenCards";

function AddCurriculum({ chapterId, courseId }) {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [curriculumType, setCurriculumType] = React.useState(null);
  const [cardData, setCardData] = useState({
    color: "#007bff",
    image: "https://via.placeholder.com/400x200",
    title: "عنوان البطاقة",
    description: "محتوى البطاقة يظهر هنا.",
  });
  const [flippingCards, setFlippingCards] = useState([]);
  const [hiddenCards, setHiddenCards] = useState([]);

  let content;
  switch (curriculumType) {
    case "lesson":
      content = (
        <div className="p-4 bg-white rounded-md">
          <LessonForm chapterId={chapterId} courseId={courseId} />
        </div>
      );
      break;
    case "exam":
      content = (
        <div className="p-4 bg-white rounded-md">
          <AddNewExam courseId={courseId} chapterId={chapterId} />
        </div>
      );
      break;
    case "interactiveTool":
      content = (
        <div className="p-4 bg-white rounded-md">
          <AddHiddenCards
            setCardData={setCardData}
            cardData={cardData}
            hiddenCards={hiddenCards}
            setHiddenCards={setHiddenCards}
            courseId={courseId}
            chapterId={chapterId}
          />
        </div>
      );
      break;
    case "flippingCard":
      content = (
        <div className="p-4 bg-white rounded-md">
          <AddFlippingCard
            cardData={cardData}
            setCardData={setCardData}
            flippingCards={flippingCards}
            setFlippingCards={setFlippingCards}
            courseId={courseId}
            chapterId={chapterId}
          />
        </div>
      );
      break;
    default:
      content = <CurriculumOptions setCurriculumType={setCurriculumType} />;
  }
  return (
    <div>
      {!openMenu && (
        <Button
          type="button"
          variant="outlined"
          className="!flex !items-center justify-center gap-2 h-10 w-36"
          onClick={() => setOpenMenu(true)}
        >
          <PlusIcon size={16} />
          <span>اضف مقرر</span>
        </Button>
      )}
      {openMenu && (
        <CurriculumModal
          setOpenMenu={setOpenMenu}
          setCurriculumType={setCurriculumType}
        >
          {content}
        </CurriculumModal>
      )}
    </div>
  );
}

export default AddCurriculum;

const CurriculumOptions = ({ setCurriculumType }) => {
  const options = [
    {
      name: "درس",
      key: "lesson",
    },
    {
      name: "اختبار",
      key: "exam",
    },
    {
      name: "اداه تفاعليه",
      key: "interactiveTool",
    },
    {
      name: "بطاقة مقلوبة",
      key: "flippingCard",
    },
  ];

  return (
    <ul className="flex rounded-md bg-white ">
      {options.map((option, index) => (
        <li
          key={index}
          onClick={() => {
            setCurriculumType(option.key);
          }}
          className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
        >
          <PlusIcon size={16} />
          <span>{option.name}</span>
        </li>
      ))}
    </ul>
  );
};

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form as RSForm, Button, IconButton, Panel } from "rsuite";
import * as Yup from "yup";
import { useCreateLessonMutation } from "../../../../services/mutation";
import { ButtonSoon } from "../../../utils/styles";
import { formatLongText } from "../../../utils/helpers";
import style from "./AddNewCourse.module.css";

import Videotype from "../../../assets/icons/videoType.svg?react";
import Examtype from "../../../assets/icons/examType.svg?react";
import Vact1 from "../../../assets/icons/Vector.svg?react";
import Vact2 from "../../../assets/icons/Vector (1).svg?react";
import Vact3 from "../../../assets/icons/Vector (2).svg?react";
import Vact4 from "../../../assets/icons/dd.svg?react";
import Vact5 from "../../../assets/icons/Widget 4.svg?react";

import AddNewLesson from "./AddNewLesson";
import AddNewChapter from "./AddNewChapter";
import AddNewExam from "./AddNewExam";
import AddNewVideo from "./AddNewVideo";
import VideoEditorSideBar from "./SideBars/VideoEditorSideBar";
import AddNewInteractiveTool from "./AddNewInteractiveTool";
import AddFlippingCard from "./AddFlippingCard";
import FlippingCardSideBar from "./SideBars/FlippingCardSideBar";
import HiddenCardsSideBar from "./SideBars/HiddenCardsSideBar";
import AddHiddenCards from "./AddHiddenCards";
import IconTextButton from "./UI/IconTextButton";
import CustomAccordion from "./UI/CustomAccordion";
import DeleteButton from "./UI/DeleteButton";

const fakeData = {
  data: {
    categories: [
      {
        title: "مقدمة في البرمجة",
        lessons: [
          { type: "video", video: { title: "ما هي البرمجة؟" } },
          { type: "video", video: { title: "تاريخ البرمجة" } },
          { type: "exam", video: { title: "اختبار أساسيات البرمجة" } },
        ],
      },
      {
        title: "جافا سكريبت المتقدمة",
        lessons: [
          { type: "video", video: { title: "ميزات ES6" } },
          { type: "exam", video: { title: "اختبار ممارسة جافا سكريبت" } },
        ],
      },
      {
        title: "أساسيات تطوير الويب",
        lessons: [
          { type: "video", video: { title: "نظرة عامة على HTML وCSS" } },
          { type: "video", video: { title: "بناء أول صفحة ويب لك" } },
          { type: "exam", video: { title: "اختبار HTML/CSS" } },
        ],
      },
    ],
  },
};

function AddNewCourseSteperTwo() {
  const { courseId, categoryId } = useParams();
  const [catFunctionalty, setCatFunctionalty] = useState(fakeData);
  const [addNewLesson, setAddNewLesson] = useState(1);
  const [categoryDetails, setCategoryDetails] = useState();
  const [expanded, setExpanded] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  
  const [flippingCards, setFlippingCards] = useState([]);
  const [hiddenCards, setHiddenCards] = useState([]);
  const [openInteractive, setOpenInteractive] = useState(false);
  const [cardData, setCardData] = useState({
    color: "#007bff",
    imageUrl: "https://via.placeholder.com/400x200",
    title: "عنوان البطاقة",
    content: "محتوى البطاقة يظهر هنا.",
  });

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    console.log("Selected Lesson:", lesson);
  };

  const handleAccordionChange = (panel, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const renderSideBarNav = () => (
    <div className={style.sideBarNav}>
      <div className={`${style.sideup} d-flex flex-column`} style={{ padding: "12px", transition: "all 0.3s ease" }}>
        <IconTextButton
          isActive={addNewLesson === "video"}
          onClick={() => setAddNewLesson("video")}
          icon={Vact1}
          text="اضافة فيديو"
        />
        <IconTextButton
          isActive={addNewLesson === "interactive"}
          onClick={() => { setAddNewLesson("interactive"); setOpenInteractive(true) }}
          icon={Vact2}
          text="اضافة اداة تفاعلية"
        />
        <IconTextButton
          isActive={addNewLesson === 2}
          onClick={() => setAddNewLesson(2)}
          icon={Vact3}
          text="اضافة اختبار"
        />
      </div>
      <div className={style.sidedown} style={{ padding: "12px", transition: "all 0.3s ease" }}>
        <IconTextButton
          isActive={addNewLesson === 1}
          onClick={() => setAddNewLesson(1)}
          icon={Vact4}
          text="اضافة درس"
        />
        <IconTextButton
          isActive={addNewLesson === 0}
          onClick={() => setAddNewLesson(0)}
          icon={Vact5}
          text="اضافة فصل جديد"
        />
      </div>
    </div>
  );

  const renderAccordion = () => (
    <CustomAccordion
      data={catFunctionalty?.data?.categories || []}
      defaultExpanded={expanded}
      onPanelChange={handleAccordionChange}
      renderSummary={(category, i) => (
        <p style={{
          fontSize: '14px', color: '#2b3674', fontWeight: '650', margin: '0',
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          gap: '5px', width: '100%'
        }}>
          {category.lessons.includes(selectedLesson) ? <DeleteButton /> : ""}
          {formatLongText(category.title, 15)}
          <span style={{ color: '#6B7280', fontSize: '14px' }}>
            ({i + 1}/{category.lessons.length})
          </span>
        </p>
      )}
      renderDetails={(category) => (
        <div style={{
          fontSize: '14px', color: '#585C61', fontWeight: '600',
          padding: '0px', margin: '10px',
        }}>
          {category.lessons.map((lesson, index) => (
            <div
              key={index}
              onClick={() => handleLessonClick(lesson)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '15px',
                marginBottom: '5px', cursor: 'pointer',
                backgroundColor: selectedLesson === lesson ? '#007bff' : '#fff',
                color: selectedLesson === lesson ? '#fff' : '#2b3674',
                border: selectedLesson === lesson ? '2px solid #007bff' : '1px solid #ddd',
                borderRadius: '15px',
              }}
              className="lesson-item"
            >
              {selectedLesson === lesson ? <DeleteButton /> : ""}
              {lesson.type === 'video' ? 
                <Videotype alt="lesson type" className={`${style.lessonType} ${selectedLesson === lesson ? style.lessonTypeActive : ""}`} /> : 
                <Examtype alt="lesson type" className={`${style.lessonType} ${selectedLesson === lesson ? style.lessonTypeActive : ""}`} />
              }
              <span>{lesson?.video?.title}</span>
            </div>
          ))}
        </div>
      )}
    />
  );

  const renderContent = () => {
    switch (addNewLesson) {
      case 0: return <AddNewChapter CategoryID={courseId} CourseID={categoryId} />;
      case 1: return <AddNewLesson CategoryID={courseId} CourseID={categoryId} />;
      case 2: return <AddNewExam />;
      case 3: return (
        <div className={style.categoryShow}>
          <h4 className="mb-4">عرض بيانات القسم</h4>
          <span></span>
          <p>العنوان : </p>
          <h4 className="mb-4">{categoryDetails?.title}</h4>
          <p>الوصف : </p>
          <h4 className="mb-4">{categoryDetails?.content}</h4>
          <p>الصورة : </p>
          <div className={style.catImage}>
            <img src={categoryDetails?.image} alt="" />
          </div>
          <p>عدد الدروس : </p>
          <h4 className="mb-4">{categoryDetails?.lessons.length}</h4>
          <button className={`${style.saveBtnTwo} fs-6 mt-1`} onClick={() => setAddNewLesson(1)}>
            اضافة درس جديد
          </button>
        </div>
      );
      case "video": return <AddNewVideo />;
      case "flippingCard": return <AddFlippingCard cardData={cardData} flippingCards={flippingCards} setFlippingCards={setFlippingCards} />;
      case "hiddenCards": return <AddHiddenCards cardData={cardData} hiddenCards={hiddenCards} setHiddenCards={setHiddenCards} />;
      default: return <div>test ??!!</div>;
    }
  };

  return (
    <div className={style.mainSec}>
      <div className={style.container}>
        <div className={`${style.sidexld} d-flex`}>
          {renderSideBarNav()}
          <div className={style.sideSecLap}>
            {renderAccordion()}
          </div>
        </div>
        {renderContent()}
        <AddNewInteractiveTool 
          addNewLesson={addNewLesson} 
          setAddNewLesson={setAddNewLesson} 
          open={openInteractive} 
          handleClose={() => setOpenInteractive(false)} 
        />
      </div>
    </div>
  );
}

export default AddNewCourseSteperTwo;

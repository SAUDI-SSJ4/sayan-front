import React, { useRef, useEffect, useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import Videotype from "../../../assets/icons/videoType.svg?react";
import Examtype from "../../../assets/icons/examType.svg?react";
import style from "./AddNewCourse.module.css";
import Vact1 from "../../../assets/icons/Vector.svg?react";
import Vact2 from "../../../assets/icons/Vector (1).svg?react";
import Vact3 from "../../../assets/icons/Vector (2).svg?react";
import Vact4 from "../../../assets/icons/dd.svg?react";
import Vact5 from "../../../assets/icons/Widget 4.svg?react";

import AddNewLesson from "./AddNewLesson";
import AddNewChapter from "./AddNewChapter";
import { useCreateLessonMutation } from "../../../../services/mutation";
import AddNewExam from "./AddNewExam";
import { useParams } from "react-router-dom";
import { ButtonSoon } from "../../../utils/styles";
import { formatLongText } from "../../../utils/helpers";
import { Form as RSForm, Button, IconButton, Panel } from "rsuite";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
} from "react-icons/ai";
import ColorPickerWithPreview from "../../../component/UI/Inputs/ColorPicker";
import AddNewVideo from "./AddNewVideo";
import VideoEditorSideBar from "./SideBars/VideoEditorSideBar";
import AddNewInteractiveTool from "./AddNewInteractiveTool";
import AddFlippingCard from "./AddFlippingCard";
import FlippingCardSideBar from "./SideBars/FlippingCardSideBar";
import HiddenCardsSideBar from "./SideBars/HiddenCardsSideBar";
import AddHiddenCards from "./AddHiddenCards";
import IconTextButton from "./UI/IconTextButton";
import CustomAccordion from "./UI/CustomAccordion";
import { color } from "framer-motion";
import { Delete } from "@mui/icons-material";
import DeleteButton from "./UI/DeleteButton";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("العنوان مطلوب"),
  content: Yup.string().required("الوصف مطلوب"),
  video: Yup.string().required("الفديو الخاص بالدرس مطلوب"),
});

function AddNewCourseSteperTwo() {
  const { courseId, categoryId } = useParams();
  const fakeData = {
    data: {
      categories: [
        {
          title: "مقدمة في البرمجة",
          lessons: [
            {
              type: "video",
              video: { title: "ما هي البرمجة؟" },
            },
            {
              type: "video",
              video: { title: "تاريخ البرمجة" },
            },
            {
              type: "exam",
              video: { title: "اختبار أساسيات البرمجة" },
            },
          ],
        },
        {
          title: "جافا سكريبت المتقدمة",
          lessons: [
            {
              type: "video",
              video: { title: "ميزات ES6" },
            },
            {
              type: "exam",
              video: { title: "اختبار ممارسة جافا سكريبت" },
            },
          ],
        },
        {
          title: "أساسيات تطوير الويب",
          lessons: [
            {
              type: "video",
              video: { title: "نظرة عامة على HTML وCSS" },
            },
            {
              type: "video",
              video: { title: "بناء أول صفحة ويب لك" },
            },
            {
              type: "exam",
              video: { title: "اختبار HTML/CSS" },
            },
          ],
        },
      ],
    },
  };

  const [CatFunctionalty, setCatFunctionalty] = useState(fakeData);

  const [addNewLesson, setAddNewLesson] = useState(1);
  const [CategoryDetails, setCategoryDetails] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [formData, setFormData] = useState({
    textColor: "#000000",
    borderColor: "#000000",
    headingColor: "#000000",
    fontType: "",
    headingFontSize: "",
    textFontSize: "",
    alignment: "right",
    lessonImage: null,
  });

  const handleChange1 = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, lessonImage: event.target.files[0] });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    console.log("Selected Lesson:", lesson);
  };

  const [ExamData, setExamData] = useState(null);

  const [flippingCards, setFlippingCards] = useState([]);

  const [hiddenCards, setHiddenCards] = useState([]);

  const [openInteractive, setOpenInteractive] = useState(false);

  const handleAccordionChange = (panel, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const [cardData, setCardData] = useState({
    color: "#007bff",
    imageUrl: "https://via.placeholder.com/400x200",
    title: "عنوان البطاقة",
    content: "محتوى البطاقة يظهر هنا.",
  });

  return (
    <div className={style.mainSec}>
      <div className={style.container}>
        <div className={`${style.sidexld} d-flex`}>
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


          <div className={style.sideSecLap}>
            <CustomAccordion
              data={CatFunctionalty?.data?.categories || []}
              defaultExpanded={expanded}
              onPanelChange={handleAccordionChange}
              renderSummary={(category, i) => (
                <p
                  style={{
                    fontSize: '14px',
                    color: '#2b3674',
                    fontWeight: '650',
                    margin: '0',
                    display: 'flex',
                    justifyContent: 'space-around'
                    , alignItems: 'center',
                    gap: '5px', width: '100%'
                  }}
                >
                  {category.lessons.includes(selectedLesson) ? <DeleteButton />:""}
                  {formatLongText(category.title, 15)}
                  <span style={{ color: '#6B7280', fontSize: '14px' }}>
                    ({i + 1}/{category.lessons.length})
                  </span>
                </p>
              )}
              renderDetails={(category) => (
                <div
                  style={{
                    fontSize: '14px',
                    color: '#585C61',
                    fontWeight: '600',
                    padding: '0px',
                    margin: '10px',
                  }}
                >
                  {category.lessons.map((lesson, index) => (
                    <div
                      key={index}
                      onClick={() => handleLessonClick(lesson)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '15px',
                        marginBottom: '5px',
                        cursor: 'pointer',
                        backgroundColor:
                          selectedLesson === lesson ? '#007bff' : '#fff',
                        color: selectedLesson === lesson ? '#fff' : '#2b3674',
                        border:
                          selectedLesson === lesson
                            ? '2px solid #007bff'
                            : '1px solid #ddd',
                        borderRadius: '15px',
                      }}
                      className="lesson-item"
                    >
                     {selectedLesson === lesson ? <DeleteButton/>:""}
                      {lesson.type === 'video' ? <Videotype
                        alt="lesson type"
                        className={`${style.lessonType} ${selectedLesson === lesson ? style.lessonTypeActive : ""}`}
                      /> : <Examtype
                        alt="lesson type"
                        className={`${style.lessonType} ${selectedLesson === lesson ? style.lessonTypeActive : ""}`}

                      />}

                      <span>{lesson?.video?.title}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
        {addNewLesson === 0 ? (
          <AddNewChapter CategoryID={courseId} CourseID={categoryId} />
        ) : addNewLesson === 3 ? (
          <div className={style.categoryShow}>
            <h4 className="mb-4">عرض بيانات القسم</h4>
            <span></span>
            <p>العنوان : </p>
            <h4 className="mb-4">{CategoryDetails?.title}</h4>
            <p>الوصف : </p>
            <h4 className="mb-4">{CategoryDetails?.content}</h4>
            <p>الصورة : </p>
            <div className={style.catImage}>
              <img src={CategoryDetails?.image} alt="" />
            </div>
            <p>عدد الدروس : </p>
            <h4 className="mb-4">{CategoryDetails?.lessons.length}</h4>
            <button
              className={`${style.saveBtnTwo} fs-6 mt-1`}
              onClick={() => setAddNewLesson(1)}
            >
              اضافة درس جديد
            </button>
          </div>
        ) : addNewLesson === 1 ? (
          <AddNewLesson CategoryID={courseId} CourseID={categoryId} />
        ) : addNewLesson === 2 ? (
          <AddNewExam
            ExamData={ExamData}
            setExamData={setExamData}
            CategoryID={courseId}
            CourseID={categoryId}
          />
        ) : addNewLesson === "video" ? (
          <AddNewVideo />
        ) : addNewLesson === "flippingCard" ? (
          <div>
            <AddFlippingCard cardData={cardData}  flippingCards={flippingCards} setFlippingCards={setFlippingCards} />
          </div>
        ) : addNewLesson === "hiddenCards" ? (
          <div>
            <AddHiddenCards cardData={cardData} hiddenCards={hiddenCards} setHiddenCards={setHiddenCards} />
          </div>
        ) : (
          <div>test ??!!</div>
        )}

        <AddNewInteractiveTool addNewLesson={addNewLesson} setAddNewLesson={setAddNewLesson} open={openInteractive} handleClose={() => setOpenInteractive(false)} />
        <div className={`${style.sidexld} d-flex`}>
          <div className={style.sideSettings}>
            {addNewLesson === 1 ? (
              /*<RSForm
                layout="vertical"
                style={{
                  maxWidth: 400,
                  margin: "0 auto",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
                onSubmit={handleSubmit}
              >
                <h5 style={{ textAlign: "center" }}>إعدادات التصميم</h5>

                <RSForm.Group>
                  <ColorPickerWithPreview
                    label="لون النص"
                    name="textColor"
                    value={formData.textColor}
                    onChange={handleChange1}
                  />
                </RSForm.Group>

                <RSForm.Group>
                  <ColorPickerWithPreview
                    label="لون الإطار"
                    name="borderColor"
                    value={formData.borderColor}
                    onChange={handleChange1}
                  />
                </RSForm.Group>

                <RSForm.Group>
                  <ColorPickerWithPreview
                    label="لون العناوين"
                    name="headingColor"
                    value={formData.headingColor}
                    onChange={handleChange1}
                  />
                </RSForm.Group>

                <RSForm.Group>
                  <RSForm.ControlLabel>نوع الخط</RSForm.ControlLabel>
                  <RSForm.Control
                    name="fontType"
                    value={formData.fontType}
                    onChange={(value) => handleChange1(value, "fontType")}
                  />
                </RSForm.Group>

                <RSForm.Group>
                  <RSForm.ControlLabel>حجم الخط للعناوين</RSForm.ControlLabel>
                  <RSForm.Control
                    name="headingFontSize"
                    type="number"
                    value={formData.headingFontSize}
                    onChange={(value) =>
                      handleChange1(value, "headingFontSize")
                    }
                  />
                </RSForm.Group>

                <RSForm.Group>
                  <RSForm.ControlLabel>حجم الخط للنصوص</RSForm.ControlLabel>
                  <RSForm.Control
                    name="textFontSize"
                    type="number"
                    value={formData.textFontSize}
                    onChange={(value) => handleChange1(value, "textFontSize")}
                  />
                </RSForm.Group>

                <RSForm.Group>
                  <RSForm.ControlLabel>المحاذاة</RSForm.ControlLabel>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      icon={<AiOutlineAlignRight />}
                      appearance={
                        formData.alignment === "right" ? "primary" : "default"
                      }
                      onClick={() => handleChange1("right", "alignment")}
                    />
                    <IconButton
                      icon={<AiOutlineAlignCenter />}
                      appearance={
                        formData.alignment === "center" ? "primary" : "default"
                      }
                      onClick={() => handleChange1("center", "alignment")}
                    />
                    <IconButton
                      icon={<AiOutlineAlignLeft />}
                      appearance={
                        formData.alignment === "left" ? "primary" : "default"
                      }
                      onClick={() => handleChange1("left", "alignment")}
                    />
                  </div>
                </RSForm.Group>

                <RSForm.Group>
                  <RSForm.ControlLabel>صورة للدرس</RSForm.ControlLabel>
                  <Button appearance="ghost" as="label">
                    رفع صورة
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                </RSForm.Group>

                <Button appearance="primary" type="submit">
                  إرسال
                </Button>
              </RSForm>*/
              <div/>
            ) : null}
            {addNewLesson === 2 ? (
              <div
                style={{
                  minWidth: 400,
                  margin: "0 auto",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="CustomFormControl col-12">
                      <label className="h5">الإجابات</label>

                      <Panel style={{ width: "250px" }} className="mt-3">
                        <div className="d-flex justify-content-between border-bottom">
                          <div className="font-weight-bold">عدد الأسئلة:</div>
                          <div>{ExamData?.questions?.length}</div>
                        </div>

                        <div className="mt-3">
                          {ExamData?.questions?.length &&
                            ExamData?.questions?.map((info, index) => (
                              <Panel
                                key={index}
                                header={`السؤال ${index + 1}`}
                                className="mb-3 border-bottom"
                              >
                                <div className="col-12 d-flex gap-3 flex-column">
                                  <div className="d-flex flex-row justify-content-between w-100 ">
                                    <div className="font-weight-bold">
                                      النوع:
                                    </div>
                                    <div>{info?.type}</div>
                                  </div>
                                  <div className="d-flex flex-row justify-content-between w-100 ">
                                    <div className="font-weight-bold">
                                      عدد الاختيارات:
                                    </div>
                                    <div>{info?.answers?.length}</div>
                                  </div>
                                  <div className="d-flex flex-row justify-content-between w-100 ">
                                    <div className="font-weight-bold">
                                      الإجابة الصحيحة:
                                    </div>
                                    <div>{info?.correctAnswer}</div>
                                  </div>
                                </div>
                              </Panel>
                            ))}
                        </div>
                      </Panel>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {addNewLesson === "video" ? <VideoEditorSideBar /> : <div />}
            {addNewLesson === "flippingCard" ? <FlippingCardSideBar cardData={cardData} setCardData={setCardData} flippingCards={flippingCards} setFlippingCards={setFlippingCards} /> : <div />}
            {addNewLesson === "hiddenCards" ? <HiddenCardsSideBar cardData={cardData} setCardData={setCardData} hiddenCards={hiddenCards} setHiddenCards={setHiddenCards} /> : <div />}

          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewCourseSteperTwo;

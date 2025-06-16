import React, { useState } from "react";
import {
  Modal,
  Button,
  Stack,
  Panel,
  Form,
  Input,
  Uploader,
  Loader,
} from "rsuite";
import { AiFillEye } from "react-icons/ai";
import HiddenCard from "../../../../component/UI/HiddenCard";
import ColorPickerWithPreview from "../../../../component/UI/Inputs/ColorPicker";
import {
  createLesson,
  postLessonTools,
} from "../../../../utils/apis/client/academy";
import { useToast } from "../../../../utils/hooks/useToast";
import { useDispatch } from "react-redux";
import { fetchCurrentCourseSummaryThunk } from "../../../../../redux/courses/CourseThunk";
import { Delete } from "@mui/icons-material";

const HiddenCardsSideBar = ({
  cards,
  setCards,
  cardData,
  setCardData,
  courseId,
  chapterId,
}) => {
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => setShowPreview(!showPreview);

  const handleChange = (field, value) => {
    if (field === "order") {
      const newOrder = parseInt(value);
      const existingCardWithOrder = cards.find(
        (card) => card.order === newOrder
      );
      if (existingCardWithOrder) {
        const updatedCards = cards.map((card) => {
          if (card.order === newOrder)
            return { ...card, order: cards.length + 1 };
          return card;
        });
        setCards(updatedCards);
      }
      setCardData((prevData) => ({ ...prevData, order: newOrder }));
    } else {
      setCardData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  const { success, error } = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    const newCard = { ...cardData, id: Date.now() };
    try {
      const resLesson = await createLesson(
        { courseId, chapterId },
        { title: newCard.title, type: "tool" }
      );
      if (resLesson.status && resLesson.data?.id) {
        const resTool = await postLessonTools(resLesson.data.id, {
          ...newCard,
          type: "hidden_cards",
        });
        if (resTool.status) {
          setCards([...cards, resTool.data || newCard]);
          success("تمت إضافة البطاقة المخفية بنجاح");
          dispatch(fetchCurrentCourseSummaryThunk(courseId));
          resetForm();
        } else {
          error(resTool.message || "فشل في إضافة أداة البطاقة المخفية");
        }
      } else {
        error(resLesson.message || "فشل في إنشاء درس للبطاقة المخفية");
      }
    } catch (err) {
      error(err.message || "حدث خطأ أثناء إضافة البطاقة");
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setCardData({
      title: "عنوان البطاقة المخفية",
      content: "محتوى البطاقة المخفية",
      image: null,
      color: "#3498db",
    });
    setSelectedCardIndex(-1);
  };

  const handleFileChange = (e) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      if (file) {
        handleChange("image", file);
      }
    }
  };

  const handleUpdateCard = () => {
    if (selectedCardIndex !== -1) {
      const updatedCards = [...cards];
      updatedCards[selectedCardIndex] = { ...cardData };
      setCards(updatedCards);
      success("تم تحديث البطاقة (محلياً - placeholder)");
      resetForm();
    }
  };

  const handleDeleteCard = () => {
    if (selectedCardIndex !== -1) {
      setCards(cards.filter((_, index) => index !== selectedCardIndex));
      success("تم حذف البطاقة (محلياً - placeholder)");
      resetForm();
    }
  };

  const [displayCard, setDisplayCard] = useState(null);

  return (
    <div className="container col-12">
      <h4 style={{ color: "#2B3674", fontWeight: "600" }}>إعدادات البطاقات المخفية</h4>
      <div className="d-flex flex-column gap-2 border-bottom">
        <div className="d-flex justify-content-between p-2">
          <div>نوع الأداة:</div>
          <div>بطاقات مخفية</div>
        </div>
        <div>
          <div className="w-100">
            <div className="d-flex row justify-content-center mt-4">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="col-10 p-2"
                  style={{
                    border: selectedCardIndex === index ? "1px solid #3498db" : "1px solid #eee",
                    backgroundColor: selectedCardIndex === index ? "#eaf5ff" : "transparent",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                  onClick={() => {
                    setCardData(card);
                    setSelectedCardIndex(index);
                  }}
                >
                  <p><strong>{card.title}</strong></p>
                  <p>{card.content}</p>
                  {selectedCardIndex === index && (
                    <Button
                      appearance="ghost"
                      color="red"
                      onClick={handleDeleteCard}
                      style={{ marginTop: "5px" }}
                    >
                      <Delete /> حذف
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Form className="w-100">
            <Form.Group className="CustomFormControl">
              <Form.ControlLabel>عنوان البطاقة</Form.ControlLabel>
              <Input
                className="w-100"
                placeholder="أدخل عنوان البطاقة"
                value={cardData.title}
                onChange={(value) => handleChange("title", value)}
              />
            </Form.Group>

            <Form.Group className="CustomFormControl">
              <Form.ControlLabel>محتوى البطاقة</Form.ControlLabel>
              <Input
                as="textarea"
                rows={3}
                placeholder="أدخل محتوى البطاقة"
                value={cardData.content}
                onChange={(value) => handleChange("content", value)}
              />
            </Form.Group>

            <Form.Group className="CustomFormControl">
              <Form.ControlLabel>صورة البطاقة (اختياري)</Form.ControlLabel>
              <input type="file" onChange={(e) => handleFileChange(e)} />
            </Form.Group>

            <Form.Group className="CustomFormControl">
              <ColorPickerWithPreview
                label={"لون البطاقة"}
                name={"لون البطاقة"}
                value={cardData.color}
                onChange={(value) => handleChange("color", value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-center gap-2">
              {selectedCardIndex !== -1 ? (
                <>
                  <Button className="btn btn-primary" onClick={handleUpdateCard}>
                    تحديث البطاقة
                  </Button>
                  <Button className="btn btn-secondary" onClick={resetForm}>
                    إلغاء
                  </Button>
                </>
              ) : (
                <Button
                  className="btn btn-primary"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <>
                      <Loader size="xs" /> جاري الإنشاء...
                    </>
                  ) : (
                    "انشاء البطاقة"
                  )}
                </Button>
              )}
            </div>
          </Form>
        </div>
        <div className="d-flex justify-content-between p-2">
          <div>عدد البطاقات:</div>
          <div>{cards?.length}</div>
        </div>
      </div>
      <div
        className="d-flex justify-content-start gap-2 align-items-center p-2 cursor-pointer"
        onClick={toggleModal}
        style={{ cursor: "pointer" }}
      >
        معاينة الأداة <AiFillEye />
      </div>

      <Modal open={showPreview} onClose={toggleModal} size="lg" centered>
        <Modal.Header>
          <Modal.Title>معاينة البطاقات المخفية</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <div key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", width: "200px" }}>
                  <h5>{card.title}</h5>
                  <p>{card.content}</p>
                  {card.image && <p><em>Image would be here</em></p>}
                  <div style={{ height: "20px", backgroundColor: card.color }}></div>
                </div>
              ))
            ) : (
              <p>لا توجد بطاقات للعرض.</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleModal} appearance="subtle">
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HiddenCardsSideBar;

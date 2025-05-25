import React from "react";
import HiddenCard from "../../../../../../../../component/UI/HiddenCard";
import HiddenCardsSideBar from "../../../../../SideBars/HiddenCardsSideBar";

const AddHiddenCards = ({
  hiddenCards,
  setHiddenCards,
  cardData,
  setCardData,
  courseId,
  chapterId,
  isLoading,
  onSubmit,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="p-4 border-l border-[#EDEFF2]">
        <h4 style={{ color: "#2B3674", fontWeight: "600" }}>
          إنشاء بطاقة مخصصة
        </h4>

        <h5 style={{ color: "#2b3674" }}>معاينة البطاقة:</h5>
        <HiddenCard
          cardData={cardData}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </div>

      <div className="p-4">
        <HiddenCardsSideBar
          cardData={cardData}
          setCardData={setCardData}
          hiddenCards={hiddenCards}
          setHiddenCards={setHiddenCards}
          courseId={courseId}
          chapterId={chapterId}
        />
      </div>
    </div>
  );
};

export default AddHiddenCards;

import React, { useState } from "react";

const FlippingCard = ({ cardData }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      style={{
        perspective: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={handleFlip}
        style={{
          width: "400px",
          height: "300px",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          transition: "transform 0.6s",
          cursor: "pointer",
        }}
      >
        {/* Front Side */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "8px",
            padding: "1rem",
            backgroundColor: cardData.color,
            color: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4>{cardData.title || "عنوان البطاقة"}</h4>

          {cardData.imageUrl && (
            <img
              src={cardData.imageUrl}
              alt="Card Preview"
              style={{ width: "100%", borderRadius: "4px", marginBottom: "1rem" }}
            />
          )}
        </div>

        {/* Back Side */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "8px",
            padding: "1rem",
            backgroundColor: cardData.color,
            color: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{cardData.content || "محتوى البطاقة يظهر هنا."}</p>
       
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;

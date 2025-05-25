import React, { useState } from "react";
import { Button, Loader } from "rsuite";

const HiddenCard = ({ cardData, isLoading, onSubmit }) => {
  return (
    <div
      style={{
        perspective: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem auto",
      }}
    >
      {cardData ? (
        <div
          style={{
            width: "320px",
            height: "380px",
            transformStyle: "preserve-3d",
            //   transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
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
                style={{
                  width: "100%",
                  borderRadius: "4px",
                  marginBottom: "1rem",
                }}
              />
            )}
            <p>{cardData.description || "محتوى البطاقة يظهر هنا."}</p>

            {onSubmit && (
              <div style={{ marginTop: "1rem" }}>
                <Button
                  appearance="primary"
                  onClick={onSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader size="xs" /> جاري الحفظ...
                    </>
                  ) : (
                    "حفظ البطاقة"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HiddenCard;

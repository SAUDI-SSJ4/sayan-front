import { ArrowBack } from "@mui/icons-material";
import React from "react";
import addcourse from "../../../../assets/icons/Button.svg";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function CourseHeader() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  return (
    <div className="TablePageHeader" style={{ marginBottom: "24px" }}>
      <div className="HeaderContainer">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name">
            <div className="icon border-0" style={{ marginLeft: "12px" }}>
              <img src={addcourse} alt="Add Course" />
            </div>
            <div
              style={{
                color: "#2b3674",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              {courseId ? "تعديل الدورة التدريبية" : "إضافة دورة تدريبية"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {courseId && (
              <Button
                type="button"
                className="!flex !items-center justify-center gap-2 h-10 w-36"
              >
                نشر الدورة
              </Button>
            )}
            <Button
              type="button"
              variant="outline-info"
              onClick={() => navigate("/academy/training-courses")}
              className="!flex !items-center justify-center gap-2 h-10 w-36"
            >
              <span style={{ marginLeft: "5px" }}>رجوع</span>{" "}
              <ArrowBack style={{ fontSize: "20px" }} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseHeader;

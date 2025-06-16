import { ArrowBack } from "@mui/icons-material";
import React, { useState } from "react";
import addcourse from "../../../../assets/icons/Button.svg";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { publishCourseDraft } from "../../../../utils/apis/client/academy";
import { useToast } from "../../../../utils/hooks/useToast";
import { fetchCurrentCourseSummaryThunk } from "../../../../../redux/courses/CourseThunk";
import { useDispatch } from "react-redux";

function CourseHeader({ course }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);
  const { success, error } = useToast();
  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const response = await publishCourseDraft(course.id);
      if (response.status) {
        success(response.data.message);
        dispatch(fetchCurrentCourseSummaryThunk(course.id));
      } else {
        error(response.data.error || "فشل في نشر المادة");
      }
    } catch (err) {
      error("حدث خطأ أثناء نشر المادة");
    } finally {
      setIsPublishing(false);
    }
  };

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
              {course ? "تعديل المادة التعليمية" : "إضافة مادة تعليمية"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {course && (
              <Button
                type="button"
                variant={course.status ? "outline-dark" : "primary"}
                className="!flex !items-center justify-center gap-2 h-10 w-36"
                onClick={handlePublish}
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span>جاري النشر...</span>
                  </>
                ) : course.status ? (
                  "جعلها مسودة"
                ) : (
                  "نشر المادة"
                )}
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

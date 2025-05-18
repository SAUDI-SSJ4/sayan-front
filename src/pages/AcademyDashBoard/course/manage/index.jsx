import React, { useEffect } from "react";
import CourseForm from "../components/CourseForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentCourseSummaryThunk } from "../../../../../redux/courses/CourseThunk";
import { Alert, Spinner } from "react-bootstrap";
import { useCourseContext } from "../context/CourseContext";
import CourseFeatures from "../../Courses/MainSteps/StepTwo/CourseFeatuers";

function EditCourse() {
  const { courseStep } = useCourseContext();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { courseSummary, isError, isLoading } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCurrentCourseSummaryThunk(courseId));
    }
  }, [courseId, dispatch]);

  return (
    <main>
      {isLoading && (
        <div className="flex items-center justify-center py-40">
          <Spinner />
        </div>
      )}
      {!isLoading && isError && (
        <Alert variant="danger" className="mb-4 rounded-[8px]">
          <div className="fw-bold mb-2" style={{ fontSize: "16px" }}>
            حدث خطأ أثناء تحميل البيانات
          </div>
          <p style={{ fontSize: "14px", margin: 0 }}>
            يرجى المحاولة مرة أخرى لاحقاً.
          </p>
        </Alert>
      )}
      {!isLoading && courseSummary && (
        <>
          {courseStep === 1 && <CourseForm course={courseSummary} />}
          {courseStep === 2 && <CourseFeatures course={courseSummary} />}
        </>
      )}
    </main>
  );
}

export default EditCourse;

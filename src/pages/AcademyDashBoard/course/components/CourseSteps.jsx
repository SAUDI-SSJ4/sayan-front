import React from "react";
import steper1 from "../../../../assets/icons/steper1 (1).svg";
import steper2 from "../../../../assets/icons/steper2.svg";

import { Button } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "lucide-react";

function CourseSteps({ isLoading, course, setCourseStep, courseStep }) {
  const getProgressImage = () => {
    switch (courseStep) {
      case 1:
        return steper1;
      case 2:
        return steper2;
      default:
        return steper1;
    }
  };
  return (
    <div className="border-b border-gray-200 flex justify-center items-center gap-40 py-5">
      <div className="text-gray-400 flex flex-col justify-between">
        <img src={getProgressImage()} alt="Stepper" />
        <ul className="mt-4  flex items-center gap-4">
          <li>معلومات الدورة</li>
          <li>باني الاقسام</li>
          <li>اطلاق الدورة</li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline-info"
          onClick={() => setCourseStep((prev) => prev + 1)}
          className="!flex !items-center justify-center gap-2 h-10 w-36"
        >
          <ArrowRight />
          <span>التالي</span>
        </Button>
        {courseStep !== 1 && (
          <Button
            type="button"
            variant="outline-info"
            onClick={() => setCourseStep((prev) => prev - 1)}
            className="!flex !items-center justify-center gap-2 h-10 w-36"
          >
            <span>السابق</span>
            <ArrowLeft />
          </Button>
        )}

        <Button type="submit" disabled={isLoading} className="h-10 w-36">
          {course ? "حفظ" : "استمرار"}
        </Button>
      </div>
    </div>
  );
}

export default CourseSteps;

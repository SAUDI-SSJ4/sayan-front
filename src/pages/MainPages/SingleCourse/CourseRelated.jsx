import React from "react";
import SubjectCard from "../../../component/MainPages/SubjectCard/SubjectCard";
import { isNotEmpty } from "../../../utils/helpers";

export const CourseRelated = ({ courseData }) => {
  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h3 className="text-center text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1c1c1c] mb-6 sm:mb-8">
        مواد تعليمية مناسبة لك
      </h3>
      
      {/* تخطيط محسن للجوال مع توسيط مثالي */}
      <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center gap-4 sm:gap-6 lg:gap-8">
        {isNotEmpty(courseData?.related) && 
          courseData.related.map((course, index) => (
            <div
              key={course.id || index}
              className="w-full max-w-[320px] sm:w-auto sm:max-w-none flex justify-center"
            >
              <div className="w-full sm:w-auto">
                <SubjectCard mainData={course} />
              </div>
            </div>
          ))}
      </div>
      
      {/* حالة عدم وجود دورات */}
      {!isNotEmpty(courseData?.related) && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">
            📚
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            لا توجد مواد تعليمية مناسبة متاحة حالياً
          </p>
        </div>
      )}
    </div>
  );
};

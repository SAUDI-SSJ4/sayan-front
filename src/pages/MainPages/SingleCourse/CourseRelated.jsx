import React from "react";
import SubjectCard from "../../../component/MainPages/SubjectCard/SubjectCard";
import { motion } from "framer-motion";
import Style from "./SingleCourse.module.scss";
import { isNotEmpty } from "../../../utils/helpers";

export const CourseRelated = ({ courseData }) => {
  return (
    <div className="mt-3 CustomContainer">
      <h3 style={{
        textAlign: "center",
        fontSize: "28px",
        fontFamily: "Noto Kufi Arabic",
        fontWeight: "800",
        color: "#1c1c1c",
      }}>
        مواد تعليمية مناسبة لك</h3>
        <div className={Style.relatedCourses}>
          {isNotEmpty(courseData?.related) && 
          courseData.related.map((course, index) => (
            <motion.div
              key={course.id || index}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SubjectCard mainData={course} />
            </motion.div>
          ))}
        </div>
    </div>
  );
};

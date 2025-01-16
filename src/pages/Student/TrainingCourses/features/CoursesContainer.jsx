import React from "react";
import CourseCard from "../components/CourseCard";
import styles from "./CoursesContainer.module.css";

const CoursesContainer = ({ isLoading, courses }) => {
  return (
    <div className={styles.coursesContainer}>
      {isLoading ? (
        <div className={styles.loading}>Loading courses</div>
      ) : courses.length === 0 ? (
        <div className={styles.noCourses}>No courses available</div>
      ) : (
        <div className={styles.courseGrid}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesContainer;
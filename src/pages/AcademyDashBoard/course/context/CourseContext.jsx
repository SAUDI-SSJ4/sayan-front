import React, { createContext, useEffect, useState } from "react";

const CourseContext = createContext(null);

function CourseContextProvider({ children }) {
  const [courseStep, setCourseStep] = useState(
    localStorage.getItem("course-step")
      ? Number(localStorage.getItem("course-step"))
      : 1
  );
  useEffect(() => {
    localStorage.setItem("course-step", courseStep);
  }, [courseStep]);
  return (
    <CourseContext.Provider
      value={{
        courseStep,
        setCourseStep,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export default CourseContextProvider;

export const useCourseContext = () => {
  const context = React.useContext(CourseContext);
  if (context === undefined) {
    throw new Error(
      "useCourseContext must be used within a CourseContextProvider"
    );
  }
  return context;
};

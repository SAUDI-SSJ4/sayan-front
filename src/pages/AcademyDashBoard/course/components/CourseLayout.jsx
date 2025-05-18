import React from "react";
import { Outlet } from "react-router-dom";
import CourseHeader from "./CourseHeader";
import CourseContextProvider from "../context/CourseContext";

function CourseLayout() {
  return (
    <>
      <CourseHeader />
      <CourseContextProvider>
        <Outlet />
      </CourseContextProvider>
    </>
  );
}

export default CourseLayout;

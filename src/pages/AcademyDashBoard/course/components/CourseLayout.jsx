import React from "react";
import { Outlet } from "react-router-dom";
import CourseHeader from "./CourseHeader";

function CourseLayout() {
  return (
    <>
      <CourseHeader />
      <Outlet />
    </>
  );
}

export default CourseLayout;

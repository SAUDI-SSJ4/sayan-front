import Style from "./SingleCourse.module.scss";
import Footer from "../../../component/MainPages/Footer/Footer";
import Header2 from "../../../component/MainPages/Header2/Header2";
import React, { useState, useEffect, Fragment } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "../../../utils/apis/client";
import toast from "react-hot-toast";
import { CourseCard } from "./CourseCard";
import { CourseInfo } from "./CourseInfo";
import { CourseRelated } from "./CourseRelated";

const SingleCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [showBuyCourses, setshowBuyCourses] = useState(false);

  const {
    data: courseData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setshowBuyCourses(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleChange = (panel) => (_, isExpanded) =>
    setExpanded(isExpanded ? panel : false);

  if (isError) {
    console.log(error);
    toast.error(error.message || "Something went wrong");
    return navigate("/");
  }

  return (
    <Fragment>
      <Header2>
        <div className={Style.Container} style={{ paddingBottom: "150px" }}>
          <CourseCard
            active={active}
            setActive={setActive}
            showBuyCourses={showBuyCourses}
            courseData={courseData}
            setshowBuyCourses={setshowBuyCourses}
            isLoading={isLoading}
          />

          <div className={Style.cardInfo}>
            <CourseInfo
              courseData={courseData}
              active={active}
              expanded={expanded}
              handleChange={handleChange}
            />
          </div>
        </div>
      </Header2>
      <CourseRelated courseData={courseData} />
      <Footer />
    </Fragment>
  );
};

export default SingleCourse;

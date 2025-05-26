import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useLocation, useNavigate } from "react-router-dom";
import SubjectCard from "../../MainPages/SubjectCard/SubjectCard";
import { getCourse } from "../../../utils/apis/client/academy";
import { useQuery } from "@tanstack/react-query";

// Import Swiper styles

const SubjectSlider = ({ LayOut2, Laytout3, courses, academySettings }) => {
  const [path, setPath] = useState("");
  const router = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let temp = location.pathname;
    if (temp.split("/").length === 3) {
      console.log(temp);
    } else {
      temp = temp.replace(/\/[^/]+\/?$/, "");
    }

    setPath(temp);
  });

  // const {
  //   data: courses,
  //   isLoadingCourses,
  //   errorsCourses,
  // } = useQuery({
  //   queryKey: ["ACourses"],
  //   queryFn: () => getCourse(),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   retry: 2,
  //   onSuccess: (data) => {
  //     console.log("dataa",data)
  //     setAllCoursesPage(data);
  //   },
  // });

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className="container all-product-slider--1"
      style={{ position: "relative", marginTop: "120px" }}
    >
      {LayOut2 ? (
        <div className="Layout2Title mb-3 fs-6 fw-bold title-text--1">
          {" "}
          المواد التعليمية
        </div>
      ) : Laytout3 ? (
        <div className="d-flex mb-3 justify-content-between align-items-center">
          <div className="LayoutSectionTitle fs-6 fw-bold title-text--1 p-0 m-0">
            المواد{" "}
            <span className="fs-6 fw-bold title-text--1 m-0 p-0">
              التعليمية.
            </span>
          </div>
          <div
            onClick={() => {
              router(`${path}/AllCoursesPage`);
            }}
            style={{
              color: "#009AFF",
              fontSize: "18px",
              fontWeight: "800",
              cursor: "pointer",
            }}
            className="fs-6 fw-bold text-content--1 p-0 m-0"
          >
            شاهد المزيد
          </div>
        </div>
      ) : (
        <div className="LayoutSectionTitle fs-6 fw-bold title-text--1 p-0 m-0">
          المواد <span className="fs-6 fw-bold title-text--1">التعليمية.</span>
        </div>
      )}
      <Swiper
        pagination={{
          dynamicBullets: true,
          el: ".swiper-pagination",
          enabled: true,
        }}
        navigation={{
          nextEl: ".swiper-button-prev",
          prevEl: ".swiper-button-next",
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        breakpoints={{
          0: {
            slidesPerView: 0,
            spaceBetween: 15,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },

          1200: {
            slidesPerView: 3,
            spaceBetween: 15,
            pagination: {
              dynamicBullets: true,
              el: ".swiper-pagination",
              enabled: false,
            },
          },
        }}
        className="mySwiperContainer  pb-5 SubjectSlider-slide-swiper"
        wrapperClass="container pt-lg-3  px-0"
      >
        {courses.map((e, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="d-flex justify-content-center ">
                <SubjectCard mainData={e} academySettings={academySettings} />
              </div>
            </SwiperSlide>
          );
        })}

        {/* Add more slides as needed */}

        {/* Custom navigation arrows */}
        <div className="swiper-pagination" style={{ bottom: "5px" }}></div>
      </Swiper>

      <div
        className="swiper-button-next"
        id="next"
        style={{ right: "-25px" }}
      ></div>
      <div className="swiper-button-prev" style={{ left: "-25px" }}></div>
    </div>
  );
};

export default SubjectSlider;

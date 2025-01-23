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

const SubjectSlider = ({ LayOut2, Laytout3, mainData }) => {
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
  // make a temp data for courses add temp coureses to tempCourses useState
const [AllCoursesPage, setAllCoursesPage] = useState([
  {
    id: 1,
    image: "path/to/image1.jpg",
    title: "Data Structures",
    type: "Programming",
    rated: 4.5,
    short_content: "Learn about the different data structures and their implementations in C++.",
    academy_image: "path/to/academy_image1.jpg",
    trainer: "John Doe",
    academy: "Tech Academy",
    price: "$199",
  },
  {
    id: 2,
    image: "path/to/image2.jpg",
    title: "Algorithms",
    type: "Programming",
    rated: 4.7,
    short_content: "Learn about the different algorithms and their implementations in C++.",
    academy_image: "path/to/academy_image2.jpg",
    trainer: "Jane Smith",
    academy: "Code Academy",
    price: "$249",
  },
  {
    id: 3,
    image: "path/to/image3.jpg",
    title: "Object-Oriented Programming",
    type: "Programming",
    rated: 4.6,
    short_content: "Learn about the different object-oriented programming concepts and their implementations in C++.",
    academy_image: "path/to/academy_image3.jpg",
    trainer: "Emily Johnson",
    academy: "Learn Academy",
    price: "$299",
  },    
]);


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
        {AllCoursesPage?.map((e, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="d-flex justify-content-center ">
                <SubjectCard mainData={e} />
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

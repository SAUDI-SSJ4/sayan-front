import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SubjectCard from "./SubjectCard";
import { useLocation, useNavigate } from "react-router-dom";
import { getHome } from "../../../utils/apis/client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";
import classes from "./SubjectCard.module.scss";

const SubjectSlider = ({ layoutType }) => {
  const [basePath, setBasePath] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const adjustedBasePath =
      pathname.split("/").length === 3 ? pathname : pathname.replace(/\/[^\\/]+\/?$/, "");
    setBasePath(adjustedBasePath);
  }, [pathname]);

  const {
    data: homeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getHome"],
    queryFn: () => getHome(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000,
  });


  if (isError) {
    return (
      <div className="CustomContainer mt-5">
        <h2>Data Not Found :)</h2>
      </div>
    );
  }

  const handleNavigation = () => navigate(`${basePath}/AllCoursesPage`);

  const getTitleSection = () => {

    if (layoutType === 2) {
      return <div className="Layout2Title">المواد التعليمية</div>;
    }

    if (layoutType === 3) {
      return (
        <div className="d-flex justify-content-between">
          <div className="LayoutSectionTitle">
            المواد <span>التعليمية.</span>
          </div>
          <div onClick={handleNavigation} className="text-primary fw-bold fs-5 cursor-pointer">
            شاهد المزيد
          </div>
        </div>
      );
    }
    return <div className={`${classes.title} text-center`}>المواد التعليمية الأكثر مبيعا</div>;
  };

  return (
    <div className="CustomContainer mt-5 position-relative" data-aos-duration="1000">
      {/* Title Section */}
      {getTitleSection()}
      <Swiper
        pagination={{ clickable: true }}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        spaceBetween={10}
        loop
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          991: { slidesPerView: 2 },
          1200: { slidesPerView: 3, pagination: { enabled: true } },
          1400: { slidesPerView: 4, pagination: { enabled: true } },
        }}
        className="mySwiperContainer pb-5"
      >
        {isLoading ? (
          <>
            {[...Array(4)].map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton variant="rectangular" width={220} height={200} />
                <Skeleton width="40%" />
                <Skeleton width="70%" />
              </SwiperSlide>
            ))}
          </>
        ) : (
          homeData?.mostSold?.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="d-flex justify-content-center"
              >
                <SubjectCard mainData={item} />
              </motion.div>
            </SwiperSlide>
          ))
        )}
        <div className="swiper-pagination" style={{ bottom: "5px" }}></div>
      </Swiper>

      <div className="swiper-button-next animate__animated  animate__shakeY"></div>
      <div className="swiper-button-prev animate__animated  animate__shakeY"></div>
    </div>
  );
};

export default SubjectSlider;

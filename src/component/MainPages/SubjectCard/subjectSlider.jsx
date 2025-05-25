import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SubjectCard from "./SubjectCard";
import { useNavigate } from "react-router-dom";
import { getHome } from "../../../utils/apis/client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";
import classes from "./SubjectCard.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SubjectSlider = ({ layoutType }) => {
  const navigate = useNavigate();
  const [swiperRef, setSwiperRef] = useState(null);

  const { data: homeData, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });

  const featuredCourses = homeData?.data?.featured_courses || [];

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-12 mb-4">
            <Skeleton variant="text" width={300} height={40} />
          </div>
          <div className="col-12">
            <div className="row">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="col-md-3 col-sm-6 col-12 mb-4">
                  <Skeleton variant="rectangular" height={200} />
                  <Skeleton variant="text" width="80%" height={30} style={{ marginTop: 10 }} />
                  <Skeleton variant="text" width="60%" height={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!featuredCourses.length) {
    return null;
  }

  return (
    <motion.div
      className="py-5 bg-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className={classes.SliderHeader}>
          <motion.h2 
            className="fw-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            الدورات المميزة
          </motion.h2>
          <div className={classes.NavigationButtons}>
            <button 
              className={classes.NavButton} 
              onClick={() => swiperRef?.slidePrev()}
              aria-label="السابق"
            >
              <ArrowForwardIcon />
            </button>
            <button 
              className={classes.NavButton} 
              onClick={() => swiperRef?.slideNext()}
              aria-label="التالي"
            >
              <ArrowBackIcon />
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={setSwiperRef}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={featuredCourses.length > 4}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className={classes.CustomSwiper}
        >
          {featuredCourses.map((course, index) => (
            <SwiperSlide key={course.id || index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SubjectCard mainData={course} featured={true} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-4">
          <motion.button
            className={classes.ViewAllButton}
            onClick={() => navigate("/courses")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            عرض جميع الدورات
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SubjectSlider;

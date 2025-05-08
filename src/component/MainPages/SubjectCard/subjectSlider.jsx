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

  // Fake data for testing
  const fakeData = [
    {
      id: 1,
      image:
        "https://s3-alpha-sig.figma.com/img/8a47/17a7/89853001701ad01de05bb0012529be44?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eAXRiR9xA6LtNcV7u474yKCfvA0rwUGt9zkKoSZTY09b~nHV8LYbxW2HGwUWVAqSR-XhFpephioIURVi5pvdjgDgeb1vxgQrlP6b0aTPBeA43RTq35NcspDffhTrvxZ~ZLW5xpDQ4Di~0zDub9SJmufUJ4F1RLMMUvJCKMNsA~IPhPs4L9HJo7N82PvMX13vmoqtqB~U5x2gjNI4vY~QqyGK6lrXKLmbHAokySFllds2OzkcH-HsigJq8HGxc43fJ3pJFiwLuL7A0gU7K5hgqt3ER4FM8Rkpu7WHWvf9JE8S7gVqXbodW4B9akDzu~syh50h8frp1cny0YLUpYPY-w__",
      title: "دورة تنمية الذات",
      type: "recorded",
      rated: 4.5,
      short_content: "تعلم صناعة التطبيقات والمواقع بنفسك",
      academy_image:
        "https://s3-alpha-sig.figma.com/img/3b64/96f2/f86afb89a30440318d448c2eb1a2e0d5?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LQ2G8YJvl97b~nP-pNQpQBk-MYfjsp7AYaxdP5iCdKYxGKiozmoUOJhhqx~VInGhXZCLB~zlcZkHVGmRLbL2ZhnMHd8-tSgOJYdrQB9sGl1XVP56xX6Ppb2~213sD5hiRgR6QJfm9HcytdjpjocnvhrOmvepgfNAEQdnjiLRy-xHvQHPxwYYVD1WBuFo8n2V18GktjlOCXLqnnkwgiBJY2-MUZQlsKsBj4zkq8DXdELYoC4pcUtaxwR1mQhtmlCHd3d6n9yZU5li83QH7hlcoS4go7SP9ukwCfqdY8MY~1hwnu4t5NSBS~uLnRyrzEc2yOSq4AOzr9vEeG03PlrGUA__",
      trainer: "John Doe",
      academy: "React Academy",
      price: 100,
    },
    {
      id: 2,
      image:
        "https://s3-alpha-sig.figma.com/img/8a47/17a7/89853001701ad01de05bb0012529be44?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eAXRiR9xA6LtNcV7u474yKCfvA0rwUGt9zkKoSZTY09b~nHV8LYbxW2HGwUWVAqSR-XhFpephioIURVi5pvdjgDgeb1vxgQrlP6b0aTPBeA43RTq35NcspDffhTrvxZ~ZLW5xpDQ4Di~0zDub9SJmufUJ4F1RLMMUvJCKMNsA~IPhPs4L9HJo7N82PvMX13vmoqtqB~U5x2gjNI4vY~QqyGK6lrXKLmbHAokySFllds2OzkcH-HsigJq8HGxc43fJ3pJFiwLuL7A0gU7K5hgqt3ER4FM8Rkpu7WHWvf9JE8S7gVqXbodW4B9akDzu~syh50h8frp1cny0YLUpYPY-w__",
      title: "دورة تنمية الذات",
      type: "attend",
      rated: 5,
      short_content: "تعلم صناعة التطبيقات والمواقع بنفسك",
      academy_image:
        "https://s3-alpha-sig.figma.com/img/3b64/96f2/f86afb89a30440318d448c2eb1a2e0d5?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LQ2G8YJvl97b~nP-pNQpQBk-MYfjsp7AYaxdP5iCdKYxGKiozmoUOJhhqx~VInGhXZCLB~zlcZkHVGmRLbL2ZhnMHd8-tSgOJYdrQB9sGl1XVP56xX6Ppb2~213sD5hiRgR6QJfm9HcytdjpjocnvhrOmvepgfNAEQdnjiLRy-xHvQHPxwYYVD1WBuFo8n2V18GktjlOCXLqnnkwgiBJY2-MUZQlsKsBj4zkq8DXdELYoC4pcUtaxwR1mQhtmlCHd3d6n9yZU5li83QH7hlcoS4go7SP9ukwCfqdY8MY~1hwnu4t5NSBS~uLnRyrzEc2yOSq4AOzr9vEeG03PlrGUA__",
      trainer: "Jane Smith",
      academy: "JS Masters",
      price: 150,
    },
    {
      id: 3,
      image:
        "https://s3-alpha-sig.figma.com/img/8a47/17a7/89853001701ad01de05bb0012529be44?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eAXRiR9xA6LtNcV7u474yKCfvA0rwUGt9zkKoSZTY09b~nHV8LYbxW2HGwUWVAqSR-XhFpephioIURVi5pvdjgDgeb1vxgQrlP6b0aTPBeA43RTq35NcspDffhTrvxZ~ZLW5xpDQ4Di~0zDub9SJmufUJ4F1RLMMUvJCKMNsA~IPhPs4L9HJo7N82PvMX13vmoqtqB~U5x2gjNI4vY~QqyGK6lrXKLmbHAokySFllds2OzkcH-HsigJq8HGxc43fJ3pJFiwLuL7A0gU7K5hgqt3ER4FM8Rkpu7WHWvf9JE8S7gVqXbodW4B9akDzu~syh50h8frp1cny0YLUpYPY-w__",
      title: "دورة تنمية الذات",
      type: "live",
      rated: 3.8,
      short_content: "تعلم صناعة التطبيقات والمواقع بنفسك",
      academy_image:
        "https://s3-alpha-sig.figma.com/img/3b64/96f2/f86afb89a30440318d448c2eb1a2e0d5?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LQ2G8YJvl97b~nP-pNQpQBk-MYfjsp7AYaxdP5iCdKYxGKiozmoUOJhhqx~VInGhXZCLB~zlcZkHVGmRLbL2ZhnMHd8-tSgOJYdrQB9sGl1XVP56xX6Ppb2~213sD5hiRgR6QJfm9HcytdjpjocnvhrOmvepgfNAEQdnjiLRy-xHvQHPxwYYVD1WBuFo8n2V18GktjlOCXLqnnkwgiBJY2-MUZQlsKsBj4zkq8DXdELYoC4pcUtaxwR1mQhtmlCHd3d6n9yZU5li83QH7hlcoS4go7SP9ukwCfqdY8MY~1hwnu4t5NSBS~uLnRyrzEc2yOSq4AOzr9vEeG03PlrGUA__",
      trainer: "Alice Johnson",
      academy: "CSS Experts",
      price: 0, // Free course
    },
    // Add more fake data objects as needed
  ];

  useEffect(() => {
    const adjustedBasePath =
      pathname.split("/").length === 3
        ? pathname
        : pathname.replace(/\/[^\\/]+\/?$/, "");
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
          <div
            onClick={handleNavigation}
            className="text-primary fw-bold fs-5 cursor-pointer"
          >
            شاهد المزيد
          </div>
        </div>
      );
    }
    return (
      <div className={`${classes.title} text-center`}>
        المواد التعليمية الأكثر مبيعا
      </div>
    );
  };

  // Determine which data to use
  const dataToRender =
    isError || !homeData?.mostSold ? fakeData : homeData.mostSold;

  return (
    <div
      className="CustomContainer mt-5 position-relative"
      data-aos-duration="1000"
    >
      {/* Title Section */}
      {getTitleSection()}
      <Swiper
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
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
          // Use dataToRender instead of homeData?.mostSold
          dataToRender.map((item, index) => (
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

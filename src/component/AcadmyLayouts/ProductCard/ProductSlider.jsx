import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import ProductCard from "./ProductCard";
import { useLocation, useNavigate } from "react-router-dom";

// Import Swiper styles

const ProductSlider = ({ academyData }) => {
  const [path, setPath] = useState("");
  const router = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let temp = location.pathname;
    if (temp.split("/").length === 3) {
      console.log(temp); // Output: "/academyLayout/3"
    } else {
      // Remove the last segment and trailing slash if they exist
      temp = temp.replace(/\/[^/]+\/?$/, "");
    }

    setPath(temp);
  });

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className="container mb-5 all-product-slider--2"
      style={{ position: "relative", marginTop: "120px" }}
    >
      <div className="LayoutSectionTitle m-0 fs-6 fw-bold title-text--1">
        المنتجات{" "}
        <span className="fs-6 fw-bold title-text--1 m-0">الرقمية.</span>
      </div>

      <Swiper
        pagination={{
          dynamicBullets: true,
          el: ".swiper-pagination",
          enabled: true,
        }}
        navigation={false}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        breakpoints={{
          0: {
            slidesPerView: 1,
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
        className="mySwiperContainer py-4"
        wrapperClass="container pt-lg-3 px-0"
      >
        {academyData?.products?.map((e, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="d-flex justify-content-center ">
                <ProductCard
                  productCardInfo={e}
                  mainProductsData={academyData}
                />
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

export default ProductSlider;

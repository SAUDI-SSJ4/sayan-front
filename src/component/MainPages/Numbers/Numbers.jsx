import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import classes from "./Numbers.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import UpStaris from "../../../assets/icons/UpStaris.svg";

const Numbers = () => {
  return (
    <div className="all-header-content-top">
      <div className={`${classes.Container}`}>
      <h2>هنا تبدأ رحلتك من العلم الى العمل</h2>
        <div className={`${classes.SwieperContainer}`} style={{ width: "100%" }}>
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            style={{ width: "100%" }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={15}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              575: {
                slidesPerView: 2,
              },

              991: {
                slidesPerView: 3,
              },

              1200: {
                slidesPerView: 4,
              },
            }}
          >
            <SwiperSlide>
              <div className={`${classes.SliderCard} card-style-1`}>
                <div className={classes.Icon}>
                  <img src={UpStaris} />
                </div>
                <h2>زيادة الإنتاجية</h2>
                <p>
                  التدريب يجعل الموظفين أكثر كفاءة وإنتاجية، حيث يكونون مجهزين بشكل أفضل
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${classes.SliderCard} card-style-1`}>
                <div className={classes.Icon}>
                  <img src={UpStaris} />
                </div>
                <h2>زيادة الإنتاجية</h2>
                <p>
                  التدريب يجعل الموظفين أكثر كفاءة وإنتاجية، حيث يكونون مجهزين بشكل أفضل
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${classes.SliderCard} card-style-1`}>
                <div className={classes.Icon}>
                  <img src={UpStaris} />
                </div>
                <h2>زيادة الإنتاجية</h2>
                <p>
                  التدريب يجعل الموظفين أكثر كفاءة وإنتاجية، حيث يكونون مجهزين بشكل أفضل
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${classes.SliderCard} card-style-1`}>
                <div className={classes.Icon}>
                  <img src={UpStaris} />
                </div>
                <h2>زيادة الإنتاجية</h2>
                <p>
                  التدريب يجعل الموظفين أكثر كفاءة وإنتاجية، حيث يكونون مجهزين بشكل أفضل
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${classes.SliderCard} card-style-1`}>
                <div className={classes.Icon}>
                  <img src={UpStaris} />
                </div>
                <h2>زيادة الإنتاجية</h2>
                <p>
                  التدريب يجعل الموظفين أكثر كفاءة وإنتاجية، حيث يكونون مجهزين بشكل أفضل
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${classes.SliderCard} card-style-1`}>
                <div className={classes.Icon}>
                  <img src={UpStaris} />
                </div>
                <h2>زيادة الإنتاجية</h2>
                <p>
                  التدريب يجعل الموظفين أكثر كفاءة وإنتاجية، حيث يكونون مجهزين بشكل أفضل
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${classes.SliderCard} card-style-1`}>
                <div className={classes.Icon}>
                  <img src={UpStaris} />
                </div>
                <h2>زيادة الإنتاجية</h2>
                <p>
                  التدريب يجعل الموظفين أكثر كفاءة وإنتاجية، حيث يكونون مجهزين بشكل أفضل
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${classes.SliderCard} card-style-1`}>
                <div className={classes.Icon}>
                  <img src={UpStaris} />
                </div>
                <h2>زيادة الإنتاجية</h2>
                <p>
                  التدريب يجعل الموظفين أكثر كفاءة وإنتاجية، حيث يكونون مجهزين بشكل أفضل
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${classes.SliderCard} card-style-1`}>
                <div className={classes.Icon}>
                  <img src={UpStaris} />
                </div>
                <h2>زيادة الإنتاجية</h2>
                <p>
                  التدريب يجعل الموظفين أكثر كفاءة وإنتاجية، حيث يكونون مجهزين بشكل أفضل
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Numbers;

import classes from "./PartnerSection.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import comp1 from "../../../assets/images/comp1.png";
import comp2 from "../../../assets/images/comp2.png";
import comp3 from "../../../assets/images/comp3.png";
import comp4 from "../../../assets/images/comp4.png";
import comp5 from "../../../assets/images/comp5.png";
import comp6 from "../../../assets/images/comp6.png";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

const PartnerSection = () => {
  return (
    <>
      <div className={classes.sectionContainer} style={{ marginTop: "150px" }}>
        <div className="container">
          <div
            className="LayoutSectionTitle"
            style={{
              marginBottom: "55px",
              textAlign: "center",
              fontWeight: 700,
              fontSize: "32px",
            }}
          >
            عملاء نفخر بهم
          </div>
        </div>
        <div
          className={classes.SwiperContainer}
          style={{ backgroundColor: "white", paddingBlock: "20px" }}
        >
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 60,
              },
            }}
          >
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={comp1} alt="sayn academy logo" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={comp1} alt="sayn academy logo" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={comp2} alt="sayn academy logo" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={comp3} alt="sayn academy logo" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={comp4} alt="sayn academy logo" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={comp5} alt="sayn academy logo" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={comp6} alt="sayn academy logo" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={comp6} alt="sayn academy logo" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default PartnerSection;

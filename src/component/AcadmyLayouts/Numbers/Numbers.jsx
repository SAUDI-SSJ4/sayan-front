import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import classes from "./Numbers.module.scss";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import GraduateLay from "../../../assets/images/GraduateLay.png";
import TraneeLayOut from "../../../assets/images/TraneeLayOut.png";
import certifacateLayout from "../../../assets/images/certifacateLayout.png";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const Numbers = () => {
  const [Grad, setGrad] = useState(0);

  return (
    <div className={`${classes.Container} all-top-info-layout-3`}>
      <div className={classes.Title}>
        <h2 className="fs-5 fw-bold title-text--1">
          ارقاما
          <span className="fs-5 fw-bold title-text--1">نفتخر</span> بها
        </h2>
      </div>
      <div
        className={`${classes.SwieperContainer} px-3`}
        style={{ width: "100%" }}
      >
        <Swiper
          style={{ width: "100%" }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          breakpoints={{
            0:{
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            1200: {
              slidesPerView: 3
            }
          }}
        >
          <SwiperSlide>
            <div className={classes.SliderCard}>
              <img src={GraduateLay} />
              <div>
                <h2>
                  {" "}
                  <CountUp
                    className="account-balance"
                    start={0}
                    end={500}
                    delay={1}
                    duration={2}
                    useEasing={true}
                    separator=","
                  />
                  +
                </h2>
                <span>عدد الطلاب</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={classes.SliderCard}>
              <img src={TraneeLayOut} />
              <div>
                <h2>
                  {" "}
                  <CountUp
                    className="account-balance"
                    start={0}
                    end={10}
                    delay={1}
                    duration={5}
                    useEasing={true}
                    separator=","
                  />
                  +
                </h2>
                <p>عدد المدربين </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={classes.SliderCard}>
              <img src={certifacateLayout} />
              <div>
                <h2>
                  {" "}
                  <CountUp
                    className="account-balance"
                    start={0}
                    end={300}
                    delay={1}
                    duration={2}
                    useEasing={true}
                    separator=","
                  />
                  +
                </h2>
                <p>الشهادات الممنوحة </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Numbers;

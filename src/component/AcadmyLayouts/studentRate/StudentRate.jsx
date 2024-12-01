import classes from "./StudentRate.module.scss";
import RateProfile from "../../../assets/images/RateProfile.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import RateStars from "../../../assets/images/rateStars.png";
import quma from "../../../assets/images/quma.png";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
const StudentRateSection = ({ Laytout3 }) => {
  return (
    <div
      className={classes.StudentRateContainer}
      style={Laytout3 ? { marginTop: "150px" } : null}
    >
      <div className={classes.SectionTitle}>أراء الطلاب .</div>

      <div className="container mt-5">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          breakpoints={{
            768: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          <SwiperSlide>
            <div className={classes.RateCard}>
              <div className="d-flex align-items-center gap-2">
                <img src={RateProfile} />
                <div>
                  <div className={classes.RateName}>محمد احمد</div>
                  <img src={RateStars} />
                </div>
              </div>
              <div className={classes.RateParagraph}>
                النظام ممتاز! عشان كذا احنا مازلنا متمسكين لحد وقتنا هذا بالعمل
                مع مجموعة أحمد باشماخ من وقت بدأنا تأسيس شركتنا
              </div>
              <div className="d-flex justify-content-between">
                <h3
                  style={{ fontSize: "14px", margin: "0px", color: "#12141D" }}
                >
                  CEO, Ahmed
                </h3>
                <img width={57} src={quma} />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={classes.RateCard}>
              <div className="d-flex align-items-center gap-2">
                <img src={RateProfile} />
                <div>
                  <div className={classes.RateName}>محمد احمد</div>
                  <img src={RateStars} />
                </div>
              </div>
              <div className={classes.RateParagraph}>
                النظام ممتاز! عشان كذا احنا مازلنا متمسكين لحد وقتنا هذا بالعمل
                مع مجموعة أحمد باشماخ من وقت بدأنا تأسيس شركتنا
              </div>
              <div className="d-flex justify-content-between">
                <h3
                  style={{ fontSize: "14px", margin: "0px", color: "#12141D" }}
                >
                  CEO, Ahmed
                </h3>
                <img width={57} src={quma} />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={classes.RateCard}>
              <div className="d-flex align-items-center gap-2">
                <img src={RateProfile} />
                <div>
                  <div className={classes.RateName}>محمد احمد</div>
                  <img src={RateStars} />
                </div>
              </div>
              <div className={classes.RateParagraph}>
                النظام ممتاز! عشان كذا احنا مازلنا متمسكين لحد وقتنا هذا بالعمل
                مع مجموعة أحمد باشماخ من وقت بدأنا تأسيس شركتنا
              </div>
              <div className="d-flex justify-content-between">
                <h3
                  style={{ fontSize: "14px", margin: "0px", color: "#12141D" }}
                >
                  CEO, Ahmed
                </h3>
                <img width={57} src={quma} />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default StudentRateSection;

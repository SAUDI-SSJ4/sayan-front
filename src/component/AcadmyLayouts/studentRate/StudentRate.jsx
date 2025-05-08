import classes from "./StudentRate.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import quma from "../../../assets/images/quma.png";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Rate } from "rsuite";
import { StarBorderOutlined } from "@mui/icons-material";
const StudentRateSection = ({ opinions, academySettings }) => {
  return (
    <div id="student-opinions" className={classes.StudentRateContainer}>
      <div className={classes.SectionTitle}>
        <span>أراء الطلاب .</span>
        <span
          style={{ background: academySettings?.primary_color }}
          className="w-[100px] h-[18px] block mx-auto relative bottom-4 -z-10"
        ></span>
      </div>

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
          {opinions?.map((opinion, i) => {
            return (
              <SwiperSlide key={i}>
                <div className={classes.RateCard}>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={opinion.student_image}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className={classes.RateName}>{opinion.student_name}</p>

                      <Rate
                        className={classes.RateStarsCss}
                        value={opinion.rating}
                        color="orange"
                        size="sm"
                        readOnly
                        renderCharacter={() => <StarBorderOutlined />}
                      />
                    </div>
                  </div>
                  <p className={`${classes.RateParagraph} truncate`}>
                    {opinion.comment}
                  </p>
                  <div className="d-flex justify-content-end">
                    <img width={57} src={quma} />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default StudentRateSection;

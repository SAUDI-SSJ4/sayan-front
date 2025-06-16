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
      <div 
        className={classes.SectionTitle}
        style={{
          fontSize: '2.0rem',
          fontWeight: '800',
          color: academySettings?.primary_color,
          textAlign: 'center',
          marginBottom: '2rem'
        }}
      >
        <span>أراء الطلاب</span>
      </div>

      <div className="container" style={{ marginTop: '12px' }}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          breakpoints={{
            768: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 5,
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
                      <p 
                        className={classes.RateName}
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#1F2937',
                          marginBottom: '0.5rem'
                        }}
                      >
                        {opinion.student_name}
                      </p>

                      <Rate
                        className={classes.RateStarsCss}
                        value={opinion.rating}
                        color="#FFD700"
                        size="sm"
                        readOnly
                        renderCharacter={() => <StarBorderOutlined style={{ color: '#FFD700', fill: '#FFD700' }} />}
                      />
                    </div>
                  </div>
                  <p 
                    className={`${classes.RateParagraph} truncate`}
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      color: '#6B7280',
                      marginTop: '1rem'
                    }}
                  >
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

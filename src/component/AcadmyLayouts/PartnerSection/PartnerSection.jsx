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
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Divider from "../AcademyHeaderContainer/dvider";
import { useAcademyHome } from "../../../framework/website/academy-home";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
const PartnerSection = ({ LayOut2 }) => {
  const { acdemyId } = useParams();
  let { data: profileData, isLoading, errors } = useAcademyHome(acdemyId);

  if (errors) return <Error />;
  if (isLoading)
    return (
      <>
        <div className="w-full h-50 d-flex justify-content-center align-items-center">
          <Spinner className="" />
        </div>
      </>
    );

  return (
    <>
      <div
        className={classes.sectionContainer}
        style={
          LayOut2
            ? {
                paddingTop: "20px",
                backgroundColor: "white",
                marginBottom: "150px",
              }
            : { marginTop: "-150px" }
        }
      >
        <div className="container">
          {LayOut2 ? (
            <div className="Layout2Title"> شركاء النجاح </div>
          ) : (
            <div
              className="LayoutSectionTitle"
              style={{ marginBottom: "55px" }}
            >
              شركاء <span>النجاح.</span>
            </div>
          )}
        </div>
        <div
          className={classes.SwiperContainer}
          style={{ backgroundColor: "white", paddingBlock: "20px" }}
        >
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              450: {
                slidesPerView: 2,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            {profileData?.data.partners.map((e, i) => {
              return (
                <SwiperSlide key={i}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={e.image}
                      alt="sayn academy logo object-fit-cover w-100 h-100"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      {!LayOut2 && <Divider />}
    </>
  );
};

export default PartnerSection;

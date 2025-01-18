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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAllOpinions } from "../../../framework/accademy/academysetting-opinions";
import { Spinner } from "react-bootstrap";
import { Rate } from "rsuite";
import { StarBorderOutlined, StarSharp, StarsOutlined, StarsTwoTone } from "@mui/icons-material";
const StudentRateSection = ({ Laytout3 }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [opinions, setOpinions]= useState([
    {
      student_name: "أحمد محمد",
      student_avatar: null,
      rate: 4,
      opinion: "هذا المحتوى فيه شرح بسيط وسهل فهمه وشرح لكل حاجة بالتفصيل والصور والفيديوهات وايضا يوجد تمارين تطبيقية واختبارات شاملة ومتكررة مما يساعد على فهم المادة بشكل افضل.",
 },
    {
      student_name: "أحمد محمد",
      student_avatar: null,
      rate: 4,
      opinion: "هذا المحتوى فيه شرح بسيط وسهل فهمه وشرح لكل حاجة بالتفصيل والصور والفيديوهات وايضا يوجد تمارين تطبيقية واختبارات شاملة ومتكررة مما يساعد على فهم المادة بشكل افضل.",
    },
    {
      student_name: "أحمد محمد",
      student_avatar: null,
      rate: 4,
      opinion: "هذا المحتوى فيه شرح بسيط وسهل فهمه وشرح لكل حاجة بالتفصيل والصور والفيديوهات وايضا يوجد تمارين تطبيقية واختبارات شاملة ومتكررة مما يساعد على فهم المادة بشكل افضل.",
    }

  ])


  let { data: opinionsData, isLoading, errors } = useAllOpinions();
  useEffect(() =>{
   if(opinionsData){

     setOpinions(opinionsData)
    }
    console.log(opinions)
  },[isLoading])

  // if (errors) return <Error />;

  if (isLoading)
    return (
      <div className="w-full h-50 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );

  
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
          {opinions?.map((e, i) => {
            return (
              <SwiperSlide>
                <div className={classes.RateCard}>
              <div className="d-flex align-items-center gap-2">
                <img src={e.student_avatar} width={57} height={57} />
                <div >
                  <p className={classes.RateName}>{e.student_name}</p>
                  
                  <Rate className={classes.RateStarsCss}  value={e.rate} color="orange" size="sm"  readOnly renderCharacter={()=><StarBorderOutlined />} />

                </div>
              </div>
              <div className={classes.RateParagraph}>
             {e.opinion}
              </div>
              <div className="d-flex justify-content-between">
                <h3
                  style={{ fontSize: "14px", margin: "0px", color: "#12141D" }}
                >
                  {e.student_name}
                </h3>
                <img width={57} src={quma} />
              </div>
            </div>
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide>
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
          </SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};

export default StudentRateSection;

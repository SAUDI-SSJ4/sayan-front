import Style from "./LaunchYourAcademy.module.scss";
import Footer from "../../../component/MainPages/Footer/Footer";
import Header2 from "../../../component/MainPages/Header2/Header2";
import Books from "../../../assets/images/books.png";
import affiliatesmarketing from "../../../assets/images/affiliatesmarketing.png";
import sessions from "../../../assets/images/sessions.png";
import fund from "../../../assets/images/fund.png";
import AiIcon from "../../../assets/icons/AiIcon.svg";
import CallCenter from "../../../assets/icons/CallCenter.svg";
import Statics from "../../../assets/icons/Statics.svg";
import maps from "../../../assets/icons/maps.svg";
import Goals from "../../../assets/icons/Goals.svg";

import onlineCourse from "../../../assets/icons/onlineCourse.svg";
import Achivement from "../../../assets/icons/Achivement.svg";
import { useState } from "react";
import CountUp from "../../../component/UI/CountUp/CustomCountUp";
import GirlStudy from "../../../assets/images/GirlStudy.png";
import OpenBook from "../../../assets/images/OpenBook.png";
import ssssss2 from "../../../assets/images/ssssss2.png";
import Cassspture2 from "../../../assets/images/Cassspture2.png";
import PartnerSection from "../../../component/MainPages/Partner/Partners";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { MainSpinner } from "../../../component/UI/MainSpinner";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import FAQ from "../../../component/MainPages/FAQ/FAQ";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPackages } from "../../../utils/apis/client";
import { ShowPackages } from "./ShowPackages";

const LaunchYourAcademy = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState(0);

  const {
    data: packages,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getPackages"],
    queryFn: async () => {
      const response = await getPackages();
      return response.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000,
  });

  if (isError) {
    console.log("error" + error);
  }

  return (
    <>
      <Header2>
        <div className={Style.Container}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            className={Style.BannerText}
            data-aos="fade-up"
          >
            <div style={{ position: "relative" }}>
              <img className={Style.FloaitngImage1} src={affiliatesmarketing} />
              <img style={{ maxWidth: "100%" }} className={Style.FloaitngImage} src={Books} />
              <img className={Style.FloaitngImage2} src={sessions} />
            </div>
            <h1>
              أطلق <span> أكاديميتك </span>
              بدقائق
            </h1>
            <p>
              أطلق العنان لإبداعك وبدء رحلتك التعليمية الرقمية بكل سهولة مع منصة سيان! الآن، يمكنك
              تأسيس أكاديميتك الخاصة في غضون دقائق، بدون الحاجة لأي خبرة تقنية مسبقة. اكتشف قوة
              البساطة والفعالية في بناء وإدارة محتواك التعليمي مع سيان، حيث يصبح التعليم الرقمي
              تجربة ممتعة وسلسة.
            </p>
            <div className={Style.BtnContainer}>
              <div
                onClick={() => {
                  navigate("/Register");
                }}
                className={`${Style.Primary}`}
              >
           ابداء الان واحصل على 14 يوم تجربة مجانية بدون اشتراك
              </div>
            </div>
          </div>
        </div>
      </Header2>
      <div className="CustomContainer mt-5">
        <div className=" row align-items-center">
          <div className="col-lg-7">
            <div className={Style.WhoText}>
              <h2>
                من نحن<span>؟</span>
              </h2>
              <p className="fs-6 fw-medium text-content--1">
                نحن في منصة سيان نقود الطريق نحو مستقبل التعليم الرقمي. كأول منصة تعليمية تسخر
                الذكاء الاصطناعي والتقنيات الحديثة لتطوير تجربة التعليم، نحن معتمدون من المركز
                الوطني للتعليم الإلكتروني. مهمتنا هي توفير تجارب تعليمية وتدريبية متطورة تركز على
                الإبداع والشمولية، مصممة خصيصًا لتنمية العقول وتحقيق الريادة في المجال التعليمي.
                <br /> منصتنا هي الحل المثالي لكل من المعلمين والمتعلمين الساعين لتحسين جودة
                <br /> التعليم وتحقيق نتائج أفضل.
              </p>
            </div>
          </div>
          <div className="col-lg-5">
            <img style={{ maxWidth: "100%" }} src={fund} />
          </div>
        </div>
      </div>
      <div className={Style.BackGroundParent}>
        <div className="CustomContainer mt-5">
          <div className={Style.WhoText}>
            <h2>
              لماذا نحن<span>؟</span>
            </h2>
          </div>
          <div className="row mt-2">
            <div className="col-lg-4 col-md-6 col-12 mt-4">
              <div className={Style.GoalCard}>
                <div className="d-flex">
                  <div className={Style.GoalIcon}>
                    <img src={AiIcon} />
                  </div>
                </div>
                <h2 className="fs-6 fw-medium  title-text--1">الريادة مع الذكاء الاصطناعي</h2>
                <p className="fs-6 fw-medium text-content--1">
                  اختر منصة سيان، الرائدة في تقديم تجارب تعليمية ذكية ومخصصة. معنا، التعليم ليس فقط
                  عملية تعلم، بل تجربة متطورة تتجاوز التوقعات
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mt-4">
              <div className={Style.GoalCard}>
                <div className="d-flex">
                  <div className={Style.GoalIcon}>
                    <img src={CallCenter} />
                  </div>
                </div>
                <h2 className="fs-6 fw-medium  title-text--1">دعم فني بلا توقف</h2>
                <p className="fs-6 fw-medium text-content--1">
                  تمتع بالطمأنينة مع دعمنا الفني المتاح على مدار الساعة، مهما كان استفسارك أو تحديك.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mt-4">
              <div className={Style.GoalCard}>
                <div className="d-flex">
                  <div className={Style.GoalIcon}>
                    <img src={Statics} />
                  </div>
                </div>
                <h2 className="fs-6 fw-medium  title-text--1">نقلة نوعية في المبيعات</h2>
                <p className="fs-6 fw-medium text-content--1">
                  استفد من أدواتنا الذكية لتعزيز مبيعاتك وتحسين تفاعل الطلاب. في سيان، نساعدك على
                  تحقيق أهدافك التجارية بفعالية.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mt-4">
              <div className={Style.GoalCard}>
                <div className="d-flex">
                  <div className={Style.GoalIcon}>
                    <img src={maps} />
                  </div>
                </div>
                <h2 className="fs-6 fw-medium  title-text--1">تحسين تجربة التعليم</h2>
                <p className="fs-6 fw-medium  text-content--1">
                  استكشف قوة الذكاء الاصطناعي في تعزيز فهم الطلاب وتلبية احتياجاتهم التعليمية بدقة
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mt-4">
              <div className={Style.GoalCard}>
                <div className="d-flex">
                  <div className={Style.GoalIcon}>
                    <img src={Goals} />
                  </div>
                </div>
                <h2 className="fs-6 fw-medium  title-text--1">توسيع آفاق النجاح</h2>
                <p className="fs-6 fw-medium text-content--1">
                  اغتنم فرصة التسويق والبيع لمنتجاتك الرقمية عبر منصة تتيح لك الوصول إلى جمهور أوسع
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mt-4">
              <div className={Style.GoalCard}>
                <div className="d-flex">
                  <div className={Style.GoalIcon}>
                    <img src={onlineCourse} />
                  </div>
                </div>
                <h2 className="fs-6 fw-medium  title-text--1">باني المواد التعليمية الاحترافي</h2>
                <p className="fs-6 fw-medium  text-content--1">
                  نظام سيان يتيح بناء مواد تعليمية ذات جودة عالية وتفاعلية، مستفيدًا من تكنولوجيا
                  الذكاء الاصطناعي لتحقيق أقصى استفادة تعليمية
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="CustomContainer  mt-5">
          <div className={Style.MidBanner}>
            <img
              src={MidBanner}
              style={{ width: "100%", minHeight: "300px" }}
            />
            <div
              className={`${Style.FlotatingText} fs-4 lh-lg  fw-medium  title-text--1`}
            >
              نفتخر باننا منصة مؤهلة من المركز <br />
              الوطني للتعليم الإلكتروني.
            </div>
            <img src={NationalEl} className={Style.CornerImage} />
          </div>
        </div> */}
      </div>
      <div className={Style.DownPokeh}>
        <div className="CustomContainer mb-5 mt-0">
          <div className="row flex-lg-row flex-column-reverse" style={{ alignItems: "stretch" }}>
            <div className={`col-lg-7 ${Style.NumberContinaer}`}>
              <div className={Style.NumberCount}>
                <div className={Style.NumberStyle}>
                  <i>+</i>
                  <CountUp start={0} end={2000} duration={3000} />
                </div>
                <div className={`${Style.NumebrText} fs-6 fw-medium  title-text--1`}>
                  ساعات تعليمية مكثفة
                </div>
              </div>
              <div className={Style.NumberCount}>
                <div className={Style.NumberStyle}>
                  <i>+</i>
                  <CountUp start={0} end={100} duration={3000} />
                </div>
                <div className={`${Style.NumebrText} fs-6 fw-medium  title-text--1`}>
                  أكاديميات متنوعة تتوزع
                  <br />
                  في مختلف المجالات،
                </div>
              </div>
              <div className={Style.NumberCount}>
                <div className={Style.NumberStyle}>
                  <i>+</i>
                  <CountUp start={0} end={5000} duration={3000} />
                </div>
                <div className={`${Style.NumebrText} fs-6 fw-medium  title-text--1`}>
                  طالب مسجل في منصتنا
                </div>
              </div>
              <div className={Style.NumberCount}>
                <div className={Style.NumberStyle}>
                  <i>+</i>
                  <CountUp start={0} end={1000} duration={3000} />
                </div>
                <div className={`${Style.NumebrText} fs-6 fw-medium  title-text--1`}>
                  دورة إلكترونية مباعة
                </div>
              </div>
            </div>
            <div
              className="col-lg-5 justify-content-sm-center"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                className={Style.GoalCard}
                style={{
                  boxShadow: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div className="d-flex  justify-content-sm-center  justify-content-lg-start">
                  <div
                    className={Style.GoalIcon}
                    style={{
                      padding: "0px",
                      width: "92px",
                      height: "92px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={Achivement} />
                  </div>
                </div>
                <h2 style={{ fontFamily: "Noto Kufi Arabic", fontWeight: 700, fontSize: "32px" }}>
                  إنجازاتنا في أرقام
                </h2>
                <p style={{ fontFamily: "Noto Kufi Arabic", fontWeight: 400, fontSize: "18px" }}>
                  في منصة سيان، نفخر بإنجازاتنا المتميزة
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="CustomContainer " style={{ marginTop: "150px" }}>
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <div className={Style.VisionCard}>
              <div className="d-flex justify-content-center" style={{ position: "relative" }}>
                <img className={Style.SSImage} src={ssssss2} />
                <img className={Style.StudyGirl} src={GirlStudy} />
                <img
                  className={Style.SSImage}
                  src={Cassspture2}
                  style={{ right: "unset", left: "70px" }}
                />
              </div>
              <h2 style={{ fontFamily: "Noto Kufi Arabic", fontWeight: 700, fontSize: "32px" }}>
                هدفنا
              </h2>
              <p style={{ fontFamily: "Noto Kufi Arabic", fontWeight: 400, fontSize: "18px" }}>
                بناء جيل متعلم ومبدع، مجهز بالمعرفة والقدرات لقيادة
                <br /> عصر جديد من التقدم
              </p>
            </div>
            <div className={Style.VisionCard}>
              <div className="d-flex justify-content-center " style={{ position: "relative" }}>
                <img className={Style.SSImage} src={ssssss2} />
                <img
                  className={Style.StudyGirl}
                  src={OpenBook}
                  style={{ animationDelay: "0.8s", maxWidth: "100%" }}
                />
                <img
                  className={Style.SSImage}
                  src={Cassspture2}
                  style={{ right: "unset", left: "70px" }}
                />
              </div>
              <h2 style={{ fontFamily: "Noto Kufi Arabic", fontWeight: 700, fontSize: "32px" }}>
                رؤيتنا؟
              </h2>
              <p style={{ fontFamily: "Noto Kufi Arabic", fontWeight: 400, fontSize: "18px" }}>
                نؤمن بأن التعليم هو القوة الدافعة لمستقبل مشرق،
                <br /> يسوده الإبداع والابتكار.
              </p>
            </div>
          </div>
        </div>
        <PartnerSection />
      </div>
      <div className="CustomContainer">
        <div
          style={{
            color: "black",
            textAlign: "center",
            marginBottom: "50px",
            fontFamily: "Noto Kufi Arabic",
            fontWeight: 600,
            fontSize: "36px",
          }}
        >
          باقاتنا هي قدرات مختلفة للنمو
        </div>
        <div className="d-flex justify-content-center">
          <div className={`${Style.Swithcer} swithcer---1`}>
            <span
              className={Style.marker}
              style={active ? { transform: "translateX(-100%" } : {}}
            ></span>
            <div className={active == 0 ? Style.acitve : ""} onClick={() => setActive(0)}>
              سنوي
            </div>
            <div className={active == 1 ? Style.acitve : ""} onClick={() => setActive(1)}>
              شهري
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ el: ".swiper-pagination", enabled: true }}
          spaceBetween={15}
          breakpoints={{
            768: { slidesPerView: 1 },
            1200: {
              slidesPerView: 3,
              pagination: {
                dynamicBullets: true,
                el: ".swiper-pagination",
                enabled: false,
              },
            },
          }}
          style={{ marginBottom: "300px" }}
        >
          {isLoading ? (
            <MainSpinner />
          ) : (
            packages.data && (
              <SwiperSlide
                className="d-flex justify-content-between"
                style={{ marginRight: "38px" }}
              >
                <ShowPackages packages={packages.data} />
                <ShowPackages packages={packages.data} />
                <ShowPackages packages={packages.data} />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
      <FAQ />
      <Footer />
    </>
  );
};

export default LaunchYourAcademy;

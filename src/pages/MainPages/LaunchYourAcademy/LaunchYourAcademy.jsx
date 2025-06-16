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
            <div style={{ position: "relative", display: "flex" }}>
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
                  navigate("/signin");
                }}
                className={`${Style.Primary}`}
              >
ابدا الان وانشئ منصتك الرقمية بشكل مجاني تماما
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
                <h2 style={{fontWeight: 700, fontSize: "32px" }}>
                  إنجازاتنا في أرقام
                </h2>
                <p style={{fontWeight: 400, fontSize: "18px" }}>
                  في منصة سيان، نفخر بإنجازاتنا المتميزة
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="CustomContainer " style={{ marginTop: "150px" }}>
          <div className="flex flex-col md:flex-row justify-content-center gap-4 flex-wrap">
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
              <h2 style={{fontWeight: 700, fontSize: "32px" }}>
                هدفنا
              </h2>
              <p style={{fontWeight: 400, fontSize: "18px" }}>
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
              <h2 style={{fontWeight: 700, fontSize: "32px" }}>
                رؤيتنا؟
              </h2>
              <p style={{fontWeight: 400, fontSize: "18px" }}>
                نؤمن بأن التعليم هو القوة الدافعة لمستقبل مشرق،
                <br /> يسوده الإبداع والابتكار.
              </p>
            </div>
          </div>
        </div>
       
      </div>

      {/* Packages Section */}
      <div className="CustomContainer" style={{ marginTop: "150px", marginBottom: "150px" }}>
        <div className={Style.WhoText} style={{ textAlign: "center", marginBottom: "80px" }}>
          <h2>
            باقاتنا المصممة <span>لنجاحك</span>
          </h2>
          <p className="fs-6 fw-medium text-content--1" style={{ maxWidth: "600px", margin: "0 auto" }}>
            اختر الباقة التي تناسب احتياجاتك وابدأ رحلتك في التعليم الرقمي
          </p>
        </div>
        
        <div className="row justify-content-center">
          {/* Free Package */}
          <div className="col-lg-5 col-md-6 col-12 mt-4">
            <div className={Style.GoalCard} style={{
              background: "white",
              borderRadius: "15px",
              padding: "40px 30px",
              height: "100%",
              border: "1px solid #e8ecf4",
              position: "relative",
              transition: "all 0.3s ease"
            }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div style={{ 
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
                  padding: "8px 16px", 
                  borderRadius: "25px", 
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600"
                }}>
                  الباقة المجانية
                </div>
                <div style={{
                  background: "#f8f9fa",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ fontSize: "20px" }}>🆓</span>
                </div>
              </div>
              
              <h2 className="fs-4 fw-bold title-text--1 mb-3">
                ابدأ مجاناً
              </h2>
              
              <p className="fs-6 fw-medium text-content--1 mb-4">
                عمولة 10% من كل دورة تدريبية
              </p>

              <div className="mb-4">
                {[
                  "إضافة مدربين بلا حدود",
                  "إضافة دورات تدريبية",
                  "تخصيص صفحتك الشخصية",
                  "عدد طلاب لا محدود",
                  "دعم فني 24/7",
                  "قوالب جاهزة للأكاديمية"
                ].map((feature, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <div style={{
                      width: "18px",
                      height: "18px",
                      backgroundColor: "#28a745",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "12px",
                      flexShrink: 0
                    }}>
                      <span style={{ color: "white", fontSize: "10px", fontWeight: "bold" }}>✓</span>
                    </div>
                    <span className="fs-6 fw-medium text-content--1">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/signin")}
                className={`${Style.Primary}`}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                ابدأ مجاناً الآن
              </button>
            </div>
          </div>

          {/* Coming Soon Package */}
          <div className="col-lg-5 col-md-6 col-12 mt-4">
            <div className={Style.GoalCard} style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
              borderRadius: "15px",
              padding: "40px 30px",
              height: "100%",
              border: "2px dashed #6c757d",
              position: "relative",
              opacity: "0.8"
            }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div style={{ 
                  background: "#6c757d", 
                  padding: "8px 16px", 
                  borderRadius: "25px", 
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600"
                }}>
                  قادم قريباً
                </div>
                <div style={{
                  background: "#fff",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #6c757d"
                }}>
                  <span style={{ fontSize: "20px" }}>🚀</span>
                </div>
              </div>
              
              <h2 className="fs-4 fw-bold title-text--1 mb-3" style={{ color: "#6c757d" }}>
                الباقة المتقدمة
              </h2>
              
              <p className="fs-6 fw-medium text-content--1 mb-4" style={{ color: "#6c757d" }}>
                مميزات احترافية للأكاديميات المتقدمة
              </p>

              <div className="mb-4">
                {[
                  "جميع مميزات الباقة المجانية",
                  "دورات مباشرة ومتزامنة",
                  "جلسات فردية مع الطلاب",
                  "إضافة مدونات تعليمية",
                  "إضافة منتجات رقمية",
                  "إحصائيات تفصيلية متقدمة",
                  "أدوات تسويق متطورة",
                  "شهادات مخصصة"
                ].map((feature, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <div style={{
                      width: "18px",
                      height: "18px",
                      backgroundColor: "#6c757d",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "12px",
                      flexShrink: 0
                    }}>
                      <span style={{ color: "white", fontSize: "10px", fontWeight: "bold" }}>✓</span>
                    </div>
                    <span className="fs-6 fw-medium" style={{ color: "#6c757d" }}>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                disabled
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  backgroundColor: "transparent",
                  color: "#6c757d",
                  border: "2px dashed #6c757d",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "not-allowed"
                }}
              >
                قادم قريباً
              </button>
            </div>
          </div>
        </div>
      </div>

      <FAQ />
      <Footer />
    </>
  );
};

export default LaunchYourAcademy;

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Style from "./Ai.module.scss";
import Footer from "../../../component/MainPages/Footer/Footer";
import Header2 from "../../../component/MainPages/Header2/Header2";
import FAQ from "../../../component/MainPages/FAQ/FAQ";
import TrainingSession from "../../../assets/images/Ai.png";
import affiliatesMarketing from "../../../assets/images/Ai1.png";
import sessions from "../../../assets/images/Ai2.png";
import AiIcon from "../../../assets/icons/AiIcon.svg";
import CallCenter from "../../../assets/icons/CallCenter.svg";
import Statics from "../../../assets/icons/Statics.svg";
import Maps from "../../../assets/icons/maps.svg";
import icon2 from "../../../assets/icons/AIPage/icon2.svg";
import icon3 from "../../../assets/icons/AIPage/icon3.svg";
import icon5 from "../../../assets/icons/AIPage/icon5.svg";
import icon6 from "../../../assets/icons/AIPage/icon6.svg";
import icon7 from "../../../assets/icons/AIPage/icon7.svg";

// Reusable GoalCard Component

const Ai = () => {
  const GoalCard = ({ icon, title, description }) => {
    return (
      <div className="col-lg-4 col-md-6 col-12 mt-4">
        <div className={Style.GoalCard}>
          <div className="d-flex">
            <div className={Style.GoalIcon}>
              <img src={icon} alt={title} />
            </div>
          </div>
          <h2 className={Style.GoalTitle}>{title}</h2>
          <p className={Style.GoalDescription + 'text-content--1'}>{description}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header2>
        <div className={Style.Container}>
          <div className={Style.BannerText} data-aos="fade-up">
            <div style={{ position: "relative" }}>
              <img className={Style.FloaitngImage1} src={affiliatesMarketing} alt="Affiliates" />
              <img
                style={{ maxWidth: "100%" }}
                className={Style.FloaitngImage}
                src={TrainingSession}
                alt="Training Session"
              />
              <img className={Style.FloaitngImage2} src={sessions} alt="Sessions" />
            </div>
            <h1>الذكاء الاصطناعي</h1>
            <p>
              في منصة سيان، نعتبر الذكاء الاصطناعي حجر الزاوية في تعزيز تجربة التعليم الرقمي. نؤمن
              بأهمية دمجه كأداة مساعدة وداعمة ليس فقط للطلاب، بل أيضًا لمنشئي المحتوى التعليمي، مما
              يعزز فاعلية التعلم والتدريس.
              <br />
              <p style={{ marginTop: "20px" }}>
                في منصة سيان، نقدم مجموعة متنوعة من الميزات الفريدة المدعومة بالذكاء الاصطناعي
                لتحسين وتعزيز تجربة التعلم وإعداد المحتوى.
              </p>
            </p>
          </div>
        </div>
      </Header2>
      <div className={Style.BackGroundParent}>
        <div className="CustomContainer mt-5">
          <div className="row mt-2 justify-content-center">
            <GoalCard
              icon={icon3}
              title="تصحيح الاختبارات"
              description="الذكاء الاصطناعي يتولى تصحيح الاختبارات ويقدم تحليلات مفصلة لنتائج الطلاب."
            />
            <GoalCard
              icon={icon7}
              title="خاصية سؤال التركيز"
              description="هذه الخاصية تعزز تركيز الطلاب عبر سؤال يتطلب تفاعلًا للتقدم في الدرس."
            />
            <GoalCard
              icon={icon2}
              title="خاصية اختبرني"
              description="توفر اختبارات مخصصة بعد كل درس لقياس مستوى استفادة الطالب."
            />
            <GoalCard
              icon={icon6}
              title="الإجابة على أسئلة الطلاب"
              description="الذكاء الاصطناعي يجيب على الاستفسارات، موفرًا فهمًا أعمق للمواد."
            />
            <GoalCard
              icon={icon5}
              title="المساعد الشخصي"
              description="مساعد رقمي متاح دائمًا لمساعدة الطلاب والمعلمين في جميع احتياجاتهم التعليمية."
            />
          </div>
        </div>
      </div>
      <FAQ />
      <Footer />
    </>
  );
};

export default Ai;

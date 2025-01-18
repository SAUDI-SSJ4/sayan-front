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
              icon={AiIcon}
              title="زيادة الإنتاجية"
              description="التدريب يجعل الموظفين أكثر كفاءة وإنتاجية، حيث يكونون مجهزين بشكل أفضل لمواجهة مهامهم ويكتسبون ثقة أكبر في قدراتهم، مما يؤدي إلى تحسين الأداء."
            />
            <GoalCard
              icon={CallCenter}
              title="دعم فني بلا توقف"
              description="تمتع بالطمأنينة مع دعمنا الفني المتاح على مدار الساعة، مهما كان استفسارك أو تحديك."
            />
            <GoalCard
              icon={Statics}
              title="نقلة نوعية في المبيعات"
              description="استفد من أدواتنا الذكية لتعزيز مبيعاتك وتحسين تفاعل الطلاب. في سيان، نساعدك على تحقيق أهدافك التجارية بفعالية."
            />
            <GoalCard
              icon={Maps}
              title="تحسين تجربة التعليم"
              description="استكشف قوة الذكاء الاصطناعي في تعزيز فهم الطلاب وتلبية احتياجاتهم التعليمية بدقة."
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

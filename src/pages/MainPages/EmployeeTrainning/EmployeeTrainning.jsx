import { Fragment } from "react";
import Style from "./EmployeeTrainning.module.scss";
import Footer from "../../../component/MainPages/Footer/Footer";
import Header2 from "../../../component/MainPages/Header2/Header2";
import TrainingSession from "../../../assets/images/TrainingSession.png";
import affiliatesmarketing from "../../../assets/images/FloatinSeesion.png";
import sessions from "../../../assets/images/FloatinSeesion2.png";
import AiIcon from "../../../assets/icons/AiIcon.svg";
import CallCenter from "../../../assets/icons/CallCenter.svg";
import Statics from "../../../assets/icons/Statics.svg";
import maps from "../../../assets/icons/maps.svg";
import Mangment from "../../../assets/images/Mangment.png";
import CreateAcademy from "../../../assets/images/CreateAcademy.png";
import Desing from "../../../assets/images/Desing.png";
import VideoCreate from "../../../assets/images/VideoCreate.png";
import FAQ from "../../../component/MainPages/FAQ/FAQ";
import Education from "../../../assets/images/Education.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import icon1 from "../../../assets/icons/EmployeeTrainingPage/icon1.svg";
import icon2 from "../../../assets/icons/EmployeeTrainingPage/icon2.svg";
import icon3 from "../../../assets/icons/EmployeeTrainingPage/icon3.svg";
import icon4 from "../../../assets/icons/EmployeeTrainingPage/icon4.svg";

const EmployeeTrainning = () => {
  return (
    <Fragment>
      <Header2>
        <div className={Style.Container}>
          <div className={Style.BannerText} data-aos="fade-up">
            <div style={{ position: "relative" }}>
              <img className={Style.FloaitngImage1} src={affiliatesmarketing} />
              <img className={Style.FloaitngImage} src={TrainingSession} />
              <img className={Style.FloaitngImage2} src={sessions} />
            </div>
            <h1>تدريب وتطوير الموظفين</h1>
            <p>
              في منصة سيان، نقوم بتطوير مهارات موظفيكم من خلال تجربة تدريبية فريدة من نوعها، تمزج
              بين خبراتنا الواسعة وأساليب التدريب الحديثة. نلتزم بتصميم برامج تدريبية تركز على تعزيز
              الكفاءة العملية ومواكبة التطورات المستمرة في العصر الحديث، لضمان تطوير مهارات فريق
              عملكم بأعلى مستوى وتحقيق النجاح المستدام.
            </p>
          </div>
        </div>
      </Header2>
      <div className={Style.BackGroundParent}>
        <div className="CustomContainer mt-5">
          <div className={Style.WhoText}>
            <h2>أهمية تدريب الموظفين:</h2>
          </div>
          <div className="row mt-2">
            <div className="col-lg-3 col-md-6 col-12 mt-4">
              <div className={Style.GoalCard}>
                <div className="d-flex">
                  <div className={Style.GoalIcon}>
                    <img src={icon1} />
                  </div>
                </div>
                <h2 className="fs-6 fw-bold  title-text--1"> زيادة الإنتاجية </h2>
                <p className="fs-6 fw-medium text-content--1">
                التدريب يجعل الموظفين أكثر كفاءة وإنتاجية، حيث يكونون مجهزين بشكل أفضل لمواجهة مهامهم ويكتسبون ثقة أكبر في قدراتهم، مما يؤدي إلى تحسين الأداء.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-4">
              <div className={Style.GoalCard}>
                <div className="d-flex">
                  <div className={Style.GoalIcon}>
                    <img src={icon2} />
                  </div>
                </div>
                <h2 className="fs-6 fw-bold  title-text--1">الاحتفاظ بالموظفين</h2>
                <p className="fs-6 fw-medium text-content--1">
                %75 من الموظفين من المرجح أن يبقوا لفترة أطول في المنظمات التي تستثمر في نموهم، مما يعزز رضاهم وولائهم.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-4">
              <div className={Style.GoalCard}>
                <div className="d-flex">
                  <div className={Style.GoalIcon}>
                    <img src={icon3} />
                  </div>
                </div>
                <h2 className="fs-6 fw-bold  title-text--1">تحسين المهارات</h2>
                <p className="fs-6 fw-medium text-content--1">
                يساعد تطوير الموظفين على اكتساب مهارات جديدة، مما يزيد الرضا الوظيفي ويفتح فرص التقدم.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-4">
              <div className={Style.GoalCard}>
                <div className="d-flex">
                  <div className={Style.GoalIcon}>
                    <img src={icon4} />
                  </div>
                </div>
                <h2 className="fs-6 fw-bold  title-text--1">الابتكار والقدرة على التكيف</h2>
                <p className="fs-6 fw-medium text-content--1">
                تطوير الموظفين يعزز القدرة على التكيف مع التغيرات السوقية ويشجع على الابتكار.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="CustomContainer " style={{ marginTop: "120px" }}>
          <h1
            style={{
              fontFamily: "Noto Kufi Arabic",
              fontSize: "32px",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: "80px",
            }}
          >
            مميزات منصة سيان
          </h1>
          <div className="row flex-lg-row flex-column-reverse  " style={{ alignItems: "center" }}>
            <div data-aos="fade-up" className="col-lg-6 mt-3 d-flex justify-content-center">
              <img src={Mangment} style={{ maxWidth: "100%" }} />
            </div>
            <div data-aos="fade-right" className="col-lg-6 d-flex justify-content-center">
              <div>
                <h2
                  style={{
                    color: "black",
                    marginBottom: "20px",
                    fontFamily: "Noto Kufi Arabic",
                    fontSize: "24px",
                    fontWeight: 800,
                    lineHeight: "32.4px",
                    textAlign: "right",
                  }}
                >
                  نظام إدارة ومتابعة المتدربين
                </h2>
                <p
                  style={{
                    color: "black",
                    fontFamily: "Noto Kufi Arabic",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "28.8px",
                    textAlign: "justified",
                  }}
                >
                  نؤمن بأن التعليم هو القوة الدافعة لمستقبل مشرق،
                  <br /> يسوده الإبداع والابتكا بناء جيل متعلم ومبدع، مجهز
                  <br /> بالمعرفة والقدرات لقيادة عصر جديد من التقدم.ر.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="CustomContainer " style={{ marginTop: "120px" }}>
          <div className="row " style={{ alignItems: "center" }}>
            <div data-aos="fade-right" className="col-lg-6  d-flex justify-content-center">
              <div>
                <h2
                  style={{
                    color: "black",
                    marginBottom: "20px",
                    fontFamily: "Noto Kufi Arabic",
                    fontSize: "24px",
                    fontWeight: 800,
                    lineHeight: "32.4px",
                    textAlign: "right",
                  }}
                >
               إنشاء أكاديمية خاصة بالشركة
                </h2>
                <p
                  style={{
                    color: "black",
                    fontFamily: "Noto Kufi Arabic",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "28.8px",
                    textAlign: "justified",
                  }}
                >
توفر المنصة القدرة على بناء أكاديمية تعليمية مخصصة لشركتك، مكملة بدومين خاص، مما يسهل إدارة ومتابعة التدريب بشكل مؤتمت واحترافي.
                </p>
              </div>
            </div>
            <div data-aos="fade-up" className="col-lg-6 d-flex justify-content-center">
              <img src={CreateAcademy} style={{ maxWidth: "100%" }} />
            </div>
          </div>
        </div>
      </div>
      <div className={Style.DownPokeh}>
        <div className="CustomContainer" style={{ margin: "0px auto" }}>
          <h1
            style={{
              color: "#272727",
              marginBottom: "32px",
              fontFamily: "Noto Kufi Arabic",
              fontSize: "24px",
              fontWeight: 800,
              lineHeight: "43.2px",
              textAlign: "center",
            }}
          >
            خدماتنا في منصة سيان
          </h1>
          <div className="row " style={{ alignItems: "center" }}>
            <div data-aos="fade-up" className="col-lg-6 d-flex justify-content-center">
              <img src={Desing} style={{ maxWidth: "100%" }} />
            </div>
            <div data-aos="fade-left" className="col-lg-6 d-flex justify-content-center">
              <div>
                <h2
                  style={{
                    color: "black",
                    marginBottom: "20px",
                    fontFamily: "Noto Kufi Arabic",
                    fontSize: "24px",
                    fontWeight: 800,
                    lineHeight: "32.4px",
                    textAlign: "right",
                  }}
                >
                  خدمات تصميم تعليمي
                </h2>
                <p
                  style={{
                    color: "black",
                    fontFamily: "Noto Kufi Arabic",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "28.8px",
                    textAlign: "justified",
                  }}
                >
                  نقدم تصميم مواد تعليمية مخصصة للموظفين، معتمدين
                  <br /> على خبراتنا الواسعة في هذا المجال.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="CustomContainer " style={{ marginTop: "120px" }}>
          <div className="row flex-lg-row flex-column-reverse " style={{ alignItems: "center" }}>
            <div data-aos="fade-left" className="col-lg-6  d-flex justify-content-center">
              <div>
                <h2
                  style={{
                    color: "black",
                    marginBottom: "20px",
                    fontFamily: "Noto Kufi Arabic",
                    fontSize: "24px",
                    fontWeight: 800,
                    lineHeight: "32.4px",
                    textAlign: "right",
                  }}
                >
                  إنتاج مقاطع فيديو تعليمية
                </h2>
                <p
                  style={{
                    color: "black",
                    fontFamily: "Noto Kufi Arabic",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "28.8px",
                    textAlign: "justified",
                  }}
                >
                  لدينا فريق متخصص قادر على إنتاج محتوى مرئي جذاب
                  <br /> وفعال للمواد التعليمية.
                </p>
              </div>
            </div>
            <div data-aos="fade-up" className="col-lg-6 d-flex justify-content-center">
              <img src={VideoCreate} style={{ maxWidth: "100%" }} />
            </div>
          </div>
        </div>
        <div className="CustomContainer " style={{ marginTop: "120px" }}>
          <div className="row " style={{ alignItems: "center" }}>
            <div data-aos="fade-up" className="col-lg-6 d-flex justify-content-center">
              <img src={Education} style={{ maxWidth: "100%" }} />
            </div>
            <div data-aos="fade-right" className="col-lg-6  d-flex justify-content-center">
              <div>
                <h2
                  style={{
                    color: "black",
                    marginBottom: "20px",
                    fontFamily: "Noto Kufi Arabic",
                    fontSize: "24px",
                    fontWeight: 800,
                    lineHeight: "32.4px",
                    textAlign: "right",
                  }}
                >
                  إدارة البرامج التعليمية
                </h2>
                <p
                  style={{
                    color: "black",
                    fontFamily: "Noto Kufi Arabic",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "28.8px",
                    textAlign: "justified",
                  }}
                >
                  نقوم بإدارة المواد التعليمية بطريقة تضمن رفع كفاءة
                  <br /> ومهارات الموظفين.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FAQ />
      <Footer />
    </Fragment>
  );
};

export default EmployeeTrainning;

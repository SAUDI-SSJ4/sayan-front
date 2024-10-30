import AcademyHeaderContainer from "../../../component/AcadmyLayouts/AcademyHeaderContainer/AcademyHeaderContainer";
import mask from "../../../assets/images/Mask.png";
import PlayBtn from "../../../component/Icons/PlayBtn";
import MouseIcon from "../../../component/Icons/MouseIcon";
import TeacherMask from "../../../assets/images/TeacherMask.png";
import CertificationIcon from "../../../component/Icons/CertificationIcon";
import GraduateIcon from "../../../component/Icons/GraduateIcon";
import SubjectSlider from "../../../component/AcadmyLayouts/SubjectCard/subjectSlider";
import ProductSlider from "../../../component/AcadmyLayouts/ProductCard/ProductSlider";
import PartnerSection from "../../../component/AcadmyLayouts/PartnerSection/PartnerSection";
import quma from "../../../assets/images/quma.png";
import StudentRateSection from "../../../component/AcadmyLayouts/studentRate/StudentRate";
import AcademyFooter from "../../../component/AcadmyLayouts/Footer/Footer";
import Numbers from "../../../component/AcadmyLayouts/Numbers/Numbers";
import BlogSection from "../../../component/AcadmyLayouts/Blog/BlogSection";
import comp1 from "../../../assets/images/comp1.png";
import comp2 from "../../../assets/images/comp2.png";
import comp3 from "../../../assets/images/comp3.png";
import comp4 from "../../../assets/images/comp4.png";
import comp5 from "../../../assets/images/comp5.png";
import MouseAnimation from "../../../assets/images/Animation.gif";

import comp6 from "../../../assets/images/comp6.png";
const LayOut3 = () => {
  return (
    <div>
      <AcademyHeaderContainer layOut3>
        <div className="container mt-3" style={{ paddingBottom: "50px" }}>
          <div className="row g-3 aboutAcademyLayout">
            <div className="col-lg-6">
              <div data-aos="fade-up" className="SectionText">
                <h2>
                  <span>تعلم</span> <br />
                  شركتك بأمان <span>.</span>
                </h2>
                <p className="fs-6 fw-medium text-content--1">
                  خدمة تأسيس الشركات الخارجية وفي السعودية من مجموعة باشماخ
                  لخدمات الأعمال تمكنك من بدء عملك التجاري بكل يسر وسهولة، فإذا
                  كنت ترغب في إنشاء شركة في المملكة العربية
                </p>
                <div className="Btn buttons-header">
                  <div className="Primary button-one-1 button-head">
                    ابداء الان
                  </div>
                  <div className="Secondry button-one-1">
                    مشاهدة فيديو
                    <PlayBtn />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div data-aos="fade-right" className="SectionImage">
                <img src={mask} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center cursor-pointer mt-sm-5 mb-5">
            <img
              style={{ width: "54px", cursor: "pointer" }}
              src={MouseAnimation}
            />
          </div>
        </div>
      </AcademyHeaderContainer>
      {/* نبذة عن المعلم */}
      <div
        data-aos="fade-up"
        className="container"
        style={{ marginTop: "-50px" }}
      >
        <Numbers />
      </div>
      <div>
        <div className="container">
          <div className="row g-3 aboutAcademyLayout">
            <div className="col-lg-6">
              <div data-aos="fade-up" className="SectionImage">
                <img src={TeacherMask} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="SectionText">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                  <span>نبذة</span> <br />
                  عن المدرب <span>.</span>
                </h2>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="100"
                  className="fs-6 fw-medium text-content--1"
                >
                  خدمة تأسيس الشركات الخارجية وفي السعودية من مجموعة باشماخ
                  لخدمات الأعمال تمكنك من بدء عملك التجاري بكل يسر وسهولة، فإذا
                  كنت ترغب في إنشاء شركة في المملكة العربية
                </p>
                <div
                  className="d-flex"
                  style={{
                    alignItems: "center",
                    gap: "40px",
                    marginTop: "30px"
                  }}
                >
                  <div
                    data-aos="fade-right"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                    style={{
                      fontWeight: "600",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      fontSize: "20px"
                    }}
                    className="title-text--1"
                  >
                    <CertificationIcon />3 سنوات
                  </div>
                  <div
                    data-aos="fade-right"
                    data-aos-duration="1000"
                    data-aos-delay="300"
                    style={{
                      width: "2px",
                      backgroundColor: "rgba(50, 50, 50, 0.50)",
                      height: "30px"
                    }}
                  ></div>
                  <div
                    data-aos="fade-right"
                    data-aos-duration="1000"
                    data-aos-delay="400"
                    style={{
                      fontWeight: "600",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      fontSize: "20px"
                    }}
                    className="title-text--1"
                  >
                    <GraduateIcon />
                    +200
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubjectSlider Laytout3 />
      <ProductSlider Laytout3 />

      <div
        data-aos="fade-up"
        data-aos-delay="400"
        className="container "
        style={{ marginBlock: "150px" }}
      >
        <div className="row g-3">
          <div className="col-lg-8 col-md-9">
            <h2
              className="fs-3 fw-bold title-text--1"
              style={{ fontSize: "46px", fontWeight: "600", color: "#333", lineHeight: "1.8" }}
            >
              خدمة تأسيس الشركات الخارجية وفي السعودية من{" "}
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#636363",
                marginTop: "25px"
              }}
              className="text-content--1"
            >
              خدمة تأسيس الشركات الخارجية وفي السعودية من مجموعة باشماخ لخدمات
              الأعمال تمكنك من بدء عملك التجاري بكل يسر وسهولة، فإذا كنت ترغب في
              إنشاء شركة في المملكة العربية كل يسر وسهولة، فإذا كنت ترغب في
              إنشاء شركة في المملكة العربية
            </p>
          </div>
          <div className="col-lg-4 col-md-3 d-none d-md-block">
            <img src={quma} style={{ maxWidth: "100%" }} />
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#F5F5F5" }}>
        <BlogSection />
      </div>
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="LayoutSectionTitle">
            شركاء <span>النجاح.</span>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
            <img src={comp1} />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
            <img src={comp2} />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
            <img src={comp3} />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
            <img src={comp4} />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
            <img src={comp4} />
          </div>{" "}
          <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
            <img src={comp4} />
          </div>{" "}
          <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
            <img src={comp4} />
          </div>
        </div>
      </div>
      <AcademyFooter />
    </div>
  );
};

export default LayOut3;

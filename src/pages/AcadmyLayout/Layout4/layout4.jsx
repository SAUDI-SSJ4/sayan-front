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
import layout2Image from "../../../assets/images/layout2.png";
import FAQ from "../../../component/AcadmyLayouts/Faq/FAQ";
import BlogSection from "../../../component/AcadmyLayouts/Blog/BlogSection";
const LayOut4 = () => {
  return (
    <div>
      <AcademyHeaderContainer LayOut2>
        <div className="container d-flex justify-content-center mt-5">
          <img src={layout2Image} style={{ maxWidth: "100%" }} />
        </div>
      </AcademyHeaderContainer>
      {/* نبذة عن المعلم */}
      <div>
        <div className="container">
          <div className="row aboutAcademyLayout">
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
                  className="fs-6 fw-medium text-cotent--1 lh-lg"
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

      <SubjectSlider LayOut2 />
      <ProductSlider LayOut2 />
      <div style={{ backgroundColor: "" }}>
        <BlogSection />
      </div>
      <PartnerSection LayOut2 />
      <FAQ />
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        className="container"
        style={{ marginTop: "150px" }}
      >
        <div className="row">
          <div className="col-lg-8 col-md-9">
            <h2
              className="fs-3 fw-bold title-text--1"
              style={{ fontSize: "46px", fontWeight: "600", color: "#333" }}
            >
              خدمة تأسيس الشركات الخارجية وفي السعودية من{" "}
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#636363",
                marginTop: "25px",
                lineHeight:"1.8"
              }}
              className="fs-6 fw-medium  text-content--1"
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
      <AcademyFooter />
    </div>
  );
};

export default LayOut4;

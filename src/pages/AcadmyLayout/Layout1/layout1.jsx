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
import MouseAnimation from "../../../assets/images/Animation.gif";
import { Spinner } from "react-bootstrap";
import { useAcademyHome } from "../../../framework/website/academy-home";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../axios";
import { useParams } from "react-router-dom";
import layout2Image from "../../../assets/images/layout2.png";
import AcademyLayoutNavbar from "../../../component/AcadmyLayouts/AcademyLayoutNavbar/AcademyLayoutNavbar";
import FAQ from "../../../component/AcadmyLayouts/Faq/FAQ";

const Layout1 = () => {
  const { acdemyId } = useParams();
  const { data: profileData, isLoading, errors } = useAcademyHome(acdemyId);
  const [templateLayout, settemplateLayout] = useState();
  const [colors, setColors] = useState({ primary: '', text: '' });
  useEffect(() => {
    console.log(profileData);
    settemplateLayout(profileData?.template_id);
    // COMMENT: the colors will be here untile wifind the solution
    setColors({ primary: profileData?.template_primary_color, text: profileData?.template_text_color });

      // Set CSS variables on :root
      document.documentElement.style.setProperty('--primary-color', primaryColor);
      document.documentElement.style.setProperty('--text-color', textColor);
  
  }, [profileData]);
  console.log(profileData);

  if (isLoading)
    return (
      <div className="w-full h-50 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );
  console.log(templateLayout);
  return (
    <>
      <AcademyLayoutNavbar navSettings={profileData} />
      {templateLayout === 1 ? (
        <div className="container mb-4">
          <div className="row aboutAcademyLayout g-3 mt-3">
            <div className="col-lg-6">
              <div data-aos="fade-up" className="SectionText">
                <h2>
                  <span>{profileData?.data?.slider?.title}</span> <br />
                  {profileData?.data?.slider?.sub_title} <span>.</span>
                </h2>
                <p className="fs-6 fw-medium text-content--1">
                  {profileData?.data?.slider?.content}
                </p>
                <div className="Btn buttons-header">
                  <div className="Primary button-one-1 button-head">{profileData?.data?.slider?.main_btn}</div>
                  <a
                    className="Secondry button-one-1 text-decoration-none"
                    href={profileData?.data?.slider?.video}
                    target="_blank"
                    rel="noreferrer"
                  >
                   {profileData?.data?.slider?.secondary_btn}
                    <PlayBtn />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div data-aos="fade-right" className="SectionImage">
                <img src={profileData?.data?.slider?.image} alt="Slider" />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center cursor-pointer mt-sm-5">
            <img
              style={{ width: "54px", cursor: "pointer" }}
              src={MouseAnimation}
              alt="Mouse Animation"
            />
          </div>
        </div>
      ) : (
        <div className="container d-flex justify-content-center mt-5">
          <img src={layout2Image} style={{ maxWidth: "100%" }} />
        </div>
      )}

      {/* نبذة عن المعلم */}
      <div>
        <div className="container mt-5">
          <div className="row g-3 aboutAcademyLayout">
            <div className="col-lg-6">
              <div data-aos="fade-up" className="SectionImage">
                <img src={profileData?.data?.about?.image} alt="About Image" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="SectionText">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                  <span>{profileData?.data?.about?.title}</span> <br />
                  {profileData?.data?.about?.sub_title} <span>.</span>
                </h2>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="100"
                  className="fs-6 fw-medium text-content--1"
                >
                  {profileData?.data?.about?.content}
                </p>
                <div
                  className="d-flex"
                  style={{
                    alignItems: "center",
                    gap: "40px",
                    marginTop: "30px",
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
                      fontSize: "20px",
                    }}
                    className="title-text--1"
                  >
                    <CertificationIcon />
                    {profileData?.data?.about?.feature_one}
                  </div>
                  <div
                    data-aos="fade-right"
                    data-aos-duration="1000"
                    data-aos-delay="300"
                    style={{
                      width: "2px",
                      backgroundColor: "rgba(50, 50, 50, 0.50)",
                      height: "30px",
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
                      fontSize: "20px",
                    }}
                    className="title-text--1"
                  >
                    <GraduateIcon />
                    {profileData?.data?.about?.feature_two}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubjectSlider mainData={profileData} />
      <ProductSlider academyData={profileData} />
      <PartnerSection />
      <StudentRateSection />
      <span className="pt-5 pb-5"></span>
      <FAQ profileData={profileData} />
      {profileData?.data?.calltoactions?.map((e, i) => {
        return (
          <div
            key={i}
            data-aos="fade-up"
            data-aos-delay="400"
            className="container"
            style={{ marginTop: "150px" }}
          >
            <div className={`row g-3 ${i % 2 === 0 ? "image-rightxx" : "image-leftxx"}`}>
              <div className="col-lg-8 col-md-9">
                <h2
                  className="fs-3 fw-bold title-text--1"
                  style={{
                    fontWeight: "600",
                    color: "#333",
                    lineHeight: "1.8",
                  }}
                >
                  {e.title}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#636363",
                    marginTop: "25px",
                    lineHeight: "1.8",
                  }}
                  className="text-content--1"
                >
                  {e.content}
                </p>
              </div>
              <div className="col-lg-4 col-md-3 d-none d-md-block">
                <img src={e.image} style={{ maxWidth: "100%" }} alt="Quma" />
              </div>
            </div>
          </div>
        );
      })}
      <AcademyFooter footerData={profileData?.data} />
    </>
  );
};

export default Layout1;

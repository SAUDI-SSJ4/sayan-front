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
import { Button, Spinner } from "react-bootstrap";
import { useAcademyHome } from "../../../framework/website/academy-home";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../axios";
import { useParams } from "react-router-dom";
import layout2Image from "../../../assets/images/layout2.png";
import AcademyLayoutNavbar from "../../../component/AcadmyLayouts/AcademyLayoutNavbar/AcademyLayoutNavbar";
import FAQ from "../../../component/AcadmyLayouts/Faq/FAQ";
import { getAllAcademySettings } from "../../../utils/apis/client/academy";
import { useQuery } from "@tanstack/react-query";

const Layout1 = () => {
  const { id } = useParams();
  
  const [websiteData, setWebsiteData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true)
    getAllAcademySettings(id)
      .then((data) => {
        // setAcademyId(data.template.id)
        console.log("data",data)
        setWebsiteData(data);
        data.template?.name?document.title = data.template?.name:null;
        // setColors({ primary: data.template.primary_color, text: data.template.text_color });
        
        // Set CSS variables on :root
        data.template?.secondary_color?document.documentElement.style.setProperty('--primary-color', data.template?.primary_color):null;
        data.template?.secondary_color?document.documentElement.style.setProperty('--text-color', data.template?.secondary_color):null;   
    // Update the favicon
    const faviconElement = document.querySelector("link[rel='icon']");
    if (faviconElement && data.template?.favicon) {
      faviconElement.href = data.template?.favicon;
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = data.template.favicon;
      document.head.appendChild(newFavicon);
    }
    
      })
      .catch((error) => {
        console.log(error);
    }).finally(() => setIsLoading(false));
  }, []);


  // const { data, error, isLoading } = useQuery(
  //   ["academySettings", id],
  //   () => getAllAcademySettings(id),
  //   {
  //     onSuccess: (data) => {
  //       // Set the website data
  //       console.log("data", data);

  //       // Update document title
  //       if (data.template?.name) {
  //         document.title = data.template.name;
  //       }

  //       // Set CSS variables on :root
  //       if (data.template?.primary_color) {
  //         document.documentElement.style.setProperty("--primary-color", data.template.primary_color);
  //       }
  //       if (data.template?.secondary_color) {
  //         document.documentElement.style.setProperty("--text-color", data.template.secondary_color);
  //       }

  //       // Update the favicon
  //       const faviconElement = document.querySelector("link[rel='icon']");
  //       if (faviconElement && data.template?.favicon) {
  //         faviconElement.href = data.template.favicon;
  //       } else if (data.template?.favicon) {
  //         const newFavicon = document.createElement("link");
  //         newFavicon.rel = "icon";
  //         newFavicon.href = data.template.favicon;
  //         document.head.appendChild(newFavicon);
  //       }
  //     },
  //     onError: (error) => {
  //       console.error("Error fetching academy settings:", error);
  //     },
  //   }
  // );


  const [templateLayout, settemplateLayout] = useState(1);

  if (isLoading)
    return (
      <div className="w-full h-50 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );
 
  return (
    <>
      <AcademyLayoutNavbar navSettings={websiteData} />
      {templateLayout === 1 ? (
        <div className="container mb-4">
          <div className="row aboutAcademyLayout g-3 mt-3">
            <div className="col-lg-6">
              <div data-aos="fade-up" className="SectionText">
                <h2 >
                  <span>{websiteData?.slider?.title}</span> <br />
                  {websiteData?.slider?.sub_title} <span>.</span>
                </h2>
                <p className="fs-6 fw-medium text-content--1">
                  {websiteData?.slider?.content}
                </p>
                <div className="Btn buttons-header">
                  <a href={websiteData?.slider?.first_button_link} className="Primary button-one-1 button-head">{websiteData?.slider?.first_button_title}</a>
                  <a
                    className="Secondry button-one-1 text-decoration-none"
                    href={websiteData?.slider?.second_button_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                   {websiteData?.slider?.second_button_title}
                    <PlayBtn color={websiteData?.template?.primary_color}  iconColor={websiteData?.template?.primary_color} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div data-aos="fade-right" className="SectionImage">
                <img src={websiteData?.slider?.image} alt="Slider" />
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
      ) : ( null
        // <div className="container d-flex justify-content-center mt-5">
        //   <img src={layout2Image} style={{ maxWidth: "100%" }} />
        // </div>
      )}

      {/* نبذة عن المعلم */}
      <div>
        <div className="container mt-5">
          <div className="row g-3 aboutAcademyLayout">
            <div className="col-lg-6">
              <div data-aos="fade-up"  className="SectionImage">
                <img src={websiteData?.about?.image} alt="About Image" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="SectionText">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                  <span>{websiteData?.about?.title}</span> <br />
                  {websiteData?.about?.sub_title} <span>.</span>
                </h2>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="100"
                  className="fs-6 fw-medium text-content--1"
                >
                  {websiteData?.about?.content}
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
                    {websiteData?.about?.feature_one}
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
                    {websiteData?.about?.feature_two}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubjectSlider mainData={websiteData} />
      {/* <ProductSlider academyData={profileData} /> */}
      {/* <PartnerSection /> */}
      <StudentRateSection />
      <span className="pt-5 pb-5"></span>
      <FAQ profileData={websiteData} />
      {/* {websiteData?.calltoactions?.map((e, i) => {
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
      })} */}
      <AcademyFooter footerData={websiteData} />
    </>
  );
};

export default Layout1;

import CertificationIcon from "../../../component/Icons/CertificationIcon";
import GraduateIcon from "../../../component/Icons/GraduateIcon";
import StudentRateSection from "../../../component/AcadmyLayouts/studentRate/StudentRate";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AcademyLayoutNavbar from "../../../component/AcadmyLayouts/AcademyLayoutNavbar/AcademyLayoutNavbar";
import FAQ from "../../../component/AcadmyLayouts/Faq/FAQ";
import {
  getAbout,
  getAcademyCourses,
  getAcademyFaqs,
  getAcademyOpinions,
  getAcademyProfile,
  getAcademySettings,
  getSlider,
} from "../../../utils/apis/client/academy";
import Youtube from "../../../assets/icons/social-icons/Youtube.svg";
import LinkedIn from "../../../assets/icons/social-icons/LinkedIn.svg";
import Twitter from "../../../assets/icons/social-icons/Twitter.svg";
import Instagram from "../../../assets/icons/social-icons/Instagram.svg";
import ssl from "../../../component/MainPages/Footer/ssl.svg";
import ScrollToHashElement from "../../../components/ScrollToHashElement.jsx";
import classes from "../../../component/MainPages/SubjectCard/SubjectCard.module.scss";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SubjectCard from "../../../component/MainPages/SubjectCard/SubjectCard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Helmet } from "react-helmet-async";
import { FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Layout1 = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [academyData, setAcademyData] = useState(null);

  useEffect(() => {
    const getAcademyData = async () => {
      try {
        setIsLoading(true);
        const [
          sliderData,
          settingsData,
          profile,
          aboutData,
          coursesData,
          opinions,
          faqs,
        ] = await Promise.all([
          getSlider(id),
          getAcademySettings(id),
          getAcademyProfile(id),
          getAbout(id),
          getAcademyCourses(id),
          getAcademyOpinions(id),
          getAcademyFaqs(id),
        ]);
        setAcademyData({
          slider: sliderData?.slider,
          settings: settingsData?.template,
          profile,
          about: aboutData?.about,
          courses: coursesData?.data,
          opinions: opinions?.data,
          faqs: faqs.data,
        });
      } catch (error) {
        console.error("Error fetching academy slider:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAcademyData();
  }, [id]);

  if (isLoading)
    return (
      <div className="w-full h-50 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );

  return (
    !isLoading &&
    academyData && (
      <>
        <Helmet>
          <title>{academyData.settings.name}</title>
          <link
            rel="icon"
            type="image/svg+xml"
            href={`${academyData.settings.favicon}?v=${Date.now()}`}
            key="favicon"
          />
          {/* No custom font specification - will use system default */}
        </Helmet>
        <AcademyLayoutNavbar
          profile={academyData.profile}
          academySettings={academyData.settings}
          faqs={academyData.faqs}
          studentOpinions={academyData.opinions}
        />
        <ScrollToHashElement />
        <Hero academyData={academyData} />

        {/* نبذة عن المعلم */}

        <About academyData={academyData} />
        <Courses academyData={academyData} />
        {academyData.opinions.length > 0 && (
          <div style={{ marginTop: '0px', marginBottom: '150px' }}>
            <StudentRateSection
              opinions={academyData.opinions}
              academySettings={academyData.settings}
            />
          </div>
        )}
        {academyData.faqs.length > 0 && (
          <div className="md:mt-[200px] mt-[50px]">
            <FAQ faqs={academyData.faqs} academySettings={academyData.settings} />
          </div>
        )}
        <Footer academySettings={academyData.settings} />
      </>
    )
  );
};

export default Layout1;

const Courses = ({ academyData }) => {
  return (
    <div
      id="courses"
      className="CustomContainer px-4 md:px-0"
      style={{ marginTop: '200px' }}
      data-aos-duration="1000"
    >
      {academyData.courses.length > 0 ? (
        <>
          <div className={`${classes.title} text-center`} style={{ marginBottom: '15px' }}>
            المواد التعليمية 
          </div>
          <Swiper
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={10}
            loop
            modules={[Pagination, Autoplay]}
            breakpoints={{
              0: { 
                slidesPerView: 1,
                spaceBetween: 0
              },
              768: { 
                slidesPerView: 2,
                spaceBetween: 10
              },
              991: { 
                slidesPerView: 2,
                spaceBetween: 10
              },
              1200: { 
                slidesPerView: 3,
                pagination: { enabled: true },
                spaceBetween: 10
              },
              1400: { 
                slidesPerView: 4,
                pagination: { enabled: true },
                spaceBetween: 10
              },
            }}
            className="mySwiperContainer pb-5"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {academyData.courses.map((course) => (
              <SwiperSlide key={course.id} style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="d-flex justify-content-center w-full md:w-auto"
                  style={{ maxWidth: '100%', margin: '0 auto' }}
                >
                  <SubjectCard
                    mainData={course}
                    academySettings={academyData.settings}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination" style={{ bottom: "5px" }}></div>
          </Swiper>
        </>
      ) : (
        <div className="text-center mt-5">
          <h2 className="text-2xl font-bold">لا توجد مواد تعليمية متاحة</h2>
          <p className="text-gray-500">يرجى التحقق لاحقًا.</p>
        </div>
      )}
    </div>
  );
};

const Hero = ({ academyData }) => {
  return (
    <div className="container" style={{ marginTop: '100px', marginBottom: '150px' }}>
      <div className="row aboutAcademyLayout g-4">
        <div className="col-lg-6">
          <div data-aos="fade-up" className="SectionText">
            <h2>
              <span style={{ color: academyData.settings.primary_color }}>
                {academyData.slider.title}
              </span>{" "}
              <br />
              {academyData.slider.sub_title}{" "}
              <span style={{ color: academyData.settings.primary_color }}>.</span>
            </h2>
            <p className="fs-6 fw-medium text-content--1">
              {academyData.slider.content}
            </p>
            <div className="Btn buttons-header">
              <a
                href={academyData.slider.first_button_link}
                style={{
                  background: academyData.settings.primary_color,
                }}
                className="w-[160px] h-[56px] rounded-[49px] text-sm text-white flex justify-center items-center opacity-90 hover:opacity-100 duration-200 transition-opacity font-bold"
              >
                {academyData.slider.first_button_title}
              </a>
              <a
                style={{
                  border: `1px solid ${academyData.settings.secondary_color}`,
                }}
                className="w-[226px] h-[56px] rounded-[49px] text-sm gap-3 flex justify-center items-center opacity-90 hover:opacity-100 duration-200 transition-opacity font-bold"
                href={academyData.slider.second_button_link}
                target="_blank"
                rel="noreferrer"
              >
                <span
                  style={{
                    color: academyData.settings.secondary_color,
                  }}
                >
                  {academyData.slider.second_button_title}
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 !pr-10">
          <div data-aos="fade-right" className="SectionImage">
            <img
              src={academyData.slider.image} 
              alt="Slider"
              loading="lazy"
              width="800"
              height="600"
              style={{ maxHeight: '600px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const About = ({ academyData }) => {
  return (
    <div className="container mt-5">
      <div className="row g-4 aboutAcademyLayout">
        <div className="col-lg-6 order-2 order-lg-1">
          <div data-aos="fade-up" className="SectionImage !pl-0 lg:!pl-14">
            <img
              src={academyData.about.image}
              alt="About Image"
              className="w-full h-auto object-cover rounded-lg"
              style={{
                width: '100%',
                maxHeight: '600px',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
        </div>
        <div className="col-lg-6 order-1 order-lg-2">
          <div className="SectionText px-4 lg:px-0">
            <h2 data-aos="fade-up" data-aos-duration="1000" className="text-3xl lg:text-4xl mb-4">
              <span style={{ color: academyData.settings.primary_color }}>
                {academyData.about.title}
              </span>{" "}
              <br />
              {academyData.about.sub_title}{" "}
              <span style={{ color: academyData.settings.primary_color }}>.</span>
            </h2>
            <p className="fs-6 fw-medium text-content--1 mb-6">
              {academyData.about.content}
            </p>
            <div className="flex flex-wrap gap-6 lg:gap-10 mt-6">
              <div className="flex items-center gap-3 title-text--1">
                <CertificationIcon color={academyData.settings.secondary_color} />
                <span className="">{academyData.about.feature_one}</span>
              </div>
              <div className="hidden lg:block w-0.5 h-8 bg-opacity-50" style={{ backgroundColor: academyData.settings.secondary_color }}></div>
              <div className="flex items-center gap-3 title-text--1">
                <GraduateIcon color={academyData.settings.secondary_color} />
                <span className="text-base lg:text-lg">{academyData.about.feature_two}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ academySettings }) => {
  const navigate = useNavigate();

  const socialLinks = [
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/sayan_edtech",
    },
    {
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/in/sayan-edtech/",
    },
    {
      icon: <FaTwitter />,
      url: "https://x.com/sayan_edtech",
    },
    {
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@sayan_edtech",
    },
  ];

  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 pt-14 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-6">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-12">
          {/* Social Icons - Right Side */}
          <div className="flex flex-col items-center md:items-start order-2 md:order-1 mt-8 md:mt-0">
            <h3 className="text-gray-800 font-bold mb-6 text-lg">تابعنا على وسائل التواصل</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((link, index) => (
                <button 
                  key={index}
                  onClick={() => handleRedirect(link.url)}
                  style={{ backgroundColor: academySettings.primary_color }}
                  className="w-10 h-10 rounded-[8px] text-white flex items-center justify-center transition-all duration-300 hover:opacity-90"
                >
                  {link.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Brand & Logo - Left Side */}
          <div className="flex flex-col items-start order-1 md:order-2">
            <img 
              src={academySettings.logo}
              className="h-14 mb-4" 
              alt={academySettings.name}
            />
            <p className="text-gray-600 text-sm" style={{ direction: "rtl" }}>
              تم التطوير بواسطة{' '}
              <a 
                href="https://sayan.pro" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: academySettings.primary_color }}
                className="hover:opacity-90"
              >
                منصة سيان
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Section - Copyright & Legal */}
        <div className="text-center border-t border-gray-200 pt-8">
          <p className="text-gray-500 text-sm">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
            <button 
              onClick={() => navigate("/privacy-policy")}
              style={{ color: academySettings.primary_color }}
              className="hover:opacity-90 text-sm font-medium mr-2 transition-colors"
            >
              الشروط والأحكام
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
};

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube, FaSnapchatGhost, FaFacebookF, FaPhone } from "react-icons/fa";
import CertificationIcon from "../../../component/Icons/CertificationIcon";
import GraduateIcon from "../../../component/Icons/GraduateIcon";
import StudentRateSection from "../../../component/AcadmyLayouts/studentRate/StudentRate";
import AcademyLayoutNavbar from "../../../component/AcadmyLayouts/AcademyLayoutNavbar/AcademyLayoutNavbar";
import FAQ from "../../../component/AcadmyLayouts/Faq/FAQ";
import ScrollToHashElement from "../../../components/ScrollToHashElement.jsx";
import SubjectCard from "../../../component/MainPages/SubjectCard/SubjectCard";
import classes from "../../../component/MainPages/SubjectCard/SubjectCard.module.scss";
import {
  getAbout,
  getAcademyCourses,
  getAcademyFaqs,
  getAcademyOpinions,
  getAcademyProfile,
  getAcademySettings,
  getSlider,
} from "../../../utils/apis/client/academy";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// شاشة التحميل - تغذى بألوان الأكاديمية إذا متاحة
const BeautifulLoading = ({primaryColor = "#667eea", secondaryColor = "#764ba2" }) => {
  const [loadingText, setLoadingText] = useState("جاري تحميل الأكاديمية");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const textInterval = setInterval(() => {
      const texts = [
        "جاري تحميل الأكاديمية",
        "تحضير المحتوى",
        "جلب البيانات",
        "إعداد الصفحة"
      ];
      setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
    }, 2000);

    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => {
      clearInterval(textInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes progressSlide {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const loadingContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    animation: 'fadeIn 0.5s ease-in'
  };
  const orbitStyle = {
    position: 'relative',
    width: '100px',
    height: '100px',
    marginBottom: '30px'
  };
  const orbitRing1Style = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '2px solid transparent',
    borderTop: `2px solid ${secondaryColor}CC`,
    borderRadius: '50%',
    animation: 'spin 2s linear infinite'
  };
  const orbitRing2Style = {
    position: 'absolute',
    width: '70%',
    height: '70%',
    top: '15%',
    left: '15%',
    border: '2px solid transparent',
    borderTop: `2px solid ${primaryColor}99`,
    borderRadius: '50%',
    animation: 'spin 1.5s linear infinite reverse'
  };
  const orbitRing3Style = {
    position: 'absolute',
    width: '40%',
    height: '40%',
    top: '30%',
    left: '30%',
    border: '2px solid transparent',
    borderTop: `2px solid ${primaryColor}F2`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };
  const textStyle = {
    color: 'white',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '15px',
    textAlign: 'center',
    animation: 'pulse 2s infinite',
  };
  const subtextStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    textAlign: 'center',
    fontWeight: '400',
  };
  const progressBarContainer = {
    width: '300px',
    height: '4px',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '2px',
    overflow: 'hidden',
    marginTop: '30px'
  };
  const progressBar = {
    height: '100%',
    background: `linear-gradient(90deg, #ffffff, ${secondaryColor}, #ffffff)`,
    backgroundSize: '200% 100%',
    animation: 'progressSlide 2s infinite'
  };

  return (
    <div style={loadingContainerStyle}>
      <div style={orbitStyle}>
        <div style={orbitRing1Style}></div>
        <div style={orbitRing2Style}></div>
        <div style={orbitRing3Style}></div>
      </div>
      <div style={textStyle}>
        {loadingText}{dots}
      </div>
      <div style={subtextStyle}>
        يرجى الانتظار لحظات قليلة
      </div>
      <div style={progressBarContainer}>
        <div style={progressBar}></div>
      </div>
    </div>
  );
};

const Layout1 = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [academyData, setAcademyData] = useState(null);

  useEffect(() => {
    const getAcademyData = async () => {
      try {
        setIsLoading(true);
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        const sliderData = await getSlider(id);
        await delay(200);
        const settingsData = await getAcademySettings(id);
        await delay(200);
        const profile = await getAcademyProfile(id);
        await delay(200);
        const aboutData = await getAbout(id);
        await delay(200);
        const coursesData = await getAcademyCourses(id);
        await delay(200);
        const opinions = await getAcademyOpinions(id);
        await delay(200);
        const faqs = await getAcademyFaqs(id);

        setAcademyData({
          slider: sliderData?.slider,
          settings: settingsData?.template,
          profile,
          about: aboutData?.about,
          courses: coursesData?.data || [],
          opinions: opinions?.data || [],
          faqs: faqs?.data || [],
        });
      } catch (error) {
        setAcademyData({
          slider: null,
          settings: null,
          profile: null,
          about: null,
          courses: [],
          opinions: [],
          faqs: [],
        });
      } finally {
        setIsLoading(false);
      }
    };
    const timer = setTimeout(() => {
      getAcademyData();
    }, 100);
    return () => clearTimeout(timer);
  }, [id]);

  const currentData = academyData;
  const hasColors =
    currentData && currentData.settings && currentData.settings.primary_color && currentData.settings.secondary_color;

  const academyStyles = hasColors
    ? {
        '--academy-primary-color': currentData.settings.primary_color,
        '--academy-secondary-color': currentData.settings.secondary_color,
        paddingTop: '30px',
      }
    : { paddingTop: '30px' };

  if (isLoading || !hasColors) {
    // في حال التحميل أو لا يوجد ألوان، استعمل ألوان افتراضية أو من السيرفر إذا متوفرة
    return (
      <BeautifulLoading
        primaryColor={currentData?.settings?.primary_color}
        secondaryColor={currentData?.settings?.secondary_color}
      />
    );
  }

  if (!currentData.settings || !currentData.slider) {
    return (
      <div className="text-center my-16 text-lg font-bold">
        حدث خطأ أو البيانات غير متوفرة حالياً
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentData.settings.name || ""}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${currentData.settings.favicon || "/favicon.svg"}?v=${Date.now()}`}
          key="favicon"
        />
      </Helmet>
      <div
        className="academy-layout-container academy-typography"
        style={{
          backgroundColor: '#F9FAFB',
          ...academyStyles,
        }}
      >
        <AcademyLayoutNavbar
          profile={currentData.profile}
          academySettings={currentData.settings}
          faqs={currentData.faqs}
          studentOpinions={currentData.opinions}
          academyId={id}
        />
        <ScrollToHashElement />
        <div className="mt-[75px] md:mt-[100px]">
          <div id="hero">
            {currentData.slider ? (
              <Hero academyData={currentData} />
            ) : (
              <div className="text-center my-10 text-md text-gray-500">لا يوجد بيانات</div>
            )}
          </div>
        </div>
        <div id="about">
          {currentData.about ? (
            <About academyData={currentData} />
          ) : (
            <div className="text-center my-10 text-md text-gray-500">لا يوجد بيانات</div>
          )}
        </div>
        <div style={{ marginTop: '200px' }}>
          <Courses academyData={currentData} />
        </div>
        {currentData.opinions && currentData.opinions.length > 0 && (
          <div style={{ marginBottom: '150px' }}>
            <StudentRateSection
              opinions={currentData.opinions}
              academySettings={currentData.settings}
            />
          </div>
        )}
        {currentData.faqs && currentData.faqs.length > 0 && (
          <div>
            <FAQ faqs={currentData.faqs} academySettings={currentData.settings} />
          </div>
        )}
        <Footer academySettings={currentData.settings} academyProfile={currentData.profile} />
      </div>
    </>
  );
};

export default Layout1;

const Courses = ({ academyData }) => {
  if (!academyData || !academyData.courses) return null;
  const activeCourses = academyData.courses.filter(course => course.status == 1);

  return (
    <div
      id="courses"
      className="CustomContainer px-4 md:px-0"
      style={{ marginTop: '75px' }}
      data-aos-duration="1000"
    >
      {activeCourses.length > 0 ? (
        <>
          <div
            className={`${classes.title} text-center academy-primary-text`}
            style={{
              fontSize: '2.0rem',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '2rem',
              color: academyData.settings.primary_color
            }}
          >
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
              0: { slidesPerView: 1, spaceBetween: 0 },
              768: { slidesPerView: 2, spaceBetween: 10 },
              991: { slidesPerView: 2, spaceBetween: 10 },
              1200: { slidesPerView: 3, pagination: { enabled: true }, spaceBetween: 10 },
              1400: { slidesPerView: 4, pagination: { enabled: true }, spaceBetween: 10 },
            }}
            className="mySwiperContainer pb-5"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {activeCourses.map((course) => {
              const courseData = {
                ...course,
                academy_id: academyData.profile?.id
              };
              return (
                <SwiperSlide key={course.id} style={{ display: 'flex', justifyContent: 'center' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="d-flex justify-content-center w-full md:w-auto"
                    style={{ maxWidth: '100%', margin: '0 auto' }}
                  >
                    <SubjectCard
                      mainData={courseData}
                      academySettings={academyData.settings}
                    />
                  </motion.div>
                </SwiperSlide>
              );
            })}
            <div className="swiper-pagination" style={{ bottom: "5px" }}></div>
          </Swiper>
        </>
      ) : (
                  <div className="text-center mt-5">
          <h2 className="text-2xl font-bold mb-4 academy-primary-text"
              style={{ color: academyData.settings.primary_color, fontSize: '2.0rem' }}>
            لا توجد مواد تعليمية متاحة
          </h2>
          <p className="text-lg academy-muted-text">
            يرجى التحقق لاحقًا.
          </p>
        </div>
      )}
    </div>
  );
};

const Hero = ({ academyData }) => {
  if (!academyData.slider) return null;
  return (
    <div className="container" style={{marginBottom: '150px' }}>
      <div className="row aboutAcademyLayout g-4">
        <div className="col-lg-6">
          <div data-aos="fade-up" className="SectionText">
            <h2 className="academy-hero-title" style={{ fontSize: '2.0rem' }}>
              <span className="academy-primary-text" style={{color: academyData.settings.primary_color}}>
                {academyData.slider.title}
              </span>{" "}
              <br />
              <span style={{ color: '#1F2937' }}>{academyData.slider.sub_title}</span>{" "}
              <span className="academy-primary-text" style={{color: academyData.settings.primary_color}}>.</span>
            </h2>
            <p className="academy-content-large academy-content-text" style={{ marginBottom: '2rem' }}>
              {academyData.slider.content}
            </p>
            <div className="Btn buttons-header">
              <a
                href={academyData.slider.first_button_link}
                className="academy-btn-primary w-[160px] h-[56px] flex justify-center items-center"
                style={{ background: academyData.settings.primary_color }}
              >
                {academyData.slider.first_button_title}
              </a>
              <a
                href={academyData.slider.second_button_link}
                target="_blank"
                rel="noreferrer"
                className="academy-btn-secondary w-[226px] h-[56px] gap-3 flex justify-center items-center"
                style={{
                  borderColor: academyData.settings.secondary_color,
                  color: academyData.settings.secondary_color
                }}
              >
                {academyData.slider.second_button_title}
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
  if (!academyData.about) return null;
  return (
    <div className="container">
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
            <h2
              data-aos="fade-up"
              data-aos-duration="1000"
              className="academy-section-title mb-4"
              style={{ fontSize: '2.0rem' }}
            >
              <span className="academy-primary-text" style={{color: academyData.settings.primary_color}}>
                {academyData.about.title}
              </span>{" "}
              <br />
              <span style={{ color: '#1F2937' }}>{academyData.about.sub_title}</span>{" "}
              <span className="academy-primary-text" style={{color: academyData.settings.primary_color}}>.</span>
            </h2>
            <p className="academy-content-large academy-content-text mb-6">
              {academyData.about.content}
            </p>
            <div className="flex flex-wrap gap-6 lg:gap-10 mt-6">
              <div className="flex items-center gap-3">
                <CertificationIcon color={academyData.settings.secondary_color} />
                <span className="academy-feature-text">
                  {academyData.about.feature_one}
                </span>
              </div>
              <div className="hidden lg:block w-0.5 h-8 bg-opacity-50"
                   style={{ backgroundColor: academyData.settings.secondary_color }}></div>
              <div className="flex items-center gap-3">
                <GraduateIcon color={academyData.settings.secondary_color} />
                <span className="academy-feature-text">
                  {academyData.about.feature_two}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ academySettings, academyProfile }) => {
  const navigate = useNavigate();
  const socialLinks = [];
  if (academyProfile?.facebook && academyProfile.facebook !== "http://google.com.sa/") {
    socialLinks.push({ icon: <FaFacebookF />, url: academyProfile.facebook, platform: "Facebook" });
  }
  if (academyProfile?.instagram && academyProfile.instagram !== "http://google.com.sa/") {
    socialLinks.push({ icon: <FaInstagram />, url: academyProfile.instagram, platform: "Instagram" });
  }
  if (academyProfile?.twitter && academyProfile.twitter !== "http://google.com.sa/") {
    socialLinks.push({ icon: <FaTwitter />, url: academyProfile.twitter, platform: "Twitter" });
  }
  if (academyProfile?.youtube) {
    socialLinks.push({ icon: <FaYoutube />, url: academyProfile.youtube, platform: "YouTube" });
  }
  if (academyProfile?.linkedin) {
    socialLinks.push({ icon: <FaLinkedinIn />, url: academyProfile.linkedin, platform: "LinkedIn" });
  }
  if (academyProfile?.snapchat && academyProfile.snapchat !== "s") {
    socialLinks.push({ icon: <FaSnapchatGhost />, url: `https://snapchat.com/add/${academyProfile.snapchat}`, platform: "Snapchat" });
  }
  const handleRedirect = (url) => { window.open(url, "_blank"); };
  const phoneNumber = academyProfile?.support_phone || academyProfile?.phone;

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 pt-14 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-12 gap-8">
          <div className="flex flex-col items-center lg:items-start order-2 lg:order-1">
            <h3 className="font-bold mb-6 academy-primary-text"
                style={{ fontSize: '1.2rem', color: academySettings.primary_color }}>
              تواصل معنا
            </h3>
            <div className="mb-4">
              <div className="flex items-center gap-3 text-gray-700">
                <div
                  style={{ backgroundColor: academySettings.primary_color }}
                  className="w-10 h-10 rounded-lg text-white flex items-center justify-center"
                >
                  <FaPhone />
                </div>
                <span className="font-medium">
                  {phoneNumber ? (
                    <a
                      href={`tel:${phoneNumber.startsWith('0') ? '+963' + phoneNumber.substring(1) : phoneNumber}`}
                      className="hover:opacity-80 transition-opacity academy-primary-text academy-content-large font-semibold"
                      style={{ color: academySettings.primary_color }}
                    >
                      {phoneNumber}
                    </a>
                  ) : (
                    <span className="academy-muted-text">لا يوجد</span>
                  )}
                </span>
              </div>
            </div>
            {socialLinks.length > 0 && (
              <>
                <h4 className="font-semibold mb-4 academy-content-large" style={{ color: '#374151' }}>
                  تابعنا على وسائل التواصل
                </h4>
                <div className="flex gap-3 justify-center lg:justify-start flex-wrap">
                  {socialLinks.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => handleRedirect(link.url)}
                      style={{ backgroundColor: academySettings.primary_color }}
                      className="w-10 h-10 rounded-lg text-white flex items-center justify-center transition-all duration-300 hover:opacity-90 hover:scale-105"
                      title={`تابعنا على ${link.platform}`}
                    >
                      {link.icon}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col items-center lg:items-start order-1 lg:order-2">
            <img
              src={academySettings.logo}
              className="h-14 mb-4"
              alt={academySettings.name}
            />
            <h3 className="text-xl font-bold mb-2 text-center lg:text-right academy-primary-text"
                style={{ color: academySettings.primary_color }}>
              {academySettings.name}
            </h3>
            {academySettings.about && (
              <p className="text-sm text-center lg:text-right mb-4 max-w-xs academy-muted-text" style={{ lineHeight: '1.6' }}>
                {academySettings.about}
              </p>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-right text-sm academy-muted-text" style={{ direction: "rtl" }}>
              <p>
                جميع الحقوق محفوظة © {new Date().getFullYear()} سيان. تم التطوير بواسطة{' '}
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:opacity-90 academy-primary-text"
                  style={{ color: academySettings.primary_color }}
                >
                  منصة سيان
                </a>
              </p>
            </div>
            <div className="flex gap-6 order-1 lg:order-2">
              <button
                onClick={() => window.open("/updates", "_blank")}
                className="hover:opacity-90 text-sm font-medium transition-colors border-l border-gray-300 pl-6 academy-primary-text"
                style={{ color: academySettings.primary_color }}
              >
                تحديثات المنصة
              </button>
              <button
                onClick={() => window.open("/privacy-policy", "_blank")}
                className="hover:opacity-90 text-sm font-medium transition-colors border-l border-gray-300 pl-6 academy-primary-text"
                style={{ color: academySettings.primary_color }}
              >
                سياسة الخصوصية
              </button>
              <button
                onClick={() => window.open("/privacy-policy", "_blank")}
                className="hover:opacity-90 text-sm font-medium transition-colors academy-primary-text"
                style={{ color: academySettings.primary_color }}
              >
                الشروط والأحكام
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

import PlayBtn from "../../../component/Icons/PlayBtn";
import CertificationIcon from "../../../component/Icons/CertificationIcon";
import GraduateIcon from "../../../component/Icons/GraduateIcon";
import StudentRateSection from "../../../component/AcadmyLayouts/studentRate/StudentRate";
import MouseAnimation from "../../../assets/images/Animation.gif";
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
import Instagram from "../../../assets/images/Social/Instagram.svg";
import LinkedIn from "../../../assets/images/Social/LinkedIn.svg";
import Twitter from "../../../assets/images/Social/Twitter.svg";
import TikTok from "../../../assets/images/Social/Instagram.svg";
import ssl from "../../../component/MainPages/Footer/ssl.svg";
import ScrollToHashElement from "../../../components/ScrollToHashElement.jsx";
import classes from "../../../component/MainPages/SubjectCard/SubjectCard.module.scss";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SubjectCard from "../../../component/MainPages/SubjectCard/SubjectCard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Helmet } from "react-helmet-async";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Layout1 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleRedirect = (url) => {
    window.open(url, "_blank"); // Opens in a new tab
  };

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
            type="image/png"
            href={academyData.settings.favicon}
          />
        </Helmet>
        <AcademyLayoutNavbar
          profile={academyData.profile}
          academySettings={academyData.settings}
          faqs={academyData.faqs}
          studentOpinions={academyData.opinions}
        />
        <ScrollToHashElement />
        <div className="container mb-4">
          <div className="row aboutAcademyLayout g-4 mt-3">
            <div className="col-lg-6">
              <div data-aos="fade-up" className="SectionText">
                <h2>
                  <span>{academyData.slider.title}</span> <br />
                  {academyData.slider.sub_title} <span>.</span>
                </h2>
                <p className="fs-6 fw-medium text-content--1">
                  {academyData.slider.content}
                </p>
                <div className="Btn buttons-header">
                  <a
                    href={academyData.slider.first_button_link}
                    className="Primary button-one-1 button-head text-white hover:!text-gray-500"
                  >
                    {academyData.slider.first_button_title}
                  </a>
                  <a
                    className="Secondry button-one-1 text-decoration-none hover:!text-white"
                    href={academyData.slider.second_button_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {academyData.slider.second_button_title}
                    <PlayBtn
                      color={academyData.settings.primary_color}
                      iconColor={academyData.settings.primary_color}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 !pr-10">
              <div data-aos="fade-right" className="SectionImage">
                <img src={academyData.slider.image} alt="Slider" />
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

        {/* نبذة عن المعلم */}
        <div>
          <div className="container mt-5">
            <div className="row g-3 aboutAcademyLayout">
              <div className="col-lg-6">
                <div data-aos="fade-up" className="SectionImage !pl-14">
                  <img src={academyData.about.image} alt="About Image" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="SectionText">
                  <h2 data-aos="fade-up" data-aos-duration="1000">
                    <span>{academyData.about.title}</span> <br />
                    {academyData.about.sub_title} <span>.</span>
                  </h2>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="100"
                    className="fs-6 fw-medium text-content--1"
                  >
                    {academyData.about.content}
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
                      {academyData.about.feature_one}
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
                      {academyData.about.feature_two}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Courses courses={academyData.courses} />
        {academyData.opinions.length > 0 && (
          <StudentRateSection opinions={academyData.opinions} />
        )}
        {academyData.faqs.length > 0 && <FAQ faqs={academyData.faqs} />}
        <footer id="contact" className="bg-gray-100 py-8 mt-10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            {/* Mobile Apps */}
            <div className="flex gap-2 items-center mt-6 md:mt-0">
              <a href="#">
                <div className="flex items-center bg-black px-4 py-2 gap-2 rounded-md text-white text-center">
                  <div>
                    <img
                      src="https://labayh.net/wp-content/uploads/2022/06/google-app.svg"
                      alt="App Store"
                      className="h-8"
                    />
                  </div>
                  <div className="flex flex-col leading-none space-y-0">
                    <p className="text-xs m-0 p-0 text-gray-300">متوفر على</p>
                    <p className="text-sm font-bold m-0 p-0">Google Play</p>
                  </div>
                </div>
              </a>

              <a href="#">
                <div className="flex items-center bg-black px-4 py-2 gap-2 rounded-md text-white text-center">
                  <div>
                    <img
                      src="https://labayh.net/wp-content/uploads/2022/06/apple-app.svg"
                      alt="App Store"
                      className="h-8"
                    />
                  </div>
                  <div className="flex flex-col leading-none space-y-0">
                    <p className="text-xs m-0 p-0 text-gray-300">متوفر على</p>
                    <p className="text-sm font-bold m-0 p-0">App Store</p>
                  </div>
                </div>
              </a>
            </div>

            {/* Security & Certification */}
            <div className="flex flex-col items-center mt-6 md:mt-0">
              <img src={ssl} alt="Secure SSL" className="h-8" />
            </div>

            {/* Social Icons */}
            <div className="flex flex-col items-center">
              {/* <img src={footerData?.image ? footerData.image : Logo} className="h-12" alt="Logo" /> */}
              <div className="flex gap-4 mt-4">
                {/* <img src={YouTube} className="h-8 cursor-pointer" onClick={() => handleRedirect(footerData?.youtube)} alt="YouTube" /> */}
                <img
                  src={LinkedIn}
                  className="h-8 cursor-pointer"
                  onClick={() =>
                    handleRedirect("https://www.linkedin.com/in/sayan-edtech/")
                  }
                  alt="LinkedIn"
                />
                <img
                  src={Instagram}
                  className="h-8 cursor-pointer"
                  onClick={() =>
                    handleRedirect("https://www.instagram.com/sayan_edtech")
                  }
                  alt="Instagram"
                />
                <img
                  src={Twitter}
                  className="h-8 cursor-pointer"
                  onClick={() => handleRedirect("https://x.com/sayan_edtech")}
                  alt="Twitter"
                />
                <img
                  src={TikTok}
                  className="h-8 cursor-pointer"
                  onClick={() =>
                    handleRedirect("https://www.tiktok.com/@sayan_edtech")
                  }
                  alt="Facebook"
                />
              </div>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="text-center mt-6 text-gray-500 text-sm">
            <p>
              جميع الحقوق محفوظة لمنصة سيان © 2023 |
              <span
                className="cursor-pointer text-blue-500"
                onClick={() => navigate("/privacy-policy")}
              >
                الشروط والأحكام | سياسة الخصوصية
              </span>
            </p>
          </div>
        </footer>
      </>
    )
  );
};

export default Layout1;

const Courses = ({ courses }) => {
  return (
    <div
      id="courses"
      className="CustomContainer mt-5 position-relative"
      data-aos-duration="1000"
    >
      {courses.length > 0 ? (
        <>
          <div className={`${classes.title} text-center`}>
            المواد التعليمية الأكثر مبيعا
          </div>
          <Swiper
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={10}
            loop
            modules={[Navigation, Pagination, Autoplay]}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              991: { slidesPerView: 2 },
              1200: { slidesPerView: 3, pagination: { enabled: true } },
              1400: { slidesPerView: 4, pagination: { enabled: true } },
            }}
            className="mySwiperContainer pb-5"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="d-flex justify-content-center"
                >
                  <SubjectCard mainData={course} />
                </motion.div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination" style={{ bottom: "5px" }}></div>
          </Swiper>

          <div className="swiper-button-next animate__animated  animate__shakeY"></div>
          <div className="swiper-button-prev animate__animated  animate__shakeY"></div>
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

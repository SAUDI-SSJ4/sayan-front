import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "../../../utils/apis/client";
import { getAcademyProfile, getAcademySettings } from "../../../utils/apis/client/academy";
import toast from "react-hot-toast";
import { CourseCard } from "../../MainPages/SingleCourse/CourseCard";
import { CourseInfo } from "../../MainPages/SingleCourse/CourseInfo";
import AcademyLayoutNavbar from "../../../component/AcadmyLayouts/AcademyLayoutNavbar/AcademyLayoutNavbar";
import { FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube, FaSnapchatGhost, FaFacebookF, FaPhone } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const AcademySingleCourse = () => {
  const navigate = useNavigate();
  const { academyId, courseId } = useParams();
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [showBuyCourses, setshowBuyCourses] = useState(false);
  const [academyData, setAcademyData] = useState(null);
  const [isLoadingAcademy, setIsLoadingAcademy] = useState(true);

  // Fetch course data
  const {
    data: courseData = [],
    isLoading: isLoadingCourse,
    isError,
    error,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });

  // Fetch academy data
  useEffect(() => {
    const getAcademyData = async () => {
      try {
        setIsLoadingAcademy(true);
        const [profile, settings] = await Promise.all([
          getAcademyProfile(academyId),
          getAcademySettings(academyId),
        ]);
        setAcademyData({
          profile,
          settings: settings?.template,
        });
      } catch (error) {
        console.error("Error fetching academy data:", error);
        toast.error("حدث خطأ في تحميل بيانات الأكاديمية");
      } finally {
        setIsLoadingAcademy(false);
      }
    };

    if (academyId) {
      getAcademyData();
    }
  }, [academyId]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setshowBuyCourses(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleChange = (panel) => (_, isExpanded) =>
    setExpanded(isExpanded ? panel : false);

  if (isError) {
    console.log(error);
    toast.error(error.message || "حدث خطأ ما");
    return navigate("/");
  }

  if (isLoadingAcademy || isLoadingCourse) {
    return (
      <div className="w-full h-50 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );
  }

  if (!academyData) {
    return (
      <div className="text-center mt-5">
        <h2>لم يتم العثور على بيانات الأكاديمية</h2>
      </div>
    );
  }

  // متغيرات CSS ديناميكية للألوان
  const academyStyles = {
    '--academy-primary-color': academyData.settings.primary_color,
    '--academy-secondary-color': academyData.settings.secondary_color,
    paddingTop: '30px',
  };

  return (
    <>
      <Helmet>
        <title>{academyData.settings?.name || "المادة التعليمية"}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${academyData.settings?.favicon || "/favicon.svg"}?v=${Date.now()}`}
          key="favicon"
        />
      </Helmet>
      
      <div className="academy-typography academy-layout-container academy-single-course-container" style={academyStyles}>
        <AcademyLayoutNavbar
          profile={academyData.profile}
          academySettings={academyData.settings}
          studentOpinions={[]}
          faqs={[]}
          academyId={academyId}
        />
        
        <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="container mx-auto px-4 py-8 lg:px-8">
                      <CourseCard
            active={active}
            setActive={setActive}
            showBuyCourses={showBuyCourses}
            courseData={courseData}
            setshowBuyCourses={setshowBuyCourses}
            isLoading={isLoadingCourse}
            academySettings={academyData.settings}
          />

          <div className="mt-8">
            <CourseInfo
              courseData={courseData}
              active={active}
              expanded={expanded}
              handleChange={handleChange}
              academySettings={academyData.settings}
            />
          </div>
          </div>
        </div>
        
        <Footer academySettings={academyData.settings} academyProfile={academyData.profile} />
      </div>
    </>
  );
};

const Footer = ({ academySettings, academyProfile }) => {
  const navigate = useNavigate();

  // بناء قائمة وسائل التواصل الاجتماعي للأكاديمية فقط
  const socialLinks = [];
  
  // Facebook
  if (academyProfile.facebook && academyProfile.facebook !== "http://google.com.sa/") {
    socialLinks.push({
      icon: <FaFacebookF />,
      url: academyProfile.facebook,
      platform: "Facebook"
    });
  }
  
  // Instagram  
  if (academyProfile.instagram && academyProfile.instagram !== "http://google.com.sa/") {
    socialLinks.push({
      icon: <FaInstagram />,
      url: academyProfile.instagram,
      platform: "Instagram"
    });
  }
  
  // Twitter
  if (academyProfile.twitter && academyProfile.twitter !== "http://google.com.sa/") {
    socialLinks.push({
      icon: <FaTwitter />,
      url: academyProfile.twitter,
      platform: "Twitter"
    });
  }
  
  // YouTube
  if (academyProfile.youtube) {
    socialLinks.push({
      icon: <FaYoutube />,
      url: academyProfile.youtube,
      platform: "YouTube"
    });
  }
  
  // LinkedIn
  if (academyProfile.linkedin) {
    socialLinks.push({
      icon: <FaLinkedinIn />,
      url: academyProfile.linkedin,
      platform: "LinkedIn"
    });
  }
  
  // Snapchat
  if (academyProfile.snapchat && academyProfile.snapchat !== "s") {
    socialLinks.push({
      icon: <FaSnapchatGhost />,
      url: `https://snapchat.com/add/${academyProfile.snapchat}`,
      platform: "Snapchat"
    });
  }

  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  // استخدام support_phone كأولوية، ثم phone كبديل
  const phoneNumber = academyProfile.support_phone || academyProfile.phone;

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 pt-14 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-6">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-12 gap-8">
          
          {/* Contact Info - Right Side */}
          <div className="flex flex-col items-center lg:items-start order-2 lg:order-1">
            <h3 className style={{fontSize: '1.2rem', color: academySettings.primary_color }}>
              تواصل معنا
            </h3>
            
            {/* Phone Number */}
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
                      className="text-lg font-semibold hover:opacity-80 transition-opacity"
                      style={{ color: academySettings.primary_color }}
                    >
                      {phoneNumber}
                    </a>
                  ) : (
                    <span className="text-gray-500">
                      لا يوجد
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Social Media Icons - Only if there are any */}
            {socialLinks.length > 0 && (
              <>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">
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

          {/* Brand & Logo - Left Side */}
          <div className="flex flex-col items-center lg:items-start order-1 lg:order-2">
            <img 
              src={academySettings.logo}
              className="h-14 mb-4" 
              alt={academySettings.name}
            />
            <h3 className="text-xl font-bold mb-2 text-center lg:text-right" style={{ color: academySettings.primary_color }}>
              {academySettings.name}
            </h3>
            
            {/* Academy Description */}
            {academySettings.about && (
              <p className="text-sm text-center lg:text-right mb-4 max-w-xs text-gray-500 leading-relaxed">
                {academySettings.about}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section - Copyright & Legal */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
          <div className="text-center lg:text-right text-sm text-gray-500" style={{ direction: "rtl" }}>
            <p>
              جميع الحقوق محفوظة © {new Date().getFullYear()} سيان. تم التطوير بواسطة{' '}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:opacity-90"
                style={{ color: academySettings.primary_color }}
              >
                منصة سيان
              </a>
            </p>
          </div>

            {/* Legal Links */}
            <div className="flex gap-6 order-1 lg:order-2">
              <button 
                onClick={() => window.open("/updates", "_blank")}
                className="hover:opacity-90 text-sm font-medium transition-colors border-l border-gray-300 pl-6"
                style={{ color: academySettings.primary_color }}
              >
                تحديثات المنصة
              </button>
              <button 
                onClick={() => window.open("/privacy-policy", "_blank")}
                className="hover:opacity-90 text-sm font-medium transition-colors border-l border-gray-300 pl-6"
                style={{ color: academySettings.primary_color }}
              >
                سياسة الخصوصية
              </button>
              <button 
                onClick={() => window.open("/privacy-policy", "_blank")}
                className="hover:opacity-90 text-sm font-medium transition-colors"
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

export default AcademySingleCourse;
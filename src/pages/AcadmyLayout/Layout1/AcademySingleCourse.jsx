import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "../../../utils/apis/client";
import { getAcademyProfile, getAcademySettings } from "../../../utils/apis/client/academy";
import toast from "react-hot-toast";
import { CourseCard } from "../../MainPages/SingleCourse/CourseCard";
import { CourseInfo } from "../../MainPages/SingleCourse/CourseInfo";
import AcademyLayoutNavbar from "../../../component/AcadmyLayouts/AcademyLayoutNavbar/AcademyLayoutNavbar";
import { FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
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

  return (
    <>
      <Helmet>
        <title>{academyData.settings?.name || "الدورة التدريبية"}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${academyData.settings?.favicon}?v=${Date.now()}`}
          key="favicon"
        />
      </Helmet>
      
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
          />

          <div className="mt-8">
            <CourseInfo
              courseData={courseData}
              active={active}
              expanded={expanded}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <Footer academySettings={academyData.settings} academyId={academyId} />
    </>
  );
};

const Footer = ({ academySettings, academyId }) => {
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
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-12">
          <div className="flex flex-col items-center md:items-start order-2 md:order-1 mt-8 md:mt-0">
            <h3 className="text-gray-800 font-bold mb-6 text-lg">تابعنا على وسائل التواصل</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((link, index) => (
                <button 
                  key={index}
                  onClick={() => handleRedirect(link.url)}
                  style={{ backgroundColor: academySettings?.primary_color }}
                  className="w-10 h-10 rounded-[8px] text-white flex items-center justify-center transition-all duration-300 hover:opacity-90"
                >
                  {link.icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start order-1 md:order-2">
            <img 
              src={academySettings?.logo}
              className="h-14 mb-4 cursor-pointer" 
              alt={academySettings?.name}
              onClick={() => navigate(`/academy/${academyId}`)}
            />
            <p className="text-gray-600 text-sm" style={{ direction: "rtl" }}>
              تم التطوير بواسطة{' '}
              <a 
                href="https://sayan.pro" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: academySettings?.primary_color }}
                className="hover:opacity-90"
              >
                منصة سيان
              </a>
            </p>
          </div>
        </div>

        <div className="text-center border-t border-gray-200 pt-8">
          <p className="text-gray-500 text-sm">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
            <button 
              onClick={() => navigate("/privacy-policy")}
              style={{ color: academySettings?.primary_color }}
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

export default AcademySingleCourse;
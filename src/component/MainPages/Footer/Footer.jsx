import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Logo from "../../../assets/images/logoFooter.png";
import SayanLogo from "../../../assets/images/SayanLogo.png";

// Social Icons (using modern icons)
import { FaLinkedinIn, FaInstagram, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  const { data: footerData = { footer: { title: "", content: "", image: "" } }, isLoading = false } = useQuery({
    queryKey: ["Footer"],
    queryFn: () => Promise.resolve({ footer: { title: "", content: "", image: "" } }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });

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
              <button 
                onClick={() => handleRedirect("https://www.linkedin.com/in/sayan-edtech/")}
                className="w-10 h-10 rounded-[8px] bg-blue-600 text-white flex items-center justify-center transition-all duration-300 hover:bg-blue-700"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </button>
              <button 
                onClick={() => handleRedirect("https://www.instagram.com/sayan_edtech")}
                className="w-10 h-10 rounded-[8px] bg-blue-600 text-white flex items-center justify-center transition-all duration-300 hover:bg-blue-700"
                aria-label="Instagram"
              >
                <FaInstagram />
              </button>
              <button 
                onClick={() => handleRedirect("https://x.com/sayan_edtech")}
                className="w-10 h-10 rounded-[8px] bg-blue-600 text-white flex items-center justify-center transition-all duration-300 hover:bg-blue-700"
                aria-label="Twitter"
              >
                <FaTwitter />
              </button>
              <button 
                onClick={() => handleRedirect("https://www.tiktok.com/@sayan_edtech")}
                className="w-10 h-10 rounded-[8px] bg-blue-600 text-white flex items-center justify-center transition-all duration-300 hover:bg-blue-700"
                aria-label="TikTok"
              >
                <FaTiktok />
              </button>
              <button 
                onClick={() => handleRedirect(footerData?.footer?.youtube || "#")}
                className="w-10 h-10 rounded-[8px] bg-blue-600 text-white flex items-center justify-center transition-all duration-300 hover:bg-blue-700"
                aria-label="YouTube"
              >
                <FaYoutube />
              </button>
            </div>
            
            {/* إضافة قسم للتواصل معنا */}
            <div className="mt-6">
              <h4 className="text-gray-800 font-medium mb-3 text-base">للتواصل معنا</h4>
              <div className="space-y-2">
                <a 
                  href="mailto:support@sayan.pro" 
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                  style={{ direction: "rtl" }}
                >
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  support@sayan.pro
                </a>
                <a 
                  href="tel:0590406718" 
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                  style={{ direction: "rtl" }}
                >
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  0590406718
                </a>
              </div>
            </div>
          </div>

          {/* Brand & About - Left Side */}
          <div className="flex flex-col items-start order-1 md:order-2">
            <img 
              src={SayanLogo} 
              className="h-16 mb-6" 
              alt="سيان" 
            />
            <p className="text-gray-600 md:text-right max-w-xs leading-relaxed text-sm" style={{ direction: "rtl" }}>
              منصة سيان التعليمية توفر تجربة تعلم فريدة تجمع بين أحدث التقنيات وأفضل الممارسات التعليمية لتقديم محتوى عالي الجودة.
            </p>
          </div>
        </div>

        {/* Bottom Section - Copyright & Legal */}
        <div className="text-center border-t border-gray-200 pt-8">
          <p className="text-gray-500 text-sm">
            جميع الحقوق محفوظة لمنصة سيان © {new Date().getFullYear()}
          </p>
          <div className="mt-3">
            <button 
              onClick={() => navigate("/privacy-policy")}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mx-2 transition-colors"
            >
              الشروط والاحكام
            </button>
            <button 
              onClick={() => window.open("/updates", "_blank")}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mx-2 transition-colors"
            >
              تحديثات المنصة
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
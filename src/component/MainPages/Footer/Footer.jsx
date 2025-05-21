import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getFooter } from "../../../utils/apis/client/academy";
import Logo from "../../../assets/images/logoFooter.png";

// Social Icons (using modern icons)
import { FaLinkedinIn, FaInstagram, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa";

const AcademyFooter = () => {
  const navigate = useNavigate();

  const { data: footerData } = useQuery({
    queryKey: ["Footer"],
    queryFn: () => getFooter(),
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
                onClick={() => handleRedirect(footerData?.youtube || "#")}
                className="w-10 h-10 rounded-[8px] bg-blue-600 text-white flex items-center justify-center transition-all duration-300 hover:bg-blue-700"
                aria-label="YouTube"
              >
                <FaYoutube />
              </button>
            </div>
            
            {/* إضافة قسم للتواصل عبر البريد الإلكتروني */}
            <div className="mt-6">
              <h4 className="text-gray-800 font-medium mb-2 text-base">للتواصل معنا عبر الإيميل</h4>
              <a 
                href="mailto:sayn@.rp" 
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                style={{ direction: "rtl" }}
              >
                sayn@.rp
              </a>
            </div>
          </div>

          {/* Brand & About - Left Side */}
          <div className="flex flex-col items-start order-1 md:order-2">
            <img 
              src={footerData?.image || Logo} 
              className="h-14 mb-6" 
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AcademyFooter;
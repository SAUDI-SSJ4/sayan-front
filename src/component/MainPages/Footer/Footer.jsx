import classes from "./Footer.module.scss";
import Logo from "../../../assets/images/logoFooter.png";
import Facebook from "../../../assets/images/Social/Facebook.svg";
import Instagram from "../../../assets/images/Social/Instagram.svg";
import LinkedIn from "../../../assets/images/Social/LinkedIn.svg";
import Twitter from "../../../assets/images/Social/Twitter.svg";
import YouTube from "../../../assets/images/Social/YouTube.svg";
import TikTok from "../../../assets/images/Social/TikTok.svg";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFooter } from "../../../utils/apis/client/academy";
import { formatLongText } from "../../../utils/helpers";
import ssl from "./ssl.svg"

const AcademyFooter = () => {
  const navigate = useNavigate();

  const {
    data: footerData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Footer"],
    queryFn: () => getFooter(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });

  //   {
  //     "id": 2,
  //     "template_id": null,
  //     "academy_id": 27,
  //     "title": "slenses9@gmail.com",
  //     "content": "0590406718",
  //     "image": "http://localhost:8000/images/Wp83kpEume4ic6WwM1eS.png",
  //     "facebook": "slenses9@gmail.com",
  //     "twitter": "slenses9@gmail.com",
  //     "instagram": "0333333333333",
  //     "linkedin": "slenses9@gmail.com",
  //     "youtube": "slenses9@gmail.com",
  //     "snapchat": "slenses9@gmail.com",
  //     "email": "slenses9@gmail.com",
  //     "phone": "slenses9@gmail.com",
  //     "address": "slenses9@gmail.com",
  //     "created_at": "2024-10-15T13:21:48.000000Z",
  //     "updated_at": "2024-10-07T21:43:30.000000Z",
  //     "academy": {
  //         "id": 27,
  //         "name": "Mr. Jaydn Bayer",
  //         "user_name": "Mr. Jaydn Bayer",
  //         "email": "slenses9@gmail.com",
  //         "phone": "Mr. Jaydn Bayer",
  //         "support_phone": "0590406718",
  //         "image": "https://sayan.website/images/2jxeBPnrHYlXSw5JKTal.webp",
  //         "cover": "/tmp/phpopZtsm",
  //         "about": "Mr. Jaydn Bayer",
  //         "address": "Mr. Jaydn Bayer",
  //         "facebook": "Mr. Jaydn Bayer",
  //         "twitter": "Mr. Jaydn Bayer",
  //         "instagram": "Mr. Jaydn Bayer",
  //         "snapchat": "http://greenfelder.org/est-sed-aspernatur-aut-id-nostrum-voluptates-eveniet-omnis",
  //         "liecence": "http://www.nikolaus.com/et-possimus-necessitatibus-et-dignissimos",
  //         "status": true,
  //         "trial": true,
  //         "verified": false,
  //         "trial_start": "2008-04-27",
  //         "trial_end": "2016-03-28",
  //         "wallet": 0,
  //         "template_id": 6,
  //         "users": 0,
  //         "courses": 0,
  //         "created_at": "2024-09-29T18:36:37.000000Z",
  //         "updated_at": "2024-10-15T12:39:43.000000Z",
  //         "package_id": null
  //     }
  // }
  const handleRedirect = (url) => {
    window.open(url, "_blank"); // Opens in a new tab
  };

  return (
    <footer className="bg-gray-100 py-8 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

        {/* Mobile Apps */}
        <div className="flex gap-2 items-center mt-6 md:mt-0">

          <a href="#">
            <div className="flex items-center bg-black px-4 py-2 gap-2 rounded-md text-white text-center">
              <div>
                <img src="https://labayh.net/wp-content/uploads/2022/06/google-app.svg" alt="App Store" className="h-8" />
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
                <img src="https://labayh.net/wp-content/uploads/2022/06/apple-app.svg" alt="App Store" className="h-8" />
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
            <img src={LinkedIn} className="h-8 cursor-pointer" onClick={() => handleRedirect("https://www.linkedin.com/in/sayan-edtech/")} alt="LinkedIn" />
            <img src={Instagram} className="h-8 cursor-pointer" onClick={() => handleRedirect("https://www.instagram.com/sayan_edtech")} alt="Instagram" />
            <img src={Twitter} className="h-8 cursor-pointer" onClick={() => handleRedirect("https://x.com/sayan_edtech")} alt="Twitter" />
            <img src={TikTok} className="h-8 cursor-pointer" onClick={() => handleRedirect("https://www.tiktok.com/@sayan_edtech")} alt="Facebook" />
          </div>
        </div>
      </div>

      {/* Copyright & Legal */}
      <div className="text-center mt-6 text-gray-500 text-sm">
        <p>
          جميع الحقوق محفوظة لمنصة سيان © 2023 |
          <span className="cursor-pointer text-blue-500" onClick={() => navigate("/privacy-policy")}>
            الشروط والأحكام | سياسة الخصوصية
          </span>
        </p>
      </div>
    </footer>
  );
};

export default AcademyFooter;

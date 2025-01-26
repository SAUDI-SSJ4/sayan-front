import classes from "./Footer.module.scss";
import Logo from "../../../assets/images/logoFooter.png";
import Facebook from "../../../assets/images/Social/Facebook.svg";
import Instagram from "../../../assets/images/Social/Instagram.svg";
import LinkedIn from "../../../assets/images/Social/LinkedIn.svg";
import Twitter from "../../../assets/images/Social/Twitter.svg";
import YouTube from "../../../assets/images/Social/YouTube.svg";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFooter } from "../../../utils/apis/client/academy";
import { formatLongText } from "../../../utils/helpers";

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
    <div>
      <div className={classes.FooterContainer}>
        <div className={classes.Socials}>
          <img src={footerData?.image ? footerData.image : Logo} />
          <div className="d-flex" style={{ gap: "16px", marginTop: "35px" }}>
            <img src={YouTube} onClick={() => handleRedirect(footerData?.youtube)} />
            <img src={LinkedIn} onClick={() => handleRedirect(footerData?.linkedin)} />
            <img src={Instagram} onClick={() => handleRedirect(footerData?.instagram)} />
            <img src={Twitter} onClick={() => handleRedirect(footerData?.twitter)} />
            <img src={Facebook} onClick={() => handleRedirect(footerData?.facebook)} />
          </div>
        </div>

        <div>
          <h2 className="fs-4 fw-bold title-text--1"> الاكادمية</h2>
          <p style={{ maxWidth: "300px" }} className="fs-6 fw-medium text-content--1">
            {footerData ? footerData?.academy?.name : "أطلق أكاديميتك"}
          </p>
          <p style={{ maxWidth: "300px" }} className="fs-6 fw-medium text-content--1">
            {footerData ? footerData?.title : "إنضم كطالب"}
          </p>
          <p style={{ maxWidth: "300px" }} className="fs-6 fw-medium text-content--1">
            {footerData ? formatLongText(footerData?.content, 70) : "مركز المساعدة"}
          </p>
        </div>

        <div>
          <h2 className="fs-4 fw-bold title-text--1">تواصل معنا</h2>

          <p style={{ maxWidth: "300px" }} className="fs-6 fw-medium text-content--1">
            {footerData ? <Link to={`tel:${footerData?.phone}`}>{footerData?.phone}</Link> : "تعرف علينا"}
          </p>

          <p style={{ maxWidth: "300px" }} className="fs-6 fw-medium text-content--1">
            {footerData ? <Link to={`mailto:${footerData?.email}`}>{footerData?.email}</Link> : "اتصل بنا"}
          </p>

       
        </div>

        <div>
          <h2 className="fs-4 fw-bold title-text--1">سيان</h2>
          <p style={{ maxWidth: "300px" }} className="fs-6 fw-medium text-content--1">
            المزايا
          </p>
          <p style={{ maxWidth: "300px" }} className="fs-6 fw-medium text-content--1">
            باقات الاشتراك
          </p>
          <p style={{ maxWidth: "300px" }} className="fs-6 fw-medium text-content--1">
             تقييم العملاء
          </p>
        </div>
      </div>

      <div onClick={() => navigate("/privacy-policy")} className={`${classes.CopyRight} copy-text--1`}>
        جميع الحقوق محفوظة لمنصة سيان © 2023 | الشروط والأحكام | سياسة الخصوصية
      </div>
    </div>
  );
};

export default AcademyFooter;

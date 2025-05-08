import classes from "./Footer.module.scss";
import Logo from "../../../assets/images/logoFooter.png";
import Facebook from "../../../assets/images/Social/Facebook.svg";
import Instagram from "../../../assets/images/Social/Instagram.svg";
import LinkedIn from "../../../assets/images/Social/LinkedIn.svg";
import Twitter from "../../../assets/images/Social/Twitter.svg";
import YouTube from "../../../assets/images/Social/YouTube.svg";
import { Link } from "react-router-dom";

const Footer = ({ footerData }) => {
  return (
    <div className={classes.FooterContainer}>
      <div className={classes.Socials}>
        <div className={classes.logo}>
          <img src={footerData?.footer?.image} alt="logo" />
        </div>
        <div className="d-flex" style={{ gap: "16px", marginTop: "35px" }}>
          <a target="_blank" rel="noopener noreferrer">
            <img src={YouTube} />
          </a>

          <a
            href={footerData?.footer?.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LinkedIn} />
          </a>
          <a
            href={footerData?.footer?.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Instagram} />
          </a>
          <a
            href={footerData?.footer?.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Twitter} />
          </a>
          <a
            href={footerData?.footer?.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Facebook} />
          </a>
        </div>
        <div
          style={{
            fontSize: "38px",
            color: "white",
            fontWeight: "800",
            marginTop: "35px",
          }}
          className="fs-6 fw-bold  title-text--1"
        >
          بيانات التواصل
          <h6 className="mt-1">العنوان : {footerData?.footer?.address}</h6>
          <h6 className="mt-1">
            البريد الالكتروني :
            <a href={`mailto:${footerData?.footer?.email}`}>
              {footerData?.footer?.email}
            </a>
          </h6>
          <h6 className="mt-1">
            الهاتف :
            <a href={`tel:${footerData?.footer?.phone}`}>
              {footerData?.footer?.phone}
            </a>
          </h6>
        </div>
      </div>
      <div>
        <h2 className="fs-4 fw-bold title-text--1">
          {footerData?.footer?.title}
        </h2>
        <p
          style={{ maxWidth: "600px" }}
          className="fs-6 fw-medium text-content--1"
        >
          {footerData?.footer?.content}
        </p>
      </div>
      <span className="mx-auto">
        جميع الحقوق محفوظة لمنصة سيان © 2023 | الشروط والأحكام | سياسة الخصوصية
      </span>
    </div>
  );
};

export default Footer;

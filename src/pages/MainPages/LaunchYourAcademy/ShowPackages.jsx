import { SwiperSlide } from "swiper/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Style from "./LaunchYourAcademy.module.scss";
import { useNavigate } from "react-router-dom";

export const ShowPackages = ({ packages }) => {
  const navigate = useNavigate();

  const formatAvailableIcon = (available) => {
    return available ? (
      <CheckCircleIcon sx={{ color: "#0062FF" }} />
    ) : (
      <RadioButtonUncheckedIcon sx={{ color: "#EAEFF4" }}/>
    );
  };

  return (
    <>
      {packages.map((item, index) => (
        <SwiperSlide key={index}>
          <div style={{ maxWidth: "384px", borderRadius: "24px" }} className="NormalCard">
            <div className="d-flex align-items-center">
              <h2>{item.price} ر.س.</h2>
              <p className="m-0">/ شهر</p>
            </div>
            <h3>{item.title}</h3>
            <p style={{ paddingBottom: "20px", borderBottom: "1px solid #EAEFF4" }}>
              {/* {item.description} */}
              لوريم إيبسوم لوريم إيبسوم لوريم إيبسوم لوريم إيبسوم لوريم إيبسوم
            </p>
            <div>
              <div className="d-flex gap-2 align-items-center mt-3">
                {formatAvailableIcon(item.courses)}
                <span className={Style.Line}>عدد الدورات : {item.courses}</span>
              </div>
              <div className="d-flex gap-2 align-items-center mt-3">
                {formatAvailableIcon()}
                <span className={Style.Line}> عدد المستخدمين : {item.users}</span>
              </div>

              <div className="d-flex gap-2 align-items-center mt-3">
                {formatAvailableIcon(item.duration)}
                <span className={Style.Line}> المدة : {item.duration}</span>
              </div>
            </div>
            <div onClick={() => navigate("/Register")} className={Style.SubBtn}>
              اشتراك
            </div>
          </div>
        </SwiperSlide>
      ))}
    </>
  );
};

import React from "react";
import sarSymbolPath from "../../assets/icons/currency/sar-symbol.svg";
import "./SARIcon.css";

// أيقونة الريال السعودي المشتركة
const SARIcon = ({ className = "", style = {} }) => (
  <img 
    src={sarSymbolPath} 
    alt="SAR" 
    className={`sar-icon ${className}`}
    style={style}
  />
);

export default SARIcon; 
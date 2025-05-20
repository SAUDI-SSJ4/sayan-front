import React, { useRef, useEffect } from "react";
import styles from "../../styles/auth.module.scss";

const OtpInput = ({ value, onChange, onBackspace, index }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the first input when the component mounts
    if (index === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [index]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length <= 1) {
      onChange(val, index);
      if (val && inputRef.current.nextElementSibling) {
        inputRef.current.nextElementSibling.focus();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      if (!value && inputRef.current.previousElementSibling) {
        inputRef.current.previousElementSibling.focus();
        onBackspace(index - 1);
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      maxLength={1}
      autoComplete="off"
      name={`otp-${index}`} // Use a unique name for each input
      aria-label={`OTP digit ${index + 1}`} // Accessible label
      className={styles.otpInput}
      style={{
        width: "50px",
        height: "50px",
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "600",
        border: "2px solid #E1E2E6",
        borderRadius: "12px",
        backgroundColor: "#fff",
        color: "#2B3674",
        transition: "all 0.3s ease",
        outline: "none",
        "&:focus": {
          borderColor: "#0062FF",
          boxShadow: "0 0 0 2px rgba(0, 98, 255, 0.2)",
        },
      }}
    />
  );
};

export default OtpInput;

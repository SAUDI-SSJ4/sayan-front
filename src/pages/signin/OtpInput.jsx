import React, { useRef, useEffect } from "react";

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
    onChange(val, index);

    // Automatically focus the next input if a value is entered
    if (val && inputRef.current.nextElementSibling) {
      inputRef.current.nextElementSibling.focus();
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

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength={1}
      autoComplete="off"
      name={`otp-${index}`} // Use a unique name for each input
      aria-label={`OTP digit ${index + 1}`} // Accessible label
      className="otp-input mx-2 d-flex justify-content-center text-center form-control"
      style={{ imeMode: "disabled" }} // Prevents some browsers from suggesting text input
    />
  );
};

export default OtpInput;

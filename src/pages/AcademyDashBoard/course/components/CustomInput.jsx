import React from "react";

function CustomInput({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
}) {
  return (
    <div className="CustomFormControl">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touched && error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default CustomInput;

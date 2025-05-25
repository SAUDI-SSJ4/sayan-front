import React from "react";

function CustomTextarea({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  rows = 5,
}) {
  return (
    <div className="CustomFormControl">
      <label htmlFor={id}>{label}</label>
      <textarea
        rows={rows}
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

export default CustomTextarea;

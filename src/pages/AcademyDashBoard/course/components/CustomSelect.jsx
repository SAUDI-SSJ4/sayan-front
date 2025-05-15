import React from "react";
import Select from "react-select";

function CustomSelect({
  label,
  options,
  styles,
  onChange,
  value,
  placeholder,
  error,
  touched,
  getOptionLabel,
  getOptionValue,
}) {
  return (
    <div className="CustomFormControl">
      <label>{label}</label>
      <Select
        options={options}
        styles={styles}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
      />
      {touched && error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default CustomSelect;

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
  icon
}) {
  return (
    <div className="form-group mb-1">
      <label className="form-label fw-medium mb-2 d-block">{label}</label>
      <div className={`position-relative ${touched && error ? 'has-error' : ''}`}>
        {icon && (
          <div 
            className="position-absolute" 
            style={{ 
              top: '50%', 
              left: '12px', 
              transform: 'translateY(-50%)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          >
            {icon}
          </div>
        )}
        <Select
          options={options}
          styles={{
            ...styles,
            control: (baseStyles, state) => ({
              ...styles.control(baseStyles, state),
              paddingLeft: icon ? '30px' : baseStyles.paddingLeft,
              borderColor: touched && error ? '#dc3545' : baseStyles.borderColor,
              '&:hover': {
                borderColor: touched && error ? '#dc3545' : (styles.control(baseStyles, state)['&:hover']?.borderColor || '#cbd5e1')
              }
            }),
          }}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          className={touched && error ? 'is-invalid' : ''}
        />
      </div>
      {touched && error && (
        <div className="invalid-feedback d-block mt-1" style={{ fontSize: '12px' }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;

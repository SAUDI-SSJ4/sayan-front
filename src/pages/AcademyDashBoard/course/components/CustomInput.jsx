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
  icon
}) {
  return (
    <div className="form-group mb-1">
      <label htmlFor={id} className="form-label fw-medium mb-2 d-block">{label}</label>
      <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
        {icon && (
          <span className="input-group-text bg-light border-end-0">
            {icon}
          </span>
        )}
        <input
          type="text"
          className={`form-control ${icon ? 'border-start-0' : ''} ${touched && error ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{
            borderRadius: icon ? '0 8px 8px 0' : '8px',
            fontSize: '14px',
            padding: '10px 12px',
            transition: 'all 0.2s ease'
          }}
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

export default CustomInput;

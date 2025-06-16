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
  icon
}) {
  return (
    <div className="form-group mb-1">
      <label htmlFor={id} className="form-label fw-medium mb-2 d-block">{label}</label>
      <div className={`position-relative ${touched && error ? 'has-error' : ''}`}>
        {icon && (
          <div className="position-absolute top-0 start-0 ps-3 pt-2">
            {icon}
          </div>
        )}
        <textarea
          rows={rows}
          className={`form-control ${touched && error ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{
            borderRadius: '8px',
            fontSize: '14px',
            padding: icon ? '10px 12px 10px 35px' : '10px 12px',
            resize: 'vertical',
            minHeight: '120px',
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

export default CustomTextarea;

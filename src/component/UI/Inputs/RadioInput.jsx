export const RadioInput  = ({ id, value, name, label, isChecked, onChange, className }) => {
    return (
        <div className="form-check d-flex align-items-center mt-2">
        <input
          className="form-check-input"
          type="radio"
          value={value}
          id={id}
          name={name}
          onChange={onChange}
          checked={isChecked}
        />
        <label htmlFor={id} className={className}>
          {label}
        </label>
      </div>
    )
}
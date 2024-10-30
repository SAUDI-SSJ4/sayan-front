import Select from "react-select";
import chroma from 'chroma-js';

const MultiSelectBox = ({label}) => {
  const colourOptions = [
    { value: "ocean", label: "تصنيف", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "تصنيف", color: "#0052CC", isDisabled: true },
    { value: "purple", label: "تصنيف", color: "#5243AA" },
    { value: "red", label: "تصنيف", color: "#FF5630", isFixed: true },
    { value: "orange", label: "تصنيف", color: "#FF8B00" },
    { value: "yellow", label: "تصنيف", color: "#FFC400" },
    { value: "green", label: "تصنيف", color: "#36B37E" },
    { value: "forest", label: "تصنيف", color: "#00875A" },
    { value: "slate", label: "تصنيف", color: "#253858" },
    { value: "silver", label: "تصنيف", color: "#666666" },
  ];
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      width: "100%",
      borderRadius: "10px",
      border: `1px solid #EDEFF2 `,
      background: "var(--semantic-colors-primary-contrast, #FFF)",
      padding: "5px",
      boxShadow: "none",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };
  return (
    <div className="CustomFormControl">
      <label htmlFor="role">{label}</label>
      <Select
        closeMenuOnSelect={false}
        defaultValue={[colourOptions[0], colourOptions[1]]}
        isMulti
        options={colourOptions}
        styles={colourStyles}
      />
    </div>
  );
};

export default MultiSelectBox;

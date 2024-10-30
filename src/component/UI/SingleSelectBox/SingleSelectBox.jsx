const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  import Select from "react-select";
const SingleSelectBox = ({label}) => {
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          width: "100%",
          borderRadius: "10px",
          border: `1px solid ${state.isFocused ? "#0062ff" : "#EDEFF2"}`,
          background: "var(--semantic-colors-primary-contrast, #FFF)",
          padding: "5px",
          boxShadow: "none",
          "&:focus": {
            outline: "none",
            border: "1px solid #0062ff",
          },
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          border: "none",
        }),
        indicatorSeparator: () => ({
          border: "none",
        }),
      };
    return (     <div className="CustomFormControl">
    <label htmlFor="role">{label}</label>
    <Select
      options={options}
     
      styles={customStyles}
      id="role"
      name="role"
   
     
    />
 
  </div> );
}
 
export default SingleSelectBox;
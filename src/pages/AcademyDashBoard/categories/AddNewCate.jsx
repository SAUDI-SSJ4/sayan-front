import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import defualt from "../../../assets/images/img.png";
import chroma from "chroma-js";
import Select from "react-select";
import { useRef, useState } from "react";
import TextEditor from "../../../component/UI/TextEditor";
import { Link } from "react-router-dom";
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
  { value: "silver", label: "تصنيف", color: "#666666" }
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
    boxShadow: "none"
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
          : undefined
      }
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css()
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white"
    }
  })
};
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
      border: "1px solid #0062ff"
    }
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    border: "none"
  }),
  indicatorSeparator: () => ({
    border: "none"
  })
};

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" }
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
  country: Yup.string().required("Country code is required"),
  role: Yup.string().required("Role is required"),
  file: Yup.mixed().required("File is required")
});

const AddNewCate = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    // Handle file change logic here, if needed
    console.log("Selected file:", e.target.files[0]);
    formik.setFieldValue("file", e.target.files[0]);
  };
  const [file, setFile] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      country: "+99", // Default country code
      role: "option1", // Default role
      file: null
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    }
  });

  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("file", acceptedFiles[0]);
  };

  return (
    <div className="mb-5 all-info-top-header main-info-top">
      <div className="TablePageHeader ">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name ">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}> انشاء تصنيف جديد </div>
            </div>
            <Link to="/academy/Categories" className="updateBtn">
              الرجوع <KeyboardBackspaceIcon />
            </Link>
          </div>
        </div>
      </div>
      <div className="CustomCard formCard all-add-notific pb-4 pt-4">
        <form onSubmit={formik.handleSubmit} className="row">
          <div className=" justify-content-center">
            <div className="row g-3 button-content--1 m-auto justify-content-center">
              <img
                src={
                  formik.values.file
                    ? URL.createObjectURL(formik.values.file)
                    : defualt
                }
                alt="Selected File"
                style={{
                  maxWidth: "366px",
                  maxHeight: "212px",
                  objectFit: "contain",
                  marginTop: "10px"
                }}
              />

              <div className="d-flex justify-content-center">
                <input
                  type="file"
                  name="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div
                  style={{
                    background: "white",
                    marginTop: "25px",
                    marginBottom: "30px"
                  }}
                  className="updateBtn"
                  onClick={handleButtonClick}
                >
                  رفع صورة الايقونة
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name">العنوان </label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name">المصنِّف </label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name">المحتوى </label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name">رابط التصنيف </label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="submitBtn">
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCate;

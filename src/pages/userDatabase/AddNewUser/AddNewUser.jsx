import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import defualt from "../../../assets/images/img.png";

import Select from "react-select";
import { useRef, useState } from "react";
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
const customStyles2 = {
  control: (provided, state) => ({
    ...provided,

    borderRadius: "10px",
    border: "none", // Remove the border
    direction: "ltr",
    padding: "10px",
    boxShadow: "none",
    "&:focus": {}
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none"
  }),
  indicatorSeparator: () => ({
    display: "none"
  })
};
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" }
];
const options2 = [
  { value: "+99", label: "+99" },
  { value: "+20", label: "+20" }
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

const AddNewUser = () => {
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
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name ">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}>اضافة موظف جديد</div>
          </div>
          <div className="updateBtn">
            الرجوع <KeyboardBackspaceIcon />
          </div>
        </div>
      </div>
      <div className="CustomCard formCard all-add-notific pb-4 pt-4">
        <form onSubmit={formik.handleSubmit} className="row">
          <div className=" justify-content-center">
            <div className=" row m-auto justify-content-center">
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

              <div className="d-flex button-content--1 justify-content-center">
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
                  رفع الصورة الشخصية
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name">اسم المستخدم</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="email">البريد الالكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div>{formik.errors.email}</div>
              )}
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="password">كلمة المرور</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div>{formik.errors.password}</div>
              )}
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div>
              <label htmlFor="phone">رقم الهاتف</label>
              <div className="phoneContainer">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                <Select
                  id="country"
                  name="country"
                  styles={customStyles2}
                  options={options2}
                  onChange={(selectedOption) =>
                    formik.setFieldValue("country", selectedOption.value)
                  }
                  onBlur={() => formik.setFieldTouched("country", true)}
                  placeholder={formik.values.country}
                  value={options.find(
                    (option) => option.value === formik.values.country
                  )}
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <div>{formik.errors.phone}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="role">الدور</label>
              <Select
                options={options}
                placeholder={formik.values.role}
                styles={customStyles}
                id="role"
                name="role"
                onChange={(selectedOption) =>
                  formik.setFieldValue("role", selectedOption.value)
                }
                onBlur={() => formik.setFieldTouched("role", true)}
                value={options.find(
                  (option) => option.value === formik.values.role
                )}
              />
              {formik.touched.role && formik.errors.role && (
                <div>{formik.errors.role}</div>
              )}
            </div>
          </div>

          <div className="d-flex button-content--1 justify-content-center mt-4">
            <button type="submit" className="submitBtn">
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;

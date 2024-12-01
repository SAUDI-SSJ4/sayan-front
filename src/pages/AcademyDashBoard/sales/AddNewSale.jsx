import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";


import Select from "react-select";
import { useRef, useState } from "react";
import { DatePicker } from "rsuite";
import { useNavigate } from "react-router-dom";
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
const customStyles2 = {
  control: (provided, state) => ({
    ...provided,

    borderRadius: "10px",
    border: "none", // Remove the border
    direction: "ltr",
    padding: "10px",
    boxShadow: "none",
    "&:focus": {},
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
const options2 = [
  { value: "+99", label: "+99" },
  { value: "+20", label: "+20" },
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
  file: Yup.mixed().required("File is required"),
});

const AddNewSale = () => {
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
      file: null,
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("file", acceptedFiles[0]);
  };
const router =useNavigate()
  return (
    <div className="mb-5">
      <div className="TablePageHeader ">
        <div className="d-flex align-items-center name ">
          <div className="icon">
            <PeopleAltIcon sx={{ color: "#A3AED0" }} />
          </div>
          <div style={{ color: "#7E8799" }}>انشاء كوبون جديد    </div>
        </div>
        <div className="updateBtn" onClick={()=>router('/NotifcationSend')}>
          الرجوع <KeyboardBackspaceIcon />
        </div>
      </div>
      <div className="CustomCard formCard pb-4 pt-4">
        <form onSubmit={formik.handleSubmit} className="row">
         
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name"> كود الخصم</label>
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
              <label htmlFor="name">  تاريخ بداية تفعيل الكوبون</label>
              <DatePicker  style={{width:'100%'}} format="MM/dd/yyyy" />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
          </div>

      

          
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="role">المستخدم</label>
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
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="role">فيما يخص</label>
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
          <div className="col-lg-12 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name"> العنوان</label>
              <textarea
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
              <label htmlFor="name"> تاريخ البث</label>
              <DatePicker  style={{width:'100%'}} format="MM/dd/yyyy" />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name"> وقت البث</label>
              <DatePicker style={{width:'100%'}} format="MM/dd/yyyy" />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
          </div>
        
        
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="submitBtn">
            بث الاشعار
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewSale;

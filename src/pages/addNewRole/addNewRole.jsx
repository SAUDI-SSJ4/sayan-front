import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";

import * as Yup from "yup";
import recoerder from "../../assets/icons/Reorder.png";

import Select from "react-select";
import { useEffect, useRef, useState } from "react";
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
import { Toggle } from "rsuite";
import axiosInstance from "../../../axios";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" }
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required")
});

const AddNewRole = () => {
  const [file, setFile] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [Selected, SetSelected] = useState([]);
  useEffect(() => {
    axiosInstance.get("admin/permissions").then((res) => {
      setPermissions(res.data);
      console.log(res.data);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      name: ""
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
      axiosInstance.post("admin/role", {
        name: values.name,
        permissions: Selected
      });
    }
  });

  return (
    <div className="all-info-top-header mb-5  main-info-top">
      <div className="TablePageHeader ">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name ">
              <div className="icon">
                <img src={recoerder} />
              </div>
              <div style={{ color: "#7E8799" }}>انشاء دور جديد</div>
            </div>
            <div className="updateBtn">
              الرجوع <KeyboardBackspaceIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="CustomCard formCard all-add-notific pb-4 pt-4">
        <form onSubmit={formik.handleSubmit} className="row">
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name">عنوان الدور </label>
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
              <label htmlFor="role">المستخدمين</label>
              <Select
                options={options}
                placeholder={formik.values.role}
                styles={customStyles}
                id="users"
                name="users"
                onChange={(selectedOption) =>
                  formik.setFieldValue("users", [
                    ...formik.values.users,
                    selectedOption.value
                  ])
                }
                onBlur={() => formik.setFieldTouched("users", true)}
                value={options.find(
                  (option) => option.value === formik.values.users
                )}
              />
              {formik.touched.users && formik.errors.users && (
                <div>{formik.errors.users}</div>
              )}
            </div>
          </div>
          <div>
            <h3 style={{ color: "#170F49", fontSize: "18px" }}>
              اعدادات الصلاحيات
            </h3>
            {permissions?.map((item, index) => {
              return (
                <div className="d-flex gap-3 align-items-center ToggleContainer mt-2">
                  <Toggle
                    onChange={() => {
                      SetSelected((perv) => [...perv, item]);
                    }}
                  />
                  <div>
                    <h3 style={{ color: "#170F49", fontSize: "18px" }}>
                      {item}
                    </h3>
                    <p>الوصف</p>
                  </div>
                </div>
              );
            })}
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

export default AddNewRole;

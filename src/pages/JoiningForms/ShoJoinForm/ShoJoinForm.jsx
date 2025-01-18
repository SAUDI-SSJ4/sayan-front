import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useRef, useState } from "react";
import { FaFacebook, FaSnapchatGhost } from "react-icons/fa";
import defualt from "../../../assets/images/img.png";

const options2 = [
  { value: "+99", label: "+99" },
  { value: "+20", label: "+20" }
];

const customStyles2 = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "10px",
    border: "none",
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required("الاسم مطلوب"),
  email: Yup.string()
    .email("عنوان بريد إلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .min(6, "يجب أن تكون كلمة المرور على الأقل 6 أحرف")
    .required("كلمة المرور مطلوبة"),
  phone: Yup.string().required("رقم الهاتف مطلوب"),
  country: Yup.string().required("كود البلد مطلوب"),
  hasExperience: Yup.string().required("يرجى الإجابة على السؤال حول الخبرة")
});

const ShoJoinForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      country: "+99",
      hasExperience: "" // New field for radio buttons
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    }
  });

  return (
    <div className="all-info-top-header mb-5  main-info-top">
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
        <form onSubmit={formik.handleSubmit} className="row g-3">
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name">الاسم </label>
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

          <div className="col-lg-6 col-md-12" style={{ marginTop: "25px" }}>
            <div>
              <label
                htmlFor="phone"
                style={{
                  fontSize: "16px",
                  color: "#2B3674",
                  marginBottom: "15px"
                }}
              >
                رقم الهاتف
              </label>
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
                  value={options2.find(
                    (option) => option.value === formik.values.country
                  )}
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <div>{formik.errors.phone}</div>
              )}
            </div>
          </div>

          <div className="col-lg-6 col-md-12" style={{ marginTop: "25px" }}>
            <div>
              <label
                style={{
                  fontSize: "16px",
                  color: "#2B3674",
                  marginBottom: "15px"
                }}
              >
                هل لديك خبرة سابقة في مجال التسويق بالعمولة؟
              </label>
              <div className="form-check mb-2">
                <input
                  type="radio"
                  name="hasExperience"
                  value="نعم"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.hasExperience === "نعم"}
                  className="form-check-input"
                />
                <label className="form-check-label">نعم</label>
              </div>
              <div className="form-check form-check-inline mb-2">
                <input
                  type="radio"
                  name="hasExperience"
                  value="لا"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.hasExperience === "لا"}
                  className="form-check-input"
                />
                <label className="form-check-label">لا</label>
              </div>
              {formik.touched.hasExperience && formik.errors.hasExperience && (
                <div className="text-danger">{formik.errors.hasExperience}</div>
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

export default ShoJoinForm;

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";

import * as Yup from "yup";

import { InputNumber, Toggle } from "rsuite";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),

  users: Yup.array()
    .min(1, "At least one user must be selected")
    .required("Users are required"),
  role: Yup.string().required("Role is required")
});
import classes from "./formStyle.module.scss";
import { useRef, useState } from "react";
import MultiSelectBox from "../../UI/MultiSelectBox/MultiSelectBox";
import SingleSelectBox from "../../UI/SingleSelectBox/SingleSelectBox";

const AffiliateMarketingSettingFrom = () => {
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
  const [radio, setRadio] = useState(true);
  const firstRadio = useRef();
  const SecondRadio = useRef();

  return (
    <div className="mb-5">
      <div className="CustomCard formCard all-add-notific pb-4 pt-4">
        <form onSubmit={formik.handleSubmit} className="row">
          <h1
            style={{
              color: "#2B3674",
              fontSize: "34px",
              fontWeight: "700",
              marginBottom: "48px"
            }}
          >
            التسويق بالعمولة
          </h1>
          <div>
            <div className="d-flex gap-3 align-items-center">
              <Toggle defaultChecked />
              <h3 style={{ color: "#170F49", fontSize: "18px" }}>
                برنامج التسويق بالعمولة{" "}
              </h3>
            </div>
          </div>
          <div className="d-flex row" style={{ marginTop: "30px" }}>
            <div className="form-check col-lg-6">
              <div
                className={`${classes.FormRadio} ${radio && classes.active} `}
                onClick={() => {
                  firstRadio.current.checked = true;
                  SecondRadio.current.checked = false;
                  setRadio(true);
                }}
              >
                <input
                  className="form-radio-input"
                  type="radio"
                  value=""
                  checked={radio}
                  ref={firstRadio}
                  name="flexRadioDefault"
                  onChange={() => setRadio(true)}
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  متاح لأعضاء محددين
                </label>
              </div>
            </div>
            <div className="form-check  col-lg-6">
              <div
                className={`${classes.FormRadio} ${!radio && classes.active} `}
                onClick={() => {
                  firstRadio.current.checked = false;
                  SecondRadio.current.checked = true;
                  setRadio(false);
                }}
              >
                <input
                  className="form-radio-input"
                  type="radio"
                  value=""
                  ref={SecondRadio}
                  name="flexRadioDefault"
                  onChange={() => setRadio(false)}
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  متاح للجميع
                </label>
              </div>
            </div>
            <div className="col-lg-6">
              <MultiSelectBox label={"المدعوين"} />
            </div>
          </div>
          <div
            style={{
              color: "#0E85FF",
              fontSize: "18px",
              fontWeight: 700,
              borderTop: "1px solid #EDEFF2",
              marginTop: "25px",
              paddingTop: "25px"
            }}
          >
            العمولة
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name"> ادنى نسبة للمبيعات </label>
              <InputNumber
                prefix="%"
                style={{ direction: "rtl" }}
                defaultValue={10}
                max={100}
                min={10}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <SingleSelectBox
              label={"مدة صلاحية ملفات تعريف الارتباط (Cookies)"}
            />
          </div>

          <div
            style={{
              color: "#0E85FF",
              fontSize: "18px",
              fontWeight: 700,
              borderTop: "1px solid #EDEFF2",
              marginTop: "25px",
              paddingTop: "25px"
            }}
          >
            سحب الارباح
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div
                style={{
                  color: "#2B3674",
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBlock: "20px"
                }}
              >
                وسائل سحب الارباح
              </div>
              <div className="d-flex" style={{ gap: "20px" }}>
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    التحويلات البنكية
                  </label>
                </div>
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    باي بال
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                style={{
                  color: "#2B3674",
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBlock: "20px"
                }}
              >
                الحد الادنى لسحب الارباح
              </div>
              <InputNumber prefix="ر.س" />
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

export default AffiliateMarketingSettingFrom;

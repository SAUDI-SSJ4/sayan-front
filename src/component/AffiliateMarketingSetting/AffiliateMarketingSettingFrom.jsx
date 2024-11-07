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

  return (
    <div className="mb-5">
      <div className="CustomCard formCard pb-4 pt-4">
        <form onSubmit={formik.handleSubmit} className="row">
          <div>
            <div className="d-flex gap-3 align-items-center flex-wrap">
              <Toggle defaultChecked />
              <h3
                className="title-info---1"
                style={{ color: "#170F49", fontSize: "18px" }}
              >
                برنامج التسويق بالعمولة{" "}
              </h3>
            </div>
          </div>
          <div className="d-flex row g-3 mb-3" style={{ marginTop: "30px" }}>
            <div className="form-check col-lg-6">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                يتاح لاعضاء محددين من قبل الاكاديمات
              </label>
            </div>
            <div className="form-check  col-lg-6">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                يتاح للجميع من قبل الاكاديميات
              </label>
            </div>
          </div>
          <div style={{ color: "#0E85FF", fontSize: "18px", fontWeight: 700 }}>
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
            <div className="CustomFormControl">
              <label htmlFor="role">اقصى نسبة للمبيعات</label>
              <InputNumber
                prefix="%"
                style={{ direction: "rtl" }}
                defaultValue={10}
                max={100}
                min={10}
              />
            </div>
          </div>
          <div
            style={{
              color: "#2B3674",
              fontSize: "16px",
              fontWeight: 600,
              marginBlock: "20px"
            }}
          >
            مدة صلاحية ملفات تعريف الارتباط (Cookies)
          </div>
          <div className="d-flex" style={{ gap: "20px" }}>
            <div className="form-check ">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                اسبوع
              </label>
            </div>
            <div className="form-check ">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                شهر
              </label>
            </div>
            <div className="form-check ">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                سنة
              </label>
            </div>
          </div>
          <div
            className="mt-3"
            style={{ color: "#0E85FF", fontSize: "18px", fontWeight: 700 }}
          >
            سحب الارباح
          </div>
          <div className="row flex-wrap g-3">
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

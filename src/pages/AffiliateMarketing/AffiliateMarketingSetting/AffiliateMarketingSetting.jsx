import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";

import * as Yup from "yup";
import recoerder from "../../../assets/icons/Reorder.png";

import { InputNumber, Toggle } from "rsuite";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),

  users: Yup.array()
    .min(1, "At least one user must be selected")
    .required("Users are required"),
  role: Yup.string().required("Role is required")
});
import { Link, useNavigate } from "react-router-dom";
import AffiliateMarketingSettingFrom from "../../../component/AffiliateMarketingSetting/AffiliateMarketingSettingFrom";

const AffiliateMarketingSetting = () => {
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

  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <div className="all-info-top-header main-info-top mb-5">
      <div className="TablePageHeader ">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <img src={recoerder} />
              </div>
              <div style={{ color: "#7E8799" }}>انشاء دور جديد</div>
            </div>
            <button onClick={()=> navigate(-1)} className="updateBtn">
              الرجوع <KeyboardBackspaceIcon />
            </button>
          </div>
        </div>
      </div>
      <AffiliateMarketingSettingFrom />
    </div>
  );
};

export default AffiliateMarketingSetting;

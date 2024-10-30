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
  role: Yup.string().required("Role is required"),
});
import { Link, useNavigate } from "react-router-dom";
import AffiliateMarketingSettingFrom from "../../../../component/AcademyDashboard/AffiliateMarketingSetting/AffiliateMarketingSettingFrom";

const AffiliateMarketingSetting = () => {
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

  return (
    <div className="mb-5">
      <AffiliateMarketingSettingFrom />
    </div>
  );
};

export default AffiliateMarketingSetting;

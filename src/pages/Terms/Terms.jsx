import CustomizedTable from "../../component/table/table";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";

import PrivacyPolicyCard from "../../component/PrivacyPolicy/PrivacyPolicyCard";

const Terms = () => {
  return (
    <div className="all-info-top-header">
      <div className="TablePageHeader">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}>باقات الاشتراك</div>
          </div>

          <Link to={"/admin/EditTerms"} className="addBtn">
            تحديث المعلومات
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<PrivacyPolicyCard />} />
      </Routes>
    </div>
  );
};

export default Terms;

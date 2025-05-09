import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";
import FinancialTransactionsTable from "../../component/table/FinancialTransactionsTable/FinancialTransactionsTable";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import AffiliateMarketingTable from "../../component/table/AffiliateMarketingTable/AffiliateMarketingTable";
import AffiliateMarketingSetting from "./AffiliateMarketingSetting/AffiliateMarketingSetting";

const AffiliateMarketing = () => {
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}> التسويق بالعمولة </div>
            </div>

            <Link to={"/admin/AffiliateMarketingSetting"} className="addBtn">
              <AddCircleIcon />
              اعدادات التسويق
            </Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<AffiliateMarketingTable />} />
      </Routes>
    </div>
  );
};

export default AffiliateMarketing;

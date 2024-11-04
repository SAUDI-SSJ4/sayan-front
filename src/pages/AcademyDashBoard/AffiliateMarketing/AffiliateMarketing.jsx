import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import AffiliateMarketingTable from "../../../component/table/AffiliateMarketingTable/AffiliateMarketingTable";
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
            <div className="userTabs">
              <ul className="flex-wrap gap-3">
                <NavLink
                  to={"/academy/AffiliateMarketing"}
                  end
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  طلبات الانضمام
                </NavLink>
                <NavLink
                  to={"/academy/AffiliateMarketing/AffiliateMarketingSetting"}
                  className={({ isActive }) => {
                    return isActive ? " tablePage active" : "tablePage";
                  }}
                >
                  اعدادات التسويق
                </NavLink>
              </ul>
            </div>
            <Link to={"/academy/AddJoinFrom"} className="addBtn">
              <AddCircleIcon />
              ارسال دعوة انضمام
            </Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<AffiliateMarketingTable />} />
        <Route
          path="/AffiliateMarketingSetting"
          element={<AffiliateMarketingSetting />}
        />
      </Routes>
    </div>
  );
};

export default AffiliateMarketing;

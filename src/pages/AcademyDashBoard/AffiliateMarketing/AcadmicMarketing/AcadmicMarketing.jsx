import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";

import AcadmicMarketingTable from "../../../component/table/AffiliateMarketingTable/AcadmicMarketingTable";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AffiliateMarketingSettingFrom from "../../../component/AffiliateMarketingSetting/AffiliateMarketingSettingFrom";

const AcadmicMarketing = () => {
  return (
    <>
      <div className="TablePageHeader">
      <div className="HeaderContainer">
      <div className="d-flex align-items-center name">
          <div className="icon">
            <PeopleAltIcon sx={{ color: "#A3AED0" }} />
          </div>
          <div style={{ color: "#7E8799" }}> التسويق بالعمولة </div>
        </div>
        <div className="userTabs">
          <ul>
            <NavLink
              to={"/AcadmicMarketing"}
              end
              className={({ isActive }) => {
                return isActive ? " tablePage active" : "tablePage";
              }}
            >
              برنامج الاكاديمية
            </NavLink>
            <NavLink
              to={"/AcadmicMarketing/AffiliateMarketingSetting"}
              className={({ isActive }) => {
                return isActive ? " tablePage active" : "tablePage";
              }}
            >
              اعدادات التسويق
            </NavLink>
          </ul>
        </div>
        <Link to={"/AffiliateMarketing"} className="updateBtn">
          الرجوع <KeyboardBackspaceIcon />
        </Link>
      </div>
       
      </div>
      <Routes>
        <Route path="/" element={<AcadmicMarketingTable />} />
        <Route
          path="/AffiliateMarketingSetting"
          element={<AffiliateMarketingSettingFrom />}
        />
      </Routes>
    </>
  );
};

export default AcadmicMarketing;

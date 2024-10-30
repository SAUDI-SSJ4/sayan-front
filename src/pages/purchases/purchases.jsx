import CustomizedTable from "../../component/table/table";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { NavLink, Route, Routes } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AcadmyTable from "../../component/table/acadmyTable/AcadmeyTabel";
import EmploeeTable from "../../component/table/EmploeeTable/EmploeeTable";
import StudentRateTable from "../../component/studentBage/StudentRateTable/StudentRateTable";
import SubscreptionsTable from "../../component/Subscreptions/SubscreptionsTable";
import PurchasesTable from "../../component/Purchases/PurchasesTable";
const Purchases = () => {
  return (
    <div className="main-info-top all-info-top-header">
      <div
        className="TablePageHeader"
        style={{ justifyContent: "flex-start", position: "relative" }}
      >
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}>المشتريات</div>
          </div>
        </div>
      </div>
      <PurchasesTable />
    </div>
  );
};

export default Purchases;

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";
import FinancialTransactionsTable from "../../component/table/FinancialTransactionsTable/FinancialTransactionsTable";

const FinancialTransactions = () => {
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
       <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
         <div className="d-flex align-items-center name">
           <div className="icon">
             <PeopleAltIcon sx={{ color: "#A3AED0" }} />
           </div>
           <div style={{ color: "#7E8799" }}> المعاملات المالية</div>
         </div>
       </div>
      </div>
      <Routes>
        <Route path="/" element={<FinancialTransactionsTable />} />
      </Routes>
    </div>
  );
};

export default FinancialTransactions;

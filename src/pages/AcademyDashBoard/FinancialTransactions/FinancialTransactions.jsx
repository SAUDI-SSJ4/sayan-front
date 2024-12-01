
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";
import FinancialTransactionsTable from "../../component/table/FinancialTransactionsTable/FinancialTransactionsTable";


const FinancialTransactions = () => {
  return (
    <>
      <div className="TablePageHeader">
        <div className="d-flex align-items-center name">
          <div className="icon">
            <PeopleAltIcon sx={{ color: "#A3AED0" }} />
          </div>
          <div style={{ color: "#7E8799" }}> المعاملات المالية</div>
        </div>

        
      </div>
      <Routes>
        <Route path="/" element={<FinancialTransactionsTable />} />
      
      </Routes>
    </>
  );
};

export default FinancialTransactions;

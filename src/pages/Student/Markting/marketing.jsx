import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Routes } from "react-router-dom";
import SalesCards from "../../../component/Sales/SalesCard/SalesCards";

const Marketing = () => {
  return (
    <>
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}> برامج التسويق بالعمولة المُشترك بها </div>
          </div>
        </div>
      </div>
      <SalesCards notAdmin />
    </>
  );
};

export default Marketing;

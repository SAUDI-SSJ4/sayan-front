import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AcadmyTable from "../../component/table/acadmyTable/AcadmeyTabel";
import EmploeeTable from "../../component/table/EmploeeTable/EmploeeTable";
import JoiningFormsTable from "../../component/table/JoiningFormsTable/JoiningFormsTable";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const JoiningForms = (props) => {
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}> نماذج الانضمام</div>
          </div>

          <Link to={"/admin/ShowJoinForm"} className="addBtn">
            <RemoveRedEyeIcon />
            عرض نموذج الانضمام
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<JoiningFormsTable />} />
        <Route path="/Academy" element={<AcadmyTable />} />
        <Route
          path="/student"
          element={
            <div>
              <AcadmyTable />
            </div>
          }
        />
        <Route path="/Emploee" element={<EmploeeTable />} />
      </Routes>
    </div>
  );
};

export default JoiningForms;

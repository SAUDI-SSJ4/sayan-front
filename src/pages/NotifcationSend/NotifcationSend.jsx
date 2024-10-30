import CustomizedTable from "../../component/table/table";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AcadmyTable from "../../component/table/acadmyTable/AcadmeyTabel";
import EmploeeTable from "../../component/table/EmploeeTable/EmploeeTable";
import NotifcationSendTable from "../../component/NotifcationSend/NotifcationSendTable";

const NotifcationSend = () => {
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}>بث الاشعارات</div>
          </div>

          <Link to={"/admin/AddNewNotfication"} className="addBtn">
            <AddCircleIcon />
            بث اشعار جديد
          </Link>
        </div>
      </div>
      <div
        data-aos="fade-up"
        style={{
          padding: "20px",
          background: "white",
          border: " 1px solid #edeff2",
          borderRadius: "10px"
        }}
      >
        <Routes>
          <Route path="/" element={<NotifcationSendTable />} />
        </Routes>
      </div>
    </div>
  );
};

export default NotifcationSend;

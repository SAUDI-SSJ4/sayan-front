import CustomizedTable from "../../component/table/table";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RolesAndPermessionTable from "../../component/table/RolesAndPermessionTable/RolesAndPermessionTable";

import recoerder from "../../assets/icons/Reorder.png";
import SearchAndShowBar from "../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useEffect, useState } from "react";
import RolesCards from "../../component/Roles/RolesCard/RolesCards";
import { AnimatePresence, motion } from "framer-motion";
import axiosInstance from "../../../axios";
const RolesAndPermession = () => {
  const [TableOrNot, setTableOrNot] = useState(true);

  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    axiosInstance.get("admin/role").then((res) => {
      setPermissions(res.data.data);
      console.log(res.data.data);
    });
  }, []);
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <img src={recoerder} />
            </div>
            <div style={{ color: "#7E8799" }}>ادوار المستخدمين</div>
          </div>

          <Link to={"/admin/AddNewRole"} className="addBtn">
            <AddCircleIcon />
            انشاء دور جديد
          </Link>
        </div>
      </div>
      <SearchAndShowBar setTableOrNot={setTableOrNot} TableOrNot={TableOrNot} />

      <AnimatePresence mode="wait">
        {!TableOrNot ? (
          <motion.div
            key="expanded-content"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }} // Exit animation for the first motion.div
            transition={{ duration: 0.2 }}
          >
            <RolesCards data={permissions} />
          </motion.div>
        ) : (
          <motion.div
            key="collapsed-content"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <RolesAndPermessionTable />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RolesAndPermession;

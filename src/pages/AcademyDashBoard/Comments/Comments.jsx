import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { NavLink, Route, Routes } from "react-router-dom";

import CommentsTable from "../../../component/CommentsTable/CommentsTable";
const Comments = () => {
  return (
    <div className="all-info-top-header main-info-top">
      <div
        className="TablePageHeader"
        style={{ justifyContent: "flex-start", position: "relative" }}
      >
        <div className="HeaderContainer">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
              <div className="d-flex align-items-center name">
                <div className="icon">
                  <PeopleAltIcon sx={{ color: "#A3AED0" }} />
                </div>
                <div style={{ color: "#7E8799" }}>التعليقات</div>
              </div>
        </div>
        </div>
      </div>
      <CommentsTable />
    </div>
  );
};

export default Comments;

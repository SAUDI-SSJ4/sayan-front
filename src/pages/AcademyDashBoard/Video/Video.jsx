import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useState } from "react";
import VideoCardContainer from "../../../component/Videos/VideoCard/VideoCardContainer";
import VideoTable from "../../../component/Videos/VideoTable/VideoTable";
const AcademyVideos = () => {
  const [TableOrNot, setTableOrNot] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [data, setData] = useState([]);
  const checkAllHandler = () => {
    setCheckedKeys((perv) => {
      if (
        perv?.length === data?.length &&
        (perv?.length !== 0 || data?.length !== 0)
      ) {
        return [];
      } else {
        return [...data];
      }
    });
  };
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
      <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}> مكتبة الفيديو </div>
          </div>
        
          <Link to={"/academy/AddNewVideo"} className="addBtn">
            <AddCircleIcon />
            إضافة مدونة جديدة
          </Link>
      </div>
      </div>
      <SearchAndShowBar
        checkedKeys={checkedKeys}
        data={data}
        setCheckedKeys={setCheckedKeys}
        setTableOrNot={setTableOrNot}
        checkAllHandler={checkAllHandler}
        TableOrNot={TableOrNot}
      />

      <Routes>
        <Route
          path={"/"}
          element={
            TableOrNot ? (
              <VideoTable
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
              />
            ) : (
              <VideoCardContainer
                acadmey
                setData={setData}
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default AcademyVideos;

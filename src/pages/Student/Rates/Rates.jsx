import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useState } from "react";
import SessionsCardContainer from "../../../component/Sessions/SessionsCard/SessionsCardContainer";
import SessionsTable from "../../../component/Sessions/SessionsTable/SessionsTable";
const Rates = () => {
  const [TableOrNot, setTableOrNot] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [data, setData] = useState([]);
  const checkAllHandler = () => {
 
    setCheckedKeys((perv) => {
      if (perv?.length === data?.length && (perv?.length !== 0 || data?.length !== 0) ) {
       
        return [];
      } else {
        return [...data];
      }
    });
  };
  return (
    <div>
      <div className="TablePageHeader">
        <div className="d-flex align-items-center name">
          <div className="icon">
            <PeopleAltIcon sx={{ color: "#A3AED0" }} />
          </div>
          <div style={{ color: "#7E8799" }}>  التقييمات  </div>
        </div>
      
       
      </div>
      <SearchAndShowBar
        checkedKeys={checkedKeys}
        data={data}
        setCheckedKeys={setCheckedKeys}
        setTableOrNot={setTableOrNot}
        checkAllHandler={checkAllHandler}
        TableOrNot={TableOrNot}
        notAdmin
      />

      <Routes>
        <Route
          path={"/"}
          element={
            TableOrNot ? (
              <SessionsTable
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
              />
            ) : (
              <SessionsCardContainer
                setData={setData}
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
                notAdmin
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default Rates;

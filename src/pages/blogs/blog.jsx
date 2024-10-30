import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Link, NavLink, Route, Routes } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useState } from "react";
import BlogCardContainer from "../../component/Blogs/blogCard/blogCardContainer";
import BlogTable from "../../component/Blogs/blogTable/blogTable";
const Blogs = () => {
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
    <div className="all-info-top-header">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
         <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100"
         >
           <div className="d-flex align-items-center name">
             <div className="icon">
               <PeopleAltIcon sx={{ color: "#A3AED0" }} />
             </div>
             <div style={{ color: "#7E8799" }}> المدونات </div>
           </div>
          
           <Link to={"/admin/AddNewBlog"} className="addBtn">
             <AddCircleIcon />
             إضافة مدونة جديدة
           </Link>
         </div>
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
              <BlogTable
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
              />
            ) : (
              <BlogCardContainer
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

export default Blogs;

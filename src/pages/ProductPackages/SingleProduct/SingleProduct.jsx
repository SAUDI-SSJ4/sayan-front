import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { NavLink, Route, Routes } from "react-router-dom";
import SingleProductDetials from "../../../component/ProductPackages/SingelProduct/SingleProductDetials";
import SingleProductRate from "../../../component/ProductPackages/SingelProduct/SingleProductRate";
import AreaChart from "../../../component/charts/doubleArea";
import SingelProductTable from "../../../component/ProductPackages/SingelProduct/SingelProductTable";
import { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
const SingleProduct = () => {
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
  const router = useNavigate();
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader flex-column">
        <div className="HeaderContainer">
         <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
           <div className="d-flex align-items-center name">
             <div className="icon">
               <PeopleAltIcon sx={{ color: "#A3AED0" }} />
             </div>
             <div style={{ color: "#7E8799" }}> حزم المنتجات </div>
           </div>
           <div className="userTabs">
             <ul className="flex-wrap gap-3">
               <NavLink
                 to={"/ProductPackages/SingleProduct"}
                 end
                 className={({ isActive }) => {
                   return isActive ? " tablePage active" : "tablePage";
                 }}
               >
                 معلومات المنتج
               </NavLink>
               <NavLink
                 to={"/ProductPackages/SingleProduct/rate"}
                 className={({ isActive }) => {
                   return isActive ? " tablePage active" : "tablePage";
                 }}
               >
                 التقييمات
               </NavLink>
               <NavLink
                 to={"/ProductPackages/SingleProduct/orders"}
                 className={({ isActive }) => {
                   return isActive ? " tablePage active" : "tablePage";
                 }}
               >
                 الطلبات
               </NavLink>
             </ul>
           </div>
           <div className="updateBtn" onClick={() => router("/ProductPackages")}>
             الرجوع <KeyboardBackspaceIcon />
           </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<SingleProductDetials />} />
        <Route path="/rate" element={<SingleProductRate />} />
        <Route
          path="/orders"
          element={
            <SingelProductTable
              checkedKeys={checkedKeys}
              setCheckedKeys={setCheckedKeys}
              checkAllHandler={checkAllHandler}
              setData={setData}
            />
          }
        />
      </Routes>
    </div>
    </div>
  );
};

export default SingleProduct;

import { useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Route, Routes } from "react-router-dom";

import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import SessionsCardContainer from "../../../component/Sessions/SessionsCard/SessionsCardContainer";
import SessionsTable from "../../../component/Sessions/SessionsTable/SessionsTable";
import { getStudentProducts } from "../../../utils/apis/client";
import { useQuery } from "@tanstack/react-query";

const StudentProducts = () => {
  const [isTableView, setIsTableView] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [data, setData] = useState([]);

  const { data: products = [], isLoading, isFetched } = useQuery({
    queryKey: ["studentProducts"],
    queryFn: getStudentProducts,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 1000,
  });

  const handleCheckAll = () => {
    setCheckedKeys((prevCheckedKeys) => {
      return prevCheckedKeys.length === data.length
        ? []
        : [...data];
    });
  };

  return (
    <div className="all-info-top-header">
      <div className="TablePageHeader">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div className="text-muted">المنتجات الرقمية</div>
          </div>
        </div>
      </div>
      <SearchAndShowBar
        checkedKeys={checkedKeys}
        data={data}
        setCheckedKeys={setCheckedKeys}
        setTableOrNot={setIsTableView}
        checkAllHandler={handleCheckAll}
        TableOrNot={isTableView}
        notAdmin
      />

      <Routes>
        <Route
          path="/"
          element={
            isTableView ? (
              <SessionsTable
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={handleCheckAll}
              />
            ) : (
              <SessionsCardContainer
                setData={setData}
                products={products}
                checkedKeys={checkedKeys}
                isLoading={isLoading}
                isFetched={isFetched}
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

export default StudentProducts;

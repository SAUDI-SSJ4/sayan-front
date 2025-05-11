import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useEffect, useState } from "react";
import SessionsCardContainer from "../../../component/Sessions/SessionsCard/SessionsCardContainer";
import SessionsTable from "../../../component/Sessions/SessionsTable/SessionsTable";
import { getStudentFavourites } from "../../../utils/apis/client";
import { useQuery } from "@tanstack/react-query";
import client from "../../../utils/apis/client/client";

const Favorate = () => {
  const [checkedKeys, setCheckedKeys] = useState([]);

  const [data, setData] = useState([]);

  const checkAllHandler = () => {
    setCheckedKeys((perv) => {
      if (perv?.length === data?.length && (perv?.length !== 0 || data?.length !== 0)) {
        return [];
      } else {
        return [...data];
      }
    });
  };

  const {data: studentFavourites,isLoading,isFetched} = useQuery({
    queryKey: ["studentFavourites"],
    queryFn: getStudentFavourites,
    cacheTime: 1000,
    retry: 2,
  });

  console.log(studentFavourites);


  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}> قائمة المفضلة </div>
          </div>
        </div>
      </div>
      <SessionsTable
        checkedKeys={checkedKeys}
        setCheckedKeys={setCheckedKeys}
        checkAllHandler={checkAllHandler}
        setData={studentFavourites}
        isFetched={isFetched}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Favorate;

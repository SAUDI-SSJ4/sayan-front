import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useEffect, useState } from "react";
import CategoriesCardContainer from "../../../component/Categories/CategoriesCard/CategoriesCardContainer";
import CategoriesTable from "../../../component/Categories/CategoriesTable/CategoriesTable";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ConstructionOutlined } from "@mui/icons-material";
import { academy_client } from "../../../utils/apis/client.config";

const Categories = () => {
  const [TableOrNot, setTableOrNot] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [data, setData] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    academy_client.get("subscriptions").then(({ data }) => {
      console.log(data.data);
      setPermissions(data.data);
    });
  }, []);
  const checkAllHandler = () => {

    console.log(data)

    setCheckedKeys((perv) => {
      if (perv?.length === data?.length && (perv?.length !== 0 || data?.length !== 0)) {
        return [];
      } else {
        return [...data];
      }
    });
  };
  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}> التصنيفات </div>
            </div>
            <Link to={"/academy/AddNewCate"} className="addBtn">
              <AddCircleIcon />
              إنشاء تصنيف جديد
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

      <AnimatePresence mode="wait">
        {TableOrNot ? (
          <motion.div
            key="expanded-content"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CategoriesTable
              checkedKeys={checkedKeys}
              setCheckedKeys={setCheckedKeys}
              checkAllHandler={checkAllHandler}
              setData={setData}
            />
          </motion.div>
        ) : (
          <motion.div
            key="collapsed-content"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <>
              <CategoriesCardContainer
                setData={setData}
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
              />
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Categories;

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchAndShowBar from "../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useState } from "react";
import ProductPackagesCardContainer from "../../component/ProductPackages/ProductPackagesCard/ProductPackagesCardContainer";
import ProductPackagesTable from "../../component/ProductPackages/ProductPackagesTable/ProductPackagesTable";
import { motion, AnimatePresence } from "framer-motion";

const ProductPackages = () => {
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
            <div style={{ color: "#7E8799" }}> حزم المنتجات </div>
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
            exit={{ y: 10, opacity: 0 }} // Exit animation for the first motion.div
            transition={{ duration: 0.2 }}
          >
            <ProductPackagesTable
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
              <ProductPackagesCardContainer
                setData={setData}
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
              />
            </>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <div>
        <RadialBarChart />
      </div> */}
    </div>
  );
};

export default ProductPackages;

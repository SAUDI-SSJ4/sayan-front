import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useEffect, useState } from "react";
import CategoriesCardContainer from "../../component/Categories/CategoriesCard/CategoriesCardContainer";
import CategoriesTable from "../../component/Categories/CategoriesTable/CategoriesTable";
import { motion, AnimatePresence } from "framer-motion";
import AreaChart from "../../component/charts/doubleArea";
import { Link } from "react-router-dom";
import axiosInstance from "../../../axios";
import DeleteModal from "../../component/UI/DeleteModal/DeleteModal";
import { toast } from "react-toastify";

const Categories = () => {
  const [TableOrNot, setTableOrNot] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [data, setData] = useState([]);
  const [DeleteModalShow, setDeleteModal] = useState(false);
  const [CateogriesData, setCateogriesData] = useState([]);
  const [DeleteLoading, setDeleteLoading] = useState(false);
  const HandleDelete = () => {
    if (checkedKeys.length == 1) {
      setDeleteLoading(true);
      axiosInstance
        .delete(`admin/category/${checkedKeys[0].id}`)
        .then((res) => {
          setDeleteLoading(false);
          toast.success("   تم حذف العنصر", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          });
          setCheckedKeys([]);
          axiosInstance.get("admin/category").then((res) => {
            setCateogriesData(res.data.data);
          });
        });
    } else {
      // setDeleteLoading(true)
      // axiosInstance.post(`admin/category/delete`,{ids:checkedKeys}).then((res)=>{
      //   setDeleteLoading(false)
      //   toast.success("   تم حذف العنصر", {
      //     position: "top-left",
      //     autoClose: 3000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark",
      //   });
      //   setCheckedKeys([])
      //   axiosInstance.get("admin/category").then((res)=>{setCateogriesData(res.data.data)})
      // })
    }
  };

  useEffect(() => {
    axiosInstance.get("admin/category").then((res) => {
      setCateogriesData(res.data.data);
      console.log(res.data);
    });
  }, []);
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
  useEffect(() => {
    console.log(checkedKeys);
  }, [checkedKeys]);
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
            <Link to={"/admin/AddNewCate"} className="addBtn">
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
        ShowEditAndDelete={checkedKeys.length > 0 ? true : false}
        setDeleteModal={setDeleteModal}
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
                data={CateogriesData}
              />
            </>
          </motion.div>
        )}
      </AnimatePresence>
      <DeleteModal
        onDeleteHandler={HandleDelete}
        show={DeleteModalShow}
        setShow={setDeleteModal}
      />
    </div>
  );
};

export default Categories;

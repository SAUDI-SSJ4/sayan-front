import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import DigitalProductsTable from "../../../component/DigitalProducts/DigitalProductsTable/DigitalProductsTable";
import { motion, AnimatePresence } from "framer-motion";
import DeleteModal from "../../../component/UI/DeleteModal/DeleteModal";
import { Link } from "react-router-dom";
import { useAllProduct } from "../../../framework/accademy/product";
import { Error } from "@mui/icons-material";
import { Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { postAllProduct } from "../../../utils/apis/client/academy";

const DigitalProducts = () => {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [ShowDeleteModal, setDeleteModal] = useState(false);
  const [idDeleteModal, setidDeleteModal] = useState();


  const {data: allProduct = [] , isLoading, isError, error} = useQuery({
    queryKey: ["product"],
    queryFn: () => postAllProduct(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  })

  const checkAllHandler = () => {
    setCheckedKeys((perv) => {
      if (perv?.length === allProduct?.length && (perv?.length !== 0 || allProduct?.length !== 0)) {
        return [];
      } else {
        return [...allProduct];
      }
    });
  };


  if (isLoading)
    return (
      <div className="w-full h-50 d-flex justify-content-center align-items-center">
        <Spinner className="" />
      </div>
    );

  if (isError) return <Error />;


  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}> المنتجات الرقمية </div>
            </div>
            <Link to={"/academy/DigitalProducts/AddNewProduct"} className="addBtn">
              <AddCircleIcon />
              أضافة
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="expanded-content"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }} // Exit animation for the first motion.div
          transition={{ duration: 0.2 }}
        >
          <DigitalProductsTable
            checkedKeys={checkedKeys}
            setDeleteModal={setDeleteModal}
            setidDeleteModal={setidDeleteModal}
            setCheckedKeys={setCheckedKeys}
            checkAllHandler={checkAllHandler}
            data={allProduct}
          />
        </motion.div>
      </AnimatePresence>
      {/* <SuccesModal show={showModal} setShow={setShowModal} /> */}
      <DeleteModal id={idDeleteModal} show={ShowDeleteModal} setShow={setDeleteModal} />
    </div>
  );
};

export default DigitalProducts;

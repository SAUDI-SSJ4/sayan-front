import { motion, AnimatePresence } from "framer-motion";
import classes from "./ProductPackagesCard.module.scss";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
const ProductPackagesCard = ({
  image,
  active,
  user,
  onClick,
  onCheck,
  checked
}) => {
  const router = useNavigate();
  return (
    <div className={`${classes.Card} m-0`}>
      <div
        className={`${classes.CardCheck} ${checked && classes.Checked}`}
        onClick={onCheck}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CheckCircleIcon sx={{ width: "30px", height: "30px" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={classes.CardImage}>
        <img src={image} />
      </div>
      <div
        className={classes.CardBody}
        onClick={() => router("/ProductPackages/SingleProduct/")}
      >
        <h2 className="fs-5 fw-medium">{user?.name}</h2>
        <div className={classes.Price}>
          <div>120.00 ر.س.</div>
        </div>
        <div
          style={{
            gap: "10px",
            alignItems: "center",
            position: "relative",
            display: "flex",
            marginTop: "30px"
          }}
        >
          <img
            src={user.image}
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              right: "0",
              borderRadius: "50%"
            }}
          />
          <div style={{ width: "40px", height: "40px" }}></div>

          <span className="fs-6 fw-medium">{user.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductPackagesCard;

import { motion, AnimatePresence } from "framer-motion";
import classes from "./CertficatesCard.module.scss";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useNavigate } from "react-router-dom";

const CertficatesCard = ({ image, user, onCheck, checked, notAdmin }) => {
  const router = useNavigate();
  return (
    <div
      className={`${classes.Card} card-certificate m-0`}
      onClick={notAdmin && router("/student/SingleCertificate/")}
    >
      <div className={classes.CardImage}>
        <img src={image} />
        {notAdmin ? null : (
          <div className={`${classes.CardCheck} ${checked && classes.Checked}`} onClick={onCheck}>
            <AnimatePresence>
              {checked && (
                <motion.div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ y: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckOutlinedIcon sx={{ width: "100%", height: "100%" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <div className={classes.CardBody}>
        <span className="date-card">Jan.01.2024</span>
        <h2 className="title-card-cer">{user?.name}</h2>
        <p className="text-card-cer">
          Loream Ipsum is that the Loream Ipsum is that the Loream Ipsum is that the Loream Ipsum.
        </p>

        <div
          style={{
            gap: "10px",
            alignItems: "center",
            position: "relative",
            display: "flex",
            marginTop: "30px",
          }}
        >
          <img
            src={user.image}
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              right: "0",
              borderRadius: "50%",
            }}
          />
          <div style={{ width: "40px", height: "40px" }}></div>

          <span className="name-user">{user.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CertficatesCard;

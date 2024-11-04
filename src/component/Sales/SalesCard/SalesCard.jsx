import classes from "./SalesCard.module.scss";
import SaleIcon from "../../../assets/icons/icon.svg";
import Maximize from "../../../assets/icons/maximize.svg";
import Minimize from "../../../assets/icons/minimize.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SalesCard = ({ notAdmin }) => {
  const [expand, setExpand] = useState(false);
  const router = useNavigate();
  return (
    <div className={`${classes.Card} card-marketing-one`}>
      <AnimatePresence mode="wait">
        {expand ? (
          <motion.div
            key="expanded-content"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }} // Exit animation for the first motion.div
            transition={{ duration: 0.2 }}
          >
            <div className={`${classes.CardBody}`}>
              <h4>معلومات العرض</h4>
              <div className={classes.dataRow}>
                <p className="fs-6 fw-medium text-content--1">يبدأ العرض</p>
                <span className="fs-6 fw-medium text-content--1">
                  Jan.01.2024
                </span>
              </div>

              <div className={classes.dataRow}>
                <p className="fs-6 fw-medium text-content--1">ينتهي العرض</p>
                <span className="fs-6 fw-medium text-content--1">
                  Jan.01.2024
                </span>
              </div>
              <div className={classes.dataRow}>
                <p className="fs-6 fw-medium text-content--1">
                  {" "}
                  عدد مرات الاستخدام
                </p>
                <span className="fs-6 fw-medium text-content--1">5/طالب</span>
              </div>
            </div>
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
              <div
                className={`${classes.CardHeader} info-card--details flex-wrap gap-3`}
              >
                <div
                  className={classes.HeaderImage}
                  onClick={() => router("/")}
                >
                  <img src={SaleIcon} alt="Sale Icon" />
                  <div>
                    <h3 className="fs-6 fw-medium text-content--1">Thoao11</h3>
                    <span className="fs-6 fw-medium text-content--1">مفعل</span>
                  </div>
                </div>
                {notAdmin ? null : (
                  <div className="updateBtn">تحديث المعلومات</div>
                )}
              </div>
              <div className={`${classes.CardBody} info-card--details--1`}>
                <div className={classes.dataRow}>
                  <p className="fs-6 fw-medium text-content--1">يبدأ العرض</p>
                  <span className="fs-6 fw-medium text-content--1">
                    Jan.01.2024
                  </span>
                </div>
                <div className={classes.dataRow}>
                  <p className="fs-6 fw-medium text-content--1">ينتهي العرض</p>
                  <span className="fs-6 fw-medium text-content--1">
                    Jan.01.2024
                  </span>
                </div>
              </div>
            </>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={classes.CardFooter} onClick={() => setExpand(!expand)}>
        <img src={expand ? Minimize : Maximize} alt="Toggle Expand" />
        {expand ? "عرض أقل" : "عرض المزيد"}
      </div>
    </div>
  );
};

export default SalesCard;

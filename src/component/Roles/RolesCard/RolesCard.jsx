import classes from "./RolesCard.module.scss";
import SaleIcon from "../../../assets/icons/icon.svg";
import Maximize from "../../../assets/icons/maximize.svg";
import Minimize from "../../../assets/icons/minimize.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Toggle } from "rsuite";
const RolesCard = ({name,permissio}) => {
  const [expand, setExpand] = useState(false);
const router = useNavigate();
  return (
    <div className={classes.Card} >
      <AnimatePresence mode="wait">
        {expand ? (
          <motion.div
          key="expanded-content"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }} // Exit animation for the first motion.div
            transition={{ duration: 0.2 }}
          >
        <div className={classes.CardBody}>
          <h4>
          الصلاحيات
          </h4>
       
         <div style={{maxHeight:'200px',overflowY:'scroll'}}>
         {
            permissio?.map((item,index)=>{

              return    <div className="d-flex gap-3 align-items-center ToggleContainer">
              <Toggle defaultChecked />
             <div>
             <h3 style={{ color: "#170F49", fontSize: "18px" }}>
            {item}
              </h3>
              <p>
              الوصف
              </p>
             </div>

              
            </div>
            }

            )
           }
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
              <div className={classes.CardHeader}>
                <div className={classes.HeaderImage} onClick={()=>router('/')}>
                  <img src={SaleIcon} alt="Sale Icon" />
                  <div>
                    <h3>{name} </h3>
                    <span>3 موظفين</span>
                  </div>
                </div>
                <div className="updateBtn">تحديث المعلومات</div>
              </div>
              <div className={classes.CardBody}>
             <p>
             Loream Ipsum is that the client Loream Ipsum Loream Ipsum is that the cllient done.
             </p>
              </div>
            </>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={classes.CardFooter} onClick={() => setExpand(!expand)}>
        <img src={expand ? Minimize : Maximize} alt="Toggle Expand" />
        {expand ? 'اخفاء الصلاحيات' : 'عرض الصلاحيات'}
      </div>
    </div>
  );
};

export default RolesCard;

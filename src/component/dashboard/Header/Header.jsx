import classes from "./Header.module.scss";
import user from "../../../assets/icons/users.svg";
import documentt from "../../../assets/icons/Document.png";
import widgedbg from "../../../assets/images/widgetbg.svg";
import checkk from '../../../assets/icons/BillCheck.svg'
import { useNavigate } from "react-router-dom";
const DashboardHeader = () => {
  const router =useNavigate();
  return (
    <div className="row" style={{marginTop:'25px'}}>
      <div className="col-lg-3 mt-2">
        <div className={`d-flex ${classes.Widget} ${classes.users}`} onClick={()=>router("/admin/users")}>
          <div className={`${classes.icon}`}>
            <img src={user} />
          </div>
          <div>
            <h2>المستخدمين</h2>
            <span>14,390</span>
          </div>
        </div>
      </div>
      <div className="col-lg-3 mt-2">
      <div className={`d-flex ${classes.Widget} ${classes.documentt}`} onClick={()=>router("/admin/TrainingCourses")}>
          <div className={`${classes.icon}`}>
            <img src={documentt} />
          </div>
          <div>
            <h2>المحتوى</h2>
            <span>48,655</span>
          </div>
        </div>
      </div>
      <div className="col-lg-3 mt-2">
      <div className={`d-flex ${classes.Widget} ${classes.checkk}`}  onClick={()=>router("/admin/Wallet")}>
          <div className={`${classes.icon}`}>
            <img src={checkk} />
          </div>
          <div>
            <h2>المبيعات</h2>
            <span>4,993</span>
          </div>
        </div>
      </div> 
      <div className="col-lg-3 mt-2">
      <div className={`d-flex ${classes.Widget} ${classes.last}`} onClick={()=>router("/admin/Wallet")}>
         
          <div>
            <p>ارباح المنصة</p>
            <h2>70,600 ر.س.</h2>
            <span> 10% منذ اخر شهر</span>
          </div>
          <img src={widgedbg} className={classes.widgedbg} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

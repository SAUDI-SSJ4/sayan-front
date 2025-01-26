import classes from "../../../component/dashboard/Header/Header.module.scss";

import user from "../../../assets/icons/users.svg";
import documentt from "../../../assets/icons/Document.png";
import widgedbg from "../../../assets/images/widgetbg.svg";
import checkk from "../../../assets/icons/BillCheck.svg";
import { useNavigate } from "react-router-dom";

const AcademyHeader = ({ academy, StudentData }) => {
  const router = useNavigate();

  return (
    <div className="row" style={{ marginTop: "25px" }}>
      <div className="col-lg-3 mt-2">
        <div
          className={`d-flex ${classes.Widget} ${classes.users}`}
          style={{ backgroundColor: "rgba(0, 98, 255, 0.06)" }}
          onClick={() => router("/academy/training-courses")}
        >
          <div className={`${classes.icon}`}>
            <img src={user} />
          </div>
          <div>
            <h2>الدورات التدريبية</h2>
            <span>{StudentData?.courses}</span>
          </div>
        </div>
      </div>
      <div className="col-lg-3 mt-2">
        <div
          className={`d-flex ${classes.Widget} ${classes.documentt}`}
          style={{ backgroundColor: "rgba(30, 2, 170, 0.06)" }}
        >
          <div className={`${classes.icon}`}>
            <img src={documentt} />
          </div>
          <div>
            <h2>المنتجات الرقمية</h2>
            <span>{StudentData?.latest_courses?.length}</span>
          </div>
        </div>
      </div>
      <div className="col-lg-3 mt-2">
        <div
          className={`d-flex ${classes.Widget} ${classes.checkk}`}
          style={{ backgroundColor: "rgba(255, 192, 71, 0.06)" }}
    
        >
          <div className={`${classes.icon}`}>
            <img src={checkk} />
          </div>
          <div>
            <h2>عدد الطلاب</h2>
            <span>{StudentData?.faved}</span>
          </div>
        </div>
      </div>
      <div className="col-lg-3 mt-2">
        <div
          className={`d-flex ${classes.Widget} ${academy ? classes.lastAcademy : classes.last} `}
        >
          <div>
            <p>المبيعات </p>
            <h2>70,600 ر.س.</h2>
            <span> 10% منذ اخر شهر</span>
          </div>
          <img src={widgedbg} className={classes.widgedbg} />
        </div>
      </div>
    </div>
  );
};

export default AcademyHeader;

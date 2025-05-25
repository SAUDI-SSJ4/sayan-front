import classes from "./Header.module.scss";
import user from "../../../assets/icons/users.svg";
import documentt from "../../../assets/icons/Document.png";
import widgedbg from "../../../assets/images/widgetbg.svg";
import checkk from "../../../assets/icons/BillCheck.svg";
import { useNavigate } from "react-router-dom";

const StudentDashboardHeader = ({ academy = false, StudentData = {} }) => {
  const router = useNavigate();
  
  // تعديل طريقة الوصول إلى البيانات
  // نتحقق من وجود البيانات في عدة مستويات محتملة
  const data = StudentData?.data?.data || StudentData?.data || StudentData || {};
  
  // للتشخيص - يمكن إزالة هذا السطر بعد حل المشكلة
  console.log("StudentData structure:", StudentData, "Extracted data:", data);

  return (
    <div className="mt-4 row">
      {/* الدورات التدريبية */}
      <div className="mt-2 col-lg-3">
        <div
          className={`d-flex ${classes.Widget} ${classes.users}`}
          style={{ backgroundColor: "rgba(0, 98, 255, 0.06)" }}
          onClick={() => router("/student/TrainingCourses")}
        >
          <div className={classes.icon}>
            <img src={user} alt="الدورات" />
          </div>
          <div>
            <h2>الدورات التدريبية</h2>
            <span>{data.courses ?? 0}</span>
          </div>
        </div>
      </div>

      {/* المشتريات */}
      <div className="mt-2 col-lg-3">
        <div
          className={`d-flex ${classes.Widget} ${classes.documentt}`}
          style={{ backgroundColor: "rgba(30, 2, 170, 0.06)" }}
          onClick={() => router("/student/pruchases")}
        >
          <div className={classes.icon}>
            <img src={documentt} alt="المشتريات" />
          </div>
          <div>
            <h2>المشتريات المكتملة</h2>
            <span>{data.payments ?? 0}</span>
          </div>
        </div>
      </div>

      {/* المفضلة */}
      <div className="mt-2 col-lg-3">
        <div
          className={`d-flex ${classes.Widget} ${classes.checkk}`}
          style={{ backgroundColor: "rgba(255, 192, 71, 0.06)" }}
          onClick={() => router("/student/Favorate")}
        >
          <div className={classes.icon}>
            <img src={checkk} alt="المفضلة" />
          </div>
          <div>
            <h2>المفضلة</h2>
            <span>{data.faved ?? 0}</span>
          </div>
        </div>
      </div>

      {/* المبيعات */}
      <div className="mt-2 col-lg-3">
        <div
          className={`d-flex ${classes.Widget} ${
            academy ? classes.lastAcademy : classes.last
          }`}
        >
          <div>
            <p>التسويق بالعمولة</p>
            <h2>{data.sales ?? "0"} ر.س.</h2>
            <span>{data.sales_percentage ?? "0"}% منذ آخر شهر</span>
          </div>
          <img src={widgedbg} alt="التسويق بالعمولة" className={classes.widgedbg} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHeader;

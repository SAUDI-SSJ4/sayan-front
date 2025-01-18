import classes from "./SubscreptionInfo.module.scss";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const SubscreptionInfo = () => {
  return (
    <div className={`${classes.MainCard}`}>
      <p className="fs-6 fw-medium text-content--1">باقة الاشتراك</p>
      <h4 className="fs-5 fw-medium title-text--1">الأساسية</h4>
      <div className="d-flex align-items-center gap-2 mb-2">
        <FiberManualRecordIcon
          sx={{ width: "8px", height: "8px", color: "#22D2A7" }}
        />
        مفعلة
      </div>
      <span
        className="fs-6 fw-medium text-content--1"
        style={{ color: "#7E8799", fontSize: "14px", marginTop: "17px" }}
      >
        تم انشاؤها بتاريخ (Oct.13.2023)
      </span>
      <div className={`${classes.Feature} rounded-3 `}>
        <h5 className="fs-5 fw-medium title-text--1">المزايا</h5>
        <ul className="p-0 m-0">
          <li className="fs-6 fw-medium text-content--1">وصف الميزة</li>
          <li className="fs-6 fw-medium text-content--1">وصف الميزة</li>
          <li className="fs-6 fw-medium text-content--1">وصف الميزة</li>
          <li className="fs-6 fw-medium text-content--1">وصف الميزة</li>
        </ul>
      </div>
    </div>
  );
};

export default SubscreptionInfo;

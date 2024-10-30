import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import classes from "./SingleCourse.module.scss";
import image from "../../assets/images/bg.png";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
const SingleCourse = () => {
  return (
    <div className="all-info-top-header main-info-top mb-5 acadmy-single-course">
      <div className="TablePageHeader ">
        <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
          <div className="d-flex align-items-center name ">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}> الدورات التدريبية</div>
          </div>
          <div className="updateBtn">
            الرجوع <KeyboardBackspaceIcon />
          </div>
        </div>
      </div>
      <div className={`${classes.MainContainer} course-card--info`}>
        <div className={classes.PageImage}>
          <img src={image} className="image-bg" />
          <div>
            <h2 className="title-course">عنوان الدورة التدريبية</h2>
            <p className="text-course">الملخص</p>
          </div>
        </div>
        <div className={classes.PageBody}>
          <div className="row g-3">
            <div className="col-12 col-md-12 col-lg-8">
              <div className="card-course-details">
                <p className="text--1">
                  Loream Ipsum is that the client is Loream Ipsum is that the
                  client is Loream Ipsum is that the client is Loream Ipsum is
                  that the client is Loream Ipsum is that the client is Loream
                  Ipsum is that the client is Loream Ipsum is that the client is
                  Loream Ipsum is that the client is Loream Ipsum is that the
                  client is Loream Ipsum is that the client is Loream Ipsum is
                  that the client is Loream Ipsum is that the client is Loream
                  Ipsum is that the client is.
                </p>
                <div
                  className="d-flex gap-3 flex-wrap"
                  style={{ marginBlock: "50px" }}
                >
                  <div className="Ended">التصنيف</div>
                  <div className="Ended">التصنيف</div>
                  <div className="Ended">التصنيف</div>
                </div>

                <div className="Tittle mt-3">
                  سيتعلم الطالب من خلال هذه الدورة التدريبية
                </div>
                <div
                  className="row g-3"
                  style={{ fontSize: "16px !important" }}
                >
                  <div className="col-12 col-md-6">
                    {" "}
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex ",
                        gap: "5px",
                        alignItems: "center",
                        fontSize: "18px",
                        color: "#7E8799"
                      }}
                      className="info-content_--1"
                    >
                      <CheckCircleIcon sx={{ color: "#0FE8E8" }} /> تم اعداد هذا
                      الاختبار الذكي بناءً على تحليل محتوى الدورة التدريبية
                    </div>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    {" "}
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex ",
                        gap: "5px",
                        alignItems: "center",
                        fontSize: "18px",
                        color: "#7E8799"
                      }}
                      className="info-content_--1"
                    >
                      <CheckCircleIcon sx={{ color: "#0FE8E8" }} /> تم اعداد هذا
                      الاختبار الذكي بناءً على تحليل محتوى الدورة التدريبية
                    </div>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    {" "}
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex ",
                        gap: "5px",
                        alignItems: "center",
                        fontSize: "18px",
                        color: "#7E8799"
                      }}
                      className="info-content_--1"
                    >
                      <CheckCircleIcon sx={{ color: "#0FE8E8" }} /> تم اعداد هذا
                      الاختبار الذكي بناءً على تحليل محتوى الدورة التدريبية
                    </div>{" "}
                  </div>
                </div>
                <div className="d-flex flex-wrap button-content--1 gap-2 justify-content-center mt-5">
                  <div className="addBtn">تحديث المعلومات</div>
                  <div className="updateBtn">ازالة الدورة التدريبية</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-4">
              <div className={classes.Side}>
                <Link to={"/AffiliateMarketingSetting"} className="addBtn">
                  <RemoveRedEyeIcon />
                  معاينة كطالب
                </Link>
                <Link
                  to={"/AffiliateMarketingSetting"}
                  className="addBtn mt-2"
                  style={{ backgroundColor: "#21DC6C", border: "none" }}
                >
                  <CheckCircleIcon />
                  ظهور الدورة التدريبية
                </Link>

                <div className="VideoCard h-100">
                  <div className="VideoCardIcon">
                    <SchoolOutlinedIcon sx={{ color: "#0FE8E8" }} />
                    <h4>الاكاديمية </h4>
                  </div>
                  <h5> اكاديمية ضوء </h5>
                </div>
                <div className="VideoCard h-100 mt-3">
                  <div className="VideoCardIcon">
                    <TrendingUpOutlinedIcon sx={{ color: "#0FE8E8" }} />
                    <h4 className="title-text--1">مستوى الطالب </h4>
                  </div>
                  <h5 className="title-text--1"> جميع المستويات </h5>
                </div>
                <div className="VideoCard h-100 mt-3">
                  <div className="VideoCardIcon">
                    <AttachMoneyOutlinedIcon sx={{ color: "#0FE8E8" }} />
                    <h4 className="title-text--1">سعر الدورة </h4>
                  </div>
                  <h5 className="title-text--1">120.00 ر.س. </h5>
                </div>
                <div className="VideoCard h-100 mt-3">
                  <div className="VideoCardIcon">
                    <CalendarTodayOutlinedIcon sx={{ color: "#0FE8E8" }} />
                    <h4 className="title-text--1">الدورة </h4>
                  </div>
                  <h5 className="title-text--1">مباشرة غير تفاعلية </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;

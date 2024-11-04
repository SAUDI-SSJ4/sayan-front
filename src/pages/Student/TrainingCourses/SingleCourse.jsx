import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import classes from "./SingleCourse.module.scss";
import image from "../../../assets/images/bg.png";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from "react-router-dom";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
const SingleCourse = () => {
  return (
    <div className="mb-5">
      <div className="TablePageHeader ">
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
      <div className={classes.MainContainer}>
        <div className={classes.PageImage}>
          <img src={image} />
          <div>
            <h2>عنوان الدورة التدريبية</h2>
            <p>الملخص</p>
          </div>
        </div>
        <div className={classes.PageBody}>
          <div className="row">
            <div className=" col-md-10 col-12">
              <div>
                <p>
                  Loream Ipsum is that the client is Loream Ipsum is that the
                  client is Loream Ipsum is that the client is Loream Ipsum is
                  that the client is Loream Ipsum is that the client is Loream
                  Ipsum is that the client is Loream Ipsum is that the client is
                  Loream Ipsum is that the client is Loream Ipsum is that the
                  client is Loream Ipsum is that the client is Loream Ipsum is
                  that the client is Loream Ipsum is that the client is Loream
                  Ipsum is that the client is.
                </p>
                <div className="d-flex gap-2 " style={{ marginBlock: "50px" }}>
                  <div className="Ended">التصنيف</div>
                  <div className="Ended">التصنيف</div>
                  <div className="Ended">التصنيف</div>
                </div>

                <div className="Tittle mt-3">
                  سيتعلم الطالب من خلال هذه الدورة التدريبية
                </div>
                <div className="row" style={{fontSize:'16px !important'}}>
                  <div className="col-md-6 col-12">
                    {" "}
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex ",
                        gap: "5px",
                        alignItems: "center",
                        fontSize: "18px",
                        color: "#7E8799",
                      }}
                    >
                      <CheckCircleIcon sx={{ color: "#0FE8E8" }} /> تم اعداد هذا
                      الاختبار الذكي بناءً على تحليل محتوى الدورة التدريبية
                    </div>{" "}
                  </div>
                  <div className="col-md-6 col-12">
                    {" "}
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex ",
                        gap: "5px",
                        alignItems: "center",
                        fontSize: "18px",
                        color: "#7E8799",
                      }}
                    >
                      <CheckCircleIcon sx={{ color: "#0FE8E8" }} /> تم اعداد هذا
                      الاختبار الذكي بناءً على تحليل محتوى الدورة التدريبية
                    </div>{" "}
                  </div>
                  <div className="col-md-6 col-12">
                    {" "}
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex ",
                        gap: "5px",
                        alignItems: "center",
                        fontSize: "18px",
                        color: "#7E8799",
                      }}
                    >
                      <CheckCircleIcon sx={{ color: "#0FE8E8" }} /> تم اعداد هذا
                      الاختبار الذكي بناءً على تحليل محتوى الدورة التدريبية
                    </div>{" "}
                  </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-5">
<div className="addBtn">
تحديث المعلومات
</div>
<div className="updateBtn">ازالة الدورة التدريبية</div>
                </div>
              </div>
            </div>
            <div className=" col-md-2 col-12">
              <div className={classes.Side}>
                <Link to={"/AffiliateMarketingSetting"} className="addBtn">
                  <RemoveRedEyeIcon />
                  معاينة كطالب
                </Link>
                <Link to={"/AffiliateMarketingSetting"} className="addBtn mt-2" style={{backgroundColor:'#21DC6C', border:'none'}}>
                  <CheckCircleIcon />
                  ظهور الدورة التدريبية
                </Link>
                
                <div className="VideoCard">
              <div className="VideoCardIcon">
               <SchoolOutlinedIcon sx={{color:'#0FE8E8'}}/>
                <h4>الاكاديمية </h4>
              </div>
              <h5> اكاديمية ضوء  </h5>
            </div>
            <div className="VideoCard mt-3">
              <div className="VideoCardIcon">
               <TrendingUpOutlinedIcon sx={{color:'#0FE8E8'}}/>
                <h4>مستوى الطالب </h4>
              </div>
              <h5> جميع المستويات  </h5>
            </div>
            <div className="VideoCard mt-3">
              <div className="VideoCardIcon">
               <AttachMoneyOutlinedIcon sx={{color:'#0FE8E8'}}/>
                <h4>سعر الدورة </h4>
              </div>
              <h5>120.00 ر.س.   </h5>
            </div>
            <div className="VideoCard mt-3">
              <div className="VideoCardIcon">
               <CalendarTodayOutlinedIcon sx={{color:'#0FE8E8'}}/>
                <h4>الدورة  </h4>
              </div>
              <h5>مباشرة غير تفاعلية   </h5>
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

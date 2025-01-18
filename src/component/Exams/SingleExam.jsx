import VideoImage from "./../../assets/images/VideoImage.png";
import playBtn from "./../../assets/icons/PlayButton.svg";
import imageAcadmy from "./../../assets/images/Ellipse.png";
import icon from "./../../assets/icons/isd.svg";
import icon1 from "./../../assets/icons/icon-1.svg";
import icon2 from "./../../assets/icons/icon-2.svg";
import icon3 from "./../../assets/icons/icon-3.svg";
import icon4 from "./../../assets/icons/icon-4.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import icon5 from "./../../assets/icons/icon-5.svg";
import { useNavigate } from "react-router-dom";
const SingleExamComponent = ({ classes, academy }) => {
  const router = useNavigate();
  return (
    <div className={`${classes.ExamInfo} card-exam-one`}>
      <div className={classes.PageContainer}>
        <h3 className="fs-5 fw-medium title-text--1">
          الاختبار الذكي للدورة التدريبية (عنوان الدورة)
        </h3>
        <h2 className="fs-6 fw-medium title-text--1 mt-2">عنوان الاختبار </h2>
        <span className="fs-6 fw-medium text-content--1 mt-2">
          {" "}
          عنوان القسم المخصص للاختبار{" "}
        </span>

        <div
          style={{
            marginTop: "20px",
            display: "flex ",
            gap: "5px",
            alignItems: "center",
            fontSize: "18px",
            color: "#7E8799"
          }}
          className="text-content--1"
        >
          <CheckCircleIcon sx={{ color: "#0FE8E8" }} /> تم اعداد هذا الاختبار
          الذكي بناءً على تحليل محتوى الدورة التدريبية
        </div>
        <div
          style={{
            gap: "10px",
            alignItems: "center",
            position: "relative",
            display: "flex",
            marginTop: "30px"
          }}
          className="text-content--1"
        >
          <img
            src={imageAcadmy}
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              right: "0",
              borderRadius: "50%"
            }}
          />
          <div style={{ width: "40px", height: "40px" }}></div>

          <span className="mb-3 ">اكاديمية ضوء </span>
        </div>
        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon ">
                <img src={icon} />
                <h4 className="fs-6 fw-medium title-text--1">الاختبار الذكي</h4>
              </div>
              <h5 className="fs-6 fw-medium text-content--1">نوع الاختبار </h5>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon">
                <img src={icon1} />
                <h4 className="fs-6 fw-medium title-text--1">5 أسئلة </h4>
              </div>
              <h5 className="fs-6 fw-medium text-content--1">
                {" "}
                عدد أسئلة الاختبار
              </h5>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon">
                <img src={icon2} />
                <h4 className="fs-6 fw-medium title-text--1">عنوان القسم </h4>
              </div>
              <h5 className="fs-6 fw-medium text-content--1">
                عنوان القسم الذي تم تفعيل خاصية (اختبرني) به{" "}
              </h5>
            </div>
          </div>
        </div>
        <div className="button-content--1 d-flex justify-content-center flex-wrap gap-2 mt-3">
          <div
            className="addBtn"
            onClick={() =>
              academy
                ? router("/academy/SingleExam/exam/ShowExam")
                : router("/admin/SingleExam/exam/ShowExam")
            }
          >
            عرض الاختبار
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleExamComponent;

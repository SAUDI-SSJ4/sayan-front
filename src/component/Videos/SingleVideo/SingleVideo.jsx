import classes from "./SingleVideoInfo.module.scss";
import VideoImage from "./../../../assets/images/VideoImage.png";
import playBtn from "../../../assets/icons/PlayButton.svg";
import imageAcadmy from "../../../assets/images/Ellipse.png";
import icon from "./../../../assets/icons/isd.svg";
import icon1 from "../../../assets/icons/icon-1.svg";
import icon2 from "../../../assets/icons/icon-2.svg";
import icon3 from "../../../assets/icons/icon-3.svg";
import icon4 from "../../../assets/icons/icon-4.svg";

import icon5 from "../../../assets/icons/icon-5.svg";
import { toast } from "react-toastify";
const SingleVideoInfo = () => {
  // REMOVE AND CALCEL MODAL
  const successUpdate = () => {
    toast.success("تم التحديث بنجاح");
  };

  const successRemove = () => {
    toast.success("تم الحذف بنجاح");
  };

  return (
    <div className={`${classes.mainCard} all-card-video-info`}>
      <div className={classes.MainImage}>
        <img src={playBtn} className={classes.playBtn} />

        <img src={VideoImage} className={classes.VideoImage} />
      </div>
      <div className={classes.PageContainer}>
        <h2 className="fs-5 fw-medium title-text--1">عنوان الفيديو</h2>
        <span className="text-content--1"> وصف الفيديو </span>
        <p className={`${classes.Info} text-content--1`}>
          الملخص Loream Ipsum loream ipsum Loream ipsum lorem lorem lorem lorem
          ipsum
        </p>
        <div
          style={{
            gap: "10px",
            alignItems: "center",
            position: "relative",
            display: "flex",
            marginTop: "30px"
          }}
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

          <span className="fs-6 fw-medium title-text--1">اكاديمية ضوء </span>
        </div>
        <div className="row g-3 mt-2">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="VideoCard">
              <div className="VideoCardIcon">
                <img src={icon} />
                <h4>العربية</h4>
              </div>
              <h5>لغة الفيديو</h5>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="VideoCard">
              <div className="VideoCardIcon">
                <img src={icon1} />
                <h4>عنوان دورة تدريبية</h4>
              </div>
              <h5>لغةارتباط الفيديو بمحتوى</h5>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="VideoCard">
              <div className="VideoCardIcon">
                <img src={icon2} />
                <h4>ترجمة الاكاديمية</h4>
              </div>
              <h5>الترجمة </h5>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="VideoCard">
              <div className="VideoCardIcon">
                <img src={icon3} />
                <h4>01:40:50</h4>
              </div>
              <h5>مدة الفيديو </h5>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="VideoCard">
              <div className="VideoCardIcon">
                <img src={icon4} />
                <h4>الاختبار الاول للتركيز</h4>
              </div>
              <h5>ارتباط الفيديو باختبار </h5>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="VideoCard">
              <div className="VideoCardIcon">
                <img src={icon5} />
                <h4>00:16:45</h4>
              </div>
              <h5> وقت تفعيل الاختبار نسبة الى الفيديو</h5>
            </div>
          </div>
        </div>
        <div className="all-buttons-content d-flex justify-content-center gap-2 mt-4 flex-wrap gap-3">
          <div className="addBtn" onClick={successUpdate}>
            تحديث المعلومات
          </div>
          <div className="updateBtn" onClick={successRemove}>
            ازالة الفيديو
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVideoInfo;

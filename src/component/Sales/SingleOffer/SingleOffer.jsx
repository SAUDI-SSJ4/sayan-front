import classes from "./SingleOfferInfo.module.scss";
import VideoImage from "./../../../assets/images/VideoImage.png";
import playBtn from "../../../assets/icons/PlayButton.svg";
import imageAcadmy from "../../../assets/images/Ellipse.png";
import icon from "./../../../assets/icons/isd.svg";
import icon1 from "../../../assets/icons/icon-1.svg";
import icon2 from "../../../assets/icons/icon-2.svg";
import icon3 from "../../../assets/icons/icon-3.svg";
import icon4 from "../../../assets/icons/icon-4.svg";

import icon5 from "../../../assets/icons/icon-5.svg";

const SingleOfferInfo = () => {
  return (
    <div className={`${classes.mainCard} card-single-offer`}>
      <div className={`${classes.PageContainer} container-offer`}>
        <h2 className="title-offer">THOAO11 </h2>
        <span className="text-content--1"> مفعل </span>
        <p className={`${classes.Info} text-offer`}>
          الملخص Loream Ipsum loream ipsum Loream ipsum lorem lorem lorem lorem
          ipsum
        </p>

        <div className="row g-3 mt-3">
          <div className="col-12 col-md-4">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon">
                <img src={icon} />
                <h4 className="fs-6 fw-medium title-text--1">العربية</h4>
              </div>
              <h5 className="fs-6 fw-medium text-content--1">لغة الفيديو</h5>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon">
                <img src={icon1} />
                <h4 className="fs-6 fw-medium title-text--1">
                  عنوان دورة تدريبية
                </h4>
              </div>
              <h5 className="fs-6 fw-medium text-content--1">
                لغةارتباط الفيديو بمحتوى
              </h5>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon">
                <img src={icon2} />
                <h4 className="fs-6 fw-medium title-text--1">
                  ترجمة الاكاديمية
                </h4>
              </div>
              <h5 className="fs-6 fw-medium text-content--1">الترجمة </h5>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon">
                <img src={icon3} />
                <h4 className="fs-6 fw-medium title-text--1">01:40:50</h4>
              </div>
              <h5 className="fs-6 fw-medium text-content--1">مدة الفيديو </h5>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon">
                <img src={icon4} />
                <h4 className="fs-6 fw-medium title-text--1">
                  الاختبار الاول للتركيز
                </h4>
              </div>
              <h5 className="fs-6 fw-medium text-content--1">
                ارتباط الفيديو باختبار{" "}
              </h5>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon">
                <img src={icon5} />
                <h4 className="fs-6 fw-medium title-text--1">00:16:45</h4>
              </div>
              <h5 className="fs-6 fw-medium text-content--1">
                {" "}
                وقت تفعيل الاختبار نسبة الى الفيديو
              </h5>
            </div>
          </div>
        </div>
        <div className="d-flex button-content--1 justify-content-center gap-2  flex-wrap">
          <div className="addBtn">تحديث المعلومات</div>
          <div className="updateBtn">ازالة الفيديو</div>
        </div>
      </div>
    </div>
  );
};

export default SingleOfferInfo;

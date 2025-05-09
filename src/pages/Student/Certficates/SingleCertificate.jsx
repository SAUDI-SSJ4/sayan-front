import imageAcadmy from "../../../assets/images/Ellipse.png";
import cer from "../../../assets/images/certification.png";
import downloadImage from "../../../assets/images/bi_folder.png";
import classes from "./SingleCertificate.module.scss";
import { useNavigate } from "react-router-dom";

const SingleCertificateComponent = () => {
  const router = useNavigate();
  return (
    <div className={`${classes.mainCard} card-single-certificate`}>
      <div className={classes.ExamInfo}>
        <div className={`${classes.PageContainer} info-card-certification`}>
          <img src={cer} className="w-100 h-100 object-fit-cover" />
          <h3 className="mt-3 title-single--1">شهادة للدورة التدريبية (عنوان الدورة)</h3>
          <h2 className="title-single--2">عنوان الشهادة </h2>
          <span className="text-single--3"> العنوان الفرعي </span>

          <div
            style={{
              gap: "10px",
              alignItems: "center",
              position: "relative",
              display: "flex",
              marginTop: "30px",
            }}
          >
            <img
              src={imageAcadmy}
              style={{
                width: "40px",
                height: "40px",
                position: "absolute",
                right: "0",
                borderRadius: "50%",
              }}
            />
            <div style={{ width: "40px", height: "40px" }}></div>

            <span className="m-0 title-single">اكاديمية ضوء </span>
          </div>
          <div className="d-flex align-items-center mt-3  " style={{gap:'5px'}}>
            <div
              className="d-flex gap-3"
              style={{
                border: "1px solid #EDEFF2 ",
                padding: "18px 10px",
                borderRadius: "10px",
                cursor:'pointer'
              }}
            >
              <img src={downloadImage} style={{width:'46px',height:"46px"}} />
              <h2 className="title-single--3" style={{fontSize:'16px',margin:'0'}}>
              تحميل الشهادة
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCertificateComponent;

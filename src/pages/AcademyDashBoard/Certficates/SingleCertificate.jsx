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
import cer from "../../assets/images/certification.png"
import { useNavigate } from "react-router-dom";
const SingleCertificateComponent = ({classes}) => {
    const router= useNavigate()
    return ( 
      <div className={classes.ExamInfo}>
          <div className={classes.PageContainer}>
            <img src={cer} />
        <h3 className="mt-3">
        شهادة للدورة التدريبية (عنوان الدورة)

        </h3>
        <h2>عنوان الشهادة  </h2>
        <span> العنوان الفرعي    </span>

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
          <CheckCircleIcon sx={{ color: "#0FE8E8" }} />
          تمنح هذه الشهادة بعد اجراء الاختبار الاول واجتياز نسبة الاداء المقبولة (60%)
        </div>
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

          <span className="m-0">اكاديمية ضوء </span>
        </div>
   
        <div className="d-flex justify-content-center gap-2 mt-3">
          <div className="addBtn" >تحديث المعلومات </div>
          <div className="updateBtn" >ازالة الشهادة  </div>
        </div>
      </div>
      </div>
     );
}
 
export default SingleCertificateComponent;
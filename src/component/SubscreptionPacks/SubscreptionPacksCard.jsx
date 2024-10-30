import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
const SubscreptionPacksCard = () => {
  const router = useNavigate();
  return (
    <div
      className="CustomCard  mb-4"
      data-aos="fade-up"
      style={{
        padding: "20px",
        background: "white",
        border: " 1px solid #edeff2",
        borderRadius: "10px"
      }}
    >
      <div className="row g-3 m-auto">
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="NormalCard card-info-sub"
            onClick={() => router("/admin/singleSub")}
          >
            <div className="content-top d-flex align-items-center gap-2">
              <h2 className="title-text--1" style={{ fontSize: "34px" }}>
                {" "}
                70.00 ر.س.
              </h2>
              <p style={{ fontSize: "20px" }}>/ شهر</p>
            </div>
            <h3 className="title-text--1 py-2">الأساسية</h3>
            <p
              className="text-content--1"
              style={{
                paddingBottom: "20px",
                borderBottom: "1px solid #EAEFF4"
              }}
            >
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            </p>
            <div>
              <div className="d-flex text-content--1 gap-2 align-items-center mt-3">
                {" "}
                <CheckCircleIcon sx={{ color: "#0062FF" }} /> Lorem Ipsum{" "}
              </div>
              <div className="d-flex gap-2 text-content--1 align-items-center mt-3">
                {" "}
                <CheckCircleIcon sx={{ color: "#0062FF" }} /> Lorem Ipsum{" "}
              </div>

              <div className="d-flex gap-2 text-content--1 align-items-center mt-3">
                {" "}
                <CheckCircleIcon sx={{ color: "#0062FF" }} /> Lorem Ipsum{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="NormalCard card-info-sub"
            onClick={() => router("/admin/singleSub")}
          >
            <div className="content-top d-flex align-items-center gap-2">
              <h2 className="title-text--1" style={{ fontSize: "34px" }}>
                {" "}
                70.00 ر.س.
              </h2>
              <p style={{ fontSize: "20px" }}>/ شهر</p>
            </div>
            <h3 className="title-text--1 py-2">الأساسية</h3>
            <p
              className="text-content--1"
              style={{
                paddingBottom: "20px",
                borderBottom: "1px solid #EAEFF4"
              }}
            >
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            </p>
            <div>
              <div className="d-flex text-content--1 gap-2 align-items-center mt-3">
                {" "}
                <CheckCircleIcon sx={{ color: "#0062FF" }} /> Lorem Ipsum{" "}
              </div>
              <div className="d-flex gap-2 text-content--1 align-items-center mt-3">
                {" "}
                <CheckCircleIcon sx={{ color: "#0062FF" }} /> Lorem Ipsum{" "}
              </div>

              <div className="d-flex gap-2 text-content--1 align-items-center mt-3">
                {" "}
                <CheckCircleIcon sx={{ color: "#0062FF" }} /> Lorem Ipsum{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="NormalCard card-info-sub"
            onClick={() => router("/admin/singleSub")}
          >
            <div className="content-top d-flex align-items-center gap-2">
              <h2 className="title-text--1" style={{ fontSize: "34px" }}>
                {" "}
                70.00 ر.س.
              </h2>
              <p style={{ fontSize: "20px" }}>/ شهر</p>
            </div>
            <h3 className="title-text--1 py-2">الأساسية</h3>
            <p
              className="text-content--1"
              style={{
                paddingBottom: "20px",
                borderBottom: "1px solid #EAEFF4"
              }}
            >
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            </p>
            <div>
              <div className="d-flex text-content--1 gap-2 align-items-center mt-3">
                {" "}
                <CheckCircleIcon sx={{ color: "#0062FF" }} /> Lorem Ipsum{" "}
              </div>
              <div className="d-flex gap-2 text-content--1 align-items-center mt-3">
                {" "}
                <CheckCircleIcon sx={{ color: "#0062FF" }} /> Lorem Ipsum{" "}
              </div>

              <div className="d-flex gap-2 text-content--1 align-items-center mt-3">
                {" "}
                <CheckCircleIcon sx={{ color: "#0062FF" }} /> Lorem Ipsum{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscreptionPacksCard;

import AcademyHeaderContainer from "../AcademyHeaderContainer/AcademyHeaderContainer";

import AcademyFooter from "../Footer/Footer";
import Phone from "../../../assets/images/fi_597177.png";
import email from "../../../assets/images/email 1.png";
import Layer from "../../../assets/images/Layer 2.png";

const ContactUs4 = () => {
  return (
    <div>
      <AcademyHeaderContainer LayOut2 />

      <div className="container " style={{ marginTop: "100px" }}>
        <div className="d-flex justify-content-center flex-column align-items-center">
          <h2
            className="fs-6 fw-bold title-text--1"
            style={{ color: "#272727", fontSize: "36px" }}
          >
            تواصل معانا .
          </h2>
        </div>
        <div className="container " style={{ marginTop: "100px" }}>
          <div
            className="d-flex justify-content-between "
            style={{
              boxShadow: " 0px 0px 40px 0px rgba(13, 119, 188, 0.05)",
              padding: "32px"
            }}
          >
            <div>
              <div className="d-flex  justify-content-center mt-5">
                <h2    className="fs-6 fw-bold title-text--1" style={{ color: "#272727", fontSize: "24px" }}>
                  تواصل أخرى:
                </h2>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex  align-items-center gap-2">
                    <div className="iconWrapper">
                      <img src={Phone} />
                    </div>
                    <div className="">
                      +966 55 555 5555
                      <p>+966 55 555 5555</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center  gap-2">
                    <div className="iconWrapper">
                      <img src={email} />
                    </div>
                    <div className="">abdou.machffa@gmail.com </div>{" "}
                  </div>{" "}
                  <div className="d-flex align-items-center  gap-2">
                    <div className="iconWrapper">
                      <img src={Layer} />
                    </div>
                    <div className="">برنامج خدمة العملاء الأكثر بساطة </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            </div>
            <div className="contactUsCard p-3" style={{ boxShadow: "none" }}>
              <div className="row g-3 mb-3">
                <div className="col-lg-6">
                  {" "}
                  <input className="form-control" placeholder="اسمك" />
                </div>
                <div className="col-lg-6">
                  {" "}
                  <input className="form-control" placeholder="ايميل" />
                </div>
              </div>
              <input className="form-control" placeholder="عنوان" />
              <textarea
                className="form-control mt-3"
                placeholder="رسالتك"
              ></textarea>
              <div className="d-flex justify-content-center mt-3">
                {" "}
                <button>إرسال </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AcademyFooter />
    </div>
  );
};

export default ContactUs4;

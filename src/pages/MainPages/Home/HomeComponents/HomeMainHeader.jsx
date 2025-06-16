import MainHeader from "../../../../component/MainPages/Header/Header";
import MainHomeBanner from "../../../../assets/images/MainHomeBanner.png";
import Style from "../home.module.scss";
import { useNavigate } from "react-router-dom";

export const HomeMainHeader = () => {
    const navgate = useNavigate();
  return (
    <MainHeader>
      <div className={`${Style.Container} container-header pt-4`}>
        <div className="row align-items-center ">
          <div className="col-lg-5 col-12">
             <div data-aos="fade-left" className={Style.BannerText}>
              <h1>تعليم يفتح افاق المستقبل</h1>
              <p>
                سيان تقدم لكم تجربة تعليمية متطورة معززة بالذكاء الاصطناعي أنشئ منصتك التعليمية لبيع محتواك التعليمي بسهولة.
              </p>
              <div className={Style.BtnContainer} onClick={() => navgate("/student/signin")}>
                <div className={`${Style.Primary} button-header`}>انضم الان </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" className="col-lg-7 col-12">
            <img
              className={`${Style.AnimatedImage} image-anim`}
              style={{ width: "100%" }}
              src={MainHomeBanner}
            />
          </div>
        </div>
      </div>
    </MainHeader>
  );
};

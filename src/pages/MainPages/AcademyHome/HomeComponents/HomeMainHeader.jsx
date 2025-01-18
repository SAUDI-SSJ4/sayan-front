import MainHeader from "../../../../component/MainPages/Header/Header";
import MainHomeBanner from "../../../../assets/images/MainHomeBanner.png";
import Style from "../home.module.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSlider } from "../../../../utils/apis/client/academy";
import { isObject } from "../../../../utils/helpers";


export const HomeMainHeader = () => {
    const navgate = useNavigate();

    const { data: slider = [] } = useQuery({
      queryKey: ["slider"],
      queryFn: () => getSlider(),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 2,
    });

  return (
    <MainHeader>
      <div className={`${Style.Container} container-header pt-4`}>
        <div className="row align-items-center ">
          <div className="col-lg-5 col-12">
             <div data-aos="fade-left" className={`${Style.BannerText} banner-text-header`}>
              <h1>{isObject(slider) ?  slider.title : "تعليم يفتح افاق المستقبل"}</h1>
              <p>
              {isObject(slider) ?  slider.content : "نعمل لبناء تقديم افضل تعليمية, سيان هي مستقبل التعليم تعليمية, سيان هي مستقبل التعليم."}
              </p>
              <div className={Style.BtnContainer} onClick={() => navgate("/signin")}>
                <div className={`${Style.Primary} button-header`}>انضم الان </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" className="col-lg-7 col-12">
            <img
              className={`${Style.AnimatedImage} image-anim`}
              style={{ width: "100%" }}
              src={isObject(slider) ?slider.image : MainHomeBanner}
            />
          </div>
        </div>
      </div>
    </MainHeader>
  );
};

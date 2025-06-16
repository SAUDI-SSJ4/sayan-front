import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import classes from "./Numbers.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import icon1 from "../../../assets/icons/HeroSectionSwiper/icon1.svg";
import icon2 from "../../../assets/icons/HeroSectionSwiper/icon2.svg";
import icon3 from "../../../assets/icons/HeroSectionSwiper/icon3.svg";
import icon4 from "../../../assets/icons/HeroSectionSwiper/icon4.svg";

const Numbers = () => {
  // بيانات الشرائح لتجنب التكرار اليدوي
  const slidesContent = [
    {
      icon: icon2,
      title: "دعم فوري وتفاعلي",
      description: "احصل على إجابات سريعة لاستفساراتك وتفاعل مع محتوى تعليمي ذكي يعزز فهمك للمادة.",
    },
    {
      icon: icon3,
      title: "تقييم دقيق ومتابعة",
      description: "نظام تصحيح آلي للاختبارات يوفر لك تقييمًا فوريًا ويساعدك على تتبع تقدمك الأكاديمي.",
    },
    {
      icon: icon4,
      title: "كفاءة وتعلم أسرع",
      description: "أدوات ذكية تزيد من إنتاجيتك وتساعدك على استيعاب المفاهيم المعقدة بأسلوب مبسط وفعال.",
    },
    {
      icon: icon1,
      title: "تركيز عميق وفهم أشمل",
      description: "استفد من 'سؤال التركيز' لاستكشاف جوانب محددة من المادة وتعميق معرفتك بالمواضيع الأساسية.",
    },
    // تكرار مع محتوى مختلف قليلاً للوصول إلى 8 شرائح
    {
      icon: icon2,
      title: "تواصل مباشر مع الخبراء",
      description: "منصتنا تتيح لك طرح الأسئلة والحصول على توجيه وإرشاد من مدربين متخصصين في مجالاتهم.",
    },
    {
      icon: icon3,
      title: "شهادات إتمام معتمدة",
      description: "بعد إكمال الدورات بنجاح، احصل على شهادات تثبت اكتسابك للمهارات وتعزز سيرتك المهنية.",
    },
    {
      icon: icon4,
      title: "مرونة التعلم الذاتي",
      description: "تعلم بالسرعة التي تناسبك ومن أي مكان، مع سهولة الوصول للمواد التعليمية والموارد في أي وقت.",
    },
    {
      icon: icon1,
      title: "تجارب تعليمية مخصصة",
      description: "نقدم لك مسارات تعليمية تتكيف مع احتياجاتك وأهدافك لضمان أقصى استفادة من رحلتك التعليمية.",
    },
  ];


  return (
    <div className="all-header-content-top">
      <div className={`${classes.Container}`}>
        <h2 className={classes.Title}>
          {/* تم تعديل الـ span الفارغ، إذا كان له غرض تصميمي، يمكن إعادته */}
          <span>هنا تبدأ رحلتك من العلم الى العمل</span>
        </h2>
        <div className={`${classes.SwieperContainer}`} style={{ width: "100%" }}>
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            style={{ width: "100%" }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={15}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              575: {
                slidesPerView: 2,
              },
              991: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {/* استخدام map لإنشاء الشرائح بناءً على البيانات */}
            {slidesContent.map((slide, index) => (
              <SwiperSlide key={index}> {/* استخدام index كمفتاح إذا لم يكن هناك id فريد */}
                <div className={`${classes.SliderCard} card-style-1`}>
                  <div className={classes.Icon}>
                    <img src={slide.icon} alt={slide.title} /> {/* إضافة alt text للأيقونة */}
                  </div>
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Numbers;
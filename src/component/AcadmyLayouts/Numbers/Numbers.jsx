import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/scrollbar"; // إذا لم تكن تستخدم scrollbar بشكل مرئي، يمكن إزالتها
import classes from "./Numbers.module.scss"; // تأكد أن هذا الملف موجود ويحتوي على الأنماط المطلوبة
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules"; // تم إزالة Scrollbar إذا لم تكن مستخدمة
import icon1 from "../../../assets/icons/HeroSectionSwiper/icon1.svg";
import icon2 from "../../../assets/icons/HeroSectionSwiper/icon2.svg";
import icon3 from "../../../assets/icons/HeroSectionSwiper/icon3.svg";
import icon4 from "../../../assets/icons/HeroSectionSwiper/icon4.svg";

const Numbers = () => {
  // بيانات البطاقات الفريدة
  const slideData = [
    {
      icon: icon2,
      title: "دعم فوري وتفاعلي",
      description: "احصل على إجابات سريعة لاستفساراتك وتفاعل مع محتوى تعليمي ذكي يعزز فهمك.",
      key: "slide1"
    },
    {
      icon: icon3,
      title: "تقييم دقيق ومتابعة",
      description: "نظام تصحيح آلي للاختبارات يوفر لك تقييمًا فوريًا ويساعدك على تتبع تقدمك خطوة بخطوة.",
      key: "slide2"
    },
    {
      icon: icon4,
      title: "كفاءة وتعلم أسرع",
      description: "أدوات ذكية تزيد من إنتاجيتك وتساعدك على استيعاب المفاهيم المعقدة بأسلوب مبسط وفعال.",
      key: "slide3"
    },
    {
      icon: icon1,
      title: "تركيز عميق وفهم أشمل",
      description: "استفد من خاصية 'سؤال التركيز' لاستكشاف جوانب محددة من المادة وتعميق معرفتك بالمواضيع الأساسية.",
      key: "slide4"
    },
    // يمكنك إضافة المزيد من البطاقات الفريدة هنا إذا أردت
    // أو تكرارها إذا كان عدد 8 شرائح ضروريًا
    {
      icon: icon2, // تكرار
      title: "تواصل مباشر مع الخبراء",
      description: "منصتنا تتيح لك طرح الأسئلة والحصول على توجيه من مدربين متخصصين في مجالاتهم.",
      key: "slide5"
    },
    {
      icon: icon3, // تكرار
      title: "شهادات إتمام معتمدة",
      description: "بعد إكمال الدورات بنجاح، احصل على شهادات تثبت مهاراتك وتعزز سيرتك الذاتية.",
      key: "slide6"
    },
    {
      icon: icon4, // تكرار
      title: "مرونة التعلم الذاتي",
      description: "تعلم بالسرعة التي تناسبك ومن أي مكان، مع سهولة الوصول للمواد التعليمية في أي وقت.",
      key: "slide7"
    },
    {
      icon: icon1, // تكرار
      title: "تجارب تعليمية مخصصة",
      description: "نقدم لك مسارات تعليمية تتكيف مع احتياجاتك وأهدافك لضمان أقصى استفادة من رحلتك.",
      key: "slide8"
    },
  ];

  return (
    // أفترض أن all-header-content-top هو كلاس موجود ومُعرّف في مكان آخر
    // إذا كان خاصًا بهذا المكون، يمكن دمجه أو تعريفه في Numbers.module.scss
    <div className="all-header-content-top py-12 md:py-16 bg-gray-50"> {/* إضافة خلفية وحشو */}
      <div className={`${classes.Container} container mx-auto px-4`}> {/* استخدام container من Tailwind للتحكم في العرض */}
        <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-10 md:mb-12"
            // يمكنك استخدام لون من الثيم هنا إذا أردت، مثال:
            // style={{ color: 'var(--academy-primary-color)' }}
            style={{ color: '#2c3e50' }} // لون داكن للنص
        >
            هنا تبدأ رحلتك من العلم إلى العمل
        </h2>
        <div className={`${classes.SwieperContainer}`}> {/* style={{ width: "100%" }} ليست ضرورية عادةً */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]} // تم إزالة Scrollbar
            autoplay={{
              delay: 3000, // زيادة طفيفة في التأخير
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true} // يمكن جعلها false إذا كان لديك 4 شرائح فريدة فقط ولا تريد تكرار لا نهائي
            spaceBetween={20} // زيادة المسافة قليلاً
            pagination={{ clickable: true, el: '.custom-swiper-pagination' }} // استخدام pagination مخصص
            navigation={true} // تفعيل أزرار التنقل
            // A11y لـ accessibility
            a11y={{
              prevSlideMessage: 'الشريحة السابقة',
              nextSlideMessage: 'الشريحة التالية',
              paginationBulletMessage: 'اذهب إلى الشريحة {{index}}',
            }}
            breakpoints={{
              0: { // Mobile
                slidesPerView: 1,
                spaceBetween: 15,
              },
              575: { // Small tablets
                slidesPerView: 2,
                spaceBetween: 20,
              },
              991: { // Tablets and small desktops
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1200: { // Desktops
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="pb-12 md:pb-16" // إضافة padding-bottom للسماح بظهور الترقيم بشكل جيد
          >
            {slideData.map((slide) => (
              <SwiperSlide key={slide.key} className="flex justify-center"> {/* توسيط الشريحة */}
                {/* 
                  `card-style-1` هو كلاس غير معرّف هنا، أفترض أنه موجود في SCSS.
                  تأكد من أن أنماط البطاقة متجاوبة.
                */}
                <div className={`${classes.SliderCard} card-style-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center h-full`}>
                  {/* إضافة h-full لجعل جميع البطاقات بنفس الارتفاع إذا كانت في نفس الصف */}
                  <div className={`${classes.Icon} mb-5 w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100`}> {/* تعديل أيقونة */}
                    <img src={slide.icon} alt={slide.title} className="w-8 h-8" /> {/* حجم مناسب للأيقونة */}
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#3b4a61' }}> {/* عنوان البطاقة */}
                    {slide.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed"> {/* وصف البطاقة */}
                    {slide.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
            {/* عنصر مخصص للترقيم إذا أردت تصميمه بشكل مختلف */}
            <div className="custom-swiper-pagination text-center mt-8"></div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Numbers;
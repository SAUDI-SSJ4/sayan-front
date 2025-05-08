import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "./Accordion";
import { getFAQ } from "../../../utils/apis/client";
import { useQuery } from "@tanstack/react-query";
import { MainSpinner } from "../../UI/MainSpinner";
import { isEmptyArray } from "formik";
import { isNotEmpty } from "../../../utils/helpers";

const FAQ = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (_, isExpanded) => setExpanded(isExpanded ? panel : false);

  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["getFAQ"],
  //   queryFn: async () => {
  //     const {data: response} = await getFAQ();
  //     return response.data;
  //   },
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   cacheTime: 1000,
  // });

  // console.log(data)

  const isLoading = false;
  const data = [
    {
      title: "كيف يمكنني إنشاء أكاديميتي الخاصة على منصة سيان؟",
      content: "يمكنك إنشاء أكاديميتك بسهولة من خلال التسجيل على المنصة، ثم استخدام أدواتنا الذكية لبناء وتصميم المواد التعليمية التفاعلية. نوفر لك كل ما تحتاجه لإطلاق أكاديميتك باحترافية.",
    },
    {
      title: "ما نوع المحتوى الذي يمكنني تقديمه عبر أكاديميتي؟",
      content: "يمكنك تقديم الدورات المسجلة والدورات التفاعلية، الدورات المباشرة، الملفات الرقمية القابلة للتحميل، والاختبارات التفاعلية.",
    },
    {
      title: "هل تقدم المنصة شهادات معتمدة؟",
      content: "تقدم منصة سيان شهادات حضور للطالب بعد اتمامه كافة متطلبات الدورة",
    },
    {
      title: "هل توجد عمولة على مبيعات الدورات؟",
      content: "نعم، تأخذ سيان عمولة ثابتة 10% من كل عملية شراء وقريبا سوف نطلق باقة مدفوعة لا يوجد بها استقطاع عمولات",
    },
    {
      title: "كيف أقدر اسحب ارباحي من منصة سيان",
      content: "تستطيع سحب ارباحك عن طريق صفحة اتباع الخطوات في صفحة المحفظة وسوف تستغرق عادة 7 أيام عمل لسحب الارباح",
    }
  ];

  return (
    <div className="CustomContainer" style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <h3
            style={{
              fontFamily: " Noto Kufi Arabic",
              fontSize: "60px",
              fontWeight: 700,
              lineHeight: "72px",
              textAlign: "right",
            }}
          >
            الأسئلة الشائعة <span style={{ color: "#0062FF" }}>؟</span>
          </h3>
        </div>

        <div data-aos="fade-up" data-aos-delay="100" className="col-lg-8 col-md-12">
          {isLoading ? (
            <MainSpinner />
          ) : (
            isNotEmpty(data) &&
            data.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <p className="faq-question">{faq.title}</p>
                </AccordionSummary>
                <AccordionDetails>
                  <p className="faq-answer mbb-0">{faq.content}</p>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;

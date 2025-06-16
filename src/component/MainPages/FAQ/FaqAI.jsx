import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "./Accordion";
import { getFAQ } from "../../../utils/apis/client";
import { useQuery } from "@tanstack/react-query";
import { MainSpinner } from "../../UI/MainSpinner";
import { isEmptyArray } from "formik";
import { isNotEmpty } from "../../../utils/helpers";

const FaqAI = () => {
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
      title: "كيف يمكنني استخدام أدوات الذكاء الاصطناعي في منصة سيان؟",
      content: "تصحيح الاختبارات تلقائيًا، إنشاء اختبارات مخصصة، والإجابة على أسئلة الطلاب بشكل مباشر.",
    },
    {
      title: "هل يمكنني إنشاء اختبارات تفاعلية باستخدام الذكاء الاصطناعي؟",
      content: "تصحيح الاختبارات تلقائيًا، إنشاء اختبارات تفاعلية، والإجابة على أسئلة الطلاب.",
    },
    {
      title: "هل أحتاج إلى خبرة تقنية لاستخدام أدوات الذكاء الاصطناعي؟",
      content: "لا، الأدوات مصممة لتكون سهلة الاستخدام دون حاجة لخبرة تقنية.",
    },
    {
      title: "هل الذكاء الاصطناعي في سيان يتطور بمرور الوقت؟",
      content: "نعم، يتم تحديثه دوريًا لتحسين الدقة والفاعلية.",
    }
  ];

  return (
    <div className="CustomContainer" style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <h3
            style={{
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

export default FaqAI;

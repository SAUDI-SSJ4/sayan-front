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
      title: "هل لديك اي مشكلة؟",
      content: "يمكنك الاتصال بنا عبر الرسائل الإلكترونية.",
    },
    {
      title: "ما هي مجموعة أحمد باشمّاخ لخدمات الأعمال؟",
      content: "هي مجموعة سعودية تأسست عام 1990م (1411هـ)، تتصدر مجال ريادة الأعمال وتأسيس الشركات، وإدارة الموارد البشرية، ولها خبرة في هذه المجالات تزيد عن ثلاثين عاماً، لهذا يثق الكثير من العملاء من جميع أنحاء المملكة العربية السعودية بهم وبالعمل معهم.",
    },
    {
      title: "ما هي مجموعة أحمد باشمّاخ لخدمات الأعمال؟",
      content: "هي مجموعة سعودية تأسست عام 1990م (1411هـ)، تتصدر مجال ريادة الأعمال وتأسيس الشركات، وإدارة الموارد البشرية، ولها خبرة في هذه المجالات تزيد عن ثلاثين عاماً، لهذا يثق الكثير من العملاء من جميع أنحاء المملكة العربية السعودية بهم وبالعمل معهم.",
    },
    {
      title: "هل تمنحون شهادات عند إكمال الدورات في منصة سيان؟",
      content: "هي مجموعة سعودية تأسست عام 1990م (1411هـ)، تتصدر مجال ريادة الأعمال وتأسيس الشركات، وإدارة الموارد البشرية، ولها خبرة في هذه المجالات تزيد عن ثلاثين عاماً، لهذا يثق الكثير من العملاء من جميع أنحاء المملكة العربية السعودية بهم وبالعمل معهم.",
    },
    {
      title: "كيف يمكنني التسجيل في منصة سيان؟",
      content: "هي مجموعة سعودية تأسست عام 1990م (1411هـ)، تتصدر مجال ريادة الأعمال وتأسيس الشركات، وإدارة الموارد البشرية، ولها خبرة في هذه المجالات تزيد عن ثلاثين عاماً، لهذا يثق الكثير من العملاء من جميع أنحاء المملكة العربية السعودية بهم وبالعمل معهم.",
    },
    {
      title: "هل يمكنني الإنسحاب من دورة قمت بالتسجيل بها؟",
      content: "هي مجموعة سعودية تأسست عام 1990م (1411هـ)، تتصدر مجال ريادة الأعمال وتأسيس الشركات، وإدارة الموارد البشرية، ولها خبرة في هذه المجالات تزيد عن ثلاثين عاماً، لهذا يثق الكثير من العملاء من جميع أنحاء المملكة العربية السعودية بهم وبالعمل معهم.",
    },
    {
      title: "ماذا يتيح لي الالتحاق في دورة داخل المنصة؟",
      content: "هي مجموعة سعودية تأسست عام 1990م (1411هـ)، تتصدر مجال ريادة الأعمال وتأسيس الشركات، وإدارة الموارد البشرية، ولها خبرة في هذه المجالات تزيد عن ثلاثين عاماً، لهذا يثق الكثير من العملاء من جميع أنحاء المملكة العربية السعودية بهم وبالعمل معهم.",
    },
    {
      title: "كيف يمكنني الإلتحاق في دورة معينة؟",
      content: "هي مجموعة سعودية تأسست عام 1990م (1411هـ)، تتصدر مجال ريادة الأعمال وتأسيس الشركات، وإدارة الموارد البشرية، ولها خبرة في هذه المجالات تزيد عن ثلاثين عاماً، لهذا يثق الكثير من العملاء من جميع أنحاء المملكة العربية السعودية بهم وبالعمل معهم.",
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

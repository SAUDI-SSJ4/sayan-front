import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `none`,
  boxShadow: "0px 0px 25px 0px rgba(0, 60, 86, 0.05)",
  marginBottom: "20px",
  padding: "30px",
  borderRadius: "20px",

  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <div
        className="IconCricle"
        style={{
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          backgroundColor: "#F7F7FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ExpandMoreIcon
          sx={{
            fontSize: "2rem",
            color: "white",
            background: props.academySettings.secondary_color,
            borderRadius: "50%",
            width: "auto",
            height: "auto",
          }}
        />
      </div>
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "white",
  border: "none",
  fontSize: "22px",
  color: "#292D32",
  fontWeight: "800",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded .IconCricle": {
    backgroundColor: "#DF932D !important",
    color: "white !important",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
const FAQ = ({ faqs, academySettings }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div id="faqs" className="container mt-5">
      <div className="row g-3">
        <div className="col-lg-4 col-md-12">
          <h3
            style={{
              fontSize: "60px",
              fontWeight: "700",
              color: "#272727",
              lineHeight: "60px",
            }}
            className="text-content-faq"
          >
            الأسئلة الشائعة{" "}
            <span style={{ color: academySettings.secondary_color }}>؟</span>
          </h3>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="col-lg-8 col-md-12"
        >
          {faqs?.map((e, i) => {
            return (
              <Accordion
                key={i}
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  academySettings={academySettings}
                >
                  <p
                    style={{
                      fontSize: "22px",
                      color: "#292D32",
                      fontWeight: "800",
                    }}
                    className="fs-6 fw-bold title-text--1"
                  >
                    {e.question}
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#585C61",
                      fontWeight: "400",
                      lineHeight: "1.8",
                    }}
                    className="fs-6 fw-medium text-content--1"
                  >
                    {e.answer}
                  </p>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;

import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: 'none',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
  marginBottom: '16px',
  padding: '25px',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
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
    <div 
      id="faqs" 
      className="container"
      style={{ margin: '50px auto 0 auto' }}
    >
      <div 
        className="row g-4" 
        style={{ margin: '50px 0' }}
      >
        <div className="col-lg-4 col-md-12">
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#272727',
              lineHeight: '1.2',
              marginBottom: '30px'
            }}
            className="text-content-faq"
          >
            الأسئلة
            <br />
            الشائعة{' '}
            <span style={{ color: academySettings.secondary_color }}>؟</span>
          </h1>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="col-lg-8 col-md-12"
        >
          {faqs?.map((e, i) => (
            <Accordion
              key={i}
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}
            >
              <AccordionSummary
                aria-controls={`panel${i}d-content`}
                id={`panel${i}d-header`}
                academySettings={academySettings}
              >
                <p
                  style={{
                    fontSize: '18px',
                    color: '#292D32',
                    fontWeight: '700',
                    margin: 0
                  }}
                  className="title-text--1"
                >
                  {e.question}
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <p
                  style={{
                    fontSize: '16px',
                    color: '#585C61',
                    fontWeight: '500',
                    lineHeight: '1.7',
                    margin: '10px 0 0'
                  }}
                  className="text-content--1"
                >
                  {e.answer}
                </p>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
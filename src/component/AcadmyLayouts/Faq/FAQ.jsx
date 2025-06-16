import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography, Container } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme, academySettings }) => ({
  border: 'none',
  boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.06)',
  marginBottom: '20px',
  padding: '24px 28px',
  borderRadius: '20px',
  backgroundColor: '#ffffff',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  position: 'relative',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.12)',
  },
  
  '&.Mui-expanded': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.15)',
  },

  '&:not(:last-child)': {
    borderBottom: 0,
  },
  
  '&::after': {
    display: 'none',
  },
  
  [theme.breakpoints.down('md')]: {
    padding: '20px 24px',
    marginBottom: '16px',
    borderRadius: '16px',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <Box
        sx={{
          borderRadius: "50%",
          width: { xs: "40px", md: "44px" },
          height: { xs: "40px", md: "44px" },
          backgroundColor: "#F8FAFC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: 'all 0.3s ease',
          border: `2px solid ${props.academySettings?.secondary_color || '#DF932D'}20`,
        }}
      >
        <ExpandMoreIcon
          sx={{
            fontSize: { xs: "1.5rem", md: "1.75rem" },
            color: props.academySettings?.secondary_color || '#DF932D',
            transition: 'all 0.3s ease',
          }}
        />
      </Box>
    }
    {...props}
  />
))(({ theme, academySettings }) => ({
  backgroundColor: "transparent",
  border: "none",
  minHeight: 'auto',
  padding: 0,
  
  "& .MuiAccordionSummary-expandIconWrapper": {
    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
    "& > div": {
      backgroundColor: `${academySettings?.secondary_color || '#DF932D'} !important`,
      border: `2px solid ${academySettings?.secondary_color || '#DF932D'} !important`,
      "& svg": {
        color: "white !important",
      },
    },
  },
  
  "& .MuiAccordionSummary-content": {
    margin: 0,
    marginRight: theme.spacing(2),
    alignItems: 'center',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '0 0 8px 0',
  borderTop: "none",
  marginTop: '16px',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  
  [theme.breakpoints.down('md')]: {
    padding: '0 16px',
  },
}));

// مكون منفصل للأيقونة
const ExpandIcon = ({ academySettings }) => (
  <Box
    sx={{
      borderRadius: "50%",
      width: { xs: "40px", md: "44px" },
      height: { xs: "40px", md: "44px" },
      backgroundColor: "#F8FAFC",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: 'all 0.3s ease',
      border: `2px solid ${academySettings?.secondary_color || '#DF932D'}20`,
    }}
  >
    <ExpandMoreIcon
      sx={{
        fontSize: { xs: "1.5rem", md: "1.75rem" },
        color: academySettings?.secondary_color || '#DF932D',
        transition: 'all 0.3s ease',
      }}
    />
  </Box>
);

const FAQ = ({ faqs, academySettings }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box 
      id="faqs" 
      sx={{ 
        py: { xs: 6, md: 8 },
        backgroundColor: '#FAFBFC',
        minHeight: '60vh',
      }}
    >
      <StyledContainer>
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '350px 1fr' },
            gap: { xs: 4, lg: 6 },
            alignItems: 'start',
          }}
        >
          {/* العنوان */}
          <Box sx={{ position: { lg: 'sticky' }, top: { lg: '100px' } }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: '2.0rem',
                fontWeight: 800,
                color: '#1F2937',
                lineHeight: 1.2,
                textAlign: { xs: 'center', lg: 'right' },
                mb: { xs: 2, lg: 0 },
              }}
            >
              الأسئلة
              <br />
              الشائعة{' '}
              <Box 
                component="span" 
                sx={{ 
                  color: academySettings?.secondary_color || '#DF932D',
                  display: 'inline-block',
                  transform: 'scale(1.2)',
                }}
              >
                ؟
              </Box>
            </Typography>
            
            <Typography
              sx={{
                fontSize: { xs: '14px', md: '16px' },
                color: '#6B7280',
                fontWeight: 500,
                mt: 2,
                textAlign: { xs: 'center', lg: 'right' },
                display: { xs: 'none', lg: 'block' },
              }}
            >
              إجابات شاملة على أكثر الأسئلة تكراراً
            </Typography>
          </Box>

          {/* الأسئلة */}
          <Box>
            {faqs?.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                academySettings={academySettings}
              >
                <AccordionSummary
                  expandIcon={<ExpandIcon academySettings={academySettings} />}
                  aria-controls={`panel${index}d-content`}
                  id={`panel${index}d-header`}
                  academySettings={academySettings}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '16px', md: '18px' },
                      color: '#1F2937',
                      fontWeight: 700,
                      lineHeight: 1.4,
                      textAlign: 'right',
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                
                <AccordionDetails>
                  <Typography
                    sx={{
                      fontSize: { xs: '14px', md: '16px' },
                      color: '#6B7280',
                      fontWeight: 500,
                      lineHeight: 1.7,
                      textAlign: 'right',
                      pr: { xs: 0, md: 1 },
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </StyledContainer>
    </Box>
  );
};

export default FAQ;
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Accordion = styled((props) => (
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

export const AccordionSummary = styled((props) => (
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
        <ExpandMoreIcon sx={{ fontSize: "2rem" }} />
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
    backgroundColor: "#0062FF !important",
    color: "white !important",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

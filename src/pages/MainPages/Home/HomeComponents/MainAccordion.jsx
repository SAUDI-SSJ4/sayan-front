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

  borderRadius: "20px",

  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: "2rem" }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: "white",
  border: "none",
  borderTop: "1px solid #EDEFF2",
  marginTop: "10px",
  paddingTop: "10px",
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
function valuetext(value) {
  return `${value}°C`;
}

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

import * as React from "react";
import { styled } from "@mui/material/styles";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import icon from "./../../assets/icons/icon4.svg";
import icon1 from "./../../assets/icons/icon5.svg";
import icon2 from "./../../assets/icons/icon6.svg";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  padding: "20px",
  marginTop: "20px",
  borderRadius: "18px",
  border: "1px solid #EDEFF2",
  transition: "0.4s",
  background: "#FFF",
  fontFamily: "'Readex Pro', sans-serif !important",
  "&:not(:last-child)": {},
  "&:before": {
    display: "none"
  },
  "&.Mui-expanded": {
    border: "1px solid #2C00E5"
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <div>
        <ArrowBackIosNewIcon />
      </div>
    }
    {...props}
  />
))(({ theme }) => ({
  border: "none !important",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-90deg)",
    display: "flex",

    border: "1px #EDEFF2 solid",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",

    color: "white",
    background: "#2C00E5"
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    display: "flex",

    border: "1px #EDEFF2 solid",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    transition: "0.4s",
    height: "40px"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "none !important"
}));

export default function ShowExam({ wrong }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="all-exams-show">
      {wrong && (
        <div className="row g-3 mb-3">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon">
                <img src={icon1} />
                <h4 className="fs-6 fw-medium">محمد </h4>
              </div>
              <h5 className="fs-6 fw-medium"> اسم الطالب </h5>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon">
                <img src={icon2} />
                <h4 className="fs-6 fw-medium"> 4 </h4>
              </div>
              <h5 className="fs-6 fw-medium">عدد الاجوبة الصحيحة</h5>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="VideoCard h-100">
              <div className="VideoCardIcon">
                <img src={icon} />
                <h4 className="fs-6 fw-medium">1 </h4>
              </div>
              <h5 className="fs-6 fw-medium">عدد الاجوبة الخاطئة </h5>
            </div>
          </div>
        </div>
      )}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            <h2 style={{ fontSize: "18px", color: "2B3674" }}>
              عنوان السؤال الاول؟
            </h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <div
              style={{
                borderRadius: "8px",
                border: "1px solid #EDEFF2",
                padding: "10px ",
                width: "100%",
                marginTop: "20px"
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio sx={{ color: "#2C00E5 !important" }} />}
                label="الاجابة الاولى"
              />
            </div>
            <div
              style={{
                borderRadius: "8px",
                border: "1px solid #EDEFF2",
                padding: "10px ",
                width: "100%",
                marginTop: "20px"
              }}
            >
              <FormControlLabel
                value="1"
                control={<Radio sx={{ color: "#2C00E5 !important" }} />}
                label="الاجابة الثانية"
              />
            </div>
            <div
              style={{
                borderRadius: "8px",
                border: "1px solid #EDEFF2",
                padding: "10px ",
                width: "100%",
                marginTop: "20px"
              }}
            >
              <FormControlLabel
                value="2"
                control={<Radio sx={{ color: "#2C00E5 !important" }} />}
                label="الاجابة الثانية"
              />
            </div>
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            <h2 style={{ fontSize: "18px", color: "2B3674" }}>
              عنوان السؤال الثاني؟
            </h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <div
              style={{
                borderRadius: "8px",
                border: "1px solid #EDEFF2",
                padding: "10px ",
                width: "100%",
                marginTop: "20px"
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio sx={{ color: "#2C00E5 !important" }} />}
                label="الاجابة الاولى"
              />
            </div>
            <div
              style={{
                borderRadius: "8px",
                border: "1px solid #EDEFF2",
                padding: "10px ",
                width: "100%",
                marginTop: "20px"
              }}
            >
              <FormControlLabel
                value="1"
                control={<Radio sx={{ color: "#2C00E5 !important" }} />}
                label="الاجابة الثانية"
              />
            </div>
            <div
              style={{
                borderRadius: "8px",
                border: "1px solid #EDEFF2",
                padding: "10px ",
                width: "100%",
                marginTop: "20px"
              }}
            >
              <FormControlLabel
                value="2"
                control={<Radio sx={{ color: "#2C00E5 !important" }} />}
                label="الاجابة الثانية"
              />
            </div>
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={wrong && { borderColor: "red !important" }}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            <h2 style={{ fontSize: "18px", color: "2B3674" }}>
              عنوان السؤال الثالث؟
            </h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <div
              style={{
                borderRadius: "8px",
                border: "1px solid #EDEFF2",
                padding: "10px ",
                width: "100%",
                marginTop: "20px"
              }}
            >
              <FormControlLabel
                checked={wrong}
                value="female"
                control={<Radio sx={{ color: "#2C00E5 !important" }} />}
                label="الاجابة الاولى"
              />
            </div>
            <div
              style={{
                borderRadius: "8px",
                border: "1px solid #EDEFF2",
                padding: "10px ",
                width: "100%",
                marginTop: "20px"
              }}
            >
              <FormControlLabel
                checked={wrong}
                value="1"
                control={
                  <Radio
                    sx={
                      wrong
                        ? { color: "red !important" }
                        : { color: "#2C00E5 !important" }
                    }
                  />
                }
                label="الاجابة الثانية"
              />
            </div>
            <div
              style={{
                borderRadius: "8px",
                border: "1px solid #EDEFF2",
                padding: "10px ",
                width: "100%",
                marginTop: "20px"
              }}
            >
              <FormControlLabel
                value="2"
                control={<Radio sx={{ color: "#2C00E5 !important" }} />}
                label="الاجابة الثانية"
              />
            </div>
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
      <div className="button-content--1 d-flex justify-content-center gap-2 mt-3">
        <div
          className="addBtn"
          onClick={() => router("/admin/SingleExam/exam/ShowExam")}
        >
          حفظ التغييرات{" "}
        </div>
      </div>
    </div>
  );
}

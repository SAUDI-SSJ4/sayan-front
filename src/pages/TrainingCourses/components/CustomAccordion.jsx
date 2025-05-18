import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomAccordion = ({
  data = [],
  renderSummary,
  renderDetails,
  onPanelChange,
  defaultExpanded = null,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
    if (onPanelChange) onPanelChange(panel, isExpanded);
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "linear-gradient(145deg, #f6f8fc, #ffffff)",
        borderRadius: "25px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
      }}
    >
      {data.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          style={{
            border: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
            marginBottom: "20px",
            borderRadius: "20px",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          sx={{
            boxShadow: "none",
            "&:before": {
              display: "none",
            },
            "&:hover": {
              transform: "translateY(-2px)",
            },
            "&.Mui-expanded": {
              margin: "10px 0",
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{
                  transform:
                    expanded === `panel${index}`
                      ? "rotate(-180deg)"
                      : "rotate(0deg)",
                  transition: "transform 0.4s ease",
                  backgroundColor:
                    expanded === `panel${index}` ? "#2563eb" : "#0e85ff",
                  color: "white",
                  padding: "5px",
                  borderRadius: "50%",
                  fontSize: "28px",
                  boxShadow: "0 4px 12px rgba(14, 133, 255, 0.2)",
                }}
              />
            }
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            style={{
              backgroundColor:
                expanded === `panel${index}` ? "#f8faff" : "white",
              border: "1px solid #e5e9f2",
              borderRadius: "20px",
              padding: "20px",
              transition: "all 0.3s ease",
              boxShadow:
                expanded === `panel${index}`
                  ? "0 10px 25px rgba(14, 133, 255, 0.1)"
                  : "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#f8faff",
              },
              "& .MuiAccordionSummary-content": {
                margin: "0",
                transition: "all 0.3s ease",
              },
            }}
          >
            {renderSummary(item, index)}
          </AccordionSummary>
          <AccordionDetails
            style={{
              padding: "20px 25px",
              paddingRight: "30px",
              borderRight: "3px solid #0e85ff",
              marginRight: "20px",
              marginTop: "10px",
              backgroundColor: "#ffffff",
              borderRadius: "15px",
              boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.05)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                zIndex: "1",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "-15px",
                  right: "-33px",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#0e85ff",
                  borderRadius: "50%",
                },
              }}
            >
              {renderDetails(item, index)}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CustomAccordion;

import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
    <div style={{ padding: '100px' }}>
      {data.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          style={{
            border: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
            marginBottom: "10px",
            borderRadius: "17px",

          }}
          sx={{
            boxShadow: "none",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon/>
            }
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            style={{
              backgroundColor: "white",
              border: "1px solid #eee",
              borderRadius: "17px",
              padding: "15px",
              boxShadow: "none",
            }}
          >
            {renderSummary(item, index)}
          </AccordionSummary>
          <AccordionDetails
            style={{
              padding: "5px",
              paddingRight: "10px",
              borderRight: "2px solid #eee",
            }}
          >
            {renderDetails(item, index)}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CustomAccordion;

import { ContentCopy } from '@mui/icons-material';
import React, { useState } from 'react';
import { Button, InputGroup, Input } from 'rsuite';
import styled from 'styled-components';


const StyledLabel = styled.label`
  color: #2B3674;
  font-weight: bold;
  display: inline-block;
  width: fit-content;
  font-size: 14px;
  padding-top: 10px;`
  const StyledError = styled.p`
  color: #FF4747;
  font-size: 14px;
  padding-right: 10px;
`;
const ColorPickerWithPreview = ({ label, name, value, onChange,error }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
   <div>
    <StyledLabel htmlFor={name}>{label}:</StyledLabel>
    <div className="d-flex flex-row align-items-center gap-2">
      <Input
        type="color"
        style={{ height: "40px", width: "40px", border: "1px solid #777", padding:'0px', borderRadius: "5px" }}
        value={value}
        onChange={onChange}
      />
      <InputGroup>
        <Input disabled value={value} />
        <InputGroup.Button onClick={handleCopy}>
         {copied ? 'Copied!' : 'Copy'}
          <ContentCopy  style={{ width: "1.2rem", height: "1.2rem" }} />
        </InputGroup.Button>
      </InputGroup>
    </div>
    {error && <StyledError>{error}</StyledError>}
  </div>
);
};

export default ColorPickerWithPreview;
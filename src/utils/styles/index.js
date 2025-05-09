import styled from "styled-components";
import colors from "./colors";

export const JustifyContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor || colors.primary};
  color: white;
  padding: 16px 50px;
  border-radius: 6px;
  border: none;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${colors.primaryHover};
  }
  span {
    margin-left: 0.5rem;
  }
`;

export const Spinner = styled.div`
  font-size: 15px;
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.spinnerColor};
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ButtonSoon = styled.p`
position: absolute;
top:-14px;
right: 5px;
max-width: 60px;
  border-radius: 20px;
  background: rgba(255, 71, 71, 0.07);
  padding: 4px 20px;
  color: #ff4747;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
`;


export const ImageInput = styled.input`
 display: none;
  `;

export const DisplayImage = styled.img`
  max-width: 366px;
  max-height: 212px;
  object-fit: contain;
  margin-top: 10px;
`;

export const SetImageButton = styled.div`
  color: ${colors.primaryContrast};
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid ${colors.primaryContrast};
  padding: 15px 20px;
  transition: 0.4s;
  &:hover {
    background-color: ${colors.primaryContrast};
    color: white !important;
    text-decoration: none;
  }
`;

export const ContinueButton = styled.button`
  background-color: ${(props) => props.bgColor || colors.primary};
  padding: 10px 15px;
  width: ${(props) => props.width || "150px"};
  color: ${(props) => props.color || "#fff"};
  font-size: 18px;
  border-radius: 7px;
  gap: 5px;
`;

export const ProgsaveButton = styled.button`
background-color: transparent;
padding: 10px 15px;
width: 150px;
color: ${colors.primaryContrast};
border: 1px solid ${colors.primaryContrast};
font-size: 18px;
border-radius: 7px;
`

export const ChapterTitle = styled.p`
    text-align: end;
    color: #00951b;
    cursor: pointer;
`

export const Text = styled.p`
  color: ${(props) => props.color || "#000"};
  font-size: ${(props) => props.size || `16px`};
  font-weight: ${(props) => props.weight || 500};
`
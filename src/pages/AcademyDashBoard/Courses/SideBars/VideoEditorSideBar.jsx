import React, { useState } from "react";
import { Slider, Button, Dropdown, Input, IconButton } from "rsuite";
import { Container, Row, Col, Form } from "react-bootstrap";
import ColorPickerWithPreview from "../../../../component/UI/Inputs/ColorPicker";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";

// Font options for the dropdown
const fontOptions = ["Arial", "Helvetica", "Times New Roman", "Courier New", "Verdana"];

const VideoEditorSideBar = () => {
  // State for text settings
  const [textColor, setTextColor] = useState("#000000");
  const [borderColor, setBorderColor] = useState("#000000");
  const [textSize, setTextSize] = useState(16);
  const [fontType, setFontType] = useState(fontOptions[0]);
  const [alignment, setAlignment] = useState("left");

  // State for video settings
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(100);
  const [videoURL, setVideoURL] = useState(null);

  // Handle video file change (for preview)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoURL(URL.createObjectURL(file));
    }
  };

  // Apply text alignment
  const handleAlignment = (align) => {
    setAlignment(align);
  };

  return (
    <div style={{width: "300px"}}>
      <Container  fluid>
        {/* Text Settings Section */}
        <Row>
          <Col md={12}>
            <h5>إعدادات النص</h5>
            <Form>
              {/* Text Color */}
              <Form.Group controlId="textColor">
                <ColorPickerWithPreview label={"لون النص"} name={"لون النص"} error={""} value={textColor} onChange={setTextColor} />
              </Form.Group>

              {/* Border Color */}
              <Form.Group controlId="borderColor">
                <ColorPickerWithPreview label={"لون الحدود"} name={"لون الحدود"} error={""} value={borderColor} onChange={setBorderColor} />
              </Form.Group>

              {/* Text Size */}
              <Form.Group controlId="textSize" style={{ marginTop: "20px" }}>
                <Form.Label>حجم النص</Form.Label>
                <Input type="number" value={textSize} onChange={(e) => setTextSize(e.target.value)} />

              </Form.Group>

              {/* Font Type */}
              <Form.Group controlId="fontType"style={{ marginTop: "20px",  }} className="d-flex flex-column align-items-start gap-2 w-100">
                <Form.Label>نوع الخط</Form.Label>
                <Dropdown 
                  className="w-100"
                  title={fontType}
                  onSelect={setFontType}
                  items={fontOptions}
                />
              </Form.Group>

              {/* Text Alignment */}
               <Form.Group controlId="alignment" style={{marginTop: "20px"}}>
                  <Form.Label>المحاذاة</Form.Label>
              
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      icon={<AiOutlineAlignRight />}
                      appearance={
                        alignment === "right" ? "primary" : "default"
                      }
                      onClick={() => handleAlignment("right")}
                    />
                    <IconButton
                      icon={<AiOutlineAlignCenter />}
                      appearance={
                        alignment === "center" ? "primary" : "default"
                      }
                      onClick={() => handleAlignment("center")}
                    />
                    <IconButton
                      icon={<AiOutlineAlignLeft />}
                      appearance={
                        alignment === "left" ? "primary" : "default"
                      }
                      onClick={() => handleAlignment("left")}
                    />
                  </div>
                </Form.Group>
            </Form>
          </Col>
        </Row>

        {/* Video Settings Section */}
        <Row style={{marginTop: "30px"}}>
          <Col md={12}>
            <h5>إعدادات الفيديو</h5>
            <Form>
             
              {/* Saturation */}
              <Form.Group controlId="saturation" style={{marginTop: "20px"}}>
                <Form.Label>التشبع</Form.Label>
                <Slider
                  value={saturation}
                  min={0}
                  max={200}
                  onChange={setSaturation}
                />
              </Form.Group>

              {/* Lightness */}
              <Form.Group controlId="lightness" style={{marginTop: "20px"}}>
                <Form.Label>السطوع</Form.Label>
                <Slider
                  value={lightness}
                  min={0}
                  max={200}
                  onChange={setLightness}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VideoEditorSideBar;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Loader } from "rsuite";
import { academyAPI } from "../../../utils/apis/client/academy";

export default function Template() {
  const [loading, setLoading] = useState(true);
  const [templateData, setTemplateData] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  // adding colors
  const [primaryColor, setPrimaryColor] = useState(null); // Default blue-500
  const [textColor, setTextColor] = useState(null);
  
  const getTemplateData = async () => {
    try {
      const response = await academyAPI.get("/template");
      setTemplateData(response?.data?.template || []);
      setPrimaryColor(response?.data?.template?.template_primary_color ?? "#000");
      setTextColor(response?.data?.template?.template_text_color ?? "#fff");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
  };

  const handleSave = async () => {
    try {
      await academyAPI.post("/template", {
        template_id: selectedTemplate,
        template_primary_color: primaryColor,
        template_text_color: textColor,
      });
      toast.success("Template saved successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getTemplateData();
    console.log(templateData?.template_primary_color,primaryColor)
  }, []);

  return (
    <div>
      {loading ? (
        <div className=" w-100 vh-100 d-flex justify-content-center align-items-center">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">

<div className="bg-white p-5 rounded-3 shadow-sm">
      <h3 className="h5 fw-semibold mb-4">تخصيص الألوان</h3>
      <div className="mb-4">
        <div className="d-flex align-items-center gap-4 mb-3">
          <label className="min-w-32">لون القالب:</label>
          <div className="d-flex align-items-center gap-2">
          <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={{
                backgroundColor: textColor,
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '40px',
                height: '20px',
              }}
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-4">
          <label className="min-w-32">لون النص:</label>
          <div className="d-flex align-items-center gap-2">
          <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              style={{
                backgroundColor: textColor,
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '40px',
                height: '20px',
              }}
            />
          </div>
        </div>

        {((templateData?.template_primary_color ?? "#000") !== primaryColor || 
  (templateData?.template_text_color ?? "#fff") !== textColor) && (
  <Button
    variant="primary"
    className="mt-3 px-4"
    onClick={handleSave}
  >
    حفظ
  </Button>
)}
      </div>
    </div>




        
        <div className=" bg-white p-5 rounded-3 shadow-sm">


          <Row className="w-50">
            {templateData.map((template) => (
              <Col md={6} key={template.id} className="mb-3">
                <Card
                  className={`h-100 ${
                    selectedTemplate === template.id
                    ? "border-primary bg-primary text-white"
                    : ""
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                  style={{ cursor: "pointer" }}
                  >
                  <Card.Img variant="top" src={template?.image} />
                  <Card.Body>
                    <Card.Title>{template.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {selectedTemplate && (
            <Button
              variant="primary"
              className="mt-3 px-4"
              onClick={handleSave}
              >
              حفظ
            </Button>
          )}
        </div>
      </div>
      )}
    </div>
  );
}

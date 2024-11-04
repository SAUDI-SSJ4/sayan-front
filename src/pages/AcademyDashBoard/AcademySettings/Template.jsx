import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Loader } from "rsuite";
import { academyAPI } from "../../../utils/apis/client/academy";

export default function Template() {
  const [loading, setLoading] = useState(true);
  const [templateData, setTemplateData] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const getTemplateData = async () => {
    try {
      const response = await academyAPI.get("/template");
      setTemplateData(response?.data?.template || []);
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
      });
      toast.success("Template saved successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getTemplateData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className=" w-100 vh-100 d-flex justify-content-center align-items-center">
          <Loader size="lg" />
        </div>
      ) : (
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
      )}
    </div>
  );
}

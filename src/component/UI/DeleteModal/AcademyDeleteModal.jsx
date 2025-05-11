import React from "react";
import { Modal, Button } from "react-bootstrap"; // Ensure you have react-bootstrap installed

const AcademyDeleteModal = ({ show, onClose, onConfirm }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>تأكيد الحذف</Modal.Title>
      </Modal.Header>
      <Modal.Body>هل أنت متأكد أنك تريد حذف هذا العنصر؟</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          إلغاء
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          حذف
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcademyDeleteModal;

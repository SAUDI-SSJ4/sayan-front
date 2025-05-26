import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FiPlus, FiX } from "react-icons/fi";
import { Button as BootButton } from "react-bootstrap";
import { Button } from "@mui/material";
import ChapterForm from "./ChapterForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default function AddNewChapter({ courseId, onAddChapter }) { 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <BootButton
        type="button"
        form="none"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleOpen();
        }}
        style={{
          background: 'linear-gradient(135deg, #0062ff 0%, #4285f4 100%)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: 600,
          border: 'none',
          boxShadow: '0 4px 12px rgba(0, 98, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          minWidth: '180px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #0052cc 0%, #3367d6 100%)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 98, 255, 0.4)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #0062ff 0%, #4285f4 100%)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 98, 255, 0.3)';
          e.currentTarget.style.transform = 'translateY(0px)';
        }}
      >
        <FiPlus size={18} />
        <span>إضافة فصل جديد</span>
      </BootButton>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-end">
            <Button
              variant="text"
              onClick={handleClose}
              className="!min-w-fit"
              sx={{ minWidth: 'auto', padding: '8px' }}
            >
              <FiX size={16} />
            </Button>
          </div>
          <ChapterForm courseId={courseId} />
        </Box>
      </Modal>
    </div>
  );
}

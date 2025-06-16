import * as React from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import { Button as MuiButton } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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

export default function EditChapter({ chapter, courseId }) {
  const [open, setOpen] = React.useState(false);
  
  const handleEditClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MuiButton 
        variant="text" 
        type="button"
        form="none"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleEditClick(e);
        }}
        sx={{
          minWidth: 'auto',
          padding: '8px',
          borderRadius: '50%',
          color: '#5a6a85',
          '&:hover': {
            backgroundColor: 'rgba(0, 98, 255, 0.08)',
            color: '#0062ff'
          }
        }}
      >
        <FiEdit2 size={16} />
      </MuiButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-chapter-modal"
        aria-describedby="edit-chapter-form"
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
          <ChapterForm courseId={courseId} chapter={chapter} onClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
}

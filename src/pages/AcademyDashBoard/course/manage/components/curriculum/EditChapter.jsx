import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Edit2Icon, XIcon } from "lucide-react";
import ChapterForm from "./ChapterForm";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function EditChapter({ chapter, courseId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="text" className="!min-w-10" onClick={handleOpen}>
        <Edit2Icon size={16} />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-end">
            <Button
              variant="light"
              onClick={handleClose}
              className="!min-w-fit"
            >
              <XIcon size={16} />
            </Button>
          </div>
          <ChapterForm chapter={chapter} courseId={courseId} />
        </Box>
      </Modal>
    </>
  );
}

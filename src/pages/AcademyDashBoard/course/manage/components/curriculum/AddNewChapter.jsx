import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "react-bootstrap";
import ChapterForm from "./ChapterForm";

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

export default function AddNewChapter({ courseId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        type="button"
        variant="outline-info"
        className="!flex !items-center justify-center gap-2 h-10 w-36"
        onClick={handleOpen}
      >
        <PlusIcon size={16} />
        <span>اضافة فصل</span>
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
          <ChapterForm courseId={courseId} />
        </Box>
      </Modal>
    </div>
  );
}

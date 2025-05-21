import { Button } from "@mui/material";
import { XIcon } from "lucide-react";

const CurriculumModal = ({ setOpenMenu, children, setCurriculumType }) => {
  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="text"
        className="!min-w-10"
        onClick={() => {
          setOpenMenu(false);
          setCurriculumType(null);
        }}
      >
        <XIcon size={16} />
      </Button>
      {children}
    </div>
  );
};
export default CurriculumModal;

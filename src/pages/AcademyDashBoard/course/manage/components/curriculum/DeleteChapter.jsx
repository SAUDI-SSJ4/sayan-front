import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteChapter } from "../../../../../../utils/apis/client/academy";
import { fetchCurrentCourseSummaryThunk } from "../../../../../../../redux/courses/CourseThunk";
import { Trash2 } from "lucide-react";
import { Button } from "react-bootstrap";

export default function DeleteChapter({ chapterId, courseId }) {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: "لا يمكن التراجع عن هذا الإجراء!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم, احذف",
        cancelButtonText: "لا",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteChapter({ chapterId: id, courseId });
          if (res.status) {
            dispatch(fetchCurrentCourseSummaryThunk(courseId));
          }
        }
      });
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };
  return (
    <Button
      variant="text"
      onClick={() => handleDelete(chapterId)}
      className="text-danger !min-w-10"
    >
      <Trash2 size={16} />
    </Button>
  );
}

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Modal, Button } from 'rsuite';
import { useToast } from '../../utils/hooks/useToast';
import { deleteLessonItemThunk } from '../../../redux/courses/CourseThunk';

export const ConfirmDeleteCourseItem = ({ open, setOpen, courseItem }) => {
    const dispatch = useDispatch();
    const { success, error } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteItem = async () => {
        setIsDeleting(true); // Set loading state
        try {
            const { response } = await dispatch(deleteLessonItemThunk(courseItem)).unwrap();
            if (response?.success)
                success("Item deleted successfully");
            else
                error("Failed to delete item");

        } catch (err) {
            error(err?.message || "An error occurred while deleting the item");
        } finally {
            setIsDeleting(false);
            setOpen(false);
        }
    };

    return (
        <Modal open={open} onClose={() => !isDeleting && setOpen(false)}>
            <Modal.Header className="text-start">
                <Modal.Title>Delete Course Item</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-start">
                Are you sure you want to delete this item?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleDeleteItem}
                    appearance="primary"
                    className="ml-2"
                    loading={isDeleting} // Show a spinner while deleting
                    disabled={isDeleting} // Disable button while deleting
                >
                    Ok
                </Button>
                <Button
                    onClick={() => setOpen(false)}
                    appearance="subtle"
                    disabled={isDeleting} // Disable button while deleting
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

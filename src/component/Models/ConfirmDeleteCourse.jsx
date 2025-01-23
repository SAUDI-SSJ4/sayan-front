import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Modal, Button } from 'rsuite';
import { useToast } from '../../utils/hooks/useToast';
import { deleteCourseById } from '../../utils/apis/client/academy';
import { deleteCourseByIdThunk } from '../../../redux/courses/CourseThunk';

export const ConfirmDeleteCourse = ({ open, setOpen, courseId }) => {
    const dispatch = useDispatch();
    const { success, error } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await dispatch(deleteCourseByIdThunk(courseId)).unwrap();
            console.log(response)
            if (response?.response?.success) {
                success("Course deleted successfully");
            } else {
                error(response?.response?.message || "Failed to delete the course");
            }
        } catch (err) {
            error(err?.message || "An error occurred while deleting the course");
        } finally {
            setIsDeleting(false);
            setOpen(false);
        }
    };


    return (
        <Modal open={open} onClose={() => !isDeleting && setOpen(false)}>
            <Modal.Header className="text-start">
                <Modal.Title>Delete Course</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-start">
                Are you sure you want to delete this change?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleDelete}
                    appearance="primary"
                    className="ml-2"
                    loading={isDeleting}
                    disabled={isDeleting}
                >
                    Ok
                </Button>
                <Button
                    onClick={() => setOpen(false)}
                    appearance="subtle"
                    disabled={isDeleting}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

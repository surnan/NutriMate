//frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx

import './DeleteWorkoutModal.css'
import { useDispatch } from 'react-redux';
import {deleteWorkoutThunkById } from '../../redux/workouts'



const DeleteWorkoutModal = ({ workout, onClose }) => {
    const dispatch = useDispatch();
    const handleDelete = async () => {
        try {
            await dispatch(deleteWorkoutThunkById(workout.id))
            onClose();
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    return (
        <div className="confirmDeleteModal">
            <div className="modalContent">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to remove this spot from the listings?</p>
                <button onClick={handleDelete} className="deleteButton">Yes (Delete Workout)</button>
                <button onClick={onClose} className="cancelButton">No (Keep Workout)</button>
            </div>
        </div>
    );
};

export default DeleteWorkoutModal;

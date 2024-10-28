//frontend/src/components/DeleteReviewModal/DeleteDayLogModal.jsx

import './DeleteGrubModal.css'
import { useDispatch } from 'react-redux';
import {deleteDailyLogsThunkById } from '../../redux/daylogs'



const DeleteWorkoutModal = ({ dayLog, onClose }) => {
    const dispatch = useDispatch();
    const handleDelete = async () => {
        try {
            await dispatch(deleteDailyLogsThunkById(dayLog.id))
            onClose();
        } catch (error) {
            console.error('Error deleting grub:', error);
        }
    };

    return (
        <div className="modal_under_layer">
            <div className="modal_window_all">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to remove this dayLog?</p>
                <button onClick={handleDelete} className="deleteButton">Yes (Delete DayLog)</button>
                <button onClick={onClose} className="cancelButton">No (Keep DayLog)</button>
            </div>
        </div>
    );
};

export default DeleteWorkoutModal;

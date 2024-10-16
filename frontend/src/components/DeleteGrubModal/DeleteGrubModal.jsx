//frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx

import './DeleteGrubModal.css'
import { useDispatch } from 'react-redux';
import {deleteGrubThunkById } from '../../redux/grubs'



const DeleteWorkoutModal = ({ grub, onClose }) => {
    const dispatch = useDispatch();
    const handleDelete = async () => {
        try {
            await dispatch(deleteGrubThunkById(grub.id))
            onClose();
        } catch (error) {
            console.error('Error deleting grub:', error);
        }
    };

    return (
        <div className="modal_btn">
            <div className="modalContent">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to remove this grub from the listings?</p>
                <button onClick={handleDelete} className="deleteButton">Yes (Delete Grub)</button>
                <button onClick={onClose} className="cancelButton">No (Keep Grub)</button>
            </div>
        </div>
    );
};

export default DeleteWorkoutModal;

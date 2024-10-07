//frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx

import './DeleteWeightModal.css'
import { useDispatch } from 'react-redux';
import { deleteWeightThunkById } from '../../redux/weight';




const DeleteWeightModal = ({ weight, onClose }) => {
    // console.log(weight)
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            await dispatch(deleteWeightThunkById(weight.id))
            onClose();
        } catch (error) {
            console.error('Error deleting weight:', error);
        }
    };

    return (
        <div className="confirmDeleteModal">
            <div className="modalContent">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to remove this spot from the listings?</p>
                <button onClick={handleDelete} className="deleteButton">Yes (Delete Review)</button>
                <button onClick={onClose} className="cancelButton">No (Keep Review)</button>
            </div>
        </div>
    );
};

export default DeleteWeightModal;

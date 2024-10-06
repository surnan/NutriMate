//frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx
// import { useDispatch } from 'react-redux';
import './DeleteWeightModal.css'

const DeleteWeightModal = ({ review, onClose }) => {
    // const dispatch = useDispatch();
    console.log(review)
    const handleDelete = async () => {
        try {
            console.log('handleDelete async')
            onClose();
        } catch (error) {
            console.error('Error deleting review:', error);
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

//frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx

import './UpdateDailyModal.css'
import { useDispatch } from 'react-redux';
import { deleteWeightThunkById } from '../../redux/weight';




const UpdateDailyModal = ({ stuff, onClose }) => {
    // const dispatch = useDispatch();

    const handleDelete = async () => {
        console.log("BUTTON PRESSED")
        // try {
        //     await dispatch(deleteWeightThunkById(weight.id))
        //     onClose();
        // } catch (error) {
        //     console.error('Error deleting weight:', error);
        // }
    };


    return (
        <div className="confirmDeleteModal">
            <div className="modalContent">
                <h3>Click to Add:</h3>
                <button onClick={handleDelete} className="deleteButton"
                >
                    <i className="fas fa-trash-alt" /> {/* Icon for delete */}
                    &nbsp;&nbsp;&nbsp;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              Yes (Delete Review)
                </button>
                <button onClick={handleDelete} className="deleteButton"
                >
                    <i class="fa-solid fa-utensils"></i>
                    &nbsp;&nbsp;&nbsp; Yes (Delete Review)
                </button>
                <button onClick={onClose} className="cancelButton"
                >No (Keep Review)</button>
            </div>
        </div>
    );
};

export default UpdateDailyModal;

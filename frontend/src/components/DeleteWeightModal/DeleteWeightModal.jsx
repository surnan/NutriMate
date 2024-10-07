//frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx

import './DeleteWeightModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteWeightThunkById } from '../../redux/weight';




const DeleteWeightModal = ({ weight, onClose }) => {
    // console.log(weight)
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            // console.log('===> weight ==> ', weight)
            // console.log('===> weight.id ==> ', weight.id)
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

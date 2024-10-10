// frontend/src/componenets/WeightPageForm/WeightPageForm.jsx
import "./WorkoutPageForm.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postWorkoutsOneThunk, updateWorkoutsOneThunk } from "../../redux/workouts"
import DeleteWorkoutModal from "../DeleteWorkoutModal";


function WorkoutPageForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { newWorkout, originalData } = location.state || {};

    const [showDeletetModal, setShowDeletetModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [isEditing, setIsEditing] = useState(!originalData);
    // const [clickedSubmitBtn, setClickedSubmitBtn] = useState(false);
    const [errors, setErrors] = useState({});


    const [form, setForm] = useState({
        name: originalData?.name || "",
        description: originalData?.description || '',
        userId: originalData?.userId || 1
    });

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const hasError = () => Object.keys(errors).length !== 0;




    const handleDeleteBtn = () => {
        setSelectedWorkout(originalData);
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedWorkout(null)
        navigate(-1)
    };

    const handleBackBtn = () => { navigate(-1) };

    const handleSubmit = async (e) => {
        if (hasError()){
            return
        }

        e.preventDefault();
        setIsEditing(false)

        const { name, description } = form;
        const body = {
            id: parseInt(originalData?.id),
            name,
            description,
            userId: 1
        }

        try {
            const result = newWorkout
                ? await dispatch(updateWorkoutsOneThunk({ body }))
                : await dispatch(postWorkoutsOneThunk({ body }))
            if (result) { navigate(`/workouts`) }
        } catch (error) {
            console.error('Error adding workout:', error);
        }
    }

    const handleCancelBtn = () => {
        setIsEditing(false)
        setForm({
            name: originalData?.name || "",
            description: originalData?.description || ""
        });
    }

    const handleUpdateBtn = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        // if (clickedSubmitBtn) {
            const newErrors = {};
            const allKeys = ["name", "description"];

            allKeys.forEach((key) => {
                if (!form[key]) {
                    newErrors[key] = `${capitalizeFirstLetter(key)} is required`;
                }
            });
            setErrors(newErrors);
        // }
    }, [form])


    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <h1>WorkoutPageForm.jsx</h1>

            <div className="workoutPageForm_hFlex">
                <button
                    className="back_btn"
                    type="button"
                    onClick={handleBackBtn}
                >
                    BACK
                </button>




                {isEditing ? (
                    <button
                        className="back_btn green"
                        type="button"
                        onClick={handleSubmit}
                        disabled={hasError()}
                    >
                        SAVE
                    </button>
                ) : (
                    <button
                        className="back_btn blue"
                        type="button"
                        onClick={handleUpdateBtn}>
                        UPDATE
                    </button>
                )}
            </div>


            <div className="workout_page_form_grid">
                <label style={{display: 'inline-flex'}}>
                {errors.name && <span style={{ color: 'red' }}>{errors.name}&nbsp;&nbsp;</span>} Name: 
                </label>

                <input
                    type="text"
                    name="name"
                    onChange={updateSetForm}
                    placeholder="Enter name"
                    value={form.name}
                    readOnly={!isEditing}
                />

                <label style={{display: 'inline-flex'}}>
                {errors.description && <span style={{ color: 'red' }}>{errors.description}&nbsp;&nbsp;</span>} Description: 
                </label>
                <textarea
                    maxLength="498"
                    name="description"
                    onChange={updateSetForm}
                    placeholder="Enter description"
                    value={form.description}
                    readOnly={!isEditing}
                />
                {showDeletetModal && (
                    <DeleteWorkoutModal
                        onClose={handleModalClose}
                        onSubmit={handleDeleteBtn}
                        workout={selectedWorkout}
                    />
                )}
            </div>



            <div className="workout_page_btn_grid">
                {originalData && (
                    <button
                        className="back_btn red"
                        type="button"
                        onClick={isEditing ? handleCancelBtn : handleDeleteBtn}
                    >
                        {isEditing ? "CANCEL" : "DELETE"}
                    </button>
                )}
            </div>
        </>
    );
}
export default WorkoutPageForm;
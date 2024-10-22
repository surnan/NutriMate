// frontend/src/componenets/WeightPageForm/WeightPageForm.jsx
import "./WorkoutPageForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postWorkoutsOneThunk, updateWorkoutsOneThunk } from "../../redux/workouts"
import DeleteWorkoutModal from "../DeleteWorkoutModal";


function WorkoutPageForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { newWorkout, currentData } = location.state || {};
    const sessionUser = useSelector((state) => state.session.user);
    const [showDeletetModal, setShowDeletetModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [errors, setErrors] = useState({});
    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const hasError = () => Object.keys(errors).length !== 0;

    const [form, setForm] = useState({
        name: currentData?.name || "",
        description: currentData?.description || '',
        userId: currentData?.userId || sessionUser?.id || 1
    });

    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleBack = () => navigate(-1);

    const handleReset = () => {
        setForm({
            name: currentData?.name || "",
            description: currentData?.description || ""
        });
    }

    const handleSubmitSave = async (e) => {
        if (hasError()) {
            return
        }

        e.preventDefault();
        const { name, description, userId } = form;
        const body = {
            id: parseInt(currentData?.id),
            name,
            description,
            userId
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


    const handleDelete = () => {
        if (!currentData?.id) {
            alert('Can not delete this new record because it has not been saved to database');
            return;
        }
        setSelectedWorkout(currentData);
        setShowDeletetModal(true)
    }

    const handleAddToLog = () => {
        if (!currentData?.id) {
            alert('Workout needs to be saved before adding to DayLog');
            return;
        }
        navigate('/DayLogFormWorkout', { state: { newWorkout: true, currentData: workout } });
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedWorkout(null)
        navigate(-1)
    };

    useEffect(() => {
        const newErrors = {};
        const allKeys = ["name", "description"];

        allKeys.forEach((key) => {
            if (!form[key]) {
                newErrors[key] = `${capitalizeFirstLetter(key)} is required`;
            }
        });
        setErrors(newErrors);
    }, [form])

    return (
        <div className="mainBodyStyle">
            <h1>WorkoutPageForm.jsx</h1>
            <h3 >Email = {sessionUser?.email}</h3>

            {/* TOP BUTTONS */}
            <div className="max_HFlex">
                <button
                    className="blue _button"
                    type="button"
                    onClick={handleBack}
                >
                    BACK
                </button>

                <div className="wokoutPageForm_hFlex">
                    <button
                        className="orange _button"
                        type="button"
                        onClick={handleReset}
                    >
                        RESET
                    </button>
                    <button
                        className="green _button"
                        type="button"
                        onClick={handleSubmitSave}
                        disabled={hasError()}
                    >
                        SAVE
                    </button>
                </div>

            </div>


            {/*  INPUT FIELDS */}
            <div className="workout_page_form_grid">
                <label style={{ display: 'inline-flex' }}>
                    {errors.name &&
                        <span style={{ color: 'red' }}>{errors.name}&nbsp;&nbsp;</span>
                    }
                    Name:
                </label>

                <input
                    className="_input"
                    type="text"
                    name="name"
                    onChange={updateSetForm}
                    placeholder="Enter name"
                    value={form.name}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.description &&
                        <span style={{ color: 'red' }}>{errors.description}&nbsp;&nbsp;</span>}
                    Description:
                </label>
                <textarea
                    className="_textarea"
                    maxLength="498"
                    name="description"
                    onChange={updateSetForm}
                    placeholder="Enter description"
                    value={form.description}
                />
            </div>

            {/* BOTTOM BUTTONS */}
            <div className="max_HFlex">
                <button
                    className="red _button"
                    type="button"
                    onClick={handleDelete}
                >
                    DELETE
                </button>

                <button
                    className="black _button"
                    type="button"
                    onClick={handleAddToLog}
                >
                    Add To Log
                </button>
            </div>

            {showDeletetModal && (
                <DeleteWorkoutModal
                    onClose={handleModalClose}
                    onSubmit={handleDelete}
                    workout={selectedWorkout}
                />
            )}
        </div >
    );
}
export default WorkoutPageForm;
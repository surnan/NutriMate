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
    const sessionUser = useSelector((state) => state.session.user);
    const { newWorkout, currentData } = location.state || {};

    const [showDeletetModal, setShowDeletetModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [errors, setErrors] = useState({});


    const [form, setForm] = useState({
        name: currentData?.name || "",
        description: currentData?.description || '',
        userId: currentData?.userId || sessionUser?.id || 1
    });

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const hasError = () => Object.keys(errors).length !== 0;

    const handleDeleteBtn = () => {
        if (!currentData?.id) {
            alert('Can not delete this new record because it has not been saved to database');
            return;
        }
        setSelectedWorkout(currentData);
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedWorkout(null)
        navigate(-1)
    };

    const handleBackBtn = () => { navigate(-1) };

    const handleSubmit = async (e) => {
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

        console.log("===> line 56 ===> body = ", body)

        try {
            const result = newWorkout
                ? await dispatch(updateWorkoutsOneThunk({ body }))
                : await dispatch(postWorkoutsOneThunk({ body }))
            if (result) { navigate(`/workouts`) }
        } catch (error) {
            console.error('Error adding workout:', error);
        }
    }

    const handleresetBtn = () => {
        setForm({
            name: currentData?.name || "",
            description: currentData?.description || ""
        });
    }


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


    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <h1>WorkoutPageForm.jsx</h1>
            <h3 >Email = {sessionUser?.email}</h3>

            <div className="max_HFlex">
                <button
                    className="blue"
                    type="button"
                    onClick={handleBackBtn}
                >
                    BACK
                </button>

                <div className="wokoutPageForm_hFlex">
                    <button
                        className="orange"
                        type="button"
                        onClick={handleresetBtn}
                    >
                        RESET
                    </button>
                    <button
                        className="green"
                        type="button"
                        onClick={handleSubmit}
                        disabled={hasError()}
                    >
                        SAVE
                    </button>
                </div>

            </div>


            <div className="workout_page_form_grid">
                <label style={{ display: 'inline-flex' }}>
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}&nbsp;&nbsp;</span>} Name:
                </label>

                <input
                    type="text"
                    name="name"
                    onChange={updateSetForm}
                    placeholder="Enter name"
                    value={form.name}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.description && <span style={{ color: 'red' }}>{errors.description}&nbsp;&nbsp;</span>} Description:
                </label>
                <textarea
                    maxLength="498"
                    name="description"
                    onChange={updateSetForm}
                    placeholder="Enter description"
                    value={form.description}
                />

            </div>
            
            <button
                className="red"
                type="button"
                onClick={handleDeleteBtn}
            >
                DELETE
            </button>
            {showDeletetModal && (
                    <DeleteWorkoutModal
                        onClose={handleModalClose}
                        onSubmit={handleDeleteBtn}
                        workout={selectedWorkout}
                    />
                )}
        </>
    );
}
export default WorkoutPageForm;
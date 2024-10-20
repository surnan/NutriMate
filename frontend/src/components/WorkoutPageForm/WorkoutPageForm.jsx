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

    const handleDayLogBtn = () => {
        if (!currentData?.id) {
            alert('Workout needs to be saved before adding to DayLog');
            return;
        }
        navigate('/DayLogFormWorkout')
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

    const formatDate = (dateString) => {
        if (!dateString) return new Date().toISOString().split('T')[0]; // Use current date if not provided
        const date = new Date(dateString);
        return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    };

    return (
        <div className="mainBodyStyle">
            {/* <h1>WorkoutPageForm.jsx</h1>
            <h3 >Email = {sessionUser?.email}</h3> */}

            <div className="max_HFlex">
                <button
                    className="blue _button"
                    type="button"
                    onClick={handleBackBtn}
                >
                    BACK
                </button>

                <div className="wokoutPageForm_hFlex">
                    <button
                        className="orange _button"
                        type="button"
                        onClick={handleresetBtn}
                    >
                        RESET
                    </button>
                    <button
                        className="green _button"
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
                    className="_input"
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
                    className="_textarea"
                    maxLength="498"
                    name="description"
                    onChange={updateSetForm}
                    placeholder="Enter description"
                    value={form.description}
                />

            </div>

            <button
                className="red _button"
                type="button"
                onClick={handleDeleteBtn}
            >
                DELETE
            </button>

            <button
                className="black _button"
                type="button"
            onClick={handleDayLogBtn}
            >
                Add To Log
            </button>


            {showDeletetModal && (
                <DeleteWorkoutModal
                    onClose={handleModalClose}
                    onSubmit={handleDeleteBtn}
                    workout={selectedWorkout}
                />
            )}
            <br />
            <br />
            <hr />
            <br />
            <br />


            <div className="workout_page_form_grid">

                <p>Date</p>
                <input
                    className="_input"
                    type="datetime-local"
                    name="day"
                    onChange={updateSetForm}
                    placeholder="Please enter your goal weight"
                    value={formatDate(form.day)}
                />
                <p>Calories</p>
                <input
                    className="_input"
                    type="number"
                    name="day"
                    onChange={updateSetForm}
                    placeholder="Please enter your goal weight"
                    value={formatDate(form.day)}
                />
                <input
                    className="_input"
                    type="number"
                    name="Quantity"
                    onChange={updateSetForm}
                    placeholder="Quantity"
                    value={formatDate(form.day)}
                />
                <select
                    className="_input"
                    name="servingUnit"
                    onChange={updateSetForm}
                    value={form.servingUnit || ""}
                >
                    <option value="">Quantity Type</option>
                    <option value="hours">hours</option>
                    <option value="minutes">minutes</option>
                    <option value="seconds">seconds</option>
                    <option value="each">each</option>
                    <option value="reps">reps</option>
                </select>

            </div>
        </div>
    );
}
export default WorkoutPageForm;
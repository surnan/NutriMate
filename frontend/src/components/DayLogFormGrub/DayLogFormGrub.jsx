// frontend/src/componenets/DayLogFormGrub/DayLogFormGrub.jsx
import "./DayLogFormGrub.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


function DayLogFormGrub() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const sessionUser = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState({});
    const { newWorkout, currentData } = location.state || {};

    const [form, setForm] = useState({
        name: currentData?.name || "",
        description: currentData?.description || '',
        day: currentData?.day || '',
        calories: currentData || '',
        units: currentData?.units || '',
        unitType: currentData?.unitType || '',
        userId: currentData?.userId || sessionUser?.id || 1
    });

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const hasError = () => Object.keys(errors).length !== 0;

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


    const handleresetBtn = () => {
        setForm({
            name: currentData?.name || "",
            description: currentData?.description || '',
            day: currentData?.day || '',
            calories: currentData || '',
            units: currentData?.units || '',
            unitType: currentData?.unitType || 'hours',
            userId: currentData?.userId || sessionUser?.id || 1,
            servings: 1
        });
    }


    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedWorkout(null)
        navigate(-1)
    };

    const handleBackBtn = () => { navigate(-1) };

    const formatDate = (dateString) => {
        if (!dateString) return new Date().toISOString().slice(0, 16); // Default to current date and time
        const date = new Date(dateString);
        return !isNaN(date.getTime()) ? date.toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16);
    };


    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="mainBodyStyle">
            <h3>DayLogFormWorkout.jsx</h3>

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
                    // onClick={handleSubmit}
                    // disabled={hasError()}
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
                    placeholder="Enter name"
                    onChange={updateSetForm}
                    value={form.name}
                />

                <p>Date</p>
                <input
                    className="_input"
                    type="datetime-local"
                    name="day"
                    placeholder="Please enter your goal weight"
                    onChange={updateSetForm}
                    value={formatDate(form.day)}
                />

                <p>Calories</p>
                <input
                    className="_input"
                    type="number"
                    name="calories"
                    placeholder="Please enter your goal weight"
                    onChange={updateSetForm}
                    value={form.calories}
                />

                <p>Serving Count</p>
                <input
                    className="_input"
                    type="number"
                    name="servings"
                    placeholder="How many servings"
                    onChange={updateSetForm}
                    value={form.servings}
                />
                <label style={{ display: 'inline-flex' }}>
                    {errors.description && <span style={{ color: 'red' }}>{errors.description}&nbsp;&nbsp;</span>} Description:
                </label>
                <textarea
                    className="_textarea"
                    maxLength="498"
                    name="description"
                    placeholder="Enter description"
                    onChange={updateSetForm}
                    value={form.description}
                />

                <input
                    className="_input"
                    type="number"
                    name="units"
                    placeholder="units"
                    onChange={updateSetForm}
                    value={form.units}
                />
                <select
                    className="_input"
                    name="unitType"
                    onChange={updateSetForm}
                    value={form.unitType}
                >
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

export default DayLogFormGrub;

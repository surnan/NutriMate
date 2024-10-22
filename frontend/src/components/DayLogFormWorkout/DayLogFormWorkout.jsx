// frontend/src/componenets/DayLogFormWorkout/DayLogFormWorkout.jsx
import "./DayLogFormWorkout.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function DayLogFormWorkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const sessionUser = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState({});
    const { newWorkout, currentData } = location.state || {};

    const formatDatetimeLocal = (dateString) => {
        if (!dateString) {
            const now = new Date();
            const localISOTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
            return localISOTime; // local date & time in ISO format
        }
        const date = new Date(dateString);
        return !isNaN(date.getTime()) ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16);
    };

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const hasError = () => Object.keys(errors).length !== 0;

    const [form, setForm] = useState({
        name: currentData?.name || "",
        description: currentData?.description || '',
        day: currentData?.day || Date(),
        calories: currentData?.calories || '',
        units: currentData?.units || '',
        unitType: currentData?.unitType || 'hours',
        userId: currentData?.userId || sessionUser?.id || 1
    });

    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }



    useEffect(() => {
        const newErrors = {};

        const minZero = ["calories", "units"]
        minZero.forEach((key) => {
            if (isNaN(form[key])) {
                newErrors[key] = `${capitalizeFirstLetter(key)} must be number`;
                return
            }
            if (form[key] < 1) {
                newErrors[key] = `${capitalizeFirstLetter(key)} min is 1`;
            }
        })

        const allKeys = ["name", "description", "date", "calories", "units", 'unittype'];
        allKeys.forEach((key) => {
            if (!form[key]) {
                newErrors[key] = `${capitalizeFirstLetter(key)} is required`;
            }
        });



        setErrors(newErrors);
    }, [form])

    const handleBack = () => { navigate(-1) };

    const handleReset = () => {
        setForm({
            name: currentData?.name || "",
            description: currentData?.description || '',
            day: currentData?.day || Date(),
            calories: currentData?.calories || '',
            units: currentData?.units || '',
            unitType: currentData?.unitType || "hours",
            userId: currentData?.userId || sessionUser?.id || 1,
        });
    }

    const handleSubmitSave = () => {
        console.log("clicked")
    }


    return (
        <div className="mainBodyStyle">
            <h3>DayLogFormWorkout.jsx</h3>

            <div className="max_HFlex">
                {/* TOP BUTTONS */}
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
                    // disabled={hasError()}
                    >
                        SAVE
                    </button>
                </div>

            </div>

            {/*  INPUT FIELDS */}
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
                    readOnly={true}
                />

                <p>Date</p>
                <input
                    className="_input"
                    type="datetime-local"
                    name="day"
                    placeholder="Please enter your goal weight"
                    onChange={updateSetForm}
                    value={formatDatetimeLocal(form.day)}
                />


                <label style={{ display: 'inline-flex' }}>
                    {errors.calories && <span style={{ color: 'red' }}>{errors.calories}&nbsp;&nbsp;</span>} Calories:
                </label>
                <input
                    className="_input"
                    type="number"
                    name="calories"
                    placeholder="Please enter your goal weight"
                    onChange={updateSetForm}
                    value={form.calories}
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
                    readOnly={true}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.units && <span style={{ color: 'red' }}>{errors.units}&nbsp;&nbsp;</span>} Units:
                </label>
                <input
                    className="_input"
                    type="number"
                    name="units"
                    placeholder="units"
                    onChange={updateSetForm}
                    value={form.units}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.unitType && <span style={{ color: 'red' }}>{errors.unitType}&nbsp;&nbsp;</span>} Unit type:
                </label>
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

export default DayLogFormWorkout;

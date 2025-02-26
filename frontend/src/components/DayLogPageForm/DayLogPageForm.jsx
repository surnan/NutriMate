// frontend/src/componenets/DayLogPageForm/DayLogPageForm.jsx
import "./DayLogPageForm.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { postDailyLogsOneThunk, updateDailyLogsOneThunk, deleteDailyLogsThunkById, getDailyLogsOneThunk } from "../../redux/daylogs"
// import { capitalizeFirstLetter, isEmpty, formatDatetimeLocal } from '../_utils/MyFunctions'
import { capitalizeFirstLetter, formatDatetimeLocal } from '../_utils/MyFunctions'
import DeleteModal from "../_modal/DeleteModal";
import WorkoutDetailCard from "../_cards/WorkoutDetailCard"
import GrubDetailCard from "../_cards/GrubDetailCard"

import { useTheme } from "../../context/ThemeContext"

function DayLogPageForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams();
    const dayLogId = parseInt(id);
    const { newDayLog, newWorkoutObj, newGrubObj } = location.state || {};
    // const { theme, toggleTheme, showProtein, toggleShowProtein, showCarbs, toggleShowCarbs, showFats, toggleShowFats, showSugars, toggleShowSugars } = useTheme();
    const { theme } = useTheme();

    // useEffect(() => {
    //     console.log("")
    //     console.log("...location.state = ", location.state)
    //     console.log("")
    // }, [location.state])

    const sessionUser = useSelector((state) => state.session.user);
    const dayLogObj = useSelector((state) => state.daylogs.single)

    const [showDeleteModal, setShowDeletetModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        timestamp: Date(),
        name: "",
        calories: "",
        units: "",
        unitType: "",
        grubId: "",
        workoutId: "",
        userId: dayLogObj.userId || sessionUser?.id || 1
    });

    const initializeForm = useCallback(() => {
        return {
            name: dayLogObj.name || newWorkoutObj?.name || newGrubObj?.name || "",
            timestamp: newDayLog ? Date.now() : dayLogObj.timestamp,
            calories: dayLogObj.calories || "",
            units: dayLogObj.units || "",
            unitType: dayLogObj.unitType || (newGrubObj ? "servings" : "hours"),
            grubId: dayLogObj.grubId || newGrubObj?.id || null,
            workoutId: dayLogObj.workoutId || newWorkoutObj?.id || null,
            userId: dayLogObj.userId || sessionUser?.id || 1
        }
    }, [dayLogObj, newDayLog, sessionUser, dayLogId, dispatch, newWorkoutObj, newGrubObj])

    useEffect(() => {
        setForm(initializeForm());
    }, [initializeForm]);

    useEffect(() => {
        console.log("...B")
        if (!newDayLog && dayLogObj) {
            // console.log("....dispatch A .....")
            dispatch(getDailyLogsOneThunk(dayLogId))
        }
    }, [dispatch, dayLogId, newDayLog])

    const handleReset = () => setForm(initializeForm)
    const handleBack = () => navigate(-1);

    useEffect(() => {
        // console.log("...C")
        const newErrors = {};
        const allKeys = ["units"];

        if (newWorkoutObj || form.workoutId) allKeys.push("calories")

        allKeys.forEach((key) => {
            if (!form[key]) {
                newErrors[key] = `${capitalizeFirstLetter(key)} is required`;
            } else {
                if (Number(form[key]) <= 0) {
                    newErrors[key] = `${capitalizeFirstLetter(key)} must be > 0`;
                }
            }
        });
        setErrors(newErrors);
    }, [form, newWorkoutObj, newGrubObj])


    const handleSubmitSave = async (e) => {
        e.preventDefault();
        try {
            const { name, timestamp, calories, units, unitType, userId, grubId, workoutId } = form;
            const body = {
                id: dayLogId,
                timestamp,
                name: name || "no name given",
                calories: parseInt(calories),
                units: parseInt(units),
                unitType,
                userId: parseInt(userId),
                grubId: parseInt(grubId),
                workoutId: parseInt(workoutId)
            }
            console.log("___body = ", body)
            // console.log("....dispatch B .....")
            const result = newDayLog
                ? await dispatch(postDailyLogsOneThunk({ body }))
                : await dispatch(updateDailyLogsOneThunk({ body }))
            if (result) navigate("/daylog")
        } catch (error) {
            console.error('Error adding dayLog:', error);
        }
    }


    const handleDelete = () => {
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false);
        navigate(-1)
    };



    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        // console.log("...D")
        const calculateGrubCalories = () => {
            if (newGrubObj && form.units) {
                const newCalories = newGrubObj.calories * form.units;
                console.log("....grubCalories (updated) = ", newCalories);
                const e = {
                    target: {
                        name: "calories",
                        value: newCalories
                    }
                }
                updateSetForm(e)
            }
        };
        calculateGrubCalories();
    }, [newGrubObj, form.units]);

    useEffect(() => {
        console.log("...dayLogObj = ", dayLogObj)
    }, [dayLogObj.id])

    return (
        <div className={`
            mainBodyStyle settingsPageFlex
            ${theme === "dark" ? "dkBody smoke_font" : ""}
            `}>
            {/* <h3>DayLogPageForm.jsx</h3>
            <h3>Email = {sessionUser?.email}</h3> */}
            <div className="max_HFlex">
                {/* TOP BUTTONS */}
                <div className="tooltip">
                    <button
                        onClick={handleBack}
                        className="round daily_btn_font_size shadow blue clickable menuRoundBtn"
                        title="Back"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <span className="tooltiptext letter_spacing">BACK</span>
                </div>

                <div className="wokoutPageForm_hFlex">
                    <div className="tooltip">
                        <button
                            onClick={handleReset}
                            className="round daily_btn_font_size shadow orange clickable menuRoundBtn"
                            title="Reset"
                        >
                            <i className="fa-solid fa-rotate-left"></i>
                        </button>
                        <span className="tooltiptext letter_spacing">UNDO</span>
                    </div>

                    <div className="tooltip">
                        <button
                            onClick={handleSubmitSave}
                            className="round daily_btn_font_size shadow blue clickable menuRoundBtn"
                            title="Save"
                        >
                            <i className="fa-solid fa-bookmark"></i>
                        </button>
                        <span className="tooltiptext letter_spacing">SAVE</span>
                    </div>
                </div>
            </div>

            <div className="card twenty_padding twenty_margin">
                {
                    dayLogObj?.Workout &&
                    <WorkoutDetailCard workout={dayLogObj?.Workout} />
                }

                {
                    dayLogObj?.Grub &&
                    <GrubDetailCard grub={dayLogObj?.Grub} />
                }
            </div>

            <div className="daylog_page_form_grid">
                <p>Name:</p>
                <input
                    className="_input"
                    value={form.name}
                    readOnly={true}
                />

                <p>Date:</p>
                <input
                    className="_input"
                    type="datetime-local"
                    name="timestamp"
                    onChange={updateSetForm}
                    value={formatDatetimeLocal(form.timestamp)}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.calories && <span style={{ color: 'red' }}>{errors.calories}&nbsp;&nbsp;</span>} Calories:
                </label>
                <input
                    className="_input"
                    type="number"
                    name="calories"
                    placeholder="calories"
                    onChange={updateSetForm}
                    value={form.calories}
                    readOnly={form.grubId || newGrubObj}
                />

                {(newGrubObj || form.grubId) &&
                    <div>
                        <label style={{ display: 'inline-flex' }}>
                            Units: {errors.units && <span style={{ color: 'red' }}>{errors.units}&nbsp;&nbsp;</span>}
                        </label>
                        <input
                            className="_input"
                            type="number"
                            name="units"
                            placeholder="enter number servings"
                            onChange={updateSetForm}
                            value={form.units}
                        />
                    </div>
                }

                {(newGrubObj || form.grubId) &&
                    <div>
                        <label style={{ display: 'inline-flex' }}>
                            Unit Type:
                        </label>
                        <select
                            className="_input block"
                            name="unitType"
                            onChange={updateSetForm}
                            value={form.unitType}
                        >
                            <option value="servings">servings</option>
                        </select>
                    </div>
                }

                {(newWorkoutObj || form.workoutId) &&
                    <div>
                        <label style={{ display: 'inline-flex' }}>
                            Units: {errors.units && <span style={{ color: 'red' }}>{errors.units}&nbsp;&nbsp;</span>}
                        </label>
                        <input
                            className="_input"
                            type="number"
                            name="units"
                            placeholder="enter quantity"
                            onChange={updateSetForm}
                            value={form.units}
                        />
                    </div>
                }

                {(newWorkoutObj || form.workoutId) &&
                    <div>
                        <label style={{ display: 'inline-flex' }}>
                            Unit type:
                        </label>
                        <br />

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
                }
            </div>


            <br /><br />
            <p></p>
            <br /><br />
            <div className="max_HFlex">
                <div className="tooltip">
                    <button
                        onClick={handleDelete}
                        className="round daily_btn_font_size shadow red clickable menuRoundBtn"
                        title="Delete"
                    >
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <span className="tooltiptext_below letter_spacing">DELETE</span>
                </div>

            </div>

            {showDeleteModal && (
                <DeleteModal
                    item={dayLogObj}
                    itemType="dayLogObj"
                    deleteThunk={deleteDailyLogsThunkById}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
}

export default DayLogPageForm;

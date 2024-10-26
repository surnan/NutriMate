// frontend/src/componenets/DayLogPageForm/DayLogPageForm.jsx
import "./DayLogPageForm.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { postDailyLogsOneThunk, updateDailyLogsOneThunk, deleteDailyLogsThunkById, getDailyLogsOneThunk } from "../../redux/daylogs"
import { capitalizeFirstLetter, isEmpty, formatDatetimeLocal } from '../../utils/MyFunctions'
import DeleteModal from "../DeleteModal/DeleteModal";
import WorkoutCard from "../WorkoutCard";
import GrubCard from "../GrubCard/GrubCard";


function DayLogPageForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams();
    const dayLogId = parseInt(id);
    const { newDayLog, newWorkoutObj, newGrubObj, currentDayLog } = location.state || {};

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
        userId: "",
        grubId: "",
        workoutId: "",
        userId: dayLogObj.userId || sessionUser?.id || 1
    });


    const initializeForm = useCallback(() => {
        return {
            name: dayLogObj.name || newWorkoutObj?.name || newGrubObj?.name || "",
            timestamp: dayLogObj.timestamp || Date.now(),
            calories: dayLogObj.calories || "",
            units: dayLogObj.units || "",
            unitType: dayLogObj.unitType || "",
            grubId: dayLogObj.grubId || newGrubObj?.id || null,
            workoutId: dayLogObj.workoutId || newWorkoutObj?.id || null,
            userId: dayLogObj.userId || sessionUser?.id || 1
        }
    }, [dayLogObj, newDayLog, sessionUser, dayLogId, dispatch, newWorkoutObj, newGrubObj])


    useEffect(() => {
        setForm(initializeForm());
    }, [initializeForm]);

    useEffect(() => {
        if (!newDayLog && dayLogObj) {
            dispatch(getDailyLogsOneThunk(dayLogId))
        }
    }, [dispatch, dayLogId, newDayLog])

    const handleReset = () => setForm(initializeForm)
    const handleBack = () => navigate(-1);



    useEffect(() => {
        const newErrors = {};
        const allKeys = ["calories", "units"];

        allKeys.forEach((key) => {
            if (!form[key]) {
                newErrors[key] = `${capitalizeFirstLetter(key)} is required`;
            } else {
                if (parseInt(form[key]) <= 0) {
                    newErrors[key] = `${capitalizeFirstLetter(key)} must be > 0`;
                }
            }
        });
        setErrors(newErrors);
    }, [form])


    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmitSave = async (e) => {
        console.log("hello")
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
            const result = newDayLog
                ? await dispatch(postDailyLogsOneThunk({ body }))
                : await dispatch(updateDailyLogsOneThunk({ body }))
            if (result) navigate(-1)
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

    return (
        <div className="mainBodyStyle">
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
                        className={`green _button ${isEmpty(errors) ? "disabled_btn" : ""}`}
                        type="button"
                        onClick={handleSubmitSave}
                        // disabled={hasError()}
                        disabled={isEmpty(errors)}
                    >
                        SAVE
                    </button>
                </div>
            </div>



            <div className="card">
                {
                    dayLogObj?.Workout &&
                    <WorkoutCard workout={dayLogObj?.Workout} />
                }

                {
                    dayLogObj?.Grub &&
                    <GrubCard grub={dayLogObj?.Grub} />
                }
            </div>



            <div className="workout_page_form_grid">
                <p>Name</p>
                <input
                    className="_input"
                    value={form.name}
                    readOnly={true}
                />


                <p>Date</p>
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
                    placeholder="Please enter your goal weight"
                    onChange={updateSetForm}
                    value={form.calories}
                    readOnly={form.grubId || newGrubObj}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.units && <span style={{ color: 'red' }}>{errors.units}&nbsp;&nbsp;</span>} Quantity:
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



                <label style={{ display: 'inline-flex' }}>
                    {errors.unitType && <span style={{ color: 'red' }}>{errors.unitType}&nbsp;&nbsp;</span>} Serving Units:
                </label>


                <input
                    className="_input"
                    type="number"
                    name="servingunits"
                    placeholder="enter servings"
                    onChange={updateSetForm}
                // value={form.units}
                />


            </div>

            <div className="max_HFlex">
                <button className="red _button" type="button" onClick={handleDelete}>
                    DELETE
                </button>
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

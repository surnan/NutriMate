// frontend/src/componenets/DayLogPageForm/DayLogPageForm.jsx
import "./DayLogFormGrub.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { postDailyLogsOneThunk, updateDailyLogsOneThunk, deleteDailyLogsThunkById, getDailyLogsOneThunk } from "../../redux/daylogs"
import { getGrubsOneThunk } from "../../redux/grubs";
import DeleteModal from "../DeleteModal/DeleteModal";
import { capitalizeFirstLetter, isEmpty, formatDatetimeLocal } from '../../utils/MyFunctions'
import GrubCard from "../GrubCard";


function DayLogFormGrub() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { id } = useParams();
    const dayLogId = parseInt(id);
    const { newDayLog } = location.state || {};

    const sessionUser = useSelector((state) => state.session.user);
    const dayLogObj = useSelector((state) => state.daylogs.single)

    useEffect(() => {
        console.log("____dayLogObj = ", dayLogObj)
    }, [dayLogObj])

    const [showDeleteModal, setShowDeletetModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        description: '',
        userId: sessionUser?.id || 1
    });

    useEffect(() => {
        if (!newDayLog && dayLogObj) {
            setForm({
                name: dayLogObj.name || "",
                description: dayLogObj.description || "",
                userId: dayLogObj.userId || sessionUser?.id || 1
            });
        }
    }, [dayLogObj, newDayLog, sessionUser])

    useEffect(() => {
        if (!newDayLog && dayLogObj) {
            dispatch(getDailyLogsOneThunk(dayLogId))
        }
    }, [dispatch, dayLogId, newDayLog])

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

    const handleBack = () => navigate(-1);

    const handleReset = () => {
        setForm({
            name: grubObj?.name || "",
            description: grubObj?.description || ""
        });
    }

    const handleSubmitSave = async (e) => {
        e.preventDefault();
        try {
            const { name, description, userId } = form;
            const body = {
                id: Id,
                name,
                description,
                userId
            }
            const result = dayLogId
                ? await dispatch(updateDailyLogsOneThunk({ body }))
                : await dispatch(postDailyLogsOneThunk({ body }))
            if (result) {
                navigate(-1)
            }
        } catch (error) {
            console.error('Error adding dayLog:', error);
        }
    }


    const handleDelete = () => {
        if (!Id) {
            alert(' not saved to database');
            return;
        }
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false);
        navigate(-1)
    };

    return (
        <>
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

            {/* <Card ={dayLogObj?.} /> */}

            <div className="_page_form_grid">
                <p>Date</p>
                <input
                    className="_input"
                    type="datetime-local"
                    name="day"
                    placeholder="Please enter your goal weight"
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
        </>
    );
}

export default DayLogFormGrub;

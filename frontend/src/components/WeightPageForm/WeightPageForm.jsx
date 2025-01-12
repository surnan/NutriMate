// frontend/src/componenets/WeightPageForm/WeightPageForm.jsx

import "./WeightPageForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postWeightsOneThunk, updateWeightThunkById } from "../../redux/weight";
import DeleteWeightModal from '../_modal/DeleteWeightModal'
import { useTheme } from "../../context/ThemeContext";

function WeightPageForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const sessionUser = useSelector((state) => state.session.user);
    const { theme } = useTheme();
    // const { theme, toggleTheme } = useTheme();

    const { newWeight, currentData } = location.state || {};

    const [showDeletetModal, setShowDeletetModal] = useState(false);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        id: currentData?.id,
        metricSystem: currentData?.metricSystem || false,
        start: currentData?.start || '',
        goal: currentData?.goal || '',
        current: currentData?.current || '',
        day: currentData?.day || Date.now(),
        userId: currentData?.userId || sessionUser.id
    });

    const updateSetForm = (e) => {
        const { name, type, value, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    useEffect(() => {
        const newErrors = {};
        const allKeys = ["start", "goal", "current", "day"];

        allKeys.forEach((key) => {
            if (!form[key]) {
                newErrors[key] = `${capitalizeFirstLetter(key)} is required`;
            }
        });
        setErrors(newErrors);
    }, [form])

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const hasError = () => Object.keys(errors).length !== 0;

    const formatDate = (dateString) => {
        if (!dateString) return new Date().toISOString().split('T')[0]; // Use current date if not provided
        const date = new Date(dateString);
        return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    };

    //Delete Button & Modal -- start
    const handleDeleteBtn = () => {
        if (!currentData?.id) {
            alert('Can not delete this new record because it has not been saved to database');
            return;
        }
        setSelectedWeight(currentData);
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedWeight(null)
        navigate(-1)
    };
    //Delete Button & Modal -- end


    const handleBackBtn = () => { navigate(-1) };
    const handleSubmit = async (e) => {
        if (hasError()) {
            console.log("===> ERRORS = ", errors)
            return
        }
        e.preventDefault();
        const { id, metricSystem, start, goal, current, day, userId } = form;
        const body = {
            "id": parseInt(id),
            "metricSystem": metricSystem || false,
            "start": parseInt(start),
            "goal": parseInt(goal),
            "current": parseInt(current),
            "day": day || Date.now(),
            "userId": parseInt(userId),
        }

        try {
            const result = newWeight
                ? await dispatch(updateWeightThunkById({ body }))
                : await dispatch(postWeightsOneThunk({ body }))
            if (result) { navigate(`/weights`) }
        } catch (error) {
            console.error('Error adding weight:', error);
        }
    }
    const handleResetBtn = () => {
        setForm({
            metricSystem: currentData?.metricSystem || false,
            start: currentData?.start || '',
            goal: currentData?.goal || '',
            current: currentData?.current || '',
            day: formatDate(currentData?.day),
            userId: currentData?.userId || sessionUser.id
        });
    };

    useEffect(() => {
        console.log(`Theme ===> `, theme)
        document.body.classList.remove("light-mode", "dark-mode");
        document.body.classList.add(theme === "dark" ? "dark-mode" : "light-mode");
    }, [theme])

    return (
        <div className={`
            mainBodyStyle settingsPageFlex
            ${theme === "dark" ? "dkBody smoke_font" : ""}
            `}>
            <h1>WeightPageForm.jsx</h1>
            <h3 >Email = {sessionUser?.email}</h3>

            <div className="max_HFlex">
                <div className="tooltip">
                    <button
                        onClick={handleBackBtn}
                        className="round daily_btn_font_size shadow blue clickable menuRoundBtn"
                        title="Back"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <span className="tooltiptext letter_spacing">BACK</span>
                </div>


                <div className="weightPageForm_hFlex">
                    <div className="tooltip">
                        <button
                            onClick={handleResetBtn}
                            className="round daily_btn_font_size shadow orange clickable menuRoundBtn"
                            title="Reset"
                        >
                            <i className="fa-solid fa-rotate-left"></i>
                        </button>
                        <span className="tooltiptext letter_spacing">UNDO</span>
                    </div>


                    <div className="tooltip">
                        <button
                            onClick={handleSubmit}
                            className="round daily_btn_font_size shadow blue clickable menuRoundBtn"
                            title="Save"
                        >
                            <i className="fa-solid fa-bookmark"></i>
                        </button>
                        <span className="tooltiptext letter_spacing">SAVE</span>
                    </div>

                    <div className="tooltip">
                        <button
                            onClick={handleDeleteBtn}
                            className="round daily_btn_font_size shadow red clickable menuRoundBtn"
                            title="Delete"
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                        <span className="tooltiptext letter_spacing">DELETE</span>
                    </div>



                </div>
            </div>

            <div className="weight_page_form_grid">
                <label style={{ display: 'inline-flex' }}>
                    {errors.day && <span style={{ color: 'red' }}>{errors.day}&nbsp;&nbsp;</span>} Day
                </label>
                <input
                    className="_input"
                    type="date"
                    name="day"
                    onChange={updateSetForm}
                    placeholder="Please enter your goal weight"
                    value={formatDate(form.day)}
                />


                <label style={{ display: 'inline-flex' }}>
                    {errors.start && <span style={{ color: 'red' }}>{errors.start}&nbsp;&nbsp;</span>} Starting Weight ( lbs ):
                </label>
                <input
                    className="_input"
                    type="number"
                    name="start"
                    onChange={updateSetForm}
                    placeholder="Please enter starting weight"
                    value={form.start}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.goal && <span style={{ color: 'red' }}>{errors.goal}&nbsp;&nbsp;</span>} Goal Weight ( lbs ):
                </label>
                <input
                    className="_input"
                    type="number"
                    name="goal"
                    onChange={updateSetForm}
                    placeholder="Please enter goal weight"
                    value={form.goal}
                />


                <label style={{ display: 'inline-flex' }}>
                    {errors.current && <span style={{ color: 'red' }}>{errors.current}&nbsp;&nbsp;</span>} Current Weight ( lbs ):
                </label>
                <input
                    type="number"
                    name="current"
                    className="_input"
                    onChange={updateSetForm}
                    placeholder="Please enter current weight"
                    value={form.current}
                />
            </div>

            <div className="weightPageForm_hFlex">
            </div>
            {showDeletetModal && (
                <DeleteWeightModal
                    onClose={handleModalClose}
                    onSubmit={handleDeleteBtn}
                    weight={selectedWeight}
                />
            )}
        </div>
    );
}

export default WeightPageForm;

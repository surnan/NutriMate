//frontend/src/componenets/DayLogPage/DayLogPage.jsx

import "./DayLogPage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDailyLogsAllThunk } from "../../redux/daylogs"
import { useNavigate } from "react-router-dom"
import CustomCalendar from "../_components/CustomCalendar";

import DayLogModal from "../_modal/DayLogModal/DayLogModal";
import { useTheme } from "../../context/ThemeContext"


const DayLogPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDayLogModal, setShowDayLogModal] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        console.log(`Theme ===> `, theme)
        document.body.classList.remove("light-mode", "dark-mode");
        document.body.classList.add(theme === "dark" ? "dark-mode" : "light-mode");
    }, [theme])


    const [totals, setTotals] = useState({
        calories: 0,
        protein: 0,
        fats: 0,
        carbs: 0,
        sugars: 0,
    });


    useEffect(() => {
        dispatch(getDailyLogsAllThunk())
    }, [dispatch])

    const handleBack = () => navigate(-1)
    const handlePlusWorkout = () => { navigate("/workouts") }
    const handlePlusGrub = () => { navigate("/grubs") }
    const handleWeights = () => { navigate("/weights") }

    const [showTotals, setShowTotals] = useState(false); // Collapsible state


    // Handle date change from the calendar
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleModalClose = () => {
        setShowDayLogModal(false);
    };

    const toggleDayLogModal = () => {
        setShowDayLogModal((prevState) => !prevState);
    };


    const toggleTotals = () => {
        setShowTotals((prevState) => !prevState);
    };

    return (
        <div
            className={`
            mainBodyStyle
            ${theme === "dark" ? "dkBody smoke_font" : ""}
            `}
        >
            <div>
                <h1>DayLogPage.jsx</h1>
                <h3 >Email = {sessionUser?.email}</h3>
                <br />
                <br />
            </div>


            <div className="vertical_center_flex ">
                <div className="max_HFlex workout_btn_div">
                    <div>
                        <button
                            className="toggle-totals-btn transparent _button"
                            onClick={toggleTotals}
                        >
                            {showTotals ? "▼ Hide Totals" : "▶ Show Totals"}
                        </button>
                        <br />
                        <br />
                        {showTotals && (
                            <div className="totals-section">
                                <p>Calories: </p>
                                <p>{totals.calories}</p>
                                <p>Protein: </p>
                                <p>{totals.protein} g</p>
                                <p>Fats: </p>
                                <p>{totals.fats} g</p>
                                <p>Carbs:</p>
                                <p>{totals.carbs} g</p>
                                <p>Sugars: </p>
                                <p>{totals.sugars} g</p>
                            </div>
                        )}
                    </div>

                    <div className="circle_buttons_h_flex">
                        <button
                            onClick={handlePlusWorkout}
                            className="round daily_btn_font_size shadow blue clickable"
                            title="Add Workout"
                        >
                            <i className="fa-solid fa-person-running"></i>
                        </button>

                        <button
                            onClick={handlePlusGrub}
                            className="round daily_btn_font_size shadow orange clickable"
                            title="Add Meal"
                        >
                            <i className="fa-solid fa-utensils"></i>
                        </button>

                        <button
                            onClick={handleWeights}
                            className="round daily_btn_font_size shadow green clickable"
                            title="Record Weight"
                        >
                            <i className="fa-solid fa-weight-scale"></i>
                        </button>
                    </div>
                </div>

                <div className="calender_div">
                    <CustomCalendar
                        value={selectedDate}
                        onChange={handleDateChange}
                        width="100%"
                        height="900px"
                        handler={toggleDayLogModal}
                        setTotals={setTotals}
                    />
                </div>
            </div>
            {
                showDayLogModal &&
                <DayLogModal
                    _stuff="!!hello world!!"
                    onClose={handleModalClose}
                />
            }
        </div>
    );
};
export default DayLogPage;

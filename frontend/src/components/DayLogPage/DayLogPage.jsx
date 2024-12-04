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
    // const { theme, toggleTheme } = useTheme();
    const { theme, toggleTheme, showProtein, toggleShowProtein, showCarbs, toggleShowCarbs, showFats, toggleShowFats, showSugars, toggleShowSugars, timeValue } = useTheme();

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
        console.log("showProtein = ", showProtein)
        console.log("showCarbs = ", showCarbs)

    }, [showProtein, showCarbs])


    useEffect(() => {
        dispatch(getDailyLogsAllThunk())
    }, [dispatch])

    const handleBack = () => navigate(-1)
    const handlePlusWorkout = () => { navigate("/workouts") }
    const handlePlusGrub = () => { navigate("/grubs") }
    const handleWeights = () => { navigate("/weights") }
    const handleSettings = () => { navigate("/settings") }

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
                                {showProtein && <p>Protein: </p>}
                                {showProtein && <p>{totals.protein} g</p>}
                                {showFats && <p>Fats: </p>}
                                {showFats && <p>{totals.fats} g</p>}
                                {showCarbs && <p>Carbs:</p>}
                                {showCarbs && <p>{totals.carbs} g</p>}
                                {showSugars && <p>Sugars: </p>}
                                {showSugars && <p>{totals.sugars} g</p>}
                            </div>
                        )}
                    </div>

                    <div className="circle_buttons_h_flex">

                        <div className="tooltip">
                            <button
                                onClick={handlePlusWorkout}
                                className="round daily_btn_font_size shadow blue clickable"
                                title="Add Workout"
                            >
                                <i className="fa-solid fa-person-running"></i>
                            </button>
                            <span className="tooltiptext">Add Excercise</span>
                        </div>

                        <div className="tooltip">
                            <button
                                onClick={handlePlusGrub}
                                className="round daily_btn_font_size shadow orange clickable"
                                title="Add Meal"
                            >
                                <i className="fa-solid fa-utensils"></i>
                            </button>
                            <span className="tooltiptext">Add Food</span>
                        </div>

                        <div className="tooltip">
                            <button
                                onClick={handleWeights}
                                className="round daily_btn_font_size shadow green clickable"
                                title="Record Weight"
                            >
                                <i className="fa-solid fa-weight-scale"></i>
                            </button>
                            <span className="tooltiptext">Record Weight</span>
                        </div>

                        <div className="tooltip">
                        <button
                            onClick={handleSettings}
                            className="round daily_btn_font_size shadow yellow clickable"
                            title="Change Settings"
                        >
                            <i className="fa-solid fa-gear"></i>
                        </button>
                        <span className="tooltiptext">Settings</span>
                        </div>



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
                        defaultStartTime={timeValue}
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

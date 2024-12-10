//frontend/src/componenets/DayLogPage/DayLogPage.jsx

import "./DayLogPage.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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

    const { theme, showProtein, showCarbs, showFats, showSugars, timeValue } = useTheme();

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

                        <div className={`totals-section-horizontal ${showTotals ? "visible" : "hidden"}`}>
                            <p>Calories: {totals.calories}</p>
                            {showProtein && <p>Protein: {totals.protein} g</p>}
                            {showFats && <p>Fats: {totals.fats} g</p>}
                            {showCarbs && <p>Carbs: {totals.carbs} g</p>}
                            {showSugars && <p>Sugars: {totals.sugars} g</p>}
                        </div>
                    </div>

                    <div className="circle_buttons_h_flex">

                        <div className="tooltip">
                            <button
                                onClick={handlePlusWorkout}
                                className="shadow blue menuRoundBtn"
                                title="Add Workout"
                            >
                                <i className="fa-solid fa-person-running"></i>
                            </button>
                            <span className="tooltiptext">Add Excercise</span>
                        </div>

                        <div className="tooltip">
                            <button
                                onClick={handlePlusGrub}
                                className="shadow orange menuRoundBtn"
                                title="Add Meal"
                            >
                                <i className="fa-solid fa-utensils"></i>
                            </button>
                            <span className="tooltiptext">Add Food</span>
                        </div>

                        <div className="tooltip">
                            <button
                                onClick={handleWeights}
                                className="shadow green menuRoundBtn"
                                title="Record Weight"
                            >
                                <i className="fa-solid fa-weight-scale"></i>
                            </button>
                            <span className="tooltiptext">Record Weight</span>
                        </div>

                        <div className="tooltip">
                            <button
                                onClick={handleSettings}
                                className="shadow yellow menuRoundBtn"
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
                        theme={theme}
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

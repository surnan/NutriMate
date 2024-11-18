//frontend/src/componenets/DayLogPage/DayLogPage.jsx

import "./DayLogPage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDailyLogsAllThunk } from "../../redux/daylogs"
import { useNavigate } from "react-router-dom"
import CustomCalendar from "../_components/CustomCalendar";

import DayLogModal from "../_modal/DayLogModal/DayLogModal";




const DayLogPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDayLogModal, setShowDayLogModal] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);

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


    // Handle date change from the calendar
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };



    const handleClick = (event111) => {
        console.log("...handleClick = ", event111)
        navigate(`/daylog/${event111.id}`)
    }

    const handleModalClose = () => {
        setShowDayLogModal(false);
    };

    const toggleDayLogModal = () => {
        setShowDayLogModal((prevState) => !prevState);
    };

    return (
        <div className="container-width">
            <h1>DayLogPage.jsx</h1>
            <h3 >Email = {sessionUser?.email}</h3>
            <br />
            <div>
                <p>Total Calories: {totals.calories}</p>
                <p>Total Protein: {totals.protein}g</p>
                <p>Total Fats: {totals.fats}g</p>
                <p>Total Carbs: {totals.carbs}g</p>
                <p>Total Sugars: {totals.sugars}g</p>
            </div>
            <br />

            <div className="vertical_center_flex ">
                {/* top buttons */}
                <div className="max_HFlex workout_btn_div container-width">
                    <button
                        className="back_btn navBlue"
                        onClick={handleBack}
                    >
                        <i className="fa-solid fa-arrow-rotate-left"></i>
                    </button>
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
                            className="round daily_btn_font_size shadow yellow clickable"
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

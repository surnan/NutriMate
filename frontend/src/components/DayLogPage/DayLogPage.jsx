//frontend/src/componenets/DayLogPage/DayLogPage.jsx

import "./DayLogPage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDailyLogsAllThunk } from "../../redux/daylogs"
import { useNavigate } from "react-router-dom"
import CustomCalendar from "../_components/CustomCalendar";




const DayLogPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const sessionUser = useSelector((state) => state.session.user);


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


    return (
        <div className="container-width">
            <h1>DayLogPage.jsx</h1>
            <h3 >Email = {sessionUser?.email}</h3>
            <br/>
            <div className="vertical_center_flex ">
                {/* top buttons */}
                <div className="max_HFlex workout_btn_div container-width">
                    <button
                        className="back_btn navBlue"
                        onClick={handleBack}
                    >
                        <i className="fa-solid fa-arrow-rotate-left"></i>
                    </button>
                    <div>
                        <button
                            className="_button orange"
                            onClick={handlePlusWorkout}
                        >
                            + Workout
                        </button>

                        <button
                            className="_button green"
                            onClick={handlePlusGrub}
                        >
                            + Grub
                        </button>
                        <button
                            className="_button dkPink"
                            onClick={handleWeights}
                        >
                            + Weight
                        </button>
                    </div>
                </div>

                <div className="calender_div">
                    <CustomCalendar
                        value={selectedDate}
                        onChange={handleDateChange}
                        width="100%"
                        height="900px"
                    />
                </div>
            </div>
        </div>
    );
};
export default DayLogPage;

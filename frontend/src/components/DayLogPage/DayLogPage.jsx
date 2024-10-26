//frontend/src/componenets/DayLogPage/DayLogPage.jsx

import "./DayLogPage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDailyLogsAllThunk } from "../../redux/daylogs"
import { useNavigate } from "react-router-dom"
import DayLogCard from "../DayLogCard";
import CustomCalendar from "../CustomCalendar";
import { format_Month_Date_Year } from "../../utils/MyFunctions"




const DayLogPage = () => {
    const hours = [
        "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM",
        "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM",
        "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
    ];

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const sessionUser = useSelector((state) => state.session.user);
    const dayLogsArr = useSelector(state => state.daylogs.allDaylogs);
    const dayLogsById = useSelector(state => state.daylogs.byId);


    const filteredAndSortedArray = dayLogsArr
        .filter(dayLog => dayLog.userId === sessionUser.id)



    useEffect(() => {
        dispatch(getDailyLogsAllThunk())
    }, [dispatch])


    const handleCard = workout => navigate(`/workoutform/${workout.id}`)
    const handleBack = () => navigate(-1)
    const handlePlusWorkout = () => { navigate("/workouts") }
    const handlePlusGrub = () => { navigate("/grubs") }



    const handleHoursDiv = (e) => {
        console.log("click happened")
        // console.log("e.target = ", e.target)
        const daycardId = e.target.closest('[data-daycardid]')?.getAttribute('data-daycardid');
        const workoutId = e.target.closest('[data-daycardid]')?.getAttribute('data-workoutid');
        const grubId = e.target.closest('[data-daycardid]')?.getAttribute('data-grubid');

        console.log("__handleHoursDiv__daycardId = ", daycardId)
        console.log("__handleHoursDiv__workoutId = ", workoutId)
        console.log("__handleHoursDiv__grubId = ", grubId)



        console.log ("dayLogsArr = ", dayLogsArr)
        console.log("\n\n")
        console.log ("dayLogsById = ", dayLogsById)
        console.log("\n\n")
        console.log("dayLogsById[grubId]  = ", dayLogsById[grubId])
        console.log("\n\n")
        console.log("dayLogsById[workoutId]  = ", dayLogsById[workoutId])

        const currentdayLog = dayLogsById[grubId] ? dayLogsById[grubId] : dayLogsById[workoutId]

        //PUT
            // navigate(`/daylogform/${daycardId}`) //PUT
            navigate(`/daylogform/${daycardId}`, {
                state: {
                    newDayLog: false,
                    currentDayLog: currentdayLog
                }
            }) //PUT

    };


    const formattedDate = format_Month_Date_Year(selectedDate);


    // Handle date change from the calendar
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const findLogsForHour = (hourIndex) => {
        return filteredAndSortedArray.filter(log => {
            const logDate = new Date(log.timestamp);
            const logHour = logDate.getHours();

            return logHour === hourIndex &&
                logDate.getFullYear() === selectedDate.getFullYear() &&
                logDate.getMonth() === selectedDate.getMonth() &&
                logDate.getDate() === selectedDate.getDate();
        });
    };

    const handlePrevDayBtn = () => {
        setSelectedDate(old_value => {  //old_value from React: "useState"
            const newDate = new Date(old_value);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    }

    const handleNextDayBtn = () => {
        setSelectedDate(old_value => {
            const newDate = new Date(old_value);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    }



    return (
        <div className="dayLogPage_div">
            <h3>DayLogPage.jsx</h3>
            <h3 >Email = {sessionUser?.email}</h3>

            {/* top buttons */}
            <div className="max_HFlex workout_btn_div">
                <button
                    className="_button blue"
                    type="button"
                    onClick={handleBack}
                >
                    BACK
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
                </div>
            </div>

            <CustomCalendar
                value={selectedDate}
                onChange={handleDateChange} // Update selected date on calendar change
            />


            {/* header + previous + next buttons */}
            <div className="dp_header">
                <button
                    className="dph_btn black_font orange round"
                    onClick={handlePrevDayBtn}
                >
                    <i className="fa-solid fa-caret-left"></i>
                </button>
                <h2>{formattedDate}</h2>
                <button
                    className="black_font  orange dph_btn round"
                    onClick={handleNextDayBtn}
                >
                    <i className="fa-solid fa-caret-right"></i>
                </button>
            </div>

            {/* Insert DayLog Cards b2 hour divs*/}
            <div className="dp_grid center">
                {hours.map((hour, index) => (
                    <div
                        className="dpg_hour clickable"
                        key={index}
                    // onClick={(e) => handleHoursDiv(e, hour)}
                    >
                        <div className="dpgh_label">{hour}</div>
                        <div className="dpgh_content">
                            {findLogsForHour(index).length > 0 ? (
                                findLogsForHour(index).map(log => (
                                    <DayLogCard
                                        key={log.id}
                                        daylog={log}
                                        handleClick={(e) => handleHoursDiv(e, hour)} // Pass the onClick handler as a prop
                                    />
                                ))
                            ) : (
                                "click to enter food/exercise"
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default DayLogPage;

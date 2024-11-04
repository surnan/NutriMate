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

    const handleBack = () => navigate(-1)
    const handlePlusWorkout = () => { navigate("/workouts") }
    const handlePlusGrub = () => { navigate("/grubs") }
    const handleWeights = () => { navigate("/weights") }

    const handleHoursDiv = (e) => {
        console.log("click happened")
        const daycardId = e.target.closest('[data-daycardid]')?.getAttribute('data-daycardid');
        const workoutId = e.target.closest('[data-daycardid]')?.getAttribute('data-workoutid');
        const grubId = e.target.closest('[data-daycardid]')?.getAttribute('data-grubid');
        const currentdayLog = dayLogsById[grubId] ? dayLogsById[grubId] : dayLogsById[workoutId]

        //PUT
        navigate(`/daylogform/${daycardId}`, { //PUT
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
        <div className="vertical_center_flex container-width">
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
                    onChange={handleDateChange} // Update selected date on calendar change
                />
            </div>

            {/* header + previous + next buttons */}
            <div className="dp_header">
                <button
                    className="dph_btn black_font white round"
                    onClick={handlePrevDayBtn}
                >
                    <i className="fa-solid fa-caret-left"></i>
                </button>
                <h2>{formattedDate}</h2>
                <button
                    className="black_font white dph_btn round"
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
                                ""
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default DayLogPage;

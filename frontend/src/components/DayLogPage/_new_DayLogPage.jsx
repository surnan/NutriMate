//frontend/src/componenets/DayLogPage/DayLogPage.jsx

import "./DayLogPage.css";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDailyLogsAllThunk } from "../../redux/daylogs";
import { useNavigate } from "react-router-dom";
import DayLogCard from "../DayLogCard";
import CustomCalendar from "../CustomCalendar";
import { format_Month_Date_Year } from "../../utils/MyFunctions";

const hours = [
    "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM",
    "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM",
    "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
];

const DayLogPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const dayLogsArr = useSelector(state => state.daylogs.allDaylogs);

    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        dispatch(getDailyLogsAllThunk());
    }, [dispatch]);

    const navigateCB = useCallback((path) => navigate(path), [navigate]);

    const filteredAndSortedLogs = dayLogsArr
        .filter(dayLog => dayLog.userId === sessionUser.id);

    const handleHoursDivClick = useCallback((e) => {
        const daycardId = e.target.closest('[data-daycardid]')?.getAttribute('data-daycardid');
        const workoutId = e.target.closest('[data-daycardid]')?.getAttribute('data-workoutid');
        if (workoutId && daycardId) {
            // navigateCB(`/daylogform/${daycardId}`);
            navigateCB(`/daylogform/${daycardId}`, { state: { newDayLog: false, newWorkoutObj: null } });
        }
    }, [navigateCB]);

    const handleDateChange = (date) => setSelectedDate(date);

    const handleDayChange = (days) => {
        setSelectedDate(oldValue => {
            const newDate = new Date(oldValue);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        });
    };

    const findLogsForHour = useCallback((hourIndex) => {
        return filteredAndSortedLogs.filter(log => {
            const logDate = new Date(log.timestamp);
            return (
                logDate.getHours() === hourIndex &&
                logDate.getFullYear() === selectedDate.getFullYear() &&
                logDate.getMonth() === selectedDate.getMonth() &&
                logDate.getDate() === selectedDate.getDate()
            );
        });
    }, [filteredAndSortedLogs, selectedDate]);

    const formattedDate = format_Month_Date_Year(selectedDate);

    return (
        <div className="dayLogPage_div">
            <h3>DayLogPage.jsx</h3>
            <h3>Email = {sessionUser?.email}</h3>

            {/* Top Buttons */}
            <div className="max_HFlex workout_btn_div">
                <button className="_button blue" onClick={() => navigateCB(-1)}>BACK</button>
                <div>
                    <button className="_button orange" onClick={() => navigateCB("/workouts")}>+ Workout</button>
                    <button className="_button green" onClick={() => navigateCB("/grubs")}>+ Grub</button>
                </div>
            </div>

            <CustomCalendar value={selectedDate} onChange={handleDateChange} />

            {/* Header with Previous/Next Buttons */}
            <div className="dp_header">
                <button className="dph_btn black_font orange round" onClick={() => handleDayChange(-1)}>
                    <i className="fa-solid fa-caret-left"></i>
                </button>
                <h2>{formattedDate}</h2>
                <button className="black_font orange dph_btn round" onClick={() => handleDayChange(1)}>
                    <i className="fa-solid fa-caret-right"></i>
                </button>
            </div>

            {/* DayLog Hourly Grid */}
            <div className="dp_grid center">
                {hours.map((hour, index) => (
                    <div className="dpg_hour clickable" key={index}>
                        <div className="dpgh_label">{hour}</div>
                        <div className="dpgh_content">
                            {findLogsForHour(index).length > 0 ? (
                                findLogsForHour(index).map(log => (
                                    <DayLogCard
                                        key={log.id}
                                        daylog={log}
                                        handleClick={handleHoursDivClick}
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

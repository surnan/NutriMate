//frontend/src/componenets/DayLogPage/DayLogPage.jsx
import "./DayLogPage.css";
import DayLogModal from "../DayLogModal";
import { useState, useRef, useEffect } from "react";
import { getDailyLogsAllThunk } from "../../redux/daylogs"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import DayLogCard from "../DayLogCard";
import CustomCalendar from "../CustomCalendar";


const hours = [
    "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
];

const DayLogPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const [showCreateDayLogModal, setShowCreateDayLogModal] = useState(false);
    const [showHour, setShowHour] = useState(12);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const sessionUser = useSelector((state) => state.session.user);
    const dayLogsArr = useSelector(state => state.daylogs.allDaylogs);


    const filteredAndSortedArray = dayLogsArr
        .filter(dayLog => dayLog.userId === sessionUser.id)

    useEffect(() => {
        dispatch(getDailyLogsAllThunk())
    }, [dispatch])

    useEffect(() => {
        console.log('+++++ => dayLogsArr updated ==> ', dayLogsArr);
    }, [dayLogsArr]);



    const handleHourClick = (e, hour) => {
        console.log("click happened")
        console.log("hour = ", hour)
        console.log("e.target = ", e.target)
        // setShowHour(hour)
        // setShowCreateDayLogModal(true)

        const daycardId = e.target.closest('[data-daycardid]')?.getAttribute('data-daycardid');
        const isWorkout = e.target.closest('[data-daycardid]')?.getAttribute('data-workout');
        const isGrub = e.target.closest('[data-daycardid]')?.getAttribute('data-grub');

        console.log("isWorkout = ", isWorkout)
        console.log("isGrub = ", isGrub)
        console.log("daycardId = ", daycardId)

        if (isWorkout) {
            navigate('/DayLogFormWorkout',
                {
                    state:
                    {
                        newWorkout: false,
                        currentData: {
                            daycardId,
                            isWorkout,
                            isGrub
                        }
                    }
        })}
    };

    const handleModalClose = () => {
        setShowCreateDayLogModal(false)
        setShowHour(null)
    };


    const handlePageClick = (e) => {
        if (modalRef.current && !modalRef.current.querySelector('.daily_extend_modal_window_all').contains(e.target)) {
            setShowCreateDayLogModal(false);
        }
    };

    useEffect(() => {
        if (showCreateDayLogModal) {
            document.addEventListener("mousedown", handlePageClick);
        } else {
            document.removeEventListener("mousedown", handlePageClick);
        }
        return () => {
            document.removeEventListener("mousedown", handlePageClick);
        };
    }, [showCreateDayLogModal]);

    const handleBackBtn = () => { navigate(-1) };

    // const formattedDate = new Date().toLocaleDateString('en-US', {
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

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
        console.log("PREV Button clicked")
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    }

    const handleNextDayBtn = () => {
        console.log("NEXT Button clicked")
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    }

    // const handleNewDaily = () => { nav('/daylogform') }
    const handleNewWorkout = () => { navigate("/workouts") }
    const handleNewGrubs = () => { navigate("/grubs") }

    return (
        <div className="dayLogPage_div">
            <h3>DayLogPage.jsx</h3>
            <h3 >Email = {sessionUser?.email}</h3>

            {/* top buttons */}
            <div className="max_HFlex workout_btn_div">
                <button
                    className="_button blue"
                    type="button"
                    onClick={handleBackBtn}
                >
                    BACK
                </button>
                <div>
                    <button
                        className="_button orange"
                        onClick={handleNewWorkout}
                    >
                        + Workout
                    </button>

                    <button
                        className="_button green"
                        onClick={handleNewGrubs}
                    >
                        + Grub
                    </button>
                </div>
            </div>

            <CustomCalendar
                value={selectedDate}
                onChange={handleDateChange} // Update selected date on calendar change
            />


            {/* header displaying Date & previous/next buttons */}
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

            {/* Day Grid View */}
            <div className="dp_grid center">
                {hours.map((hour, index) => (
                    <div
                        className="dpg_hour clickable"
                        key={index}
                        onClick={(e) => handleHourClick(e, hour)}
                    >
                        <div className="dpgh_label">{hour}</div>
                        <div className="dpgh_content">
                            {findLogsForHour(index).length > 0 ? (
                                findLogsForHour(index).map(log => (
                                    <DayLogCard key={log.id} daylog={log} />
                                ))
                            ) : (
                                "click to enter food/exercise"
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {showCreateDayLogModal && (
                <div
                    className="WTF"
                    ref={modalRef}
                >
                    <DayLogModal
                        onClose={handleModalClose}
                        onSubmit={handleHourClick}
                    />
                </div>
            )}
        </div>
    );
};
export default DayLogPage;

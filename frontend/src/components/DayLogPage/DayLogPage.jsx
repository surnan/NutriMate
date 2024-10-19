//frontend/src/componenets/DayLogPage/DayLogPage.jsx
import "./DayLogPage.css";
import DayLogModal from "../DayLogModal";
import { useState, useRef, useEffect } from "react";

const hours = [
    "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
];

const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});

const DailyPage = () => {
    const [showCreateDayLogModal, setShowCreateDayLogModal] = useState(false);
    const [showHour, setShowHour] = useState(12);
    const modalRef = useRef(null);

    const handleHourClick = (hour) => {
        setShowHour(hour)
        setShowCreateDayLogModal(true)
    };

    const handleModalClose = () => {
        setShowCreateDayLogModal(false)
        setShowHour(null)
    };

    const handlePageClick = (e) => {
        setShowCreateDayLogModal(false);
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


    return (
        <div className="dailypage_div">
            <div className="dp_header">
                <button
                    className="dph_btn black_font orange round"
                >
                    <i className="fa-solid fa-caret-left"></i>
                </button>
                <h2>{formattedDate}</h2>
                <button
                    className="black_font  orange dph_btn round"
                >
                    <i className="fa-solid fa-caret-right"></i>
                </button>
            </div>

            <div className="dp_grid center">
                {hours.map((hour, index) => (
                    <div
                        className="dpg_hour clickable"
                        key={index}
                        onClick={() => handleHourClick(hour)}
                    >
                        <div className="dpgh_label">{hour}</div>
                        <div className="dpgh_content"> click to enter food/excercise </div>
                    </div>
                ))}
            </div>
            {showCreateDayLogModal && (
                <div ref={modalRef}>
                    <DayLogModal
                        onClose={handleModalClose}
                        onSubmit={handleHourClick}
                    />
                </div>
            )}
        </div>
    );
};
export default DailyPage;
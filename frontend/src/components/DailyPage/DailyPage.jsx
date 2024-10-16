//frontend/src/componenets/DailyPage/DailyPage.jsx
import "./DailyPage.css";
import UpdateDailyModal from "../UpdateDailyModal";
import { useState } from "react";

// Array to hold the hours in both AM/PM format
const hours = [
    "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
];

const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

console.log("formattedAte = ", formattedDate)

const DailyPage = () => {
    const [showCreateDailyModal, setShowCreateDailyModal] = useState(false);
    const [showHour, setShowHour] = useState(12);

    const handleHourClick = (hour) => {
        setShowHour(hour)
        setShowCreateDailyModal(true)
        console.log(`Clicked on time: ${showHour}`);
    };

    const handleModalClose = () => {
        setShowCreateDailyModal(false)
        setShowHour(null)
    };


    return (
        <div className="dailypage_div">
            <div className="daily_date_header">
                <button>
                    <i className="fas fa-user-circle black_font" />
                </button>
                <h3>{formattedDate}</h3>
                <button>
                    <i className="fas fa-user-circle black_font" />
                </button>
            </div>

            <div className="dailyPage_grid center">
                {hours.map((hour, index) => (
                    <div
                        className="daily_page_hour clickable"
                        key={index}
                        onClick={() => handleHourClick(hour)}
                    >
                        <div className="hour_label">{hour}</div>
                        <div className="hour_content"> click to enter food/excercise </div>
                    </div>
                ))}
            </div>
            {showCreateDailyModal && (
                <UpdateDailyModal
                onClose={handleModalClose}
                onSubmit={handleHourClick}
                />)}
        </div>
    );
};
export default DailyPage;

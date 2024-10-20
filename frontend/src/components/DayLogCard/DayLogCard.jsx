// frontend/src/componenets/WorkouttCard/DayLogCard.jsx
import "./DayLogCard.css";

function DayLogCard({ daylog }) {

    //   const { timestamp, name, calories, unit, unitType, Grub, Workout } = daylog
    const { timestamp, name, calories, User } = daylog

    // return (
    //     <div className="dayLog_card_grid">
    //         <div>
    //             <p><strong>{name}</strong> </p>
    //             <p> Calories: {calories}</p>
    //         </div>
    //         <p>Date: {timestamp}</p>
    //         <p>{User?.email}</p>
    //     </div>
    // );

    return (
        <div className="dayLog_card_grid">
            <div>
                <p><strong>{name}</strong> </p>
                <p> Calories: {calories}</p>
            </div>
        </div>
    );



}

export default DayLogCard;
// frontend/src/componenets/WorkouttCard/DayLogCard.jsx
import "./DayLogCard.css";

function DayLogCard({ daylog }) {

    const { id, name, calories } = daylog

    console.log("--< inside daycard --> card = ", daylog)

    return (
        <div className="dayLog_card_grid" data-daycardid={id}>
            <p><strong>{name}</strong></p>
            <p>Calories: {calories}</p>
        </div>
    );
}

export default DayLogCard;
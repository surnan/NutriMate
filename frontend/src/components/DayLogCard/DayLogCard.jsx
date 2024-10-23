// frontend/src/componenets/WorkouttCard/DayLogCard.jsx
import "./DayLogCard.css";

function DayLogCard({ daylog }) {

    const { id, name, calories, grubId, workoutId } = daylog

    console.log("/n/n")
    console.log("--< inside daycard --> card = ")
    console.log("grubId => ", grubId)
    console.log("workoutId => ", workoutId)
    console.log("dayLog = ", daylog)



    return (
        <div className="dayLog_card_grid"
            data-daycardid={id}
            data-workout={grubId}
            data-grub={workoutId}
        >
            <p><strong>{name}</strong></p>
            <p>Calories: {calories}</p>
        </div>
    );
}

export default DayLogCard;
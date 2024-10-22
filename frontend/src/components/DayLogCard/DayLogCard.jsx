// frontend/src/componenets/WorkouttCard/DayLogCard.jsx
import "./DayLogCard.css";

function DayLogCard({ daylog }) {

    const { id, name, calories, grubId, workoutId } = daylog

    console.log("--< inside daycard --> card = ", daylog)
    
    const isGrubId = !grubId ? true: false
    const isWorkoutId = !workoutId ? true: false

    return (
        <div className="dayLog_card_grid"
            data-daycardid={id}
            data-workout={isGrubId}
            data-grub={isWorkoutId}
        >
            <p><strong>{name}</strong></p>
            <p>Calories: {calories}</p>
        </div>
    );
}

export default DayLogCard;
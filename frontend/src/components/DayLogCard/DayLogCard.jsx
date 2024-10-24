// frontend/src/componenets/WorkouttCard/DayLogCard.jsx
import "./DayLogCard.css";

function DayLogCard({ daylog, handleClick }) {

    const { id, name, calories, grubId, workoutId } = daylog

    console.log("/n/n")
    console.log("--< inside daycard --> card = ")
    console.log("__DayLogCard__grubId => ", grubId)
    console.log("__DayLogCard__workoutId => ", workoutId)
    console.log("__DayLogCard__dayLog = ", daylog)



    return (
        <div className="dayLog_card_grid"
        //  "data-daycardid" must be all-lowercase
            data-daycardid={id}
            data-workoutid={workoutId}
            data-grubid={grubId}
            onClick={handleClick} 
        >
            <p><strong>{name}</strong></p>
            <p>Calories: {calories}</p>
        </div>
    );
}

export default DayLogCard;
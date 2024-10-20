// frontend/src/componenets/WorkouttCard/DayLogCard.jsx
import "./DayLogCard.css";

function DayLogCard({ daylog }) {

  const { timestamp, name, calories, unit, unitType, Grub, Workout } = workout

  return (
    <>
      <div className="dayLog_card_grid">
        <p><strong>{name}</strong> </p>
        <p> Calories: {calories}</p>
        <p>Date: {timestamp}</p>
        <p>{User?.email}</p>
      </div>
    </>
  );
}

export default DayLogCard;
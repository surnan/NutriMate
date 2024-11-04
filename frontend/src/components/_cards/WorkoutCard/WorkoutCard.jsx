// frontend/src/componenets/WorkouttCard/WorkoutCard.jsx
import "./WorkoutCard.css";

function WorkoutCard({ workout }) {

  const { name, description, User } = workout

  return (
    <>
      <div className="workout_card_grid">
        <p><strong>{name}</strong> </p>
        <p>{description.length > 75 ? description.slice(0, 75) + "..." : description}</p>
        <p>{User?.email}</p>
      </div>
    </>
  );
}

export default WorkoutCard;
// frontend/src/components/WorkoutCard/WorkoutCard.jsx
import "./WorkoutCard.css";

// function WorkoutCard({ workout }) {
const WorkoutCard = ({ workout, imageUrl }) => {

  const { name, description } = workout

  return (
    <div className="workout_card_grid center">
      <p>{name}</p>
      <p>{description.length > 75 ? description.slice(0, 75) + "..." : description}</p>
      <div>
        <img
          src={imageUrl}
          alt="img"
          style={{ height: "125px", width: "125px" }}
          className="round"
        />
      </div>
    </div>
  );
}

export default WorkoutCard;
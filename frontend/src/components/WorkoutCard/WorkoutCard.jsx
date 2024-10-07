// frontend/src/componenets/WeightCard/WeightCard.jsx
import "./WorkoutCard.css";

function WorkoutCard({ workout }) {

  const { name, description, User} = workout


  return (
    <div className="workout_card_hFlex">
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>User: {User?.email ?? "none"}</strong></p>
    </div>
  );
}

export default WorkoutCard;

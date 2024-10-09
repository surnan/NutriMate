// frontend/src/componenets/WeightCard/WeightCard.jsx
import "./WorkoutCard.css";

function WorkoutCard({ workout }) {

  const { name, description, userId, User } = workout

  return (
    <>
      <div className="workout_card_grid">
        {/* <p><strong>Name:</strong> {name}</p> */}
        <p><strong>{name}</strong> </p>
        <p>{description.length > 20 ? description.slice(0, 20) + "..." : description}</p>
        <p>User.id: {User?.id} &nbsp;&nbsp;&nbsp; userId: {userId}</p>
      </div>
    </>
  );
}

export default WorkoutCard;
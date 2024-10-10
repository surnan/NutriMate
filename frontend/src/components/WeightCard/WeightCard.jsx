// frontend/src/componenets/WeightCard/WeightCard.jsx
import "./WeightCard.css";

function WeightCard({ weight }) {

  const { current, start, goal, day, User } = weight

  const formattedDate = new Date(day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="weight_card_grid">
      <p><strong>Username:</strong> {User.username}</p>
      <br/>
      <p><strong>Date:</strong> {formattedDate}</p>
      <p><strong>Start Wt:</strong> {start}</p>
      <p><strong>Current Wt:</strong> {current}</p>
      <p><strong>Goal Wt:</strong> {goal}</p>
    </div>
  );
}

export default WeightCard;

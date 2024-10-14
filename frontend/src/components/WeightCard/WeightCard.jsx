// frontend/src/componenets/WeightCard/WeightCard.jsx
import "./WeightCard.css";

function WeightCard({ weight }) {

  const { current, day, User } = weight

  const formattedDate = new Date(day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="weight_card_grid">
      <p><strong>Date:</strong> {formattedDate}</p>
      <p><strong>Current Wt:</strong> {current}</p>
      <br/>
      <p><strong>User Email:</strong> {User?.email}</p>
    </div>
  );
}

export default WeightCard;

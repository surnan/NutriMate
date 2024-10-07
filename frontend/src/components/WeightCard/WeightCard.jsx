// frontend/src/componenets/WeightCard/WeightCard.jsx
import "./WeightCard.css";

function WeightCard({ weight }) {

  const { current, start, goal } = weight

  return (
    <div className="weight_card_hFlex">
      <p>Start Wt: {start}</p>
      <p>Current Wt: {current}</p>
      <p>Goal Wt: {goal}</p>
    </div>
  );
}

export default WeightCard;

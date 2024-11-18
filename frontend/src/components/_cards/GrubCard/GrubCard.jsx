// frontend/src/components/GrubCard/GrubCard.jsx
import "./GrubCard.css";

// const GrubCard = ({ grub }) => {
const GrubCard = ({ workout, imageUrl }) => {
  const { name, servingUnit, servingSize, calories } = grub
  const { User, company, protein, carbs, fats } = grub


  return (
    <div className="grub_card_grid">
      <p className="center">{company} {name}</p>
      <div className="grub_card_flex">
        <p><strong>Calories</strong>: {calories}</p>
        <p>{servingSize} {servingUnit}</p>
        <p></p>
      </div>
      <div className="grub_card_flex">
        <p><strong>Protein:</strong> {protein}</p>
        <p><strong>Carbs:</strong> {carbs}</p>
        <p><strong>Fats:</strong> {fats}</p>
      </div>
      <p>{User?.email} </p>
    </div>
  );
}

export default GrubCard;
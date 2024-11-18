// frontend/src/components/GrubCard/GrubCard.jsx
import "./GrubCard.css";

// const GrubCard = ({ grub }) => {
const GrubCard = ({ grub, imageUrl }) => {
  const { name, servingUnit, servingSize, calories } = grub
  const { User, company, protein, carbs, fats } = grub


  return (
    <div className="grub_card_grid center">
      <p className="center">{company} {name}</p>

      <div className="grub_card_flex">
        <p><strong>Calories</strong>: {calories}</p>
        <p>{servingSize} {servingUnit}</p>
        <p></p>
      </div>

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

export default GrubCard;
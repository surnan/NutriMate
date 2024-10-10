// frontend/src/components/GrubCard/GrubCard.jsx
import "./GrubCard.css";

const GrubCard = ({ grub }) => {

  const { name, servingUnit, servingSize, calories} = grub
  const { User, company, description, userId } = grub


  return (
    <div className="grub_card_grid">
      <p>{company} {name}</p>
      <p>{description.length > 20 ? description.slice(0, 20) + "..." : description}</p>
      <p>{servingSize} {servingUnit}</p>
      <p>Calories: {calories}</p>
      <p>User.id: {User?.id} &nbsp;&nbsp;&nbsp; userId: {userId}</p>
    </div>
  );
}

export default GrubCard;
// frontend/src/components/GrubCard/GrubCard.jsx

import "./GrubCard.css";



const GrubCard = ({ grub }) => {

  const { name, servingUnit, servingSize, calories, protein } = grub
  const { fats, carbs, sugar, company, description, userId } = grub

  return (
    <div className="grub_card_hFlex">
      <p>Name: {company} {name}</p>
      <p>Serving: {servingSize} {servingUnit}</p>
      <p>Calories: {calories}</p>
      <div className="grubCard_hFlex">
        <p>Protein: {protein}</p>
        <p>Fat: {fats}</p>
        <p>Carbs: {carbs}</p>
        <p>Sugar: {sugar}</p>
      </div>
      <p>Description: {description}</p>
    </div>

  );
}

export default GrubCard;
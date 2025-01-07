// frontend/src/components/GrubCard/GrubCard.jsx

import "./GrubDetailCard.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGrubImagesForGrubThunk } from "../../../redux/grubImages";
import ImageDisplay from "../../_components/ImageDisplay";

const GrubDetailCard = ({ grub, imageUrl }) => {
  const { id, name, servingUnit, servingSize, calories, sugar } = grub
  const { User, company, protein, carbs, fats, description } = grub

  const grubImgArr = useSelector(state => state.grubimages.allGrubImages);
  const grubImage = grubImgArr.find(image => image.grubId === id);
  imageUrl = grubImage ? grubImage.url : null;

  return (
    <div className="grubDetail_card_grid">
      <h1> {company} {name}</h1>
      <h3>Per Serving: {servingSize} {servingUnit}</h3>

      <h4>Calories: {calories}</h4>
      <div className="grub-card-grid-facts">
        <p>Protein: </p>
        <p>{protein}</p>
        <p>Fats: </p>
        <p>{fats}</p>
        <p>Carbs: </p>
        <p>{carbs}</p>
        <p>Sugar: </p>
        <p>{sugar}</p>
      </div>

      <div className="grub-card-description">
        <h3 className="card-description">DESCRIPTION</h3>
        <p className="card-description-txt">{description}</p>
      </div>
    </div>
  );
}

export default GrubDetailCard;

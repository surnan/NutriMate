// frontend/src/components/GrubCard/GrubCard.jsx

import "./GrubDetailCard.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGrubImagesForGrubThunk } from "../../../redux/grubImages";
import ImageDisplay from "../../_components/ImageDisplay";

const GrubDetailCard = ({ grub }) => {
  const { id, name, servingUnit, servingSize, calories } = grub
  const { User, company, protein, carbs, fats } = grub

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getGrubImagesForGrubThunk(id));
    }
  }, [dispatch, id]);

  const grubImg = useSelector((state) => state.grubimages.byGrubId[id] || []);

  return (
    <div>
      <p>{name}</p>
      <p><strong>Calories</strong>: {calories}</p>
      <p>{servingSize} {servingUnit}</p>
      <ImageDisplay imgArr={grubImg} className="rounded-image thick_border" height="100px" width="100px" />
    </div>
  );
}

export default GrubDetailCard;



/*

  return (
    <div className="grubDetail_card_grid">
      <p className="center">{company} {name}</p>
      <div className="grubDetail_card_flex">
        <p><strong>Calories</strong>: {calories}</p>
        <p>{servingSize} {servingUnit}</p>
        <p></p>
      </div>
      <div className="grubDetail_card_flex">
        <p><strong>Protein:</strong> {protein}</p>
        <p><strong>Carbs:</strong> {carbs}</p>
        <p><strong>Fats:</strong> {fats}</p>
      </div>
      <p>{User?.email} </p>
      <ImageDisplay imgArr={grubImg} className="rounded-image thick_border" height="100px" width="100px" />
    </div>
  );


*/
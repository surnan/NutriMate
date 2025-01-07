// frontend/src/components/_cards/WorkoutDetailCard/WorkoutDetailCard.jsx

import "./WorkoutDetailCard.css"
import { useSelector } from "react-redux";

function WorkoutDetailCard({ workout, imageUrl }) {
  const { id, name, description } = workout

  const workoutImgArr = useSelector(state => state.workoutimages.allWorkoutImages);
  const workoutImage = workoutImgArr.find(image => image.workoutId === id);
  imageUrl = workoutImage ? workoutImage.url : null;


  
  return (
    <div className="workoutDetail_card_grid">
      <h1>{name}</h1>
      <div className="grub-card-description">
        <h3 className="card-description">DESCRIPTION</h3>
        <p className="card-description-txt">zzz {description}</p>
      </div>
    </div>
  );
}

export default WorkoutDetailCard;

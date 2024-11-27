// frontend/src/components/_cards/WorkoutDetailCard/WorkoutDetailCard.jsx

import "./WorkoutDetailCard.css"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWorkoutImagesForWorkoutThunk } from "../../../redux/workoutImages";
import ImageDisplay from "../../_components/ImageDisplay";

function WorkoutDetailCard({ workout }) {
  // const { id, name, description, User } = workout;
  const { id, name, description} = workout;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getWorkoutImagesForWorkoutThunk(id));
    }
  }, [dispatch, id]);

  const workoutImg = useSelector((state) => state.workoutimages.byWorkoutId[id] || []);

  return (
    <div className="workoutDetail_card_grid center">
      <p>{name}</p>
      <p>{description.length > 75 ? description.slice(0, 75) + "..." : description}</p>
      <ImageDisplay imgArr={workoutImg} className="rounded-image thick_border" height="100px" width="100px" />
    </div>
  );
}

export default WorkoutDetailCard;

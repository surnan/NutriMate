// frontend/src/componenets/WorkouttCard/WorkoutCard.jsx
import "./WorkoutDetailCard.css";
import { getWorkoutImagesForWorkoutThunk} from "../../../redux/workoutImages";
import ImageDisplay from "../../_components/ImageDisplay";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function WorkoutDetailCard({ workout }) {

  const { id, name, description, User } = workout
  const dispatch = useDispatch();


  useEffect(() => {
    if (id) {
      dispatch(getWorkoutImagesForWorkoutThunk(id));
    }
  }, [dispatch, id]);

  const workoutImg = useSelector((state) => state.workoutimages.currentworkout)

  return (
    <>
      <div className="workout_card_grid">
        <p>id = {id}</p>
        <p><strong>{name}</strong> </p>
        <p>{description.length > 75 ? description.slice(0, 75) + "..." : description}</p>
        <p>{User?.email}</p>

        {/* Render the image */}
        <ImageDisplay
          imgArr={workoutImg}
        />

      </div>
    </>
  );
}

export default WorkoutDetailCard;
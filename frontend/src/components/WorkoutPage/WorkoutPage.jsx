// frontend/src/components/WorkoutPage/WorkoutPage.jsx

import "./WorkoutPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkoutsAllThunk } from "../../redux/workouts"
import { useNavigate } from "react-router-dom"
import WorkoutCard from "../WorkoutCard";
import DeleteWorkoutModal from "../DeleteWorkoutModal/DeleteWorkoutModal";


const WorkoutPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();

  const workoutsArr = useSelector(state => state.workouts.allWorkouts);

  const [showDeletetModal, setShowDeletetModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);


  const handleNewWorkout = () => { nav('/workoutform') }

  const handleDeleteBtn = (e, workout) => {
    e.preventDefault();
    setSelectedWorkout(workout);
    setShowDeletetModal(true)
  }

  const handleModalClose = () => {
    setShowDeletetModal(false)
    setSelectedWorkout(null)
  };


  useEffect(() => {
    dispatch(getWorkoutsAllThunk())
  }, [dispatch, showDeletetModal])

  // console.log("=====> workoutsArr ==> ", workoutsArr)

  return (
    <div>

      <h3>WorkoutPage.jsx</h3>
      <button onClick={handleNewWorkout}>CREATE</button>
      <br />
      <br />
      {
        workoutsArr.map((workout, idx) => (
          <div
            key={`${idx}-workout`}
            onClick={ e => handleDeleteBtn(e, workout)}
          >
            {/* <p>{workout.name}</p> */}
            <WorkoutCard workout={workout} />
            <br />
          </div>
        ))
      }

      {showDeletetModal && (
          <DeleteWorkoutModal
            onClose={handleModalClose}
            onSubmit={handleDeleteBtn}
            workout={selectedWorkout}
          />
       )
      }

    </div>
  );
}

export default WorkoutPage;
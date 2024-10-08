// frontend/src/components/WorkoutPage/WorkoutPage.jsx

import "./WorkoutPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkoutsAllThunk } from "../../redux/workouts"
import { useNavigate } from "react-router-dom"
import WorkoutCard from "../WorkoutCard";

const WorkoutPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();

  const workoutsArr = useSelector(state => state.workouts.allWorkouts);
  const handleNewWorkout = () => {
    //need to pass in userId
    // nav('/grubform', { state: { newGrub: false, exampleData: grub} }); 
    nav('/workoutform')
  }

  useEffect(() => {
    dispatch(getWorkoutsAllThunk())
  }, [dispatch])

  const somethingDifferent = (e, workout) => {
    e.preventDefault();
    nav('/workoutform', { state: { newWorkout: true, exampleData: workout } });
  }

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
            onClick={e => somethingDifferent(e, workout)}
          >
            <WorkoutCard workout={workout} />
            <br />
          </div>
        ))
      }
    </div>
  );
}

export default WorkoutPage;
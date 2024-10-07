// frontend/src/components/WorkoutPage/WorkoutPage.jsx

import "./WorkoutPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkoutCard from "../WorkoutCard";


import { getWorkoutsAllThunk } from "../../redux/workouts"
import { useNavigate } from "react-router-dom"



const WorkoutPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();

  const workoutsArr = useSelector(state => state.workouts.allWorkouts);

  const handleNewWorkout = () => {nav('/workoutform')}

  useEffect(() => {
    dispatch(getWorkoutsAllThunk())
  }, [dispatch])

  // console.log("=====> workoutsArr ==> ", workoutsArr)

  return (
    <div>
  
    <h3>WorkoutPage.jsx</h3>
    <button onClick={handleNewWorkout}>CREATE</button>
    <br/>
    <br/>
    {
      workoutsArr.map((workout, idx) => (
        <div
          key={`${idx}-workout`}
        >
          {/* <p>{workout.name}</p> */}
          <WorkoutCard workout = {workout} />
          <br/>
        </div>
      ))
    }
  </div>
  );
}

export default WorkoutPage;
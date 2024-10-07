// frontend/src/components/WeightPage/WeightPage.jsx

import "./WorkoutPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { getWeightsAllThunk } from "../../redux/weight";
import { getWorkoutsAllThunk } from "../../redux/workouts"
import { useNavigate } from "react-router-dom"

// import WeightCard from "../WeightCard";
// import DeleteWeightModal from '../DeleteWeightModal'


const WorkoutPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();

  const workoutsArr = useSelector(state => state.workouts.allWorkouts);

  useEffect(() => {
    dispatch(getWorkoutsAllThunk())
  }, [dispatch])

  // console.log("=====> workoutsArr ==> ", workoutsArr)

  return (
    <div>
  
    <h3>WorkoutPage.jsx</h3>
    <br/>
    <br/>
    {
      workoutsArr.map((weight, idx) => (
        <div
          key={`${idx}-weight`}
          onClick={ e => handleDeleteBtn(e, weight)}
        >
          <p>{weight.name}</p>
          <br/>
        </div>
      ))
    }
  </div>
  );
}

export default WorkoutPage;
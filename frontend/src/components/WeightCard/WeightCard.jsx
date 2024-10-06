// frontend/src/componenets/WeightCard/WeightCard.jsx
import "./WeightCard.css";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
// import { getWeightsAllThunk } from "../../redux/weight";


function WeightCard({ weight }) {

  // const { height, heightUnit, start, goal } = weight
  // const { current, day, weightUnit, userId } = weight
  const { current, start, goal } = weight

  return (
    <div>
      <p> Start Wt: {start} ... Current Wt: {current} ... Goal Wt:  {goal}</p>
    </div>
  );
}

export default WeightCard;

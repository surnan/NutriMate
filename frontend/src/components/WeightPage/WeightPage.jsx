// frontend/src/components/WeightPage/WeightPage.jsx

import "./WeightPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeightsAllThunk } from "../../redux/weight";
import WeightCard from "../WeightCard";
import { useNavigate } from "react-router-dom"


const WeightPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();
  
  const weightsArr = useSelector(state => state.weights.allWeights);

  const handleWeightClick = (e, weight) =>{
    e.preventDefault()
    e.stopPropagation()
    console.log("handleWeightClick")
    console.log("weight = ", weight)
    nav('/weightform')
    setShowDeletetModal(true)
    setshowUpdateModal(true)
    setshowPostModal(true)
  }


  const [showDeletetModal, setShowDeletetModal] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [showPostModal, setshowPostModal] = useState(false);

  
  useEffect(() => {
    dispatch(getWeightsAllThunk())
  }, [dispatch, showDeletetModal, showUpdateModal, showPostModal])


  return (
    <div>
  
      <h1>!! Weight Page !!</h1>
      {
        weightsArr.map((weight, idx) => (
          <div
            key={`${idx}-weight`}
            onClick={ e => handleWeightClick(e, weight)}
          >
            <WeightCard weight = {weight} />
          </div>
        ))
      }
    </div>
  );
}

export default WeightPage;
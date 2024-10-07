// frontend/src/components/WeightPage/WeightPage.jsx

import "./WeightPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeightsAllThunk } from "../../redux/weight";
import WeightCard from "../WeightCard";
import { useNavigate } from "react-router-dom"
import DeleteWeightModal from '../DeleteWeightModal'



const WeightPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();
  
  const weightsArr = useSelector(state => state.weights.allWeights);

  const [showDeletetModal, setShowDeletetModal] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [showPostModal, setshowPostModal] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(null);


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

  const handleNewWeight = () => {
    nav('/weightform')
  }

  const handleDeleteBtn = (e, weight) => {
    e.preventDefault();
    setSelectedWeight(weight); 
    setShowDeletetModal(true)
  }

  const handleModalClose = () => {
    setShowDeletetModal(false)
    setshowUpdateModal(false)
    setshowPostModal(false)
    setSelectedWeight(null)
};



  
  useEffect(() => {
    dispatch(getWeightsAllThunk())
  }, [dispatch, showDeletetModal, showUpdateModal, showPostModal])



  return (
    <div>
  
      <h1>!! Weight Page !!</h1>
      <button onClick={handleNewWeight}>CLICK ME</button>
      {
        weightsArr.map((weight, idx) => (
          <div
            key={`${idx}-weight`}
            onClick={ e => handleDeleteBtn(e, weight)}
          >
            <WeightCard weight = {weight} />
          </div>
        ))
      }

      <br/>
      <br/>

      {showDeletetModal && (
                <DeleteWeightModal
                    onClose={handleModalClose}
                    onSubmit={handleDeleteBtn}
                    weight={selectedWeight}
                />
            )}

    </div>
  );
}

export default WeightPage;
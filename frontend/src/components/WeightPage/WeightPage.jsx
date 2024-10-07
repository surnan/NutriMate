// frontend/src/components/WeightPage/WeightPage.jsx

import "./WeightPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeightsAllThunk } from "../../redux/weight";
import { useNavigate } from "react-router-dom"
import WeightCard from "../WeightCard";
import DeleteWeightModal from '../DeleteWeightModal'


const WeightPage = ({currentWeight}) => {
  const dispatch = useDispatch()
  const nav = useNavigate();
  
  const weightsArr = useSelector(state => state.weights.allWeights);

  const [showDeletetModal, setShowDeletetModal] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(null);


  const handleNewWeight = () => {nav('/weightform')}

  const handleDeleteBtn = (e, weight) => {
    e.preventDefault();
    setSelectedWeight(weight); 
    setShowDeletetModal(true)
  }

  const handleModalClose = () => {
    setShowDeletetModal(false)
    setSelectedWeight(null)
};

  
  useEffect(() => {
    dispatch(getWeightsAllThunk())
  }, [dispatch, showDeletetModal])



  return (
    <div>
  
      <h3>WeightPage.jsx</h3>
      <button onClick={handleNewWeight}>CREATE</button>
      <br/>
      <br/>
      {
        weightsArr.map((weight, idx) => (
          <div
            key={`${idx}-weight`}
            onClick={ e => handleDeleteBtn(e, weight)}
          >
            <WeightCard weight = {weight} />
            <br/>
          </div>
        ))
      }

      {showDeletetModal && (
                <DeleteWeightModal
                    onClose={handleModalClose}
                    onSubmit={handleDeleteBtn}
                    weight={selectedWeight}
                />
            )
      }
    </div>
  );
}

export default WeightPage;
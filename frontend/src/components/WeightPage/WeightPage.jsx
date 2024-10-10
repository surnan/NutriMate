// frontend/src/components/WeightPage/WeightPage.jsx

import "./WeightPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeightsAllThunk } from "../../redux/weight";
import { useNavigate } from "react-router-dom"
import WeightCard from "../WeightCard";

const WeightPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const weightsArr = useSelector(state => state.weights.allWeights);

  useEffect(() => {
    dispatch(getWeightsAllThunk())
  }, [dispatch])

  const somethingDifferent = (e, weight) => {
    e.preventDefault();
    navigate('/weightform', { state: { newWeight: true, exampleData: weight } });
  }

  const handleNewWeight = () => {
    navigate('/weightform')
  }

  return (
    <>
      <h3>WeightPage.jsx</h3>
      <button
        className="weightPage_createBtn"
        onClick={handleNewWeight}
      >
        CREATE
      </button>
      <div className="weight_page_grid">
        {
          weightsArr.map((weight, idx) => (
            <div
              key={`${idx}-weight`}
              onClick={e => somethingDifferent(e, weight)}
            >
              <WeightCard weight={weight} />
            </div>
          ))
        }
      </div>
    </>
  );
}

export default WeightPage;
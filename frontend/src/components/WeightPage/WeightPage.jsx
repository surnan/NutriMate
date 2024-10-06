// frontend/src/components/WeightPage/WeightPage.jsx

import "./WeightPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeightsAllThunk } from "../../redux/weight";



const WeightPage = () => {
  const dispatch = useDispatch()

  const weightsArr = useSelector(state => state.weights.allWeights);
  
  useEffect(() => {
    dispatch(getWeightsAllThunk())
  }, [dispatch])


  return (
    <div>
      <h1>!! Weight Page !!</h1>
      {
        weightsArr.map((weight, idx) => (
          <div
            key={`${idx}-weight`}
          >
            <p>{weight.current}</p>
          </div>
        ))
      }
    </div>
  );
}

export default WeightPage;
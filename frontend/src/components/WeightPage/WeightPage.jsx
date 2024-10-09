// frontend/src/components/WeightPage/WeightPage.jsx

import "./WeightPage.css";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeightsAllThunk } from "../../redux/weight";
import { useNavigate } from "react-router-dom"
import WeightCard from "../WeightCard";

const WeightPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();

  const weightsArr = useSelector(state => state.weights.allWeights);
  const handleNewWeight = () => {
    //need to pass in userId
    // nav('/grubform', { state: { newGrub: false, exampleData: grub} }); 
    nav('/weightform')
  }

  useEffect(() => {
    dispatch(getWeightsAllThunk())
  }, [dispatch])

  const somethingDifferent = (e, weight) => {
    e.preventDefault();
    nav('/weightform', { state: { newWeight: true, exampleData: weight } });
  }

  return (
    <div>
      <h3>WeightPage.jsx</h3>
      <button onClick={handleNewWeight}>CREATE</button>
      <br />
      <br />
      {
        weightsArr.map((weight, idx) => (
          <div
            key={`${idx}-weight`}
            onClick={e => somethingDifferent(e, weight)}
          >
            <WeightCard weight={weight} />
            <br />
          </div>
        ))
      }
    </div>
  );
}

export default WeightPage;
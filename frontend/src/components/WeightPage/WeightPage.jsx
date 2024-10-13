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

  const sessionUser = useSelector((state) => state.session.user);
  const weightsArr = useSelector(state => state.weights.allWeights);

  const filteredAndSortedArray = weightsArr
  // .filter(weight => weight.User.id === sessionUser.id)
  .sort((a, b) => new Date(a.day) - new Date(b.day));

  console.log("sessionUser = ", sessionUser)
  console.log("sortArray = ", filteredAndSortedArray)

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
      <h3 >Email = {sessionUser?.email}</h3>
      <button
        className="weightPage_createBtn"
        onClick={handleNewWeight}
      >
        CREATE
      </button>
      <div className="weight_page_grid">
        {
          
          filteredAndSortedArray.map((weight, idx) => (
            <div
              className="weight_card_div"
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
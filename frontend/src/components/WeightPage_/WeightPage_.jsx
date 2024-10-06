// frontend/src/componenets/WeightPage_/WeightPage_.jsx

import "./WeightPage.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getWeightsAllThunk } from "../../redux/weight";
import { useDispatch } from "react-redux";
// import WeightCard from "../WeightCard_";

function WeightPage_() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getWeightsAllThunk());
  }, [dispatch]);


  const sessionUser = useSelector((state) => state.session.user);
  // Handle early return before calling hooks
  if (sessionUser) {return <Navigate to="/" replace={true} />}
  const weightsArr = useSelector(state => state.weights.allWeights);

  
  console.log("====> weightsArr: ", weightsArr);

  return (
    <>
      <h1>!! WeightPage.jsx !!</h1>
      {
        weightsArr.map((weight, idx) => (
          <div
            key={`${weight.id}`}
          >
            {/* <WeightCard /> */}
            <p>hello</p>
          </div>
        ))
      }
    </>
  );
}

export default WeightPage_;
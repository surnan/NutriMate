// frontend/src/components/WeightPage/WeightPage.jsx

import '@fortawesome/fontawesome-free/css/all.min.css';
import "./WeightPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeightsAllThunk } from "../../redux/weight";
import { useNavigate } from "react-router-dom"
import WeightCard from "../_cards/WeightCard";
// import WeightChart from "../WeightChart/WeightChart";
// import LineGraph from "../LineGraph";
import LineGraph from "../_components/LineGraph";




const WeightPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const sessionUser = useSelector((state) => state.session.user);
  const weightsArr = useSelector(state => state.weights.allWeights);

  const filteredAndSortedArray = weightsArr
    .filter(weight => weight.userId === sessionUser.id)
    .sort((a, b) => {
      const dateA = new Date(a.day).getTime();
      const dateB = new Date(b.day).getTime();

      // Handle extremely old or future dates by pushing them to the end
      if (dateA < new Date('1900-01-01').getTime()) return 1;
      if (dateB < new Date('1900-01-01').getTime()) return -1;
      if (dateA > new Date('2100-01-01').getTime()) return 1;
      if (dateB > new Date('2100-01-01').getTime()) return -1;
      return dateA - dateB;
    });

  useEffect(() => {
    dispatch(getWeightsAllThunk())
  }, [dispatch])

  const somethingDifferent = (e, weight) => {
    e.preventDefault();
    navigate('/weightform', { state: { newWeight: true, currentData: weight } });
  }

  const handleNewWeight = () => { navigate('/weightform') }
  const handleBackBtn = () => { navigate(-1) };

  return (
    <div className="mainBodyStyle">
      <h3>WeightPage.jsx</h3>
      <h3 >Email = {sessionUser?.email}</h3>
      <div className="max_HFlex weight_btn_div">
        <button
          onClick={handleBackBtn}
          className="round daily_btn_font_size shadow blue clickable menuRoundBtn"
          title="Back"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          onClick={handleNewWeight}
          className="round daily_btn_font_size shadow green clickable menuRoundBtn"
          title="+ Create"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>



      <div>
        <LineGraph weights={filteredAndSortedArray} />
      </div>

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
    </div>
  );
}

export default WeightPage;
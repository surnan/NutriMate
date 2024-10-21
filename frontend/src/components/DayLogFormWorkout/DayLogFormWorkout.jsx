// frontend/src/componenets/DayLogFormWorkout/DayLogFormWorkout.jsx
import "./DayLogFormWorkout.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postWeightsOneThunk, updateWeightThunkById } from "../../redux/weight";
import DeleteWeightModal from '../DeleteWeightModal'


function DayLogFormWorkout() {
    

    return (
        <div className="mainBodyStyle">
            <h3>DayLogFormWorkout.jsx</h3>
        </div>
    );
}

export default DayLogFormWorkout;

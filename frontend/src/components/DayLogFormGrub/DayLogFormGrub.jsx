// frontend/src/componenets/DayLogFormGrub/DayLogFormGrub.jsx
import "./DayLogFormGrub.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postWeightsOneThunk, updateWeightThunkById } from "../../redux/weight";
import DeleteWeightModal from '../DeleteWeightModal'


function DayLogFormGrub() {
   

    return (
        <div className="mainBodyStyle">
            <h3>DayLogFormGrub.jsx</h3>
        </div>
    );
}

export default DayLogFormGrub;

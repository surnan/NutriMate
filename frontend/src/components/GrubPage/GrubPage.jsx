// frontend/src/components/GrubPage/GrubPage.jsx

import "./GrubPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGrubsAllThunk } from "../../redux/grubs";
import { useNavigate } from "react-router-dom"
import GrubCard from "../GrubCard/GrubCard";

// import DeleteWeightModal from '../DeleteWeightModal'


const GrubPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();

  const grubArr = useSelector(state => state.grubs.allGrubs);


  useEffect(() => {
    dispatch(getGrubsAllThunk())
  }, [dispatch])


  return (
    <div>
      <h1> GrubPage.jsx </h1>
      {
        grubArr.map((grub, idx) => (
          <div
            key={`${idx}-grub`}
          >
            {/* <p>{grub.name}</p> */}
            <GrubCard grub={grub} />
            <br />
          </div>
        ))
      }

    </div>

  );
}

export default GrubPage;



// return (
//   <div>
//     <h1> GrubPage.jsx </h1>
//     {
//       grubArr.map((grub, idx) => (
//         <p> {grub.name} </p>
//       ))
//     }
//   </div>

// );
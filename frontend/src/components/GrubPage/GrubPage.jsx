// frontend/src/components/GrubPage/GrubPage.jsx

import "./GrubPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGrubsAllThunk } from "../../redux/grubs";
import { useNavigate } from "react-router-dom"
import GrubCard from "../GrubCard/GrubCard";

const GrubPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();

  const grubArr = useSelector(state => state.grubs.allGrubs);
  const handleNewGrub = () => {
    //need to pass in userId
    // nav('/grubform', { state: { newGrub: false, exampleData: grub} }); 
    nav('/grubform')
  }

  useEffect(() => {
    dispatch(getGrubsAllThunk())
  }, [dispatch])

  const somethingDifferent = (e, grub) => {
    e.preventDefault();
    nav('/grubform', { state: { newGrub: true, exampleData: grub } });
  }

  return (
    <div>
      <h1> GrubPage.jsx </h1>
      <button onClick={handleNewGrub}>CREATE</button>
      <br />
      <br />
      {
        grubArr.map((grub, idx) => (
          <div
            key={`${idx}-grub`}
            onClick={e => somethingDifferent(e, grub)}
          >
            <GrubCard grub={grub} />
            <br />
          </div>
        ))
      }
    </div>
  );
}

export default GrubPage;
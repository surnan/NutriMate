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

  useEffect(() => {
    dispatch(getGrubsAllThunk())
  }, [dispatch])

  const somethingDifferent = (e, grub) => {
    e.preventDefault();
    nav('/grubform', { state: { newGrub: true, exampleData: grub } });
  }

  const handleNewGrub = () => {
    nav('/grubform')
  }

  return (
    <div>
      <h1> GrubPage.jsx </h1>
      <button
        className="grubPage_createBtn"
        onClick={handleNewGrub}
      >CREATE
      </button>
      <br />
      <div className="grub_page_grid">
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
    </div>
  );
}

export default GrubPage;
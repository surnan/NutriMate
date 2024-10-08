// frontend/src/components/GrubPage/GrubPage.jsx

import "./GrubPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGrubsAllThunk } from "../../redux/grubs";
import { useNavigate } from "react-router-dom"
import GrubCard from "../GrubCard/GrubCard";
import DeleteGrubModal from '../DeleteGrubModal'


const GrubPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();

  const grubArr = useSelector(state => state.grubs.allGrubs);

  const [showDeletetModal, setShowDeletetModal] = useState(false);
  const [selectedGrub, setSelectedGrub] = useState(null);


  const handleNewWorkout = () => { nav('/grubform') }

  const handleDeleteBtn = (e, grub) => {
    e.preventDefault();
    setSelectedGrub(grub);
    setShowDeletetModal(true)
  }

  const handleModalClose = () => {
    setShowDeletetModal(false)
    setSelectedGrub(null)
  };


  useEffect(() => {
    dispatch(getGrubsAllThunk())
  }, [dispatch, showDeletetModal])

  const somethingDifferent = (e, grub) => {
    e.preventDefault();
    // nav('/grubform')

    nav('/grubform', { state: { newGrub: true, exampleData: grub} }); 

  }


  return (
    <div>
      <h1> GrubPage.jsx </h1>
      <button onClick={handleNewWorkout}>CREATE</button>
      <br />
      <br />

      {/* const handleNewWorkout = () => {nav('/grubform')} */}

      {
        grubArr.map((grub, idx) => (
          <div
            key={`${idx}-grub`}
            // onClick={e => handleDeleteBtn(e, grub)}
            onClick={e => somethingDifferent(e, grub)}
          >
            <GrubCard grub={grub} />
            <br />
          </div>
        ))
      }


      {showDeletetModal && (
        <DeleteGrubModal
          onClose={handleModalClose}
          onSubmit={handleDeleteBtn}
          grub={selectedGrub}
        />
      )
      }

    </div>

  );
}

export default GrubPage;
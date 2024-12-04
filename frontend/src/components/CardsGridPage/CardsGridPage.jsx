// frontend/src/components/CardsPageGrid/CardsPageGrid.jsx

import "./CardsGridPage.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "../_components/SearchBar";

import { getWorkoutsAllThunk } from "../../redux/workouts";
import { getGrubsAllThunk } from "../../redux/grubs";
import { getGrubImagesAllThunk } from "../../redux/grubImages";
import { getWorkoutImagesAllThunk } from "../../redux/workoutImages";


import WorkoutCard from "../_cards/WorkoutCard";
import GrubCard from "../_cards/GrubCard";
// import WorkoutDetailCard from "../_cards/WorkoutCard";
// import GrubDetailCard from "../_cards/GrubCard";


const CardsPageGrid = ({ stuff }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const sessionUser = useSelector(state => state.session.user);
  const workoutsArr = useSelector(state => state.workouts.allWorkouts);
  const grubsArr = useSelector(state => state.grubs.allGrubs);
  const workoutImgArr = useSelector(state => state.workoutimages.allWorkoutImages);
  const grubImgArr = useSelector(state => state.grubimages.allGrubImages);


  const handleSearch = query => setSearchQuery(query.toLowerCase());
  const handleBack = () => navigate(-1);
  const handleSettings = () => { navigate("/settings") }

  const handleCreate = () => {
    console.log("...stuff = ", stuff)
    switch (stuff) {
      case "workout":
        return navigate('/workoutform', { state: { newWorkout: true, newGrub: false } });
      case "grub":
        return navigate('/grubform', { state: { newGrub: true, newWorkout: false } })
      default:
    }
  }

  const handleCardClick = useCallback(
    data => {
      console.log("...stuff = ", stuff)
      //PUT not POST
      switch (stuff) {
        case "workout":
          return navigate(`/workoutform/${data.id}`);
        case "grub":
          return navigate(`/grubform/${data.id}`)
        default:
      }
    },
    [navigate, stuff]
  );

  const filteredAndSortedWorkouts = useMemo(() => {
    const dataArr = stuff === "workout" ? workoutsArr : grubsArr
    return dataArr
      .filter(workout =>
        workout.userId === sessionUser.id &&
        workout.name.toLowerCase().includes(searchQuery)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [workoutsArr, grubsArr, sessionUser.id, searchQuery]);


  useEffect(() => {
    dispatch(getWorkoutsAllThunk())
    dispatch(getGrubsAllThunk())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWorkoutImagesAllThunk())
    dispatch(getGrubImagesAllThunk())
  }, []);


  const whichCard = (data) => {
    let imageUrl;

    if (stuff === "workout") {
      const workoutImage = workoutImgArr.find(image => image.workoutId === data.id);
      imageUrl = workoutImage ? workoutImage.url : null; 
      return <WorkoutCard workout={data} imageUrl={imageUrl} />;
    } else if (stuff === "grub") {
      const grubImage = grubImgArr.find(image => image.grubId === data.id);
      imageUrl = grubImage ? grubImage.url : null; 
      return <GrubCard grub={data} imageUrl={imageUrl} />;
    }
  }

  const handleRefresh = () => {
    dispatch(getWorkoutImagesAllThunk())
    dispatch(getGrubImagesAllThunk())
  }


  return (
    <div className="mainBodyStyle">
      {/* <h3>CardsPageGrid.jsx</h3>
      <h3>Email = {sessionUser?.email}</h3> */}

      <div className="max_HFlex workout_btn_div">

        <div className="tooltip">
          <button
            onClick={handleBack}
            className="round daily_btn_font_size shadow blue clickable menuRoundBtn"
            title="Back"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <span className="tooltiptext letter_spacing">BACK</span>
        </div>


        <div className="wokoutPageForm_hFlex">
          <div className="tooltip">
            <button
              onClick={handleRefresh}
              className="shadow orange menuRoundBtn"
              title="Reset"
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>
            <span className="tooltiptext letter_spacing">UNDO</span>
          </div>

          <div className="tooltip">
            <button
              onClick={handleCreate}
              className="shadow green menuRoundBtn"
              title="+ Create"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <span className="tooltiptext letter_spacing">CREATE</span>
          </div>

          <div className="tooltip">
            <button
              onClick={handleSettings}
              className="shadow yellow menuRoundBtn"
              title="Change Settings"
            >
              <i className="fa-solid fa-gear"></i>
            </button>
            <span className="tooltiptext">Settings</span>
          </div>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search..." />

      <div className="cards_grid">
        {filteredAndSortedWorkouts.map((data) => (
          <div key={data.id} className="clickable" onClick={() => handleCardClick(data)}>
            {whichCard(data)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsPageGrid;

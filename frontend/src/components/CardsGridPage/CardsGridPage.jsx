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
import WorkoutDetailCard from "../_cards/WorkoutCard";
import GrubDetailCard from "../_cards/GrubCard";


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
    dispatch(getWorkoutImagesAllThunk())
    dispatch(getGrubsAllThunk())
    dispatch(getGrubImagesAllThunk())
  }, [dispatch]);

  // const whichCard = (data) => {
  //   const dataArr = stuff === "workout" ? workoutsArr : grubsArr
  //   switch (stuff) {
  //     case "workout": return <WorkoutCard workout={data} />
  //     case "grub": return <GrubCard grub={data} />
  //     default:
  //   }
  // }


  const whichCard = (data) => {
    let imageUrl;

    if (stuff === "workout") {
      const workoutImage = workoutImgArr.find(image => image.workoutId === data.id);
      imageUrl = workoutImage ? workoutImage.url : null; // Replace `url` with your image URL field name
      return <WorkoutCard workout={data} imageUrl={imageUrl} />;
    } else if (stuff === "grub") {
      const grubImage = grubImgArr.find(image => image.grubId === data.id);
      imageUrl = grubImage ? grubImage.url : null; // Replace `url` with your image URL field name
      return <GrubCard grub={data} imageUrl={imageUrl} />;
    }
  }



  return (
    <div className="mainBodyStyle">
      <h3>CardsPageGrid.jsx</h3>
      <h3>Email = {sessionUser?.email}</h3>

      <div className="max_HFlex workout_btn_div">
        <button className="blue _button" onClick={handleBack}>BACK</button>
        <button className="green _button" onClick={handleCreate}>CREATE</button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search Workouts..." />

      <div className="cards_grid">
        {filteredAndSortedWorkouts.map((data) => (
          <div key={data.id} onClick={() => handleCardClick(data)}>
            {whichCard(data)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsPageGrid;

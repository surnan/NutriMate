// frontend/src/components/CardsPage/CardsPage.jsx

import "./CardsPage.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/_components/SearchBar";

import { getWorkoutsAllThunk } from "../../redux/workouts";
import { getGrubsAllThunk } from "../../redux/grubs";

import WorkoutCard from "../_cards/WorkoutCard";
import GrubCard from "../_cards/GrubCard";

const CardsPage = ({ stuff }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const sessionUser = useSelector(state => state.session.user);
  const workoutsArr = useSelector(state => state.workouts.allWorkouts);
  const grubsArr = useSelector(state => state.grubs.allGrubs);

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
    dispatch(getGrubsAllThunk())
  }, [dispatch]);

  const whichCard = (data) => {
    const dataArr = stuff === "workout" ? workoutsArr : grubsArr
    switch (stuff) {
      case "workout": return <WorkoutCard workout={data} />
      case "grub": return <GrubCard grub={data} />
      default:
    }
  }

  return (
    <div className="mainBodyStyle">
      <h3>CardsPage.jsx</h3>
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

export default CardsPage;

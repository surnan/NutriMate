// frontend/src/components/WorkoutPage/WorkoutPage.jsx

import "./WorkoutPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkoutsAllThunk } from "../../redux/workouts"
import { useNavigate } from "react-router-dom"
import WorkoutCard from "../WorkoutCard";
import SearchBar from "../SearchBar";

const WorkoutPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const sessionUser = useSelector((state) => state.session.user);
  const workoutsArr = useSelector(state => state.workouts.allWorkouts);

  const filteredAndSortedArray = workoutsArr
    .filter(
      workout =>
        workout.userId === sessionUser.id &&
        workout.name.toLowerCase().includes(searchQuery)
    )
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

  useEffect(() => {
    dispatch(getWorkoutsAllThunk())
  }, [dispatch])

  // PUT
  const handleCard = workout => navigate(`/workoutform/${workout.id}`) // PUT


  const handleSearch = query => setSearchQuery(query.toLowerCase())
  const handleBack = () => navigate(-1)

  //POST
  const handleCreate = () => navigate('/workoutform', { //POST
    state: { 
      newWorkout: true 
  }});

  return (
    <div className="mainBodyStyle">
      <h3>WorkoutPage.jsx</h3>
      <h3 >Email = {sessionUser?.email}</h3>

      <div className="max_HFlex workout_btn_div">
        <button
          className="blue _button"
          type="button"
          onClick={handleBack}
        >
          BACK
        </button>
        <button
          className="green _button"
          onClick={handleCreate}
        >CREATE
        </button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search Workouts..." />
      <div className="workout_page_grid">
        {
          filteredAndSortedArray.map((workout, idx) => (
            <div
              key={`${idx}-workout`}
              onClick={e => handleCard(workout)}
            >
              <WorkoutCard workout={workout} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default WorkoutPage;
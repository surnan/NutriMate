// frontend/src/components/WorkoutPage/WorkoutPage.jsx

import "./WorkoutPage.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkoutsAllThunk } from "../../redux/workouts";
import { useNavigate } from "react-router-dom";
import WorkoutCard from "../WorkoutCard";
import SearchBar from "../SearchBar";

const WorkoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const sessionUser = useSelector(state => state.session.user);
  const workoutsArr = useSelector(state => state.workouts.allWorkouts);

  const handleSearch = query => setSearchQuery(query.toLowerCase());
  const handleBack = () => navigate(-1);
  const handleCreate = () => navigate('/workoutform', { state: { newWorkout: true } });

  const filteredAndSortedWorkouts = useMemo(() => {
    return workoutsArr
      .filter(workout => 
        workout.userId === sessionUser.id && 
        workout.name.toLowerCase().includes(searchQuery)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [workoutsArr, sessionUser.id, searchQuery]);

  const handleCardClick = useCallback(
    //PUT not //POST
    workout => navigate(`/workoutform/${workout.id}`),
    [navigate]
  );

  useEffect(() => {
    dispatch(getWorkoutsAllThunk());
  }, [dispatch]);

  return (
    <div className="mainBodyStyle">
      {/* <h3>WorkoutPage.jsx</h3>
      <h3>Email = {sessionUser?.email}</h3> */}

      <div className="max_HFlex workout_btn_div">
        <button className="blue _button" onClick={handleBack}>BACK</button>
        <button className="green _button" onClick={handleCreate}>CREATE</button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search Workouts..." />

      <div className="workout_page_grid">
        {filteredAndSortedWorkouts.map((workout) => (
          <div key={workout.id} onClick={() => handleCardClick(workout)}>
            <WorkoutCard workout={workout} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPage;

// frontend/src/components/WorkoutPage/WorkoutPage.jsx

import "./WorkoutPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkoutsAllThunk } from "../../redux/workouts"
import { useNavigate } from "react-router-dom"
import WorkoutCard from "../WorkoutCard";

const WorkoutPage = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();

  const sessionUser = useSelector((state) => state.session.user);
  const workoutsArr = useSelector(state => state.workouts.allWorkouts);

  const filteredAndSortedArray = workoutsArr
  .filter(workout => workout.userId === sessionUser.id)
  .sort((a, b) => {
    const nameA = a.name.toLowerCase(); // Ignore case by converting to lowercase
    const nameB = b.name.toLowerCase(); // Ignore case by converting to lowercase
    if (nameA < nameB) return -1;       // Sort `a` before `b`
    if (nameA > nameB) return 1;        // Sort `b` before `a`
    return 0;                           // Keep original order if names are the same
  });
  
  console.log("===> filteredArray ==> ", filteredAndSortedArray)


  useEffect(() => {
    dispatch(getWorkoutsAllThunk())
  }, [dispatch])

  const somethingDifferent = (e, workout) => {
    e.preventDefault();
    nav('/workoutform', { state: { newWorkout: true, exampleData: workout } });
  }

  const handleNewWorkout = () => {
    nav('/workoutform')
  }

  return (
    <>
      <h3>WorkoutPage.jsx</h3>
      <h3 >Email = {sessionUser?.email}</h3>

      <button
        className="WorkoutPage_createBtn"
        onClick={handleNewWorkout}
      >CREATE
      </button>
      <div className="workout_page_grid">
        {
          filteredAndSortedArray.map((workout, idx) => (
            <div
              key={`${idx}-workout`}
              onClick={e => somethingDifferent(e, workout)}
            >
              <WorkoutCard workout={workout} />
            </div>
          ))
        }
      </div>
    </>
  );
}

export default WorkoutPage;
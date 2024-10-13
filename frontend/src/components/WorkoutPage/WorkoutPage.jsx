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
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

  console.log("===> filteredArray ==> ", filteredAndSortedArray)


  useEffect(() => {
    dispatch(getWorkoutsAllThunk())
  }, [dispatch])

  const somethingDifferent = (e, workout) => {
    e.preventDefault();
    nav('/workoutform', { state: { newWorkout: true, exampleData: workout } });
  }

  const handleNewWorkout = () => { nav('/workoutform') }
  const handleBackBtn = () => { nav(-1) };

  return (
    <>
      <h3>WorkoutPage.jsx</h3>
      <h3 >Email = {sessionUser?.email}</h3>

      <div className="workoutPageForm_hFlex">
        <button
          className="back_btn"
          type="button"
          onClick={handleBackBtn}
        >
          BACK
        </button>

        <button
          className="WorkoutPage_createBtn"
          onClick={handleNewWorkout}
        >CREATE
        </button>
      </div>

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
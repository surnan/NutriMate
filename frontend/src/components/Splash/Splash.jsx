// frontend/src/components/Splash/Splash.jsx

import "./Splash.css"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Splash = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const nav = useNavigate()

  const handleWeightsBtn = () => { nav("/weights") }
  const handleWorkoutsBtn = () => { nav("/workouts") }
  const handleGrubsBtn = () => { nav("/grubs") }
  const handleDailyBtn = () => { nav("/daily") }

  useEffect(() => {
    if (sessionUser) {
      console.log("Session user loaded:", sessionUser);
    }
  }, [sessionUser]);

  return (
    <div className="mainBodyStyle">
      {sessionUser ? (
        <>
          <h3 className="splash_showEmail">Email = {sessionUser?.email}</h3>
          <div className="splash_grid twenty_padding">
            <button className="splashButton green shadow" onClick={handleWeightsBtn}>weights</button>
            <button className="splashButton orange shadow" onClick={handleWorkoutsBtn}>workouts</button>
            <button className="splashButton blue shadow" onClick={handleGrubsBtn}>grubs</button>
            <button className="splashButton pink shadow" onClick={handleDailyBtn}>daily</button>
          </div>
        </>
      ) : (
        <h3>Please login to access the app</h3>
      )}
    </div>
  );
};

export default Splash;

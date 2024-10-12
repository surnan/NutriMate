// frontend/src/components/Splash/Splash.jsx

import "./Splash.css"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserThunk, } from '../../redux/session';

const Splash = () => {
  const sessionUser = useSelector((state) => state.session.user);

  console.log("Splash component re-rendering with sessionUser:", sessionUser);

  useEffect(() => {
    if (sessionUser) {
      console.log("Session user loaded:", sessionUser);
    }
  }, [sessionUser]);

  return (
    <div>
      {/* Check if the user is logged in and display accordingly */}
      {sessionUser ? (
        <div>
          {/* <h3>Email = {sessionUser?.user?.email || sessionUser?.email}</h3> */}
          <h3>Email = {sessionUser?.email}</h3>
          <button>weights</button>
          <button>workouts</button>
          <button>grubs</button>
        </div>
      ) : (
        <h3>Please login to access the app</h3> // Display this message when not logged in
      )}
    </div>
  );
};

export default Splash;

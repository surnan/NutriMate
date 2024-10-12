// frontend/src/components/Splash/Splash.jsx

import "./Splash.css"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import React from 'react';
import { updateUserThunk } from '../../redux/session';
import { useDispatch } from 'react-redux';

const Splash = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()



  const [imgUrl, setImgUrl] = useState("");   //image url to send to aws
  const [showUpload, setShowUpload] = useState(true); //telling us if we should show the image
  const [previewUrl, setPreviewUrl] = useState(""); //img url we will load in react

  const sessionUser = useSelector(store => store.session.user)
  
  useEffect(() => {
    if (sessionUser) {
      // Any actions you need to perform once sessionUser is available
      console.log("Session user loaded:", sessionUser);
    }
  }, [sessionUser, dispatch]);





  //function to get image from local
  const updateImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewUrl(reader.result);
    }
    setImgUrl(file);
    setShowUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const img_url = imgUrl;
    const form = { img_url };
    // const updateUser = await dispatch(updateUserThunk(user.id, form))
    await dispatch(updateUserThunk(user.id, form))
  }

  const handleWeightsBtn = () => {
    nav("/weights")
  }

  const handleWorkoutsBtn = () => {
    nav("/workouts")
  }

  const handleGrubsBtn = () => {
    nav("/grubs")
  }


  //If you don't see value, try refresh.  because hmtl won't auto-render on variable update
  console.log("=======> sessionUser ====> ", sessionUser)

  return (
    <div>
      <h1>Splash.jsx</h1>
      <h2>SessionUser is null = {sessionUser === null ? "TRUE" : "FALSE"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          {/* FALSE to avoid AWS for now */}
          {showUpload && false && (
            <label htmlFor='file-upload'> Select From Computer
              <input
                type='file'
                id='file-upload'
                name="img_url"
                onChange={updateImage}
                accept='.jpg, .jpeg, .png, .gif'
              />
            </label>
          )}
          {!showUpload && (
            <div>
              <img
                src={previewUrl}
                alt="preview"
              />
              <button>Change Profile</button>
            </div>
          )}
        </div>
      </form>

      <br />

      <h3>Email = {sessionUser ? sessionUser.email : "Loading..."}</h3>

      <br />
      {sessionUser && (
        <div>
          <button className="splashButton green" onClick={handleWeightsBtn}>weights</button>
          <button className="splashButton orange" onClick={handleWorkoutsBtn}>workouts</button>
          <button className="splashButton blue" onClick={handleGrubsBtn}>grubs</button>
        </div>
      )}
    </div>
  );
}

export default Splash;
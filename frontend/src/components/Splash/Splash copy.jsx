// frontend/src/components/Splash/Splash.jsx
import "./Splash.css"
import React, { useState, useEffect } from 'react';
import { updateUserThunk } from '../../redux/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SplashGifDiv from "./SplashGifDiv"; // Ensure this is correct and matches the filename

const Splash = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(()=>{
    console.log("...Splash->user = ", sessionUser)
  }, [sessionUser])


  const [imgUrl, setImgUrl] = useState("");   //image url to send to aws
  const [showUpload, setShowUpload] = useState(true); //  //show image?
  const [previewUrl, setPreviewUrl] = useState("");  //img url in react

  const handleWeightsBtn = () => { nav("/weights") }
  const handleWorkoutsBtn = () => { nav("/workouts") }
  const handleGrubsBtn = () => { nav("/grubs") }
  const handleDailyBtn = () => { nav("/daylog") }

  const updatedImgFromPC = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => setPreviewUrl(reader.result)
    setImgUrl(file);
    setShowUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const img_url = imgUrl;
    const form = { img_url };
    await dispatch(updateUserThunk(sessionUser.id, form))
  }
  
return (
<div className="mainBodyStyle">
      <h2 className="twenty_margin ">Email = {sessionUser?.email || "< not logged in >"}</h2>

      {sessionUser && (
        <form onSubmit={handleSubmit}>
          <div>
            {showUpload && (
              <label htmlFor='file-upload'> Select From Computer
                <input
                  type='file'

                  className="_button orange"
                  id='file-upload'
                  name="img_url"
                  onChange={updatedImgFromPC}
                  accept='.jpg, .jpeg, .png, .gif'
                />
              </label>
            )}
            <br/><br/><br/><br/>
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
          <div className="splash_grid twenty_padding">
            <button className="splashButton green shadow" onClick={handleWeightsBtn}>weights</button>
            <button className="splashButton orange shadow" onClick={handleWorkoutsBtn}>workouts</button>
            <button className="splashButton blue shadow" onClick={handleGrubsBtn}>grubs</button>
            <button className="splashButton pink shadow" onClick={handleDailyBtn}>daily</button>
          </div>
        </form>
      )}
      <SplashGifDiv/>
    </div>
  );
}

export default Splash;
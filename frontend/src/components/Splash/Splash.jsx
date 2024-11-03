// frontend/src/components/Splash/Splash.jsx
import "./Splash.css"
import { useState, useEffect } from 'react';
import { updateUserThunk } from '../../redux/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SplashGifDiv from "./SplashGifDiv";
import { handleNavigation } from '../../utils/MyFunctions';

import { handleNavigation } from '../../utils/MyFunctions';

const Splash = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const sessionUser = useSelector((state) => state.session.user);

  const [imgUrl, setImgUrl] = useState("");   //image url to send to aws
  const [showUpload, setShowUpload] = useState(true); //  //show image?
  const [previewUrl, setPreviewUrl] = useState("");  //img url in react


  const handleWeightsBtn = (e) => handleNavigation(e, "/weights", nav);
  const handleWorkoutsBtn = (e) => handleNavigation(e, "/workouts", nav);
  const handleGrubsBtn = (e) => handleNavigation(e, "/grubs", nav);
  const handleDailyBtn = (e) => handleNavigation(e, "/daylog", nav);

  const updatedImgFromPC = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPreviewUrl(reader.result)
    setImgUrl(file);
    setShowUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const img_url = imgUrl;
    const form = { img_url };
    await dispatch(updateUserThunk(sessionUser.id, form))
    setImgUrl("");
    setShowUpload(true); 
    setPreviewUrl("");  
  }

  return (
    <div className="mainBodyStyle relative">
      {!sessionUser &&
        <h1 className="twenty_margin ">Login to track your health!!</h1>
      }

      {sessionUser && (
        <form onSubmit={handleSubmit}>
          <div className="center">
            <h3>Change Your Profile Picture</h3>
            <br />
            <br />
            {showUpload && (
              <label htmlFor='file-upload'> Select From Computer
                <input
                  type='file'
                  id='file-upload'
                  name="img_url"
                  onChange={updatedImgFromPC}
                  accept='.jpg, .jpeg, .png, .gif'
                />
              </label>
            )}
            <br /><br /><br /><br />
            {!showUpload && (
              <div className="vertical_center_flex">
                <img
                  src={previewUrl}
                  alt="preview"
                  style={{ height: "300px", width: "300px" }}
                  className="round"
                />
                <button
                  className="_button black block twenty_margin"
                >
                  Change Profile
                </button>
              </div>
            )}
          </div>
          <div className="splash_grid twenty_padding">
            <button className="splashButton green shadow" onMouseDown={(e) => handleWeightsBtn(e, nav)}>weights</button>
            <button className="splashButton orange shadow" onMouseDown={(e) => handleWorkoutsBtn(e, nav)}>workouts</button>
            <button className="splashButton blue shadow" onMouseDown={(e) => handleGrubsBtn(e, nav)}>grubs</button>
            <button className="splashButton pink shadow" onMouseDown={(e) => handleDailyBtn(e, nav)}>daily</button>
          </div>
        </form>
      )}
      {!sessionUser && <SplashGifDiv />}
    </div>
  );

}

export default Splash;

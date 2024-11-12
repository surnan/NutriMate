// frontend/src/components/Splash/Splash.jsx
import "./Splash.css"
import { useState, useEffect } from 'react';
import { updateUserThunk } from '../../redux/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SplashGifDiv from "./SplashGifDiv";
import { handleNavigation } from '../_utils/MyFunctions';

import DayLogPage from "../DayLogPage/DayLogPage";

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

      {sessionUser && <DayLogPage />}

      {!sessionUser && <SplashGifDiv />}
    </div>
  );

}

export default Splash;

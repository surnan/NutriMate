// frontend/src/components/Splash/Splash.jsx

import "./Splash.css"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserThunk } from '../../redux/session';

const Splash = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()



  const [imgUrl, setImgUrl] = useState("");   //image url to send to aws
  const [showUpload, setShowUpload] = useState(true); //telling us if we should show the image
  const [previewUrl, setPreviewUrl] = useState(""); //img url we will load in react

  const sessionUser = useSelector(store => store.session.user)
  
  useEffect(() => {
    if (sessionUser) {
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



  return (
    <div>
      <h1>Splash.jsx</h1>
      <br/>
      <h3>Email = {sessionUser ? sessionUser.email : "Loading..."}</h3>

      <br />
      {sessionUser && (
        <div>
          <button className="splashButton green" onClick={handleWeightsBtn}>weights</button>
          <br/>
          <button className="splashButton orange" onClick={handleWorkoutsBtn}>workouts</button>
          <br/>
          <button className="splashButton blue" onClick={handleGrubsBtn}>grubs</button>
        </div>
      )}
    </div>
  );
}

export default Splash;
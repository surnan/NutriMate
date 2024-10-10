// frontend/src/components/Splash/Splash.jsx

// import React, { useState } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserThunk } from '../../redux/session';
import { useDispatch, useSelector } from 'react-redux';
import "./Splash.css"

const Splash = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const nav = useNavigate()

  //image url to send to aws
  const [imgUrl, setImgUrl] = useState("");
  //telling us if we should show the image
  const [showUpload, setShowUpload] = useState(true);
  //img url we will load in react
  const [previewUrl, setPreviewUrl] = useState("");



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

  const sessionUser = useSelector(state => state.session.user)

  console.log("\n\nsessionUser = ", sessionUser, "\n\n")
  console.log("\n\nsessionUser.user = ", sessionUser?.user, "\n\n")

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
      <br />
      <br />
      {sessionUser && sessionUser.user && (
        <div>
          <h3>Login User = {sessionUser.user.email}</h3>
          <h3>Login UserId = {sessionUser.user.id}</h3>
          <br />
          <button className="splashButton green" onClick={handleWeightsBtn}>weights</button>
          <br />
          <button className="splashButton orange" onClick={handleWorkoutsBtn}>workouts</button>
          <br />
          <button className="splashButton blue" onClick={handleGrubsBtn}>grubs</button>
        </div>
      )}
    </div>
  );
}

export default Splash;
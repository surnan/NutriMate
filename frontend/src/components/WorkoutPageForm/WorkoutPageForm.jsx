// frontend/src/componenets/WorkoutPageForm/WorkoutPageForm.jsx
import "./WorkoutPageForm.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { postWorkoutsOneThunk, updateWorkoutsOneThunk, deleteWorkoutThunkById, getWorkoutOneThunk } from "../../redux/workouts";
import { getWorkoutImagesForWorkoutThunk, resetWorkoutImages, postWorkoutImagesOneThunk, updateWorkoutImagesOneThunk } from "../../redux/workoutImages";
import DeleteModal from "../_modal/DeleteModal";
import { capitalizeFirstLetter} from '../_utils/MyFunctions';
import placeholderIMG from '../../fe_images/placeholder_image.jpg'
import downloadGIF from '../../fe_images/download.gif'
import ImageDisplay from "../../components/_components/ImageDisplay";
import { updateUserThunk } from "../../redux/session";

function WorkoutPageForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const workoutId = parseInt(id);
  const { newWorkout } = location.state || {};

  const sessionUser = useSelector((state) => state.session.user);
  const workoutObj = useSelector((state) => state.workouts.single);
  const workoutImgArr = useSelector((state) => state.workoutimages.currentworkout)

  const [imgUrl, setImgUrl] = useState("");   //image url to send to aws
  const [showUpload, setShowUpload] = useState(true); //  //show image?
  const [previewUrl, setPreviewUrl] = useState("");  //img url in react
  const [clickedWorkoutImgId, setClickedWorkoutImgId] = useState(0);  //object.id of clicked image

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    description: '',
    userId: sessionUser?.id || 1,
  });

  const initializeForm = useCallback(() => {
    if (!newWorkout && workoutObj) {
      setForm({
        name: workoutObj.name || "",
        description: workoutObj.description || "",
        userId: workoutObj.userId || sessionUser?.id || 1,
      });
    }
  }, [newWorkout, workoutObj, sessionUser]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);


  useEffect(() => {
    if (!newWorkout && workoutId) {
      dispatch(getWorkoutOneThunk(workoutId)).then((data) => {
        // Only get images if workout exists
        if (data) {
          console.log("...data.id ==> ", data.id)
          dispatch(getWorkoutImagesForWorkoutThunk(data.id));
        }
      });
    }
  }, [dispatch, workoutId, newWorkout]);

  useEffect(() => {
    const newErrors = {}
    const requiredVar = ["name", "description"]

    requiredVar.reduce((sum, key) => {
      if (!form[key]) {
        sum[key] = `${capitalizeFirstLetter(key)} is required`;
      }
      return sum;
    }, {});
    setErrors(newErrors);
  }, [form]);


  // AWS
  const handleImgClick = (id) => {
    if (newWorkout) {
      alert("Please save Workout to database before adding image")
      return
    }
    console.log("A - ...handleImgClick..id = ", id)
    console.log("...newworkout = ", newWorkout)

    if (!id) {
      id = 666666
    }

    setClickedWorkoutImgId(id)
  }

  const updatedImgFromPC = async (e) => {
    console.log("updatedImgFromPC")
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPreviewUrl(reader.result)
    setImgUrl(file);
    setShowUpload(false);
  };

  const handleImgSubmit = async () => {
    console.log('handleImgSubmit')
    let temp = {
      workoutId: clickedWorkoutImgId,
      name: "abc",
      url: imgUrl
    }
    if (workoutObj?.WorkoutImages.length === 0) {
      console.log("POST")
      const updatedTemp = { ...temp, workoutId: workoutObj?.id };
      console.log("...updatedTemp B4 ... POST ....", updatedTemp)
      await dispatch(updateUserThunk(updatedTemp))
    } else {
      console.log("PUT")
      console.log("...temp B4 ... PUT ....", temp)
      await dispatch(updateWorkoutImagesOneThunk(temp))
    }
    setClickedWorkoutImgId(0)
  }


  const handleReset = () => {
    initializeForm;
    setPreviewUrl(""); // Clear preview URL on reset
  }

  const updateSetForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitSave = async (e) => {
    e.preventDefault();
    try {
      const { name, description, userId } = form;
      const body = { id: workoutId, name, description, userId };
      const result = workoutId
        ? await dispatch(updateWorkoutsOneThunk({ body }))
        : await dispatch(postWorkoutsOneThunk({ body }));
      if (result) navigate(-1);
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  const handleDelete = () => {
    if (!workoutId) {
      alert('Workout not saved to database');
    } else {
      setShowDeleteModal(true);
    }
  };

  const handleAddToLog = () => {
    if (!workoutId) {
      alert('Workout needs to be saved before adding to DayLog');
    } else {
      //  !!!Fix navigation bug
      navigate(`/daylogform/${workoutId}`, {
        state: {
          newDayLog: true,
          newWorkoutObj: workoutObj
        },
      });
    }
  };

  const handleBack = async () => {
    dispatch(resetWorkoutImages()); // Clear workout images
    navigate(-1);
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
    resetWorkoutImages()
  };

  //downloadGIF
  return (
    <div className="mainBodyStyle">
      {/* <h1>WorkoutPageForm.jsx</h1>
      <h3>Email = {sessionUser?.email}</h3> */}

      <div className="max_HFlex">
        <button
          onClick={handleBack}
          className="round daily_btn_font_size shadow blue clickable menuRoundBtn"
          title="Back"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>



        <div className="wokoutPageForm_hFlex">
          <button
            onClick={handleReset}
            className="round daily_btn_font_size shadow orange clickable menuRoundBtn"
            title="Reset"
          >
            <i className="fa-solid fa-rotate-left"></i>
          </button>

          <button
            onClick={handleSubmitSave}
            className="round daily_btn_font_size shadow blue clickable menuRoundBtn"
            title="Save"
          >
            <i className="fa-solid fa-bookmark"></i>
          </button>
        </div>
      </div>

      <div className="workout_page_form_grid">
        <label style={{ display: 'inline-flex' }}>
          {errors.name && <span style={{ color: 'red' }}>{errors.name}&nbsp;&nbsp;</span>}
          Name:
        </label>
        <input
          className="_input"
          type="text"
          name="name"
          onChange={updateSetForm}
          placeholder="Enter name"
          value={form.name}
        />

        <label style={{ display: 'inline-flex' }}>
          {errors.description && (
            <span style={{ color: 'red' }}>{errors.description}&nbsp;&nbsp;</span>
          )}
          Description:
        </label>
        <textarea
          className="_textarea"
          maxLength="498"
          name="description"
          onChange={updateSetForm}
          placeholder="Enter description"
          value={form.description}
        />
      </div>

      <div className="max_HFlex">
        {
          !newWorkout &&
          <div>
            <button
              onClick={handleDelete}
              className="round daily_btn_font_size shadow red clickable menuRoundBtn"
              title="Delete"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>

            <button
              onClick={handleAddToLog}
              className="round daily_btn_font_size shadow white clickable menuRoundBtn"
              title="Add to Log"
            >
              <i className="fa-solid fa-thumbtack"></i>
            </button>
          </div>
        }

      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <div className="vertical_center_flex">
        {/* <h1>Your Workout Page Form</h1> */}
        <ImageDisplay
          imgArr={workoutImgArr}
          downloadGIF={downloadGIF}
          placeholderIMG={placeholderIMG}
          handleImgClick={handleImgClick}
        />
      </div>


      <div className="vertical_center_flex">
        {(clickedWorkoutImgId > 0) && showUpload && (
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
        {(clickedWorkoutImgId > 0) && !showUpload && (
          <div className="vertical_center_flex">
            <img
              src={previewUrl}
              style={{ height: "300px", width: "300px" }}
              alt="preview"
              className="round"
            />
            <button
              onClick={handleImgSubmit}
              className="_button black block twenty_margin"
            >Change Profile
            </button>
          </div>
        )}
      </div>


      {showDeleteModal && (
        <DeleteModal
          item={workoutObj}
          itemType="workout"
          deleteThunk={deleteWorkoutThunkById}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default WorkoutPageForm;

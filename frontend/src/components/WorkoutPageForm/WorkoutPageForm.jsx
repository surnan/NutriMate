// frontend/src/componenets/WorkoutPageForm/WorkoutPageForm.jsx
import "./WorkoutPageForm.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { postWorkoutsOneThunk, updateWorkoutsOneThunk, deleteWorkoutThunkById, getWorkoutOneThunk} from "../../redux/workouts";
import DeleteModal from "../DeleteModal/DeleteModal";
import { capitalizeFirstLetter, isEmpty } from '../../utils/MyFunctions';

function WorkoutPageForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const workoutId = parseInt(id);
  const { newWorkout } = location.state || {};

  const sessionUser = useSelector((state) => state.session.user);
  const workoutObj = useSelector((state) => state.workouts.single);

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
      dispatch(getWorkoutOneThunk(workoutId));
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

  const updateSetForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => navigate(-1);

  const handleReset = initializeForm;

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

  const handleModalClose = () => {
    setShowDeleteModal(false);
    navigate(-1);
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

  return (
    <div className="mainBodyStyle">
      <h1>WorkoutPageForm.jsx</h1>
      <h3>Email = {sessionUser?.email}</h3>

      <div className="max_HFlex">
        <button className="blue _button" type="button" onClick={handleBack}>
          BACK
        </button>
        <div className="wokoutPageForm_hFlex">
          <button className="orange _button" type="button" onClick={handleReset}>
            RESET
          </button>
          <button
            className={`green _button ${isEmpty(errors) ? "disabled_btn" : ""}`}
            type="button"
            onClick={handleSubmitSave}
            //disabled={!isEmpty(errors)}
          >
            SAVE
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
        <button className="red _button" type="button" onClick={handleDelete}>
          DELETE
        </button>
        <button
          className="black _button"
          type="button"
          onClick={handleAddToLog}
          //disabled={!isEmpty(errors)}
        >
          Add To Log
        </button>
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

// frontend/src/componenets/WeightPageForm/WeightPageForm.jsx
import "./WorkoutPageForm.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postWorkoutsOneThunk, updateWorkoutsOneThunk } from "../../redux/workouts"
import DeleteWorkoutModal from "../DeleteWorkoutModal";


function WorkoutPageForm() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation();
    const { newWorkout, exampleData } = location.state || {};

    const [showDeletetModal, setShowDeletetModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const [form, setForm] = useState({
        name: exampleData?.name || "",
        description: exampleData?.description || '',
        userId: exampleData?.userId || 1
    });

    const [originalValues, setOriginalValues] = useState({
        name: exampleData?.name || "",
        description: exampleData?.description || '',
    })

    const initialEditMode = !exampleData;
    const [isEditing, setIsEditing] = useState(initialEditMode);
    const [errors, setErrors] = useState({})
    const [clickedSubmitBtn, setClickedSubmitBtn] = useState(false);


    const hasError = () => (Object.keys(errors).length !== 0)



    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleDeleteBtn = (e) => {
        e.preventDefault();
        setSelectedWorkout(exampleData);
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedWorkout(null)
        // nav(-1)
    };

    const handleBack = (e) => {
        e.preventDefault();
        nav(-1);  // This navigates back to the previous page
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEditing(false)
        setClickedSubmitBtn(true);
        const { name, description } = form;
        const body = {
            id: parseInt(exampleData?.id),
            name,
            description,
            userId: 1
        }

        const submit = async () => {
            try {
                const result = newWorkout
                    ? await dispatch(updateWorkoutsOneThunk({ body }))
                    : await dispatch(postWorkoutsOneThunk({ body }))
                if (result) {
                    nav(`/workouts`);
                }
            } catch (error) {
                console.error('Error adding workout:', error);
            }
        }
        submit();
    }

    const handleCancelClick = () => {
        setIsEditing(false)
        setForm({
            name: originalValues.name,
            description: originalValues.description
        });
    }

    const handleUpdateClick = () => {
        setIsEditing(true)
        console.log("handleUpdateclick")
    }

    useEffect(() => {
        const newErrors = {};
        const allKeys = ["name", "description"];

        for (let key of allKeys) {
            if (!form[key]) {
                newErrors[key] = capitalizeFirstLetter(`${key} is required`);
            }
        }

        if (clickedSubmitBtn) {
            setErrors(newErrors)
        }
    }, [form, clickedSubmitBtn])



    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <h1>WorkoutPageForm.jsx</h1>


            <div className="workoutPageForm_hFlex">
                <button
                    className="back_btn"
                    type="cancel"
                    onClick={handleBack}
                >
                    BACK
                </button>


                {initialEditMode && (<button
                    className="back_btn green"
                    type="cancel"
                    onClick={handleSubmit}
                >
                    SAVE
                </button>)}
            </div>


            <div className="workout_page_form_grid">
                <label>
                    Name: &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.start}</span>}
                </label>
                <input
                    type="text"
                    name="name"
                    onChange={updateSetForm}
                    placeholder="enter name"
                    value={form.name || ""}
                    readOnly={!isEditing}
                />
                <label>
                    Desciption: &#160;&#160;{errors.goal && <span style={{ color: 'red' }}>{errors.goal}</span>}
                </label>
                <textarea
                    maxLength="498"
                    name="description"
                    onChange={updateSetForm}
                    placeholder="enter description"
                    value={form.description || ""}
                    readOnly={!isEditing}
                />
                {showDeletetModal && (
                    <DeleteWorkoutModal
                        onClose={handleModalClose}
                        onSubmit={handleDeleteBtn}
                        workout={selectedWorkout}
                    />
                )}
            </div>

            <div className="workout_page_btn_grid">

                {exampleData ? (
                    !initialEditMode ? (
                        <button
                            className="workout_page_btn green"
                            type="cancel"
                            onClick={handleUpdateClick}
                        >
                            UPDATE
                        </button>
                    ) : (
                        <button
                            className="workout_page_btn green"
                            type="cancel"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </button>
                    )
                ) : (
                    <br />
                )
                }

                {!initialEditMode && (<button
                    className="workout_page_btn red"
                    type="button"
                    onClick={isEditing ? handleCancelClick : handleDeleteBtn}
                >
                    {isEditing ? "CANCEL" : "DELETE"}
                </button>)}
            </div>
        </>
    );
}

export default WorkoutPageForm;



{/* <div className="workout_page_btn_grid">

{exampleData ?
    (
        <button
            className="workout_page_btn green"
            type="cancel"
            onClick={handleSubmit}
        >
            EDIT
        </button>
    )
    :
    (<br />)
}

<button
    className="workout_page_btn red"
    type="cancel"
    onClick={handleDeleteBtn}
>
    DELETE
</button>
</div> */}
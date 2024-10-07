// frontend/src/componenets/WeightPageForm/WeightPageForm.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./WorkoutPageForm.css";
import { postWorkoutsOneThunk } from "../../redux/workouts"


function WorkoutPageForm() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: "",
        description: '',
        userId: ''
    });

    const [errors, setErrors] = useState({})
    const [clickedSubmitBtn, setClickedSubmitBtn] = useState(false);
    const hasError = () => (Object.keys(errors).length !== 0)

    const handleCancel = (e) => {
        e.preventDefault();
        nav(-1);  // This navigates back to the previous page
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClickedSubmitBtn(true);


        const { name, description } = form;

        const body = {
            name,
            description,
            userId: 2
        }

        console.log("++++ ======> handleSubmit.body ", body)

        const submit = async () => {
            try {
                const result = await dispatch(postWorkoutsOneThunk({body}))
                // const result = true

                if (result) {
                    nav(`/workouts`);
                }
            } catch (error) {
                console.error('Error adding weight:', error);
            }
        }
        submit();
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

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
        <div>
            <h1>WorkoutPageForm.jsx</h1>

            <label>
                Name &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.start}</span>}
            </label>
            <input
                type="text"
                name="name"
                onChange={updateSetForm}
                placeholder="enter name"
            />

            <br />
            <label>
                Desciption &#160;&#160;{errors.goal && <span style={{ color: 'red' }}>{errors.goal}</span>}
            </label>
            <input
                type="text"
                name="description"
                onChange={updateSetForm}
                placeholder="enter description"
            />

            <br />
            <button
                type="submit"
                // disabled={hasError()}
                onClick={handleSubmit}
                className={`formBtn submitButton ${!hasError() ? 'enabledButton' : ''}`}
            >
                Create Spot
            </button>

            <br />
            <button
                type="cancel"
                onClick={handleCancel}
                className="formBtn"
            >
                Cancel
            </button>
        </div>
    );
}

export default WorkoutPageForm;

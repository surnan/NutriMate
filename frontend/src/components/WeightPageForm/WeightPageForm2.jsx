// frontend/src/componenets/WeightPageForm/WeightPageForm.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./WeightPageForm.css";
import { postWeightsOneThunk } from "../../redux/weight";


function WeightPageForm() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        height: '',
        heightUnit: '',
        start: '',
        goal: '',
        current: '',
        day: '',
        weightUnit: '',
        userId: ''
    });

    const [errors, setErrors] = useState({})
    const [clickedSubmitBtn, setClickedSubmitBtn] = useState(false);
    const hasError = () => (Object.keys(errors).length !== 0)


    useEffect(() => {
        const newErrors = {};

        const allKeys = ["height", "heightUnit", "start", "goal", "current", "day", "weightUnit", "userId"];

        // for (let key of allKeys) {
        //     if (!form[key]) {
        //         newErrors[key] = capitalizeFirstLetter(`${key} is required`);
        //     }
        // }

        if (clickedSubmitBtn) {
            setErrors(newErrors)
        }
    }, [form, clickedSubmitBtn])


    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClickedSubmitBtn(true);

        const { height, heightUnit, start, goal, current, day, weightUnit, userId } = form;

        const body2 = {
            "metricSystem": true,
            "start": 888,
            "goal": 888,
            "current": 111,
            "day": Date.now(),
            "userId": 2,
        }


        const body = {
            "metricSystem": true,
            "start": 888,
            "goal": 888,
            "current": 111,
            "day": Date.now(),
            "userId": 2,
        }

        const submit = async () => {
            try {
                const result = await dispatch(postWeightsOneThunk({body}))

                if (result) {
                    nav(`/weights`);
                    console.log('body = ', body)
                    console.log('userId = ', userId)
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

    return (
        <form className="weightForm">
            <h3>Create a new Weight</h3>
            <br />

            <label>
                Height &#160;&#160;{errors.height && <span style={{ color: 'red' }}>{errors.height}</span>}
            </label>
            <input
                type="text"
                name="height"
                onChange={updateSetForm}
                placeholder="number"
            />

            <br />
            <label>
                Height Units &#160;&#160;{errors.heightUnit && <span style={{ color: 'red' }}>{errors.heightUnit}</span>}
            </label>
            <input
                type="text"
                name="heightUnit"
                onChange={updateSetForm}
                placeholder="cm or inches"
            />

            <br />
            <label>
                Start &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.start}</span>}
            </label>
            <input
                type="text"
                name="start"
                onChange={updateSetForm}
                placeholder="starting weight"
            />

            {/*  */}
            {/*  */}

            <br />
            <label>
                Goal &#160;&#160;{errors.goal && <span style={{ color: 'red' }}>{errors.goal}</span>}
            </label>
            <input
                type="text"
                name="goal"
                onChange={updateSetForm}
                placeholder="goal"
            />

            <br />
            <label>
                Current &#160;&#160;{errors.Current && <span style={{ color: 'red' }}>{errors.current}</span>}
            </label>
            <input
                type="text"
                name="current"
                onChange={updateSetForm}
                placeholder="current"
            />

            <br />
            <label>
                Day &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.day}</span>}
            </label>
            <input
                type="text"
                name="day"
                onChange={updateSetForm}
                placeholder="day"
            />

            {/*  */}
            {/*  */}

            <br />
            <label>
                Weight Unit &#160;&#160;{errors.height && <span style={{ color: 'red' }}>{errors.weightUnit}</span>}
            </label>
            <input
                type="text"
                name="weightUnit"
                onChange={updateSetForm}
                placeholder="weightUnit"
            />

            <br />
            <label>
                User Id &#160;&#160;{errors.userId && <span style={{ color: 'red' }}>{errors.userId}</span>}
            </label>
            <input
                type="text"
                name="useId"
                onChange={updateSetForm}
                placeholder="userId"
            />


            <br />

            <button
                type="submit"
                disabled={hasError()}
                onClick={handleSubmit}
                // className="formBtn submitButton "
                className={`formBtn submitButton ${!hasError() ? 'enabledButton' : ''}`}
            >
                Create Spot
            </button>

            <br />
        </form>
    );
}

export default WeightPageForm;

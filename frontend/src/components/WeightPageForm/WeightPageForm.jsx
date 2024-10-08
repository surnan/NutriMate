// frontend/src/componenets/WeightPageForm/WeightPageForm.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./WeightPageForm.css";
import { postWeightsOneThunk, updateWeightThunkById } from "../../redux/weight";
import DeleteWeightModal from '../DeleteWeightModal'


function WeightPageForm() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { newWeight, exampleData } = location.state || {};
    const [showDeletetModal, setShowDeletetModal] = useState(false);
    const [selectedWeight, setSelectedWeight] = useState(null);

    const handleDeleteBtn = (e, grub) => {
        e.preventDefault();
        setSelectedWeight(exampleData);
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedWeight(null)
        nav(-1)
    };

    const [form, setForm] = useState({
        id: exampleData?.id,
        metricSystem: true,
        start: exampleData?.start || '',
        goal: exampleData?.goal || '',
        current: exampleData?.current || '',
        day: exampleData?.day || '2023-11-01T00:00:00.000Z',
        userId: exampleData?.userId || 1
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

        const { id, metricSystem, start, goal, current, day, userId } = form;

        const body = {
            "id": parseInt(id),
            "metricSystem": true,
            "start": parseInt(start),
            "goal": parseInt(goal),
            "current": parseInt(current),
            "day": Date.now(),
            "userId": 2,
        }

        const submit = async () => {
            try {
                const result = newWeight
                ? await dispatch(updateWeightThunkById({ body }))
                : await dispatch(postWeightsOneThunk({ body }))

                if (result) {
                    nav(`/weights`);
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

        const allKeys = ["start", "goal", "current", "day", "userId"];

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
        <form className="weightForm">
            <h3>Create a new Weight</h3>
            <label>
                Start &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.start}</span>}
            </label>
            <input
                type="text"
                name="start"
                onChange={updateSetForm}
                placeholder="starting weight"
                value={form.start || ""}
            />

            <br />
            <label>
                Goal &#160;&#160;{errors.goal && <span style={{ color: 'red' }}>{errors.goal}</span>}
            </label>
            <input
                type="text"
                name="goal"
                onChange={updateSetForm}
                placeholder="goal"
                value={form.goal || ""}
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
                value={form.current || ""}
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
                value={form.day || ""}
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
                value={form.userId || ""}
            />


            <br />

            <button
                type="submit"
                disabled={hasError()}
                onClick={handleSubmit}
                className={`formBtn submitButton ${!hasError() ? 'enabledButton' : ''}`}
            >
                Create Spot
            </button>

            <button
                type="cancel"
                onClick={handleCancel}
                className="formBtn"
            >
                Cancel
            </button>
            <br />
            <button
                type="cancel"
                onClick={handleDeleteBtn}
                className="formBtn"
            >
                DELETE
            </button>
            {showDeletetModal && (
                <DeleteWeightModal
                    onClose={handleModalClose}
                    onSubmit={handleDeleteBtn}
                    weight={selectedWeight}
                />
            )}






        </form>
    );
}

export default WeightPageForm;

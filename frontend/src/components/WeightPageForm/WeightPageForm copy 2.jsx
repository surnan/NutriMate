// frontend/src/componenets/WeightPageForm/WeightPageForm.jsx
import "./WeightPageForm.css";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postWeightsOneThunk, updateWeightThunkById } from "../../redux/weight";
import DeleteWeightModal from '../DeleteWeightModal'


function WeightPageForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const sessionUser = useSelector((state) => state.session.user);

    const { newWeight, exampleData } = location.state || {};

    const [showDeletetModal, setShowDeletetModal] = useState(false);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [isEditing, setIsEditing] = useState(!exampleData);
    // const [clickedSubmitBtn, setClickedSubmitBtn] = useState(false);
    const [errors, setErrors] = useState({});

    const formRef = useRef(null);

    const [form, setForm] = useState({
        id: exampleData?.id,
        metricSystem: exampleData?.metricSystem || false,
        start: exampleData?.start || '',
        goal: exampleData?.goal || '',
        current: exampleData?.current || '',
        day: exampleData?.day || Date.now(),
        userId: exampleData?.userId || sessionUser.id
    });

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const hasError = () => Object.keys(errors).length !== 0;


    const handleDeleteBtn = () => {
        setSelectedWeight(exampleData);
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedWeight(null)
        navigate(-1)
    };

    const handleBackBtn = () => { navigate(-1) };

    const handleSubmit = async (e) => {
        if (hasError()) {
            return
        }

        e.preventDefault();
        setIsEditing(false)

        const { id, metricSystem, start, goal, current, day, userId } = form;

        const body = {
            id: parseInt(id),
            metricSystem: metricSystem,
            start: parseInt(start),
            goal: parseInt(goal),
            current: parseInt(current),
            day: day || Date.now(),
            userId: parseInt(userId),
        }

        try {
            const result = newWeight
                ? await dispatch(updateWeightThunkById({ body }))
                : await dispatch(postWeightsOneThunk({ body }))
            if (result) { navigate(`/weights`) }
        } catch (error) {
            console.error('Error adding weight:', error);
        }
    }



    useEffect(() => {
        const newErrors = {};

        const allKeys = ["metricSystem", "start", "goal", "current", "day", "userId"];

        allKeys.forEach((key) => {
            if (!form[key]) {
                newErrors[key] = `${capitalizeFirstLetter(key)} is required`;
            }
        });
        setErrors(newErrors);
    }, [form])

    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const toggleEditMode = () => {
        setIsEditing(prev => !prev)
    }

    // const handleCancelBtn = () => {
    //     setIsEditing(false)
    //     setForm({
    //         metricSystem: exampleData?.metricSystem || false,
    //         start: exampleData?.start || 0,
    //         goal: exampleData?.goal || 0,
    //         current: exampleData?.current || 0,
    //         day: exampleData?.day || Date.now() || '2023-11-01T00:00:00.000Z',
    //         userId: exampleData?.userId || sessionUser.id
    //     });
    //     // navigate(-1);  // This navigateigates back to the previous page
    // };

    // const handleUpdateBtn = () => {
    //     setIsEditing(true);
    // };



    return (
        <>
            <h1>WeightPageForm.jsx</h1>
            <h3 >Email = {sessionUser?.email}</h3>

            {/* <div className="weightPageForm_hFlex"> */}
            <form className="weightPageForm_hFlex">
                <button
                    className="back_btn"
                    type="button"
                    onClick={handleBackBtn}
                >
                    BACK
                </button>

                {/* {isEditing ? (
                    <button
                        className="back_btn green"
                        type="button"
                        onClick={handleSubmit}
                        disabled={hasError()}
                    >
                        SAVE
                    </button>
                ) : (
                    <button
                        className="back_btn blue"
                        type="button"
                        onClick={handleUpdateBtn}>
                        UPDATE
                    </button>
                )} */}

                <button
                    className={`back_btn ${isEditing ? 'green' : 'blue'}`}
                    type="button"
                    onClick={isEditing ? handleSubmit : toggleEditMode}
                    disabled={isEditing && hasError()}
                >
                    {isEditing ? 'SAVE' : 'EDIT'}
                </button>
            {/* </div> */}
            </form>

            <div className="weight_page_form_grid">
                <label style={{ display: 'inline-flex' }}>
                    {errors.metricSystem && <span style={{ color: 'red' }}>{errors.metricSystem}&nbsp;&nbsp;</span>} metricSystem:
                </label>

                <input
                    type="checkbox"
                    name="metricSystem"
                    onChange={updateSetForm}
                    placeholder="Enter name"
                    value={form.metricSystem}
                    readOnly={!isEditing}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.start && <span style={{ color: 'red' }}>{errors.start}&nbsp;&nbsp;</span>} start
                </label>
                <input
                    type="number"
                    name="start"
                    onChange={updateSetForm}
                    placeholder="Please enter starting weight"
                    value={form.start}
                    readOnly={!isEditing}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.goal && <span style={{ color: 'red' }}>{errors.goal}&nbsp;&nbsp;</span>} goal
                </label>
                <input
                    type="number"
                    name="goal"
                    onChange={updateSetForm}
                    placeholder="Please enter goal weight"
                    value={form.goal}
                    readOnly={!isEditing}
                />


                <label style={{ display: 'inline-flex' }}>
                    {errors.current && <span style={{ color: 'red' }}>{errors.current}&nbsp;&nbsp;</span>} current
                </label>
                <input
                    type="number"
                    name="current"
                    onChange={updateSetForm}
                    placeholder="Please enter current weight"
                    value={form.current}
                    readOnly={!isEditing}
                />


                <label style={{ display: 'inline-flex' }}>
                    {errors.day && <span style={{ color: 'red' }}>{errors.day}&nbsp;&nbsp;</span>} Day
                </label>
                <input
                    type="date"
                    name="day"
                    onChange={updateSetForm}
                    placeholder="Please enter your goal weight"
                    value={form.day || Date.now()}
                    readOnly={!isEditing}
                />
            </div>
            <div className="weightPageForm_hFlex">
                <button
                    className="back_btn green"
                    type="button"
                    onClick={isEditing ? handleCancelBtn : handleDeleteBtn}
                >
                    RESTORE
                </button>

                {exampleData && (
                    <button
                        className="back_btn red"
                        type="button"
                        onClick={handleDeleteBtn}
                    >
                        DELETE
                    </button>
                )}


            </div>
            {showDeletetModal && (
                <DeleteWeightModal
                    onClose={handleModalClose}
                    onSubmit={handleDeleteBtn}
                    weight={selectedWeight}
                />
            )}
        </>
    );
}

export default WeightPageForm;

// frontend/src/componenets/WeightPageForm/WeightPageForm.jsx
import "./WeightPageForm.css";
import { useEffect, useState } from "react";
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
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        id: exampleData?.id,
        metricSystem: exampleData?.metricSystem || false,
        start: exampleData?.start || '',
        goal: exampleData?.goal || '',
        current: exampleData?.current || '',
        day: exampleData?.day || Date.now(),
        userId: exampleData?.userId || sessionUser.id
    });

    const updateSetForm = (e) => {
        const { name, type, value, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    useEffect(() => {
        const newErrors = {};
        const allKeys = ["start", "goal", "current", "day"];

        allKeys.forEach((key) => {
            if (!form[key]) {
                newErrors[key] = `${capitalizeFirstLetter(key)} is required`;
            }
        });
        setErrors(newErrors);
    }, [form])

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const hasError = () => Object.keys(errors).length !== 0;

    const formatDate = (dateString) => {
        if (!dateString) return new Date().toISOString().split('T')[0]; // Use current date if not provided
        const date = new Date(dateString);
        return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    };

    //Delete Button & Modal -- start
    const handleDeleteBtn = () => {
        if (!exampleData?.id) {
            alert('Record cannot be deleted because it has not been saved yet.');
            return;
        }
        setSelectedWeight(exampleData);
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedWeight(null)
        navigate(-1)
    };
    //Delete Button & Modal -- end


    const handleBackBtn = () => { navigate(-1) };
    const handleSubmit = async (e) => {
        if (hasError()) {
            console.log("===> ERRORS = ", errors)
            return
        }

        e.preventDefault();

        const { id, metricSystem, start, goal, current, day, userId } = form;

        const body = {
            "id": parseInt(id),
            "metricSystem": metricSystem || false,
            "start": parseInt(start),
            "goal": parseInt(goal),
            "current": parseInt(current),
            "day": day || Date.now(),
            "userId": parseInt(userId),
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
    const handleResetBtn = () => {
        setForm({
            metricSystem: exampleData?.metricSystem || false,
            start: exampleData?.start || '',
            goal: exampleData?.goal || '',
            current: exampleData?.current || '',
            day: formatDate(exampleData?.day),
            userId: exampleData?.userId || sessionUser.id
        });
        // navigate(-1);  // This navigateigates back to the previous page
    };

    return (
        <>
            <h1>WeightPageForm.jsx</h1>
            <h3 >Email = {sessionUser?.email}</h3>

            <div className="max_HFlex">
                <button
                    className="blue"
                    type="button"
                    onClick={handleBackBtn}
                >
                    BACK
                </button>

                <div className="weightPageForm_hFlex">
                    <button
                        className="orange"
                        type="button"
                        onClick={handleResetBtn}
                    >
                        RESET
                    </button>
                    <button
                        className={`green`}
                        type="button"
                        onClick={handleSubmit}
                        disabled={hasError()}
                    >
                        SAVE
                    </button>

                </div>
            </div>

            <div className="weight_page_form_grid">
                <label style={{ display: 'inline-flex' }}>
                    {errors.day && <span style={{ color: 'red' }}>{errors.day}&nbsp;&nbsp;</span>} Day
                </label>
                <input
                    type="date"
                    name="day"
                    onChange={updateSetForm}
                    placeholder="Please enter your goal weight"
                    value={formatDate(form.day)}
                />


                <label style={{ display: 'inline-flex' }}>
                    {errors.start && <span style={{ color: 'red' }}>{errors.start}&nbsp;&nbsp;</span>} Starting Weight (number):
                </label>
                <input
                    type="number"
                    name="start"
                    onChange={updateSetForm}
                    placeholder="Please enter starting weight as integer"
                    value={form.start}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.goal && <span style={{ color: 'red' }}>{errors.goal}&nbsp;&nbsp;</span>} Goal Weight (number):
                </label>
                <input
                    type="number"
                    name="goal"
                    onChange={updateSetForm}
                    placeholder="Please enter goal weight as integer"
                    value={form.goal}
                />


                <label style={{ display: 'inline-flex' }}>
                    {errors.current && <span style={{ color: 'red' }}>{errors.current}&nbsp;&nbsp;</span>} Current Weight (number):
                </label>
                <input
                    type="number"
                    name="current"
                    onChange={updateSetForm}
                    placeholder="Please enter current weight as integer"
                    value={form.current}
                />

                <label style={{ display: 'inline-flex' }}>
                    metricSystem:
                </label>

                <input
                    type="checkbox"
                    name="metricSystem"
                    onChange={updateSetForm}
                    checked={form.metricSystem}
                />



            </div>
            <div className="weightPageForm_hFlex">
                <button
                    className="red"
                    type="button"
                    onClick={handleDeleteBtn}
                >
                    DELETE
                </button>
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

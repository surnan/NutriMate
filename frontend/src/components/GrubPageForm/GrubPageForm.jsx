// frontend/src/componenets/GrubPageForm/GrubPageForm.jsx
import "./GrubPageForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postGrubsOneThunk, updateGrubsOneThunk } from "../../redux/grubs"
import DeleteGrubModal from '../DeleteGrubModal'


function GrubPageForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const sessionUser = useSelector((state) => state.session.user);
    const { newGrub, currentData } = location.state || {};

    const [showDeletetModal, setShowDeletetModal] = useState(false);
    const [selectedGrub, setSelectedGrub] = useState(null);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: currentData?.name || "",
        servingUnit: currentData?.servingUnit || '',
        servingSize: currentData?.servingSize || '',
        calories: currentData?.calories || '',
        protein: currentData?.protein || '',
        fats: currentData?.fats || '',
        carbs: currentData?.carbs || '',
        sugar: currentData?.sugar || '',
        company: currentData?.company || '',
        description: currentData?.description || '',
        userId: currentData?.userId || sessionUser?.id || 1
    });

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const hasError = () => Object.keys(errors).length !== 0;

    const handleDeleteBtn = () => {
        if (!currentData?.id) {
            alert('Can not delete this new record because it has not been saved to database');
            return;
        }
        setSelectedGrub(currentData);
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedGrub(null)
        navigate(-1)
    };

    const handleBackBtn = () => { navigate(-1) };

    const handleSubmit = async (e) => {
        console.log("====> hasErrors ==> ", hasError())
        if (hasError()) {
            return
        }
        e.preventDefault();

        const { name, servingUnit, servingSize, calories, protein, fats } = form
        const { carbs, sugar, company, description, userId } = form

        const body = {
            id: parseInt(currentData?.id),
            name,
            servingUnit,
            servingSize: parseInt(servingSize),
            calories: parseInt(calories),
            protein: parseInt(protein) || 0,
            fats: parseInt(fats) || 0,
            carbs: parseInt(carbs) || 0,
            sugar: parseInt(sugar) || 0,
            company: company || "",
            description: description || "",
            userId: parseInt(userId) || 1,
        }

        console.log("=====> body ==> ", body)
        try {
            const result = newGrub
                ? await dispatch(updateGrubsOneThunk({ body }))
                : await dispatch(postGrubsOneThunk({ body }))
            if (result) { navigate(`/grubs`) }
        } catch (error) {
            console.error('Error adding grub:', error);
        }
    }

    const handleCancelBtn = () => {
        setForm({
            name: currentData?.name || "",
            description: currentData?.description,
            servingUnit: currentData?.servingUnit,
            servingSize: currentData?.servingSize,
            calories: currentData?.calories,
            protein: currentData?.protein,
            fats: currentData?.fats,
            carbs: currentData?.carbs,
            sugar: currentData?.sugar,
            company: currentData?.company,
            userId: currentData?.userId || 1
        });
    };

    useEffect(() => {
        const newErrors = {};

        const mandatory = ["name", "servingUnit", "servingSize", "calories"];
        const minZero = ["protein", "fats", "carbs", "sugar"]
        const minOne = ["servingSize", "calories"]
        const optionalMinZero = ["protein", "fats", "carbs", "sugar"]

        mandatory.forEach((key) => {
            if (!form[key]) {
                newErrors[key] = `${capitalizeFirstLetter(key)} is required`;
            }
        });

        minZero.forEach(key => {
            if (isNaN(form[key])) {
                newErrors[key] = `${capitalizeFirstLetter(key)} must be number`;
                return
            }
            if (form[key] < 0) {
                newErrors[key] = `${capitalizeFirstLetter(key)} min is 0`;
            }
        })

        minOne.forEach(key => {
            if (isNaN(form[key])) {
                newErrors[key] = `${capitalizeFirstLetter(key)} must be number`;
                return
            }
            if (form[key] < 1) {
                newErrors[key] = `${capitalizeFirstLetter(key)} min is 1`;
            }
        })

        optionalMinZero.forEach(key => {
            if (isNaN(form[key])) {
                newErrors[key] = `${capitalizeFirstLetter(key)} must be number`;
                return
            }
            if (form[key] < 0) {
                newErrors[key] = `${capitalizeFirstLetter(key)} min is 0`;
            }
        })

        setErrors(newErrors);
    }, [form])



    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const formatDate = (dateString) => {
        if (!dateString) return new Date().toISOString().split('T')[0]; // Use current date if not provided
        const date = new Date(dateString);
        return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    };

    return (
        <div className="mainBodyStyle">
            {/* <h1>GrubForm.jsx</h1>
            <h3 >Email = {sessionUser?.email}</h3> */}

            <div className="grubPageForm_hFlex">
                <button
                    className="orange _button"
                    type="button"
                    onClick={handleBackBtn}
                >
                    BACK
                </button>

                <div className="grubPageForm_hFlex">
                    <button
                        className="blue _button"
                        type="button"
                        onClick={handleCancelBtn}
                    >
                        RESET
                    </button>

                    <button
                        className="green _button"
                        type="button"
                        onClick={handleSubmit}
                        disabled={hasError()}
                    >
                        SAVE
                    </button>
                </div>
            </div>


            <div className="grub_page_form_grid">
                <label style={{ display: 'inline-flex' }}>
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}&nbsp;&nbsp;</span>} Name:
                </label>
                <input
                    type="text"
                    name="name"
                    onChange={updateSetForm}
                    placeholder="enter name"
                    value={form.name || ""}
                />

                <div>
                    {errors.servingSize && <span style={{ color: 'red' }}>{errors.servingSize}&nbsp;&nbsp;</span>}
                    <p>
                        Per Serving
                    </p>
                    <input
                        type="Number"
                        name="servingSize"
                        onChange={updateSetForm}
                        placeholder="Quantity"
                        value={form.servingSize || ""}
                    />
                </div>
                <div>
                    <select
                        name="servingUnit"
                        onChange={updateSetForm}
                        value={form.servingUnit || ""}
                    >
                        <option value="">Quantity Type</option>
                        <option value="bowls">bowls</option>
                        <option value="each">each</option>
                        <option value="cups">cups</option>
                        <option value="grams">grams</option>
                        <option value="oz">ounces</option>
                        <option value="tablespoon">tablespoon</option>
                        <option value="teaspoon">teaspoon</option>
                    </select>
                    {errors.servingUnit && <span style={{ color: 'red' }}>{errors.servingUnit}&nbsp;&nbsp;</span>}
                </div>
                <label style={{ display: 'inline-flex' }}>
                    {errors.calories && <span style={{ color: 'red' }}>{errors.calories}&nbsp;&nbsp;</span>} Calories
                </label>
                <input
                    type="Number"
                    name="calories"
                    onChange={updateSetForm}
                    placeholder="enter calories"
                    value={form.calories || ""}
                />

                <div>
                    {/* protein */}
                    <div className="grubVflex">
                        <label style={{ display: 'inline-flex' }}>
                            Protein (g)
                        </label>
                        <input
                            type="Number"
                            name="protein"
                            onChange={updateSetForm}
                            placeholder="enter protein"
                            value={form.protein || ""}
                        />
                        {errors.protein && <p style={{ color: 'red' }}>{errors.protein}&nbsp;&nbsp;</p>}
                    </div>

                    {/* fats */}
                    <div className="grubVflex">
                        <label style={{ display: 'inline-flex' }}>
                            Fats (g)
                        </label>
                        <input
                            type="Number"
                            name="fats"
                            onChange={updateSetForm}
                            placeholder="enter fats"
                            value={form.fats || ""}
                        />
                        {errors.fats && <p style={{ color: 'red' }}>{errors.fats}&nbsp;&nbsp;</p>}
                    </div>

                    {/* carbs */}
                    <div className="grubVflex">
                        <label style={{ display: 'inline-flex' }}>
                            Carbs (g)
                        </label>
                        <input
                            type="Number"
                            name="carbs"
                            onChange={updateSetForm}
                            placeholder="enter carbs"
                            value={form.carbs || ""}
                        />
                        {errors.carbs && <p style={{ color: 'red' }}>{errors.carbs}&nbsp;&nbsp;</p>}
                    </div>

                    {/* sugar */}
                    <div className="grubVflex">
                        <label style={{ display: 'inline-flex' }}>
                            Sugar (g)
                        </label>
                        <input
                            type="Number"
                            name="sugar"
                            onChange={updateSetForm}
                            placeholder="enter sugar"
                            value={form.sugar || ""}
                        />
                        {errors.sugar && <p style={{ color: 'red' }}>{errors.sugar}&nbsp;&nbsp;</p>}
                    </div>
                </div>


                <label style={{ display: 'inline-flex' }}>
                    Company
                </label>
                <input
                    type="text"
                    name="company"
                    onChange={updateSetForm}
                    placeholder="enter company name"
                    value={form.company || ""}
                />

                <label style={{ display: 'inline-flex' }}>
                    Description
                </label>
                <textarea
                    name="description"
                    onChange={updateSetForm}
                    placeholder="enter description"
                    value={form.description || ""}
                />


                <div >
                    <button
                        className="red _button"
                        type="button"
                        onClick={handleDeleteBtn}
                    >
                        DELETE
                    </button>
                </div>
            </div>

            {showDeletetModal && (
                <DeleteGrubModal
                    onClose={handleModalClose}
                    onSubmit={handleDeleteBtn}
                    grub={selectedGrub}
                />
            )}
            <br />
            <br />
            <hr />
            <br />
            <br />
            <div className="workout_page_form_grid">

                <p>Date</p>
                <input
                    type="datetime-local"
                    name="day"
                    onChange={updateSetForm}
                    placeholder="Please enter your goal weight"
                    value={formatDate(form.day)}
                />
                <p>Serving Count</p>
                <input
                    type="number"
                    name="day"
                    onChange={updateSetForm}
                    placeholder="Please enter your goal weight"
                    value={formatDate(form.day)}
                />
               <label>
                calculated calories
               </label>
                <p> 99878 Calories</p>
                <input
                    type="number"
                    name="day"
                    onChange={updateSetForm}
                    placeholder="Please enter your goal weight"
                    value={formatDate(form.day)}
                />
                <input
                    type="number"
                    name="Quantity"
                    onChange={updateSetForm}
                    placeholder="Quantity"
                    value={formatDate(form.day)}
                />
                <select
                    name="servingUnit"
                    onChange={updateSetForm}
                    value={form.servingUnit || ""}
                >
                    <option value="">Quantity Type</option>
                    <option value="hours">hours</option>
                    <option value="minutes">minutes</option>
                    <option value="seconds">seconds</option>
                    <option value="each">each</option>
                    <option value="reps">reps</option>
                </select>

            </div>

        </div>
    );
}

export default GrubPageForm;
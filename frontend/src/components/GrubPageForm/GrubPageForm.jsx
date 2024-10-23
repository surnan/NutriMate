// frontend/src/componenets/GrubPageForm/GrubPageForm.jsx
import "./GrubPageForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { postGrubsOneThunk, updateGrubsOneThunk, deleteGrubThunkById, getGrubsOneThunk } from "../../redux/grubs"
import DeleteModal from "../DeleteModal/DeleteModal";
import { capitalizeFirstLetter, formatDate, isEmpty } from '../../utils/MyFunctions'


function GrubPageForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { id } = useParams();
    const grubId = parseInt(id);
    const { newGrub } = location.state || {};  // newGrub -> empty form

    const sessionUser = useSelector((state) => state.session.user);
    const grubObj = useSelector((state) => state.grubs.single)

    const [showDeleteModal, setShowDeletetModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        servingUnit: '',
        servingSize: '',
        calories: '',
        protein: '',
        fats: '',
        carbs: '',
        sugar: '',
        company: '',
        description: '',
        userId: sessionUser?.id || 1
    });


    useEffect(() => {
        if (!newGrub && grubObj) {
            setForm({
                name: grubObj.name || "",
                description: grubObj.description || "",
                servingUnit: grubObj.servingUnit || '',
                servingSize: grubObj.servingSize || '',
                calories: grubObj.calories || '',
                protein: grubObj.protein || '',
                fats: grubObj.fats || '',
                carbs: grubObj.carbs || '',
                sugar: grubObj.sugar || '',
                company: grubObj.company || '',
                userId: grubObj.userId || sessionUser?.id || 1
            });
        }
    }, [grubObj, newGrub, sessionUser])


    useEffect(() => {
        if (!newGrub && grubObj) {
            dispatch(getGrubsOneThunk(grubId))
        }
    }, [dispatch, grubId, newGrub])


    useEffect(() => {
        const newErrors = {};

        const validateFields = (fields, condition, errorMessage) => {
            fields.forEach((key) => {
                if (isNaN(form[key])) {
                    newErrors[key] = `${capitalizeFirstLetter(key)} must be a number`;
                } else if (condition(form[key])) {
                    newErrors[key] = `${capitalizeFirstLetter(key)} ${errorMessage}`;
                }
            });
        };

        const mandatoryFields = ["name", "servingUnit", "servingSize", "calories"];
        const minZeroFields = ["protein", "fats", "carbs", "sugar", "protein", "fats", "carbs", "sugar"]
        const minOneFields = ["servingSize", "calories"]

        mandatoryFields.forEach((key) => {
            if (!form[key]) {
                newErrors[key] = `${capitalizeFirstLetter(key)} is required`;
            }
        });

        validateFields(
            minOneFields,
            (value) => value < 1,
            "minimum is 1"
        );

        validateFields(
            minZeroFields,
            (value) => value < 0,
            "minimum is 0"
        );

        setErrors(newErrors);
    }, [form])


    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleBack = () => navigate(-1);

    const handleReset = () => {
        setForm({
            name: grubObj?.name || "",
            description: grubObj?.description,
            servingUnit: grubObj?.servingUnit,
            servingSize: grubObj?.servingSize,
            calories: grubObj?.calories,
            protein: grubObj?.protein,
            fats: grubObj?.fats,
            carbs: grubObj?.carbs,
            sugar: grubObj?.sugar,
            company: grubObj?.company,
            userId: grubObj?.userId || 1
        });
    };

    const handleSubmitSave = async (e) => {
        e.preventDefault();

        try {
            const { name, servingUnit, servingSize, calories, protein, fats } = form
            const { carbs, sugar, company, description, userId } = form

            const body = {
                id: parseInt(grubObj?.id),
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

            const result = grubId
                ? await dispatch(updateGrubsOneThunk({ body }))
                : await dispatch(postGrubsOneThunk({ body }))
            if (result) {
                navigate(-1)
            }
        } catch (error) {
            console.error('Error adding grub:', error);
        }
    }


    
    const handleDeleteBtn = () => {
        if (!grubId) {
            alert('Can not delete this new record because it has not been saved to database');
            return;
        }
        setShowDeletetModal(true)
    }
    
    const handleModalClose = () => {
        setShowDeletetModal(false)
        navigate(-1)
    };
    

    
    // const hasError = () => Object.keys(errors).length !== 0;

    return (
        <div className="mainBodyStyle">
            <h1>GrubForm.jsx</h1>
            <h3 >Email = {sessionUser?.email}</h3>

            <div className="grubPageForm_hFlex">
                <button
                    className="orange _button"
                    type="button"
                    onClick={handleBack}
                >
                    BACK
                </button>

                <div className="grubPageForm_hFlex">
                    <button
                        className="blue _button"
                        type="button"
                        onClick={handleReset}
                    >
                        RESET
                    </button>

                    <button
                        className={`green _button ${isEmpty(errors) ? "disabled_btn" : ""}`}
                        type="button"
                        onClick={handleSubmitSave}
                        // disabled={hasError()}
                        disabled={isEmpty(errors)}
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
                    className="_input"
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
                        className="_input"
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
                    className="_input"
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
                            className="_input"
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
                            className="_input"
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
                            className="_input"
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
                            className="_input"
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
                    className="_input"
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
                    className="_textarea"
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

            {/* DELETE MODAL */}
            {showDeleteModal && (
                <DeleteModal
                    item={grubObj}
                    itemType="grubs"
                    deleteThunk={deleteGrubThunkById}
                    onClose={handleModalClose}
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
                    className="_input"
                    type="datetime-local"
                    name="day"
                    onChange={updateSetForm}
                    placeholder="Please enter your goal weight"
                    value={formatDate(form.day)}
                />
                <p>Serving Count</p>
                <input
                    className="_input"
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
                    className="_input"
                    type="number"
                    name="day"
                    onChange={updateSetForm}
                    placeholder="Please enter your goal weight"
                    value={formatDate(form.day)}
                />
                <input
                    className="_input"
                    type="number"
                    name="Quantity"
                    onChange={updateSetForm}
                    placeholder="Quantity"
                    value={formatDate(form.day)}
                />
                <select
                    className="_input"
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
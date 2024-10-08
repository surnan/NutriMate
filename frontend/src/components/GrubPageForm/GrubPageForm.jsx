// frontend/src/componenets/GrubPageForm/GrubPageForm.jsx
import "./GrubPageForm.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postGrubsOneThunk, updateGrubsOneThunk } from "../../redux/grubs"
import DeleteGrubModal from '../DeleteGrubModal'


function GrubPageForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { newGrub, exampleData } = location.state || {};

    const [showDeletetModal, setShowDeletetModal] = useState(false);
    const [selectedGrub, setSelectedGrub] = useState(null);
    const [isEditing, setIsEditing] = useState(!exampleData);
    // const [clickedSubmitBtn, setClickedSubmitBtn] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: exampleData?.name || "",
        servingUnit: exampleData?.servingUnit || '',
        servingSize: exampleData?.servingSize || '',
        calories: exampleData?.calories || '',
        protein: exampleData?.protein || '',
        fats: exampleData?.fats || '',
        carbs: exampleData?.carbs || '',
        sugar: exampleData?.sugar || '',
        company: exampleData?.company || '',
        description: exampleData?.description || '',
        userId: exampleData?.userId || 1
    });

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const hasError = () => Object.keys(errors).length !== 0;

    const handleDeleteBtn = (e) => {
        setSelectedGrub(exampleData);
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedGrub(null)
        navigate(-1)
    };

    const handleBackBtn = () => { 
        console.log("==> handleBackBtn")
        navigate(-1) 
    };

    const handleSubmit = async (e) => {
        if (hasError()) {
            return
        }
        e.preventDefault();
        setIsEditing(false)

        const { name, servingUnit, servingSize, calories, protein, fats } = form
        const { carbs, sugar, company, description } = form

        const body = {
            id: parseInt(exampleData?.id),
            name,
            servingUnit,
            servingSize: parseInt(servingSize),
            calories: parseInt(calories),
            protein: parseInt(protein),
            fats: parseInt(fats),
            carbs: parseInt(carbs),
            sugar: parseInt(sugar),
            company,
            description,
            userId: 1,
        }

        try {
            const result = newGrub
                ? await dispatch(updateGrubsOneThunk({ body }))
                : await dispatch(postGrubsOneThunk({ body }))
            if (result) { navigate(`/grubs`) }
        } catch (error) {
            console.error('Error adding grub:', error);
        }
    }

    const handleCancelBtn = (e) => {
        setIsEditing(false)
        setForm({
            name: exampleData?.name || "",
            description: exampleData?.description,
            servingUnit: exampleData?.servingUnit,
            servingSize: exampleData?.servingSize,
            calories: exampleData?.calories,
            protein: exampleData?.protein,
            fats: exampleData?.fats,
            carbs: exampleData?.carbs,
            sugar: exampleData?.sugar,
            company: exampleData?.company,
            description: exampleData?.description,
            userId: exampleData?.userId || 1


        });
    };

    const handleUpdateBtn = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        const newErrors = {};
        const allKeys = ["name", "servingUnit", "servingSize", "calories", "protein", "fats", "carbs", "sugar", "company", "description"];

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

    return (
        <div>
            <h1>GrubForm.jsx</h1>

            <div className="grubPageForm_hFlex">
                <button
                    className="back_btn"
                    type="button"
                    onClick={handleBackBtn}
                >
                    BACK
                </button>

                {isEditing ? (
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
                )}
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
                    readOnly={!isEditing}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.servingUnit && <span style={{ color: 'red' }}>{errors.servingUnit} &nbsp;&nbsp; </span>}Serving Unit
                </label>
                <input
                    type="text"
                    name="servingUnit"
                    onChange={updateSetForm}
                    placeholder="enter serving Unit"
                    value={form.servingUnit || ""}
                    readOnly={!isEditing}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.servingSize && <span style={{ color: 'red' }}>{errors.servingSize}&nbsp;&nbsp;</span>} Serving Size
                </label>
                <input
                    type="text"
                    name="servingSize"
                    onChange={updateSetForm}
                    placeholder="enter serving size"
                    value={form.servingSize || ""}
                    readOnly={!isEditing}
                />
                <label style={{ display: 'inline-flex' }}>
                    {errors.calories && <span style={{ color: 'red' }}>{errors.calories}&nbsp;&nbsp;</span>} Calories
                </label>
                <input
                    type="text"
                    name="calories"
                    onChange={updateSetForm}
                    placeholder="enter calories"
                    value={form.calories || ""}
                    readOnly={!isEditing}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.protein && <span style={{ color: 'red' }}>{errors.protein}&nbsp;&nbsp;</span>} Protein
                </label>
                <input
                    type="text"
                    name="protein"
                    onChange={updateSetForm}
                    placeholder="enter protein"
                    value={form.protein || ""}
                    readOnly={!isEditing}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.fats && <span style={{ color: 'red' }}>{errors.fats}&nbsp;&nbsp;</span>} Fats
                </label>
                <input
                    type="text"
                    name="fats"
                    onChange={updateSetForm}
                    placeholder="enter fats"
                    value={form.fats || ""}
                    readOnly={!isEditing}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.carbs && <span style={{ color: 'red' }}>{errors.carbs}</span>} Carbs
                </label>
                <input
                    type="text"
                    name="carbs"
                    onChange={updateSetForm}
                    placeholder="enter carbs"
                    value={form.carbs || ""}
                    readOnly={!isEditing}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.sugar && <span style={{ color: 'red' }}>{errors.sugar}&nbsp;&nbsp;</span>}Sugar
                </label>
                <input
                    type="text"
                    name="sugar"
                    onChange={updateSetForm}
                    placeholder="enter sugar"
                    value={form.sugar || ""}
                    readOnly={!isEditing}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.company && <span style={{ color: 'red' }}>{errors.company}&nbsp;&nbsp;</span>} Company
                </label>
                <input
                    type="text"
                    name="company"
                    onChange={updateSetForm}
                    placeholder="enter company name"
                    value={form.company || ""}
                    readOnly={!isEditing}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.description && <span style={{ color: 'red' }}>{errors.description}&nbsp;&nbsp;</span>} Description
                </label>
                <input
                    type="text"
                    name="description"
                    onChange={updateSetForm}
                    placeholder="enter description"
                    value={form.description || ""}
                    readOnly={!isEditing}
                />
            </div>

            <div className="workout_page_btn_grid">
                {exampleData && (
                    <button
                        className="back_btn red"
                        type="button"
                        onClick={isEditing ? handleCancelBtn : handleDeleteBtn}
                    >
                        {isEditing ? "CANCEL" : "DELETE"}
                    </button>
                )}
            </div>



            {showDeletetModal && (
                <DeleteGrubModal
                    onClose={handleModalClose}
                    onSubmit={handleDeleteBtn}
                    grub={selectedGrub}
                />
            )
            }

        </div>

    );
}

export default GrubPageForm;



            
{/* <button
type="submit"
// disabled={hasError()}
onClick={handleSubmit}
className={`formBtn submitButton ${!hasError() ? 'enabledButton' : ''}`}
>
Create Grub
</button>


<br />
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
</button> */}
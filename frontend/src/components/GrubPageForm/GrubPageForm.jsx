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

    const handleDeleteBtn = () => {
        setSelectedGrub(exampleData);
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedGrub(null)
        navigate(-1)
    };

    const handleBackBtn = () => {navigate(-1)};

    const handleSubmit = async (e) => {
        if (hasError()) {
            return
        }
        e.preventDefault();

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

    const handleCancelBtn = () => {
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
            userId: exampleData?.userId || 1
        });
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

                <div className="grubPageForm_hFlex">
                    <button
                        className="back_btn blue"
                        type="button"
                        onClick={handleCancelBtn}
                    >
                        RESET
                    </button>

                    <button
                        className="back_btn green"
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
                    <input
                        type="Number"
                        name="servingSize"
                        onChange={updateSetForm}
                        placeholder="enter serving size"
                        value={form.servingSize || ""}
                    />
                </div>
                <select
                    name="servingUnit"
                    onChange={updateSetForm}
                    value={form.servingUnit || ""}
                >
                    <option value="">Select Serving Unit</option>
                    <option value="each">Each</option>
                    <option value="Table Spoon">Table Spoon</option>
                    <option value="Tea Spoon">Tea Spoon</option>
                    <option value="oz">Oz</option>
                    <option value="grams">Grams</option>
                </select>

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
                            Protein
                        </label>
                        <input
                            type="Number"
                            name="protein"
                            onChange={updateSetForm}
                            placeholder="enter protein"
                            value={form.protein || ""}
                        />
                    </div>

                    {/* fats */}
                    <div className="grubVflex">
                        <label style={{ display: 'inline-flex' }}>
                            Fats
                        </label>
                        <input
                            type="Number"
                            name="fats"
                            onChange={updateSetForm}
                            placeholder="enter fats"
                            value={form.fats || ""}
                        />
                    </div>

                    {/* carbs */}
                    <div className="grubVflex">
                        <label style={{ display: 'inline-flex' }}>
                            Carbs
                        </label>
                        <input
                            type="Number"
                            name="carbs"
                            onChange={updateSetForm}
                            placeholder="enter carbs"
                            value={form.carbs || ""}
                        />
                    </div>

                    {/* sugar */}
                    <div className="grubVflex">
                        <label style={{ display: 'inline-flex' }}>
                            Sugar
                        </label>
                        <input
                            type="Number"
                            name="sugar"
                            onChange={updateSetForm}
                            placeholder="enter sugar"
                            value={form.sugar || ""}
                        />
                    </div>
                </div>


                <label style={{ display: 'inline-flex' }}>
                    {errors.company && <span style={{ color: 'red' }}>{errors.company}&nbsp;&nbsp;</span>} Company
                </label>
                <input
                    type="text"
                    name="company"
                    onChange={updateSetForm}
                    placeholder="enter company name"
                    value={form.company || ""}
                />

                <label style={{ display: 'inline-flex' }}>
                    {errors.description && <span style={{ color: 'red' }}>{errors.description}&nbsp;&nbsp;</span>} Description
                </label>
                <textarea
                    name="description"
                    onChange={updateSetForm}
                    placeholder="enter description"
                    value={form.description || ""}
                />


                <div >
                    <button
                        className="back_btn red"
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
        </div>
    );
}

export default GrubPageForm;
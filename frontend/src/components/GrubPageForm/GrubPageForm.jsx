// frontend/src/componenets/GrubPageForm/GrubPageForm.jsx
import "./GrubPageForm.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postGrubsOneThunk, updateGrubsOneThunk } from "../../redux/grubs"
import DeleteGrubModal from '../DeleteGrubModal'


function GrubPageForm() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation();
    const { newGrub, exampleData } = location.state || {};

    const [showDeletetModal, setShowDeletetModal] = useState(false);
    const [selectedGrub, setSelectedGrub] = useState(null);

    const handleDeleteBtn = (e, grub) => {
        e.preventDefault();
        setSelectedGrub(exampleData);
        setShowDeletetModal(true)
    }

    const handleModalClose = () => {
        setShowDeletetModal(false)
        setSelectedGrub(null)
        nav(-1)
    };

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

    const [errors, setErrors] = useState({})
    const [clickedSubmitBtn, setClickedSubmitBtn] = useState(false);
    const hasError = () => (Object.keys(errors).length !== 0)

    const handleCancel = (e) => {
        e.preventDefault();
        nav(-1);  
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClickedSubmitBtn(true);

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
        const submit = async () => {
            try {
                const result = newGrub
                    ? await dispatch(updateGrubsOneThunk({ body }))
                    : await dispatch(postGrubsOneThunk({ body }))

                if (result) {
                    nav(`/grubs`);
                }
            } catch (error) {
                console.error('Error adding grub:', error);
            }
        }
        submit();
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        const newErrors = {};
        const allKeys = ["name", "servingUnit", "servingSize", "calories", "protein", "fats", "carbs", "sugar", "company", "description"];

        for (let key of allKeys) {
            if (!form[key]) {
                newErrors[key] = capitalizeFirstLetter(`${key} is required`);
            }
        }

        if (clickedSubmitBtn) {
            setErrors(newErrors)
        }
    }, [form, clickedSubmitBtn, showDeletetModal])


    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div>
            <h1>GrubForm.jsx</h1>
            <label>
                Name &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.name}</span>}
            </label>
            <input
                type="text"
                name="name"
                onChange={updateSetForm}
                placeholder="enter name"
                value={form.name || ""}
            />

            <br />
            <label>
                Serving Unit &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.servingUnit}</span>}
            </label>
            <input
                type="text"
                name="servingUnit"
                onChange={updateSetForm}
                placeholder="enter serving Unit"
                value={form.servingUnit || ""}
            />

            <br />
            <label>
                Serving Size &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.servingSize}</span>}
            </label>
            <input
                type="text"
                name="servingSize"
                onChange={updateSetForm}
                placeholder="enter serving size"
                value={form.servingSize || ""}
            />


            <br />
            <label>
                Calories &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.calories}</span>}
            </label>
            <input
                type="text"
                name="calories"
                onChange={updateSetForm}
                placeholder="enter calories"
                value={form.calories || ""}
            />

            <br />
            <label>
                Protein &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.protein}</span>}
            </label>
            <input
                type="text"
                name="protein"
                onChange={updateSetForm}
                placeholder="enter protein"
                value={form.protein || ""}
            />

            <br />
            <label>
                Fats &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.fats}</span>}
            </label>
            <input
                type="text"
                name="fats"
                onChange={updateSetForm}
                placeholder="enter fats"
                value={form.fats || ""}
            />

            <br />
            <label>
                Carbs &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.carbs}</span>}
            </label>
            <input
                type="text"
                name="carbs"
                onChange={updateSetForm}
                placeholder="enter carbs"
                value={form.carbs || ""}
            />

            <br />
            <label>
                Sugar &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.sugar}</span>}
            </label>
            <input
                type="text"
                name="sugar"
                onChange={updateSetForm}
                placeholder="enter sugar"
                value={form.sugar || ""}
            />

            <br />
            <label>
                Company &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.company}</span>}
            </label>
            <input
                type="text"
                name="company"
                onChange={updateSetForm}
                placeholder="enter company name"
                value={form.company || ""}
            />

            <br />
            <label>
                Description &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.description}</span>}
            </label>
            <input
                type="text"
                name="description"
                onChange={updateSetForm}
                placeholder="enter description"
                value={form.description || ""}
            />

            <br />
            <button
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
            </button>


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

// frontend/src/componenets/GrubPageForm/GrubPageForm.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./GrubPageForm.css";
import { postGrubsOneThunk } from "../../redux/grubs"


function GrubPageForm() {
    const nav = useNavigate();
    const dispatch = useDispatch();

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


        const { name, servingUnit, servingSize, calories, protein, fats } = form
        const { carbs, sugar, company, description } = form


        const body = {
            name,
            servingUnit,
            servingSize: parseInt(servingSize),
            calories: parseInt(calories),
            protein: parseInt(protein),
            fats: parseInt(protein),
            carbs: parseInt(protein),
            sugar: parseInt(protein),
            company,
            description,
            userId: 1,
        }

        console.log("++++ ======> handleSubmit.body ", body)

        const submit = async () => {
            try {
                const result = await dispatch(postGrubsOneThunk({ body }))
                // const result = true

                if (result) {
                    nav(`/grubs`);
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


        // const allKeys = ["name", "description"];
        const allKeys = ["name", "servingUnit", "servingSize", "calories", "protein", "fats", "carbs", "sugar", "company", "description"];

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
            <h1>GrubForm.jsx</h1>
            <br />
            <label>
                Name &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.name}</span>}
            </label>
            <input
                type="text"
                name="name"
                onChange={updateSetForm}
                placeholder="enter name"
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
            />

            <br />
            <label>
                Sugar &#160;&#160;{errors.start && <span style={{ color: 'red' }}>{errors.sugar}</span>}
            </label>
            <input
                type="text"
                name="srgar"
                onChange={updateSetForm}
                placeholder="enter sugar"
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
        </div>

    );
}

export default GrubPageForm;

// frontend/src/componenets/GrubPageForm/GrubPageForm.jsx
import "./GrubPageForm.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { postGrubsOneThunk, updateGrubsOneThunk, deleteGrubThunkById, getGrubsOneThunk } from "../../redux/grubs"
import { resetGrubImages, getGrubImagesForGrubThunk, updateGrubImagesOneThunk } from "../../redux/grubImages";
// import DeleteModal from "../+++DeleteModal/DeleteModal";
import DeleteModal from "../_modal/DeleteModal";
import { capitalizeFirstLetter, isEmpty } from '../_utils/MyFunctions'
import placeholderIMG from '../../fe_images/placeholder_image.jpg'
import downloadGIF from '../../fe_images/download.gif'
import GrubImageDisplay from "./GrubImageDisplay";


function GrubPageForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams();
    const grubId = parseInt(id);
    const { newGrub } = location.state || {};  // newGrub -> empty form

    const sessionUser = useSelector((state) => state.session.user);
    const grubObj = useSelector((state) => state.grubs.single)
    const grubImgArr = useSelector((state) => state.grubimages.currentgrub)

    const [imgUrl, setImgUrl] = useState("");   //image url to send to aws
    const [showUpload, setShowUpload] = useState(true); //  //show image?
    const [previewUrl, setPreviewUrl] = useState("");  //img url in react
    const [clickedGrubImgId, setClickedGrubImgId] = useState(0);  //object.id of clicked image


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
    })

    const initializeForm = useCallback(() => {
        if (!newGrub && grubObj) {
            setForm({
                name: grubObj?.name || "",
                description: grubObj?.description || "",
                servingUnit: grubObj?.servingUnit || '',
                servingSize: grubObj?.servingSize || '',
                calories: grubObj?.calories || '',
                protein: grubObj?.protein || '',
                fats: grubObj?.fats || '',
                carbs: grubObj?.carbs || '',
                sugar: grubObj?.sugar || '',
                company: grubObj?.company || '',
                userId: grubObj?.userId || sessionUser?.id || 1
            })
        }
    }, [newGrub, grubObj, sessionUser]);

    useEffect(() => {
        initializeForm();
    }, [initializeForm]);


    useEffect(() => {
        if (!newGrub && grubId) {
            dispatch(getGrubsOneThunk(grubId)).then((data) => {
                // Only get images if workout exists
                if (data) {
                    console.log("...data.id ==> ", data.id)
                    dispatch(getGrubImagesForGrubThunk(data.id));
                }
            });
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

        validateFields(minOneFields, (value) => value < 1, "minimum is 1");
        validateFields(minZeroFields, (value) => value < 0, "minimum is 0");

        setErrors(newErrors);
    }, [form])

    //AWS
    const handleImgClick = (id) => {
        // console.log("A - ...handleImgClick..id = ", id)
        setClickedGrubImgId(id)
    }

    const updatedImgFromPC = async (e) => {
        console.log("updatedImgFromPC")
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setPreviewUrl(reader.result)
        setImgUrl(file);
        setShowUpload(false);
    };

    const handleImgSubmit = async () => {
        console.log('handleImgSubmit')
        let temp = {
            grubId: clickedGrubImgId,
            name: "abc",
            url: imgUrl
        }
        await dispatch(updateGrubImagesOneThunk(temp))
        setClickedGrubImgId(0)
    }

    const handleReset = () => setForm(initializeForm());

    const updateSetForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

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

    const handleAddToLog = () => {
        if (!grubId) {
            alert('Grub needs to be saved before adding to DayLog');
        } else {
            //  !!!Fix navigation bug
            const temp = {
                newDayLog: true,
                newGrubObj: grubObj
            }
            navigate(`/daylogform/${grubId}`, { state: temp })
        }
    }

const handleModalClose = () => {
    setShowDeletetModal(false)
    navigate(-1)
};
// const handleBack = () => navigate(-1);
// const hasError = () => Object.keys(errors).length !== 0;

const handleBack = async () => {
    dispatch(resetGrubImages()); // Clear workout images
    navigate(-1);
};

return (
    <div className="mainBodyStyle">
        {/* <h1>GrubForm.jsx</h1>
            <h3 >Email = {sessionUser?.email}</h3> */}

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
                value={form?.name}
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
                    value={form?.servingSize}
                />
            </div>
            <div>
                <select
                    name="servingUnit"
                    className="_input"
                    onChange={updateSetForm}
                    value={form?.servingUnit}
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
                value={form?.calories || ""}
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
                        value={form?.protein || ""}
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
                        value={form?.fats || ""}
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
                        value={form?.carbs || ""}
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
                        value={form?.sugar || ""}
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
                value={form?.company || ""}
            />

            <label style={{ display: 'inline-flex' }}>
                Description
            </label>
            <textarea
                className="_textarea"
                name="description"
                onChange={updateSetForm}
                placeholder="enter description"
                value={form?.description || ""}
            />


        </div>
        <div className="max_HFlex">
            <div >
                <button
                    className="red _button"
                    type="button"
                    onClick={handleDeleteBtn}
                >
                    DELETE
                </button>
            </div>
            <button
                className="black _button white_font"
                type="button"
                onClick={handleAddToLog}
            //disabled={!isEmpty(errors)}
            >
                Add To Log
            </button>
        </div>

        <br />
        <br />
        <hr />
        <br />
        <br />

        <div className="abc123 vertical_center_flex">
            {/* <h1>Your GRUB Page Form</h1> */}
            <GrubImageDisplay
                grubImgArr={grubImgArr}
                downloadGIF={downloadGIF}
                placeholderIMG={placeholderIMG}
                handleImgClick={handleImgClick}
            />
        </div>


        <div className="vertical_center_flex">
            {(clickedGrubImgId > 0) && showUpload && (
                <label htmlFor='file-upload'> Select From Computer
                    <input
                        type='file'
                        id='file-upload'
                        name="img_url"
                        onChange={updatedImgFromPC}
                        accept='.jpg, .jpeg, .png, .gif'
                    />
                </label>
            )}
            <br /><br /><br /><br />
            {(clickedGrubImgId > 0) && !showUpload && (
                <div className="vertical_center_flex">
                    <img
                        src={previewUrl}
                        style={{ height: "300px", width: "300px" }}
                        alt="preview"
                        className="round"
                    />
                    <button
                        onClick={handleImgSubmit}
                    >Change Profile
                    </button>
                </div>
            )}
        </div>

        {/* DELETE MODAL */}
        {showDeleteModal && (
            <DeleteModal
                item={grubObj}
                itemType="grub"
                deleteThunk={deleteGrubThunkById}
                onClose={handleModalClose}
            />
        )}
    </div>
);
    }

export default GrubPageForm;
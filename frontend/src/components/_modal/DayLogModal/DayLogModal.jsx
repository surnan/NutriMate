//frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx

import './DayLogModal.css'
import { useNavigate } from 'react-router-dom';


// const DayLogModal = ({ _, onClose }) => {
const DayLogModal = ({onClose }) => {
    // console.log('_stuff  = ', _stuff)
    const nav = useNavigate()

    // const handleDeleteBtn = async () => {
    //     console.log("BUTTON PRESSED")
    //     onClose();
    // };

    const handleWorkoutsBtn = () => { nav("/workouts") }
    const handleGrubsBtn = () => { nav("/grubs") }

    return (
        <>
            <div className="modal_under_layer" onClick={onClose} />
            <div className="modal_window_all shadow">
                <h2 className='center'>Click to Add:</h2>
                <div className="daily_btn_font_size_grid">
                    <button
                        onClick={handleWorkoutsBtn}
                        className="round daily_btn_font_size shadow blue clickable"
                    >
                        <i className="fa-solid fa-person-running"></i>
                    </button>

                    <button
                        onClick={handleGrubsBtn}
                        className="round daily_btn_font_size shadow green clickable"
                    >
                        <i className="fa-solid fa-utensils"></i>
                    </button>

                    {
                        <button
                            onClick={onClose}
                            className="round daily_btn_font_size shadow red"
                        >
                            <i className="fas fa-trash-alt" />
                        </button>
                    }
                </div>
            </div>
        </>
    );
};

export default DayLogModal;

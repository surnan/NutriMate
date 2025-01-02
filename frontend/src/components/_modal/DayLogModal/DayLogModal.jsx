//frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx

import './DayLogModal.css'
import { useNavigate } from 'react-router-dom';


const DayLogModal = ({ onClose }) => {
    const nav = useNavigate()
    const handleWorkoutsBtn = () => { nav("/workouts") }
    const handleGrubsBtn = () => { nav("/grubs") }

    return (
        <>
            <div className="modal_under_layer" onClick={onClose} />
            <div className="modal_window_all shadow">
                <h2 className='center black_font'>Click to Add:</h2>
                <br />
                <div className="daily_btn_font_size_grid">

                    <div className="tooltip">
                        <button
                            onClick={handleWorkoutsBtn}
                            className="round daily_btn_font_size shadow blue clickable"
                        >
                            <i className="fa-solid fa-person-running"></i>
                        </button>
                        <span className="tooltiptext">Add Excercise</span>
                    </div>

                    <div className="tooltip">
                        <button
                            onClick={handleGrubsBtn}
                            className="round daily_btn_font_size shadow green clickable"
                        >
                            <i className="fa-solid fa-utensils"></i>
                        </button>
                        <span className="tooltiptext">Add Food</span>
                    </div>

                    {
                        <div className="tooltip">
                            <button
                                onClick={onClose}
                                className="round daily_btn_font_size shadow red"
                            >
                                <i className="fas fa-trash-alt" />
                            </button>
                            <span className="tooltiptext">Delete</span>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default DayLogModal;

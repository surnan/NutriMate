//frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx

import './DayLogModal.css'
import { useNavigate } from 'react-router-dom';


const DayLogModal = ({ _stuff, onClose }) => {
    // const dispatch = useDispatch();
    console.log('_stuff  = ', _stuff )
    const nav = useNavigate()

    const handleDeleteBtn = async () => {
        console.log("BUTTON PRESSED")
        onClose();
    };

    const handleWorkoutsBtn = () => { nav("/workouts") }
    const handleGrubsBtn = () => { nav("/grubs") }

    return (
        <div className="modal_under_layer">
            <div className="daily_extend_modal_window_all shadow">
                <h2 className='center'>Click to Add:</h2>
                <div className="daily_btn_font_size_grid">

                    <button
                        onClick={handleWorkoutsBtn}
                        className="round daily_btn_font_size shadow blue"
                    >
                        <i className="fa-solid fa-person-running"></i>
                    </button>

                    <button
                        onClick={handleGrubsBtn}
                        className="round daily_btn_font_size shadow green"
                    >
                        <i className="fa-solid fa-utensils"></i>
                    </button>

                    <button
                        onClick={handleDeleteBtn}
                        className="round daily_btn_font_size shadow red"
                    >
                        <i className="fas fa-trash-alt" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DayLogModal;

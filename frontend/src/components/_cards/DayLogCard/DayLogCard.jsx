// frontend/src/componenets/WorkouttCard/DayLogCard.jsx
import "./DayLogCard.css";

function DayLogCard({ daylog, handleClick }) {
    const { id, name, calories, grubId, workoutId } = daylog

    const colors = [
        "#FFCDD2", // Light Red
        "#F8BBD0", // Pink
        "#E1BEE7", // Purple
        "#D1C4E9", // Deep Purple
        "#C5CAE9", // Indigo
        "#BBDEFB", // Blue
        "#B3E5FC", // Light Blue
        "#B2EBF2", // Cyan
        "#B2DFDB", // Teal
        "#C8E6C9", // Green
        "#DCEDC8", // Light Green
        "#F0F4C3", // Lime
        "#FFF9C4", // Yellow
        "#FFECB3", // Amber
        "#FFE0B2", // Orange
        "#FFCCBC"  // Deep Orange
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className="dayLog_card_grid"
            //  "data-daycardid" must be all-lowercase
            data-daycardid={id}
            data-workoutid={workoutId}
            data-grubid={grubId}
            onClick={handleClick}
            style={{ backgroundColor: randomColor }}
        >
            <div className="dayLog_card_top">
                <p><strong>{name}</strong></p>
            </div>
            <div className="dayLog_card_bottom">
            <p>Calories: {calories}</p>
            </div>
        </div>
    );
}

export default DayLogCard;
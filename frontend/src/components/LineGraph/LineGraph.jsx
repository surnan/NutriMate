import "./LineGraph.css"
import {Line} from 'react-chartjs-2'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend 
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend 
)

const lineChartData = {
    labels: [ //x-axis
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    datasets: [//y-axis
        {
            label: "MINE", 
            data: [3000, 5000, 6000, 8000, 7000, 9000, 400], 
            borderColor: "green"
        },
        {
            label: "WIFE", 
            data: [5000, 3000, 8000, 1000, 4000, 5000, 4000], 
            borderColor: "rgb(75,192, 192)"
        }

    ]
}


const LineGraph = () => {
    const options = {
        responsive: false,          
        maintainAspectRatio: false 
    }

    return (
        <div>
            {/* Set width and height explicitly */}
            <Line options={options} data={lineChartData} width={1000} height={300} />
        </div>
    );
}

export default LineGraph;
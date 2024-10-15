import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeightsAllThunk } from "../../redux/weight";
import { Line } from 'react-chartjs-2';
import "./LineGraph.css"

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

const LineGraph = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const weightsArr = useSelector(state => state.weights.allWeights || []); // Default to empty array if no data

    // Prepare the data for the chart
    let weightLabels = [];
    let weightData = [];

    // Ensure weightsArr is an array and iterate through it
    if (Array.isArray(weightsArr)) {
        weightsArr.forEach(e => {
            // Format the 'day' as a readable date (assuming e.day is a valid date string)
            const formattedDay = new Date(e.day).toLocaleDateString(); // Adjust the date format as needed
            weightLabels.push(formattedDay);
            weightData.push(e.current); // Y-axis value (current weight)
        });
    }

    // Data object for the chart
    const lineChartData2 = {
        labels: weightLabels, // X-axis labels (formatted dates)
        datasets: [
            {
                label: "Current Weight", // Label for the dataset
                data: weightData,       // Y-axis values (current weights)
                borderColor: "blue",    // Line color
                fill: false             // No fill below the line
            }
        ]
    };

    useEffect(() => {
        dispatch(getWeightsAllThunk()); // Fetch weight data
    }, [dispatch]);

    const options = {
        responsive: true, // Set true to make it responsive
        maintainAspectRatio: false // Disable aspect ratio
    };

    return (
        <div style={{ width: '1000px', height: '400px' }}>
        {/* <div> */}
            <Line options={options} data={lineChartData2} />
        </div>
    );
}

export default LineGraph;
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
    const weightsArr = useSelector(state => state.weights.allWeights || []); 

    let weightLabels = [];
    let weightData = [];

    const filteredAndSortedArray = weightsArr
        .filter(weight => weight.userId === sessionUser.id)
        .sort((a, b) => {
            const dateA = new Date(a.day).getTime();
            const dateB = new Date(b.day).getTime();

            // Extreme dates break sort, so exceptions below:
            if (dateA < new Date('1900-01-01').getTime()) return 1;
            if (dateB < new Date('1900-01-01').getTime()) return -1;
            if (dateA > new Date('2100-01-01').getTime()) return 1;
            if (dateB > new Date('2100-01-01').getTime()) return -1;
            return dateA - dateB;
        }
    );


    if (Array.isArray(filteredAndSortedArray)) {
        filteredAndSortedArray.forEach(e => {
            const formattedDay = new Date(e.day).toLocaleDateString(); 
            weightLabels.push(formattedDay);    // X-Axis
            weightData.push(e.current);         // Y-Axis
        });
    }

    // Data object for the chart
    const lineChartData2 = {
        labels: weightLabels,           // X-axis [Weight.day]
        datasets: [
            {
                label: "Current Weight", 
                data: weightData,       // Y-axis [Weight.currentWeights]
                borderColor: "blue",    
                fill: false             
            }
        ]
    };

    useEffect(() => {
        dispatch(getWeightsAllThunk());
    }, [dispatch]);

    const options = {
        responsive: true,          
        maintainAspectRatio: false 
    };

    return (
        <div className="chart-container">
            <Line options={options} data={lineChartData2} />
        </div>
    );
}

export default LineGraph;
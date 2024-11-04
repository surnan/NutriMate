
import { Line } from 'react-chartjs-2';
import "./LineGraph.css"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
)

const LineGraph = ({weights}) => {
    let weightLabels = [];
    let weightData = [];

    if (Array.isArray(weights)) {
        weights.forEach(e => {
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

    const options = {
        responsive: true,          
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',  // Title for X-axis,
                    font: {
                        size: 16,  // Set the font size
                        weight: 'bold'  // Make the font bold
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Weight (lbs)',  // Title for Y-axis
                    font: {
                        size: 16,  // Set the font size
                        weight: 'bold'  // Make the font bold
                      }
                }
            }
        },
        plugins: {
            title: {
              display: true,
              text: 'Weight Chart',
              font: {
                size: 26,  // Set the font size
                weight: 'bold'  // Make the font bold
              }
            },
          },
    };


    return (
        <div className="chart_container">
            <Line options={options} data={lineChartData2} />
        </div>
    );
}

export default LineGraph;
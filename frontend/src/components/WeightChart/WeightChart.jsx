// frontend/src/components/WeightChart/WeightChart.jsx

import { useEffect, useRef } from "react";

const WeightChart = ({ weights }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 400;

    ctx.clearRect(0, 0, canvas.width, canvas.height)     // reset canvas


    const sortedWeights = [...weights].sort((a, b) => new Date(a.day) - new Date(b.day));
    const labels = sortedWeights.map(weight => new Date(weight.day).toLocaleDateString());
    const data = sortedWeights.map(weight => weight.value);

    const maxWeight = Math.max(...data) + 10; 
    const minWeight = Math.min(...data) - 10; 

    // Chart scaling
    const xInterval = canvas.width / (labels.length - 1);
    const yScale = (canvas.height - 40) / (maxWeight - minWeight);

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, canvas.height - 20); // Y axis
    ctx.lineTo(canvas.width - 20, canvas.height - 20); // X axis
    ctx.stroke();

    // Draw the line graph
    ctx.beginPath();
    sortedWeights.forEach((weight, index) => {
      const x = 40 + index * xInterval;
      const y = canvas.height - 20 - (weight.value - minWeight) * yScale;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = "#FF6347"; // Line color
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw points on the graph
    sortedWeights.forEach((weight, index) => {
      const x = 40 + index * xInterval;
      const y = canvas.height - 20 - (weight.value - minWeight) * yScale;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI); // Draw circle
      ctx.fillStyle = "#0000FF"; // Point color
      ctx.fill();
    });

  }, [weights]);

  return <canvas ref={canvasRef} />;
};

export default WeightChart;

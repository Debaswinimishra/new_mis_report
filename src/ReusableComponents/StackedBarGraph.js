import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const StackedBarGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.labels,
          datasets: data.datasets.map((dataset, index) => ({
            label: dataset.label,
            data: dataset.values,
            backgroundColor: dataset.backgroundColor || getRandomColor(),
            borderColor: dataset.borderColor || getRandomColor(),
            borderWidth: 1,
            maxBarThickness: 120,
          })),
        },
        options: {
          scales: {
            x: {
              stacked: true, // Enable stacked bars for the x-axis
            },
            y: {
              beginAtZero: true,
              stacked: true, // Enable stacked bars for the y-axis
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  // Function to generate random colors
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return <canvas ref={chartRef} />;
};

export default StackedBarGraph;

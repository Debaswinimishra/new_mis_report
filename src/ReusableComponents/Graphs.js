import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Graph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // To keep track of the Chart instance

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
          datasets: [
            {
              label: "No. of responses",
              data: data.values1,
              backgroundColor: "#0093AF",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              maxBarThickness: 120,
            },
            // {
            //   label: "Data 2",
            //   data: data.values2,
            //   backgroundColor: "rgba(255, 99, 132, 0.5)", // Another color
            //   borderColor: "rgba(255, 99, 132, 1)", // Another border color
            //   borderWidth: 1,
            // },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
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

  return <canvas ref={chartRef} />;
};

export default Graph;

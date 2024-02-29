import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Graph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Data",
              data: data.values,
              backgroundColor: "rgba(54, 162, 235, 0.5)", // Example color
              borderColor: "rgba(54, 162, 235, 1)", // Example border color
              borderWidth: 1,
            },
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
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default Graph;

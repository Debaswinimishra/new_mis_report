import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";

const BarGraph = ({ uniqueUsers, smartphone }) => {
  console.log("uniqueUsers", uniqueUsers, smartphone);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartContext = chartRef.current.getContext("2d");

      // Destroy existing chart if it exists
      if (window.myBarChart instanceof Chart) {
        window.myBarChart.destroy();
      }

      // Array of month names
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Map month numbers to month names
      const months =
        uniqueUsers.length > 0
          ? uniqueUsers.map((user) => monthNames[user.month - 1])
          : [];

      // Extracting data for smartphone and non-smartphone
      const uniqueBoys =
        uniqueUsers.length > 0
          ? uniqueUsers.map((user) => user.uniqueBoys)
          : [];
      const uniqueGirls =
        uniqueUsers.length > 0
          ? uniqueUsers.map((user) => user.uniqueGirls)
          : [];

      // Create new stacked bar chart instance
      const chartInstance = new Chart(chartContext, {
        type: "bar",
        data: {
          labels: months, // Use formatted month names as labels
          datasets:
            smartphone === "overall"
              ? [
                  {
                    label: "Boys",
                    data: uniqueBoys,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    barThickness: 80,
                  },
                  {
                    label: "Girls",
                    data: uniqueGirls,
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    barThickness: 80,
                  },
                ]
              : smartphone === "smartPhone"
              ? [
                  {
                    label: "Boys",
                    data: uniqueBoys,
                    backgroundColor: "rgba(54, 162, 235, 0.6)", // New color for boys
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2,
                    barThickness: 80,
                  },
                  {
                    label: "Girls",
                    data: uniqueGirls,
                    backgroundColor: "rgba(255, 99, 132, 0.7)", // New color for girls
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    barThickness: 80,
                  },
                ]
              : [
                  {
                    label: "Boys",
                    data: uniqueBoys,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2,
                    barThickness: 80,
                  },
                  {
                    label: "Girls",
                    data: uniqueGirls,
                    backgroundColor: "rgba(255, 159, 64, 0.6)",
                    borderColor: "rgba(255, 159, 64, 1)",
                    borderWidth: 2,
                    barThickness: 80,
                  },
                ],
        },
        options: {
          layout: {
            padding: {
              top: 20,
              bottom: 40,
              left: 20,
              right: 5,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              stacked: true, // Enable stacking for the y-axis
            },
            x: {
              stacked: true, // Enable stacking for the x-axis
            },
          },
        },
      });

      // Store chart instance in window object for Bar Graph
      window.myBarChart = chartInstance;
    }
  }, [uniqueUsers, smartphone]); // Add uniqueUsers and smartphone to the dependency array

  return <canvas ref={chartRef} />;
};

export default BarGraph;

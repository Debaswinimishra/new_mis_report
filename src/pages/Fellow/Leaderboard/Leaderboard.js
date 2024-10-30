import React, { useEffect, useState } from "react";
import { getLeaderboardReport } from "./api"; // Adjust the path if needed

const Leaderboard = () => {
  const [data, setData] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardData = await getLeaderboardReport(year);
        setData(leaderboardData);
      } catch (error) {
        console.error("Failed to fetch leaderboard data");
      }
    };
    fetchData();
  }, [year]);

  return (
    <div>
      <h1>Leaderboard for {year}</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre> // Display raw data temporarily
      ) : (
        <p>Loading leaderboard data...</p>
      )}
    </div>
  );
};

export default Leaderboard;

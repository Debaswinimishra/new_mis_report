import Api from "../../../Environment/Api";

export const getLeaderboardReport = async (year, month) => {
  try {
    const response = await Api.get(`/getLeaderboardReport/${year}/${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    throw error;
  }
};

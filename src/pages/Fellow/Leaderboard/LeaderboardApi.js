import Api from "../../../Environment/Api";

export const getLeaderboardReport = async (year) => {
  try {
    const response = await Api.get(`/getLeaderboardReport`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    throw error;
  }
};

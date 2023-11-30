import Api from "../../../Environment/Api";

export const TimespentDetailsApi = async (body) => {
  try {
    let response = await Api.post("getDetailedTimeSpentReport", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

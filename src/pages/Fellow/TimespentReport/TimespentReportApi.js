import Api from "../../../Environment/Api";

export const TimespentReportApi = async (body) => {
  try {
    let response = await Api.post("getOverallTimeSpentReport", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

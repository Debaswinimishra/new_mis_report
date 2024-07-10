import Api from "../../../Environment/Api";

export const TimespentReportApi = async (body) => {
  try {
    let response = await Api.post("getOverallTimeSpentReport", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTimeSpentReportOverall = async (body) => {
  try {
    let response = await Api.post("getTimeSpentReportOverall", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

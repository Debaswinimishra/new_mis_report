import PrakashakAPI from "../../../Environment/PrakashakAPI";

export const getAllAnganwadiReports = async (body) => {
  return await PrakashakAPI.post(`getAnganwadiWise/static`, body);
};

export const getAllAnganwadiPerformanceReports = async (body) => {
  return await PrakashakAPI.post(`getAnganwadiWisePerformance/static`, body);
};

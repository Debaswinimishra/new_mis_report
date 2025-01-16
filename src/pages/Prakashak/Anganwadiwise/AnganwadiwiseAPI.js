import PrakashakAPI from "../../../Environment/PrakashakAPI";

const getAllAnganwadiReports = async (data) => {
  return await PrakashakAPI.get(`getAllAnganwadiData/static`);
};

const getAllAnganwadiPerformanceReports = async (data) => {
  return await PrakashakAPI.get(`getAllAnganwadiPerformanceReports/static`);
};

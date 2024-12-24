import PrakashakAPI from "../../../Environment/PrakashakAPI";

export const getAllDashboardData = async (district) => {
  return await PrakashakAPI.get("getOverallDetails/" + district);
};

//*----------For top and low clusters and schools------------
export const getPerformance = async (body) => {
  const { district, year, month, prefKey } = body;
  return await PrakashakAPI.get(
    `getPerformance/${district}/${prefKey}/${year}/${month}`
  );
};

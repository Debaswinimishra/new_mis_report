import PrakashakAPI from "../../../Environment/PrakashakAPI";

export const getAllDashboardData = async (district) => {
  return await PrakashakAPI.get("getOverallDetails/" + district);
};

export const getAllTopPerformersClusters = async (data) => {
  const { district, year, month } = data;
  return await PrakashakAPI.get(
    `getTopPerformance/${district}/top_clusters/${year}/${month}`
  );
};

export const getAllTopPerformersSchools = async (data) => {
  const { district, year, month } = data;
  return await PrakashakAPI.get(
    `getTopPerformance/${district}/top_schools/${year}/${month}`
  );
};

export const getLowPerformersSchools = async (data) => {
  const { district, year, month } = data;
  return await PrakashakAPI.get(
    `getLowPerformance/${district}/low_schools/${year}/${month}`
  );
};

export const getLowPerformersClusters = async (data) => {
  const { district, year, month } = data;
  return await PrakashakAPI.get(
    `getLowPerformance/${district}/low_clusters/${year}/${month}`
  );
};

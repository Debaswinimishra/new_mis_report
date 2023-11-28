import Api from "../../../Environment/Api";

//^-----------------Manager names and respective passcodes---------------------
export const getAllManagersWidPasscodes = async () => {
  return await Api.get(`getManagerIdsWidPasscode`);
};

//&----------------Feedback survey names from api-------------------------------
export const getSurveyDetails = async () => {
  return await Api.get(`getAllTchSurveysForReport`);
};

//~---------------Filtered data for the feedbacks -----------------------------------
export const getAllFeedbackData = async (data) => {
  return await Api.post(`getTchSurveyReport`, data);
};

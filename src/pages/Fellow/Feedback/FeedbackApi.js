import Api from "../../../Environment/Api";

//^-----------------Manager names and respective passcodes---------------------
export const getAllManagersWidPasscodes = async () => {
  return await Api.get(`getManagerIdsWidPasscode`);
};

//&----------------Feedback survey names from api-------------------------------
export const getSurveyDetails = async () => {
  return await Api.get(`getManagerIdsWidPasscode`);
};

//~---------------Filtered data for the feedbacks -----------------------------------
export const getAllFeedbackData = async () => {
  return await Api.get(`getManagerIdsWidPasscode`);
};

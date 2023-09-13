import Api from "../../environment/Api";

export const getAllTeacherTrainingDetails = async (data) =>
  await Api.get(
    `getTchTrainingReport/${data.year}/${data.managerid}/${data.passcode}/${data.trainingType}/${data.reportType}`
  );
//   /getTchTrainingReport/:year/:managerid/:passcode/:trainingType/:reportType

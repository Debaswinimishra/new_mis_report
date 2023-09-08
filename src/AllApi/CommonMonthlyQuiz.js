import Api from "../environment/Api";

export const getAllTopic = async () =>
  await Api.get(`getMasterTtlQuizTopics/fellow/teacher/od`);

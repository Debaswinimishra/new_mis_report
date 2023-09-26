import Api from "../../../environment/Api";

// topic
export const getAllTopic = async () =>
  await Api.get(`getMasterTtlQuizTopics/fellow/teacher/od`);

//question
export const getTtlQuizQuestions = async (params) =>
  await Api.get(`getTtlQuizQuestions/${params.topicid}`);

// data
export const getAllTopicDetails = async (params) =>
  await Api.get(
    `getTtlQuizReportUserWise/${params.year}/${params.managerid}/${params.passcode}/${params.topicid}`
  );

export const getTtlQuizReportUserWise = async (params) =>
  await Api.get(
    `getTtlQuizReportUserWise/${params.year}/${params.managerid}/${params.passcode}/${params.topicid}/${params.questionId}`
  );

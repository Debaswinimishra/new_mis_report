// import Api from "../../Environment/Api";
import Api from "../../../Environment/Api";
// import Api from "../../../environment/Api";

export const getAllTopic = async () =>
  await Api.get(`getMasterTtlQuizTopics/fellow/teacher/od`);

export const getAllTopicDetails = async (params) =>
  await Api.get(
    `getTtlQuizReportUserWise/${params.year}/${params.managerid}/${params.passcode}/${params.topicid}`
  );

export const getTtlQuizReportUserWise = async (params) =>
  await Api.get(
    `getTtlQuizReportUserWise/${params.year}/${params.managerid}/${params.passcode}/${params.topicid}/${params.questionId}`
  );

  export const getTtlQuizQuestions = async (params) =>
  await Api.get(
    `getTtlQuizQuestions/${params.topicid}`
  );

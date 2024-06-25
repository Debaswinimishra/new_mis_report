import Api from "../../../Environment/Api";

export const getOnlineRequestedReport = async (body) => {
  try {
    let response = await Api.post("getOnlineRequestedReport", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

import Api from "../../../Environment/Api";

export const studentProgressApi = async (body) => {
  try {
    let response = await Api.post("getStudProgressReport", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

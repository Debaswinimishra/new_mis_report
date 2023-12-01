import Api from "../../../Environment/Api";

export const FellowDetailsForManager = async (body) => {
  try {
    let response = await Api.post("gettchtrainingdetails", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

import Api from "../../../Environment/Api";

export const FellowDetailsForManager = async (body) => {
  try {
    let response = await Api.post("getDashboardReport", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

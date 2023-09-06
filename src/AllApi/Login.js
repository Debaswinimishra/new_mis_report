import Api from "../environment/Api";

export const getAuthenticateUser = async (body, config) =>
  await Api.post(`authenticateuser`, body, config);

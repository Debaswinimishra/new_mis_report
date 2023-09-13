import Api from "../Environment/Api";

export const getAuthenticateUser = async (body, config) =>
  await Api.post(`authenticateuser`, body, config);

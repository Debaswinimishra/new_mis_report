import Api from "../../Environment/Api";

// export const getAuthenticateUser = async (body, config) =>
//   await Api.post(`authenticateuser`, body, config);

export const getAuthenticateUser = async (userId, password) =>
  await Api.get(`authUserCred/${userId}/${password}`);

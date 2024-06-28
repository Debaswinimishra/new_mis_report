import Api from "../../../Environment/Api";

export const getManagerWidPasscodes = async (year) => {
  return await Api.get(`getManagerIdsWidPasscode/${year}`);
};

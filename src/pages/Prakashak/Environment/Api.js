import axios from "axios";
export const baseURL = "https://tatvagyan.co.in/prakashak/";
// export const baseURL = "https://tatvagyan.in/prakashak";

export const Version = {
  version: "1.2.3",
};
export default axios.create({
  baseURL,
});

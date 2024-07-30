import axios from "axios";
const baseURL = "https://thinkzone.in.net/thinkzone"; //Test
// const baseURL = "https://thinkzone.co/thinkzone"; //Prod

export const Version = {
  version: "1.2.9",
};
export default axios.create({
  baseURL,
});

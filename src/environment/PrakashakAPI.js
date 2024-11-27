import axios from "axios";
export const baseURL = "https://tatvagyan.co.in/prakashak/";
// export const baseURL = "https://tatvagyan.in/prakashak";

export const Version = {
  version: "1.4.3",
};

export const networkStatus =
  baseURL === "https://tatvagyan.in/prakashak" ? "Test 🟠" : "Production 🟢";
export default axios.create({
  baseURL,
});

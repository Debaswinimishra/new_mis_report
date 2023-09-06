import axios from "axios";

// export default axios.create({
//   baseURL: "https://thinkzone.in.net/thinkzone/", //New Tests
//   // baseURL: 'https://thinkzone.co/thinkzone/', // Production New
// });
const baseURL = "https://thinkzone.in.net/thinkzone";
// const baseURL = "https://thinkzone.co/thinkzone";

export const Version = {
  version: "1.3.7",
};

//Axios create baseUrls for changing different servers
export default axios.create({
  baseURL,
});

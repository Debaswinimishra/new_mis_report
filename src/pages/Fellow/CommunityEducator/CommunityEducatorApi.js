// import Api from "../environment/Api";
// import Api from "../../Environment/Api";
import Api from "../../../Environment/Api";

export const getAllCommunityEducatiorFilter = async () =>
  await Api.get(`getManagerIdsWidPasscode`);

// useEffect(() => {
//   Api.get(`getManagerIdsWidPasscode`).then((response) => {
//     setManagerArr(response.data.resData);
//   });
// }, []);

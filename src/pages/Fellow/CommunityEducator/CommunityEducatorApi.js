import Api from "../../../Environment/Api";

export const getAllCommunityEducatiorFilter = async (year) =>
  await Api.get(`getManagerIdsWidPasscode/${year}`);

export const getAllDistricts = async () =>
  await Api.get(`getdistrictsofstate/20`);

export const getDistrictsWiseBlocks = async (blockId) =>
  await Api.get(`getblocksofdistricts/20/${blockId}`);

export const getCommunityEducator1 = async (body) =>
  await Api.post(`getDashboardCounts/`, body);

export const getCommunityEducator2 = async (body) =>
  await Api.post(`getDashboardCounts/`, body);

// useEffect(() => {
//   Api.get(`getManagerIdsWidPasscode`).then((response) => {
//     setManagerArr(response.data.resData);
//   });
// }, []);

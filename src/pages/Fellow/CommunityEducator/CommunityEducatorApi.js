import Api from "../../../Environment/Api";

export const getAllCommunityEducatiorFilter = async () =>
  await Api.get(`getManagerIdsWidPasscode`);

export const getAllDistricts = async () =>
  await Api.get(`getdistrictsofstate/20`);

export const getDistrictsWiseBlocks = async (blockId) =>
  await Api.get(`getblocksofdistricts/20/${blockId}`);

export const getCommunityEducator1 = async (year, managerid, passcode) =>
  await Api.get(`getDashboardCounts/${year}/${managerid}/${passcode}`);

export const getCommunityEducator2 = async (
  year,
  managerid,
  passcode,
  districtid,
  blockid
) =>
  await Api.get(
    `getDashboardCounts/${year}/${managerid}/${passcode}/${districtid}/${blockid}`
  );

// useEffect(() => {
//   Api.get(`getManagerIdsWidPasscode`).then((response) => {
//     setManagerArr(response.data.resData);
//   });
// }, []);
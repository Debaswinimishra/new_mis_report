import Api from "../../../Environment/Api";

export const AmazonVouchersRedeemedThunk = async (data) => {
  return await Api.get(`/getRewardCouponsReport/${data.month}/${data.year}`);
};

import AxiosUtil from "ApiFarm/index";

export const HomeYearApi = async () => {
  const response = await AxiosUtil.get("/store/dashboard/year");
  return response.data.data;
};
export const HomeWeekApi = async () => {
  const response = await AxiosUtil.get("/store/dashboard/week");
  return response.data.data;
};
export const HomeYesterdayApi = async () => {
  const response = await AxiosUtil.get("/store/dashboard/yesterday");
  return response.data.data;
};
export const HomeTimeApi = async () => {
  const response = await AxiosUtil.get("/store/dashboard/yesterday/time");
  return response.data.data;
};

import AxiosUtil from "ApiFarm/index";

export const getStoreSwitchStoerListApi = async () => {
  const response = await AxiosUtil.get(`/store/switch/store/list`);
  return response.data.data;
};

export const getStoreSwitchStoreInfoApi = async (mus_idx: number) => {
  const response = await AxiosUtil.get(`/store/switch/${mus_idx}`);
  return response.data.data;
};

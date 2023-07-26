import AxiosUtil from "..";

export interface iStoreSwitchStoreListItem {
  mus_idx: number;
  store_idx: number;
  store_name: string;
}

export const getStoreSwitchStoerListApi = async () => {
  const result = await AxiosUtil.get<
    IResponse<{
      selected_store_idx: number;
      selected_store_name: string;
      store_list: iStoreSwitchStoreListItem[];
    }>
  >("/fc/v2/store/switch/list");
  return result.data.data;
};

export interface iStoreSwitchStoreInfo {
  store_id: number;
  store_name: string;
  store_token: string;
}

export const changeStore = async (mus_idx: number) => {
  const response = await AxiosUtil.put<
    IResponse<{
      selected_store_idx: number;
      selected_store_name: string;
    }>
  >(`/fc/v2/store/switch/${mus_idx}`);

  return response.data.data;
};

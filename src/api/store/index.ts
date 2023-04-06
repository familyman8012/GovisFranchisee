import AxiosUtil, { AxiosUtilResponse } from "..";

export interface iStoreSwitchStoreListItem {
  mus_idx: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  store_id: number;
  store_name: string;
}

export const getStoreSwitchStoerListApi = async () => {
  const result = await AxiosUtil.get("store/switch/store/list");
  return result.data;
};

// export const getStoreSwitchStoerListApi = async (): Promise<iStoreSwitchStoreListItem[]> => {
//   const url = "store/switch/store/list";

//   const response = await AxiosUtil.get<AxiosUtilResponse<any>>(url);

//   console.log("response response", response);

//   const { store_list } = response.data.data;

//   return store_list;
// };

export interface iStoreSwitchStoreInfo {
  store_id: number;
  store_name: string;
  store_token: string;
}

export const getStoreSwitchStoreInfoApi = async (mus_idx: number): Promise<iStoreSwitchStoreInfo> => {
  const url = `store/switch/${mus_idx}`;
  const response = await AxiosUtil.get<AxiosUtilResponse<any>>(url);

  const storeInfo = response.data.data;

  return storeInfo;
};

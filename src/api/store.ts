import { Store, StoreTransferInterface } from "InterfaceFarm/store";
import AxiosUtil, { BoRequest } from "./index";

export interface iStoreSwitchStoreListItem {
  mus_idx: number;
  store_idx: number;
  store_name: string;
}

export const fetchSwitchStores = async () => {
  const result = await AxiosUtil.get<
    IResponse<{
      selected_store_idx: number;
      selected_store_name: string;
      store_list: iStoreSwitchStoreListItem[];
    }>
  >("/fc/v2/store/switch/list");
  return result.data.data;
};

export const changeStore = async (mus_idx: number) => {
  const response = await AxiosUtil.put<
    IResponse<{
      selected_store_idx: number;
      selected_store_name: string;
    }>
  >(`/fc/v2/store/switch/${mus_idx}`);

  return response.data.data;
};

export const fetchGetOpenStoreAll = async () => {
  const answer = await BoRequest.get("/stores");
  return answer.data.data;
};

export const fetchFindAllStore = async (params = {}) => {
  const response = await BoRequest.get("/stores", {
    params,
  });

  return response.data.data;
};

export const fetchGetCloseSTOREALL = async () => {
  const answer = await BoRequest.get(`${"/stores"}?status=CLOSED`);
  return answer.data.data;
};

export const fetchPostCreateStore = async (store: Store): Promise<number> => {
  const answer = await BoRequest.post("/stores", store);
  return answer.data.status;
};

export const fetchCloseStore = async (storeId: number) => {
  const answer = await BoRequest.put(`${"/stores"}/${storeId}`);
  return answer.data.status;
};

export const fetchDeleteStore = async (storeId: number) => {
  const answer = await BoRequest.delete(`${"/stores"}/${storeId}`);
  return answer.data.status;
};

export const fetchUpdateStore = async (store: StoreTransferInterface) => {
  const answer = await BoRequest.patch(`${"/stores"}/${store.id}`, store);
  return answer.data.status;
};

export const fetchUser = async (id: number) => {
  const result = await BoRequest.get(`/user/${id}`);

  return result.data.data;
};

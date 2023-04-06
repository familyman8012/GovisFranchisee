export interface IStoreSwitchStoreListItem {
  mus_idx: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  store_id: number;
  store_name: string;
}

export interface IStoreSwitchStoreInfo {
  store_id: number;
  store_name: string;
  store_token: string;
}

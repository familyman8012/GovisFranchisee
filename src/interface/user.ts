export interface IGetStoreList {
  store_id?: number;
  store_name?: string;
}

export interface IGetRankList {
  rank_id?: number;
  rank_name?: string;
}

export interface IUpdateUserInfo {
  user_id: number;
  name: string;
  store_id: number;
  entered_date: string;
  leaved_date: string;
  security_level: number;
  is_active: number;
  rank_id: number;
  birth: string;
  phone: string;
  address: string;
}

export interface IAddUserInfo {
  name: string;
  store_id: number;
  email: string;
  password: string;
  entered_date: string;
  is_active: number;
  security_level: number;
  rank_id: number;
  birth: string;
  phone: string;
  address: string;
}

export interface IUpdateUserPassword {
  user_id: number;
  password: string;
}

export interface IUserStore {
  id: number;
  name: string;
}

export interface IUserFetchParams {
  is_staff?: string;
  is_active?: string;
  perm_group_info_idx?: string;
}

export interface IUserCreateParams {
  name: string;
  email: string;
  password: string;
  is_staff: number;
  store_id_list?: string;
  entered_date?: string;
  leaved_date?: string;
  is_active: number;
  security_level: number;
  rank_id?: number;
  birth?: string;
  phone?: string;
  address?: string;
  perm_group_info_idx: number;
}

export interface IUserUpdateParams extends Omit<IUserCreateParams, 'password'> {
  user_id: number;
}

export interface IUserPatchApproveParams {
  user_id: number;
  is_permit: number;
}

export interface IUserPatchApproveResponse extends IUserPatchApproveParams {}

export interface IUser {
  user_id: number;
  name: string;
  email: string;
  is_staff: number;
  is_active: number;
  store_list?: IUserStore[];
  entered_date?: string;
  leaved_date?: string;
  security_level: number;
  rank_id?: number;
  birth?: string;
  phone?: string;
  address?: string;
  perm_group_info_idx: number;
}

export interface IUserListItem {
  user_id: number;
  name: string;
  email: string;
  entered_date: string;
  perm_group_info_idx?: number;
  perm_group_name?: string;
  is_staff: number;
  is_active: number;
  is_permit: number;
}

export interface IUserFindAll {
  count: number;
  list: IUserListItem[];
}

export interface IUserPatch {
  user_id: number;
}

export interface IUserRank {
  id: number;
  name: string;
}

export interface IUserPermission {
  perm_info_idx: number;
  perm_info_name: string;
  perm_code: string;
}

export interface IStoreUser {
  user_id: number;
  user_name: string;
  user_email: string;
  is_active: number;
  user_phone: string;
}

export interface IStoreUserFetchResponse {
  list: IStoreUser[];
}

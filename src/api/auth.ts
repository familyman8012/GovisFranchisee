import AxiosUtil from ".";
import {
  ILoginResponse,
  ILoginParams,
  ILoginUserResponse,
} from "InterfaceFarm/auth";

export const login = async (params: ILoginParams) => {
  const response = await AxiosUtil.post<IResponse<ILoginResponse>>(
    `/com/v2/account/login/fc`,
    params
  );

  return response.data.data;
};

export const fetchMyInfo = async (token: string) => {
  const response = await AxiosUtil.get<IResponse<ILoginUserResponse>>(
    `/com/v2/account/auth_user_info`,
    {
      headers: {
        "GO-AUTH": token,
      },
    }
  );

  return response.data.data;
};

export const fetchMyStore = async () => {
  const response = await AxiosUtil.get<IResponse<ILoginUserResponse>>(
    `/com/v2/account/auth_user_info`
  );

  const { selected_store_idx, selected_store_name } = response.data.data;

  return {
    selected_store_idx,
    selected_store_name,
  };
};

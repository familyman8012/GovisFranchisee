import { IMaterialReq } from "InterfaceFarm/material";
import { CommonRequest, FcV2Request } from ".";
import { IMenuListItem } from "InterfaceFarm/menu";

export const fetchCommonMaterialList = async (params?: IMaterialReq) => {
  const response = await CommonRequest.get("/material/info/list", {
    params,
  });

  return response.data.data;
};

export const fetchCommonMenuList = async (params: any) => {
  const response = await CommonRequest.get<
    IResponse<{
      info: any;
      total_count: number;
      list: IMenuListItem[];
    }>
  >("/menu/info/list", { params });
  return response.data.data;
};

export const fetchCommonAisttStoreInfo = async () => {
  return FcV2Request.get<
    IResponse<{
      store_idx: number;
      store_name: string;
      is_use_stt: number;
    }>
  >("/store/info").then((res) => res.data.data);
};

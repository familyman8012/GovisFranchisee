import AxiosUtil from "./index";

import {
  iCategoryRequest,
  iCategoryResponse,
  iFQSDashboardRequest,
  iFQSDashboardResponse,
  iFQSDetail,
  iFQSListRequest,
  iFQSListResponse,
  iFQSDashboardPizza,
} from "InterfaceFarm/Fqs";

export const FQSDashboardPizzaApi = async (params: iFQSDashboardRequest) => {
  let paramArr = [];
  for (let [key, row] of Object.entries(params)) {
    paramArr.push(`${key}=${row}`);
  }
  const url = `/fc/v1/store/fqs/dashboard/pizza?${paramArr.join("&")}`;
  const responseData = await AxiosUtil.get<
    IResponse<iFQSDashboardResponse<iFQSDashboardPizza>>
  >(url);
  return responseData.data.data;
};

export const fetchFQSList = async (params: iFQSListRequest) => {
  return AxiosUtil.get<IResponse<iFQSListResponse>>("/fc/v1/store/fqs/list", {
    params,
  }).then((res) => res.data.data);
};

export const fetchFQSDetail = async (quality_info_idx: number) => {
  return AxiosUtil.get<IResponse<iFQSDetail>>(
    `/fc/v1/store/fqs/detail/${quality_info_idx}`
  ).then((res) => res.data.data);
};

export const fetchFQSCategories = async (
  params: iCategoryRequest
): Promise<iCategoryResponse> => {
  return AxiosUtil.get<IResponse<iCategoryResponse>>(
    `/bo/v1/category/detail/${params.category_group_idx}`
  ).then((res) => res.data.data);
};

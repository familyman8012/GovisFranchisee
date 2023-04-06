import AxiosUtil from "ApiFarm/index";

import { iCategoryRequest, iFQSDashboardRequest, iFQSListRequest } from "InterfaceFarm/FoodQualitySytem";

export const FQSDashboardPizzaApi = async (params: iFQSDashboardRequest) => {
  const response = await AxiosUtil.get(`/store/fqs/dashboard/pizza`, {
    params,
  });

  return response.data.data;
};

export const FQSDashboardStatusDateApi = async (params: iFQSDashboardRequest) => {
  const response = await AxiosUtil.get(`/store/fqs/dashboard/status/date`, {
    params,
  });

  return response.data.data;
};

export const FQSListApi = async (params: iFQSListRequest) => {
  const response = await AxiosUtil.get(`/store/fqs/list`, {
    params,
  });

  return response.data.data;
};

export const FQSDetail = async (quality_info_idx: number) => {
  const response = await AxiosUtil.get(`/store/fqs/detail/${quality_info_idx}`);
  return response.data.data;
};

export const FQSCategoryPizza = async (data: iCategoryRequest) => {
  const response = await AxiosUtil.get(`/category/detail/${data.category_group_idx}`);
  return response.data.data;
};

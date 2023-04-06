import ApiRequest, { AxiosUtilResponse } from "./index";
import {
  IProductListFetchParams,
  IProductListFetchResponse,
  IProductResultFetchParams,
  IProductResultFetchResponse,
} from "InterfaceFarm/Product";

export const fetchProductSaleResult = async (params: IProductResultFetchParams) => {
  const response = await ApiRequest.get<AxiosUtilResponse<IProductResultFetchResponse>>(
    "/fc/v1/product_performance/chart",
    {
      params,
    }
  );

  return response.data.data;
};

export const fetchProductSaleList = async (params: IProductListFetchParams) => {
  const response = await ApiRequest.get<AxiosUtilResponse<IProductListFetchResponse>>(
    "/fc/v1/product_performance/data",
    {
      params,
    }
  );

  return response.data.data;
};

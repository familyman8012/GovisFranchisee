import ApiRequest from "./index";
import {
  IPizzaListFetchParams,
  IPizzaListFetchResponse,
  IPizzaResultFetchParams,
  IPizzaResultFetchResponse,
  IProductListFetchParams,
  IProductListFetchResponse,
  IProductResultFetchParams,
  IProductResultFetchResponse,
} from "InterfaceFarm/Product";

// 제품 실적 (v1) -> 2023.01.15 v2 로 변경 (카테고리 -> 피자)
export const fetchProductSaleResult = async (
  params: IProductResultFetchParams
) => {
  const response = await ApiRequest.get<IResponse<IProductResultFetchResponse>>(
    "/fc/v1/product_performance/chart",
    {
      params,
    }
  );

  return response.data.data;
};

// 2023.01.15 피자 제품 실적 - 차트
export const fetchPizzaSaleResult = async (params: IPizzaResultFetchParams) => {
  const response = await ApiRequest.get<IResponse<IPizzaResultFetchResponse>>(
    "/fc/v2/product_performance/chart",
    {
      params,
    }
  );

  return response.data.data;
};

// 제품 실적 (v1) -> 2023.01.15 v2 로 변경 (카테고리 -> 피자)
export const fetchProductSaleList = async (params: IProductListFetchParams) => {
  const response = await ApiRequest.get<IResponse<IProductListFetchResponse>>(
    "/fc/v1/product_performance/data",
    {
      params,
    }
  );

  return response.data.data;
};

// 2023.01.15 피자 제품 실적 - 차트
export const fetchPizzaSaleList = async (params: IPizzaListFetchParams) => {
  const response = await ApiRequest.get<IResponse<IPizzaListFetchResponse>>(
    "/fc/v2/product_performance/data",
    {
      params,
    }
  );

  return response.data.data;
};

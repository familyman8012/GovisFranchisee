import AxiosUtil from "ApiFarm/index";
import { ISalesRequestDateRange } from "InterfaceFarm/Sale";

export const fetchSalesList = async (params: ISalesRequestDateRange) => {
  const response = await AxiosUtil.get(`/store/sales`, {
    params,
  });

  return response.data.data;
};

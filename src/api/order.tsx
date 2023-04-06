import AxiosUtil from "ApiFarm/index";
import { IOrdersRequestDateRange } from "InterfaceFarm/Order";

export const fetchOrderList = async (params: IOrdersRequestDateRange) => {
  const response = await AxiosUtil.get(`/store/orders`, {
    params,
  });

  return response.data.data;
};

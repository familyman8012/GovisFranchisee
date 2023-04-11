import AxiosUtil from ".";

export const fetchOrderAmount = async (params?: string) => {
  const response = await AxiosUtil.get(
    `/fc/v1/realtime_order/order_total_amount`
  );

  return response.data;
};

export const fetchOrderProcess = async (params?: string) => {
  const response = await AxiosUtil.get(
    `/fc/v1/realtime_order/order_processed_chart`
  );

  return response.data;
};

export const fetchOrderList = async (params?: string) => {
  const response = await AxiosUtil.get(
    `/fc/v1/realtime_order/order_processing_list`
  );

  return response.data;
};

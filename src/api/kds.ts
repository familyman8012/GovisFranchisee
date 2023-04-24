import AxiosUtil from ".";

export const fetchIsKds = async () => {
  const response = await AxiosUtil.get(`/fc/v1/store/is_kds`);

  return response.data;
};

export const fetchOrderAmount = async () => {
  const response = await AxiosUtil.get(
    `/fc/v1/realtime_order/order_total_amount`
  );

  return response.data;
};

export const fetchOrderProcess = async () => {
  const response = await AxiosUtil.get(
    `/fc/v1/realtime_order/order_processed_chart`
  );

  return response.data;
};

export const fetchOrderList = async () => {
  const response = await AxiosUtil.get(
    `/fc/v1/realtime_order/order_processing_list`
  );

  return response.data;
};

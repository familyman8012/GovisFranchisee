import AxiosUtil, { AxiosUtilResponse } from "./index";

import { IGoAirSensorDataFetchParams, IGoAirSensorDataResponse, IGoAirSensorData } from "InterfaceFarm/Goair";

export const fetchStore = async () => {
  const response = await AxiosUtil.get("/fc/v1/goair/info");
  return response.data.data;
};

export const fetchStoreModules = async (goair_area_info_idx: number) => {
  const response = await AxiosUtil.get(`/fc/v1/goair/info/${goair_area_info_idx}`);

  return response.data.data;
};

export const fetchStoreModuleSensors = async (params: {
  goair_area_info_idx: number;
  goair_module_info_idx: number;
}) => {
  const response = await AxiosUtil.get(
    `/fc/v1/goair/info/${params.goair_area_info_idx}/${params.goair_module_info_idx}`
  );

  return response.data.data;
};

export const fetchSensorData = async (params: IGoAirSensorDataFetchParams) => {
  const { goair_area_info_idx, goair_module_info_idx, sensor_type, ...otherParams } = params;

  const response = await AxiosUtil.get<AxiosUtilResponse<IGoAirSensorDataResponse<IGoAirSensorData>>>(
    `/fc/v1/goair/info/${goair_area_info_idx}/${goair_module_info_idx}/${sensor_type}`,
    {
      params: otherParams,
    }
  );

  return response.data.data;
};

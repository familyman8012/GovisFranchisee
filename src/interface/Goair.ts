export interface IGoAirListResponse<T> {
  list: T[];
}

export interface IGoAirSensorDataResponse<T> {
  list: T[];
  payload_updated_dt: string;
  range: {
    data_max: string;
    data_min: string;
  };
}

export interface IGoAirModule {
  goair_module_info_idx: number;
  module_name: string;
  module_state: number;
  notice_list: Array<{ notice_massage: string; notice_state: number }>;
}

export interface IGoAirArea {
  goair_area_info_idx: number;
  area_name: string;
  area_image: string;
  module_list: IGoAirModule[];
}

export interface IGoAirSensor {
  check_status: number;
  data_value: string;
  sensor_type: number;
}

export interface IGoAirSensorDataFetchParams {
  goair_area_info_idx: number;
  goair_module_info_idx: number;
  sensor_type: number;
  search_dt_start: string;
  search_dt_end: string;
  tic: number;
}

export interface IGoAirSensorData {
  search_label: string;
  data_value: string;
  range: {
    data_max: string;
    data_min: string;
  };
}

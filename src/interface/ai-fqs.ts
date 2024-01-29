export interface IFqsInspectionInfo {
  inspection_info_idx: number;
  store_idx: number;
  store_name: string;
  video_info_idx: number;
  inspection_image_url: string;
  product_info_idx: number;
  product_info_name: string;
  analysis_object_idx: string;
  inspection_status: string;
  total_score: number;
  converted_score: number;
  good_count: number;
  average_count: number;
  poor_count: number;
  manufacture_dt: string;
  manufacture_since_time: number;
  inspection_dt: string;
  is_re_request: number;
  dual_video_url: string;
  video_url: string;
  face_video_url: string;
  step_list: {
    inspection_step_idx: number;
    step_variable_idx: number;
    step_variable_name: string;
    rating_scale_idx_1: number;
    rating_scale_name_1: string;
    rating_scale_idx_2: number;
    rating_scale_name_2: string;
    rating_scale_idx_3: number;
    rating_scale_name_3: string;
    step_image_url: string;
    step_color_image_url: string;
    section_description: string;
    section_dt_start: number;
    section_dt_finish: number;
    section_score: number;
    section_score_std: number;
    conversion_score: number;
    improvement_label?: string;
    decrease_label?: string;
    ground_truth_image_url?: string;
  }[];
}

export interface IFqsInspectionListResponse {
  total_count: number;
  list: {
    inspection_info_idx: number;
    store_idx: number;
    store_name: string;
    video_info_idx: number;
    inspection_image_url: string;
    product_info_idx: number;
    product_info_name: string;
    analysis_object_idx: string;
    inspection_status: string;
    total_score: number;
    converted_score: number;
    good_count: number;
    average_count: number;
    poor_count: number;
    manufacture_dt: string;
    manufacture_since_time: number;
    is_re_request: number;
  }[];
}

export interface IFqsStoreStatus {
  store_aifqs_enabled: number;
  store_count: number;
  devices_total: number;
  devices_enabled: number;
  program_total: number;
  program_enabled: number;
}

export interface IFqsStoreDeviceListResponse {
  total_count: number;
  list: {
    store_name: string;
    store_idx: number;
    device_status: number;
    program_status: number;
    camera_enabled: number;
    camera_total: number;
    is_use_stt: number;
    cctv_video_count: number;
  }[];
}

export interface IFqsStoreInfoResponse {
  info: {
    store_name: string;
    opening_time: string;
    closing_time: string;
    wifi_ssid: string;
    wifi_pwd: string;
    host_ip: string;
    is_use_stt: string | number;
  };
  camera_table: {
    shutter_speed: string;
    iso: string;
    fps: string;
    is_use: number;
  };
  camera_face: {
    camera_id: string;
    resolution_width: string;
    resolution_height: string;
    fqs: string;
    is_use: number;
  };
  camera_vat_left: {
    camera_id: string;
    resolution_width: string;
    resolution_height: string;
    fqs: string;
    is_use: number;
  };
  camera_vat_right: {
    camera_id: string;
    resolution_width: string;
    resolution_height: string;
    fqs: string;
    is_use: number;
  };
}

export interface IFqsStoreDeviceInfo {
  info: {
    store_name: string;
    is_use_stt: number;
  };
  camera_table: {
    store_stt_camera_idx: number;
    is_use: number;
    status: number;
  };
  camera_face: {
    store_stt_camera_idx: number;
    is_use: number;
    status: number;
  };
  camera_vat_left: {
    store_stt_camera_idx: number;
    is_use: number;
    status: number;
  };
  camera_vat_right: {
    store_stt_camera_idx: number;
    is_use: number;
    status: number;
  };
}

export interface IFqsStoreCameraInfo {
  camera_info: {
    shutter_speed: string;
    iso: string;
    camera_id: string;
    resolution_width: string;
    resolution_height: string;
    fps: string;
    is_use: number;
    last_cctv_video_url: string;
  };
  list: {
    recode_date: string;
    recode_count: number;
    video_length_sum: number;
  }[];
}

export interface IFqsStoreCameraVideoList {
  list: {
    recode_dt: string;
    video_length: number;
    cctv_video_url: string;
    cctv_video_name: string;
  }[];
}

export type FqsStoreInfoParams = Partial<
  Omit<IFqsStoreInfoResponse, "info">
> & {
  store_idx: number | string;
  info: Omit<IFqsStoreInfoResponse["info"], "store_name">;
};

export interface IFqsMonitoringVideoInfo {
  store_stt_cctv_idx: number;
  record_dt: string;
  record_finish_dt: string;
  video_length: number;
  cctv_video_url: string;
  cctv_video_name: string;
}

export interface IFqsMonitoringMakeHistory {
  inspection_info_idx: number;
  store_idx: number;
  store_name: string;
  video_info_idx: number;
  inspection_image_url: string;
  product_info_idx: number;
  product_info_name: string;
  analysis_object_idx: number;
  total_score: number;
  converted_score: number;
  good_count: number;
  average_count: number;
  poor_count: number;
  manufacture_dt: string;
  manufacture_since_time: number;
  is_re_requests: number;
}

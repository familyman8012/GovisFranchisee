export interface IAisttStateReq {
  search_start_dt?: string;
  search_end_dt?: string;
  product_idx_list?: string;
  store_idx_list?: string;
}

export interface IimprovementStatusItem {
  inspection_info_idx: number;
  product_info_idx: number;
  product_name: string;
  store_idx: number;
  store_name: string;
  total_score: number;
  converted_score: number;
  manufacture_since_time: number;
  improvement_label: string;
}

export interface IimprovementStatusRes {
  list: IimprovementStatusItem[];
}

export interface IManufacturingQualityItem {
  score_range: number;
  manufacturing_count: number;
  improvement_needed_count: number;
  manufacturing_count_per: number;
  improvement_needed_count_per: number;
}

export interface IManufacturingQualityRes {
  list: IManufacturingQualityItem[];
}

export interface IManufacturingTimeItem {
  product_info_idx: number;
  product_name: string;
  product_image: string;
  evi_product_category: number;
  evi_product_category_str: string;
  manufacture_since_time_avg: number;
}

export interface IManufacturingTimeRes {
  list: IManufacturingTimeItem[];
}

export interface IStoreManufacturingStateRes {
  list: {
    store_idx: number;
    store_name: string;
    manufacturing_count: number;
    improvement_needed_count: number;
    top_count?: number;
    top_poor_count?: number;
    middle_count?: number;
    middle_poor_count?: number;
    bottom_count?: number;
    bottom_poor_count?: number;
  }[];
}

export interface IPizzaStatusRes {
  summary: {
    converted_score_avarage_total: number;
    product_count: number;
    manufacturing_count_total: number;
  };
  list: {
    product_info_idx: number;
    product_name: string;
    product_image: string;
    evi_product_category: number;
    evi_product_category_str: string;
    manufacture_since_time_avarage: number;
    manufacturing_count: number;
    converted_score_avarage: number;
    improvement_needed_count: number;
  }[];
}

export interface IDetailStateRes {
  info: {
    product_info_idx: number;
    product_name: string;
    store_idx_list: string;
    store_name_list: string;
  };
  improvement_needed: {
    column_name: string;
    frequency_count: number;
  }[];
  improvement_factor: {
    image: string;
    color_image_url: string;
    label: string;
  }[];
  highlight: {
    manufacturing_count: number;
    converted_score_avarage: number;
    improvement_needed_count: number;
  };
  report: {
    step_variable_idx: number;
    step_name: string;
    group_step_variable_idx: number;
    group_step_name: string;
    converted_score_avarage: number;
    rating_scale_idx_1: number;
    rating_scale_name_1: string;
    rating_scale_idx_2: number;
    rating_scale_name_2: string;
    rating_scale_idx_3: number;
    rating_scale_name_3: string;
    frequency_count: number;
  }[];
}

export interface ReportTableProps {
  converted_score_avarage: number;
  frequency_count: number;
  group_step_name: string;
  group_step_variable_idx: number;
  rating_scale_idx_1: number;
  rating_scale_idx_2: number;
  rating_scale_idx_3: number;
  rating_scale_name_1: string;
  rating_scale_name_2: string;
  rating_scale_name_3: string;
  step_name: string;
  step_variable_idx: number;
}

export interface ReportConvertRatings {
  items: {
    converted_score_avarage: number;
    frequency_count: number;
    rating_scale_idx_2: number;
    rating_scale_idx_3: number;
    rating_scale_name_2: string;
    rating_scale_name_3: string;
  }[];
  rating_scale_idx_1: number;
  rating_scale_name_1: string;
}

export interface ReportConvertData {
  group_step_name: string;
  group_step_variable_idx: number;
  ratings: ReportConvertRatings[];
  step_name: string;
  step_variable_idx: number;
  total_converted_score_average: number;
  total_scores_count?: number;
}

export interface IManufacturingListReq {
  per_num: number;
  current_num: number;
  search_start_dt?: string;
  search_end_dt?: string;
  store_idx?: string;
  product_info_idx?: string;
}

export interface IManufacturingListRes {
  total_count: number;
  list: {
    inspection_info_idx: number;
    store_idx: number;
    store_name: string;
    video_info_idx: number;
    inspection_image_url: string;
    product_info_idx: number;
    product_info_name: string;
    total_score: number;
    converted_score: number;
    good_count: number;
    average_count: number;
    poor_count: number;
    manufacture_dt: string;
    manufacture_since_time: number;
  }[];
}

export interface IManufacturingDetailReq {
  inspection_info_idx: number;
}

export interface IManufacturingDetailRes {
  inspection_info_idx: number;
  store_idx: number;
  store_name: string;
  video_info_idx: number;
  inspection_image_url: string;
  product_info_idx: number;
  product_name: string;
  analysis_object_idx: number;
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
    section_dt_start: number;
    section_dt_finish: number;
    section_score: number;
    section_score_std: number;
    conversion_score: number;
    improvement_label: string;
    decrease_label: string;
  };
}

// 레포트
export interface IReportListReq {
  per_num?: number;
  current_num?: number;
  is_send?: number;
  registration_start_dt?: string;
  registration_end_dt?: string;
  search_target?: string;
  search_value?: string;
  sort_target?: string;
  sort_type?: string;
}

export interface IReportListItem {
  fqs_reports_idx: number;
  fqs_reports_code: string;
  fqs_reports_name: string;
  collection_range_start_dt: string;
  collection_range_end_dt: string;
  registration_dt: string;
  is_send: number;
  send_dt: string;
  send_count: number;
}

export interface IReportListRes {
  total_count: number;
  list: IReportListItem[];
}

export interface IReportDetailReq {
  fqs_reports_idx: number;
  store_idx?: string;
}

export interface IReportInfoReq {
  fqs_reports_idx: number;
  store_idx?: string;
}

// 레포트  상세  내역/결과
export interface IReportInfoRes {
  info: {
    fqs_reports_idx: number;
    fqs_reports_code: string;
    fqs_reports_name: string;
    collection_range_start_dt: string;
    collection_range_end_dt: string;
    registration_dt: string;
    is_send: number;
    send_dt: string;
    send_count: number;
  };
  analysis_result_1: string;
  analysis_result_2: string;
}

export interface IReportAnalysisModifyReq {
  fqs_reports_idx: string;
  number: number;
  contents: string;
}

export interface IReportDetailAnalysModifyisRes {
  fqs_reports_idx: number;
  number: number;
  contents: string;
}

export interface IReportTotalStoreSummary {
  store_count: number;
  inspection_count: number;
}

export interface IReportManufacturingStatusRes {
  store_overview: IReportTotalStoreSummary;
  manufacturing_status: IManufacturingQualityItem[];
}

export interface IReportScoreAverageDetailReq extends IReportDetailReq {
  product_info_idx?: string;
}

export interface IReportScoreAverageItem {
  product_info_idx: number;
  product_name: string;
  product_image: string;
  evi_product_group: number;
  evi_product_group_str: string;
  manufacture_since_time_avarage: number;
  manufacturing_count: number;
  converted_score_avarage: number;
  improvement_needed_count: number;
}

export interface IReportScoreAverageRes {
  list: IReportScoreAverageItem[];
}

export interface IReportScoreDetailFactor {
  image: string;
  label: string;
}

export interface IReportScoreDetailReport extends ReportTableProps {}

export interface IReportScoreAverageDetailRes {
  improvement_factor: IReportScoreDetailFactor[];
  report: IReportScoreDetailReport[];
}

export interface IReportMailSendReq {
  recv_emails: string;
  subject: string;
  link: string;
  contents: string;
}

export interface IReportMailSendRes
  extends Omit<IReportMailSendReq, 'fqs_reports_idx'> {}

export interface IReportMailHistoryReq {
  per_num?: number;
  current_num: number;
}

export interface IReportMailHistoryRes {
  total_count: number;
  list: {
    send_dt: string;
    recv_email: string;
  }[];
}

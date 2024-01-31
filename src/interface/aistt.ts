export interface IAisttStateReq {
  search_start_dt?: string;
  search_end_dt?: string;
  product_idx_list?: string;
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
  };
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
  improvement_needed: {
    column_name: string;
    frequency_count: number;
  }[];
}

export interface IManufacturingListReq {
  per_num: number;
  current_num: number;
  search_start_dt?: string;
  search_end_dt?: string;
  product_info_idx?: string;
}

export interface IManufacturingListRes {
  total_count: number;
  list: {
    inspection_info_idx: number;
    video_info_idx: number;
    inspection_image_url: string;
    product_info_idx: number;
    product_name: string;
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

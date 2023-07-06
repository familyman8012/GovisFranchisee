export interface iFQSDashboardRequest {
    record_start_dt: string;
    record_end_dt: string;
    sort_type: number | string;
}

export interface iFQSDashboardResponse<T> {
    list: T[];
    total_overall_score: number;
    total_overall_score_100: number;
}

export interface iFQSDashboardPizza {
    category_idx: number;
    category_name: string;
    category_image_path: string;
    count: number;
    overall_score: number;
    overall_score_100: number;
}

export interface iFQSListRequest {
    current_page_number: number;
    per_page_number: number;
    category_idx: string;
    record_start_dt: string;
    record_end_dt: string;
    sort_type: number;
}

export interface iFQSDashboardStatusDate {}

export interface iFQSListResponse {
    total: number;
    list: any[];
}
export interface iCategoryRequest {
    category_group_idx: number;
}

export interface iCategoryResponse {
    list: any[];
}

export interface iCategorylist {
    category_idx: number;
    is_deleted: number;
    category_name: string;
    category_image_path: string;
}

export interface iFQSDetail {
    video_info_idx: string;
    created_at: string;
    update_at: string;
    is_deleted: string;
    filename: string;
    dir_path: string;
    record_start_dt: string;
    record_end_dt: string;
    store_id: string;
    video_info_created_at: string;
    video_info_update_at: string;
    store_name: string;
    quality_info_idx: string;
    updated_at: string;
    category_idx: string;
    inspection_dt: string;
    inspection_type: string;
    inspection_user_id: string;
    overall_score: string;
    category_name: string;
    category_is_deleted: string;
    inspection_user_name: string;
    overall_score_100: string;
    record_play_dt: string;
    record_play_ts: string;
    video_url: string;
    section: iFQSDetailSection[];
    official_image: string;
}

export interface iFQSListItem extends Omit<iFQSDetail, "section"> {}

export interface iFQSDetailSection {
    quality_section_info_idx: string;
    created_at: string;
    updated_at: string;
    quality_info_idx: string;
    section_type: string;
    section_frame_start: string;
    section_frame_end: string;
    section_score: string;
    section_frame_official: string;
    section_frame_official_image: string;
    section_score_100: string;
}

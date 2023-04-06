export interface iInterior {
  status: number;
  created_at: string;
  title: string;
  content: iInteriorListContent[];
  review: null | iInteriorReview;
}

export interface iInteriorListContent {
  sbic_idx: number;
  created_at: string;
  user_type: number;
  content_type: number;
  content_value: string;
  is_read: number;
}

export interface iInteriorListItem extends Omit<iInterior, "content"> {
  sbi_idx: number;
  unread_content_count: number;
  delete_possible: string;
}

export interface iInteriorListRequest {
  page: number;
  size: number;
}

export interface iInteriorListResponse {
  count: number;
  list: iInteriorListItem[];
}

export interface iInteriorTitlePostRequest {
  title: string;
  user_id?: number;
}

export interface iInteriorTitlePostResponse {
  sbi_idx: number;
}

export interface iInteriorViewInfoRequest {
  sbi_idx: number;
}

export interface iInteriorViewInfoResponse {
  review: iInteriorReview;
  status: number;
  created_at: string;
  title: string;
  content: iInteriorViewContent[];
}

export interface iInteriorViewContent {
  sbic_idx: number;
  created_at: string;
  user_type: number;
  content_type: number;
  content_value: string;
  is_read: number;
}

export interface iInteriorBoardReplyPostRequest {
  [key: string]: number | string | File;
  sbi_idx: number;
  content_type: number;
  content_value: string | File;
  user_id: number;
}

export interface iInteriorBoardReplyPostResponse {
  sbic_idx: number;
  content_value: string;
}

export interface iInteriorBoardReplyDeleteRequest {
  sbic_idx: number;
}

export interface iInteriorBoardReplyDeleteResponse {
  sbic_idx: number;
}

export interface iInteriorReview {
  review_text: null | string;
  service_score: number;
  work_score: number;
}

export interface iInteriorReviewSend extends iInteriorReview {
  sbi_idx: number;
}

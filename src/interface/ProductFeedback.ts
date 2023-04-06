export interface IRecipeFeedbackTitlePostRequest {
  title: string;
  user_id: number;
}

export interface IRecipeFeedbackTitleDeleteRequest {
  sbf_idx: number;
  user_id: number;
}

export interface IRecipeFeedbackTitleResponse {
  sbf_idx: number;
}

export interface IRecipeFeedbackListRequest {
  page: number;
  size: number;
}

export interface IRecipeFeedbackListResponse {
  count: number;
  list: IRecipeFeedbackItem[];
}

// 상품피드백 글 목록
export interface IRecipeFeedbackItem {
  sbf_idx: number;
  status: number;
  store_name: string;
  created_at: string;
  title: string;
  last_content_created_at: string | null;
  unread_content_count: number;
  delete_possible: string;
}

export interface IRecipeFeedbackViewInfoRequest {
  sbf_idx: number;
}

export interface IRecipeFeedbackViewInfoResponse {
  status: number;
  created_at: string;
  title: string;
  store_name: string;
  content: [];
  delete_possible: string;
}

export interface IRecipeFeedbackViewContentsItem {
  sbfc_idx: number;
  created_at: string;
  user_type: number;
  user_name: string | null;
  content_type: number;
  content_value: string;
  is_read: number;
}

export interface IRecipeFeedbackReplyPostRequest {
  [key: string]: number | string | File;
  sbf_idx: number;
  content_type: number;
  content_value: File | string;
  user_id: number;
}

export interface IRecipeFeedbackReplyPostResponse {
  sbfc_idx: number;
  content_value: string;
}

export interface IRecipeFeedbackReplyDeleteRequest {
  sbfc_idx: number;
  user_id: number;
}

export interface IRecipeFeedbackReplyDeleteResponse {
  sbfc_idx: number;
}

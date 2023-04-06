export interface iReturn {
  status: number;
  created_at: string;
  product_name: string;
  content: iReturnListContent[];
}

export interface iReturnListContent {
  sbrec_idx: number;
  created_at: string;
  user_type: number;
  content_type: number;
  content_value: string;
  is_read: number;
}

export interface iReturnListItem extends Omit<iReturn, "content"> {
  sbre_idx: number;
  unread_content_count: number;
  delete_possible: string;
}

export interface iReturnListRequest {
  page: number;
  size: number;
}

export interface iReturnListResponse {
  count: number;
  list: iReturnListItem[];
}

export interface iReturnApplyRequest {
  product_name: string;
  receiving_date: string;
  expiration_date: string;
  product_quantity: number;
  occur_type: string;
  occur_etc: string | null;
  process_request: number;
  detail_content: string;
  user_id?: number;
}

export interface iReturnApplyResponse {
  sbre_idx: number;
}

export interface iReturnAttachImgRequest {
  process_type: string;
  sbre_idx: number;
  attached_number: number;
  attached_file: string;
}

export interface iReturnAttachImgResponse {
  sbre_idx: number;
  attached_number: number;
  attached_image: string | null;
}

export interface iReturnApplyViewRequest {
  sbre_idx: number;
}

export interface iReturnApplyViewResponse extends Omit<iReturnApplyRequest, "occur_type" | "process_request"> {
  [index: string]: any;
  status: number;
  created_at: string;
  process_request: number;
  occur_type: number[];
  attached_image_1: string;
  attached_image_2: string;
  attached_image_3: string;
  attached_image_4: string;
}

export interface iReturnApplyModifyRequest extends iReturnApplyRequest {
  sbre_idx: number;
}

export interface iReturnApplyModifyResponse {
  sbre_idx: number;
}

export interface iReturnViewInfoRequest {
  sbre_idx: number;
}

export interface iReturnViewInfoResponse {
  status: number;
  created_at: string;
  title: string;
  content: iReturnViewContent[];
}

export interface iReturnViewContent {
  sbrec_idx: number;
  created_at: string;
  user_type: number;
  content_type: number;
  content_value: string;
  is_read: number;
}

export interface iReturnBoardReplyPostRequest {
  [key: string]: number | string | File;
  sbre_idx: number;
  content_type: number;
  content_value: string | File;
  //user_id: number;
}

export interface iReturnBoardReplyPostResponse {
  sbrec_idx: number;
  content_value: string;
}

export interface iReturnBoardReplyDeleteRequest {
  sbrec_idx: number;
}

export interface iReturnBoardReplyDeleteResponse {
  sbrec_idx: number;
}

export interface IReturnPostValues {
  product_name: string;
  receiving_date: string;
  expiration_date: string;
  product_quantity: number;
  occur_type: any[];
  occur_etc: string | null;
  process_request: string;
  detail_content: string;
}

export interface iMachine {
  status: number;
  created_at: string;
  machine_name: string;
  content: iMachineListContent[];
}

export interface iMachineListContent {
  sbmc_idx: number;
  created_at: string;
  user_type: number;
  content_type: number;
  content_value: string;
  is_read: number;
}

export interface iMachineListItem extends Omit<iMachine, "content"> {
  sbm_idx: number;
  unread_content_count: number;
  delete_possible: string;
}

export interface iMachineListRequest {
  current_num: number;
  per_num: number;
}

export interface iMachineListResponse {
  total_count: number;
  list: iMachineListItem[];
}

export interface iMachineApplyRequest {
  machine_name: string;
  detail_content: string;
}

export interface iMachineApplyResponse {
  sbm_idx: number;
}

export interface iMachineAttachImgRequest {
  process_type: string;
  sbm_idx: number;
  attached_number: number;
  attached_file: string;
}

export interface iMachineAttachImgResponse {
  sbm_idx: number;
  attached_number: number;
  attached_image: string | null;
}

export interface iMachineApplyViewRequest {
  sbm_idx: number;
}

export interface iMachineApplyViewResponse
  extends Omit<iMachineApplyRequest, "occur_type" | "process_request"> {
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

export interface iMachineApplyModifyRequest extends iMachineApplyRequest {
  sbm_idx: number;
}

export interface iMachineApplyModifyResponse {
  sbm_idx: number;
}

export interface iMachineViewInfoRequest {
  sbm_idx: number;
}

export interface iMachineViewInfoResponse {
  status: number;
  created_at: string;
  edited_at: string;
  machine_name: string;
  attached_image_1: string;
  attached_image_2: string;
  attached_image_3: string;
  attached_image_4: string;
  detail_content: string;
}

export interface iMachineViewContent {
  sbmc_idx: number;
  created_at: string;
  user_type: number;
  content_type: number;
  content_value: string;
  is_read: number;
}

export interface iMachineBoardReplyPostRequest {
  [key: string]: number | string | File;
  sbm_idx: number;
  content_type: number;
  content_value: string | File;
  //user_id: number;
}

export interface iMachineBoardReplyPostResponse {
  sbm_idx: number;
  content_value: string;
}

export interface iMachineBoardReplyDeleteRequest {
  sbmc_idx: number;
}

export interface iMachineBoardReplyDeleteResponse {
  sbm_idx: number;
}

export interface IMachinePostValues {
  machine_name: string;
  receiving_date: string;
  expiration_date: string;
  product_quantity: number;
  occur_type: any[];
  occur_etc: string | null;
  process_request: string;
  detail_content: string;
}

export interface INoticeBoardListRequest {
  user_id: number | string;
  page: number;
  size: number;
  search: string;
}

export interface INoticeBoardViewRequest {
  user_id: number | string;
  sbn_idx: number | string;
}

export interface INoticePopup {
  sbn_idx: number;
  title: string;
}

export interface INoticeBoardListResponse {
  count: number;
  list: [];
}

export interface INoticePopupResponse {
  count: number;
  list: INoticePopup[];
}

export interface INoticeBoardViewResponse {
  title: string;
  content: string;
  created_at: string;
  user_name: string;
  previous_notice: {
    sbn_idx: number;
    title: string;
  };
  next_notice: {
    sbn_idx: number;
    title: string;
  };
}

export interface INoticeBoardListRow {
  created_at: string;
  is_read: number;
  sbn_idx: number;
  title: string;
}

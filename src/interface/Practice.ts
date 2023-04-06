export interface IPractice {
  sbs_idx?: number; // 글 고유식별 번호
  thumbnail: string; // 썸네일 (AWS S3 경로)
  title: string; // 제목
  content: string;
  created_at: string; // 등록시간 (Y-m-d H:M:S)
  prev_story?: {
    // 이전 글 데이터
    prev_idx: number;
    prev_title: string;
  };
  next_story?: {
    // 다음 글 데이터
    next_idx: number;
    next_title: string;
  };
}

export interface IPracticeListItem extends Omit<IPractice, "prev_story" | "next_story" | "content"> {}

export interface IPracticeListReponse {
  count: number;
  list: IPracticeListItem[];
}

export interface IPracticeListRequest {
  page: number;
  size: number;
}

export interface ISchedule {
  sbc_idx: number; //일정 고유식별 번호
  title?: string; // 제목
  content?: string; // 제목
  start_date: string; // 일정 시작일
  start_time?: string; // 일정 시작 시간
  end_date: string; // 일정 종료일
  end_time?: string; // 일정 종료 시간
  is_all_day: number; // 일정 종일 구분 (0=시간, 1=종일)
  category: number; // 등록 구분 (0=프로모션, 1=공지사항)
  reference_idx?: number; // 참조 고유식별 번호
}

export interface IScheduleFetchParams {
  search_start_period: string; // 검색 시작 기간일 (Y-m-d)	O
  search_end_period: string; // 검색 종료 기간일 (Y-m-d)	O
}

export interface IScheduleFindAll {
  list: ISchedule[];
}

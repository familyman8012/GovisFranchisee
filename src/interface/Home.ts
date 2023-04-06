/* interface HomeYear (s) */
export interface iHomeYearResponse {
  order_count: number;
  search_date_end: string;
  search_date_start: string;
  sum_total_billable_amount: string;
}

/* interface HomeYear (e) */

/* interface HomeListResponse (s) */
export interface iHomeListResponse<T> {
  list: Array<T>;
}
/* interface HomeListResponse (s) */

/* interface HomeWeek (s) */
export interface iHomeWeekList {
  before: iHomeWeekListObject;
  this: iHomeWeekListObject;
  week_str: string;
}
export interface iHomeWeekListObject {
  data: iHomeWeekListObjectData;
  date: string;
}

export interface iHomeWeekListObjectData {
  order_count: number;
  ordered_at: string;
  sum_baemin: string;
  sum_coupang: string;
  sum_delivery: string;
  sum_dreamit: string;
  sum_foodtech: string;
  sum_kiosk: string;
  sum_pos: string;
  sum_takeout: string;
  sum_total: string;
  sum_total_billable_amount: string;
  sum_unospay: string;
  sum_visit: string;
  sum_yogiyo: string;
}
/* interface HomeWeek (e) */

/* interface HomeYesterday (s) */

export interface iHomeYesterdayResponse {
  list: iHomeYesterdayInfo;
}

export interface iHomeYesterdayInfo {
  before_1: iHomeYesterdayInfoObject;
  before_2: iHomeYesterdayInfoObject;
}

export interface iHomeYesterdayInfoObject {
  data: iHomeYesterdayInfoObjectData;
  date: string;
}

export interface iHomeYesterdayInfoObjectData {
  [key: string]: number | string | undefined;
  order_count?: number;
  ordered_at?: string;
  sum_baemin?: string;
  sum_coupang?: string;
  sum_delivery?: string;
  sum_dreamit?: string;
  sum_foodtech?: string;
  sum_kiosk?: string;
  sum_pos?: string;
  sum_takeout?: string;
  sum_total?: string;
  sum_total_billable_amount?: string;
  sum_unospay?: string;
  sum_visit?: string;
  sum_yogiyo?: string;
}
/* interface HomeYesterday (e) */

/* interface HomeTime (s) */

export interface iHomeTimeResponse {
  list: iHomeTimeList;
}

export interface iHomeTimeList {
  before_1: iHomeTimeListObject;
  before_2: iHomeTimeListObject;
}

export interface iHomeTimeListObject {
  data: Array<iHomeTimeListArrayData>;
  date: string;
}
export interface iHomeTimeListArrayData {
  [key: string]: number | string;
  order_count: number;
  sum_baemin: string;
  sum_coupang: string;
  sum_delivery: string;
  sum_dreamit: string;
  sum_foodtech: string;
  sum_kiosk: string;
  sum_pos: string;
  sum_takeout: string;
  sum_total: string;
  sum_total_billable_amount: string;
  sum_unospay: string;
  sum_visit: string;
  sum_yogiyo: string;
  time: string;
}

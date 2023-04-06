export interface ISalesRequestDateRange {
  [key: string]: number | string;
  start_date: string;
  end_date: string;
  current_page: number;
  per_num: number;
}

export interface ISalesResponse {
  daily: IDaliyList<any>;
  total: {};
}

export interface IDaliyList<T> {
  [date: string]: T;
}

export interface IDaliyListRow {
  billable_amount: string;
  order_count: number;
  order_date: string;
  unit_price: string;
  weather: string;
}

export interface ITotal {
  total_billable_amount: string;
  total_order_count: number;
  total_date: number;
}

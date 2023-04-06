export interface IOrdersRequestDateRange {
  [key: string]: number | string;
  start_date: string;
  end_date: string;
  current_page: number;
  per_num: number;
}

export interface IOrdersResponse {
  orders: [];
  total: {};
}

export interface IOrdersListRow {
  billable_amount: string;
  channel: string;
  count: number;
  delivery_type: string;
  order_name: string;
  order_number: string;
  ordered_at: string;
}

export interface ITotal {
  total_billable_amount: string;
  total_order_count: number;
}

export interface ITest {
  name: string;
}

export interface IProductResultFetchParams {
  search_dt_start: string;
  search_dt_end: string;
  display_chart_type: string;
}

export interface IProductListFetchParams
  extends Omit<IProductResultFetchParams, "display_chart_type"> {
  search_dt_start: string;
  search_dt_end: string;
  search_product_category?: number;
}

export interface IProductResultChartItem {
  display_label: string;
  display_item: {
    product_category: number;
    order_count: number;
  }[];
}

export interface IProductListItem {
  product_id: number;
  product_name: string;
  product_category: number;
  total_order_count: number;
  main_order_count: number;
  select_order_count: number;
  add_order_count: number;
}

export interface IProductResultFetchResponse {
  list: IProductResultChartItem[];
}

export interface IProductListFetchResponse {
  list: IProductListItem[];
}

export interface IProductFilter {
  search_product_name: string;
  search_product_category: string;
}

// 2023.01.15 피자 제품 실적 - 차트
export interface IPizzaResultFetchParams {
  search_dt_start: string;
  search_dt_end: string;
  display_chart_type: string;
}

export interface IPizzaResultChartItem {
  item_key: string;
  item_label: string;
  value_list: {
    value_key: string;
    value_label: string;
    value: number;
  }[];
  total_value: number;
}

export interface IPizzaResultFetchResponse {
  list: IPizzaResultChartItem[];
}

export interface IPizzaListFetchParams
  extends Omit<IPizzaResultFetchParams, "display_chart_type"> {
  search_dt_start: string;
  search_dt_end: string;
  evi_product_category?: string;
}

export interface IPizzaListItem {
  product_info_idx: number;
  product_name_ko: string;
  evi_product_category: number;
  evv_product_category: string;
  total_sales_count: number;
}

export interface IPizzaListFetchResponse {
  list: IPizzaListItem[];
}

export interface IProductResultFetchParams {
  search_dt_start: string;
  search_dt_end: string;
  display_chart_type: string;
}

export interface IProductListFetchParams extends Omit<IProductResultFetchParams, "display_chart_type"> {
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

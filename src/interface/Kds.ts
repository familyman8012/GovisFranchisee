export interface IIsKds {
  store_list: IIsKdsListItem[];
}

export interface IIsKdsListItem {
  addr: string;
  is_kds: number;
  revoked: string;
  store_id: string;
  store_name: string;
  sv_user_id: string;
}

export interface IOrderAmountReq {
  search_ordered_dt?: string;
}

export interface IOrderAmountRes {
  total_amount: string;
  order_count: number;
  unit_amount: string;
}

export interface IOrderProcessReq {
  search_ordered_dt?: string;
}

export interface IOrderProcessRes {
  list: {
    display_label: string;
    display_item: {
      order_count: number;
      complete_count: number;
      sum_processing_time: number;
      average_processing_time: number;
    };
  }[];
}

export interface IOrderListReq {
  search_ordered_dt?: string;
}

export interface IOrderListRes {
  count?: number;
  list: IOrderListItem[];
}

export interface IOrderListItem {
  receipt_idx: number;
  order_number: string;
  receipt_number: string;
  ordered_at: string;
  sale_type: number;
  order_memo: string;
  process_status: number;
  process_start_at: string;
  process_complete_at: string | null;
  item_list: IMainMenutem[];
}

export interface IMainMenutem extends Omit<ISubMenuItem, "is_option_add"> {
  is_option_add: number;
  option_list: ISubMenuItem[];
}

export interface ISubMenuItem {
  receipt_item_idx: number;
  is_product_class: number;
  class_name: string | null;
  product_name: string;
  quantity: number;
  process_status: number;
  process_start_at: string | null;
  process_complete_at: string | null;
  is_option_add?: undefined;
}

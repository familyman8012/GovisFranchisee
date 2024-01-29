export interface IMenuCategory {
  menu_category_idx?: number;
  menu_category_code?: string;
  menu_category_name: string;
  evi_menu_category_status: number;
}

export interface IMenuOptionCategory {
  menu_option_category_idx?: number;
  menu_option_category_name: string;
}

export interface IMenuOptionInfo {
  menu_info_idx: number;
  menu_option_category_idx: number;
  menu_option_info_idx: number;
  menu_option_name: string;
  product_info_idx: number;
  product_image: string;
  product_name_ko: string;
  product_name_en: string;
  visit_normal_price: number;
  visit_discount_price: number;
  takeout_normal_price: number;
  takeout_discount_price: number;
  delivery_normal_price: number;
  delivery_discount_price: number;
}

export interface IMenuFormFields {
  menu_info_idx?: number;
  menu_name: string;
  evi_menu_type: number | string;
  evi_menu_group: number | string;
  evi_menu_status: number | string;
  evi_menu_classification: number | string;
  menu_category_idx: number;
  product_info_idx?: number;
  product_name_ko?: string;
  visit_normal_price: number;
  visit_discount_price: number;
  takeout_normal_price: number;
  takeout_discount_price: number;
  delivery_normal_price: number;
  delivery_discount_price: number;
  is_menu_option: string;
  menu_categories: (IMenuOptionCategory & {
    menu_options: Partial<IMenuOptionInfo>[];
  })[];
}

export interface IMenuCategoryFetchParams {
  per_num?: number;
  current_num?: number;
  evi_menu_category_status?: number;
  created_date?: number;
  updated_date?: number;
  search_target?: string;
  search_keyword?: string;
  sort_target?: string;
  sort_type?: string;
  is_export?: string;
}

export interface IMenuInfoResponse
  extends Omit<
    IMenuFormFields,
    'is_menu_option' | 'menu_categories' | 'is_menu_option'
  > {
  evv_menu_status: string;
  evv_menu_group: string;
  evv_menu_type: string;
  menu_info_idx: number;
  menu_code: string;
  product_image: string;
  product_name_en: string;
  created_date: string;
  updated_date: string;
  menu_category_name: string;
  menu_option_category_list: Required<IMenuOptionCategory>[];
}

export interface IMenuOptionListResponse {
  menu_info_idx: number;
  menu_option_category_idx: number;
  menu_option_category_name: string;
  menu_option_info_list: Pick<
    IMenuOptionInfo,
    'menu_option_info_idx' | 'menu_option_name'
  >[];
}

export type MenuCreateParams = Omit<
  IMenuFormFields,
  'option_view' | 'menu_info_idx'
>;

export type MenuUpdateParams = Omit<IMenuFormFields, 'menu_categories'>;

export type MenuCategoryCreateParams = Omit<
  IMenuCategory,
  'menu_category_idx' | 'menu_category_code'
>;

export interface IMenuCategoryItem {
  menu_category_idx: number;
  menu_category_code: string;
  menu_category_name: string;
  created_date: string;
  updated_date: string;
  evi_menu_category_status: number;
  evv_menu_category_status: string;
}

export interface IMenuListItem {
  menu_info_idx: number;
  menu_code: string;
  evi_menu_group: number;
  evv_menu_group: string;
  menu_category_idx: number;
  menu_category_name: string;
  menu_name: string;
  evi_menu_status: number;
  evv_menu_status: string;
  evi_menu_type: number;
  evv_menu_type: string;
  evi_menu_classification: number;
  evv_menu_classification: string;
  visit_normal_price: number;
  visit_discount_price: number;
  takeout_normal_price: number;
  takeout_discount_price: number;
  delivery_normal_price: number;
  delivery_discount_price: number;
  created_date: string;
  updated_date: string;
}

export interface IUnLinkMenuListItem {
  sequence_number: number;
  unidentified_menu_name: string;
  order_channel_count: number;
  order_channel_list: string[];
  order_store_count: number;
  order_store_list: string[];
}

export interface IMenuLinkHistoryItem {
  sequence_number: number;
  unidentified_menu_name: string;
  order_channel_count: number;
  order_channel_list: string[];
  order_store_count: number;
  order_store_list: string[];
  linked_menu_classification: string;
  linked_menu_name: string;
  processed_user_name: string;
  processed_date: string;
}

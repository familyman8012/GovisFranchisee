export interface IProductReq {
  per_num?: number;
  current_num?: number;
  evi_product_group?: number;
  evi_product_category?: number;
  evi_sale_type?: number;
  evi_product_status?: number;
  is_recipe_registration?: number;
  sale_start_date?: string;
  sale_end_date?: string;
  updated_date?: string;
  created_date?: string;
  search_target?: string;
  search_keyword?: string;
  sort_target?: string;
  sort_type?: 'asc' | 'desc';
}

export interface ProductInfo {
  product_info_idx: number;
  product_code: string;
  evi_product_group: number;
  evi_product_group_str: string;
  evi_product_category: number;
  evi_product_category_str: string;
  product_name_ko: string;
  product_name_en: string;
  evi_sale_type: number[];
  evi_sale_type_str: string[];
  sale_start_date: string;
  sale_end_date: string;
  created_date: string;
  updated_date: string;
  evi_product_status: number;
  evi_product_status_str: string;
  is_recipe_registration: number;
}

export interface IProductRes {
  total_count: number;
  list: ProductInfo[];
}

export interface IProductForm {
  product_info_idx: number;
  product_code?: string;
  evi_product_status: string;
  evi_product_group: string;
  evi_product_category: string;
  evi_sale_type: string[];
  product_name_ko: string;
  product_name_en: string;
  product_description: string;
  sale_start_date: string;
  sale_end_date: string;
  product_image: string;
}

export type IProductFormField = Omit<IProductForm, 'product_info_idx'>;

export type IProductFormSaveReq = Omit<IProductForm, 'product_info_idx'>;

export type IProductFormSaveRes = Pick<
  IProductForm,
  'product_info_idx' | 'product_code'
>;
export type IProductFormViewReq = Pick<IProductForm, 'product_info_idx'>;
export type IProductFormViewRes = IProductForm;
export type IProductFormModifyReq = Pick<IProductForm, 'product_info_idx'>;
export type IProductFormModifyRes = Omit<
  IProductForm,
  'product_info_idx' | 'product_code'
>;

// 채널 이미지
export interface IProductChannelImg {
  evi_sale_channel_str?: string;
  product_image_channel_idx: number;
  product_image: string;
  evi_sale_channel: number;
}

export interface IProductChannelImgList {
  evi_sale_channel_str?: string;
  product_image_channel_idx: number;
  product_image: string;
  evi_sale_channel: number;
  evi_sale_channel_code: string;
}

export interface IProductChannelImgView {
  list: IProductChannelImg[];
}

// 원재료 정보 보기
export interface IMaterialInfoViewItem {
  recipe_material_idx: number;
  material_info_idx: number;
  material_image: string;
  material_name_ko: string;
  material_name_en: string;
  recipe_material_quantity_value: number;
  evi_recipe_material_quantity_unit: number;
  evi_recipe_material_quantity_unit_str: string;
  recipe_material_note: string;
  purchase_cost: number;
  sale_cost: number;
  evi_country: number;
  evi_country_str: string[];
  partner_company_idx: number;
  partner_company_name: string;
  recipe_step_idx: number;
}

export interface IMaterialInfoViewRes {
  recipe_info_material_sale_cost?: number;
  recipe_info_material_purchase_cost?: number;
  recipe_material_list: IMaterialInfoViewItem[];
}

export interface IMaterialCategoryItem {
  material_category_idx: number;
  material_category_name: string;
  depth: number;
}

export interface IMaterialCategoryRes {
  list: IMaterialCategoryItem[];
}

export interface IMaterialReq {
  per_num?: number;
  current_num?: number;
  mci_large?: number;
  mci_middle?: number;
  mci_small?: number;
  evi_material_storage_type?: number;
  evi_material_status?: number;
  created_date?: string;
  updated_date?: string;
  purchase_price_min?: number;
  purchase_price_max?: number;
  sale_price_min?: number;
  sale_price_max?: number;
  search_target?: string;
  search_keyword?: string;
  sort_target?: string;
  sort_type?: 'asc' | 'desc';
  is_export?: string;
}

export interface MaterialInfo {
  material_info_idx: number;
  material_code: string;
  material_image: string;
  evi_material_product_type: number;
  evv_material_product_type: string;
  mci_large: number;
  mcn_large: string;
  mci_middle: number;
  mcn_middle: string;
  mci_small: number;
  mcn_small: string;
  evi_material_storage_type: number;
  evv_material_storage_type: string;
  material_name_ko: string;
  purchase_price: number;
  sale_price: number;
  pci_manufacturer: number;
  pcn_manufacturer: string;
  created_date: string;
  updated_date: string;
  evi_material_status: number;
  evv_material_status: string;
  evi_country: number[];
  evv_country: string[];
}

export interface IMaterialRes {
  total_count: number;
  list: MaterialInfo[];
}

export interface IOption {
  value: string | number;
  label: string | React.ReactNode;
}

export interface IMaterial {
  product_image: string;
  material_info_idx: number; // 고유식별 번호 for 원재료 정보
  material_code?: string; // 원재료 코드
  external_code?: string; // 내부 코드 (외주사 코드 / 발주고 코드)
  evi_material_status: string; // 원재료 상태 (환경 변수 - 고유식별 번호)
  evv_material_status?: string; // 원재료 상태 (환경 변수 값)
  material_image?: string; // 원재료 이미지 URL
  evi_material_product_type: string; // 원재료 상품 구분 (환경 변수 - 고유식별 번호)
  evv_material_product_type?: string; // 원재료 상품 구분 (환경 변수 값)
  mci_large: string; // 원재료 대분류 (원재료 카테고리 - 고유식별 번호)
  mcn_large?: string; // 원재료 대분류 (원재료 카테고리명)
  mci_middle: string; // 원재료 중분류 (원재료 카테고리 - 고유식별 번호)
  mcn_middle?: string; // 원재료 중분류 (원재료 카테고리명)
  mci_small: string; // 원재료 소분류 (원재료 카테고리 - 고유식별 번호)
  mcn_small?: string; // 원재료 소분류 (원재료 카테고리명)
  evi_material_storage_type: string; // 원재료 보관 구분 (환경 변수 - 고유식별 번호)
  evv_material_storage_type?: string; // 원재료 보관 구분 (환경 변수 값)
  material_name_ko: string; // 원재료 명 (한글)
  material_name_en?: string; // 원재료 명 (영어)
  material_trade_qty: number; // 거래 수량
  evi_material_trade_unit: string; // 거래 수량의 단위 (환경 변수 - 고유식별 번호)
  evv_material_trade_unit?: string; // 거래 수량의 단위 (환경 변수 값)
  material_spec_qty: number; // 원재료 규격 수량
  evi_material_spec_unit: string; // 원재료 규격 수량의 단위 (환경 변수 - 고유식별 번호)
  evv_material_spec_unit?: string; // 원재료 규격 수량의 단위 (환경 변수 값)
  material_config_qty: number; // 입수량
  minimal_purchase_qty: number; // 최소 구매 수량
  estimate_price: number; // 견적가
  purchase_price: number; // 매입가
  purchase_cost: number; // 매입원가
  sale_price: number; // 판매가
  sale_cost: number; // 원가
  evi_taxable: string; // 과세대상 (환경 변수 - 고유식별 번호)
  evv_taxable?: string; // 과세대상 (환경 변수 값)
  evi_vat: string; // VAT (환경 변수 - 고유식별 번호)
  evv_vat?: string; // VAT (환경 변수 값)
  pci_manufacturer: IOption; // 거래처 (협력 업체 - 고유식별 번호)
  pcn_manufacturer?: IOption; // 거래처 (협력 업체명)
  evi_country: string[]; // 원산지 (환경 변수 - 고유식별 번호)
  evv_country?: string; // 원산지 (환경 변수 값)
  purchase_place: string; // 발주처
  evi_material_sale_brand: string[]; // 판매 브랜드 (환경 변수 - 고유식별 번호)
  evv_material_sale_brand?: string; // 판매 브랜드 (환경 변수 값)
  material_description?: string; // 원재료 설명
}

// export type IProductFormField = Omit<
//   IProductForm,
//   'product_info_idx' | 'product_code'
// >;

export type IMaterialFormSaveReq = Omit<
  IMaterial,
  | 'material_info_idx'
  | 'material_code'
  | 'evv_material_status'
  | 'evv_material_product_type'
  | 'mcn_large'
  | 'mcn_middle'
  | 'mcn_small'
  | 'evv_material_storage_type'
  | 'evv_material_trade_unit'
  | 'evv_material_spec_unit'
  | 'evv_taxable'
  | 'evv_vat'
  | 'pcn_manufacturer'
  | 'evv_country'
  | 'evv_material_sale_brand'
>;

export type IMaterialFormSaveRes = Pick<
  IMaterial,
  'material_info_idx' | 'material_info_idx'
>;

export type IMaterialFormViewReq = Pick<IMaterial, 'material_info_idx'>;
export type IMaterialFormViewRes = IMaterial;

export type IMaterialFormModifyReq = Omit<
  IMaterial,
  | 'material_code'
  | 'evv_material_status'
  | 'evv_material_product_type'
  | 'mcn_large'
  | 'mcn_middle'
  | 'mcn_small'
  | 'evv_material_storage_type'
  | 'evv_material_trade_unit'
  | 'evv_material_spec_unit'
  | 'evv_taxable'
  | 'evv_vat'
  | 'pcn_manufacturer'
  | 'evv_country'
>;

export type IMaterialFormModifyRes = Pick<IMaterial, 'material_info_idx'>;

// 배송정보
// 원재료 배송 정보 - 등록, 수정

interface IAreaPeriod {
  evi_area: number;
  period_day: number;
}

interface IAreaPeriodView extends IAreaPeriod {
  evv_area: string;
}
export interface IMaterialShipping {
  material_shipping_idx?: number; // ?는 선택적으로 존재할 수 있는 프로퍼티를 나타냅니다.
  pci_shipping_company: number;
  pcn_shipping_company?: string;
  area_period_list: IAreaPeriod[] | IAreaPeriodView[];
}

export type IMaterialShippingData = Omit<
  IMaterialShipping,
  'material_shipping_idx' | 'pcn_shipping_company'
>;
export type IMaterialShippingView = IMaterialShipping;

export type IMaterialShippingSaveReq = IMaterialShippingData[];
export type IMaterialShippingSaveRes = Pick<
  IMaterialShipping,
  'material_shipping_idx'
>[];

export type IMaterialShippingViewReq = Pick<
  IMaterialShipping,
  'material_shipping_idx'
>;
export type IMaterialShippingViewRes = IMaterialShipping;

export type IMaterialShippingModifyReq = IMaterialShippingData;
export type IMaterialShippingModifyRes = Omit<
  IMaterialShipping,
  'material_shipping_idx' | 'pcn_shipping_company'
>;

// 협력업체 (제조회사, 물류회사)
export interface IPartnerReq {
  per_num?: number; // 페이지별 표시 아이템 개수
  current_num?: number; // 현재 페이지 번호
  evi_partner_company_status?: number; // 협력 업체 상태 (환경 변수 - 고유식별 번호)
  created_date?: string; // 등록일 ( yyyy-mm-dd )
  updated_date?: string; // 수정일 ( yyyy-mm-dd )
  search_target?: string; // 검색 - 대상 항목 ( Response 의 Search Target이 O 항목 )
  search_keyword?: string; // 검색 - 검색어
  sort_target?: string; // 정렬 - 대상 항목 ( Response 의 Sort Target이 O 항목 )
  sort_type?: 'asc' | 'desc'; // 정렬 - 방법 ( asc : 오름차순 / desc : 내림차순 )
  is_export?: string; // 내보내기 여부 (값이 null이 아닐 시 데이터 엑셀 파일로 내보내기 처리함)
}

export interface IPartnerItem {
  partner_company_idx: string; // 협력 업체 - 고유식별 번호
  evi_partner_company_type: number; // 협력 업체 구분 (환경 변수 - 고유식별 번호)
  evv_partner_company_type: string; // 협력 업체 구분 (환경 변수 값)
  partner_company_code: string; // 협력 업체 코드
  partner_company_name: string; // 협력 업체명
  material_count: number; // 원재료 수
  created_date: string; // 등록일 ( yyyy-mm-dd )
  updated_date: string; // 수정일 ( yyyy-mm-dd )
  evi_partner_company_status: number; // 협력 업체 상태 (환경 변수 - 고유식별 번호)
  evv_partner_company_status: string; // 협력 업체 상태 (환경 변수 값)
}

export interface IPartnerRes {
  total_count: number; // 리스트 전체 항목 수
  list: IPartnerItem[];
}

// 협력 업체 (Partner) 관련 인터페이스

export interface IPartner {
  partner_company_idx: number;
  partner_company_code?: string;
  evi_partner_company_type: string;
  partner_company_name: string;
  evi_partner_company_status: string;
  business_number?: string;
  business_address?: string;
  partner_company_description?: string;
}

export type IPartnerSaveReq = IPartner;

export interface IPartnerSaveRes {
  partner_company_idx: number;
  partner_company_code: number;
}

export interface IPartnerViewRes extends IPartner {
  partner_company_idx: number;
  evv_partner_company_type: string;
  partner_company_code: string;
  evv_partner_company_status: string;
}

export type IPartnerModifyReq = IPartner;
export type IPartnerModifyRes = Pick<IPartnerViewRes, 'partner_company_idx'>;

export interface IPartnerHistoryItem {
  history_date: string; // 변경일 ( yyyy-mm-dd )
  user_idx: string; // 변경인 (사용자 고유식별 번호)
  user_name: string; // 변경인 (사용자 이름)
  history_item: string; // 변경 항목
  history_action: string; // 동작
  history_detail: string; // 변경 내용
}

export interface IPartnerHistoryRes {
  total_count: number; // 리스트 전체 항목 수
  list: IPartnerHistoryItem[];
}

export interface IPartnerHistoryReq {
  per_num?: number; // 페이지별 표시 아이템 개수
  current_num?: number; // 현재 페이지 번호
  search_target?: string; // 검색 - 대상 항목
  search_keyword?: string; // 검색 - 검색어
  sort_target?: string; // 정렬 - 대상 항목
  sort_type?: 'asc' | 'desc'; // 정렬 - 방법
  is_export?: string; // 내보내기 여부
}

export interface IPartnerCountryItem {
  origin_code: string; // 원산지 코드
  origin_name: string; // 원산지명
  created_date: string; // 등록일 ( yyyy-mm-dd )
}

export interface IPartnerCountryReq {
  per_num?: number;
  current_num?: number;
  search_target?: string;
  search_keyword?: string;
  sort_target?: string;
  sort_type?: string;
  is_export?: string;
}

export interface IPartnerCountryRes {
  total_count: number; // 리스트 전체 항목 수
  list: IPartnerCountryItem[];
}

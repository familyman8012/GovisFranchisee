import { Dispatch, SetStateAction } from 'react';
import { checkedItemType } from '@ComponentFarm/modal/SearchPopup/SearchPopup';

// 제품상세설정 팝업
export interface IProductSearchModalReq {
  evi_product_status?: number;
  evi_product_category?: number;
  search_target?: string;
  search_keyword?: string;
}

interface IProductSearchModalResItem {
  product_info_idx: number;
  product_code: string;
  evi_product_category: number;
  evi_product_category_str: string;
  product_name_ko: string;
  product_name_en: string;
  evi_product_status: number;
  evi_product_status_str: string;
  created_date: string;
}

export interface IProductSearchModalRes {
  info: IProductSearchModalReq;
  list: IProductSearchModalResItem[];
}

// 매장상세설정 팝업
export interface IStoreModalReq {
  store_idx?: number | string;
  region?: string;
  commercial_area?: string;
  store_type?: string;
  search_target?: string;
  search_keyword?: string;
}

interface IStoreSearchModalResItem {
  store_idx: number;
  store_name: string;
  region: string;
  commercial_area: string;
  store_type: string;
  store_status: string;
  open_date: string;
}

export interface IStoreModalRes {
  info: IProductSearchModalReq;
  list: IStoreSearchModalResItem[];
}

// productSearch, storeSearch
export interface ISearcPopupProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  initialValues: string[];
  selectItems: checkedItemType[];
  setSelectItems: Dispatch<SetStateAction<checkedItemType[]>>;
  filters: {
    [key: string]: string | null;
  };
  setFilters: Dispatch<
    SetStateAction<{
      [key: string]: string | null;
    }>
  >;
}

import React from "react";
import {
  IProductSearchModalRes,
  ISearcPopupProps,
} from "InterfaceFarm/search-modal";
import { envConfigGeneration } from "@UtilFarm/convertEnvironment";
import SearchPopup, { ICommonResultData } from "./SearchPopup";

interface IProductResultData extends ICommonResultData {
  category: string;
  status: string;
}

const ProductSearchPopup = ({
  setConfig,
  data,
}: {
  setConfig: ISearcPopupProps;
  data?: IProductSearchModalRes;
}) => {
  const {
    isOpen,
    setIsOpen,
    selectItems,
    setSelectItems,
    initialValues,
    filters,
    setFilters,
  } = setConfig;

  // 검색 필터
  const selectConfig = envConfigGeneration([
    ["제품 상태", "product_status"],
    ["제품 분류", "product_category"],
  ]);

  // 테이블 셋팅
  const tableCofig = {
    th: ["제품 분류", "제품명", "제품 상태"],
    col: [46, 180, 240, 180],
  };

  // 검색 테이블에 맞추어 정리.
  const resultData =
    data?.list?.map((el) => {
      return {
        idx: el.product_info_idx,
        category: el.evi_product_category_str,
        label: el.product_name_ko,
        status: el.evi_product_status_str,
      };
    }) || [];

  return (
    <SearchPopup<IProductResultData>
      title="제품 상세 설정"
      keyWordSearchTitle="제품명"
      selectConfig={selectConfig}
      tableCofig={tableCofig}
      resultData={resultData}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      filters={filters}
      setFilters={setFilters}
      initialValues={initialValues}
      selectItems={selectItems}
      setSelectItems={setSelectItems}
      badge={["운영", "중단", "폐기"]}
    />
  );
};

export default ProductSearchPopup;
